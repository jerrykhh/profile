# jerrykhh profile (v4)

Personal portfolio and blog built with **Next.js (vinext)** on **Cloudflare Workers**, Tailwind CSS, shadcn/ui, and static markdown content.

## Routes

- `/` — intro, tech stack, featured work
- `/project`, `/project/[slug]`
- `/blog`, `/blog/[slug]`
- `/ext/link` — shareable contact card
- `/private/[slug]` — PIN-gated notes (noindex; see encrypt guide)
- `/cms/login` — operator CMS (Worker secrets)

## Content

- Profile/home copy: `config/profile.ts`
- Blog posts: `content/blog/*.md`
- Projects: `content/projects/*.md`
- Private envelopes (Plan A ciphertext): `content/private/*.enc.json`
- Assets: `public/blog`, `public/project`, `public/profile`

PIN private notes: encrypt guide is in the Project docs at `docs/pin-private-encrypt-guide.md` (agent store) / ask for `/private/demo-hello` with demo PIN `123456`. Regenerate the sample with `node scripts/make-demo-private.mjs`.

## Development

```sh
npm install
npm run dev
```

## Build & deploy (Cloudflare Workers)

```sh
npm run build
npm run start   # local Worker preview
npm run deploy  # vinext-cloudflare deploy
```

Worker name: `jerrykhh-profile` (see `cloudflare.config.ts`).

### GitHub Actions secrets

CI (`.github/workflows/release.yml`) deploys with `npm run deploy`. Set these repository secrets (Settings → Secrets and variables → Actions):

| Secret | Purpose |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | API token with Workers edit (e.g. template **Edit Cloudflare Workers**) |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID that owns worker `jerrykhh-profile` |

`GITHUB_TOKEN` is provided by Actions for release-please; no PAT secret is required.
