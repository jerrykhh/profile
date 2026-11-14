# Private envelopes (Plan A)

Encrypted note files (`*.enc.json`) live here after CMS prepare + commit.
Each publication has a URL slug (`/private/<slug>`); the filename stem is the content id.

Demo sample: slug `demo-hello`, PIN `123456` (demo only). Regenerate with `node scripts/make-demo-private.mjs`.

Do not put plaintext markdown in this folder.
Do not import these files from `lib/content` (public project/blog loader).

Loader: `lib/private/envelope.ts` only.
