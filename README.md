# LaCleo Atlas — SMMART Transformation Radar

An **AI Revenue-Intelligence Platform built exclusively for SMMART** (management
consulting, transformation & corporate training). It discovers Indian companies
**entering a transformation journey** — new plants, PLI wins, COO hires, export
mandates — *before* they become buyers, scores the **capability gap**, and puts SMMART
in the room first.

> **Core thesis:** SMMART doesn't have a lead problem, it has a *timing* problem.
> A company becomes a buyer the moment its **ambition outruns its operating capability**.
> Atlas detects that moment and scores the **gap**, not the company.

## What's here

| | Path | What it is |
|---|---|---|
| 🎛️ **Flagship UI** | [`dist/lacleo-ai-prospecting/smmart.html`](dist/lacleo-ai-prospecting/smmart.html) | Single-file, working, dark-glassmorphism build of **all 7 modules** — Executive Dashboard, Account 360, Signal Intelligence, Prospect Scoring, Decision-Maker Intelligence, Outreach Centre, AI Command Centre. No build step — open it. |
| 📐 **Design & architecture** | [`docs/`](docs/) | The full 17-output product spec — vision, IA, UX, wireframes, DB schema, agent/LangGraph/MCP architecture, API, folder structure, roadmap, and the **42-signal consulting-specific buying-signal model**. Start at [`docs/README.md`](docs/README.md). |
| 🧩 **Original demo** | [`dist/lacleo-ai-prospecting/index.html`](dist/lacleo-ai-prospecting/index.html) | The earlier single-account prospecting demo + `api/claude.js` live backend. |

## The 7 modules (in `smmart.html`)

1. **Executive Dashboard** — revenue-under-watch, high-intent-this-week, live signal
   ticker, pipeline forecast, industry/city distributions, transformation sub-scores,
   ranked AI recommendations.
2. **Account Intelligence 360** — one company, everything: overview, plants, leadership,
   financials, tech, signals, people — with confidence / risk / probability, recommended
   offering and next best action.
3. **Signal Intelligence** — live transformation-trigger feed + the ranked 42-signal
   consulting library (Very-High → Very-Low, each with *why*).
4. **AI Prospect Scoring** — 10-dimension score stack, transparent formula, P1–P3 board.
5. **Decision-Maker Intelligence** — profiles, KPIs, pain, warm paths, conversation
   starters, email/call/meeting angles.
6. **AI Outreach Centre** — cold email, LinkedIn, call script, exec brief, objection
   handling, ROI calculator — every draft cites its evidence.
7. **AI Command Centre** — the 17-agent LangGraph fleet with memory, reasoning, retries
   and a mandatory human-approval gate.

## Design system
Dark, executive, glassmorphism, LaCleo teal. Tokens and full UI spec in
[`docs/06-frontend-spec.md`](docs/06-frontend-spec.md).

## Deploy the flagship
It's a self-contained file — host `dist/lacleo-ai-prospecting/smmart.html` anywhere
(Vercel, Netlify, S3, or open locally). For the live-AI variant and backend wiring, see
[`dist/lacleo-ai-prospecting/README.md`](dist/lacleo-ai-prospecting/README.md).

> **Note:** all account, people and signal data in the UI is **illustrative sample
> data**. Connect live sources (Sprouts, Apollo, TheirStack, Clay, news & government
> feeds) via the MCP layer to go live across India. The referenced discovery-call
> transcript and ICP document were not machine-readable in this build environment; the
> design reverse-engineers SMMART's revenue motion from the written brief and public
> positioning.
