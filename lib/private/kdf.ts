import type { KdfPublic, SixDigitPin } from "@/lib/private/types";

export const PBKDF2_ITERATIONS = 600_000 as const;

export function parseSixDigitPin(raw: string): SixDigitPin | null {
  if (!/^[0-9]{6}$/.test(raw)) return null;
  return raw as SixDigitPin;
}

/**
 * PBKDF2-SHA256 then HKDF into authKey and encKey. The one KDF.
 * Gate calls this in the browser on Enter. CMS prepare calls it on the Worker.
 */
export async function derivePinKeys(
  pin: SixDigitPin,
  kdf: KdfPublic,
): Promise<{ authKeyB64: string; encKeyB64: string }> {
  throw new Error("not implemented");
  void pin;
  void kdf;
}
