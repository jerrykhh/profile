import Image from "next/image";
import Link from "next/link";

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
import { siteConfig } from "@/config/profile";
import type { UnlockedArticle } from "@/lib/private/types";

/** Unlocked only — mirrors project detail: markdown main + right aside (icon + CMS title/description). */
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
        <Card className="order-2 border-border/80 bg-card shadow-none ring-1 ring-border/70 lg:order-1">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold tracking-tight">Private details</CardTitle>
            <CardDescription>Write-up unlocked for /private/{article.slug}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Markdown content={article.markdown} />
          </CardContent>
        </Card>

        <aside className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
          <Card className="overflow-hidden border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <div className="flex aspect-[16/10] w-full items-center justify-center bg-muted/60">
              <Image
                src={siteConfig.profileIcon}
                alt=""
                width={112}
                height={112}
                className="size-28 rounded-2xl object-cover shadow-sm ring-1 ring-border/60"
                priority
              />
            </div>
            <CardHeader>
              <CardDescription>Expires {article.expiresAt}</CardDescription>
              <CardTitle className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                {article.title}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">{article.description}</CardDescription>
            </CardHeader>
          </Card>
        </aside>
      </div>
    </div>
  );
}
