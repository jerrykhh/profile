"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  localStorage.setItem("theme", dark ? "dark" : "light");
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(isDark());
    setReady(true);
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
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
