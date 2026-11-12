"use client";

import { HeroShader } from "@/components/hero-shader";

/**
 * Viewport-tall hero atmosphere shared by home and contact.
 * Lives in the (cobalt) layout so CSS frost (+ deferred WebGPU) persists across
 * those routes. Sibling sections use pointer-events-none so ripples still receive
 * the cursor after the mesh chunk loads.
 */
export function CobaltHeroBackdrop() {
  return (
    // Pull up under the fixed header (main has pt-16) so frost fills the top
    // edge — no body-colored bar behind the glass nav.
    <div className="absolute inset-x-0 -top-16 z-0 h-[min(100vh,58rem)] overflow-hidden">
      <HeroShader />
    </div>
  );
}
