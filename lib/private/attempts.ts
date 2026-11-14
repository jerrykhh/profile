import "server-only";

/** Read only. True when this bucket is already at 5 failures inside a 15-minute window. */
export async function isLimited(kind: "pin" | "cms", ip: string | null): Promise<boolean> {
  throw new Error("not implemented");
  void kind;
  void ip;
}

/** TODO: one INSERT ON CONFLICT that resets the count when the window has elapsed, otherwise increments. */
export async function recordFailure(kind: "pin" | "cms", ip: string | null): Promise<void> {
  throw new Error("not implemented");
  void kind;
  void ip;
}

export async function clearFailures(kind: "pin" | "cms", ip: string | null): Promise<void> {
  throw new Error("not implemented");
  void kind;
  void ip;
}
