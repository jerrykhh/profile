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

const documentTitle = "Profile | Jerry Kwok";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: documentTitle,
    template: "%s | Jerry Kwok",
  },
  description: siteConfig.description,
  applicationName: "Profile | Jerry Kwok",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: siteConfig.profileIcon,
  },
  openGraph: {
    title: documentTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: documentTitle,
    locale: "en_HK",
    type: "website",
    images: [
      {
        url: siteConfig.profileIcon,
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: documentTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.profileIcon,
        alt: siteConfig.name,
      },
    ],
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
