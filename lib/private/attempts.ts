import "server-only";

/** In-isolate rate limit until D1 attempt_window is wired. Not cross-isolate. */
const windows = new Map<string, { start: number; failures: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

function bucket(kind: "pin" | "cms", ip: string | null): string {
  return `${kind}:${ip ?? "missing"}`;
}

export async function isLimited(kind: "pin" | "cms", ip: string | null): Promise<boolean> {
  const row = windows.get(bucket(kind, ip));
  if (!row) return false;
  if (Date.now() - row.start > WINDOW_MS) return false;
  return row.failures >= MAX_FAILURES;
}

export async function recordFailure(kind: "pin" | "cms", ip: string | null): Promise<void> {
  const key = bucket(kind, ip);
  const now = Date.now();
  const row = windows.get(key);
  if (!row || now - row.start > WINDOW_MS) {
    windows.set(key, { start: now, failures: 1 });
    return;
  }
  row.failures += 1;
}

export async function clearFailures(kind: "pin" | "cms", ip: string | null): Promise<void> {
  windows.delete(bucket(kind, ip));
}
