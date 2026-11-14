# Private envelopes (Plan A)

Encrypted note files (`*.enc.json`) live here after CMS prepare + commit.
Each publication has a URL slug (`/private/<slug>`) stored in D1; the filename stem is the content id.

Do not put plaintext markdown in this folder.
Do not import these files from `lib/content` (public project/blog loader).

Loader: `lib/private/envelope.ts` only.
