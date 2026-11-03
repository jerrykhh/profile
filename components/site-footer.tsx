import Link from "next/link";

import { profileConfig, siteConfig } from "@/config/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="flex flex-col gap-2">
          <p className="font-[family-name:var(--font-display)] text-3xl font-semibold">{siteConfig.brand}</p>
          <p className="text-sm text-muted-foreground">
            {siteConfig.name} · {siteConfig.location}
          </p>
          <p className="text-sm text-muted-foreground">© {year}</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {profileConfig.socials.map((social) => (
            <Link
              key={social.id}
              href={social.href}
              className="hover:text-foreground"
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
