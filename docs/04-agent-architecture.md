# 04 · Agent Architecture, LangGraph Orchestration, MCP & AI Workflow

Covers requested outputs **#8 Agent Architecture, #9 MCP Architecture, #12 AI Workflow,
#13 LangGraph Orchestration, and Module 7 (AI Command Centre).**

---

## 1. Design goals for the agent fleet
1. **Evidence-first** — no agent asserts a fact without a source object attached.
2. **Bounded autonomy** — agents act freely up to a *human-approval gate* before
   anything external (email, CRM write) happens.
3. **Observable** — every agent streams reasoning, memory reads/writes, retries and
   confidence to the Command Centre.
4. **Idempotent & resumable** — the graph checkpoints; a crashed run resumes from the
   last good node, not from zero.
5. **Cheap by default** — routing/extraction on a small model (Haiku), synthesis and
   judgement on a large model (Sonnet/Opus). Model per node, not per app.

## 2. The 17 agents (Module 7)

### 2.1 Collector agents (gather evidence)
| Agent | Job | Primary tools (MCP) |
|---|---|---|
| **Research Agent** | Firmographics, plants, revenue, structure | Sprouts, Clay, company registries, web |
| **News Agent** | Press, expansions, capex, awards, M&A | news APIs, Google, RSS, web |
| **Hiring Agent** | OpEx/Lean/Six-Sigma/plant-head job posts | TheirStack, Apollo job postings, careers pages |
| **Funding Agent** | PE, growth capital, JV, listings | news, exchange filings, funding DBs |
| **Leadership Agent** | CXO / plant-head / new-role changes | LinkedIn, news, company pages |
| **Website Agent** | Site changes, new-plant/product pages, tech | crawler, diff, BuiltWith |
| **LinkedIn Agent** | Exec posts, headcount trend, role changes | LinkedIn, Apollo/Clay |
| **Google Agent** | Long-tail discovery, PIB/gov, tenders | web search |
| **Procurement Agent** | Tenders, PLI lists, gov MOUs, incentives | gov portals, tender feeds |

### 2.2 Reasoning agents (turn evidence into intelligence)
| Agent | Job |
|---|---|
| **News Summariser** | De-dupes and compresses raw items into candidate signals |
| **Evidence Validator** | Confirms a signal is real, dated, primary-sourced; sets sourceTrust; kills hallucinations |
| **Lead-Scoring Agent** | Runs the score stack (doc 03), classifies P1–P3 |
| **Relationship Agent** | Maps alumni / ex-client / 2nd-degree warm paths |
| **Email/Outreach Agent** | Drafts briefs, emails, LinkedIn notes, call scripts grounded in evidence |

### 2.3 Control agents
| Agent | Job |
|---|---|
| **Supervisor Agent** | Plans the run, routes work, resolves conflicts, sets budgets, decides "enough evidence?" |
| **Human-Approval Agent** | Holds external actions & low-confidence outputs for human sign-off; captures feedback labels |

## 3. LangGraph orchestration (Module 7 engine)

### 3.1 Topology (supervisor + specialist workers, checkpointed)

```
                         ┌───────────────┐
        account_id  ──▶  │  SUPERVISOR   │  plans DAG, sets budget/confidence targets
                         └──────┬────────┘
                                │ fan-out (parallel)
     ┌───────────┬────────┬─────┴─────┬────────┬───────────┬───────────┐
     ▼           ▼        ▼           ▼        ▼           ▼           ▼
 Research     News     Hiring     Funding  Leadership  Website  LinkedIn/Google/Procurement
     └───────────┴────────┴─────┬─────┴────────┴───────────┴───────────┘
                                ▼  raw evidence → shared state
                        ┌───────────────┐
                        │ News Summariser│  → candidate signals
                        └──────┬─────────┘
                               ▼
                     ┌───────────────────┐    fail → route back to relevant collector
                     │ Evidence Validator │───────────────────────────┐
                     └──────┬─────────────┘   (retry w/ new source)    │
                            ▼ verified signals                          │
                     ┌───────────────┐                                  │
                     │ Lead-Scoring  │  score stack + P-tier            │
                     └──────┬────────┘                                  │
              ┌────────────┴────────────┐                              │
              ▼                         ▼                              │
      ┌──────────────┐        ┌──────────────────┐                     │
      │ Relationship │        │  Outreach/Email  │                     │
      └──────┬───────┘        └────────┬─────────┘                     │
             └──────────┬──────────────┘                               │
                        ▼                                              │
              ┌───────────────────┐                                    │
              │  SUPERVISOR (join) │  "enough & confident?" ──no───────┘
              └──────┬────────────┘        (loop, ≤ N iterations / budget)
                     │ yes
                     ▼
            ┌───────────────────┐
            │  HUMAN-APPROVAL    │  ⏸ gate — approve / edit / reject
            └──────┬────────────┘
                   ▼
            persist Account Brief · update scores · emit events · feedback→trainer
```

