import Link from "next/link";
import { FileLock2 } from "lucide-react";

import { BackButton } from "@/components/back-button";
import { Markdown } from "@/components/markdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { UnlockedArticle } from "@/lib/private/types";

function formatExpiry(iso: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return iso;
  return new Intl.DateTimeFormat("en-HK", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Hong_Kong",
  }).format(new Date(ms));
}

/**
 * Unlocked layout mirrors project detail surfaces:
 * - Left: site Card with audience/description + write-up; stretched to right rail height
 * - Right: CMS metadata rail; contain icon top-flushed (pt-0 + oversized glyph)
 */
export function PrivateArticle({ article }: { article: UnlockedArticle }) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <BackButton fallbackHref="/" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/*
        Stretch wrappers (not the Cards alone): flex line cross-size → h-full cards
        so the left message card min-height matches the right column.
      */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="order-2 flex min-h-0 w-full lg:order-1 lg:min-w-0 lg:flex-[1.6]">
          <Card className="flex h-full w-full flex-col border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <CardHeader className="gap-3">
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                {article.description}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardHeader>
              <CardTitle className="font-heading text-xl font-semibold tracking-tight">Write-up</CardTitle>
              <CardDescription>Notes from the CMS markdown.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <Markdown content={article.markdown} />
            </CardContent>
          </Card>
        </div>

        <div className="order-1 flex min-h-0 w-full lg:order-2 lg:w-[min(100%,24rem)] lg:flex-[0.9] lg:shrink-0">
          {/* pt-0 kills Card py above media (project cover pattern) */}
          <Card className="flex h-full w-full flex-col overflow-hidden border-border/80 bg-card pt-0 shadow-none ring-1 ring-border/70">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
              <FileLock2
                className="pointer-events-none absolute left-1/2 top-[-6%] size-[150%] max-w-none -translate-x-1/2 object-contain object-top text-foreground/70"
                strokeWidth={1.05}
                aria-hidden
              />
            </div>
            <CardHeader>
              <CardDescription>Expires {formatExpiry(article.expiresAt)}</CardDescription>
              <CardTitle className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                {article.title}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Invited readers only. Do not share the PIN or this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pb-6 text-sm text-muted-foreground">
              <p>
                Slug · <span className="font-mono text-foreground">{article.slug}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
