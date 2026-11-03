"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/ext/link", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <Link href="/" className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
          {siteConfig.brand}
        </Link>
        <div className="flex items-center gap-2">
          <nav className="flex max-w-[min(72vw,28rem)] items-center gap-1 overflow-x-auto rounded-full border border-border bg-card p-1">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:text-sm",
                    active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
