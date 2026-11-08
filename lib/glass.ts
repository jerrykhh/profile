import { cn } from "@/lib/utils";

/** Shared liquid-glass shell used by the nav pill and frosted chrome. */
export const glassShell = cn(
  "border border-white/50",
  "bg-[linear-gradient(155deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.16)_100%)]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(255,255,255,0.1),0_14px_44px_rgba(15,23,42,0.12)]",
  "backdrop-blur-[22px] backdrop-saturate-150",
  "ring-1 ring-inset ring-white/30",
  // Night glass: cooler translucent plate over cobalt frost, not flat charcoal.
  "dark:border-white/15",
  "dark:bg-[linear-gradient(155deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_45%,rgba(120,150,220,0.08)_100%)]",
  "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.35),0_14px_44px_rgba(0,0,0,0.45)]",
  "dark:ring-white/10",
);
