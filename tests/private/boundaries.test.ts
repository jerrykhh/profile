import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { D1_BINDING, SECRET_BINDINGS } from "../../cloudflare.bindings";
import robots from "../../app/robots";
import { CMS_PREFIX, PRIVATE_PATH, ROBOTS_DISALLOW, isUnlistedPath } from "../../lib/private/routes";
import { SMOKE_ROUTES } from "../smoke/routes";

describe("private route boundaries", () => {
  it("robots disallow matches ROBOTS_DISALLOW", () => {
    const rules = robots().rules;
    const disallow = Array.isArray(rules) ? rules[0]?.disallow : rules?.disallow;
    const list = Array.isArray(disallow) ? disallow : disallow ? [disallow] : [];
    for (const path of ROBOTS_DISALLOW) {
      expect(list).toContain(path);
    }
  });

  it("isUnlistedPath covers private and cms prefixes", () => {
    expect(isUnlistedPath(PRIVATE_PATH)).toBe(true);
    expect(isUnlistedPath(`${PRIVATE_PATH}/x`)).toBe(true);
    expect(isUnlistedPath(CMS_PREFIX)).toBe(true);
    expect(isUnlistedPath(`${CMS_PREFIX}/login`)).toBe(true);
    expect(isUnlistedPath("/project")).toBe(false);
  });

  it("smoke routes and public content loader stay off private paths", () => {
    for (const route of SMOKE_ROUTES) {
      expect(isUnlistedPath(route.path)).toBe(false);
    }
    const contentIndex = readFileSync(resolve("lib/content/index.ts"), "utf8");
    expect(contentIndex).not.toContain("content/private");
  });

  it("binding name list is documented for Phase D", () => {
    expect(SECRET_BINDINGS).toEqual(["CMS_USERNAME", "CMS_PASSWORD", "SESSION_KEY"]);
    expect(D1_BINDING).toBe("PRIVATE_DB");
  });
});
