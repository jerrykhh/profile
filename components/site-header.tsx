"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/ext/link", label: "Contact" },
];

const glassShell = cn(
  "border border-white/50",
  "bg-[linear-gradient(155deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.16)_100%)]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(255,255,255,0.1),0_14px_44px_rgba(15,23,42,0.12)]",
  "backdrop-blur-[22px] backdrop-saturate-150",
  "ring-1 ring-inset ring-white/30",
);

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 md:px-8">
        <div aria-hidden className="min-w-0" />
        <nav
          className={cn(
            "flex max-w-[min(92vw,34rem)] items-center justify-center gap-0.5 overflow-x-auto rounded-full px-1.5 py-1",
            glassShell,
          )}
        >
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
                className={cn(
                  "rounded-full",
                  active
                    ? "bg-foreground/90 text-background shadow-sm hover:bg-foreground"
                    : "bg-transparent text-foreground/80 hover:bg-white/30 hover:text-foreground",
                )}
                nativeButton={false}
                render={<Link href={link.href} />}
              >
                {link.label}
              </Button>
            );
          })}
        </nav>
        <div className="flex justify-end">
          <div className={cn("rounded-full p-0.5", glassShell)}>
            <ThemeToggle variant="ghost" />
          </div>
        </div>
      </div>
    </header>
  );
}
