import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AntiExfilShell } from "@/components/private/anti-exfil";
import { PrivateArticle } from "@/components/private/article";
import { PinGate } from "@/components/private/gate";
import { PrivateReveal } from "@/components/private/reveal";
import { siteConfig } from "@/config/profile";
import { openPrivatePage } from "@/lib/private/gate-server";
import { HIDDEN_ROBOTS, privateSlugPath } from "@/lib/private/routes";
import { parsePrivateSlug } from "@/lib/private/slug";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pin?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parsePrivateSlug(slug);
  return {
    title: { absolute: "Profile | Jerry Kwok" },
    description: siteConfig.description,
    alternates: { canonical: parsed ? privateSlugPath(parsed) : "/private" },
    robots: HIDDEN_ROBOTS,
    referrer: "no-referrer",
  };
}

export default async function PrivateSlugPage({ params, searchParams }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = parsePrivateSlug(rawSlug);
  if (!slug) notFound();

  const { pin } = await searchParams;
  const view = await openPrivatePage({ slug, pinQuery: pin ?? null });

  if (view.status !== "unlocked") {
    return <PinGate locked={view} slug={slug} />;
  }

  return (
    <PrivateReveal slug={slug} expiresAt={view.article.expiresAt}>
      <AntiExfilShell>
        <PrivateArticle article={view.article} />
      </AntiExfilShell>
    </PrivateReveal>
  );
}
