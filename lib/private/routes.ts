export const PRIVATE_PATH = "/private" as const;
export const CMS_PREFIX = "/cms" as const;

/** Single list for robots.txt, middleware cache headers, and boundary tests. */
export const ROBOTS_DISALLOW = [PRIVATE_PATH, CMS_PREFIX] as const;

export const HIDDEN_ROBOTS = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
} as const;

export function isUnlistedPath(pathname: string): boolean {
  return ROBOTS_DISALLOW.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function privateSlugPath(slug: string): `${typeof PRIVATE_PATH}/${string}` {
  return `${PRIVATE_PATH}/${slug}`;
}

/** Heartbeat check path for a slug. */
export function privateCheckPath(slug: string): `${typeof PRIVATE_PATH}/${string}/check` {
  return `${PRIVATE_PATH}/${slug}/check`;
}
