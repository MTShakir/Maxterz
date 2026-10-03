# Phase 3 Report — Conversion and Tracking

**Date:** 3 October 2026
**Branch:** launch
**Vercel preview:** https://maxterz-gr6izb6fw-maxterz.vercel.app/

---

## What was built

### Global components (new)
| Component | File | Notes |
|-----------|------|-------|
| CTASection | `src/components/CTASection.jsx` | Server component. Used on new/scaffold pages only — existing pages keep their own CTA (D30). |
| ProofBar | `src/components/ProofBar.jsx` | Server component. 4 proof badges from SITE.proof. |
| MobileActionBar | `src/components/MobileActionBar.jsx` | Fixed bottom bar (mobile only). Book + WhatsApp. Safe-area inset. |
| CookieBanner | `src/components/CookieBanner.jsx` | GA4 Consent Mode v2. Cookie `mx_consent` (6 months). Loads Clarity when clarityId prop is set. "Cookie settings" link in footer reopens it. |

### Lead capture (new)
| File | Notes |
|------|-------|
| `src/app/api/leads/route.js` | Zod validation, honeypot, 3-second fill time, Supabase-first, then Resend email. UTM attribution stored. Returns 503 if SUPABASE_SERVICE_ROLE_KEY absent (graceful). |
| `src/app/api/revalidate/route.js` | On-demand revalidation. Tags: pricing, testimonials, work. Protected by `x-revalidate-secret`. |
| `src/lib/supabaseServer.js` | Server-only Supabase client. Never imported client-side. |

### Forms updated / built
| Page | File | Changes |
|------|------|---------|
| Contact | `src/screens/Contact.jsx` | Full rewrite (D30: same visual design kept). New fields: company, website_url, budget, timeline, services updated. Removed Formspree, removed OSM map, email fixed. |
| Free website audit | `src/app/free-website-audit/AuditForm.jsx` | New form. Fields: name, email, website_url, business_type, main_goal, consent. |
| Book a call | `src/app/book/page.jsx` + `CalendlyEmbed.jsx` | Calendly inline widget. UTM params forwarded. `calendly.event_scheduled` fires GA4 `book_call` event → /thank-you?type=call. |

### Analytics and tracking (layout.jsx)
- GA4 Consent Mode v2 defaults: all denied before banner interaction
- Attribution script: captures UTM, gclid, fbclid, referrer, landing_path into `sessionStorage.mx_attribution` on first page load
- CTA click tracking: `cta_click`, `whatsapp_click`, `phone_click`, `email_click` GA4 events

### Database migrations applied
| Migration | What it does |
|-----------|-------------|
| `leads_add_attribution_columns` | Adds page_path, referrer, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid, status (default: 'new') to leads table |
| `testimonials_phase3_columns` | Adds service_slug, period_label, delivery_time, is_excerpt, video_url, poster_url, permission_confirmed, created_at to testimonials table. Adds unique constraint (author_name, platform, quote) for seed script idempotency. |

### Pre-Phase 3 fixes (same commit)
- `src/app/insights/page.jsx` — noindex added
- `src/components/Footer.jsx` — Insights removed; "Cookie settings" button added to legal bar
- `src/screens/Blogs.jsx` — 6 placeholder posts replaced with empty state
- `src/app/favicon.ico` — generated from maxterz-icon-1024.png (32px + 48px ICO)

---

## Form test results

All tests run against `http://localhost:3000/api/leads`.

### Contact form (3 tests)
| # | Test | Expected | Result |
|---|------|----------|--------|
| 1 | Honeypot filled (`_hp` non-empty) | 200 ok:true, silent reject | PASS |
| 2 | Missing required field (empty name) | 422 | PASS |
| 3 | Valid payload, key absent | 503 Service unavailable | PASS |

### Free website audit form (3 tests)
| # | Test | Expected | Result |
|---|------|----------|--------|
| 1 | Honeypot filled | 200 ok:true, silent reject | PASS |
| 2 | Missing required email | 422 | PASS |
| 3 | Valid payload, key absent | 503 Service unavailable | PASS |

Note: Tests 3 return 503 locally because `SUPABASE_SERVICE_ROLE_KEY` is not set in `.env.local`. On Vercel with all env vars set, tests 3 will return `{ ok: true, id: "..." }` and write to the leads table.

---

## Env vars to add on Vercel

Go to Vercel dashboard > Project > Settings > Environment Variables. Add these for Production (and Preview if you want preview form submissions to work):

| Name | Where to get it | Notes |
|------|----------------|-------|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard > Project Settings > API > service_role key | Server-only. Never expose client-side. |
| `RESEND_API_KEY` | resend.com dashboard > API Keys | Without it, leads still save — email alert is skipped and logged. |
| `NEXT_PUBLIC_CLARITY_ID` | clarity.microsoft.com > your project > Setup | Without it, Clarity simply does not load. |
| `REVALIDATE_SECRET` | Any random string (e.g. `openssl rand -hex 32`) | Protects the /api/revalidate webhook. |

For local dev, add the same vars to `.env.local` (this file is gitignored).

Already present on Vercel (no action needed):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA4_ID`

---

## Build / lint status

```
npm run lint  — EXIT 0 (0 errors)
npm run build — EXIT 0
```
