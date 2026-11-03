import type { Metadata } from "next";
import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { extLinkConfig, siteConfig } from "@/config/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: extLinkConfig.intro,
};

export default function ExtLinkPage() {
  return (
    <div className="mx-auto flex min-h-[80svh] w-full max-w-md flex-col items-center justify-center gap-8 px-5 py-16">
      <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <Image
          src={extLinkConfig.icon}
          alt={`${siteConfig.name} avatar`}
          width={640}
          height={640}
          className="mb-5 aspect-square w-full rounded-2xl object-cover"
          priority
        />
        <p className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-white/45">Prompt</p>
        <p className="mb-6 rounded-2xl bg-black/30 px-4 py-3 text-center text-sm text-white/70">{extLinkConfig.prompt}</p>
        <h1 className="mb-3 text-center font-[family-name:var(--font-display)] text-3xl text-white">{siteConfig.brand}</h1>
        <p className="mb-8 text-center text-sm leading-relaxed text-white/70">{extLinkConfig.intro}</p>
        <div className="flex flex-col gap-3">
          {extLinkConfig.links.map((link) => (
            <LinkButton
              key={link.id}
              href={link.href}
              target={link.href.startsWith("/") ? undefined : "_blank"}
              rel={link.href.startsWith("/") ? undefined : "noreferrer"}
              variant="outline"
              className="h-12 rounded-2xl border-white/20 bg-transparent text-white hover:bg-white hover:text-[#0d060b]"
            >
              {link.label}
            </LinkButton>
          ))}
        </div>
      </div>
    </div>
  );
}
