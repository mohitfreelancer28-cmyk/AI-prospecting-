# 01 · Product Vision

**Product:** LaCleo Atlas — Account & Revenue Intelligence
**Deployment:** *SMMART Transformation Radar* (single-tenant, built exclusively for SMMART)
**Prepared by:** LaCleo.ai — Product, Architecture, UX & Engineering

> Note on inputs: this design reverse-engineers SMMART's revenue motion from the
> discovery call and ICP brief. Where the source documents were not machine-readable
> in this environment, the model is reconstructed from the written brief and from
> SMMART's public positioning (management consulting, transformation & corporate
> training for Indian enterprise / manufacturing). All account/signal data in the UI
> is **illustrative sample data** until live sources are connected.

---

## 1. The one sentence

**SMMART does not have a lead problem. It has a *timing* problem.**

SMMART already knows *who* its buyers are — mid-to-large Indian manufacturers and
enterprises that need operational excellence, lean, Six Sigma, TPM, leadership
development and business transformation. What it cannot do at scale is know
**when** a given company crosses the line from "fine as-is" into "we have just
committed to something our current operating system cannot deliver."

Atlas detects that line-crossing moment — continuously, across India — and puts
SMMART in the room **before** the company starts shopping for a consultant.

## 2. Why "find leads" is the wrong frame

Every generic prospecting tool (Apollo, ZoomInfo, Lusha) answers *"who matches a
firmographic filter?"* For a consulting firm that is almost useless, because:

- **The ICP is broad and stable.** Nearly every ₹100 Cr+ Indian manufacturer is a
  *theoretical* fit for lean / OpEx / leadership. A list of 40,000 of them is noise,
  not signal.
- **Consulting is bought on a trigger, not on a filter.** Nobody buys a
  transformation programme because they exist; they buy it because a *specific
  event* just made their operational gap urgent and visible to a budget holder.
- **The buying window is short and invisible.** By the time an RFP for "lean
  consulting partner" appears on a tender portal, three competitors are already
  inside. SMMART needs to arrive 60–120 days earlier.

So Atlas is not a contact database with AI sprinkled on top. It is a
**transformation-trigger detection engine** whose entire job is to convert
public, ambient evidence into a ranked answer to one question:

> *"Which companies in India just entered a transformation journey this week — and
> what should SMMART say to whom, right now?"*

## 3. The core thesis: the Capability Gap

A company becomes a SMMART buyer at the exact moment its **ambition outruns its
operating capability**. That gap is created by observable commitments:

| A company commits to… | …which opens a capability gap SMMART fills |
|---|---|
| A new greenfield plant / PLI-backed capacity | Designing lean operations, TPM, quality systems from zero |
| A first global OEM / export customer | IATF/AS9100 maturity, Six Sigma, zero-defect discipline |
| A new COO / Head of Manufacturing / CTO (transformation) | A leader who *must* launch a visible programme in 90 days |
| A Head of OpEx / CI / Transformation role (newly created) | A budget line literally created for what SMMART sells |
| PE / growth capital into a manufacturer | An investor demanding EBITDA via operational levers |
| A merger / acquisition | Post-merger standardisation, culture & leadership work |
| Rapid headcount / plant-head hiring | Scaling pains, leadership-bench and training demand |

**Atlas scores the gap, not the company.** Two identical firms get opposite
priorities if only one just hired a COO and won an export order.

## 4. Product principles

1. **Evidence or it didn't happen.** Every score, signal and recommendation links
   to a dated, verifiable source. No black-box numbers. Confidence and *why* travel
   with every claim. This is the antidote to "AI made it up."
2. **Timing is the product.** The hero metric is not "accounts found" — it is
   *"high-intent accounts detected this week"* and *"days since trigger."*
3. **Consulting-native, not sales-native.** Signals, scores and pitches are written
   in SMMART's language (TPM, Kaizen, OEE, leadership bench, capability), never
   generic "showed intent."
4. **Agentic, but human-approved.** Agents research, score and draft autonomously;
   a human approves before anything reaches a prospect. Trust is earned in the
   Command Centre where every agent's reasoning is visible.
5. **One account, one narrative.** The unit of value is a decision-ready
   *account brief* a partner can walk into a boardroom with — not a row in a CSV.

## 5. What we are deliberately NOT building

- Not another CRM. Atlas feeds the CRM; it does not replace pipeline hygiene.
- Not a generic email-blast machine. Volume is the enemy of a consulting brand.
- Not a static data vendor. Data decays; *triggers* are time-stamped and expire.

## 6. North-star & guardrail metrics

| Type | Metric | Why |
|---|---|---|
| North star | **Qualified transformation opportunities surfaced / week** (P1+P2 with fresh trigger) | The whole product exists to raise this |
| Value | Trigger-to-first-meeting cycle time | Proves the "arrive earlier" thesis |
| Value | Win-rate of trigger-sourced vs cold accounts | The commercial proof |
| Quality | % signals with human-verified evidence (precision) | Trust; kills hallucination |
| Efficiency | Analyst hours saved per account brief | ROI vs manual research |
| Guardrail | False-positive rate on Very-High-Intent signals | Protects partner credibility |

## 7. The 90-second demo narrative (for investors)

1. Open the **Executive Dashboard** — ₹ revenue opportunity under watch, high-intent
   accounts this week, live buying-signal ticker across India.
2. Click a **spiking account** — *Vega Auto Components just announced a ₹450 Cr
   PLI-backed plant AND hired a COO from an OEM.* Atlas explains why that's a
   Very-High-Intent double-trigger.
3. Open **Signal Intelligence** — see the two triggers with source, date,
   confidence, business impact and a SMMART-specific suggested pitch.
4. Open **Decision-Maker Intelligence** — the new COO's profile, KPIs, likely pain,
   and an AI conversation-starter grounded in his first-90-days mandate.
5. Open the **Outreach Centre** — a partner-grade executive brief + cold email +
   LinkedIn note, each citing the evidence.
6. Open the **AI Command Centre** — watch 17 agents reason, retry and hand off, with
   a human approval gate before anything sends.

That arc — *signal → why → who → what to say → proof it's trustworthy* — is the
product.
