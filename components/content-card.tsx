"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import type { ContentItem } from "@/lib/content/types";

export function ContentCard({ item }: { item: ContentItem }) {
  const reduceMotion = useReducedMotion();
  const isExternal = item.external && Boolean(item.externalUrl);

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
    >
      <Link
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="flex h-full flex-col"
      >
        {item.cover ? (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={item.cover}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-[radial-gradient(circle_at_30%_20%,#470c35,transparent_60%),#1b0e17]" />
        )}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <time className="text-xs text-white/55">{item.date}</time>
            {isExternal ? <Badge variant="secondary">External</Badge> : null}
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl leading-tight text-white">{item.title}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-white/65">{item.description}</p>
          {item.tags.length ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {item.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="border-white/20 text-white/70">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}
