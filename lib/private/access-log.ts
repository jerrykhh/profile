import "server-only";

import type { AccessLogEvent } from "@/lib/private/types";

/**
 * Access logging — Workers Logs / ephemeral only.
 * Jerry: do **not** persist access events in D1 (no access_log table).
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
