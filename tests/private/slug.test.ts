import { describe, expect, it } from "vitest";

import { parsePrivateSlug } from "../../lib/private/slug";
import { TERMS_CHECKBOX_LABEL } from "../../lib/private/types";
import { privateCheckPath, privateSlugPath } from "../../lib/private/routes";

describe("parsePrivateSlug", () => {
  it("accepts kebab slugs", () => {
    expect(parsePrivateSlug("viu-interview")).toBe("viu-interview");
    expect(parsePrivateSlug("a")).toBe("a");
  });

  it("rejects invalid slugs", () => {
    expect(parsePrivateSlug("Viu")).toBeNull();
    expect(parsePrivateSlug("-bad")).toBeNull();
    expect(parsePrivateSlug("bad-")).toBeNull();
    expect(parsePrivateSlug("has_under")).toBeNull();
    expect(parsePrivateSlug("")).toBeNull();
  });
});

describe("private paths and terms", () => {
  it("builds slug and check paths", () => {
    expect(privateSlugPath("viu-interview")).toBe("/private/viu-interview");
    expect(privateCheckPath("viu-interview")).toBe("/private/viu-interview/check");
  });

  it("uses no-share checkbox wording", () => {
    expect(TERMS_CHECKBOX_LABEL).toMatch(/must not be shared/i);
  });
});
