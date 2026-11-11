"use client";

import { useEffect, useState } from "react";
import { Blur, CursorRipples, Grid, MeshGradient, Shader } from "shaders/react";

import { cobaltFrostDark, cobaltFrostLight } from "@/lib/cobalt-frost";
import { cn } from "@/lib/utils";

type HeroShaderProps = {
  className?: string;
};

function readDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function readReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Soft cobalt frost hero.
 * CSS orbs paint first (theme via html.dark) so home↔contact and hydration
 * never flash the wrong base color; WebGPU fades in only after onReady.
 * Ripples are low-intensity + blurred for calmer, GPU-stable motion.
 */
export function HeroShader({ className }: HeroShaderProps) {
  const [mounted, setMounted] = useState(false);
  const [available, setAvailable] = useState(true);
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Reset shader readiness during render when theme flips so the new mesh
  // never paints one frame at full opacity before the fade-in effect runs.
  const [themePaint, setThemePaint] = useState(dark);
  if (dark !== themePaint) {
    setThemePaint(dark);
    if (ready) setReady(false);
  }

  useEffect(() => {
    setMounted(true);
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

  const palette = dark ? cobaltFrostDark : cobaltFrostLight;
  const showShader = mounted && available;

  const mesh = (
    <>
      <MeshGradient
        colorA={palette.colorA}
        colorB={palette.colorB}
        stops={[...palette.stops]}
        colorSpace="oklch"
        count={5}
        smoothness={2.7}
        variation={reduceMotion ? 0.14 : 0.2}
        swirl={reduceMotion ? 0 : 0.06}
        drift={reduceMotion ? 0 : 0.22}
        wrapping={0}
        speed={reduceMotion ? 0 : 0.1}
        seed={dark ? 41 : 27}
      />
      <Grid
        color={palette.grid}
        cellColor="transparent"
        cells={16}
        thickness={0.03}
        softness={0.45}
        opacity={dark ? 0.16 : 0.14}
        blendMode={dark ? "screen" : "multiply"}
      />
    </>
  );

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* First paint: theme-correct CSS atmosphere (no JS). Soft target for WebGPU parity. */}
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

      {showShader ? (
        <div
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-700 ease-out will-change-[opacity]",
            ready ? "opacity-[0.88]" : "opacity-0",
          )}
          // Extra CSS blur softens GPU/browser differences in the interaction field.
          style={{ filter: "blur(2px)" }}
        >
          <Shader
            key={dark ? "mesh-dark" : "mesh-light"}
            className="absolute inset-0 size-full"
            colorSpace="srgb"
            toneMapping="neutral"
            onUnavailable={() => setAvailable(false)}
            onReady={() => setReady(true)}
          >
            {reduceMotion ? (
              mesh
            ) : (
              <Blur intensity={24}>
                <CursorRipples
                  intensity={3}
                  decay={15}
                  radius={0.32}
                  chromaticSplit={0}
                  edges="stretch"
                >
                  {mesh}
                </CursorRipples>
              </Blur>
            )}
          </Shader>
        </div>
      ) : null}

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
