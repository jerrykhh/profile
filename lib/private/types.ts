/** Branded six-digit PIN. Construct only via parseSixDigitPin. */
export type SixDigitPin = string & { readonly __brand: "SixDigitPin" };

export type LockNotice = "none" | "expired" | "rejected" | "rate_limited";

export type KdfPublic = {
  readonly iterations: 600000;
  readonly saltB64: string;
};

/**
 * Locked / empty / expired share the gate shell.
 * `kdf: null` means Enter stays disabled (nothing live or bundle drift).
 */
export type LockedView = {
  readonly status: "locked" | "empty" | "expired";
  readonly prefillPin: SixDigitPin | null;
  readonly notice: LockNotice;
  readonly kdf: KdfPublic | null;
};

export type UnlockedArticle = {
  readonly title: string;
  readonly description: string;
  readonly markdown: string;
  readonly expiresAt: string;
};

export type PrivateView = LockedView | { readonly status: "unlocked"; readonly article: UnlockedArticle };

export type CmsDesk = {
  readonly live: null | { readonly title: string; readonly expiresAt: string; readonly contentId: string };
  readonly pending: null | {
    readonly contentId: string;
    readonly repoPath: `content/private/${string}.enc.json`;
    readonly bundle: "absent" | "match" | "mismatch";
  };
};

export type EnterPinInput = {
  readonly authKeyB64: string;
  readonly encKeyB64: string;
  readonly termsAccepted: true;
};

export type EnterFailure = { readonly ok: false; readonly notice: Exclude<LockNotice, "none"> };

export type PrepareIntent = {
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
      readonly contentId: string;
      readonly repoPath: `content/private/${string}.enc.json`;
      readonly envelopeJson: string;
    }
  | { readonly ok: false; readonly reason: "unauthorized" | "invalid" | "reused" | "too_large" };

export type CmsLoginState = { readonly notice: "none" | "rejected" | "rate_limited" };
