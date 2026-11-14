import "server-only";

import { parseEnvelopeJson, type EnvelopeV1 } from "@/lib/private/cipher";
import { parsePrivateSlug } from "@/lib/private/slug";
import type { PrivateSlug } from "@/lib/private/types";

const modules = import.meta.glob("../../content/private/*.enc.json", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

let cache: Map<PrivateSlug, EnvelopeV1> | null = null;

function loadAll(): Map<PrivateSlug, EnvelopeV1> {
  if (cache) return cache;
  const map = new Map<PrivateSlug, EnvelopeV1>();
  for (const [path, raw] of Object.entries(modules)) {
    if (!path.endsWith(".enc.json")) continue;
    try {
      const env = parseEnvelopeJson(raw);
      const slug = parsePrivateSlug(env.slug);
      if (!slug) continue;
      if (map.has(slug)) {
        throw new Error(`duplicate private slug ${slug}`);
      }
      map.set(slug, env);
    } catch {
      // Skip malformed files in scaffold; prepare path validates before commit.
    }
  }
  cache = map;
  return map;
}

/** Clear isolate cache (tests). */
export function resetEnvelopeCache(): void {
  cache = null;
}

export function getEnvelopeBySlug(slug: PrivateSlug): EnvelopeV1 | null {
  return loadAll().get(slug) ?? null;
}

export function listEnvelopeSlugs(): PrivateSlug[] {
  return [...loadAll().keys()];
}
