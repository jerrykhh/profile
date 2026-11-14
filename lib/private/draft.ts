/** contentId (UUID v4), 16-byte salt, and 12-byte IV, minted together. */
export function mintDraft(): { contentId: string; saltB64: string; ivB64: string } {
  throw new Error("not implemented");
}
