-- Private publication slot (D1). Apply when PRIVATE_DB is provisioned.
CREATE TABLE publication (
  content_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  verifier TEXT NOT NULL,
  envelope_sha256 TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE slot (
  slot INTEGER PRIMARY KEY CHECK (slot = 1),
  live_content_id TEXT REFERENCES publication(content_id),
  pending_content_id TEXT REFERENCES publication(content_id),
  updated_at TEXT NOT NULL
);

CREATE TABLE attempt_window (
  bucket TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  failures INTEGER NOT NULL
);

INSERT INTO slot (slot, live_content_id, pending_content_id, updated_at)
VALUES (1, NULL, NULL, '1970-01-01T00:00:00.000Z');
