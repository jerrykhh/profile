import "server-only";

/**
 * Canonical JSON envelope string for hashing and git commit.
 * TODO: AES-GCM encrypt/decrypt with AAD = contentId.
 */
export function canonicalEnvelope(input: {
  contentId: string;
  saltB64: string;
  ivB64: string;
  ciphertextB64: string;
}): string {
  throw new Error("not implemented");
  void input;
}

export async function encryptMarkdown(
  encKey: Uint8Array,
  contentId: string,
  iv: Uint8Array,
  markdown: string,
): Promise<string> {
  throw new Error("not implemented");
  void encKey;
  void contentId;
  void iv;
  void markdown;
}

/** AAD is contentId. Tag failure throws. */
export async function decryptMarkdown(
  encKey: Uint8Array,
  contentId: string,
  iv: Uint8Array,
  ciphertext: Uint8Array,
): Promise<string> {
  throw new Error("not implemented");
  void encKey;
  void contentId;
  void iv;
  void ciphertext;
}
