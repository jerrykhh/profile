"use server";

import type { EnterFailure, EnterPinInput } from "@/lib/private/types";

/**
 * The only PIN check. isLimited, then verifier, then GCM, then seal, then redirect.
 * Returns only on failure. Success redirect()s to /private.
 * TODO: not implemented — live crypto is Phase D fill-in.
 */
export async function enterPin(input: EnterPinInput): Promise<EnterFailure> {
  throw new Error("not implemented");
  void input;
}

/** Idempotent clear of private_session. */
export async function endPrivateSession(): Promise<void> {
  throw new Error("not implemented");
}
