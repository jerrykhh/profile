"use client";

import { useEffect, useState, type ComponentType } from "react";

import { cobaltFrostDark, cobaltFrostLight } from "@/lib/cobalt-frost";
import { cn } from "@/lib/utils";

type HeroShaderProps = {
  className?: string;
};

type MeshProps = {
  dark: boolean;
  reduceMotion: boolean;
};

function readDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function readReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasWebGpu() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

/** Phones / data-saver / reduced-motion stay on CSS frost — skip the ~2.5MB mesh chunk. */
function shouldSkipMesh() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) return true;
  return false;
}

async function hasGpuAdapter() {
  try {
    const gpu = navigator.gpu;
    if (!gpu) return false;
    const adapter = await gpu.requestAdapter();
    return adapter != null;
  } catch {
    return false;
  }
}

/**
 * Defer mesh import until after first paint / LCP.
 * Safari often lacks requestIdleCallback — never fall back to setTimeout(1).
 */
function scheduleDeferred(cb: () => void) {
  if (typeof window === "undefined") return () => {};

  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(() => cb(), { timeout: 2200 });
    return () => window.cancelIdleCallback(id);
  }

  // No rIC: wait for window load, then a short post-LCP delay.
  let timeoutId: number | undefined;
  const runAfterLoad = () => {
    timeoutId = window.setTimeout(cb, 2000);
  };

  if (document.readyState === "complete") {
    runAfterLoad();
  } else {
    window.addEventListener("load", runAfterLoad, { once: true });
  }

  return () => {
    window.removeEventListener("load", runAfterLoad);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}

/**
 * Soft cobalt frost hero.
 * CSS orbs paint first (theme via html.dark) so home↔contact and hydration
 * never flash the wrong base color. The WebGPU mesh chunk (~2.5MB) is
 * dynamically imported only after a Safari-safe defer + adapter check —
 * critical for iPhone Safari first paint / LCP.
 */
export function HeroShader({ className }: HeroShaderProps) {
  const [dark, setDark] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [Mesh, setMesh] = useState<ComponentType<MeshProps> | null>(null);

  useEffect(() => {
    const syncTheme = () => setDark(readDark());
    const syncMotion = () => setReduceMotion(readReducedMotion());
    syncTheme();
    syncMotion();

    const root = document.documentElement;
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("themechange", syncTheme);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => syncMotion();
    mq.addEventListener("change", onMotion);

    return () => {
      observer.disconnect();
      window.removeEventListener("themechange", syncTheme);
      mq.removeEventListener("change", onMotion);
    };
  }, []);

  useEffect(() => {
    if (!hasWebGpu()) return;
    if (shouldSkipMesh()) return;

    let cancelled = false;
    const cancelSchedule = scheduleDeferred(() => {
      void (async () => {
        const ok = await hasGpuAdapter();
        if (cancelled || !ok) return;
        try {
          const mod = await import("@/components/hero-webgpu-mesh");
          if (!cancelled) setMesh(() => mod.HeroWebGpuMesh);
        } catch {
          // Keep CSS atmosphere if the chunk fails (offline / flaky mobile).
        }
      })();
    });

    return () => {
      cancelled = true;
      cancelSchedule();
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* First paint: theme-correct CSS atmosphere (no JS / no WebGPU). */}
      <div className="absolute inset-0 bg-[#e8eef8] transition-colors duration-400 motion-reduce:transition-none dark:bg-[#070b16]" />
      {/* Opacity crossfade (not display swap) so light↔dark frost orbs ease with the theme flip. */}
      <div className="absolute inset-0 opacity-100 transition-opacity duration-400 motion-reduce:transition-none dark:opacity-0">
        {cobaltFrostLight.orbs.map((orb) => (
          <div key={`light-${orb.className}`} className={orb.className} />
        ))}
      </div>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-400 motion-reduce:transition-none dark:opacity-100">
        {cobaltFrostDark.orbs.map((orb) => (
          <div key={`dark-${orb.className}`} className={orb.className} />
        ))}
      </div>

      {Mesh ? <Mesh dark={dark} reduceMotion={reduceMotion} /> : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-400 motion-reduce:transition-none dark:opacity-25"
        style={{
          backgroundImage: `linear-gradient(to right, var(--hero-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--hero-grid-line) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, transparent 18%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.8) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 18%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
