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
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-10 md:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-sm">
        <Image
          src={extLinkConfig.icon}
          alt={`${siteConfig.name} avatar`}
          width={720}
          height={720}
          className="aspect-square w-full rounded-[1.4rem] object-cover"
          priority
        />
        <p className="mt-5 text-center text-xs font-medium tracking-[0.18em] text-muted-foreground">PROMPT</p>
        <p className="mt-2 rounded-2xl bg-secondary px-4 py-3 text-center text-sm text-secondary-foreground">
          {extLinkConfig.prompt}
        </p>
        <h1 className="mt-5 text-center font-[family-name:var(--font-display)] text-3xl font-semibold">{siteConfig.brand}</h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">{extLinkConfig.intro}</p>
        <div className="mt-6 flex flex-col gap-3">
          {extLinkConfig.links.map((link) => (
            <LinkButton
              key={link.id}
              href={link.href}
              target={link.href.startsWith("/") ? undefined : "_blank"}
              rel={link.href.startsWith("/") ? undefined : "noreferrer"}
              variant="outline"
              className="h-12 rounded-2xl"
            >
              {link.label}
            </LinkButton>
          ))}
        </div>
      </div>
    </div>
  );
}
