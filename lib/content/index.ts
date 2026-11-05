import { parseMarkdownFile } from "@/lib/content/parse";
import type { ContentItem, ContentKind } from "@/lib/content/types";

const blogModules = import.meta.glob<string>("../../content/blog/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const projectModules = import.meta.glob<string>("../../content/projects/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function modulesToItems(
  kind: ContentKind,
  modules: Record<string, string>,
): ContentItem[] {
  return Object.entries(modules)
    .map(([filepath, source]) => {
      const filename = filepath.split("/").pop() || filepath;
      const { meta, body } = parseMarkdownFile(kind, filename, source);
      return {
        ...meta,
        kind,
        body,
        href:
          meta.external && meta.externalUrl
            ? meta.externalUrl
            : `/${kind === "blog" ? "blog" : "project"}/${meta.slug}`,
      } satisfies ContentItem;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

let blogsCache: ContentItem[] | null = null;
let projectsCache: ContentItem[] | null = null;

export function getBlogs() {
  blogsCache ??= modulesToItems("blog", blogModules);
  return blogsCache;
}

export function getBlog(slug: string) {
  return getBlogs().find((item) => item.slug === slug);
}

export function getProjects() {
  projectsCache ??= modulesToItems("project", projectModules);
  return projectsCache;
}

export function getProject(slug: string) {
  return getProjects().find((item) => item.slug === slug);
}

export function getFeaturedProjects(limit = 3) {
  return getProjects().slice(0, limit);
}

export function getFeaturedBlogs(limit = 3) {
  return getBlogs().slice(0, limit);
}
