# 06 · Component Library, Screens & Production UI Specification

Covers requested outputs **#6 Component Library, #16 Screens ready for React, #17
Production-ready UI specification.** The live reference implementation of this spec is
[`dist/lacleo-ai-prospecting/smmart.html`](../dist/lacleo-ai-prospecting/smmart.html) —
a single-file, working, dark-glassmorphism build of all 7 modules that maps 1:1 to the
React component tree below.

---

## 1. Design language

- **Theme:** dark, executive, glassmorphism. LaCleo teal accent on near-black teal-ink.
- **Depth:** frosted panels (`backdrop-filter: blur`), 1px luminous borders, soft radial
  glows behind hero/KPI, low-elevation shadows. Never flat, never neon-overload.
- **Motion:** purposeful — signal ticker scroll, agent orb pulse, count-up KPIs, score
  bars fill on mount, live "typing" agent status. All ≤300ms, respect
  `prefers-reduced-motion`.
- **Data density:** high but calm — tabular numerics, generous section rhythm, one clear
  primary action per view.

### 1.1 Design tokens (authoritative)
```css
--bg:#071311; --bg-2:#0a1a17; --panel:#0d1f1b; --panel-2:#102723;
--glass:rgba(16,39,35,.55); --glass-brd:rgba(45,212,191,.18);
--line:#183833; --line-2:#1f4a43;
--teal:#2dd4bf; --teal-600:#14b8a6; --teal-700:#0d9488; --teal-glow:rgba(45,212,191,.18);
--text:#e7f5f1; --muted:#8db3ab; --muted-2:#5f827b;
--amber:#f2c14e; --rose:#f2758c; --good:#3ddc97; --violet:#a78bfa;
--radius:14px; --shadow:0 18px 50px -20px rgba(0,0,0,.7);
/* intent scale */ --vh:#f2758c; --high:#f2a24e; --med:#f2c14e; --low:#5f9e93; --vl:#5f827b;
```

### 1.2 Type scale
Display 27/750 · H1 23/750 · H2 16/700 · Body 13–14/500 · Micro/label 11/700 uppercase
`.5px`. Numerics use `font-variant-numeric: tabular-nums`. Mono for agent traces & IDs.

## 2. Component library (React tree)

### 2.1 Primitives
`GlassPanel` · `StatCard{label,value,delta,trend}` · `Sparkline` · `Donut` · `RadarChart`
· `BarMini` · `ProgressBar` · `Pill{tone}` · `IntentBadge{tier}` · `PTierChip{p1..future}`
· `ConfidenceMeter` · `RiskMeter` · `Avatar` · `Button{primary,ghost,mini}` · `Drawer` ·
`Modal` · `Tabs` · `Table{sortable}` · `FilterBar` · `CommandBar(⌘K)` · `Skeleton` ·
`EmptyState` · `Toast`.

### 2.2 Domain components
| Component | Used in | Notes |
|---|---|---|
| `KpiRow` | Exec | 5–6 `StatCard`s with count-up + delta |
| `ScoreRadar` | Exec, Account | 7–10 axis radar of the score stack |
| `ScoreStack` | Account, Scoring | labelled bars + "why this score" popover |
| `SignalTicker` | global | live horizontal strip of newest VH/H signals |
| `SignalCard` / `SignalDrawer` | Signals | source, date, conf, impact, why, pitch, offering, contact, urgency |
| `SignalLibraryTable` | Signals | all 42 types, ranked, filterable by tier |
| `AccountRow` / `AccountCard` | Watchlist, Exec | name, city, industry, P-tier, score, top trigger |
| `Account360` | Account | tabbed 360 profile (see §3.2) |
| `PersonCard` / `PersonProfile` | People | KPIs, pain, angles, conversation starter |
| `OrgChart` | Account, People | hierarchy + warm-path highlighting |
| `RelationshipGraph` | People | force-graph of warm intros |
| `ForecastChart` | Exec | weighted pipeline by P-tier × probability |
| `DistributionBars` | Exec | industry / city splits |
| `RecommendationList` | Exec, Account | ranked Next-Best-Actions |
| `OutreachComposer` | Outreach | channel tabs + AI draft + evidence citations + ROI |
| `AgentFleetGrid` | Command | 17 agent tiles w/ live status |
| `AgentInspector` | Command | memory, reasoning trace, retries, failures, confidence |
| `ApprovalQueue` | Command | HITL sign-off with edit/approve/reject |
| `EvidenceList` | everywhere | dated, linked, trust-scored sources |

