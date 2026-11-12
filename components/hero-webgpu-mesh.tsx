"use client";

import { useEffect, useState } from "react";
import { Blur, CursorRipples, Grid, MeshGradient, Shader } from "shaders/react";

import { cobaltFrostDark, cobaltFrostLight } from "@/lib/cobalt-frost";
import { cn } from "@/lib/utils";

type HeroWebGpuMeshProps = {
  dark: boolean;
  reduceMotion: boolean;
  className?: string;
};

/**
 * Heavy WebGPU mesh — keep this module out of the critical path.
 * Loaded only after first paint via dynamic import from HeroShader.
 */
export function HeroWebGpuMesh({ dark, reduceMotion, className }: HeroWebGpuMeshProps) {
  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState(true);
  const [themePaint, setThemePaint] = useState(dark);

  // Reset readiness during render when theme flips so the new mesh never
  // paints one frame at full opacity before the fade-in effect runs.
  if (dark !== themePaint) {
    setThemePaint(dark);
    if (ready) setReady(false);
  }

  useEffect(() => {
    // Theme flips remount via key from parent; keep ready false until onReady.
    setReady(false);
  }, [dark]);

  if (!available) return null;

  const palette = dark ? cobaltFrostDark : cobaltFrostLight;

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
    <div
      className={cn(
        "absolute inset-0 size-full transition-opacity duration-700 ease-out will-change-[opacity]",
        ready ? "opacity-[0.88]" : "opacity-0",
        className,
      )}
      // Extra CSS blur softens GPU/browser differences in the interaction field.
      style={{ filter: "blur(2px)" }}
      aria-hidden
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
  );
}
