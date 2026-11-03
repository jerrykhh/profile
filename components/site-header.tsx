"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/profile";

const links = [
  { href: "/", label: "Home" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/ext/link", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <Button variant="ghost" nativeButton={false} render={<Link href="/" />}>
          {siteConfig.brand}
        </Button>
        <div className="flex items-center gap-2">
          <nav className="flex max-w-[min(70vw,28rem)] items-center gap-1 overflow-x-auto">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Button
                  key={link.href}
                  size="sm"
                  variant={active ? "default" : "ghost"}
                  nativeButton={false}
                  render={<Link href={link.href} />}
                >
                  {link.label}
                </Button>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
