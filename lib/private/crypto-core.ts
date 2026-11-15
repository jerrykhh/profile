import { asBufferSource, b64ToBytes, bytesToB64, PBKDF2_ITERATIONS } from "@/lib/private/kdf";

export type EnvelopeV1 = {
  v: 1;
  contentId: string;
  slug: string;
  title: string;
  description: string;
  expiresAt: string;
  verifier: string;
  kdf: { name: "PBKDF2-SHA256"; iterations: typeof PBKDF2_ITERATIONS; salt: string };
  aes: { iv: string; ciphertext: string };
};

export function canonicalEnvelope(env: EnvelopeV1): string {
  return JSON.stringify({
    v: 1,
    contentId: env.contentId,
    slug: env.slug,
    title: env.title,
    description: env.description,
    expiresAt: env.expiresAt,
    verifier: env.verifier,
    kdf: {
      name: "PBKDF2-SHA256",
      iterations: env.kdf.iterations,
      salt: env.kdf.salt,
    },
    aes: { iv: env.aes.iv, ciphertext: env.aes.ciphertext },
  });
}

export function parseEnvelopeJson(raw: string): EnvelopeV1 {
  const data = JSON.parse(raw) as EnvelopeV1;
  if (data.v !== 1) throw new Error("unsupported envelope version");
  if (data.kdf?.iterations !== PBKDF2_ITERATIONS) throw new Error("bad iterations");
  if (data.kdf?.name !== "PBKDF2-SHA256") throw new Error("bad kdf");
  if (!data.contentId || !data.slug || !data.aes?.iv || !data.aes?.ciphertext) {
    throw new Error("incomplete envelope");
  }
  return data;
}

async function importAesKey(encKey: Uint8Array): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", asBufferSource(encKey), { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

export async function encryptMarkdown(
  encKey: Uint8Array,
  contentId: string,
  iv: Uint8Array,
  markdown: string,
): Promise<string> {
  if (iv.length !== 12) throw new Error("iv must be 12 bytes");
  const key = await importAesKey(encKey);
  const cipher = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: asBufferSource(iv),
      additionalData: new TextEncoder().encode(contentId),
    },
    key,
    new TextEncoder().encode(markdown),
  );
  return bytesToB64(new Uint8Array(cipher));
}

export async function decryptMarkdown(
  encKey: Uint8Array,
  contentId: string,
  iv: Uint8Array,
  ciphertext: Uint8Array,
): Promise<string> {
  const key = await importAesKey(encKey);
  const plain = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: asBufferSource(iv),
      additionalData: new TextEncoder().encode(contentId),
    },
    key,
    asBufferSource(ciphertext),
  );
  return new TextDecoder().decode(plain);
}

export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export { b64ToBytes, bytesToB64 };
