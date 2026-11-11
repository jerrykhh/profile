/**
 * Cobalt frost mesh palettes — light day frost vs night cobalt.
 *
 * Dark alternatives considered and rejected for this pass:
 * - flat charcoal + one grey bloom (safe, lifeless)
 * - purple/indigo glow (AI-default dark)
 * - neon cyan cyber (noisy, fights ink type)
 *
 * Night cobalt keeps the same ultramarine + ice + banked apricot grammar,
 * just deeper and more luminous so dark theme isn’t “broken light colors”.
 */

export type MeshStop = { color: string; position: number };

export const cobaltFrostLight = {
  base: "#e8eef8",
  colorA: "#6b8cff",
  colorB: "#efb892",
  grid: "#b8c2d1",
  stops: [
    { color: "#e7eef8", position: 0 },
    { color: "#6b8cff", position: 0.28 },
    { color: "#2f4fd6", position: 0.5 },
    { color: "#c9d7ef", position: 0.72 },
    { color: "#efb892", position: 1 },
  ] satisfies MeshStop[],
  orbs: [
    { className: "absolute -left-[18%] top-[4%] size-[56vmax] rounded-full bg-[#6b8cff]/70 blur-3xl" },
    { className: "absolute left-[30%] -top-[16%] size-[44vmax] rounded-full bg-[#efb892]/65 blur-3xl" },
    { className: "absolute -right-[16%] top-[-4%] size-[62vmax] rounded-full bg-[#2f4fd6]/50 blur-3xl" },
    { className: "absolute bottom-[-22%] right-[2%] size-[52vmax] rounded-full bg-[#c9d7ef]/85 blur-3xl" },
    { className: "absolute bottom-[0%] left-[10%] size-[40vmax] rounded-full bg-[#4d6ef0]/40 blur-3xl" },
  ],
  gridLine: "rgba(100,116,139,0.22)",
} as const;

export const cobaltFrostDark = {
  base: "#070b16",
  colorA: "#4f6fff",
  colorB: "#c9875e",
  grid: "#3a4560",
  stops: [
    { color: "#0a1020", position: 0 },
    { color: "#4f6fff", position: 0.26 },
    { color: "#1e3aad", position: 0.48 },
    { color: "#243152", position: 0.7 },
    { color: "#c9875e", position: 1 },
  ] satisfies MeshStop[],
  orbs: [
    { className: "absolute -left-[18%] top-[4%] size-[56vmax] rounded-full bg-[#4f6fff]/45 blur-3xl" },
    { className: "absolute left-[28%] -top-[18%] size-[42vmax] rounded-full bg-[#c9875e]/28 blur-3xl" },
    { className: "absolute -right-[14%] top-[-6%] size-[60vmax] rounded-full bg-[#1e3aad]/55 blur-3xl" },
    { className: "absolute bottom-[-24%] right-[0%] size-[54vmax] rounded-full bg-[#243152]/90 blur-3xl" },
    { className: "absolute bottom-[2%] left-[8%] size-[40vmax] rounded-full bg-[#3d5ce6]/35 blur-3xl" },
  ],
  gridLine: "rgba(148,163,184,0.16)",
} as const;

export type CobaltFrostPalette = typeof cobaltFrostLight | typeof cobaltFrostDark;
