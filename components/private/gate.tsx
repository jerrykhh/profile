"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { AntiExfilShell } from "@/components/private/anti-exfil";
import { PrivateArticle } from "@/components/private/article";
import { OtpPinInput } from "@/components/private/otp-pin";
import { PrivateReveal } from "@/components/private/reveal";
import { Button } from "@/components/ui/button";
import { derivePinKeys, parseSixDigitPin } from "@/lib/private/kdf";
import { privateSlugPath } from "@/lib/private/routes";
import {
  TERMS_CHECKBOX_LABEL,
  type EnterResult,
  type LockedView,
  type LockNotice,
  type PrivateSlug,
  type UnlockedArticle,
} from "@/lib/private/types";

/**
 * Locked gate — OTP Variant C on plain white/black full-bleed (not project-detail split).
 * Prefill may come from ?pin=; Enter is always required.
 */
export function PinGate({ locked, slug }: { locked: LockedView; slug: PrivateSlug }) {
  const [pin, setPin] = useState(locked.prefillPin ?? "");
  const [terms, setTerms] = useState(true);
  const [notice, setNotice] = useState<LockNotice>(locked.notice);
  const [pending, setPending] = useState(false);
  const [unlocked, setUnlocked] = useState<UnlockedArticle | null>(null);

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
      const res = await fetch(`${privateSlugPath(slug)}/unlock`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          authKeyB64: keys.authKeyB64,
          encKeyB64: keys.encKeyB64,
          termsAccepted: true,
        }),
      });
      const result = (await res.json()) as EnterResult;
      if (result.ok) {
        setUnlocked(result.article);
        return;
      }
      setNotice(result.notice);
      setPin("");
    } catch {
      setNotice("rejected");
      setPin("");
    } finally {
      setPending(false);
    }
  }

  if (unlocked) {
    return (
      <PrivateReveal slug={slug} expiresAt={unlocked.expiresAt}>
        <AntiExfilShell>
          <PrivateArticle article={unlocked} />
        </AntiExfilShell>
      </PrivateReveal>
    );
  }

  const canEnter = terms && locked.kdf !== null && pin.length === 6 && !pending;

  const statusCopy =
    locked.status === "empty"
      ? "Nothing is published for this path yet."
      : locked.status === "expired"
        ? "This note has expired."
        : notice === "heartbeat_lost"
          ? "Your session could not be verified. Enter the PIN again."
          : locked.kdf === null
            ? "This note cannot be unlocked right now."
            : "Enter the six-digit PIN. Enter is required even if the PIN was in the link.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-4 dark:bg-black">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-sm flex-col items-center gap-6 text-center"
        aria-labelledby="private-gate-title"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Private</p>
          <h1 id="private-gate-title" className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Enter PIN
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{statusCopy}</p>
        </div>

        {notice === "rejected" ? <p className="text-sm text-destructive">That PIN was not accepted.</p> : null}
        {notice === "expired" ? <p className="text-sm text-destructive">This note has expired.</p> : null}
        {notice === "rate_limited" ? (
          <p className="text-sm text-destructive">Too many attempts. Try again later.</p>
        ) : null}

        {locked.status !== "empty" ? (
          <>
            <OtpPinInput value={pin} onChange={setPin} disabled={locked.kdf === null || pending} />
            <label className="flex w-full items-start gap-2 text-left text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={terms}
                onChange={(event) => setTerms(event.target.checked)}
                className="mt-1"
              />
              <span>{TERMS_CHECKBOX_LABEL}</span>
            </label>
            <Button type="submit" className="w-full" disabled={!canEnter}>
              {pending ? "Unlocking…" : "Enter"}
            </Button>
          </>
        ) : null}

        <Button variant="ghost" className="w-full text-muted-foreground" nativeButton={false} render={<Link href="/" />}>
          Back to home
        </Button>
      </form>
    </div>
  );
}
