import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem } from "@/lib/content/types";

const EXTERNAL_PLACEHOLDER = "/blog/external-placeholder.svg";

export function ContentCard({ item }: { item: ContentItem }) {
  const isExternal = item.external && Boolean(item.externalUrl);
  const cover = item.cover || (isExternal ? EXTERNAL_PLACEHOLDER : undefined);

  return (
    <Card className="group relative h-full border-border/80 bg-card shadow-none ring-1 ring-border/70 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-muted/30">
      <Link
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`${isExternal ? "Open" : "Read"} ${item.title}`}
      />
      {cover ? (
        <Image
          src={cover}
          alt=""
          width={800}
          height={500}
          unoptimized={cover.endsWith(".svg")}
          className="aspect-[16/10] w-full bg-accent object-cover"
        />
      ) : null}
      <CardHeader>
        <CardDescription>{item.date}</CardDescription>
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <CardDescription className="line-clamp-3">{item.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex flex-wrap gap-2">
        {isExternal ? <Badge variant="secondary">External</Badge> : null}
        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
        <span className="ms-auto inline-flex h-7 items-center rounded-lg border border-border px-2.5 text-[0.8rem] font-medium text-foreground transition-colors group-hover:bg-muted">
          {isExternal ? "Open" : "Read"}
        </span>
      </CardFooter>
    </Card>
  );
}
