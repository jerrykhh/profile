import "server-only";

import type { AccessLogEvent } from "@/lib/private/types";

/**
 * Access logging. Prefer structured console for now (Workers Logs).
 * D1 access_log table lands when PRIVATE_DB is bound.
 * Never log PIN bodies or encKey material.
 */
export async function logPrivateAccess(event: AccessLogEvent, ip: string | null): Promise<void> {
  console.info(
    JSON.stringify({
      type: "private_access",
      ...event,
      ipPresent: Boolean(ip),
      // ?pin= on the first URL may already exist in edge access logs.
    }),
  );
}
