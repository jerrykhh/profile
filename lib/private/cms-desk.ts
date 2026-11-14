import "server-only";

import { redirect } from "next/navigation";

import { listEnvelopeSlugs, getEnvelopeBySlug } from "@/lib/private/envelope";
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
  return { notes };
}
