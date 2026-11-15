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
 * Unlocked private detail — separate left info Card + content Card; right meta rail.
 */
export function PrivateArticle({ article }: { article: UnlockedArticle }) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-10 text-foreground md:px-8">
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

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="order-2 flex min-h-0 w-full flex-col lg:order-1 lg:min-w-0 lg:flex-[1.6]">
          {/* Own Card — rounded on all 4 corners; not merged with content */}
          <Card className="shrink-0 rounded-xl border-border/80 bg-card text-card-foreground shadow-none ring-1 ring-border/70">
            <CardHeader>
              <p className="text-base leading-relaxed text-muted-foreground">{article.description}</p>
            </CardHeader>
          </Card>

          {/* Padding below info Card before content module */}
          <div className="h-5 shrink-0" aria-hidden />

          <Card className="flex min-h-0 flex-1 flex-col border-border/80 bg-card text-card-foreground shadow-none ring-1 ring-border/70">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-semibold tracking-tight text-card-foreground">
                Details
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Markdown body from the shared note.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <Markdown
                content={article.markdown}
                className="text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-a:text-primary"
              />
            </CardContent>
          </Card>
        </div>

        <div className="order-1 flex min-h-0 w-full lg:order-2 lg:w-[min(100%,24rem)] lg:flex-[0.9] lg:shrink-0">
          <Card className="flex h-full w-full flex-col overflow-hidden border-border/80 bg-card pt-0 text-card-foreground shadow-none ring-1 ring-border/70">
            <div
              className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted"
              data-private-icon-frame
              aria-hidden
            >
              <div className="absolute inset-0 flex items-start justify-center px-6 py-4">
                <FileLock2
                  size={220}
                  className="!h-full !w-auto max-h-full max-w-[80%] object-contain object-top text-muted-foreground"
                  strokeWidth={1.15}
                />
              </div>
            </div>
            <CardHeader>
              <CardDescription className="text-muted-foreground">
                Expires {formatExpiry(article.expiresAt)}
              </CardDescription>
              <CardTitle className="font-heading text-2xl font-semibold tracking-tight text-card-foreground md:text-3xl">
                {article.title}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
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
