import { describe, expect, it } from "vitest";

import {
  canonicalEnvelope,
  decryptMarkdown,
  encryptMarkdown,
  parseEnvelopeJson,
  type EnvelopeV1,
} from "../../lib/private/crypto-core";
import { b64ToBytes, derivePinKeys, parseSixDigitPin, PBKDF2_ITERATIONS, sha256B64 } from "../../lib/private/kdf";
import { mintDraft } from "../../lib/private/draft";

describe("private crypto roundtrip", () => {
  it("derives keys, encrypts, and decrypts with AAD contentId", async () => {
    const draft = mintDraft();
    const pin = parseSixDigitPin("012345");
    expect(pin).not.toBeNull();
    const kdf = { iterations: PBKDF2_ITERATIONS, saltB64: draft.saltB64 };
    const keys = await derivePinKeys(pin!, kdf);
    const encKey = b64ToBytes(keys.encKeyB64);
    const authKey = b64ToBytes(keys.authKeyB64);
    const verifier = await sha256B64(authKey);
    const markdown = "# Hello\n\nSecret for ViuTV interview.";
    const ciphertext = await encryptMarkdown(
      encKey,
      draft.contentId,
      b64ToBytes(draft.ivB64),
      markdown,
    );
    const envelope: EnvelopeV1 = {
      v: 1,
      contentId: draft.contentId,
      slug: "viu-interview",
      title: "Solution Arch interview",
      description: "for Solution Arch interview — ViuTV",
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      verifier,
      kdf: { name: "PBKDF2-SHA256", iterations: PBKDF2_ITERATIONS, salt: draft.saltB64 },
      aes: { iv: draft.ivB64, ciphertext },
    };
    const json = canonicalEnvelope(envelope);
    const parsed = parseEnvelopeJson(json);
    const plain = await decryptMarkdown(
      encKey,
      parsed.contentId,
      b64ToBytes(parsed.aes.iv),
      b64ToBytes(parsed.aes.ciphertext),
    );
    expect(plain).toBe(markdown);
    expect(parsed.slug).toBe("viu-interview");
  }, 120_000);
});
