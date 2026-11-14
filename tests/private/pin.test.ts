import { describe, expect, it } from "vitest";

import { parseSixDigitPin } from "../../lib/private/kdf";

describe("parseSixDigitPin", () => {
  it("accepts exactly six ASCII digits", () => {
    expect(parseSixDigitPin("012345")).toBe("012345");
  });

  it("rejects other lengths and non-digits", () => {
    expect(parseSixDigitPin("12345")).toBeNull();
    expect(parseSixDigitPin("1234567")).toBeNull();
    expect(parseSixDigitPin("12 456")).toBeNull();
    expect(parseSixDigitPin("abcdef")).toBeNull();
  });
});
