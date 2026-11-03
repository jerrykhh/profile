import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-script";
import { siteConfig } from "@/config/profile";
import { cn } from "@/lib/utils";

import "./globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" suppressHydrationWarning className={cn(grotesk.variable)}>
      <body className="font-sans">
        <ThemeScript />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
