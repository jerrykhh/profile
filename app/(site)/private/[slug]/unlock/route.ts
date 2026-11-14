import { NextResponse } from "next/server";

import { clearFailures, isLimited, recordFailure } from "@/lib/private/attempts";
import { b64ToBytes, decryptMarkdown } from "@/lib/private/cipher";
import { getEnvelopeBySlug } from "@/lib/private/envelope";
import { sha256B64, timingSafeEqualB64 } from "@/lib/private/kdf";
import { logPrivateAccess } from "@/lib/private/access-log";
import { getPublicationBySlug } from "@/lib/private/publication-store";
import { sealPrivateCookie } from "@/lib/private/seal";
import { parsePrivateSlug } from "@/lib/private/slug";
import type { EnterResult } from "@/lib/private/types";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: raw } = await context.params;
  const slug = parsePrivateSlug(raw);
  if (!slug) {
    const body: EnterResult = { ok: false, notice: "rejected" };
    return NextResponse.json(body, { status: 400 });
  }

  const payload = (await request.json()) as {
    authKeyB64?: string;
    encKeyB64?: string;
    termsAccepted?: boolean;
  };

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  if (await isLimited("pin", ip)) {
    return NextResponse.json({ ok: false, notice: "rate_limited" } satisfies EnterResult, { status: 429 });
  }
  if (payload.termsAccepted !== true || !payload.authKeyB64 || !payload.encKeyB64) {
    return NextResponse.json({ ok: false, notice: "rejected" } satisfies EnterResult, { status: 400 });
  }

  const envelope = getEnvelopeBySlug(slug);
  if (!envelope) {
    await recordFailure("pin", ip);
    return NextResponse.json({ ok: false, notice: "rejected" } satisfies EnterResult, { status: 404 });
  }

  const publication = await getPublicationBySlug(slug);
  if (publication && !publication.live) {
    return NextResponse.json({ ok: false, notice: "rejected" } satisfies EnterResult, { status: 403 });
  }

  const expiresMs = Date.parse(publication?.expiresAt ?? envelope.expiresAt);
  if (Number.isNaN(expiresMs) || Date.now() >= expiresMs) {
    return NextResponse.json({ ok: false, notice: "expired" } satisfies EnterResult, { status: 410 });
  }

  const authKey = b64ToBytes(payload.authKeyB64);
  const encKey = b64ToBytes(payload.encKeyB64);
  if (authKey.length !== 32 || encKey.length !== 32) {
    await recordFailure("pin", ip);
    return NextResponse.json({ ok: false, notice: "rejected" } satisfies EnterResult, { status: 400 });
  }

  const verifier = await sha256B64(authKey);
  if (!(await timingSafeEqualB64(verifier, envelope.verifier))) {
    await recordFailure("pin", ip);
    await logPrivateAccess(
      { kind: "unlock_attempt", slug, outcome: "bad_pin", pinInQuery: false, atMs: Date.now() },
      ip,
    );
    return NextResponse.json({ ok: false, notice: "rejected" } satisfies EnterResult, { status: 401 });
  }

  let markdown: string;
  try {
    markdown = await decryptMarkdown(
      encKey,
      envelope.contentId,
      b64ToBytes(envelope.aes.iv),
      b64ToBytes(envelope.aes.ciphertext),
    );
  } catch {
    await recordFailure("pin", ip);
    return NextResponse.json({ ok: false, notice: "rejected" } satisfies EnterResult, { status: 401 });
  }

  await clearFailures("pin", ip);
  const expUnix = Math.min(Math.floor(Date.now() / 1000) + 15 * 60, Math.floor(expiresMs / 1000));
  try {
    await sealPrivateCookie({ slug, contentId: envelope.contentId, encKey, expUnix });
  } catch (error) {
    console.warn("sealPrivateCookie failed", error);
  }

  await logPrivateAccess({ kind: "unlock_ok", slug, outcome: "ok", pinInQuery: false, atMs: Date.now() }, ip);

  const body: EnterResult = {
    ok: true,
    article: {
      slug,
      title: publication?.title ?? envelope.title,
      description: publication?.description ?? envelope.description,
      markdown,
      expiresAt: publication?.expiresAt ?? envelope.expiresAt,
    },
  };
  return NextResponse.json(body, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
