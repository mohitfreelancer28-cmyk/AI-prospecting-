# 02 · Information Architecture, UX Flow, User Journeys & Wireframes

Covers requested outputs **#2 IA, #3 UX Flow, #4 User Journey, #5 Dashboard Wireframes.**

---

## 1. Personas & jobs-to-be-done

| Persona | At SMMART | Primary job | Lives in |
|---|---|---|---|
| **Rajesh — Business Head / Partner** | owns revenue | "Show me where the money is this week and who to call." | Executive Dashboard, Account Brief |
| **Meera — Consulting Lead / Practice Head** | scopes & delivers | "Is this a real transformation moment? What offering fits?" | Account Intelligence, Signal Intelligence |
| **Arjun — Inside Sales / BDR** | books meetings | "Give me the account, the person, the angle, the message." | Decision-Makers, Outreach Centre |
| **Priya — Research / RevOps analyst** | curates & QA | "Verify evidence, tune scoring, approve agent output." | Command Centre, Signal Intelligence |
| **Vikram — Founder / Exec sponsor** | strategy & board | "Prove the engine works and forecast pipeline." | Executive Dashboard, Forecast |

## 2. Top-level information architecture

```
LaCleo Atlas — SMMART Transformation Radar
│
├── 1. Executive Dashboard            (Module 1) — the "state of the market" cockpit
├── 2. Accounts
│     ├── Account Watchlist (table)   — every company under watch, filterable
│     └── Account Intelligence 360    (Module 2) — one company, everything
├── 3. Signal Intelligence            (Module 3) — the live trigger feed + signal library
├── 4. Prospect Scoring               (Module 4) — score model, P1–P3 board, simulator
├── 5. Decision-Maker Intelligence    (Module 5) — people, org charts, relationship maps
├── 6. Outreach Centre                (Module 6) — AI drafts, briefs, ROI, case studies
├── 7. AI Command Centre              (Module 7) — the agent fleet, memory, approvals
│
└── System: Sources & Connectors · Scoring Config · Users & Roles · Audit Log
```

Global chrome present on every screen:
- **Left rail** — the 7 modules + system; collapsible to icons.
- **Command bar (⌘K)** — jump to any account/person, run an agent, ask a question.
- **Global buying-signal ticker** — a thin live strip of newest Very-High/High signals.
- **Human-approval inbox badge** — count of agent outputs awaiting sign-off.

## 3. Primary UX flows

### Flow A — "What should I do this morning?" (Rajesh)
Executive Dashboard → *High-Intent Accounts This Week* card → click account →
Account 360 → **Next Best Action** → one click into Outreach Centre → approve draft.

### Flow B — "Is this trigger real?" (Meera / Priya)
Signal ticker → Signal detail drawer → Evidence sources (dated links) →
*Confidence & why* → Verify / Dismiss → if verified, signal re-weights the account
score automatically.

### Flow C — "Book the meeting" (Arjun)
Account 360 → Decision-Makers tab → pick the newly-hired COO →
Conversation starter + Email/Call/Meeting angle → Outreach Centre → send to CRM.

### Flow D — "Tune the engine" (Priya)
Prospect Scoring → Scoring Config → adjust signal weights / decay → Simulator shows
how P1–P3 counts shift → publish new model version (audit-logged).

### Flow E — "Trust but verify the AI" (all)
Command Centre → pick an agent → read its reasoning, memory, retries → open the
Human-Approval queue → approve/edit/reject → feedback trains the scorer.

## 4. End-to-end user journey (day-in-the-life, Rajesh)

```
08:40  Opens Atlas on mobile. Ticker: "3 new Very-High signals overnight."
08:41  Executive Dashboard: Revenue-under-watch ₹—, High-intent this week 12 (▲4).
08:43  Taps the #1 spiking account (Vega Auto). Reads 5-line AI summary + why.
08:45  Sees double-trigger: PLI plant + new COO. Confidence 92%. P1.
08:47  Opens COO profile → conversation starter references his OEM background.
08:49  Hits "Draft executive brief" → approves → routed to his inbox + CRM as a task.
08:52  Marks account "Pursue"; assigns Meera to scope the OpEx + TPM offering.
        Total: 12 minutes from open to an assigned, evidence-backed pursuit.
```

## 5. Dashboard wireframes (low-fidelity, ASCII)

