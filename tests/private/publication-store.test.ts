import { describe, expect, it, beforeEach } from "vitest";

import {
  memoryDelete,
  memoryList,
  memorySetLive,
  memoryUpsert,
  resetPublicationMemory,
  shareLinkStatus,
} from "../../lib/private/publication-core";

describe("publication-core memory fallback", () => {
  beforeEach(() => {
    resetPublicationMemory();
  });

  it("upserts, lists, disables, and deletes", () => {
    memoryUpsert({
      contentId: "cid-1",
      slug: "demo-hello",
      title: "Hello interviewer",
      description: "Audience",
      expiresAt: "2099-01-01T00:00:00.000Z",
      verifier: "v",
      envelopeSha256: "h",
      live: true,
      createdAt: "2026-01-01T00:00:00.000Z",
    });

    const listed = memoryList();
    expect(listed).toHaveLength(1);
    expect(shareLinkStatus(listed[0]!)).toBe("live");

    memorySetLive("cid-1", false);
    expect(shareLinkStatus(memoryList()[0]!)).toBe("disabled");

    memoryDelete("cid-1");
    expect(memoryList()).toHaveLength(0);
  });
});
