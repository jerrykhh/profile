import Link from "next/link";

import { profileConfig, siteConfig } from "@/config/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0d060b]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-display)] text-4xl text-white md:text-6xl">{siteConfig.brand}</p>
          <p className="text-sm text-white/60">© {year} {siteConfig.brand}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          {profileConfig.socials.map((social) => (
            <Link key={social.id} href={social.href} className="hover:text-white" target={social.href.startsWith("mailto:") ? undefined : "_blank"}>
              {social.label}
            </Link>
          ))}
          <Link href="/ext/link" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
