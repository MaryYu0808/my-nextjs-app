# Verification Spec (Submit & Claim) — Phase 1

Goal: keep the directory **vendor-neutral** and **evidence-based** while enabling authorized company reps to request additions/updates.

## High-level user-facing flow (shown on frontend)
1) Submit using a company work email
2) Confirm via email link
3) We review and verify public evidence
4) Profile is published/updated and **Data last verified** is refreshed

If email domain differs from company website domain, additional verification may be required.

## Backend flow (implementation spec)

### States
- `draft` (optional)
- `submitted`
- `email_pending`
- `email_verified`
- `under_review`
- `approved`
- `rejected`
- `needs_more_info` (optional)

### Shared validation rules
- Require checkbox: “authorized representative” and “information accurate”
- Require at least **one** evidence URL for non-trivial changes (recommended always)
- Rate-limit submissions by IP/email
- Basic spam controls (captcha optional; recommended for public internet)

### Domain matching rule
- **Pass** if email domain matches website domain, or is a known corporate domain variant.
- **Review required** if mismatch, but allow submission (queue to `needs_more_info`).

Recommended heuristics:
- Normalize `www.` and common subdomains
- Accept common corporate email domains (e.g., `company.com`, `company.co`, `company.io`) if website is one of them
- Maintain an allowlist per company for subsidiaries/acquired brands

### Submit a Company (`submit-company.html`)
Purpose: request a **new listing** for a company not already in the directory.

Minimum required company fields:
- name, website, HQ country, founded year
- primary workflow category (single)
- use cases (1–5)
- automation maturity (4)
- short description
- sources (>=1 recommended)

Submitter fields:
- name, company work email, job title, LinkedIn URL, role at company

### Claim a Company Profile (`claim.html`)
Purpose: request **updates** to an existing company profile.

Additional required field:
- **What changed?** (short explanation) — required for auditability

Workflow:
- Identify target company (by slug or company_id)
- Capture proposed changes (patch)
- Capture evidence sources and rationale
- Email verification + admin review

### Admin review
Reviewers should see:
- target company + current values
- proposed changes (diff)
- evidence links
- submitter identity + domain match status
- reviewer notes + decision

On approval:
- apply changes
- update `data_last_verified_at`
- optionally store `reviewed_by`, `reviewed_at`, `decision_reason`
