# Deployment Notes

## Static hosting (prototype)
Any static host works:
- Cloudflare Pages
- Vercel static
- Netlify
- S3 + CloudFront

## Production suggestion
Once backend exists, options:
1) Keep frontend static + call APIs (SPA-style).
2) SSR (Next.js / Remix) for better SEO and per-company routing.
3) Generate static pages from DB (SSG) on schedule.

## Key considerations
- Caching: company list may be cached; submissions/claims should be uncached.
- SEO:
  - unique meta titles per company page
  - sitemap generation from company slugs
- Security: rate limiting + captcha on public forms
