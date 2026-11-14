import type { PrivateSlug } from "@/lib/private/types";

/** Lowercase kebab slug: letters, digits, hyphens; 1–64 chars; no leading/trailing hyphen. */
export function parsePrivateSlug(raw: string): PrivateSlug | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(raw)) return null;
  if (raw.length < 1 || raw.length > 64) return null;
  return raw as PrivateSlug;
}
