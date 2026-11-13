import { describe, expect, it } from "vitest";

import { isAllowedYoutubeEmbed } from "@/lib/markdown-schema";

describe("isAllowedYoutubeEmbed", () => {
  it("allows youtube and youtube-nocookie embed URLs", () => {
    expect(isAllowedYoutubeEmbed("https://www.youtube.com/embed/abc123_-")).toBe(true);
    expect(isAllowedYoutubeEmbed("//youtube-nocookie.com/embed/abc123_-")).toBe(true);
  });

  it("rejects non-embed hosts and paths", () => {
    expect(isAllowedYoutubeEmbed("https://evil.example/embed/abc")).toBe(false);
    expect(isAllowedYoutubeEmbed("https://www.youtube.com/watch?v=abc")).toBe(false);
    expect(isAllowedYoutubeEmbed(null)).toBe(false);
    expect(isAllowedYoutubeEmbed("")).toBe(false);
  });
});
