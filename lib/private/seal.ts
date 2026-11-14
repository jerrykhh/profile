import "server-only";

import { cookies } from "next/headers";

import { asBufferSource, b64ToBytes, bytesToB64 } from "@/lib/private/kdf";
import { getSessionKeyBytes } from "@/lib/private/session-key";
import type { PrivateSlug } from "@/lib/private/types";
import { PRIVATE_PATH } from "@/lib/private/routes";

const PRIVATE_COOKIE = "private_unlock";
const CMS_COOKIE = "cms_session";

type PrivateGrant = {
  typ: "private";
  slug: string;
  contentId: string;
  encKeyB64: string;
  exp: number;
};

async function aesSeal(payload: string, aad: string): Promise<string> {
  const keyBytes = await getSessionKeyBytes();
  const key = await crypto.subtle.importKey("raw", asBufferSource(keyBytes), { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: new TextEncoder().encode(aad) },
    key,
    new TextEncoder().encode(payload),
  );
  return `${bytesToB64(iv)}.${bytesToB64(new Uint8Array(cipher))}`;
}

async function aesOpen(token: string, aad: string): Promise<string | null> {
  try {
    const [ivB64, ctB64] = token.split(".");
    if (!ivB64 || !ctB64) return null;
    const keyBytes = await getSessionKeyBytes();
    const key = await crypto.subtle.importKey("raw", asBufferSource(keyBytes), { name: "AES-GCM" }, false, [
      "encrypt",
      "decrypt",
    ]);
    const plain = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: asBufferSource(b64ToBytes(ivB64)),
        additionalData: new TextEncoder().encode(aad),
      },
      key,
      asBufferSource(b64ToBytes(ctB64)),
    );
    return new TextDecoder().decode(plain);
  } catch {
    return null;
  }
}

/** Short-lived unlock: min(now+15m, note expiry). */
export async function sealPrivateCookie(grant: {
  slug: PrivateSlug;
  contentId: string;
  encKey: Uint8Array;
  expUnix: number;
}): Promise<void> {
  const payload: PrivateGrant = {
    typ: "private",
    slug: grant.slug,
    contentId: grant.contentId,
    encKeyB64: bytesToB64(grant.encKey),
    exp: grant.expUnix,
  };
  const value = await aesSeal(JSON.stringify(payload), PRIVATE_COOKIE);
  const jar = await cookies();
  jar.set(PRIVATE_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: PRIVATE_PATH,
    expires: new Date(grant.expUnix * 1000),
  });
}

export async function readPrivateGrant(): Promise<{
  slug: PrivateSlug;
  contentId: string;
  encKey: Uint8Array;
  expUnix: number;
} | null> {
  const jar = await cookies();
  const raw = jar.get(PRIVATE_COOKIE)?.value;
  if (!raw) return null;
  const opened = await aesOpen(raw, PRIVATE_COOKIE);
  if (!opened) return null;
  try {
    const grant = JSON.parse(opened) as PrivateGrant;
    if (grant.typ !== "private") return null;
    if (Date.now() / 1000 >= grant.exp) return null;
    return {
      slug: grant.slug as PrivateSlug,
      contentId: grant.contentId,
      encKey: b64ToBytes(grant.encKeyB64),
      expUnix: grant.exp,
    };
  } catch {
    return null;
  }
}

export async function clearPrivateCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(PRIVATE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: PRIVATE_PATH,
    maxAge: 0,
  });
}

export async function sealCmsCookie(expUnix: number): Promise<void> {
  const value = await aesSeal(JSON.stringify({ typ: "cms", exp: expUnix }), CMS_COOKIE);
  const jar = await cookies();
  jar.set(CMS_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/cms",
    expires: new Date(expUnix * 1000),
  });
}

export async function readCmsGrant(): Promise<{ expUnix: number } | null> {
  const jar = await cookies();
  const raw = jar.get(CMS_COOKIE)?.value;
  if (!raw) return null;
  const opened = await aesOpen(raw, CMS_COOKIE);
  if (!opened) return null;
  try {
    const grant = JSON.parse(opened) as { typ: string; exp: number };
    if (grant.typ !== "cms") return null;
    if (Date.now() / 1000 >= grant.exp) return null;
    return { expUnix: grant.exp };
  } catch {
    return null;
  }
}

export async function clearCmsCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(CMS_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/cms",
    maxAge: 0,
  });
}
