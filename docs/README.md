# SMMART Transformation Radar — Design & Architecture

**Product:** LaCleo Atlas — Account & Revenue Intelligence · **Deployment:** built
exclusively for **SMMART** (management consulting, transformation & corporate training).

An AI Revenue-Intelligence platform that discovers Indian companies **entering a
transformation journey** — *before* they become buyers — by continuously detecting
consulting-specific buying signals across India, scoring the capability gap, and putting
SMMART in the room first.

> **Live UI reference:** [`../dist/lacleo-ai-prospecting/smmart.html`](../dist/lacleo-ai-prospecting/smmart.html)
> — a single-file, working, dark-glassmorphism build of all 7 modules.
>
> **Note on inputs:** the discovery-call transcript and ICP document referenced in the
> brief were not machine-readable in this build environment. This design reverse-engineers
> SMMART's buying/sales/qualification/revenue workflow from the written brief and public
> positioning. All account & signal data in the UI is **illustrative sample data** until
> live sources are connected.

## The 17 requested outputs → where they live

| # | Output | Document |
|---|---|---|
| 1 | Product Vision | [01-product-vision.md](01-product-vision.md) |
| 2 | Information Architecture | [02-information-architecture-and-ux.md](02-information-architecture-and-ux.md) |
| 3 | UX Flow | [02](02-information-architecture-and-ux.md) §3 |
| 4 | User Journey | [02](02-information-architecture-and-ux.md) §4 |
| 5 | Dashboard Wireframes | [02](02-information-architecture-and-ux.md) §5 |
| 6 | Component Library | [06-frontend-spec.md](06-frontend-spec.md) §2 |
| 7 | Database Schema | [05-data-model-and-api.md](05-data-model-and-api.md) §1 |
| 8 | Agent Architecture | [04-agent-architecture.md](04-agent-architecture.md) §2 |
| 9 | MCP Architecture | [04](04-agent-architecture.md) §4 |
| 10 | Folder Structure | [05](05-data-model-and-api.md) §3 |
| 11 | API Design | [05](05-data-model-and-api.md) §2 |
| 12 | AI Workflow | [04](04-agent-architecture.md) §5 |
| 13 | LangGraph Orchestration | [04](04-agent-architecture.md) §3 |
| 14 | Development Roadmap | [07-roadmap-and-future.md](07-roadmap-and-future.md) §2 |
| 15 | Future Enhancements | [07](07-roadmap-and-future.md) §4 |
| 16 | Screens ready for React | [06](06-frontend-spec.md) §3 + `smmart.html` |
| 17 | Production-ready UI spec | [06](06-frontend-spec.md) §4 |
| ★ | **Consulting-specific Buying-Signal Model** (42 ranked signals + why + confidence) | [03-buying-signal-model.md](03-buying-signal-model.md) |
| ★ | **AI Prospect Scoring** (score stack, formula, P1–P3) | [03](03-buying-signal-model.md) Part C |

## The 7 platform modules

1. **Executive Dashboard** — revenue-under-watch, high-intent-this-week, signal ticker,
   forecast, distributions, transformation sub-scores, AI recommendations.
2. **Account Intelligence 360** — one company, everything, with confidence/risk/probability,
   recommended offering and next best action.
3. **Buying-Signal Intelligence** — live trigger feed + the 42-signal consulting library.
4. **AI Prospect Scoring** — 10-dimension score stack, P1–P3, tunable simulator.
5. **Decision-Maker Intelligence** — profiles, org charts, KPIs, warm intros, angles.
6. **AI Outreach Centre** — briefs, emails, LinkedIn, call scripts, ROI calculator.
7. **AI Command Centre** — 17-agent LangGraph fleet, memory, reasoning, HITL approvals.

## The core thesis
> SMMART doesn't have a lead problem, it has a **timing** problem. A company becomes a
> buyer the moment its **ambition outruns its operating capability** — a new plant, a PLI
> win, a new COO, an export mandate. Atlas detects that moment and scores the **gap**, not
> the company.

Read the docs in order 01 → 07, or jump straight to the
[buying-signal model](03-buying-signal-model.md) (the heart of the system).
