"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const THEME_TRANSITION_MS = 400;

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function commitTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  localStorage.setItem("theme", dark ? "dark" : "light");
  window.dispatchEvent(new Event("themechange"));
}

function applyTheme(dark: boolean, enableTransition: boolean) {
  const root = document.documentElement;

  if (!enableTransition) {
    root.classList.remove("theme-transition");
    commitTheme(dark);
    return;
  }

  root.classList.add("theme-transition");
  // Ensure the transition rule is committed before the class swap paints.
  void root.offsetWidth;

  const startViewTransition = document.startViewTransition?.bind(document);
  if (startViewTransition) {
    const transition = startViewTransition(() => {
      commitTheme(dark);
    });
    void transition.finished.finally(() => {
      root.classList.remove("theme-transition");
    });
    return;
  }

  commitTheme(dark);
}

export function ThemeToggle({
  className,
  variant = "outline",
}: {
  className?: string;
  variant?: "outline" | "ghost";
}) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);
  const clearTransitionRef = useRef<number | null>(null);

  useEffect(() => {
    setDark(isDark());
    setReady(true);

    return () => {
      if (clearTransitionRef.current !== null) {
        window.clearTimeout(clearTransitionRef.current);
      }
      document.documentElement.classList.remove("theme-transition");
    };
  }, []);

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      className={cn("rounded-full border-transparent bg-transparent shadow-none", className)}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        const next = !isDark();
        const animate = !prefersReducedMotion();

        if (clearTransitionRef.current !== null) {
          window.clearTimeout(clearTransitionRef.current);
          clearTransitionRef.current = null;
        }

        applyTheme(next, animate);
        setDark(next);

        // Fallback path (no View Transitions): clear the temp class after CSS duration.
        if (animate && !document.startViewTransition) {
          clearTransitionRef.current = window.setTimeout(() => {
            document.documentElement.classList.remove("theme-transition");
            clearTransitionRef.current = null;
          }, THEME_TRANSITION_MS);
        }
      }}
    >
      {ready && dark ? <Sun /> : <Moon />}
    </Button>
  );
}
