# Backend API Contract (Draft)

This is a practical API contract to connect the current frontend to backend services.
Endpoints can be implemented in any stack; names are suggestions.

## Public (read) APIs
### List companies
`GET /api/companies`
- Query params: `q`, `primary_category`, `use_case`, `automation_maturity`, `tier` (optional; internal), `page`, `limit`, `sort`
- Returns: `{ items: Company[], total, page, limit }`

### Get company by slug
`GET /api/companies/:slug`
- Returns: `Company`

### Enumerations
- `GET /api/enums/workflow-categories` (8)
- `GET /api/enums/use-cases` (32)
- `GET /api/enums/automation-maturity` (4)

## Submit / Claim (write) APIs
### Submit a new company
`POST /api/submissions/companies`
Body: `SubmitCompanyRequest`
Response: `{ submission_id, status: "email_pending" }`

### Claim/update an existing company
`POST /api/claims`
Body: `ClaimCompanyRequest`
Response: `{ claim_id, status: "email_pending" }`

### Email verification
`POST /api/verification/email`
Body: `{ token }`
Response: `{ ok: true, status: "email_verified" }`

## Admin APIs (protected)
- `GET /api/admin/review-queue?status=under_review`
- `GET /api/admin/submissions/:id`
- `POST /api/admin/submissions/:id/approve`
- `POST /api/admin/submissions/:id/reject`

On approval: update company record + set `data_last_verified_at = now()`.

## Notes
- Consider storing submit/claim payloads as patch/diff rather than full company objects.
- Keep an evidence URL array; require at least 1 for meaningful changes.
- Add rate limiting + abuse controls.
