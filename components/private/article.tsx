import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

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
import { siteConfig } from "@/config/profile";
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
 * Unlocked layout: project-like grid, but CMS description lives on the left.
 * Top meta module carries icon + title + audience (description) + expiry;
 * write-up follows. Right aside is a slim private rail (not the primary copy).
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

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(240px,0.75fr)]">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <CardHeader className="gap-4">
              <div className="flex flex-wrap items-start gap-4">
                <Image
                  src={siteConfig.profileIcon}
                  alt=""
                  width={72}
                  height={72}
                  className="size-[72px] shrink-0 rounded-2xl object-cover shadow-sm ring-1 ring-border/60"
                  priority
                />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                    Private note
                  </p>
                  <CardTitle className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Expires {formatExpiry(article.expiresAt)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Separator />
              <div className="space-y-1.5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Audience
                </p>
                <p className="text-base leading-relaxed text-foreground">{article.description}</p>
              </div>
            </CardContent>
          </Card>

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
          <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
                <Lock className="size-4" aria-hidden />
              </div>
              <CardTitle className="font-heading text-lg font-semibold tracking-tight">Private</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Invited readers only. Do not share the PIN, screenshots, or this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Slug · <span className="font-mono text-foreground">{article.slug}</span>
              </p>
              <p>Expires · {formatExpiry(article.expiresAt)}</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
