import "server-only";

import type { KdfPublic, PrivateSlug } from "@/lib/private/types";

export type LiveRead =
  | { status: "none" }
  | { status: "drift" }
  | { status: "expired"; kdf: KdfPublic }
  | {
      status: "ready";
      contentId: string;
      slug: PrivateSlug;
      title: string;
      description: string;
      expiresAt: string;
      verifier: Uint8Array;
      kdf: KdfPublic;
      iv: Uint8Array;
      ciphertext: Uint8Array;
    };

/**
 * Resolve one slug: may promote that slug's pending → live when envelope hash matches.
 * TODO: SELECT by slug; UPDATE pending→live WHERE slug = ? AND envelope matches.
 */
export async function resolveLiveSlot(slug: PrivateSlug, now: number): Promise<LiveRead> {
  throw new Error("not implemented");
  void slug;
  void now;
}

export async function prepareSlot(row: {
  slug: PrivateSlug;
  contentId: string;
  title: string;
  description: string;
  expiresAt: string;
  verifierB64: string;
  envelopeSha256: string;
}): Promise<"inserted" | "replay" | "reused" | "slug_taken"> {
  throw new Error("not implemented");
  void row;
}
