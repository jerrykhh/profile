import "server-only";

import type { KdfPublic } from "@/lib/private/types";

export type IndexedEnvelopes = ReadonlyMap<
  string,
  {
    canonical: string;
    sha256: string;
    kdf: KdfPublic;
    iv: Uint8Array;
    ciphertext: Uint8Array;
  }
>;

/**
 * Glob content/private/*.enc.json only. Never use lib/content.
 * TODO: parseEnvelope, reject unknown keys / wrong iterations / stem mismatch.
 */
export function loadEnvelopes(): IndexedEnvelopes {
  throw new Error("not implemented");
}
