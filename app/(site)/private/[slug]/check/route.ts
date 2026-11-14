import { NextResponse } from "next/server";

import { checkPrivateSession } from "@/lib/private/actions";
import { parsePrivateSlug } from "@/lib/private/slug";
import type { HeartbeatResult } from "@/lib/private/types";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: raw } = await context.params;
  const slug = parsePrivateSlug(raw);
  if (!slug) {
    const body: HeartbeatResult = { ok: false, reason: "missing" };
    return NextResponse.json(body, { status: 404 });
  }

  const result = await checkPrivateSession(slug);
  const status = result.ok ? 200 : result.reason === "expired" ? 410 : 401;
  return NextResponse.json(result, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      "CDN-Cache-Control": "no-store",
    },
  });
}
