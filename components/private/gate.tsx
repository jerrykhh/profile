"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { DetailFrame } from "@/components/detail-frame";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { enterPin } from "@/lib/private/actions";
import { derivePinKeys, parseSixDigitPin } from "@/lib/private/kdf";
import {
  TERMS_CHECKBOX_LABEL,
  type LockedView,
  type LockNotice,
  type PrivateSlug,
} from "@/lib/private/types";

/**
 * PIN gate — Detail split variant (chosen over compact card).
 * Prefill may come from ?pin=; Enter is always required.
 * First request with ?pin= may appear in access logs.
 */
export function PinGate({ locked, slug }: { locked: LockedView; slug: PrivateSlug }) {
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
        slug,
        authKeyB64: keys.authKeyB64,
        encKeyB64: keys.encKeyB64,
        termsAccepted: true,
      });
      setNotice(result.notice);
    } catch (error) {
      // next/navigation redirect() throws; do not treat as a PIN failure
      if (
        typeof error === "object" &&
        error &&
        "digest" in error &&
        String((error as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
      ) {
        throw error;
      }
      setNotice("rejected");
    } finally {
      setPending(false);
    }
  }

  const canEnter = terms && locked.kdf !== null && pin.length === 6 && !pending;

  const aside = (
    <Card className="overflow-hidden border-border/80 bg-card shadow-none ring-1 ring-border/70">
      <CardHeader>
        <CardDescription>Private note</CardDescription>
        <CardTitle className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          PIN required
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          This page is for invited readers only. Agreeing means you will not share the content, screenshots, or
          the PIN.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Slug · {slug}</p>
      </CardContent>
    </Card>
  );

  const main = (
    <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">Enter</CardTitle>
        <CardDescription>
          {locked.status === "empty"
            ? "Nothing is published for this path yet."
            : locked.status === "expired"
              ? "This note has expired."
              : notice === "heartbeat_lost"
                ? "Your session could not be verified. Enter the PIN again."
                : locked.kdf === null
                  ? "This note cannot be unlocked right now."
                  : "Six-digit PIN. Enter is required even if the PIN was in the link."}
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
                <span>{TERMS_CHECKBOX_LABEL}</span>
              </label>
              <Button type="submit" disabled={!canEnter}>
                Enter
              </Button>
            </>
          ) : null}

          <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
            Back to home
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <DetailFrame
      backHref="/"
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Private</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      main={main}
      aside={aside}
    />
  );
}
