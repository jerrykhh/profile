# Tests

**Decision:** Playwright E2E is over-engineering for this portfolio. See the architecture rationale in the project store (`docs/playwright-architecture.md`).

```sh
npm run typecheck
npm test
BASE_URL=http://127.0.0.1:4173 npm test   # optional HTML smoke against vite preview
```

- Units under `tests/content/` call production parsers (`lib/content/parse`, `lib/markdown-schema`).
- Optional HTML smoke uses a single route table: `tests/smoke/routes.ts`.
- **Do not add Playwright** unless a future need is only a wallet `aria-current` click — then one Chromium file, no POMs, no WebKit, no LCP/WebGPU/canvas assertions.
