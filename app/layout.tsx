import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/profile";
import { cn } from "@/lib/utils";

import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand} · ${siteConfig.title}`,
    template: `%s · ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.profileIcon,
  },
  openGraph: {
    title: siteConfig.brand,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.brand,
    images: [{ url: siteConfig.profileIcon }],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark", display.variable, body.variable)}>
      <body className="font-[family-name:var(--font-body)]">
        <SiteHeader />
        <main className="min-h-[70vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
