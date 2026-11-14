import "server-only";

import type { KdfPublic } from "@/lib/private/types";

export type LiveRead =
  | { status: "none" }
  | { status: "drift" }
  | { status: "expired"; kdf: KdfPublic }
  | {
      status: "ready";
      contentId: string;
      title: string;
      description: string;
      expiresAt: string;
      verifier: Uint8Array;
      kdf: KdfPublic;
      iv: Uint8Array;
      ciphertext: Uint8Array;
    };

/**
 * May promote pending → live when this build's envelope hash matches.
 * TODO: one UPDATE ... WHERE pending_content_id = ? ; delete previous publication when changes === 1.
 */
export async function resolveLiveSlot(now: number): Promise<LiveRead> {
  throw new Error("not implemented");
  void now;
}

export async function prepareSlot(row: {
  contentId: string;
  title: string;
  description: string;
  expiresAt: string;
  verifierB64: string;
  envelopeSha256: string;
}): Promise<"inserted" | "replay" | "reused"> {
  throw new Error("not implemented");
  void row;
}
