import { SMOKE_ROUTES, type SmokeRoute } from "./routes";

/** Markers that must stay out of first Worker HTML (CSS-first hero). */
const MESH_MARKERS = /hero-webgpu|WebGPUMesh|hero-webgpu-mesh/i;

/**
 * Fetch Worker/preview HTML for each smoke route.
 * Asserts status, document title, and CSS-first (no mesh markers in first HTML).
 */
export async function assertSmokeHtml(baseUrl: string): Promise<void> {
  const base = baseUrl.replace(/\/$/, "");
  const failures: string[] = [];

  for (const route of SMOKE_ROUTES as readonly SmokeRoute[]) {
    const url = `${base}${route.path === "/" ? "/" : route.path}`;
    const res = await fetch(url);
    if (res.status !== route.status) {
      failures.push(`${route.path}: expected status ${route.status}, got ${res.status}`);
      continue;
    }
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch?.[1]?.trim() ?? "";
    if (!route.titlePattern.test(title) && !route.titlePattern.test(html)) {
      failures.push(`${route.path}: title did not match ${route.titlePattern}; saw "${title}"`);
    }
    if (MESH_MARKERS.test(html)) {
      failures.push(`${route.path}: first HTML contained WebGPU/mesh markers (CSS-first violated)`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`HTML smoke failed:\n${failures.map((f) => `  - ${f}`).join("\n")}`);
  }
}
