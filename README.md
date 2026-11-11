# jerrykhh profile (v4)

Personal portfolio and blog built with **Next.js (vinext)** on **Cloudflare Workers**, Tailwind CSS, shadcn/ui, and static markdown content.

## Routes

- `/` — intro, tech stack, featured work
- `/project`, `/project/[slug]`
- `/blog`, `/blog/[slug]`
- `/ext/link` — shareable contact card

## Content

- Profile/home copy: `config/profile.ts`
- Blog posts: `content/blog/*.md`
- Projects: `content/projects/*.md`
- Assets: `public/blog`, `public/project`, `public/profile`

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
