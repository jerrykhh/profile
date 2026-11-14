import type { Metadata } from "next";

import { ContactNameCard } from "@/components/contact-name-card";
import { extLinkConfig, siteConfig } from "@/config/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Connect with ${siteConfig.name} — ${siteConfig.title} in ${siteConfig.location}.`,
  alternates: { canonical: "/ext/link" },
};

export default function ExtLinkPage() {
  return (
    <section className="pointer-events-none relative z-10 -mt-16 flex min-h-[min(100vh,58rem)] items-center justify-center overflow-x-hidden px-4 pb-16 pt-24 md:px-8">
      <div className="pointer-events-auto relative flex w-full justify-center py-4">
        <h1 className="sr-only">Contact — {siteConfig.name}</h1>
        <ContactNameCard />
      </div>
      <span className="sr-only">{extLinkConfig.intro}</span>
    </section>
  );
}
