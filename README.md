# LaCleo — AI Prospecting Platform

A client-ready, single-file AI prospecting platform built on the LaCleo design system.

## Deployable app
`dist/lacleo-ai-prospecting/`

- `index.html` — the whole app (no build step). Open it directly or host it anywhere.
- `api/claude.js` — Vercel serverless function powering the live AI-agent features.
- `README.md` — deployment guide (Vercel + `ANTHROPIC_API_KEY`).

## Deploy
- **Instant / static:** drag `dist/lacleo-ai-prospecting/` to https://vercel.com/drop
  (runs in preview-agent mode).
- **Branded + live agents:** import the repo in Vercel, set Root Directory to
  `dist/lacleo-ai-prospecting`, name the project `lacleo-ai-prospecting`, and add
  `ANTHROPIC_API_KEY`. Your URL becomes `https://lacleo-ai-prospecting.vercel.app`.

See `dist/lacleo-ai-prospecting/README.md` for full steps.
