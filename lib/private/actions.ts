"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { clearFailures, isLimited, recordFailure } from "@/lib/private/attempts";
import { b64ToBytes, decryptMarkdown } from "@/lib/private/cipher";
import { getEnvelopeBySlug } from "@/lib/private/envelope";
import { sha256B64, timingSafeEqualB64 } from "@/lib/private/kdf";
import { logPrivateAccess } from "@/lib/private/access-log";
import { privateSlugPath } from "@/lib/private/routes";
import {
  clearPrivateCookie,
  readPrivateGrant,
  sealPrivateCookie,
} from "@/lib/private/seal";
import type {
  EnterFailure,
  EnterPinInput,
  HeartbeatResult,
  PrivateSlug,
} from "@/lib/private/types";

async function clientIp(): Promise<string | null> {
  const h = await headers();
  return h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

export async function enterPin(input: EnterPinInput): Promise<EnterFailure> {
  const ip = await clientIp();
  if (await isLimited("pin", ip)) {
    return { ok: false, notice: "rate_limited" };
  }
  if (input.termsAccepted !== true) {
    return { ok: false, notice: "rejected" };
  }

  const envelope = getEnvelopeBySlug(input.slug);
  if (!envelope) {
    await recordFailure("pin", ip);
    await logPrivateAccess(
      { kind: "unlock_attempt", slug: input.slug, outcome: "missing", pinInQuery: false, atMs: Date.now() },
      ip,
    );
    return { ok: false, notice: "rejected" };
  }

  const expiresMs = Date.parse(envelope.expiresAt);
  if (Number.isNaN(expiresMs) || Date.now() >= expiresMs) {
    await clearPrivateCookie();
    await logPrivateAccess(
      { kind: "unlock_attempt", slug: input.slug, outcome: "expired", pinInQuery: false, atMs: Date.now() },
      ip,
    );
    return { ok: false, notice: "expired" };
  }

  const authKey = b64ToBytes(input.authKeyB64);
  const encKey = b64ToBytes(input.encKeyB64);
  if (authKey.length !== 32 || encKey.length !== 32) {
    await recordFailure("pin", ip);
    return { ok: false, notice: "rejected" };
  }

  const verifier = await sha256B64(authKey);
  if (!(await timingSafeEqualB64(verifier, envelope.verifier))) {
    await recordFailure("pin", ip);
    await logPrivateAccess(
      { kind: "unlock_attempt", slug: input.slug, outcome: "bad_pin", pinInQuery: false, atMs: Date.now() },
      ip,
    );
    return { ok: false, notice: "rejected" };
  }

  try {
    await decryptMarkdown(
      encKey,
      envelope.contentId,
      b64ToBytes(envelope.aes.iv),
      b64ToBytes(envelope.aes.ciphertext),
    );
  } catch {
    await recordFailure("pin", ip);
    return { ok: false, notice: "rejected" };
  }

  await clearFailures("pin", ip);
  const expUnix = Math.min(Math.floor(Date.now() / 1000) + 15 * 60, Math.floor(expiresMs / 1000));
  await sealPrivateCookie({
    slug: input.slug,
    contentId: envelope.contentId,
    encKey,
    expUnix,
  });
  await logPrivateAccess(
    { kind: "unlock_ok", slug: input.slug, outcome: "ok", pinInQuery: false, atMs: Date.now() },
    ip,
  );
  redirect(privateSlugPath(input.slug));
}

export async function endPrivateSession(slug?: PrivateSlug): Promise<void> {
  void slug;
  await clearPrivateCookie();
}

export async function checkPrivateSession(slug: PrivateSlug): Promise<HeartbeatResult> {
  const envelope = getEnvelopeBySlug(slug);
  if (!envelope) return { ok: false, reason: "missing" };
  const expiresMs = Date.parse(envelope.expiresAt);
  if (Number.isNaN(expiresMs) || Date.now() >= expiresMs) {
    await clearPrivateCookie();
    await logPrivateAccess(
      { kind: "heartbeat_fail", slug, outcome: "expired", pinInQuery: false, atMs: Date.now() },
      null,
    );
    return { ok: false, reason: "expired" };
  }
  const grant = await readPrivateGrant();
  if (!grant || grant.slug !== slug || grant.contentId !== envelope.contentId) {
    await logPrivateAccess(
      { kind: "heartbeat_fail", slug, outcome: "unauthorized", pinInQuery: false, atMs: Date.now() },
      null,
    );
    return { ok: false, reason: "unauthorized" };
  }
  await logPrivateAccess(
    { kind: "heartbeat_ok", slug, outcome: "ok", pinInQuery: false, atMs: Date.now() },
    null,
  );
  return { ok: true, expiresAt: envelope.expiresAt };
}
