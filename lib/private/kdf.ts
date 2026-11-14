import type { KdfPublic, SixDigitPin } from "@/lib/private/types";

export const PBKDF2_ITERATIONS = 600_000 as const;
const HKDF_SALT = new TextEncoder().encode("jerrykhh-profile-hkdf-v1");

export function parseSixDigitPin(raw: string): SixDigitPin | null {
  if (!/^[0-9]{6}$/.test(raw)) return null;
  return raw as SixDigitPin;
}

function bytesToB64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function b64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

function asBufferSource(bytes: Uint8Array): BufferSource {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

async function importPbkdf2Key(pin: SixDigitPin): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(pin), "PBKDF2", false, [
    "deriveBits",
  ]);
}

async function hkdf(ikm: ArrayBuffer, info: string): Promise<Uint8Array<ArrayBuffer>> {
  const key = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: asBufferSource(HKDF_SALT),
      info: new TextEncoder().encode(info),
    },
    key,
    256,
  );
  return new Uint8Array(bits);
}

/** PBKDF2-SHA256 then HKDF into authKey and encKey. */
export async function derivePinKeys(
  pin: SixDigitPin,
  kdf: KdfPublic,
): Promise<{ authKeyB64: string; encKeyB64: string }> {
  if (kdf.iterations !== PBKDF2_ITERATIONS) {
    throw new Error("unsupported KDF iterations");
  }
  const salt = b64ToBytes(kdf.saltB64);
  if (salt.length !== 16) throw new Error("salt must be 16 bytes");
  const baseKey = await importPbkdf2Key(pin);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: asBufferSource(salt),
      iterations: PBKDF2_ITERATIONS,
    },
    baseKey,
    256,
  );
  const authKey = await hkdf(bits, "auth");
  const encKey = await hkdf(bits, "enc");
  return { authKeyB64: bytesToB64(authKey), encKeyB64: bytesToB64(encKey) };
}

export async function sha256B64(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", asBufferSource(bytes));
  return bytesToB64(new Uint8Array(digest));
}

export async function timingSafeEqualB64(a: string, b: string): Promise<boolean> {
  const ab = b64ToBytes(a);
  const bb = b64ToBytes(b);
  if (ab.length !== bb.length) return false;
  const subtle = crypto.subtle as SubtleCrypto & {
    timingSafeEqual?: (x: BufferSource, y: BufferSource) => boolean;
  };
  if (typeof subtle.timingSafeEqual === "function") {
    return subtle.timingSafeEqual(asBufferSource(ab), asBufferSource(bb));
  }
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i]! ^ bb[i]!;
  return diff === 0;
}

export { asBufferSource };

export { bytesToB64, b64ToBytes };
