# Routing & Page Map (v12.10)

This prototype is a static site. In production, these routes can map to SSR pages or API-driven SPA routes.

## Public pages
- `/index.html` — Home (8 workflow cards link to Explore Companies)
- `/tools.html` — Explore Companies (3-column grid)
- `/company/<company_slug>/index.html` — Company profile page (200 prebuilt pages)
- `/use-case/<use_case_slug>/index.html` — Use case page (32 prebuilt pages)
- `/weekly-updates.html` — Weekly updates feed (static placeholder; can be API-driven later)
- `/about.html`
- `/faq.html`
- `/submit-company.html` — Intake form for new companies (authorized reps only)
- `/claim.html` — Update request form for existing companies (authorized reps only)

## Phase decision (important)
- **Category pages (`/category/...`) are intentionally removed in Phase 1.**
  Home workflow cards route to `/tools.html` for now.

## Assets
- `/assets/css/styles.css`
- `/assets/js/data.js`
- `/assets/data/*.json` and fallback `/assets/data/*.js` for file:// preview
