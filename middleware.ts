import { NextResponse, type NextRequest } from "next/server";

import { isUnlistedPath } from "@/lib/private/routes";

/**
 * Cache / robots headers only. Does not authenticate PIN or CMS.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!isUnlistedPath(request.nextUrl.pathname)) return response;

  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
