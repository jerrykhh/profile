"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { enterPin } from "@/lib/private/actions";
import { derivePinKeys, parseSixDigitPin } from "@/lib/private/kdf";
import { PRIVATE_PATH } from "@/lib/private/routes";
import type { LockedView, LockNotice } from "@/lib/private/types";

/**
 * PIN gate shell. Live crypto throws not implemented until Phase D fill-in.
 * Prefill may come from ?pin=; Enter is always required (no auto-submit).
 */
export function PinGate({ locked }: { locked: LockedView }) {
  const [pin, setPin] = useState(locked.prefillPin ?? "");
  const [terms, setTerms] = useState(true);
  const [notice, setNotice] = useState<LockNotice>(locked.notice);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("pin")) return;
    url.searchParams.delete("pin");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseSixDigitPin(pin);
    if (!terms || !locked.kdf || !parsed) return;
    setPending(true);
    try {
      const keys = await derivePinKeys(parsed, locked.kdf);
      const result = await enterPin({
        authKeyB64: keys.authKeyB64,
        encKeyB64: keys.encKeyB64,
        termsAccepted: true,
      });
      setNotice(result.notice);
    } catch {
      setNotice("rejected");
    } finally {
      setPending(false);
    }
  }

  const canEnter = terms && locked.kdf !== null && pin.length === 6 && !pending;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-16">
      <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-semibold tracking-tight">Private page</CardTitle>
          <CardDescription>
            {locked.status === "empty"
              ? "Nothing is published for this path yet."
              : locked.status === "expired"
                ? "This note has expired."
                : locked.kdf === null
                  ? "Publication crypto is not wired yet (scaffold). Enter stays disabled."
                  : "Enter the six-digit PIN to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {notice === "rejected" ? <p className="text-sm text-destructive">That PIN was not accepted.</p> : null}
            {notice === "expired" ? <p className="text-sm text-destructive">This note has expired.</p> : null}
            {notice === "rate_limited" ? (
              <p className="text-sm text-destructive">Too many attempts. Try again later.</p>
            ) : null}

            {locked.status !== "empty" ? (
              <>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-muted-foreground">PIN</span>
                  <input
                    value={pin}
                    onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    aria-label="Six digit PIN"
                    className="rounded-lg border border-border bg-background px-3 py-2 font-mono tracking-[0.3em]"
                    disabled={locked.kdf === null}
                  />
                </label>
                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(event) => setTerms(event.target.checked)}
                    className="mt-1"
                  />
                  <span>I agree to keep this page private.</span>
                </label>
                <Button type="submit" disabled={!canEnter}>
                  Enter
                </Button>
              </>
            ) : null}

            <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
              Back to home
            </Button>
            <p className="text-xs text-muted-foreground">
              Scaffold only. Unlock crypto is not implemented yet. Path {PRIVATE_PATH}.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
