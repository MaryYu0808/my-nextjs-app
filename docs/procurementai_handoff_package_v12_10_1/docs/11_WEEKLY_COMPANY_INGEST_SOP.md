# Weekly Company Ingest SOP (Ops / Data)

This SOP explains how to **add new companies** and **update existing company profiles** in ProcurementAI (Phase 1: structured directory).
It is written for operations / data teammates and is designed to align with the existing **Tiering Rules**, **Inclusion Checklist**, and **Verification Spec**.

---

## 0. What “good” looks like

Every company profile should be:

- **Procurement-relevant (Tier 1 / Tier 2 only)** in Phase 1.
- **Vendor-neutral** (no marketing superlatives, no ranking language).
- **Traceable** (changes supported by public sources).
- **Consistent** with the directory taxonomy:
  - 8 workflow categories (primary_category)
  - 32 use cases (use_cases, max 5)
  - 4 automation maturity levels (automation_maturity)

---

## 1. Weekly cadence (recommended)

1) **Collect candidates** (new companies + update requests)  
2) **Eligibility check** (Tier + Inclusion Checklist)  
3) **De-dup + canonicalize** (company identity)  
4) **Populate / update fields** + add sources  
5) **QA** (links, caps, schema consistency)  
6) **Publish weekly update** (counts: added / updated)  

---

## 2. Inputs (where candidates come from)

- Internal discovery (market scanning, event sponsors, analyst lists)
- Vendor submissions (**Submit a Company**)
- Vendor update requests (**Claim this company profile**)
- Public news (funding, acquisition, product launch) — only if it changes procurement relevance

---

## 3. Step-by-step: adding a NEW company

### Step 3.1 — Eligibility (Phase 1)
Use **docs/04_TIERING_RULES.md** and **docs/10_INCLUSION_CHECKLIST.md**.

**Phase 1 only includes Tier 1 + Tier 2.**  
If it is Tier 3 (“procurement-enabled horizontal”), do not add now.

### Step 3.2 — De-dup (critical)
Before creating a new record, check if it already exists:

- Search by **website domain** (strongest key)
- Search by **company name variants** (e.g., “SAP” vs “SAP Ariba”)
- Search by known product line names (only if they frequently appear as standalone)

**Rule:** one company = one entity.  
If you find duplicates, merge into the more canonical record (prefer the one with the most complete sources).

### Step 3.3 — Create the company record (required fields)
Populate the record in `assets/data/companies.v1.0.json`.

**Required fields (Phase 1):**
- `name`
- `website`
- `headquarters` (country)
- `founded_year` (YYYY)
- `primary_category` (one of 8 workflow categories)
- `use_cases` (1–5 from the standardized list)
- `automation_maturity` (Assistive / Semi-automated / Autonomous / Agentic)
- `short_description` (1–2 sentences, neutral)
- `key_modules` (optional but recommended; keep ≤ 12)
- `sources` (at least 1 public link)
- `data_last_verified` (set to today for new records)
- `tier` (`tier_1` or `tier_2`)

**Short description style guide**
- 1–2 sentences, factual
- Avoid “leading / best / #1 / award-winning”
- Prefer: “X is an AI-enabled procurement company focused on …”

**Sources**
- Prefer product / solution pages that match procurement positioning (not generic homepages)
- Add 1–3 links, public and stable
- If sources are weak or gated, do not “stretch” the claim — keep the profile conservative

### Step 3.4 — Assign Tier
- Use **Tier 1** if procurement is the product category (procurement-native)
- Use **Tier 2** for procurement-first adjacent intelligence (risk/ESG/due diligence/cost intelligence) with procurement clearly a primary use case

### Step 3.5 — Set `data_last_verified`
For new companies, set to the date you reviewed sources and created the entry.

---

## 4. Step-by-step: updating an EXISTING company

### Step 4.1 — Decide if it’s an “update”
Weekly Updates counts “updated” when **profile fields change** (not just formatting).

Count as an update if any of these change:
- primary_category
- use_cases
- automation_maturity
- headquarters / founded_year
- short_description
- key_modules
- sources (meaningful new evidence)
- website (canonicalization)

Do **not** count as an update:
- whitespace / punctuation-only edits
- internal-only fields that are not user-visible (unless you choose otherwise)

### Step 4.2 — Require evidence
All updates should be supported by public sources.

If you change procurement positioning (category/use cases/maturity), add or update the `sources` links to support it.

### Step 4.3 — Fill “what changed” (internal practice)
Even if the prototype UI has “What changed?”, ops should keep a simple internal log.

Recommended log columns:
- date
- company
- change_type (added / updated)
- fields_changed
- sources_added
- reviewer

### Step 4.4 — When to refresh `data_last_verified`
Refresh **only when**:
- changes are supported by public sources, and
- you (or reviewer) completed a verification pass

If you made a quick edit without sufficient evidence, **do not** refresh `data_last_verified`.

---

## 5. Automation maturity rubric (quick reference)

- **Assistive**: AI supports humans (drafting, summarization, suggestions)
- **Semi-automated**: partial automation with approvals / guardrails
- **Autonomous**: executes multi-step actions in defined workflows, limited supervision
- **Agentic**: agent-driven orchestration across tools/systems with goal-seeking behavior (still with controls)

When uncertain, choose the **more conservative** level.

---

## 6. Use cases (selection rules)

- Choose **1–5** use cases per company
- Prefer the **primary** use cases supported by sources (not “nice to have”)
- Default display shows top 3; order them by importance

When uncertain, reduce to fewer use cases (signal over coverage).

---

## 7. Key modules (how to write)

- Use short product/module names (≤ 6 words)
- Avoid repeating the company name unless it is part of the official module name
- Keep ≤ 12 items
- For specialists, 1–3 modules is often enough

---

## 8. Weekly Updates counts (no semantic conflict)

- **Added**: number of new company entries created this week
- **Updated**: number of existing company profiles with meaningful field changes this week

Note: “Updated” ≠ “verified”.  
`data_last_verified` is refreshed only when changes are evidence-backed and reviewed.

---

## 9. Handling vendor requests (Submit / Claim)

Follow **docs/05_VERIFICATION_SPEC.md**.

**Phase 1 flow (recommended):**
1) Work email submission (company domain expected)
2) Email confirmation link
3) Evidence review (sources)
4) Approve → publish changes & refresh `data_last_verified`
5) Reject → request more evidence (store reason)

**Domain mismatch**
If the email domain differs from website domain, route to **manual review** and request additional proof (e.g., official corporate page, domain ownership, or public documentation).

---

## 10. Edge cases

### Rebrands / renamed companies
- Keep a single canonical record
- Update `name`, add sources, keep old name as an internal alias if you maintain one

### Acquisitions / subsidiaries
- Prefer parent vs product-line logic:
  - If the product operates as a standalone procurement company brand, keep it
  - If it is clearly just a module under a suite, merge into the parent company entry

### “Procurement” only appears in blog posts
- Treat as weak evidence
- Do not include unless you meet the Inclusion Checklist with strong product positioning

---

## 11. Final QA before publishing

- All new companies: required fields present, sources added, `tier` assigned, `data_last_verified` set
- All updates: sources updated as needed, `data_last_verified` refreshed only when appropriate
- Open Explore Companies and click a few new/updated profiles to spot-check

