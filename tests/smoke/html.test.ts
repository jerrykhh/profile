import { describe, expect, it } from "vitest";

import { assertSmokeHtml } from "./assert-smoke";

function smokeBaseUrl(): string | null {
  const raw = process.env.BASE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin + url.pathname.replace(/\/$/, "");
  } catch {
    return null;
  }
}

/**
 * Optional Worker HTML smoke. Set BASE_URL to a running `vite preview`
 * (or deployed worker) to enable. Without a valid http(s) BASE_URL this
 * file still passes so `npm test` stays zero-config without a preview boot.
 */
describe("html smoke", () => {
  it("fetches smoke routes when BASE_URL is set", async () => {
    const baseUrl = smokeBaseUrl();
    if (!baseUrl) {
      expect(baseUrl).toBeNull();
      return;
    }
    await assertSmokeHtml(baseUrl);
  });
});
