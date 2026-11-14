import type { Metadata } from "next";

import { PinGate } from "@/components/private/gate";
import { siteConfig } from "@/config/profile";
import { parseSixDigitPin } from "@/lib/private/kdf";
import { HIDDEN_ROBOTS, PRIVATE_PATH } from "@/lib/private/routes";
import type { LockedView } from "@/lib/private/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Profile | Jerry Kwok" },
  description: siteConfig.description,
  alternates: { canonical: PRIVATE_PATH },
  robots: HIDDEN_ROBOTS,
  referrer: "no-referrer",
};

/**
 * Same URL for PIN gate and unlocked content.
 *
 * LIVE in this scaffold: noindex metadata, dynamic opt-in, gate UI shell, ?pin= prefill only.
 * STUB: openPrivatePage / decrypt / session cookie — see lib/private/* not implemented.
 * When crypto lands, branch on openPrivatePage and render PrivateReveal + PrivateArticle.
 */
export default async function PrivatePage({
  searchParams,
}: {
  searchParams: Promise<{ pin?: string }>;
}) {
  const { pin } = await searchParams;
  const prefillPin = pin ? parseSixDigitPin(pin) : null;

  // Scaffold: show the gate UI with Enter disabled (kdf null) until D1 + envelopes land.
  const locked: LockedView = {
    status: "locked",
    prefillPin,
    notice: "none",
    kdf: null,
  };

  return <PinGate locked={locked} />;
}
