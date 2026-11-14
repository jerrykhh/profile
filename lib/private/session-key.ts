import "server-only";

import { b64ToBytes } from "@/lib/private/kdf";

/**
 * SESSION_KEY for sealing unlock cookies.
 * Prefer cloudflare:workers env; fall back to process.env for local/tests.
 */
export async function getSessionKeyBytes(): Promise<Uint8Array> {
  let raw: string | undefined;
  try {
    const { env } = await import("cloudflare:workers");
    raw = (env as { SESSION_KEY?: string }).SESSION_KEY;
  } catch {
    // not in workerd
  }
  if (!raw) raw = process.env.SESSION_KEY;
  if (!raw) {
    // Dev/scaffold fallback so the vertical slice can be exercised locally.
    // Replace with a real secret before production unlocks matter.
    raw = process.env.NODE_ENV === "production" ? "" : "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
  if (!raw) throw new Error("SESSION_KEY is not configured");
  const bytes = b64ToBytes(raw);
  if (bytes.length < 32) throw new Error("SESSION_KEY must decode to at least 32 bytes");
  return bytes.slice(0, 32);
}

export async function getCmsCredentials(): Promise<{ username: string; password: string } | null> {
  let username: string | undefined;
  let password: string | undefined;
  try {
    const { env } = await import("cloudflare:workers");
    const e = env as { CMS_USERNAME?: string; CMS_PASSWORD?: string };
    username = e.CMS_USERNAME;
    password = e.CMS_PASSWORD;
  } catch {
    // ignore
  }
  username ??= process.env.CMS_USERNAME;
  password ??= process.env.CMS_PASSWORD;
  if (!username || !password) return null;
  return { username, password };
}
