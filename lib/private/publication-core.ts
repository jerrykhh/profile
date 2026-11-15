import { siteConfig } from "@/config/profile";
import { privateSlugPath } from "@/lib/private/routes";

export type PublicationRecord = {
  contentId: string;
  slug: string;
  title: string;
  description: string;
  expiresAt: string;
  verifier: string;
  envelopeSha256: string;
  live: boolean;
  createdAt: string;
};

/** Isolate-local fallback when PRIVATE_DB is unbound (local CMS / tests). */
const memory = new Map<string, PublicationRecord>();

export function memoryUpsert(record: PublicationRecord): void {
  memory.set(record.contentId, record);
}

export function memoryList(): PublicationRecord[] {
  return [...memory.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function memoryGetBySlug(slug: string): PublicationRecord | null {
  return [...memory.values()].find((r) => r.slug === slug) ?? null;
}

export function memoryGetById(contentId: string): PublicationRecord | null {
  return memory.get(contentId) ?? null;
}

export function memorySetLive(contentId: string, live: boolean): boolean {
  const existing = memory.get(contentId);
  if (!existing) return false;
  memory.set(contentId, { ...existing, live });
  return true;
}

export function memoryDelete(contentId: string): boolean {
  return memory.delete(contentId);
}

export function shareLinkStatus(record: PublicationRecord, now = Date.now()): "live" | "disabled" | "expired" {
  if (!record.live) return "disabled";
  const exp = Date.parse(record.expiresAt);
  if (Number.isNaN(exp) || now >= exp) return "expired";
  return "live";
}

export function absoluteShareUrl(slug: string): string {
  return `${siteConfig.url.replace(/\/$/, "")}${privateSlugPath(slug)}`;
}

export function resetPublicationMemory(): void {
  memory.clear();
}
