# LaCleo — AI Prospecting Platform (demo)

A self-contained, client-ready demo of the LaCleo prospecting platform.

- `index.html` — the whole app (no build step). Open it directly, host it anywhere.
- `api/claude.js` — a Vercel serverless function that powers the **live Claude** AI features.

## Two ways the AI features run

The **AI Signal Analyzer** and per-account **Draft with AI** work in two modes:

1. **Smart-template mode (default, works everywhere)** — instant, deterministic output.
   No backend or API key needed. This is what runs on the shared demo link and when
   you open `index.html` locally.
2. **Live Claude mode** — real Claude API calls for outreach drafting and signal
   analysis. Requires deploying with a backend + your Anthropic API key (below).

The app auto-detects which mode is available and shows it in the status chip.

## Deploy with live Claude (recommended for client demos on your domain)

> Serverless functions only run on a **Git or Vercel-CLI deploy** — not the
> drag-and-drop uploader at vercel.com/drop (that serves static files only).

**Option A — Vercel + GitHub (easiest)**
1. Push this folder to a GitHub repo (already done if you're reading this in the repo).
2. In Vercel: **Add New Project → Import** the repo, set the **Root Directory** to
   `dist/lacleo-platform`.
3. **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your Anthropic API key
   - *(optional)* `CLAUDE_MODEL` = `claude-sonnet-5` (default) or `claude-haiku-4-5-20251001`
4. Deploy. The status chip will read **“AI backend: Live (Claude)”** and drafts will
   show **“✨ Written by Claude.”**

**Option B — Vercel CLI**
```bash
cd dist/lacleo-platform
vercel                     # first deploy
vercel env add ANTHROPIC_API_KEY   # paste your key
vercel --prod              # redeploy live
```

Get an API key at https://console.anthropic.com/ → **API Keys**.

## Notes
- Pre-loaded pipeline accounts are **illustrative sample data**. Wire your real
  sources (Apollo, Clay, LinkedIn, CRM) for live, source-verified accounts.
- Nothing sensitive is stored in the page; your API key stays server-side in the
  Vercel function's environment.
