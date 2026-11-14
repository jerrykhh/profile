import "server-only";

import type { PrivateView } from "@/lib/private/types";

/**
 * pinQuery is copied onto a locked view after parseSixDigitPin.
 * It is never passed to derivePinKeys or decryptMarkdown.
 * TODO: switch on resolveLiveSlot; decrypt only the ready+grant branch.
 */
export async function openPrivatePage(input: { pinQuery: string | null }): Promise<PrivateView> {
  throw new Error("not implemented");
  void input;
}
