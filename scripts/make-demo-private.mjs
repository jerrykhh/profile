/**
 * One-shot Plan A demo envelope generator (Node 22+).
 * Usage: node scripts/make-demo-private.mjs
 * Demo PIN is intentional and non-secret — see docs guide.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DEMO_PIN = "123456";
const SLUG = "demo-hello";
const ITERATIONS = 600_000;
const HKDF_SALT = new TextEncoder().encode("jerrykhh-profile-hkdf-v1");

function bytesToB64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

function b64ToBytes(b64) {
  return new Uint8Array(Buffer.from(b64, "base64"));
}

async function derivePinKeys(pin, saltB64) {
  const salt = b64ToBytes(saltB64);
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pin),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS },
    baseKey,
    256,
  );
  async function hkdf(info) {
    const key = await crypto.subtle.importKey("raw", bits, "HKDF", false, ["deriveBits"]);
    const out = await crypto.subtle.deriveBits(
      { name: "HKDF", hash: "SHA-256", salt: HKDF_SALT, info: new TextEncoder().encode(info) },
      key,
      256,
    );
    return new Uint8Array(out);
  }
  return { authKey: await hkdf("auth"), encKey: await hkdf("enc") };
}

const contentId = crypto.randomUUID();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const saltB64 = bytesToB64(salt);
const ivB64 = bytesToB64(iv);
const { authKey, encKey } = await derivePinKeys(DEMO_PIN, saltB64);
const verifier = bytesToB64(new Uint8Array(await crypto.subtle.digest("SHA-256", authKey)));
const markdown = `# Hello interviewer

This is a **demo** private note for Jerry's PIN-gated page.

- Slug: \`${SLUG}\`
- Demo PIN: \`${DEMO_PIN}\` (not a real secret)

If you can read this, unlock worked.
`;

const key = await crypto.subtle.importKey("raw", encKey, { name: "AES-GCM" }, false, ["encrypt"]);
const cipher = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv, additionalData: new TextEncoder().encode(contentId) },
  key,
  new TextEncoder().encode(markdown),
);

const envelope = {
  v: 1,
  contentId,
  slug: SLUG,
  title: "Hello interviewer",
  description: "Demo private note — safe sample content",
  expiresAt: "2099-01-01T00:00:00.000Z",
  verifier,
  kdf: { name: "PBKDF2-SHA256", iterations: ITERATIONS, salt: saltB64 },
  aes: { iv: ivB64, ciphertext: bytesToB64(new Uint8Array(cipher)) },
};

const json = JSON.stringify(envelope);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "content/private");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, `${contentId}.enc.json`);
writeFileSync(outPath, json);
console.log(JSON.stringify({ outPath, slug: SLUG, pin: DEMO_PIN, contentId }, null, 2));
