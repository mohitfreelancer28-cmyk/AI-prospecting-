# 07 · Development Roadmap & Future Enhancements

Covers requested outputs **#14 Development Roadmap, #15 Future Enhancements.**

---

## 1. Delivery philosophy
Ship the **trust loop** first (evidence → signal → score → brief → human approval) on a
narrow slice (one industry, one region), prove precision, then widen coverage and
autonomy. Precision before scale — a consulting brand cannot afford false Very-High
signals reaching a partner.

## 2. Phased roadmap

### Phase 0 — Foundations (Weeks 1–3)
- Repo, monorepo scaffold, CI, auth/RBAC, Postgres+pgvector, design tokens.
- Signal library encoded as data (`signal_library.yaml`, doc 03).
- MCP client + Atlas-internal MCP server; connect first read sources (Sprouts, news/web).
- **Exit:** one account can be ingested and stored with evidence.

### Phase 1 — Evidence & Signals MVP (Weeks 4–7)
- Collector agents: Research, News, Hiring, Leadership, Procurement.
- News Summariser + Evidence Validator; signals persisted with source/date/confidence/why.
- Signal Intelligence screen + global ticker (Module 3) live.
- **Exit:** verified, explainable signals for ~200 seed accounts (one industry × 2 cities).

### Phase 2 — Scoring & Executive Dashboard (Weeks 8–11)
- Lead-Scoring engine + score stack + P-tier classification (Module 4).
- Executive Dashboard (Module 1) with KPIs, forecast, distributions, recommendations.
- Scoring Config + Simulator; versioned scoring models.
- **Exit:** P1–P3 board that a partner reviews daily; precision measured against manual QA.

### Phase 3 — Account 360 & Decision-Makers (Weeks 12–15)
- Account Intelligence 360 (Module 2): full profile, readiness, maturity, budget estimate.
- Decision-Maker Intelligence (Module 5): profiles, org charts, KPIs, angles.
- Relationship Agent + warm-path mapping.
- **Exit:** a decision-ready account brief generated end-to-end for any watched account.

### Phase 4 — Outreach & LangGraph orchestration (Weeks 16–19)
- Outreach Centre (Module 6): briefs, emails, LinkedIn, call scripts, ROI calculator.
- Full LangGraph graph with Supervisor + Human-Approval gate; checkpointing & retries.
- CRM/Gmail/Apollo write via MCP behind the approval gate.
- **Exit:** human-approved outreach flowing to CRM; trigger-to-brief cycle time tracked.

### Phase 5 — Command Centre & autonomy (Weeks 20–23)
- AI Command Centre (Module 7): fleet grid, agent inspector, memory, approval queue.
- Nightly sweep across full watchlist; on-demand deep-dive streaming.
- Feedback loop: approvals & win/loss recalibrate weights.
- **Exit:** the fleet runs continuously with visible reasoning and a working HITL loop.

### Phase 6 — Scale & harden (Weeks 24+)
- Widen to all target industries & metros; cost controls (delta-only re-scoring).
- Calibration dashboard (precision/recall of VH signals, score reliability).
- SSO, audit exports, SLAs, alerting, on-call runbooks.
- **Exit:** production SLA; north-star metric trending up quarter-over-quarter.

## 3. Suggested pilot KPIs (first 90 days live)
- ≥ 25 verified P1 accounts surfaced with fresh triggers.
- ≥ 85% precision on Very-High signals (human-verified).
- ≥ 60% analyst-research-hours saved per account brief.
- ≥ 1 trigger-sourced opportunity converted to a scoped engagement.

## 4. Future enhancements

### 4.1 Intelligence depth
- **Predictive triggering** — model the *precursors* of a trigger (e.g. land purchase →
  plant announcement) to alert SMMART even earlier ("Future Opportunity" → "Emerging").
- **Vernacular & regional-press ingestion** — Marathi/Gujarati/Tamil business press and
  regional PIB, where many plant/expansion stories break first in India.
- **Earnings-call & annual-report NLP** — extract productivity/quality/capacity intent
  straight from management commentary.
- **Look-alike expansion** — from SMMART's won engagements, auto-build look-alike watchlists.

### 4.2 Product surface
- **Mobile app + WhatsApp brief** — partners get a P1 alert + one-tap brief on WhatsApp
  (the dominant channel for Indian B2B).
- **"Ask Atlas" copilot** — natural-language questions over the warehouse via the
  Atlas MCP server ("which Pune auto firms hired a COO this quarter?").
- **Battlecards & competitor-displacement** — detect incumbent consultant relationships
  and craft displacement angles.
- **Engagement-outcome loop** — feed delivered-engagement results back so scoring learns
  which triggers actually convert for SMMART.

### 4.3 Platform & trust
- **Calibration & drift monitoring** — continuously measure whether confidence is honest.
- **Multi-tenant** — turn the SMMART deployment into LaCleo Atlas for other consulting/BD
  clients, each with its own signal library and weights.
- **Data lineage & explainability exports** — one-click "how did we know this" dossier for
  any claim, for enterprise trust and compliance.
- **Guardrails** — PII handling, source-ToS compliance, rate-limit-aware collectors, and a
  human-in-the-loop that is mandatory (not optional) for all external actions.

## 5. Key risks & mitigations
| Risk | Mitigation |
|---|---|
| Hallucinated signals damage brand | Evidence Validator + mandatory sources + confidence caps + HITL |
| Source ToS / scraping limits | MCP servers per source with compliant, rate-limited access; prefer licensed feeds |
| Score gaming / staleness | recency decay + versioned models + calibration monitoring |
| Cost blow-up at scale | delta-only re-scoring, small models for extraction, budget ceilings per run |
| Over-automation erodes trust | autonomy is bounded; humans approve everything outbound |
