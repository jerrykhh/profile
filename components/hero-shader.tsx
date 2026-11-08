"use client";

import { useEffect, useState } from "react";
import { CursorRipples, Grid, MeshGradient, Shader } from "shaders/react";

import { cobaltFrostDark, cobaltFrostLight } from "@/lib/cobalt-frost";
import { cn } from "@/lib/utils";

type HeroShaderProps = {
  className?: string;
};

function readDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function HeroShader({ className }: HeroShaderProps) {
  const [mounted, setMounted] = useState(false);
  const [available, setAvailable] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sync = () => setDark(readDark());
    sync();

    const root = document.documentElement;
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("themechange", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("themechange", sync);
    };
  }, []);

  const palette = dark ? cobaltFrostDark : cobaltFrostLight;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: palette.base }} />
      {palette.orbs.map((orb) => (
        <div key={orb.className} className={orb.className} />
      ))}

      {mounted && available ? (
        <Shader
          key={dark ? "mesh-dark" : "mesh-light"}
          className="absolute inset-0 size-full"
          onUnavailable={() => setAvailable(false)}
        >
          <CursorRipples intensity={10} decay={7} radius={0.52} chromaticSplit={0.2} edges="stretch">
            <MeshGradient
              colorA={palette.colorA}
              colorB={palette.colorB}
              stops={[...palette.stops]}
              colorSpace="oklch"
              count={6}
              smoothness={2.3}
              variation={0.38}
              swirl={0.2}
              drift={0.5}
              wrapping={0.05}
              speed={0.25}
              seed={dark ? 41 : 27}
            />
            <Grid
              color={palette.grid}
              cellColor="transparent"
              cells={18}
              thickness={0.035}
              softness={0.35}
              opacity={dark ? 0.22 : 0.18}
              blendMode={dark ? "screen" : "multiply"}
            />
          </CursorRipples>
        </Shader>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, ${palette.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${palette.gridLine} 1px, transparent 1px)`,
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
