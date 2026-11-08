import type { Metadata } from "next";

import { ContactNameCard } from "@/components/contact-name-card";
import { HeroShader } from "@/components/hero-shader";
import { extLinkConfig, siteConfig } from "@/config/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Connect with ${siteConfig.name} — ${siteConfig.title} in ${siteConfig.location}.`,
};

export default function ExtLinkPage() {
  return (
    <section className="relative isolate -mt-16 flex min-h-[min(100vh,58rem)] items-center justify-center overflow-hidden px-4 pb-16 pt-24 md:px-8">
      <HeroShader />
      <div className="relative z-10 flex w-full justify-center">
        <ContactNameCard />
      </div>
      <span className="sr-only">{extLinkConfig.intro}</span>
    </section>
  );
}
