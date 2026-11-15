/**
 * Binding names for the private page + CMS.
 * cloudflare.config.ts should derive env from this list in Phase D.
 * Do not put secret values here.
 */
export const SECRET_BINDINGS = ["CMS_USERNAME", "CMS_PASSWORD", "SESSION_KEY"] as const;
export const D1_BINDING = "PRIVATE_DB" as const;
export const D1_DATABASE_NAME = "profile-private" as const;

/** Optional Plan B (R2 + Durable Object). Not wired in v1 scaffold. */
export const PLAN_B_BINDINGS = {
  durableObject: "PRIVATE_DESK",
  r2: "PRIVATE_BLOBS",
  enrollSecret: "ENROLL_TOKEN",
} as const;
