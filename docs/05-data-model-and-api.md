# 05 · Database Schema, API Design & Folder Structure

Covers requested outputs **#7 Database Schema, #10 Folder Structure, #11 API Design.**

---

## 1. Data model (PostgreSQL + pgvector)

### 1.1 ER overview
```
organizations ─┬─< org_locations (plants/HQ/warehouse)
               ├─< people (decision makers) ─< person_events
               ├─< signals >─ evidence            (signal_evidence M:N)
               ├─< scores (versioned snapshots)
               ├─< account_briefs
               ├─< relationships (warm paths)  people⇄people / person⇄org
               ├─< outreach_drafts
               └─< watchlist_membership >─ watchlists
agents ─< agent_runs ─< agent_steps ─< tool_calls
scoring_models (versioned weights)   users / roles   audit_log   approvals
```

### 1.2 Core tables (abridged DDL)
```sql
create table organizations (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  cin           text,                       -- Indian corporate identity no.
  industry      text, sub_industry text,
  hq_city       text, hq_state text,
  revenue_cr    numeric,                    -- ₹ crore
  employees     int,
  ownership     text,                       -- listed / private / PE / MNC-sub
  lifecycle     text default 'watch',       -- watch|active|customer|lost
  est_budget_cr numeric,                    -- estimated consulting budget
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table org_locations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  kind text,                                -- plant|hq|rnd|warehouse
  city text, state text, geo point,
  capacity_note text, is_new boolean default false
);

create table people (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  full_name text, title text, seniority text,   -- CXO|VP|head|manager
  role_family text,                         -- COO|plant_head|quality|opex|hr|md ...
  linkedin_url text, email text, phone text,
  tenure_start date, is_new_in_role boolean default false,
  education jsonb, career jsonb, interests jsonb,
  likely_kpis jsonb, pain_points jsonb, comm_style text
);

create table evidence (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  source_type text,                         -- pib|exchange|news|careers|linkedin|tender|company
  source_url text, title text, snippet text,
  published_at date, captured_at timestamptz default now(),
  source_trust numeric,                     -- 0..1
  collected_by text,                        -- agent name
  embedding vector(1536)                    -- for semantic dedupe/retrieval
);

create table signals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  signal_type text,                         -- FK to signal_library.code (doc 03)
  tier text,                                -- very_high|high|medium|low|very_low
  base_confidence numeric,                  -- 0..100
  detected_at date, half_life_days int,
  business_impact text, reason text,        -- WHY (doc 03)
  suggested_pitch text, offering text,      -- SMMART service
  recommended_contact uuid references people(id),
  urgency int,                              -- 0..100
  status text default 'candidate',          -- candidate|verified|dismissed
  verified_by text, verified_at timestamptz
);
create table signal_evidence (
  signal_id uuid references signals(id) on delete cascade,
  evidence_id uuid references evidence(id) on delete cascade,
  primary key (signal_id, evidence_id)
);

create table scores (                       -- versioned snapshot per scoring run
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  model_version text references scoring_models(version),
  growth int, transformation int, expansion int, leadership int,
  innovation int, hiring int, technology int, financial int,
  intent int, relationship int, overall int,
  p_tier text, confidence numeric, risk numeric, probability numeric,
  breakdown jsonb,                          -- per-signal point contributions ("why")
  computed_at timestamptz default now()
);

create table scoring_models (               -- editable, version-controlled weights
  version text primary key,
  dim_weights jsonb, tier_weights jsonb, source_trust jsonb,
  thresholds jsonb, created_by uuid, created_at timestamptz default now(),
  is_active boolean default false
);

create table account_briefs (
  id uuid primary key, org_id uuid references organizations(id),
  summary text, why text, recommended_offering text, next_best_action text,
  generated_by text, model text, created_at timestamptz default now()
);

create table relationships (
  id uuid primary key default gen_random_uuid(),
  from_person uuid, to_person uuid, to_org uuid,
  kind text,                                -- alumni|ex_client|colleague|investor|2nd_degree
  strength numeric, path jsonb
);

create table outreach_drafts (
  id uuid primary key, org_id uuid, person_id uuid,
  channel text,                             -- email|linkedin|call|brief|meeting
  subject text, body text, cites uuid[],    -- evidence ids
  status text default 'draft',              -- draft|approved|sent|rejected
  approved_by uuid, created_at timestamptz default now()
);

-- Agent observability (Command Centre reads these)
create table agent_runs  (id uuid primary key, account_id uuid, run_id text,
  mode text, status text, confidence numeric, started_at timestamptz, ended_at timestamptz);
create table agent_steps (id uuid primary key, run_id text, agent text, phase text,
  reasoning text, input jsonb, output jsonb, confidence numeric,
  retries int, error text, latency_ms int, created_at timestamptz default now());
create table tool_calls  (id uuid primary key, step_id uuid, mcp_server text, tool text,
  args_hash text, cost_tokens int, latency_ms int, trust numeric, ok boolean);

create table approvals (id uuid primary key, entity_type text, entity_id uuid,
  status text, decided_by uuid, feedback jsonb, decided_at timestamptz);
create table audit_log  (id bigserial primary key, actor text, action text,
  entity text, entity_id uuid, meta jsonb, at timestamptz default now());
```

