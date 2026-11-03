"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { ContentItem } from "@/lib/content/types";

export function ContentCard({ item }: { item: ContentItem }) {
  const isExternal = item.external && Boolean(item.externalUrl);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="flex h-full flex-col"
      >
        {item.cover ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
            <Image
              src={item.cover}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-accent" />
        )}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <time className="text-xs text-muted-foreground">{item.date}</time>
            {isExternal ? <Badge variant="secondary">External</Badge> : null}
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-tight">{item.title}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          {item.tags.length ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {item.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
