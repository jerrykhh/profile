import "server-only";

import type { CmsDesk } from "@/lib/private/types";

export async function readCmsSession(): Promise<"open" | "closed"> {
  throw new Error("not implemented");
}

/** Redirects to /cms/login when the session is closed. */
export async function readCmsDesk(): Promise<CmsDesk> {
  throw new Error("not implemented");
}
