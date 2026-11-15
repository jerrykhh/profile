import "server-only";

import {
  absoluteShareUrl,
  memoryDelete,
  memoryGetById,
  memoryGetBySlug,
  memoryList,
  memorySetLive,
  memoryUpsert,
  shareLinkStatus,
  type PublicationRecord,
} from "@/lib/private/publication-core";

export type { PublicationRecord };
export { absoluteShareUrl, shareLinkStatus, resetPublicationMemory } from "@/lib/private/publication-core";

type Stmt = {
  bind: (...args: unknown[]) => Stmt;
  run: () => Promise<unknown>;
  all: <T>() => Promise<{ results: T[] }>;
  first: <T>() => Promise<T | null>;
};

type DbLike = {
  prepare: (sql: string) => Stmt;
};

async function getDb(): Promise<DbLike | null> {
  try {
    const { env } = await import("cloudflare:workers");
    return ((env as { PRIVATE_DB?: DbLike }).PRIVATE_DB ?? null) as DbLike | null;
  } catch {
    return null;
  }
}

export async function upsertPublication(record: PublicationRecord): Promise<"d1" | "memory"> {
  memoryUpsert(record);
  const db = await getDb();
  if (!db) return "memory";
  await db
    .prepare(
      `INSERT INTO publication (content_id, slug, title, description, expires_at, verifier, envelope_sha256, live, pending, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
       ON CONFLICT(content_id) DO UPDATE SET
         slug=excluded.slug, title=excluded.title, description=excluded.description,
         expires_at=excluded.expires_at, verifier=excluded.verifier,
         envelope_sha256=excluded.envelope_sha256, live=excluded.live, pending=0`,
    )
    .bind(
      record.contentId,
      record.slug,
      record.title,
      record.description,
      record.expiresAt,
      record.verifier,
      record.envelopeSha256,
      record.live ? 1 : 0,
      record.createdAt,
    )
    .run();
  return "d1";
}

export async function listPublications(): Promise<PublicationRecord[]> {
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare(
        `SELECT content_id as contentId, slug, title, description, expires_at as expiresAt,
                verifier, envelope_sha256 as envelopeSha256, live, created_at as createdAt
         FROM publication ORDER BY created_at DESC`,
      )
      .all<{
        contentId: string;
        slug: string;
        title: string;
        description: string;
        expiresAt: string;
        verifier: string;
        envelopeSha256: string;
        live: number;
        createdAt: string;
      }>();
    return results.map((row) => ({
      ...row,
      live: row.live === 1,
    }));
  }
  return memoryList();
}

export async function getPublicationBySlug(slug: string): Promise<PublicationRecord | null> {
  const db = await getDb();
  if (db) {
    const row = await db
      .prepare(
        `SELECT content_id as contentId, slug, title, description, expires_at as expiresAt,
                verifier, envelope_sha256 as envelopeSha256, live, created_at as createdAt
         FROM publication WHERE slug = ? LIMIT 1`,
      )
      .bind(slug)
      .first<{
        contentId: string;
        slug: string;
        title: string;
        description: string;
        expiresAt: string;
        verifier: string;
        envelopeSha256: string;
        live: number;
        createdAt: string;
      }>();
    if (!row) return null;
    return { ...row, live: row.live === 1 };
  }
  return memoryGetBySlug(slug);
}

export async function setPublicationLive(contentId: string, live: boolean): Promise<boolean> {
  memorySetLive(contentId, live);
  const db = await getDb();
  if (db) {
    await db.prepare(`UPDATE publication SET live = ? WHERE content_id = ?`).bind(live ? 1 : 0, contentId).run();
    return true;
  }
  return memoryGetById(contentId) !== null;
}

export async function deletePublication(contentId: string): Promise<boolean> {
  const had = memoryDelete(contentId);
  const db = await getDb();
  if (db) {
    await db.prepare(`DELETE FROM publication WHERE content_id = ?`).bind(contentId).run();
    return true;
  }
  return had;
}
