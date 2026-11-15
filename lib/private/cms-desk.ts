import "server-only";

import { redirect } from "next/navigation";

import { listEnvelopeSlugs, getEnvelopeBySlug } from "@/lib/private/envelope";
import {
  absoluteShareUrl,
  listPublications,
  shareLinkStatus,
} from "@/lib/private/publication-store";
import { privateSlugPath } from "@/lib/private/routes";
import { readCmsGrant } from "@/lib/private/seal";
import type { CmsDesk } from "@/lib/private/types";

export async function readCmsSession(): Promise<"open" | "closed"> {
  const grant = await readCmsGrant();
  return grant ? "open" : "closed";
}

export async function readCmsDesk(): Promise<CmsDesk> {
  if ((await readCmsSession()) === "closed") redirect("/cms/login");
  const notes = listEnvelopeSlugs().map((slug) => {
    const env = getEnvelopeBySlug(slug)!;
    return {
      slug,
      title: env.title,
      description: env.description,
      expiresAt: env.expiresAt,
      contentId: env.contentId,
      filename: `${env.contentId}.enc.json` as const,
      pending: false,
    };
  });

  let store: "d1" | "memory" = "memory";
  try {
    const { env } = await import("cloudflare:workers");
    if ((env as { PRIVATE_DB?: unknown }).PRIVATE_DB) store = "d1";
  } catch {
    store = "memory";
  }

  const pubs = await listPublications();
  // If D1 returned rows, store is d1; memory list still works unbound.
  if (pubs.length > 0 && store === "memory") {
    // keep memory label when unbound
  }

  const links = pubs.map((row) => ({
    contentId: row.contentId,
    slug: row.slug,
    title: row.title,
    expiresAt: row.expiresAt,
    status: shareLinkStatus(row),
    sharePath: privateSlugPath(row.slug),
    shareUrl: absoluteShareUrl(row.slug),
  }));

  return { notes, links, store };
}
