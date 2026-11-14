import Link from "next/link";

import { DetailFrame } from "@/components/detail-frame";
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

/** Unlocked private content shell — same visual language as project detail. */
export function PrivateArticle({ article }: { article: UnlockedArticle }) {
  return (
    <DetailFrame
      backHref="/"
      breadcrumb={
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
      }
      main={
        <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold tracking-tight">Private details</CardTitle>
            <CardDescription>Write-up unlocked for /private/{article.slug}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Markdown content={article.markdown} />
          </CardContent>
        </Card>
      }
      aside={
        <Card className="overflow-hidden border-border/80 bg-card shadow-none ring-1 ring-border/70">
          <CardHeader>
            <CardDescription>Expires {article.expiresAt}</CardDescription>
            <CardTitle className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              {article.title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">{article.description}</CardDescription>
          </CardHeader>
        </Card>
      }
    />
  );
}
