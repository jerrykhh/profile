import matter from "gray-matter";

import type { ContentKind, ContentMeta } from "@/lib/content/types";

type RawFrontmatter = {
  slug?: string;
  uri?: string;
  title?: string;
  name?: string;
  description?: string;
  date?: string | Date;
  tags?: string[] | string;
  tag?: string;
  cover?: string;
  icon?: string;
  external?: boolean;
  externalUrl?: string;
  repository?: string;
  language?: string;
};

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseTags(raw: RawFrontmatter): string[] {
  if (Array.isArray(raw.tags)) {
    return raw.tags.map(String);
  }
  if (typeof raw.tags === "string") {
    return raw.tags
      .split(/[,\s]+/)
      .map((tag) => tag.replace(/^#/, "").trim())
      .filter(Boolean);
  }
  if (typeof raw.tag === "string") {
    return raw.tag
      .split(/[,\s]+/)
      .map((tag) => tag.replace(/^#/, "").trim())
      .filter(Boolean);
  }
  return [];
}

function parseDate(value: string | Date | undefined): string {
  if (!value) return "1970-01-01";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function resolveCover(kind: ContentKind, slug: string, raw: RawFrontmatter): string | undefined {
  if (raw.cover) return raw.cover;
  if (!raw.icon) return undefined;
  if (raw.icon.startsWith("/")) return raw.icon;
  const folder = kind === "blog" ? "blog" : "project";
  return `/${folder}/${slug}/${raw.icon}`;
}

export function parseMarkdownFile(kind: ContentKind, filename: string, source: string) {
  const { data, content } = matter(source);
  const raw = data as RawFrontmatter;
  const fallbackSlug = filename.replace(/\.mdx?$/, "");
  const slug = toSlug(raw.slug || raw.uri || fallbackSlug);

  const meta: ContentMeta = {
    slug,
    title: raw.title || raw.name || slug,
    name: raw.name,
    description: raw.description || "",
    date: parseDate(raw.date),
    tags: parseTags(raw),
    cover: resolveCover(kind, raw.uri || slug, raw),
    external: Boolean(raw.external || raw.externalUrl),
    externalUrl: raw.externalUrl,
    repository: raw.repository,
    language: raw.language,
  };

  return { meta, body: content.trim() };
}
