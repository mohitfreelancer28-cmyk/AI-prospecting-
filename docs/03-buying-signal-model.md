# 03 · Buying-Signal Model & AI Prospect Scoring

Covers requested outputs **the Buying-Signal Model, #4 AI Prospect Scoring**, and the
explicit instruction: *"I do NOT want generic Apollo signals. Create unique
consulting-specific buying signals… rank every signal… assign confidence… explain
WHY each signal indicates buying intent."*

---

## Part A — Design of the signal model

### A.1 The mental model: Trigger → Gap → Offering

A signal is only useful if it maps to a **capability gap** SMMART can fill. Every
signal in the library is defined as a 5-tuple:

```
Signal = { trigger event, capability gap it opens, why intent, intent tier,
           base confidence, SMMART offering, target persona, decay half-life }
```

- **Intent tier** — Very High / High / Medium / Low / Very Low (buying-intent strength).
- **Base confidence** — how reliably the *source* proves the event actually happened
  (0–100). Separated from intent on purpose: a rumour of a plant (high intent, low
  confidence) ≠ a PIB press release of a plant (high intent, high confidence).
- **Decay half-life** — triggers expire. A COO hire is hot for ~120 days, then the
  window narrows. Score contribution decays exponentially after the half-life.

### A.2 Why generic signals fail for SMMART
"Visited pricing page", "opened email", "hiring in general" — these predict SaaS
self-serve intent, not a boardroom decision to run a 12-month transformation. SMMART's
buying committee is a COO / plant head / MD reacting to a *capital or capability
commitment*. So the library below is built entirely from **operational commitment
events**, not digital micro-intent.

---

## Part B — The SMMART Buying-Signal Library (42 signals, ranked)

Legend — **Tier:** VH=Very High, H=High, M=Medium, L=Low, VL=Very Low ·
**Conf:** typical base confidence when sourced from a primary release.

### B.1 TIER — VERY HIGH INTENT (the capability gap just opened)

| # | Signal | Conf | Why it indicates buying intent | SMMART offering | Persona |
|---|---|---|---|---|---|
| 1 | **New greenfield plant / factory construction announced** | 90 | A blank-slate operation must be designed for flow, TPM, quality — ramp-up pain is guaranteed and the OpEx budget is fresh and unspent. | Lean plant design, TPM, Quality systems | COO / Plant Head |
| 2 | **New COO / Head of Manufacturing / VP Operations (external hire)** | 88 | New operational leaders launch a *visible* programme in their first 90 days to justify the mandate; they buy external help to move fast. | OpEx programme, Leadership | MD / COO |
| 3 | **New role created: Head of OpEx / CI / Business Transformation / CTO(Transformation)** | 92 | The company literally created a budget line and executive sponsor for exactly what SMMART sells. Strongest single predictor. | Full transformation engagement | CXO |
| 4 | **PLI scheme approval / PLI-linked capacity expansion** | 88 | PLI winners commit to aggressive volume + localisation targets under margin pressure → productivity & quality consulting is near-mandatory. | Productivity, Lean, Cost | COO / Finance |
| 5 | **First major global OEM / export customer won (auto, aero, pharma)** | 84 | The customer imposes IATF 16949 / AS9100 / zero-defect audits the supplier isn't ready for — a hard, dated deadline to reach quality maturity. | Six Sigma, Quality, IATF readiness | Quality / COO |
| 6 | **Private-equity / growth-capital investment into a manufacturer** | 82 | PE mandates EBITDA expansion via operational levers within the hold period; they fund consulting to protect the thesis. | OpEx, Cost, 100-day plan | CEO / CFO |
| 7 | **Double-trigger within 90 days** (any two of the above) | 95 | Concurrent capital + leadership + demand commitments = a company mid-transformation with budget, sponsor and deadline aligned. | Board-level transformation | MD / Board |

### B.2 TIER — HIGH INTENT (committed, programme forming)