### 2.3 State & data
- Server state: TanStack Query over the REST API; WebSocket/SSE hooks
  (`useSignalStream`, `useAgentStream`, `useRunStream`) patch the cache live.
- No client-side business logic for scores — the API is the source of truth; the UI only
  renders `breakdown` for explainability.

## 3. Screen specifications (ready for React)

### 3.1 Executive Dashboard — `/exec`
- `TopBar` (brand, ⌘K, approvals badge, live chip) → `SignalTicker`.
- `KpiRow`: **Revenue Opportunity (₹)**, Companies Under Watch, High-Intent Accounts (Δ wk),
  Buying Signals (/wk), AI Confidence, Pipeline Forecast (mini).
- Row 2: `ForecastChart` (wide) + `ScoreRadar` (aggregate market view).
- Row 3: `AccountCard` list "High-Intent This Week" + the 7 transformation sub-scores as
  meters (Transformation, Expansion, Innovation, Leadership-Change, Hiring, News, Procurement).
- Row 4: `DistributionBars` industry + city, `Sparkline` weekly trend.
- Footer: `RecommendationList` — ranked AI next actions with account deep-links.

### 3.2 Account Intelligence 360 — `/accounts/[id]`
Header: name, city, industry, revenue, employees, `PTierChip`, `ConfidenceMeter`,
`RiskMeter`, probability. Tabs:
1. **Overview** — AI summary + why, company facts, plants/locations, leadership,
   expansion history, acquisitions, investments, press, digital presence, tech stack,
   hiring, awards, financial health, business priorities, challenges, transformation
   readiness, operational maturity, estimated consulting budget.
2. **Signals** — this account's `SignalCard`s (source/date/conf/impact/why/pitch/offering).
3. **People** — `OrgChart` + `PersonCard`s + `RelationshipGraph` + warm-intro paths.
4. **Financials** — revenue trend, margins commentary, ownership, risk flags.
5. **Tech** — technology stack & digital-maturity gap.
6. **Outreach** — `OutreachComposer` prefilled with account evidence.
Right sidebar (sticky): `ScoreStack`, recommended offering, next best action, evidence.

### 3.3 Signal Intelligence — `/signals`
`FilterBar` (tier, recency, industry, city) → `SignalTicker` (live) → feed of
`SignalCard`s → `SignalDrawer` on click → toggle to `SignalLibraryTable` (all 42 types).

### 3.4 Prospect Scoring — `/scoring`
P1–P3 kanban board of `AccountCard`s · `ScoreStack` detail · **Scoring Simulator**
(sliders for dim weights → live re-count of P-tiers) · model version history.

### 3.5 Decision-Maker Intelligence — `/people`
Directory + `PersonProfile` (LinkedIn, career, education, posts, interests, speaking,
interviews, pain points, likely KPIs, comm style, buying-behaviour prediction,
relationship strength) + AI conversation starter + email/call/meeting angles.

### 3.6 Outreach Centre — `/outreach`
Channel tabs (Cold email · LinkedIn · Call script · Exec brief · Meeting agenda ·
Proposal outline · Objection handling · Follow-ups) → `OutreachComposer` with evidence
citations, value prop, consulting use-cases, case studies, and an **ROI Calculator**
(inputs: plant size, OEE %, defect rate → modelled savings from a SMMART engagement).

### 3.7 AI Command Centre — `/command`
`AgentFleetGrid` (17 tiles, live status/confidence/retries) → `AgentInspector`
(memory, reasoning trace, task queue, failures) → `ApprovalQueue` (HITL) → run timeline.

## 4. Production UI requirements (definition of done)
- **Accessibility:** WCAG 2.1 AA — 4.5:1 text contrast (verified on the dark palette),
  full keyboard nav, focus rings, ARIA on charts/live regions, `prefers-reduced-motion`.
- **Performance:** LCP < 2.5s, route-level code-split per module, virtualised long tables,
  streamed data patched into cache (no full refetch).
- **Responsive:** the three breakpoints in doc 02 §6; nothing below 320px breaks.
- **Resilience:** every async surface has skeleton, empty and error states; charts degrade
  to tables when data is sparse.
- **Trust affordances:** confidence/risk always visible; every AI claim links to evidence;
  "AI-generated — needs approval" is explicit, never hidden.
- **Theming:** all colour via tokens; a light theme is a token swap only (dark is default).
