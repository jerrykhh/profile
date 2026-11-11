"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import type { ContentItem } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const EXTERNAL_PLACEHOLDER = "/blog/external-placeholder.svg";

export function ContentCard({ item }: { item: ContentItem }) {
  const [hovered, setHovered] = useState(false);
  const sourcedExternally = item.external && Boolean(item.externalUrl);
  const opensExternally = item.href.startsWith("http://") || item.href.startsWith("https://");
  const cover = item.cover || (sourcedExternally ? EXTERNAL_PLACEHOLDER : undefined);

  return (
    <Link
      href={item.href}
      target={opensExternally ? "_blank" : undefined}
      rel={opensExternally ? "noopener noreferrer" : undefined}
      data-card-link
      data-hovered={hovered ? "true" : "false"}
      aria-label={`${opensExternally ? "Open" : "Read"} ${item.title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl bg-card text-card-foreground",
        "ring-1 ring-border/70 outline-none",
        // Color / light only — no translateY or cover scale (no layout shift).
        "transition-[background-color,box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "data-[hovered=true]:bg-muted/30 data-[hovered=true]:ring-foreground/25",
        "data-[hovered=true]:shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_12px_32px_rgba(15,23,42,0.08)]",
        "dark:data-[hovered=true]:ring-white/25",
        "dark:data-[hovered=true]:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_32px_rgba(0,0,0,0.35)]",
        "focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {cover ? (
        <div className="relative overflow-hidden">
          <Image
            src={cover}
            alt=""
            width={800}
            height={500}
            unoptimized={cover.endsWith(".svg")}
            className="aspect-[16/10] w-full bg-accent object-cover"
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-300",
              hovered && "bg-foreground/[0.04]",
            )}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-1 px-4 pt-4">
        <p className="text-sm text-muted-foreground">{item.date}</p>
        <h3 className="font-heading text-lg font-medium leading-snug">{item.title}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{item.description}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/70 bg-muted/50 px-4 py-4">
        {sourcedExternally ? (
          <span className="inline-flex h-5 items-center rounded-4xl bg-secondary px-2 text-xs font-medium">
            External
          </span>
        ) : null}
        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
        <span
          className={cn(
            "ms-auto inline-flex h-7 items-center rounded-lg border border-border bg-background px-2.5 text-[0.8rem] font-medium text-foreground transition-colors duration-300",
            hovered && "border-foreground/30 bg-card text-foreground",
          )}
        >
          {opensExternally ? "Open" : "Read"}
        </span>
      </div>
    </Link>
  );
}
