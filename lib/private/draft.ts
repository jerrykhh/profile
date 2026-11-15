function randomBytes(n: number): Uint8Array {
  const out = new Uint8Array(n);
  crypto.getRandomValues(out);
  return out;
}

function bytesToB64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

/** contentId (UUID v4), 16-byte salt, and 12-byte IV, minted together. */
export function mintDraft(): { contentId: string; saltB64: string; ivB64: string } {
  return {
    contentId: crypto.randomUUID(),
    saltB64: bytesToB64(randomBytes(16)),
    ivB64: bytesToB64(randomBytes(12)),
  };
}
