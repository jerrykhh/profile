import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-script";
import { siteConfig } from "@/config/profile";
import { cn } from "@/lib/utils";

import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" suppressHydrationWarning className={cn(display.variable, body.variable)}>
      <body className="font-[family-name:var(--font-body)]">
        <ThemeScript />
        <SiteHeader />
        <main className="min-h-[70vh] pt-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
