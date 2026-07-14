# ProcurementAI — Technical Handover Package (v12.10)

This bundle contains the latest **Phase 1** static prototype (v12.10) plus engineering docs to help the team
connect the site to backend services (submissions/claims verification) and production deployment.

## What this product is (Phase 1)
- **ProcurementAI** is a **structured directory of AI-enabled procurement companies**.
- We keep profiles **vendor-neutral** and **evidence-based**.
- Scope: **Tier 1 + Tier 2** only (Tier 3 excluded in Phase 1).

## Package contents
- `frontend/site/` — static site (HTML/CSS/JS + datasets under `assets/data/`)
- `docs/` — implementation notes, routing map, tiering rules, verification spec, API contract
- `schemas/` — JSON Schema drafts for core objects and requests

## Local preview
Use a local HTTP server (recommended) so `fetch()` works:

```bash
cd frontend/site
python3 -m http.server 8000
# open http://localhost:8000
```

File:// will work in many cases due to JS dataset fallback, but HTTP is recommended.

## Key pages
- Home: `/index.html`
- Explore Companies: `/tools.html`
- Company page: `/company/<company_slug>/index.html`
- Use cases: `/use-case/<use_case_slug>/index.html`
- Weekly updates: `/weekly-updates.html`
- Submit a company: `/submit-company.html`
- Claim a company profile: `/claim.html`


## Added in v12.10.1
- Weekly operations SOP: `docs/11_WEEKLY_COMPANY_INGEST_SOP.md`