| # | Signal | Conf | Why it indicates buying intent | SMMART offering |
|---|---|---|---|---|
| 8 | **Board-approved capex > ₹100 Cr** | 84 | Capacity is coming; scaling operations without OpEx discipline destroys margin — leaders know it. | Lean, Productivity |
| 9 | **Six Sigma / Lean / CI job openings (Green/Black Belt, CI Manager)** | 82 | Building an internal CI team = an active, funded programme that routinely needs external trainers & certification. | Six Sigma training, Kaizen |
| 10 | **ISO / IATF / certification drive announced or renewed** | 78 | Certification forces documented process discipline; consultants accelerate audit-readiness. | Quality systems |
| 11 | **Industry 4.0 / digital manufacturing / MES / SCADA / ERP-SAP rollout** | 76 | Digital tools expose process waste; the transformation is as much operational as technical. | Digital OpEx, process |
| 12 | **Merger / acquisition of a manufacturing business** | 80 | Post-merger integration demands standardisation of operations, quality and leadership culture. | PMI, standardisation, leadership |
| 13 | **New plant head / manufacturing head (multiple, or at a flagship site)** | 79 | Site leadership change is the plant-level analogue of a COO hire; new head buys improvement. | OpEx, TPM |
| 14 | **Capacity-doubling / brownfield expansion announced** | 80 | Same-site scale-up strains existing lines → OEE, bottleneck and TPM work. | TPM, OEE, Lean |
| 15 | **Manufacturing / operational-excellence award applied for or won** | 72 | Signals active investment in the excellence agenda and cultural readiness to engage a consultant. | Awards mentoring, benchmarking |
| 16 | **Aggressive productivity / cost-reduction language in investor call / annual report** | 74 | Management has publicly committed to a number they must now operationally deliver. | Cost, productivity |
| 17 | **Large hiring surge at a single plant (>15% headcount)** | 73 | Rapid scaling creates training, standardisation and leadership-bench gaps. | Training, leadership |

### B.3 TIER — MEDIUM INTENT (interested, window forming)

| # | Signal | Conf | Why | SMMART offering |
|---|---|---|---|---|
| 18 | ESG / sustainability programme launch | 68 | Energy/material efficiency = operational efficiency; entry via green-lean. | Green Lean, efficiency |
| 19 | New L&D / CHRO / capability-building head | 70 | Owns the corporate-training budget SMMART's leadership arm targets. | Leadership dev, training |
| 20 | Government incentive / state MOU signed (non-PLI) | 70 | Committed investment with output obligations. | Productivity |
| 21 | Warehouse / supply-chain modernisation | 66 | Lean logistics, flow and inventory work. | Lean SCM |
| 22 | New product line launch (manufactured) | 64 | New line = new process design & quality ramp. | NPD process, quality |
| 23 | Joint venture / technology tie-up | 67 | Tech transfer needs process & people readiness. | Transformation, training |
| 24 | Multiple quality-engineer / QA openings | 65 | Quality function scaling up. | Quality, Six Sigma |
| 25 | "Great Place to Work" / culture push | 60 | Leadership & engagement programmes. | Leadership, culture |
| 26 | Digital-transformation consultant/CTO hire | 66 | Transformation appetite confirmed. | Change management |
| 27 | Plant relocation / consolidation | 66 | Layout & flow redesign moment. | Lean layout, TPM |
| 28 | New CEO / MD at a manufacturer | 69 | New chief sets a strategy agenda within a year. | Strategy, transformation |

### B.4 TIER — LOW INTENT (watch, weak nexus)

| # | Signal | Conf | Why | Action |
|---|---|---|---|---|
| 29 | General company revenue growth | 55 | Growth *may* precede scaling pain; weak alone. | Watch |
| 30 | Generic "we're hiring" posts | 50 | No operational nexus by itself. | Watch |
| 31 | Website / brand refresh | 48 | Rarely operational. | Watch |
| 32 | Small funding (seed/pre-A, non-mfg) | 52 | Below SMMART's enterprise band. | Watch |
| 33 | Trade-show / expo participation | 54 | Market activity, not a trigger. | Watch |
| 34 | New office (non-plant) opening | 50 | Corporate, not operational. | Watch |
| 35 | Awards unrelated to ops/quality | 46 | Brand, not buying. | Watch |
| 36 | Generic LinkedIn thought-leadership | 45 | Interest signal at best. | Nurture |

### B.5 TIER — VERY LOW INTENT (context only; never a trigger)

| # | Signal | Conf | Why it's not intent |
|---|---|---|---|
| 37 | CSR / donation news | 35 | No operational or budget nexus. |
| 38 | Festival / social posts | 30 | Noise. |
| 39 | Individual employee anniversaries | 30 | Not organisational. |
| 40 | Stock-price movement (no news) | 38 | Market, not operations. |
| 41 | Generic industry-report mentions | 40 | Not company-specific. |
| 42 | Directory / listing presence | 35 | Firmographic, the thing we're rejecting. |

