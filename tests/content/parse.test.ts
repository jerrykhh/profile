import { describe, expect, it } from "vitest";

import { parseMarkdownFile } from "@/lib/content/parse";

describe("parseMarkdownFile", () => {
  it("slugifies uri but keeps cover folder casing from raw uri", () => {
    const source = `---
uri: Goodstify
name: Goodstify
icon: icon.png
date: 2021-06-01
---
Project body.
`;
    const { meta } = parseMarkdownFile("project", "Goodstify.md", source);
    expect(meta.slug).toBe("goodstify");
    expect(meta.cover).toBe("/project/Goodstify/icon.png");
    expect(meta.title).toBe("Goodstify");
  });

  it("marks external posts and uses placeholder cover when icon missing", () => {
    const source = `---
title: External post
external: true
externalUrl: https://www.linkedin.com/pulse/example
date: 2024-01-15
---
`;
    const { meta } = parseMarkdownFile("blog", "external.md", source);
    expect(meta.external).toBe(true);
    expect(meta.externalUrl).toBe("https://www.linkedin.com/pulse/example");
    expect(meta.cover).toBe("/blog/external-placeholder.svg");
    expect(meta.slug).toBe("external");
  });

  it("splits comma/hash tags", () => {
    const source = `---
title: Tagged
tags: "#aws, nextjs, devops"
date: 2023-01-01
---
`;
    const { meta } = parseMarkdownFile("blog", "tagged.md", source);
    expect(meta.tags).toEqual(["aws", "nextjs", "devops"]);
  });
});
