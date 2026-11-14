"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { clearFailures, isLimited, recordFailure } from "@/lib/private/attempts";
import {
  canonicalEnvelope,
  encryptMarkdown,
  sha256Hex,
  type EnvelopeV1,
} from "@/lib/private/cipher";
import { b64ToBytes, derivePinKeys, parseSixDigitPin, sha256B64, timingSafeEqualB64 } from "@/lib/private/kdf";
import { PBKDF2_ITERATIONS } from "@/lib/private/kdf";
import { getEnvelopeBySlug, listEnvelopeSlugs } from "@/lib/private/envelope";
import { privateSharePath } from "@/lib/private/routes";
import { clearCmsCookie, readCmsGrant, sealCmsCookie } from "@/lib/private/seal";
import { getCmsCredentials } from "@/lib/private/session-key";
import { parsePrivateSlug } from "@/lib/private/slug";
import { siteConfig } from "@/config/profile";
import type {
  CmsLoginState,
  MintShareIntent,
  MintShareResult,
  PrepareIntent,
  PrepareResult,
} from "@/lib/private/types";

async function clientIp(): Promise<string | null> {
  const h = await headers();
  return h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

export async function loginCms(_prev: CmsLoginState, formData: FormData): Promise<CmsLoginState> {
  const ip = await clientIp();
  if (await isLimited("cms", ip)) return { notice: "rate_limited" };

  const creds = await getCmsCredentials();
  if (!creds) {
    // No Worker secrets configured yet.
    return { notice: "rejected" };
  }

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const userOk = await timingSafeEqualB64(
    await sha256B64(new TextEncoder().encode(username)),
    await sha256B64(new TextEncoder().encode(creds.username)),
  );
  const passOk = await timingSafeEqualB64(
    await sha256B64(new TextEncoder().encode(password)),
    await sha256B64(new TextEncoder().encode(creds.password)),
  );
  if (!userOk || !passOk) {
    await recordFailure("cms", ip);
    return { notice: "rejected" };
  }

  await clearFailures("cms", ip);
  await sealCmsCookie(Math.floor(Date.now() / 1000) + 12 * 60 * 60);
  redirect("/cms");
}

export async function logoutCms(): Promise<void> {
  await clearCmsCookie();
  redirect("/cms/login");
}

/**
 * Primary CMS job: mint a share link for an existing Plan A envelope.
 * Verifies PIN against envelope verifier; optionally records D1 publication metadata when bound.
 */
export async function mintShareLink(intent: MintShareIntent): Promise<MintShareResult> {
  const grant = await readCmsGrant();
  if (!grant) return { ok: false, reason: "unauthorized" };

  const pin = parseSixDigitPin(intent.pin);
  if (!pin) return { ok: false, reason: "invalid" };
  if (!intent.title.trim() || intent.title.length > 120) return { ok: false, reason: "invalid" };
  if (!intent.description.trim() || intent.description.length > 500) return { ok: false, reason: "invalid" };

  const expiresMs = Date.parse(intent.expiresAt);
  if (Number.isNaN(expiresMs) || expiresMs < Date.now() + 60_000) return { ok: false, reason: "invalid" };

  const envelope = listEnvelopeSlugs()
    .map((slug) => getEnvelopeBySlug(slug))
    .find((env) => env?.contentId === intent.contentId);
  if (!envelope) return { ok: false, reason: "missing" };

  const slug = parsePrivateSlug(envelope.slug);
  if (!slug) return { ok: false, reason: "invalid" };

  const keys = await derivePinKeys(pin, { iterations: PBKDF2_ITERATIONS, saltB64: envelope.kdf.salt });
  const authOk = await timingSafeEqualB64(await sha256B64(b64ToBytes(keys.authKeyB64)), envelope.verifier);
  if (!authOk) return { ok: false, reason: "bad_pin" };

  const title = intent.title.trim();
  const description = intent.description.trim();
  const expiresAt = new Date(expiresMs).toISOString();
  const envelopeSha = await sha256Hex(
    // Prefer committed envelope bytes when available via canonical form of on-disk fields.
    JSON.stringify({
      contentId: envelope.contentId,
      slug: envelope.slug,
      verifier: envelope.verifier,
    }),
  );

  let d1: "written" | "skipped_unbound" = "skipped_unbound";
  try {
    const { env } = await import("cloudflare:workers");
    const db = (env as { PRIVATE_DB?: { prepare: (sql: string) => { bind: (...args: unknown[]) => { run: () => Promise<unknown> } } } }).PRIVATE_DB;
    if (db) {
      await db
        .prepare(
          `INSERT INTO publication (content_id, slug, title, description, expires_at, verifier, envelope_sha256, live, pending, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0, ?)
           ON CONFLICT(content_id) DO UPDATE SET
             slug=excluded.slug, title=excluded.title, description=excluded.description,
             expires_at=excluded.expires_at, verifier=excluded.verifier,
             envelope_sha256=excluded.envelope_sha256, live=1, pending=0`,
        )
        .bind(
          envelope.contentId,
          slug,
          title,
          description,
          expiresAt,
          envelope.verifier,
          envelopeSha,
          new Date().toISOString(),
        )
        .run();
      d1 = "written";
    }
  } catch {
    d1 = "skipped_unbound";
  }

  console.info(
    JSON.stringify({
      type: "cms_share_mint",
      contentId: envelope.contentId,
      slug,
      d1,
      includePinInUrl: intent.includePinInUrl,
      atMs: Date.now(),
    }),
  );

  const sharePath = privateSharePath(slug, intent.includePinInUrl ? pin : undefined);
  return {
    ok: true,
    slug,
    sharePath,
    shareUrl: `${siteConfig.url.replace(/\/$/, "")}${sharePath}`,
    d1,
  };
}

/**
 * Secondary CMS path: encrypt new markdown → download envelope for git commit (Plan A).
 * Requires CMS session. D1 write is optional when PRIVATE_DB is bound (prefer mintShareLink after commit).
 */
export async function preparePublication(intent: PrepareIntent): Promise<PrepareResult> {
  const grant = await readCmsGrant();
  if (!grant) return { ok: false, reason: "unauthorized" };

  const slug = parsePrivateSlug(intent.slug.trim().toLowerCase());
  const pin = parseSixDigitPin(intent.pin);
  if (!slug || !pin) return { ok: false, reason: "invalid" };
  if (!intent.title.trim() || intent.title.length > 120) return { ok: false, reason: "invalid" };
  if (!intent.description.trim() || intent.description.length > 500) return { ok: false, reason: "invalid" };
  if (!intent.markdown.trim() || intent.markdown.length > 100_000) return { ok: false, reason: "too_large" };

  // datetime-local posts local wall time without Z; Date.parse is fine for CMS operators.
  const expiresMs = Date.parse(intent.expiresAt);
  if (Number.isNaN(expiresMs) || expiresMs < Date.now() + 60_000) return { ok: false, reason: "invalid" };

  const salt = b64ToBytes(intent.saltB64);
  const iv = b64ToBytes(intent.ivB64);
  if (salt.length !== 16 || iv.length !== 12) return { ok: false, reason: "invalid" };

  const keys = await derivePinKeys(pin, { iterations: PBKDF2_ITERATIONS, saltB64: intent.saltB64 });
  const encKey = b64ToBytes(keys.encKeyB64);
  const authKey = b64ToBytes(keys.authKeyB64);
  const verifier = await sha256B64(authKey);
  const ciphertext = await encryptMarkdown(encKey, intent.contentId, iv, intent.markdown);

  const envelope: EnvelopeV1 = {
    v: 1,
    contentId: intent.contentId,
    slug,
    title: intent.title.trim(),
    description: intent.description.trim(),
    expiresAt: new Date(expiresMs).toISOString(),
    verifier,
    kdf: { name: "PBKDF2-SHA256", iterations: PBKDF2_ITERATIONS, salt: intent.saltB64 },
    aes: { iv: intent.ivB64, ciphertext },
  };

  const envelopeJson = canonicalEnvelope(envelope);
  await sha256Hex(envelopeJson); // reserved for D1 envelope_sha256

  return {
    ok: true,
    slug,
    contentId: intent.contentId,
    repoPath: `content/private/${intent.contentId}.enc.json`,
    envelopeJson,
  };
}
