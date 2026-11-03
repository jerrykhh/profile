"use client";

import dynamic from "next/dynamic";

const HeroShader = dynamic(
  () => import("@/components/hero-shader").then((mod) => mod.HeroShader),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#470c35,transparent_55%),radial-gradient(circle_at_80%_70%,#1b0e17,transparent_50%),#0d060b]" />
    ),
  },
);

export function HeroShaderLazy() {
  return <HeroShader />;
}
