# Phase 1 Report: Technical SEO Foundation

Date: 2 October 2026
Branch: launch
Build: ✓ `npm run build` green (33/33 static pages generated)
Lint: ✓ `npm run lint` clean (exit 0)

---

## Deliverables

### New files created

| File | Purpose |
|---|---|
| `src/lib/site.js` | Single source of truth for site facts (SITE constant) |
| `src/lib/routes.js` | Route registry (36 routes) + `buildMetadata` helper |
| `src/lib/schema.js` | JsonLd component + builder functions (site, page, service, breadcrumb, FAQ, founder) |
| `src/app/robots.js` | robots.txt: disallows `/api/`, links to sitemap, blocks all on preview |
| `src/app/sitemap.js` | sitemap.xml built from ROUTES where inSitemap=true (36 URLs) |

### Existing files updated

**Layout and 404**
- `src/app/layout.jsx`: lang `en-GB`, `metadataBase`, Google Consent Mode v2 defaults (deny all until Phase 3 banner), Organisation + WebSite JSON-LD via JsonLd, local favicon reference (removes Supabase CDN URL)
- `src/app/not-found.jsx`: correct H1 ("We cannot find that page"), own metadata with `noindex`, links to /services, /our-work, /packages, /contact

**All 23 existing static page.jsx files**: replaced old hard-coded metadata with `buildMetadata(ROUTES.find(...))`. Every page now has a unique absolute title, description within 120-158 characters, self-canonical, OG and Twitter tags, and correct robots rules.

**Dynamic pages**
- `src/app/case-studies/[slug]/page.jsx`: `generateMetadata` now uses `buildMetadata` for canonical and OG
- `src/app/our-work/[id]/page.jsx`: noindex added (Phase 2 audits which items to keep)
- `src/app/insights/[id]/page.jsx`: noindex added (Phase 2 redirects numeric IDs to /insights)

**next.config.mjs**
- Added `images.formats: ['image/avif', 'image/webp']`
- Added security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options)
- Added preview noindex header (`X-Robots-Tag: noindex, nofollow` when `VERCEL_ENV === 'preview'`)
- Fixed redirect: `/services/video-editing` now goes to `/services/video-animation/video-editing` (was /services/video-animation)
- Fixed redirect: `/blogs/:id` now goes to `/insights` (was /insights/:id which sent to wrong placeholder pages)

**5 broken H1s fixed** (sr-only correct text + aria-hidden on animation spans):
- `ServiceBrandingDesign.jsx`: sr-only "Logo Design and Branding That Makes You Look Established"; also fixed typo "Before Is a Design" → "Before It Is a Design"
- `ServiceVideoAnimation.jsx`: sr-only "Video, Motion Graphics and Animation"
- `ServiceSocialMediaManagement.jsx`: sr-only "Social Media Management That Brings Enquiries"
- `ServiceAIAutomation.jsx`: sr-only "AI Agents and Automation for Your Business"
- `ServiceSEODigitalMarketing.jsx`: sr-only "SEO and Digital Marketing That Brings Enquiries"

---

## Build output: route types

All marketing routes are static (○) or SSG (●). No unexpected dynamic routes.

| Status | Routes | Note |
|---|---|---|
| ○ Static | / and all service, category, utility pages | Correct |
| ● SSG | /case-studies/[slug] (4 pages) | Correct |
| ƒ Dynamic | /insights/[id], /our-work/[id] | Both noindex; Phase 2 cleans up |

---

## Issues and notes

### TODO(Talha) — needed before launch

| Item | File | Phase |
|---|---|---|
| `/favicon.ico` (32px) + `/logo-512.png` (512px PNG) + apple-touch-icon + manifest icons | `public/` | Phase 6 |
| `/images/og-default.jpg` (1200x630) for OG image fallback | `public/images/` | Phase 6 |
| Consent banner (Phase 3) must call `gtag('consent', 'update', {...})` on accept — GA4 currently loads with `analytics_storage: 'denied'` | Phase 3 work | Phase 3 |

### Outstanding from Part 5 audit (carry to Phase 2)

| Issue | Phase |
|---|---|
| Footer links to /about-us (404) and legacy URLs | Phase 2 |
| /services redirects to /services/web-development instead of hub | Phase 2 |
| /shop "coming soon" page (noindex for now) | Phase 2 |
| Header label "Contact US" | Phase 2 |
| All host-level redirects (maxterz.co.uk, maxterzhub.co.uk, etc.) | Phase 2 |
| About-us, shop, insights/:id path redirects | Phase 2 |

### Packages page metadata fix note
`/services/seo-digital-marketing/seo-services` shows 415 B in the build. The screen component (SEOServices.jsx) is small — that is the existing component size, not a problem.

---

## Phase 1 verification checklist

- [x] `npm run build` green (33/33 pages, 29.8s)
- [x] `npm run lint` clean (exit 0)
- [x] robots.js returns correct rules (disallow /api/, sitemap pointer)
- [x] sitemap.js returns 36 static route URLs
- [x] All existing page.jsx files use buildMetadata — no page falls back to root title
- [x] HTML lang is `en-GB`
- [x] metadataBase is `https://maxterz.com`
- [x] Organization + WebSite JSON-LD in root layout
- [x] Security headers in next.config (HSTS, nosniff, referrer, permissions, x-frame)
- [x] preview builds get X-Robots-Tag noindex header
- [x] images.formats includes avif and webp
- [x] Supabase CDN icon removed from layout
- [x] 5 broken H1s fixed with correct sr-only text
- [x] GA4 fires with consent mode defaults denied (full gating in Phase 3)
- [x] /blogs/:id fixed to redirect to /insights (was wrongly going to /insights/:id)
- [x] /services/video-editing fixed to redirect to correct destination

---

## Post-review gap fixes (applied before Phase 2 commit)

The following Phase 1 gaps were identified in Talha's review and fixed before the Phase 2 commit. They are logged in the CHANGELOG under Phase 1 gap fixes and in `phase-2-report.md`.

| Gap | Fix |
|---|---|
| H1s on 5 service category pages used sr-only hidden text | Eyebrow badge promoted to `<h1>` with `primaryKeyword` text; creative headline demoted to `<p>` |
| Page schema not rendered on any page | Added `PageSchema` server component to `schema.js`; renders WebPage + BreadcrumbList + Service JSON-LD on all 22 static page.jsx files |
| Founder Person node missing from site-wide graph | Added to `buildSiteSchema()` with `@id`, name, jobTitle, worksFor, sameAs |
| OG image fallback referenced `/images/og-default.jpg` (non-existent) | Created `src/app/opengraph-image.jsx` (next/og, 1200x630); removed hardcoded images from `buildMetadata` |
| Favicon used Supabase CDN temporary icon | Logo SVGs delivered by Talha: `icon.svg`, `apple-icon.png`, manifest icons, `logo-512.png` all set |
| /insights in sitemap with no posts | `inSitemap: false` in ROUTES; sitemap updated |
| Vercel preview link missing from this report | **TODO:** add the Vercel preview URL here after pushing Phase 2. Run `vercel ls` or check Vercel dashboard. |