### 1.3 Notable choices
- **Evidence is a first-class, append-only table** — the trust backbone; signals & scores
  reference it, never inline it.
- **Scores are snapshots, not columns on `organizations`** — full history + explainable
  `breakdown` per run; the UI can show trend and "why this changed."
- **Scoring is versioned data** — tuning weights creates a new `scoring_models` row; every
  score records which version produced it (reproducibility + audit).
- **pgvector on evidence** — semantic dedupe (the same plant announcement from 5 outlets
  collapses to one signal) and retrieval for drafting.

## 2. API design (REST + streaming)

Conventions: `/api/v1`, JWT + RBAC, cursor pagination, `?include=` expansion, all list
endpoints support the shared filter grammar (`industry,city,tier,minScore,signal,sort`).

### 2.1 Read
```
GET  /api/v1/dashboard/summary                 → KPIs, forecast, distributions, trends, recs
GET  /api/v1/accounts?tier=P1&city=Pune&sort=-overall
GET  /api/v1/accounts/{id}                      → full 360 (?include=signals,people,scores,brief)
GET  /api/v1/accounts/{id}/scores?history=true
GET  /api/v1/accounts/{id}/brief
GET  /api/v1/signals?tier=very_high&since=7d&status=verified
GET  /api/v1/signals/{id}                        → evidence, why, pitch, offering, contact
GET  /api/v1/people/{id}                          → profile, KPIs, angles, conversation starter
GET  /api/v1/relationships?org={id}               → warm paths
GET  /api/v1/agents                               → fleet status snapshot
GET  /api/v1/agents/{name}                        → memory, config, recent runs
GET  /api/v1/runs/{runId}                          → steps, tool calls, trace
```

### 2.2 Write / actions (mutations)
```
POST /api/v1/accounts/{id}/rescan                 → enqueue deep-dive graph run
POST /api/v1/signals/{id}/verify   {decision}     → verify/dismiss (feeds trainer)
POST /api/v1/accounts/{id}/watch   {watchlistId}
POST /api/v1/outreach              {orgId,personId,channel} → generate drafts (agent)
POST /api/v1/outreach/{id}/approve                 → clears Human-Approval gate → send/CRM
POST /api/v1/scoring/models        {weights...}    → new version; POST …/activate to publish
POST /api/v1/approvals/{id}         {status,feedback}
```

### 2.3 Real-time (Module 1 & 7 are live)
```
WS   /api/v1/stream/signals        → new/updated signals (ticker, dashboard)
WS   /api/v1/stream/agents         → per-agent status, reasoning, retries (Command Centre)
WS   /api/v1/stream/runs/{runId}   → step-by-step trace of one deep-dive
SSE  /api/v1/accounts/{id}/rescan/events  → live progress for on-demand re-scan
```

### 2.4 Webhooks / integrations
```
POST {customer}/webhooks/atlas     → P1 detected, brief ready, approval needed
Outbound MCP write → CRM (create task/opportunity), Gmail/Apollo (queue outreach)
```

## 3. Folder structure (monorepo, output #10)

```
smmart-atlas/
├── apps/
│   ├── web/                      # Next.js 14 (App Router) — the 7 modules
│   │   ├── app/(dashboard)/exec|accounts|signals|scoring|people|outreach|command/
│   │   ├── components/           # component library (doc 06)
│   │   ├── lib/ (api client, ws, formatters, ₹/score utils)
│   │   └── styles/ tokens.css
│   └── api/                      # FastAPI (Python) — REST/WS/SSE gateway
│       ├── routers/ (dashboard, accounts, signals, people, scoring, agents, outreach)
│       ├── schemas/  services/  auth/  ws/
├── packages/
│   ├── agents/                   # LangGraph fleet
│   │   ├── graph.py  state.py  supervisor.py
│   │   ├── collectors/ (research, news, hiring, funding, leadership, website,
│   │   │                linkedin, google, procurement).py
│   │   ├── reasoning/ (summariser, validator, scoring, relationship, outreach).py
│   │   ├── control/ (human_approval.py)  prompts/  checkpoints/
│   ├── mcp/                       # MCP client + Atlas-internal MCP server
│   │   ├── client.py  policy.py  servers/atlas_server.py
│   ├── scoring/                  # signal library + score engine (doc 03)
│   │   ├── signal_library.yaml  engine.py  decay.py  classify.py
│   ├── db/                       # SQLAlchemy models + Alembic migrations
│   └── shared/                   # types, enums, ₹ formatting, evidence schema
├── infra/                        # docker-compose, terraform, cron, queues
├── docs/                         # this design set
└── seeds/                        # illustrative SMMART sample accounts & signals
```

## 4. Tech stack summary
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind + custom dark/glass tokens,
  Recharts/visx for charts, Framer Motion, WebSocket/SSE for live.
- **Backend:** FastAPI, WebSockets, Celery/Arq workers, Redis queue.
- **AI:** LangGraph + Claude (Sonnet for synthesis/judgement, Haiku for extraction/routing),
  MCP for all tools, pgvector for evidence retrieval.
- **Data:** PostgreSQL 16 + pgvector, S3 for raw captures, Postgres LangGraph checkpointer.
- **Infra:** containerised; cron sweep + on-demand queue; full audit logging.