> **Composite rule:** the engine actively hunts for **co-occurring triggers**. Any two
> Tier-VH/H signals on the same account inside a rolling 90-day window promote it to a
> *"Transformation Journey Confirmed"* state (signal #7) — the highest-value state in
> the system.

---

## Part C — AI Prospect Scoring (Module 4)

### C.1 The score stack (0–100 each, evidence-weighted)

| Dimension | What it measures | Fed by signals |
|---|---|---|
| **Growth Score** | Is the company scaling? | revenue, capex, headcount, new products |
| **Transformation Score** | Active change programme? | OpEx/CI roles, digital, certifications |
| **Expansion Score** | New capacity / footprint? | plants, PLI, brownfield, warehouse |
| **Leadership Score** | Buying-committee churn? | COO/plant-head/CXO changes, new roles |
| **Innovation Score** | New products / R&D / Industry 4.0 | NPD, MES, JV, tech tie-ups |
| **Hiring Score** | OpEx-relevant talent demand | Six Sigma/Lean/QA/CI openings |
| **Technology Score** | Digital-manufacturing maturity gap | ERP/SAP/MES/SCADA rollouts |
| **Financial Score** | Ability & pressure to spend | revenue band, PE, margin commentary |
| **Intent Score** | Freshness & strength of triggers | tier × confidence × recency (decay) |
| **Relationship Score** | Warm-path availability | alumni, ex-clients, 2nd-degree links |

### C.2 The formula (transparent, tunable)

```
DimensionScore_d = Σ_signals ( baseConfidence_i
                              × tierWeight(tier_i)
                              × recencyDecay(age_i, halfLife_i)
                              × sourceTrust_i )      → normalised 0–100

OverallBuyingScore = Σ_d ( DimensionScore_d × dimWeight_d )   → 0–100
   where Σ dimWeight_d = 1   (weights editable in Scoring Config, version-controlled)

recencyDecay(age, halfLife) = 0.5 ^ (age_days / halfLife_days)
tierWeight: VH=1.0, H=0.7, M=0.4, L=0.2, VL=0.05
sourceTrust: primary(PIB/exchange/company)=1.0, tier-1 media=0.85,
             secondary media=0.7, social/unverified=0.5
```

Default dimension weights for SMMART (sum = 1.00):
`Intent .22 · Transformation .16 · Expansion .14 · Leadership .14 · Financial .10 ·
Hiring .08 · Technology .06 · Growth .05 · Innovation .03 · Relationship .02`

### C.3 Classification (P-tiers)

| Class | Rule (default) | Meaning | SLA |
|---|---|---|---|
| **P1** | Overall ≥ 80 **and** ≥1 fresh Tier-VH signal (<45d) | Transformation confirmed — pursue now | Partner contact ≤ 7 days |
| **P2** | Overall 65–79, or ≥2 Tier-H signals | Strong, window opening | Nurture + brief ≤ 21 days |
| **P3** | Overall 50–64 | Fit but no live trigger | Quarterly re-scan |
| **Dormant** | Overall < 50, no signal 90d | Watch, low priority | Auto re-scan 90 days |
| **Future Opportunity** | Strong firmographic fit, triggers expected (e.g. PLI applicant pending) | Pre-position | Alert on next trigger |

### C.4 Confidence, Risk & Probability (shown on every account)
- **Confidence %** — mean source-trust × evidence-count sufficiency of the signals
  behind the score. Low evidence → capped confidence, amber flag.
- **Risk %** — headwinds: layoffs, litigation, funding stress, promoter pledge,
  auditor concerns, or *stale* triggers. High risk discounts probability.
- **Probability of buying** = f(OverallScore, freshness, Risk, Relationship). Displayed
  as a calibrated band, never false precision.

### C.5 Explainability & feedback loop
Every score exposes a **"why this score"** breakdown: the exact signals, their tier,
recency and contribution in points. When a human in the Approval queue marks a signal
false/true or an account won/lost, that label feeds a periodic recalibration of
`tierWeight`, `sourceTrust` and `dimWeight` — the model gets sharper for SMMART over
time without becoming a black box.
