"use client";

import { HEARTBEAT_FAIL_LIMIT, HEARTBEAT_INTERVAL_MS, type HeartbeatResult } from "@/lib/private/types";
import { privateCheckPath } from "@/lib/private/routes";

// HeartbeatResult used when parsing JSON from the check route.

export type HeartbeatController = {
  stop: () => void;
};

/**
 * Poll the slug check endpoint about every 60s.
 * Two consecutive failures → onLost (gate / error).
 * STUB transport: fetch check path; server route not live until Phase D.
 */
export function startPrivateHeartbeat(input: {
  slug: string;
  onLost: () => void;
  intervalMs?: number;
  failLimit?: number;
}): HeartbeatController {
  const intervalMs = input.intervalMs ?? HEARTBEAT_INTERVAL_MS;
  const failLimit = input.failLimit ?? HEARTBEAT_FAIL_LIMIT;
  let consecutive = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  let stopped = false;

  async function tick() {
    if (stopped) return;
    try {
      const res = await fetch(privateCheckPath(input.slug), {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        consecutive += 1;
      } else {
        const body = (await res.json()) as HeartbeatResult;
        if (body.ok) {
          consecutive = 0;
          return;
        }
        consecutive += 1;
      }
    } catch {
      consecutive += 1;
    }
    if (consecutive >= failLimit) {
      stop();
      input.onLost();
    }
  }

  function stop() {
    stopped = true;
    if (timer) clearInterval(timer);
    timer = null;
  }

  void tick();
  timer = setInterval(() => void tick(), intervalMs);
  return { stop };
}
