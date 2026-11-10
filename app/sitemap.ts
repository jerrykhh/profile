import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/profile";
import { getBlogs, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/blog", "/project", "/ext/link"].map((path) => ({
    url: `${siteConfig.url}${path || "/"}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogs: MetadataRoute.Sitemap = getBlogs()
    .filter((item) => !(item.external && item.externalUrl))
    .map((item) => ({
      url: `${siteConfig.url}/blog/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  const projects: MetadataRoute.Sitemap = getProjects().map((item) => ({
    url: `${siteConfig.url}/project/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogs, ...projects];
}
