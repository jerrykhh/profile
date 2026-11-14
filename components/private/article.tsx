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
 * Unlocked layout mirrors project detail:
 * - Left: colored audience/description module only (no private chrome, no personal avatar) + write-up
 * - Right: CMS metadata rail with envelope/project icon (not profile avatar)
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

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <div className="rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-4 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-50">
            <p className="text-base leading-relaxed">{article.description}</p>
          </div>

          <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-semibold tracking-tight">Write-up</CardTitle>
              <CardDescription>Markdown body from the CMS note.</CardDescription>
            </CardHeader>
            <CardContent>
              <Markdown content={article.markdown} />
            </CardContent>
          </Card>
        </div>

        <aside className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
          <Card className="overflow-hidden border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <div
              className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-sky-900 text-sky-100"
              aria-hidden
            >
              <FileLock2 className="size-16 opacity-90" strokeWidth={1.25} />
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
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Slug · <span className="font-mono text-foreground">{article.slug}</span>
              </p>
              <p>
                Expires · <span className="text-foreground">{formatExpiry(article.expiresAt)}</span>
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
