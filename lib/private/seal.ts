import "server-only";

export async function sealPrivateCookie(grant: {
  contentId: string;
  encKey: Uint8Array;
  expUnix: number;
}): Promise<void> {
  throw new Error("not implemented");
  void grant;
}

export async function readPrivateGrant(): Promise<{
  contentId: string;
  encKey: Uint8Array;
  expUnix: number;
} | null> {
  throw new Error("not implemented");
}

export async function clearPrivateCookie(): Promise<void> {
  throw new Error("not implemented");
}

export async function sealCmsCookie(expUnix: number): Promise<void> {
  throw new Error("not implemented");
  void expUnix;
}

/** Null when the cookie is missing, expired, or pwdTag no longer matches CMS_PASSWORD. */
export async function readCmsGrant(): Promise<{ expUnix: number } | null> {
  throw new Error("not implemented");
}

export async function clearCmsCookie(): Promise<void> {
  throw new Error("not implemented");
}
