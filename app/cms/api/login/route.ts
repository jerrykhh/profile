import { NextResponse } from "next/server";

import { clearFailures, isLimited, recordFailure } from "@/lib/private/attempts";
import { sha256B64, timingSafeEqualB64 } from "@/lib/private/kdf";
import { mintCmsSessionCookie } from "@/lib/private/seal";
import { getCmsCredentials } from "@/lib/private/session-key";

export const dynamic = "force-dynamic";

/** REST login so vinext can set the CMS cookie without server-action redirect issues. */
export async function POST(request: Request) {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  if (await isLimited("cms", ip)) {
    return NextResponse.json({ ok: false, notice: "rate_limited" }, { status: 429 });
  }

  const creds = await getCmsCredentials();
  if (!creds) {
    return NextResponse.json({ ok: false, notice: "rejected" }, { status: 503 });
  }

  const body = (await request.json()) as { username?: string; password?: string };
  const username = String(body.username ?? "");
  const password = String(body.password ?? "");

  const userOk = await timingSafeEqualB64(
    await sha256B64(new TextEncoder().encode(username)),
    await sha256B64(new TextEncoder().encode(creds.username)),
  );
  const passOk = await timingSafeEqualB64(
    await sha256B64(new TextEncoder().encode(password)),
    await sha256B64(new TextEncoder().encode(creds.password)),
  );
  if (!userOk || !passOk) {
    await recordFailure("cms", ip);
    return NextResponse.json({ ok: false, notice: "rejected" }, { status: 401 });
  }

  await clearFailures("cms", ip);
  const expUnix = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
  const cookie = await mintCmsSessionCookie(expUnix);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookie.name, cookie.value, cookie.options);
  return res;
}
