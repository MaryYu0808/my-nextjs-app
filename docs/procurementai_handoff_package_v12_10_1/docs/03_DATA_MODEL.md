# Data Model (Phase 1)

## Core object: Company
The prototype uses `assets/data/companies.v1.0.json` as the primary dataset.

### Current fields (prototype)
Many keys retain legacy `tool_*` naming. Treat them as **company** fields in backend.

| Prototype field | Meaning | Suggested backend field |
|---|---|---|
| `tool_id` | unique company id | `company_id` |
| `tool_name` | company display name | `name` |
| `tool_slug` | URL slug | `slug` |
| `vendor_name` | duplicate of company name (legacy) | omit / alias to `name` |
| `website_url` | company website | `website` |
| `logo_url` | logo URL (may be empty) | `logo_url` |
| `short_description` | short description (Phase 1) | `short_description` |
| `one_liner` | legacy one-liner | optional |
| `headquarters` | country name | `headquarters_country` |
| `founded_year` | year | `founded_year` |
| `primary_category` | single workflow category (8) | `primary_workflow_category` |
| `use_cases` | 1–5 use case slugs | `use_cases` |
| `automation_level` | 4-level maturity | `automation_maturity` |
| `key_modules` | list of module chips | `key_modules` |
| `sources` | list of evidence URLs | `sources` |
| `updated_utc` | last verified/updated timestamp | `data_last_verified_at` |
| `tier` | `tier_1` / `tier_2` (internal) | `tier` |
| `tool_count` | number of merged product entries | internal |
| `original_tool_slugs` | original slugs merged into this company | internal |
| `taxonomy_version` | e.g. v12.10 | `taxonomy_version` |

### Required fields (Phase 1)
- `name`
- `website`
- `headquarters_country`
- `founded_year`
- `primary_workflow_category`
- `use_cases` (1–5)
- `automation_maturity`
- `short_description`
- `data_last_verified_at` (display label: “Data last verified”)

### Enumerations
- Workflow categories: `assets/data/categories.v1.0.json` (8 items)
- Use cases: `assets/data/use_cases.v1.0.json` (32 items)
- Automation maturity (4): `Assistive`, `Semi-automated`, `Autonomous`, `Agentic`
- Tier (internal): `tier_1`, `tier_2` (Tier 3 excluded Phase 1)

## Submission objects (backend)
See `docs/05_VERIFICATION_SPEC.md` and `docs/06_BACKEND_API_CONTRACT.md`.
