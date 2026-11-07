"use client";

import { useEffect, useState } from "react";
import { CursorRipples, Grid, MeshGradient, Shader } from "shaders/react";

import { cn } from "@/lib/utils";

type HeroShaderProps = {
  className?: string;
};

/**
 * Cobalt frost — clear ultramarine + ice mist + one apricot bloom.
 * Alternatives considered and rejected for this pass:
 * - lime/cyan/yellow: previous ship; too close to default SaaS mesh
 * - celadon/jade: calm but too close to the prior green family
 * - rose/clay on warm paper: tastes like banned cream+terracotta
 * This reads cooler and more decisive with dark ink and liquid-glass nav.
 */
const MESH_STOPS = [
  { color: "#e7eef8", position: 0 },
  { color: "#6b8cff", position: 0.28 },
  { color: "#2f4fd6", position: 0.5 },
  { color: "#c9d7ef", position: 0.72 },
  { color: "#efb892", position: 1 },
] as const;

export function HeroShader({ className }: HeroShaderProps) {
  const [mounted, setMounted] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 bg-[#e8eef8]" />
      <div className="absolute -left-[18%] top-[4%] size-[56vmax] rounded-full bg-[#6b8cff]/70 blur-3xl" />
      <div className="absolute left-[30%] -top-[16%] size-[44vmax] rounded-full bg-[#efb892]/65 blur-3xl" />
      <div className="absolute -right-[16%] top-[-4%] size-[62vmax] rounded-full bg-[#2f4fd6]/50 blur-3xl" />
      <div className="absolute bottom-[-22%] right-[2%] size-[52vmax] rounded-full bg-[#c9d7ef]/85 blur-3xl" />
      <div className="absolute bottom-[0%] left-[10%] size-[40vmax] rounded-full bg-[#4d6ef0]/40 blur-3xl" />

      {mounted && available ? (
        <Shader
          className="absolute inset-0 size-full"
          onUnavailable={() => setAvailable(false)}
        >
          <CursorRipples intensity={10} decay={7} radius={0.52} chromaticSplit={0.2} edges="stretch">
            <MeshGradient
              colorA="#6b8cff"
              colorB="#efb892"
              stops={[...MESH_STOPS]}
              colorSpace="oklch"
              count={6}
              smoothness={2.3}
              variation={0.38}
              swirl={0.2}
              drift={0.5}
              wrapping={0.05}
              speed={0.25}
              seed={27}
            />
            <Grid
              color="#b8c2d1"
              cellColor="transparent"
              cells={18}
              thickness={0.035}
              softness={0.35}
              opacity={0.18}
              blendMode="multiply"
            />
          </CursorRipples>
        </Shader>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(100,116,139,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.22) 1px, transparent 1px)",
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
