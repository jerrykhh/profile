"use server";

import type { CmsLoginState, PrepareIntent, PrepareResult } from "@/lib/private/types";

/** Success redirect()s to /cms. Failure returns rejected or rate_limited. */
export async function loginCms(_prev: CmsLoginState, formData: FormData): Promise<CmsLoginState> {
  // STUB: always reject until Worker secrets + timing-safe compare land in Phase D.
  void formData;
  return { notice: "rejected" };
}

/** Clears cms_session and redirect()s to /cms/login. */
export async function logoutCms(): Promise<void> {
  throw new Error("not implemented");
}

/**
 * Authenticated CMS prepare: derive, encrypt, write pending D1 row, return envelope JSON for git commit.
 * TODO: not implemented.
 */
export async function preparePublication(intent: PrepareIntent): Promise<PrepareResult> {
  throw new Error("not implemented");
  void intent;
}
