/**
 * Placeholder Env until `cf workers types` generates `.cloudflare/types`.
 * Names must stay in sync with cloudflare.bindings.ts (tested in tests/private/boundaries.test.ts).
 */
declare module "cloudflare:workers" {
  export const env: {
    ASSETS: unknown;
    // Phase D — uncomment when cloudflare.config.ts binds them:
    // PRIVATE_DB: D1Database;
    // CMS_USERNAME: string;
    // CMS_PASSWORD: string;
    // SESSION_KEY: string;
  };
}
