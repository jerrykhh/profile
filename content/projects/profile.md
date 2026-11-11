---
icon: "icon.jpg"
uri: "profile"
title: "jerrykhh profile"
name: "jerrykhh profile"
description: "Personal profile site across four versions, from Bootstrap homework to Next.js on vinext and Cloudflare Workers."
date: "2026-11-11"
tag: "#Next.js #Cloudflare #vinext #Workers"
repository: "https://github.com/jerrykhh/profile"
language: "TypeScript"
---

# jerrykhh profile

## Why this site keeps changing

This site is my public profile: who I am, what I ship, and how to reach me. Each version was a small bet on a stack I wanted to learn while the site stayed live. The homepage still links the older builds under the version badges.

## Version history

### V1. Bootstrap (master’s homework)

The first profile was a Bootstrap site built while I studied for my master’s. The goal was a working personal page, not a long-term product. An archive still sits at [owner-v1-backup.bytesio.net](https://owner-v1-backup.bytesio.net/).

### V2. Next.js on Vercel

V2 moved the profile onto Next.js and hosted it on Vercel. Content lived as markdown in the repo. That build remains at [profile-jerrykhh.vercel.app](https://profile-jerrykhh.vercel.app/).

### V3. Remix

V3 rebuilt the app on Remix and pulled blog, project, and profile copy from Notion databases. The CHANGELOG still records that Remix cut as `v3.0.0` (May 2025). Notion made content edits easy, but the site then depended on an external store and on a different framework from the Next.js work I do day to day.

### V4. Next.js (vinext) on Cloudflare Workers

V4 is the current site. It returns to a Next.js App Router shape, runs on Cloudflare Workers through vinext, and keeps blog and project posts as static markdown in git again.

## What V4 is made of

The stack in this repo today:

- **Runtime.** `vinext` plus `@vinext/cloudflare` and the Cloudflare Vite plugin. `vite.config.ts` wires vinext and the Worker build. `npm run deploy` runs `vinext-cloudflare deploy`.
- **Worker.** `cloudflare.config.ts` names the Worker `jerrykhh-profile`, uses the `vinext/server/fetch-handler` entrypoint, and turns on `nodejs_compat`.
- **UI.** React, Tailwind CSS, and shadcn/ui primitives under `components/ui`. Site chrome uses a liquid-glass nav and a copyright-only footer.
- **Content.** `content/blog/*.md` and `content/projects/*.md`, loaded with `import.meta.glob` in `lib/content`. Profile copy lives in `config/profile.ts`. Markdown renders through `rehype-raw` and a sanitized schema that allows YouTube embeds only.
- **CI.** A push to `development`, or a release on `main`, deploys the Worker through GitHub Actions with `npm run deploy` and Cloudflare credentials.

Package version is `4.0.0`. Live URL is [owner.bytesio.net](https://owner.bytesio.net/).

## Routes and pages

| Route | Role |
| --- | --- |
| `/` | Hero, experience timeline, skills, education, certifications, featured projects and posts |
| `/project`, `/project/[slug]` | Project list and markdown detail |
| `/blog`, `/blog/[slug]` | Blog list and markdown detail (external posts open off-site) |
| `/ext/link` | Shareable contact card |

Home and contact share the `(cobalt)` layout so the hero backdrop stays mounted when you move between those two routes.

## Shader hero

The homepage hero is a soft cobalt frost mesh built with the `shaders` package (`MeshGradient`, soft `CursorRipples`, blur). CSS orbs paint first so hydration and home-to-contact navigation do not flash the wrong base color. The WebGPU shader fades in after it is ready. Motion respects `prefers-reduced-motion`, and ripples stay low-intensity so the effect stays calm.

Light and dark each have their own palette in `lib/cobalt-frost.ts`. Theme changes animate over about 400 ms instead of cutting hard.

## Wallet-style contact

`/ext/link` is an Apple Wallet style stack of name cards:

- white personal card
- active ViuTV card (`#0180f5`)
- inactive ViuTV card (same blue with a black overlay)
- muted Hospital Authority past role

Cards overlap with a peek. A tap brings one card forward. Social links are icon-only (GitHub, LinkedIn, YouTube, Email) with accessible labels. The Email icon goes to `/`, not `mailto:`.

## SEO and discovery

Shared layout metadata covers:

- document title `Profile | Jerry Kwok` on the homepage, and `%s | Jerry Kwok` elsewhere
- `metadataBase` from `siteConfig.url`
- canonical URLs, robots allow-all, Open Graph, and Twitter summary cards
- keywords grounded in the profile copy

`app/sitemap.ts` lists home, blog, project, contact, and each internal blog or project slug. `app/robots.ts` points crawlers at that sitemap.

## What stayed the same

Across the rewrites, the job of the site did not change: introduce Jerry Kwok, show projects and writing, and give a clean way to connect. The stack changed so the site could track the tools I actually use, from Bootstrap homework, through Vercel Next.js and Remix with Notion, to vinext on Workers with git-backed markdown.
