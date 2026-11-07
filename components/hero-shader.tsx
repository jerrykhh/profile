"use client";

import { useEffect, useState } from "react";
import { CursorRipples, FlowingGradient, Shader } from "shaders/react";

import { cn } from "@/lib/utils";

type HeroShaderProps = {
  className?: string;
};

export function HeroShader({ className }: HeroShaderProps) {
  const [mounted, setMounted] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(95%_80%_at_18%_12%,#3a4654_0%,#1a222c_38%,#0b0d10_72%,#060708_100%)]" />
      <div className="absolute -left-1/4 top-1/4 size-[55vmax] rounded-full bg-[#6f7f8f]/25 blur-3xl" />
      <div className="absolute -right-1/5 bottom-0 size-[45vmax] rounded-full bg-[#243040]/55 blur-3xl" />
      {mounted && available ? (
        <Shader
          className="absolute inset-0 size-full"
          onUnavailable={() => setAvailable(false)}
        >
          <CursorRipples intensity={9} decay={8} radius={0.48} chromaticSplit={0.35} edges="stretch">
            <FlowingGradient
              colorA="#07090c"
              colorB="#243040"
              colorC="#6f7f8f"
              colorD="#c8d0d8"
              colorSpace="oklch"
              speed={0.32}
              distortion={0.62}
              seed={7}
            />
          </CursorRipples>
        </Shader>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.55)_78%,var(--background)_100%)]" />
    </div>
  );
}
