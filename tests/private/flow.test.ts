import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi, afterEach } from "vitest";

import {
  canonicalEnvelope,
  decryptMarkdown,
  parseEnvelopeJson,
} from "../../lib/private/crypto-core";
import { b64ToBytes, derivePinKeys, parseSixDigitPin, sha256B64, timingSafeEqualB64 } from "../../lib/private/kdf";
import { HEARTBEAT_FAIL_LIMIT, TERMS_CHECKBOX_LABEL } from "../../lib/private/types";
import { privateCheckPath, privateSlugPath, ROBOTS_DISALLOW } from "../../lib/private/routes";
import { startPrivateHeartbeat } from "../../lib/private/heartbeat";

const DEMO_PIN = "123456";
const DEMO_SLUG = "demo-hello";

function loadDemoEnvelope() {
  const dir = resolve("content/private");
  const file = readdirSync(dir).find((name) => name.endsWith(".enc.json"));
  expect(file).toBeTruthy();
  return parseEnvelopeJson(readFileSync(resolve(dir, file!), "utf8"));
}

describe("demo-hello Plan A sample", () => {
  it("loads the committed envelope for demo-hello", () => {
    const env = loadDemoEnvelope();
    expect(env.slug).toBe(DEMO_SLUG);
    expect(env.title).toMatch(/hello interviewer/i);
    expect(Date.parse(env.expiresAt)).toBeGreaterThan(Date.now());
  });

  it("unlocks plaintext with the documented demo PIN", async () => {
    const env = loadDemoEnvelope();
    const pin = parseSixDigitPin(DEMO_PIN);
    expect(pin).not.toBeNull();
    const keys = await derivePinKeys(pin!, {
      iterations: 600_000,
      saltB64: env.kdf.salt,
    });
    const authOk = await timingSafeEqualB64(await sha256B64(b64ToBytes(keys.authKeyB64)), env.verifier);
    expect(authOk).toBe(true);
    const plain = await decryptMarkdown(
      b64ToBytes(keys.encKeyB64),
      env.contentId,
      b64ToBytes(env.aes.iv),
      b64ToBytes(env.aes.ciphertext),
    );
    expect(plain).toContain("Hello interviewer");
    expect(plain).toContain(DEMO_PIN);
  }, 120_000);

  it("rejects a wrong PIN at the verifier", async () => {
    const env = loadDemoEnvelope();
    const pin = parseSixDigitPin("000000");
    const keys = await derivePinKeys(pin!, {
      iterations: 600_000,
      saltB64: env.kdf.salt,
    });
    const authOk = await timingSafeEqualB64(await sha256B64(b64ToBytes(keys.authKeyB64)), env.verifier);
    expect(authOk).toBe(false);
  }, 120_000);

  it("canonical JSON round-trips without drifting fields", () => {
    const env = loadDemoEnvelope();
    const again = parseEnvelopeJson(canonicalEnvelope(env));
    expect(again.contentId).toBe(env.contentId);
    expect(again.aes.ciphertext).toBe(env.aes.ciphertext);
  });
});

describe("private flow helpers", () => {
  it("builds slug and check paths", () => {
    expect(privateSlugPath(DEMO_SLUG)).toBe("/private/demo-hello");
    expect(privateCheckPath(DEMO_SLUG)).toBe("/private/demo-hello/check");
    expect(ROBOTS_DISALLOW).toContain("/private");
  });

  it("keeps no-share TnC wording", () => {
    expect(TERMS_CHECKBOX_LABEL).toBe("I agree that this private content must not be shared.");
  });
});

describe("heartbeat consecutive failures", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it(`calls onLost after ${HEARTBEAT_FAIL_LIMIT} failed polls`, async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: false, reason: "unauthorized" }), { status: 401 })),
    );
    const onLost = vi.fn();
    const controller = startPrivateHeartbeat({
      slug: DEMO_SLUG,
      onLost,
      intervalMs: 20,
      failLimit: HEARTBEAT_FAIL_LIMIT,
    });
    await vi.waitFor(() => expect(onLost).toHaveBeenCalledTimes(1), { timeout: 2000 });
    controller.stop();
  });
});
