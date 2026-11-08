"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  localStorage.setItem("theme", dark ? "dark" : "light");
  window.dispatchEvent(new Event("themechange"));
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

  useEffect(() => {
    setDark(isDark());
    setReady(true);
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
        applyTheme(next);
        setDark(next);
      }}
    >
      {ready && dark ? <Sun /> : <Moon />}
    </Button>
  );
}
