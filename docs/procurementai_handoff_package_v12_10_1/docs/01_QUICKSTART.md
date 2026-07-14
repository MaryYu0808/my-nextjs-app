# Quickstart for Engineers

## 1) Run locally
```bash
cd frontend/site
python3 -m http.server 8000
```

## 2) Where data lives
All Phase-1 data is currently static JSON files:

- `assets/data/companies.v1.0.json` *(source of truth used by listing + company pages)*
- `assets/data/use_cases.v1.0.json` *(32 use cases)*
- `assets/data/categories.v1.0.json` *(8 workflow categories — category pages are intentionally removed in Phase 1)*
- `assets/data/placements.v1.0.json` *(reserved; currently empty)*
- `assets/data/claims.v1.0.json` *(reserved; currently empty)*

> Note: Field names include legacy `tool_*` keys. See `docs/03_DATA_MODEL.md` for mapping to normalized backend fields.

## 3) Main JS entry
- `assets/js/data.js` contains the dataset loader and shared render helpers.

## 4) What needs backend (Phase 1.5)
- Submit a Company (`submit-company.html`)
- Claim this company profile (`claim.html`)
- Email verification flow
- Admin review queue + approve/reject
- Regenerate/refresh “Data last verified” on approval
