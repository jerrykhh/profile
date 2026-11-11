"use client";

import { HeroShader } from "@/components/hero-shader";

/**
 * Viewport-tall hero atmosphere shared by home and contact.
 * Lives in the (cobalt) layout so WebGPU/CSS orbs persist across those routes.
 * Sibling sections use pointer-events-none so ripples still receive the cursor.
 */
export function CobaltHeroBackdrop() {
  return (
    <div className="absolute inset-x-0 top-0 z-0 h-[min(100vh,58rem)] overflow-hidden">
      <HeroShader />
    </div>
  );
}
