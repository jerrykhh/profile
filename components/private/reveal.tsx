"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { endPrivateSession } from "@/lib/private/actions";
import { startPrivateHeartbeat } from "@/lib/private/heartbeat";
import type { PrivateSlug } from "@/lib/private/types";

/**
 * Unlock entrance + mid-view expiry + 1-minute heartbeat.
 * Two consecutive heartbeat failures → end session and refresh to gate.
 */
export function PrivateReveal(props: { slug: PrivateSlug; expiresAt: string; children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"open" | "expiring" | "heartbeat_lost">("open");

  useEffect(() => {
    const expiresMs = Date.parse(props.expiresAt);
    if (Number.isNaN(expiresMs)) return;
    const delay = Math.max(0, expiresMs - Date.now());
    const timer = window.setTimeout(() => {
      setPhase("expiring");
      void (async () => {
        try {
          await endPrivateSession(props.slug);
        } catch {
          // stub may throw not implemented
        }
        router.refresh();
      })();
    }, delay);
    return () => window.clearTimeout(timer);
  }, [props.expiresAt, props.slug, router]);

  useEffect(() => {
    const hb = startPrivateHeartbeat({
      slug: props.slug,
      onLost: () => {
        setPhase("heartbeat_lost");
        void (async () => {
          try {
            await endPrivateSession(props.slug);
          } catch {
            // stub
          }
          router.refresh();
        })();
      },
    });
    return () => hb.stop();
  }, [props.slug, router]);

  return (
    <div
      data-private-phase={phase}
      className={phase !== "open" ? "opacity-50 transition-opacity" : undefined}
    >
      {props.children}
    </div>
  );
}
