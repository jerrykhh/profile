import { bindings, defineConfig, defineWorker } from "cf/config";

/**
 * Private page bindings (Phase D — not enabled in this scaffold deploy):
 * - PRIVATE_DB: bindings.d1({ name: "profile-private" })  // see cloudflare.bindings.ts
 * - CMS_USERNAME / CMS_PASSWORD / SESSION_KEY: bindings.secret()
 * Upload secrets before enabling them or the first deploy after declare can fail closed.
 * Plan B (R2 + Durable Object) needs worker/index.ts; see docs architecture.
 */
export default defineConfig({
  worker: defineWorker({
    name: "jerrykhh-profile",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-03",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});

