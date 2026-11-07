"use client";

import { useEffect, useState } from "react";
import { CursorRipples, Grid, MeshGradient, Shader } from "shaders/react";

import { cn } from "@/lib/utils";

type HeroShaderProps = {
  className?: string;
};

const MESH_STOPS = [
  { color: "#d9f56a", position: 0 },
  { color: "#9aef5c", position: 0.22 },
  { color: "#5eead4", position: 0.48 },
  { color: "#38bdf8", position: 0.7 },
  { color: "#f6e27a", position: 1 },
] as const;

export function HeroShader({ className }: HeroShaderProps) {
  const [mounted, setMounted] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* CSS fallback: soft lime / cyan / warm yellow mesh */}
      <div className="absolute inset-0 bg-[#e8f7b0]" />
      <div className="absolute -left-[18%] top-[8%] size-[58vmax] rounded-full bg-[#5eead4]/80 blur-3xl" />
      <div className="absolute left-[28%] -top-[12%] size-[42vmax] rounded-full bg-[#f6e27a]/85 blur-3xl" />
      <div className="absolute -right-[12%] top-[-8%] size-[62vmax] rounded-full bg-[#b8f04a] blur-3xl" />
      <div className="absolute bottom-[-18%] right-[8%] size-[48vmax] rounded-full bg-[#f4de6a]/75 blur-3xl" />
      <div className="absolute bottom-[4%] left-[18%] size-[36vmax] rounded-full bg-[#2dd4bf]/55 blur-3xl" />

      {mounted && available ? (
        <Shader
          className="absolute inset-0 size-full"
          onUnavailable={() => setAvailable(false)}
        >
          <CursorRipples intensity={10} decay={7} radius={0.52} chromaticSplit={0.25} edges="stretch">
            <MeshGradient
              colorA="#9aef5c"
              colorB="#5eead4"
              stops={[...MESH_STOPS]}
              colorSpace="oklch"
              count={6}
              smoothness={2.4}
              variation={0.42}
              swirl={0.18}
              drift={0.55}
              wrapping={0.08}
              speed={0.28}
              seed={14}
            />
            <Grid
              color="#d4d4d8"
              cellColor="transparent"
              cells={18}
              thickness={0.035}
              softness={0.35}
              opacity={0.22}
              blendMode="multiply"
            />
          </CursorRipples>
        </Shader>
      ) : null}

      {/* Faint geometric grid stronger toward the bottom (works with or without WebGPU) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.28) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, transparent 18%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.85) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 18%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
