import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/profile";
import { ROBOTS_DISALLOW } from "@/lib/private/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...ROBOTS_DISALLOW],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
