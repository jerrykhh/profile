"use client";

import { useEffect, useState } from "react";
import { CursorTrail, FilmGrain, LinearGradient, Shader } from "shaders/react";

export function HeroShader() {
  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready || !available) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#470c35,transparent_55%),radial-gradient(circle_at_80%_70%,#1b0e17,transparent_50%),#0d060b]" />
    );
  }

  return (
    <Shader className="absolute inset-0 size-full" onUnavailable={() => setAvailable(false)}>
      <LinearGradient colorA="#0d060b" colorB="#470c35" />
      <FilmGrain strength={0.22} />
      <CursorTrail softness={0.55} />
    </Shader>
  );
}
