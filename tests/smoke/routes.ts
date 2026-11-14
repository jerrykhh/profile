/**
 * Single source of HTML smoke paths. Do not duplicate this list in CI YAML.
 * Expand only when a new top-level route ships.
 */
export type SmokeRoute = {
  readonly path: "/" | `/${string}`;
  readonly status: 200;
  readonly titlePattern: RegExp;
};

export const SMOKE_ROUTES = [
  { path: "/", status: 200, titlePattern: /Profile \| Jerry Kwok/ },
  { path: "/blog", status: 200, titlePattern: /Blog \| Jerry Kwok/ },
  { path: "/project", status: 200, titlePattern: /Projects \| Jerry Kwok/ },
  { path: "/ext/link", status: 200, titlePattern: /Contact \| Jerry Kwok/ },
] as const satisfies readonly SmokeRoute[];