### 3.2 Shared graph state (typed)
```python
class AtlasState(TypedDict):
    account_id: str
    account: AccountProfile
    raw_evidence: list[Evidence]          # append-only, each with source+date+trust
    candidate_signals: list[Signal]
    verified_signals: list[Signal]
    scores: ScoreStack | None
    p_tier: Literal["P1","P2","P3","Dormant","Future"] | None
    relationships: list[WarmPath]
    drafts: dict[str, Draft]              # email / linkedin / brief / call
    budget: Budget                        # token & tool-call ceilings
    iterations: int
    confidence: float
    needs_human: bool
    trace: list[AgentStep]                # streamed to Command Centre
```

### 3.3 Control policies
- **Reducers:** `raw_evidence` and `trace` use append reducers; `scores` is last-write.
- **Checkpointer:** Postgres (`langgraph` checkpoint saver) keyed by `account_id +
  run_id` → resumable, and the Command Centre reads live from it.
- **Retry:** Evidence Validator failure routes back to the *specific* collector with a
  "find a better source for signal X" instruction; capped at `maxRetries` per signal.
- **Loop guard:** Supervisor join loops only while `confidence < target` **and**
  `iterations < N` **and** `budget remaining` — otherwise it escalates to Human-Approval
  with a "low-confidence, needs review" flag rather than fabricating.
- **HITL:** `interrupt()` before the Human-Approval node for any external action or any
  P1 classification; the run parks in the checkpointer until a human resolves it.

### 3.4 Two run modes
- **Sweep (scheduled):** nightly cron fans the graph across the whole watchlist in
  batches; only accounts with new evidence get full re-scoring (cost control).
- **Deep-dive (on-demand):** a user hits "Re-scan" on one account → full graph, live
  streamed to the Command Centre.

## 4. MCP architecture (Module — data plane)

Atlas treats every data source as an **MCP server**, so agents get a uniform,
permissioned, auditable tool surface and new sources plug in without touching agent code.

```
                 ┌──────────────────── Atlas Agent Runtime (LangGraph) ─────────────────┐
                 │   agents call tools via a single MCP client with per-tool policy       │
                 └───────────────┬───────────────────────────────────────────────────────┘
                                 │  (schemas discovered at runtime; scoped credentials)
   ┌──────────┬──────────┬───────┴───────┬───────────┬────────────┬──────────────┐
   ▼          ▼          ▼               ▼           ▼            ▼              ▼
 Sprouts    Apollo    TheirStack       Clay      News/Web     Gov/Procure     Internal
 (accounts, (people,  (jobs, tech,    (enrich,   (search,     (PIB, tenders,  Atlas-MCP
  enrich)   sequences) intent)        waterfall) crawl, RSS)  PLI, MOU)       (CRM, scores,
                                                                               evidence store)
```

- **Read servers** (Sprouts, Apollo, TheirStack, Clay, news/web, gov) — evidence in.
- **Write servers** (Apollo sequences, CRM/Gmail, Atlas internal) — gated behind
  Human-Approval; never called before the gate.
- **Atlas-internal MCP server** exposes the platform's own data (accounts, signals,
  scores, briefs) so agents — and external clients like Claude — can query the warehouse
  with the same protocol.
- **Governance:** every MCP call is logged (agent, tool, args hash, cost, latency,
  result trust) to the audit log and surfaced per-agent in the Command Centre.

## 5. The end-to-end AI workflow (narrative)

```
1. TRIGGER   Cron sweep OR user "Re-scan" enqueues account_id.
2. PLAN      Supervisor picks collectors by what's stale; sets budget + confidence target.
3. COLLECT   9 collector agents fan out over MCP; append dated evidence to state.
4. DISTIL    Summariser compresses raw items → candidate signals (tier + why draft).
5. VERIFY    Evidence Validator confirms each signal is real/dated/primary → sets trust,
             kills unverifiable ones; unresolved → back to collector (bounded retry).
6. SCORE     Lead-Scoring runs the stack (doc 03), assigns P-tier, confidence, risk, prob.
7. RELATE    Relationship agent finds warm paths to the target persona.
8. DRAFT     Outreach agent writes brief/email/LinkedIn/call — each citing evidence IDs.
9. JUDGE     Supervisor join: enough & confident? no → loop; yes → continue.
10. APPROVE  Human-Approval gate: human approves/edits/rejects; label captured.
11. PERSIST  Brief saved, scores & signals written, events emitted to dashboards,
             feedback routed to the scorer's recalibration set.
```

Guarantees: **no unsourced claim** survives step 5; **no external action** happens before
step 10; **every step** is visible and replayable in the Command Centre.
