import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const EXTERNAL_PLACEHOLDER = "/blog/external-placeholder.svg";

export function ContentCard({ item }: { item: ContentItem }) {
  const sourcedExternally = item.external && Boolean(item.externalUrl);
  const opensExternally = item.href.startsWith("http://") || item.href.startsWith("https://");
  const cover = item.cover || (sourcedExternally ? EXTERNAL_PLACEHOLDER : undefined);

  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden border-border/80 bg-card shadow-none ring-1 ring-border/70",
        "transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:bg-muted/25 hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)]",
        "dark:hover:shadow-[0_14px_36px_rgba(0,0,0,0.35)]",
      )}
    >
      <Link
        href={item.href}
        target={opensExternally ? "_blank" : undefined}
        rel={opensExternally ? "noreferrer" : undefined}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`${opensExternally ? "Open" : "Read"} ${item.title}`}
      />
      {cover ? (
        <div className="overflow-hidden">
          <Image
            src={cover}
            alt=""
            width={800}
            height={500}
            unoptimized={cover.endsWith(".svg")}
            className="aspect-[16/10] w-full bg-accent object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <CardHeader>
        <CardDescription>{item.date}</CardDescription>
        <CardTitle className="text-lg transition-colors duration-300 group-hover:text-foreground">
          {item.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">{item.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex flex-wrap gap-2">
        {sourcedExternally ? <Badge variant="secondary">External</Badge> : null}
        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
        <span className="ms-auto inline-flex h-7 items-center rounded-lg border border-border px-2.5 text-[0.8rem] font-medium text-foreground transition-colors duration-300 group-hover:bg-muted">
          {opensExternally ? "Open" : "Read"}
        </span>
      </CardFooter>
    </Card>
  );
}
