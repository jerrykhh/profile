"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { glassShell } from "@/lib/glass";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 320;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-4 bottom-4 z-40 size-11 rounded-full md:right-6 md:bottom-6",
        "text-foreground/85 hover:bg-white/35 hover:text-foreground dark:hover:bg-white/10",
        "transition-[opacity,transform,visibility] duration-200 ease-out",
        glassShell,
        visible
          ? "pointer-events-auto visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-2 opacity-0",
      )}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }}
    >
      <ArrowUp className="size-4" aria-hidden />
    </Button>
  );
}
