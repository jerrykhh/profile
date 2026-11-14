"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { endPrivateSession } from "@/lib/private/actions";

/**
 * Unlock entrance + mid-view expiry animation shell.
 * TODO: motion fade/translate; pageshow/visibilitychange; call endPrivateSession then refresh.
 */
export function PrivateReveal(props: { expiresAt: string; children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"open" | "expiring">("open");

  useEffect(() => {
    const expiresMs = Date.parse(props.expiresAt);
    if (Number.isNaN(expiresMs)) return;
    const delay = Math.max(0, expiresMs - Date.now());
    const timer = window.setTimeout(() => {
      setPhase("expiring");
      void (async () => {
        try {
          await endPrivateSession();
        } catch {
          // stub throws not implemented
        }
        router.refresh();
      })();
    }, delay);
    return () => window.clearTimeout(timer);
  }, [props.expiresAt, router]);

  return (
    <div data-private-phase={phase} className={phase === "expiring" ? "opacity-50 transition-opacity" : undefined}>
      {props.children}
    </div>
  );
}
