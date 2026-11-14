/** Branded six-digit PIN. Construct only via parseSixDigitPin. */
export type SixDigitPin = string & { readonly __brand: "SixDigitPin" };

/** URL slug for a private note. Construct via parsePrivateSlug. */
export type PrivateSlug = string & { readonly __brand: "PrivateSlug" };

export type LockNotice = "none" | "expired" | "rejected" | "rate_limited" | "heartbeat_lost";

export type KdfPublic = {
  readonly iterations: 600000;
  readonly saltB64: string;
};

/**
 * Locked / empty / expired share the gate shell.
 * `kdf: null` means Enter stays disabled (nothing live or bundle drift).
 */
export type LockedView = {
  readonly status: "locked" | "empty" | "expired" | "disabled";
  readonly slug: PrivateSlug;
  readonly prefillPin: SixDigitPin | null;
  readonly notice: LockNotice;
  readonly kdf: KdfPublic | null;
};

export type ShareLinkStatus = "live" | "disabled" | "expired";

export type CmsShareLinkRow = {
  readonly contentId: string;
  readonly slug: string;
  readonly title: string;
  readonly expiresAt: string;
  readonly status: ShareLinkStatus;
  readonly sharePath: string;
  readonly shareUrl: string;
};

export type UnlockedArticle = {
  readonly slug: PrivateSlug;
  readonly title: string;
  readonly description: string;
  readonly markdown: string;
  readonly expiresAt: string;
};

export type PrivateView = LockedView | { readonly status: "unlocked"; readonly article: UnlockedArticle };

export type CmsEnvelopeOption = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly expiresAt: string;
  readonly contentId: string;
  readonly filename: `${string}.enc.json`;
  readonly pending: boolean;
};

export type CmsDesk = {
  readonly notes: readonly CmsEnvelopeOption[];
  readonly links: readonly CmsShareLinkRow[];
  readonly store: "d1" | "memory";
};

export type MintShareIntent = {
  readonly contentId: string;
  readonly pin: string;
  readonly title: string;
  readonly description: string;
  readonly expiresAt: string;
  /** When true, append `?pin=` prefill to the share URL (Enter still required). */
  readonly includePinInUrl: boolean;
};

export type MintShareResult =
  | {
      readonly ok: true;
      readonly slug: PrivateSlug;
      readonly sharePath: string;
      readonly shareUrl: string;
      readonly store: "d1" | "memory";
    }
  | { readonly ok: false; readonly reason: "unauthorized" | "invalid" | "missing" | "bad_pin" };

export type ShareLinkActionResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: "unauthorized" | "missing" };

export type EnterPinInput = {
  readonly slug: PrivateSlug;
  readonly authKeyB64: string;
  readonly encKeyB64: string;
  /** Must be true: user agrees private content must not be shared. */
  readonly termsAccepted: true;
};

export type EnterFailure = { readonly ok: false; readonly notice: Exclude<LockNotice, "none"> };
/** Article is returned so the gate can paint unlocked UI even if vinext cookie round-trip is flaky. */
export type EnterSuccess = { readonly ok: true; readonly article: UnlockedArticle };
export type EnterResult = EnterFailure | EnterSuccess;

export type PrepareIntent = {
  readonly slug: string;
  readonly contentId: string;
  readonly saltB64: string;
  readonly ivB64: string;
  readonly title: string;
  readonly description: string;
  readonly expiresAt: string;
  readonly pin: string;
  readonly markdown: string;
};

export type PrepareResult =
  | {
      readonly ok: true;
      readonly slug: PrivateSlug;
      readonly contentId: string;
      readonly repoPath: `content/private/${string}.enc.json`;
      readonly envelopeJson: string;
    }
  | { readonly ok: false; readonly reason: "unauthorized" | "invalid" | "reused" | "too_large" | "slug_taken" };

export type CmsLoginState = { readonly notice: "none" | "rejected" | "rate_limited" };

/** Heartbeat / check endpoint result. */
export type HeartbeatResult =
  | { readonly ok: true; readonly expiresAt: string }
  | { readonly ok: false; readonly reason: "unauthorized" | "expired" | "missing" | "error" };

export type AccessLogEvent = {
  readonly kind: "unlock_attempt" | "unlock_ok" | "heartbeat_ok" | "heartbeat_fail" | "gate_view";
  readonly slug: string;
  readonly outcome: string;
  readonly pinInQuery: boolean;
  readonly atMs: number;
};

/** Checkbox copy (Jerry): must-not-share. */
export const TERMS_CHECKBOX_LABEL = "I agree that this private content must not be shared." as const;

export const HEARTBEAT_INTERVAL_MS = 60_000 as const;
export const HEARTBEAT_FAIL_LIMIT = 2 as const;
