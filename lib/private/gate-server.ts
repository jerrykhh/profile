import "server-only";

import { b64ToBytes, decryptMarkdown } from "@/lib/private/cipher";
import { getEnvelopeBySlug } from "@/lib/private/envelope";
import { parseSixDigitPin } from "@/lib/private/kdf";
import { clearPrivateCookie, readPrivateGrant } from "@/lib/private/seal";
import { logPrivateAccess } from "@/lib/private/access-log";
import type { PrivateSlug, PrivateView } from "@/lib/private/types";

function isExpired(expiresAt: string, now = Date.now()): boolean {
  const t = Date.parse(expiresAt);
  if (Number.isNaN(t)) return true;
  return now >= t;
}

/**
 * pinQuery is prefill only. Never unlocks without Enter + cookie grant.
 */
export async function openPrivatePage(input: {
  slug: PrivateSlug;
  pinQuery: string | null;
}): Promise<PrivateView> {
  const prefillPin = input.pinQuery ? parseSixDigitPin(input.pinQuery) : null;
  const envelope = getEnvelopeBySlug(input.slug);

  await logPrivateAccess(
    {
      kind: "gate_view",
      slug: input.slug,
      outcome: envelope ? "has_envelope" : "missing",
      pinInQuery: Boolean(input.pinQuery),
      atMs: Date.now(),
    },
    null,
  );

  if (!envelope) {
    return {
      status: "empty",
      slug: input.slug,
      prefillPin,
      notice: "none",
      kdf: null,
    };
  }

  const kdf = {
    iterations: 600000 as const,
    saltB64: envelope.kdf.salt,
  };

  if (isExpired(envelope.expiresAt)) {
    await clearPrivateCookie();
    return {
      status: "expired",
      slug: input.slug,
      prefillPin,
      notice: "expired",
      kdf,
    };
  }

  const grant = await readPrivateGrant();
  if (
    grant &&
    grant.slug === input.slug &&
    grant.contentId === envelope.contentId &&
    grant.expUnix * 1000 > Date.now()
  ) {
    try {
      const markdown = await decryptMarkdown(
        grant.encKey,
        envelope.contentId,
        b64ToBytes(envelope.aes.iv),
        b64ToBytes(envelope.aes.ciphertext),
      );
      return {
        status: "unlocked",
        article: {
          slug: input.slug,
          title: envelope.title,
          description: envelope.description,
          markdown,
          expiresAt: envelope.expiresAt,
        },
      };
    } catch {
      await clearPrivateCookie();
    }
  }

  return {
    status: "locked",
    slug: input.slug,
    prefillPin,
    notice: "none",
    kdf,
  };
}
