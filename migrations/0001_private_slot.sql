-- Multi-slug private publications (D1, Plan A). Apply when PRIVATE_DB is provisioned.
CREATE TABLE publication (
  content_id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  verifier TEXT NOT NULL,
  envelope_sha256 TEXT NOT NULL,
  live INTEGER NOT NULL DEFAULT 0 CHECK (live IN (0, 1)),
  pending INTEGER NOT NULL DEFAULT 0 CHECK (pending IN (0, 1)),
  created_at TEXT NOT NULL
);

CREATE INDEX publication_slug_live ON publication (slug, live);
CREATE INDEX publication_slug_pending ON publication (slug, pending);

CREATE TABLE attempt_window (
  bucket TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  failures INTEGER NOT NULL
);

-- Optional audit trail for access logging (Workers Logs may also capture URLs).
CREATE TABLE access_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  slug TEXT NOT NULL,
  outcome TEXT NOT NULL,
  pin_in_query INTEGER NOT NULL DEFAULT 0,
  ip_hash TEXT,
  at_ms INTEGER NOT NULL
);
