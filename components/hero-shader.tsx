"use client";

import { useEffect, useState } from "react";
import { FilmGrain, LinearGradient, Shader } from "shaders/react";

export function HeroShader() {
  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    setReady(true);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const fallback = dark
    ? "absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#16382e,transparent_55%),#1d1b18]"
    : "absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#d7efe6,transparent_55%),#fffdf8]";

  if (!ready || !available) {
    return <div className={fallback} />;
  }

  return (
    <Shader className="absolute inset-0 size-full" onUnavailable={() => setAvailable(false)}>
      <LinearGradient colorA={dark ? "#12110f" : "#f4f0e8"} colorB={dark ? "#16382e" : "#cfeedf"} />
      <FilmGrain strength={dark ? 0.18 : 0.12} />
    </Shader>
  );
}
