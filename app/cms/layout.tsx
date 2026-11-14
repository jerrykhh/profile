import type { Metadata } from "next";

import { HIDDEN_ROBOTS } from "@/lib/private/routes";

export const metadata: Metadata = {
  title: { absolute: "CMS" },
  robots: HIDDEN_ROBOTS,
  referrer: "no-referrer",
};

/** CMS chrome: no site header/footer (outside app/(site)). */
export default function CmsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-screen bg-background px-4 py-16">{children}</main>;
}
