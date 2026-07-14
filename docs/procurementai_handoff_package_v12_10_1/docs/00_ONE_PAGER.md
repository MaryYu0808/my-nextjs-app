# One-page Engineering Brief (Phase 1 → Backend)

## What to build next
1) **Read APIs** for companies + enums
2) **Write APIs** for Submit + Claim
3) **Email verification** (tokenized link)
4) **Admin review queue** with approve/reject
5) Update company record on approval and set **data_last_verified_at**

## Forms (frontend)
- `/submit-company.html` creates a new listing request
- `/claim.html` creates an update request for an existing company
Both are **authorized reps only**, **vendor-neutral**, and **evidence-based**.

## Verification policy (short)
- Require company work email
- Email confirmation required
- Domain mismatch is allowed but triggers additional verification
- All changes must be supported by public evidence URLs

## Data model
Current prototype data uses legacy `tool_*` keys. Backend should normalize them; frontend can be adapted later.

## Deployment
Static site can ship immediately; forms can post to backend.