### 5.1 Executive Dashboard (Module 1)
```
┌───────────────────────────────────────────────────────────────────────────┐
│ ◆ LaCleo Atlas · SMMART Transformation Radar        ⌘K  🔔3  ▮ live signals │
├──────────┬────────────────────────────────────────────────────────────────┤
│  RAIL    │  KPI ROW                                                         │
│ ▸ Exec   │  ┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐         │
│  Accounts│  │Rev Opp  ││Under    ││High     ││Signals  ││AI Conf. │         │
│  Signals │  │₹—       ││Watch 340││Intent 12││ 87 /wk  ││ 89%     │         │
│  Scoring │  └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘         │
│  People  │  ┌──────────── Pipeline Forecast (₹, 4 quarters) ───────────┐    │
│  Outreach│  │      ▁▂▃▅▆  weighted by P-tier × probability             │    │
│  Command │  └──────────────────────────────────────────────────────────┘    │
│  ─────── │  ┌── Score radar ──┐ ┌── High-Intent Accounts (this week) ──┐    │
│  Sources │  │Transformation   │ │ Vega Auto   PLI+COO   P1  92% ₹—      │    │
│  Config  │  │Expansion        │ │ Meridian    Capex     P1  85% ₹—      │    │
│  Audit   │  │Leadership …     │ │ Sunrise Ph  IATF drive P2 78% ₹—      │    │
│          │  └─────────────────┘ └──────────────────────────────────────┘    │
│          │  ┌─Industry split─┐ ┌─City split─┐ ┌── Weekly trend ──┐          │
│          │  │ Auto 34% …      │ │ Pune 22% … │ │  signals ▁▃▅▇     │         │
│          │  └────────────────┘ └────────────┘ └──────────────────┘          │
│          │  ┌────────── AI Recommendations (ranked next actions) ───────┐    │
│          │  │ 1 Call Vega Auto COO within 7 days — window closing        │   │
│          │  └───────────────────────────────────────────────────────────┘   │
└──────────┴────────────────────────────────────────────────────────────────┘
```

### 5.2 Account Intelligence 360 (Module 2)
```
┌ Vega Auto Components  ·  Pune · Auto Components · ~₹1,900 Cr · 4,200 emp ──────┐
│ [Overview][Signals][People][Financials][Tech][Outreach]      P1 · Buy 88% ▲   │
├───────────────────────────────┬───────────────────────────────────────────────┤
│  AI SUMMARY (5 lines) + why    │  SCORE STACK                                   │
│  "Entered a transformation…"   │  Overall 88  ██████████░                       │
│  Evidence ①②③④  Conf 92% Risk12│  Transform 91 Expansion 95 Leadership 88 …     │
├───────────────────────────────┤  Est. consulting budget  ₹—                    │
│  OVERVIEW  Revenue · Emp ·      │  Probability of buying   88%                   │
│  Plants(3) · Locations · Lead-  │  Recommended offering    OpEx + TPM + Leader   │
│  ership · Expansion history ·   │  Next best action        Brief the new COO     │
│  Acquisitions · Investments ·   ├───────────────────────────────────────────────┤
│  Press · Digital · Tech stack · │  DECISION MAKERS (org chart) → warm intros     │
│  Hiring · Awards · Priorities · │  RELATIONSHIP MAP  ● 2nd-degree via ex-client  │
│  Challenges · Readiness · Matu- │  EVIDENCE SOURCES  8 dated links               │
│  rity                           │                                                │
└───────────────────────────────┴───────────────────────────────────────────────┘
```

### 5.3 Signal Intelligence (Module 3)
```
┌ Live Trigger Feed ──────────────────────────  [Very High][High][Med][Low] ▾ ──┐
│ ● Vega Auto   PLI plant ₹450Cr sanctioned      2d  conf 94  Very High  ⌄       │
│    source: PIB release · impact: greenfield OpEx mandate                        │
│    pitch: "Design the plant lean from day zero" · offering: TPM+Lean · COO      │
│ ● Meridian    Board approves ₹300Cr capex       4d  conf 86  High       ⌄       │
│ ● Sunrise Ph  Posts 4 Six-Sigma Black Belt roles 1d conf 80  High       ⌄       │
│ ● Kalyani     New COO ex-Bosch joins            6d  conf 90  Very High  ⌄       │
└────────────────────────────────────────────────────────────────────────────────┘
Signal Library ▸ 42 consulting-specific signal types, each ranked & explained.
```

### 5.4 Command Centre (Module 7)
```
┌ Agent Fleet ──────────────────────────────────────────────────────────────────┐
│ Supervisor ●running   Research ●   News ●   Hiring ●   Funding ○idle           │
│ Leadership ● Intent ● Website ● LinkedIn ● Google ● Procurement ● Summariser ●  │
│ Evidence-Validator ●  Scoring ●  Relationship ●  Email ●  Human-Approval ⏸gate  │
├───────────────────────── selected: Hiring Agent ───────────────────────────────┤
│ memory: last 50 job-board pulls · reasoning trace · task queue 6 · retries 1    │
│ confidence 0.83 · failures 0 · avg latency 4.2s · next run in 00:12             │
└────────────────────────────────────────────────────────────────────────────────┘
```

## 6. Responsive behaviour
- **≥1280px:** left rail + 2-col content (main + insight sidebar).
- **768–1279px:** rail collapses to icons; sidebar drops under main.
- **<768px:** bottom tab bar (Exec · Accounts · Signals · People · More); cards stack;
  ticker becomes a horizontally-scrollable chip strip. Every KPI and signal remains
  reachable in ≤2 taps.

## 7. Empty / loading / error states (must-have)
- **Cold start:** "Connect a source to begin watching." with source cards.
- **Agent working:** skeleton shimmer + live agent status line ("News Agent reading
  12 sources…"). Never a blank spinner.
- **Low confidence:** amber "needs verification" chip instead of a fake-precise score.
- **No signal:** account shows "Dormant — re-scan in 30 days," not an error.
