# Phase 0 Audit Report

**Date:** 2 October 2026
**Branch:** launch (created this session)
**Auditor:** Claude Code

---

## 1. Environment confirmed

| Item | Value |
|---|---|
| Next.js | 15.5.26 (App Router) |
| React | 18.3.x |
| Language | JavaScript (no TypeScript, jsconfig.json) |
| Package manager | npm |
| Lint | ESLint 9 (`npm run lint`). No typecheck script |
| Deployment | Vercel, repo MTShakir/Maxterz |
| Production domain | https://maxterz.com (launch 7 Oct 2026) |
| Supabase project | qcsflpsyzvigswlotepz |

---

## 2. Route map

### Existing routes (27 page.jsx files confirmed)

| URL | Screen file | Metadata in page.jsx | Notes |
|---|---|---|---|
| / | screens/Home.jsx | YES (keyword-stuffed, wrong) | Needs rewrite per brief 7.2 |
| /about | screens/AboutUs.jsx | NO | Old template |
| /case-studies | app/case-studies/page.jsx | ? | Check inline |
| /case-studies/[slug] | app/case-studies/[slug]/page.jsx | ? | Check inline |
| /contact | screens/Contact.jsx | NO | Old template |
| /insights | screens/Blogs.jsx | NO | 6 placeholder posts |
| /insights/[id] | screens/BlogDetail.jsx | NO | Numeric IDs, must move to slugs |
| /our-work | screens/OurWorkPage.jsx | NO | Missing metadata |
| /our-work/[id] | screens/ProjectDetail.jsx | NO | Missing metadata |
| /packages | screens/PackagesPage.jsx | YES (weak) | Client-side data, prices invisible to Google |
| /privacy-policy | screens/PrivacyPolicy.jsx | NO | Old template |
| /terms-conditions | screens/TermsConditions.jsx | NO | Old template |
| /shop | screens/Shop.jsx | NO | Coming soon, redirect to /packages needed |
| /services/ai-automation | screens/services/ServiceAIAutomation.jsx | YES | Broken H1 (missing animated words from server HTML) |
| /services/branding-design | screens/services/ServiceBrandingDesign.jsx | YES | H1 typo |
| /services/branding-design/logo-design | screens/services/sub/LogoDesign.jsx | ? | Check |
| /services/branding-design/thumbnail-design | screens/services/sub/ThumbnailDesign.jsx | ? | Check |
| /services/seo-digital-marketing | screens/services/ServiceSEODigitalMarketing.jsx | YES | Broken H1 |
| /services/seo-digital-marketing/seo-services | screens/services/sub/SEOServices.jsx | YES (added this session) | Title and description do not match brief 8.3. Contains em dash |
| /services/social-media-management | screens/services/ServiceSocialMediaManagement.jsx | YES | Broken H1 |
| /services/video-animation | screens/services/ServiceVideoAnimation.jsx | YES | Broken H1 |
| /services/video-animation/explainer-videos | screens/services/sub/ExplainerVideos.jsx | ? | Check |
| /services/video-animation/logo-animation | screens/services/sub/LogoAnimation.jsx | ? | Check |
| /services/web-development | screens/services/ServiceWebDevelopment.jsx | ? | Check |
| /services/web-development/business-website-design | screens/services/sub/BusinessWebsiteDesign.jsx | YES | OK |
| /services/web-development/ecommerce-website-design | screens/services/sub/EcommerceWebsiteDesign.jsx | ? | Check |
| /services/web-development/mobile-app-development | screens/services/sub/MobileAppDevelopment.jsx | ? | Check |

### Routes that must be created (Phase 2 unless noted)

| URL | Action | Brief section |
|---|---|---|
| /services | Create hub page (remove /services redirect first) | 7.3 |
| /services/web-development/app-design | New page | 7.5 |
| /services/branding-design/brand-identity-design | New page | 7.5 |
| /services/branding-design/social-media-design | New page | 7.5 |
| /services/video-animation/motion-graphics | New page | 7.5 |
| /services/video-animation/video-editing | New page | 7.5 |
| /services/ai-automation/ai-receptionist | New page | 7.5 |
| /services/ai-automation/ai-chat-agents | New page | 7.5 |
| /services/seo-digital-marketing/local-seo | New page | 7.5 |
| /packages/launch-kit | New page (Phase 4) | 7.6a |
| /reviews | New page (Phase 5) | 7.9 |
| /book | New page (Phase 3) | 7.10 |
| /free-website-audit | New page (Phase 3) | 7.11 |
| /thank-you | New page (Phase 3) | 7.13 |
| /cookie-policy | New page (Phase 5) | 7.15 |

---

## 3. Part 5 audit confirmation

Confirmed or corrected against the brief's audit table:

| # | Issue | Status |
|---|---|---|
| C1 | No robots.txt (404) | CONFIRMED. No src/app/robots.js file exists |
| C2 | No sitemap.xml (404) | CONFIRMED. No src/app/sitemap.js file exists |
| C3 | No canonical tags | CONFIRMED. No metadataBase in root layout |
| C4 | maxterz.vercel.app indexable | CONFIRMED. No preview noindex header in next.config |
| C5 | No Organization/WebSite schema | CONFIRMED. Root layout has no JSON-LD |
| C6 | Broken H1s (animated words not in server HTML) | CONFIRMED on Video, Social, AI, SEO pages |
| C7 | H1 typo on branding page | CONFIRMED |
| C8 | Broken footer links (/about-us, legacy paths) | CONFIRMED (in next.config: /about-us redirect MISSING) |
| C9 | /services redirects, no hub page | CONFIRMED. Still in next.config.mjs |
| C10 | Conflicting proof numbers | CONFIRMED. Homepage page.jsx still has old keyword-stuffed title |
| C11 | Reviews not attributed to Fiverr in metadata | CONFIRMED on service pages |
| C12 | Packages page shows no packages in server HTML | CONFIRMED. PackagesPage.jsx is entirely `'use client'` with useEffect |

Additional issues found (not in original audit):

| # | Issue | Where |
|---|---|---|
| N1 | Root layout `lang="en"` not `en-GB` | src/app/layout.jsx:22 |
| N2 | Root layout metadata title keyword-stuffed AND overridden by page.jsx (same wrong value duplicated) | layout.jsx:7, page.jsx:3 |
| N3 | Logo icon pointing to Supabase CDN URL instead of /public | layout.jsx:11 |
| N4 | GA4 loads without consent gate (UK GDPR/PECR) | layout.jsx:28-39 |
| N5 | No metadataBase in root layout — OG/canonical URLs will be relative | layout.jsx |
| N6 | /services/video-editing redirects to /services/video-animation (wrong — should be /services/video-animation/video-editing) | next.config.mjs:24 |
| N7 | /blogs/:id redirects to /insights/:id (wrong — should redirect to /insights to remove numeric posts) | next.config.mjs:32 |
| N8 | /about-us → /about redirect MISSING from next.config | next.config.mjs |
| N9 | /shop → /packages redirect MISSING | next.config.mjs |
| N10 | All host-level redirects missing (maxterz.co.uk, maxterz.vercel.app, etc.) | next.config.mjs |
| N11 | Security headers completely absent | next.config.mjs |
| N12 | images.formats missing (no avif/webp negotiation) | next.config.mjs |
| N13 | Metadata for seo-services page (added this session) has wrong title/description vs brief 8.3 and contains an em dash | src/app/services/seo-digital-marketing/seo-services/page.jsx |
| N14 | /services/branding redirect is incorrect — goes to /services/branding-design but the source is `/services/branding` (not in the brief's redirect list, keep it) | next.config.mjs — low risk |

---

## 4. Client-side data fetching on indexable pages (critical for SEO)

Every piece of data below is invisible to Google because it loads in `useEffect`:

| Data | Tables | Pages affected |
|---|---|---|
| Packages and pricing | packages_one_time, packages_monthly, packages_offers, brandingDesignPackages, VideoAnimationPackages, SocialMediaPackages, LogoAnimationPackages, ExplainerVideoPackages, LogoDesignPackages, ThumbnailDesignPackages | /packages, all 14 existing service pages |
| Case studies | case_studies | 8 service pages |
| Portfolio | portfolio_projects | OurWorkPage + 8 service pages |
| Home components | hero_section_images, trust_stats, packages_preview, testimonials, video_testimonials, why_choose_us | Homepage (6 components) |

Fix: Move all of this to Server Components with `fetch`/Supabase server-side calls and `export const revalidate`. Phase 4 handles pricing. Phase 5 handles trust pages.

---

## 5. Supabase table audit

### Tables currently used by the site (from code grep)

**Content tables (keep and improve):**
- `case_studies` — used by 6 service screens
- `portfolio_projects` — used by OurWorkPage and 8 service screens

**Existing pricing tables (OLD structure — do not extend, replace in Phase 4):**
- `packages_one_time`
- `packages_monthly`
- `packages_offers`
- `brandingDesignPackages` (PascalCase, inconsistent)
- `VideoAnimationPackages` (PascalCase)
- `SocialMediaPackages` (PascalCase)
- `LogoAnimationPackages` (PascalCase)
- `ExplainerVideoPackages` (PascalCase)
- `LogoDesignPackages` (PascalCase)
- `ThumbnailDesignPackages` (PascalCase)

**Home component tables:**
- `trust_stats`, `hero_section_images`, `packages_preview`
- `testimonials`, `video_testimonials`, `why_choose_us`

**Tables to be created in Phase 3 and 4:**
- `leads` (Phase 3, brief 9.2 — migration SQL provided)
- `testimonials` — already exists but needs new schema per brief 7.9 (Phase 3)
- `price_items`, `packages`, `package_items` (Phase 4, brief 11.1)

**Note:** The Maxterz Supabase project (qcsflpsyzvigswlotepz) is NOT accessible through the MCP connection in this session (only the Doovor project is accessible). Table contents cannot be audited via MCP. Use the Supabase dashboard to verify table contents before Phase 4.

---

## 6. Dependencies audit

| Package | Size concern | Used for | Action |
|---|---|---|---|
| framer-motion ^11.15.0 | Large | All animated screens | Must NOT be on LCP path. Lazy-load per brief 8.10 |
| recharts ^3.8.1 | Large | Unknown — check if used | Grep for `recharts` before Phase 4; remove if unused |
| @formspree/react ^2.5.1 | Small | Contact form (Formspree) | Remove in Phase 3 once Server Actions replace it |
| All Radix UI components | Medium-large | shadcn/ui component library | Keep; already tree-shaken by import |
| react-day-picker ^10.0.1 | Medium | Unknown — check if used | Grep before Phase 4; remove if unused |
| react-resizable-panels ^4.11.2 | Small | Unknown | Grep before Phase 4 |
| @next/third-parties | NOT installed | GA4 (brief prefers this) | Add in Phase 3 if switching GA4 loading strategy |

---

## 7. `src/lib/site.js` and `src/lib/routes.js` status

Neither file exists. Both are required by Phase 1:

- `src/lib/site.js` — exports the `SITE` constant from brief Part 3. Phase 1 creates it.
- `src/lib/routes.js` — exports the `ROUTES` array from brief 8.1. Phase 1 creates it.
- `src/lib/schema.js` — JSON-LD builder functions from brief 8.8. Phase 1 creates it.

`src/lib/customSupabaseClient.js` and `src/lib/utils.js` (shadcn) exist.

---

## 8. Phase-by-phase file plan

### Phase 1 (Technical SEO foundation) — files to create or change

| File | Action |
|---|---|
| `src/lib/site.js` | Create — SITE constant from brief Part 3 |
| `src/lib/routes.js` | Create — ROUTES array from brief 8.1 |
| `src/lib/schema.js` | Create — JsonLd component + schema builders |
| `src/app/robots.js` | Create — per brief 8.4 |
| `src/app/sitemap.js` | Create — per brief 8.5 |
| `src/app/layout.jsx` | Fix: lang en-GB, metadataBase, default OG, GA4 consent-gated, site-wide schema, remove icon Supabase URL, no duplicate root metadata |
| `src/app/page.jsx` | Fix: use buildMetadata with brief 8.3 values |
| Every page.jsx that has no metadata | Add metadata using buildMetadata |
| `src/app/services/seo-digital-marketing/seo-services/page.jsx` | Fix: replace title and description with brief 8.3 values (remove em dash) |
| `next.config.mjs` | Add: images.formats, security headers, preview noindex header, host redirects. Fix: /services/video-editing destination, /blogs/:id destination |
| All H1 screens | Fix broken and typo H1s |
| `src/app/not-found.jsx` | Fix: add own metadata + noindex |

### Phase 2 (Navigation, redirects, routes) — files to create or change

| File | Action |
|---|---|
| `next.config.mjs` | Add: /about-us, /shop redirects. Remove /services redirect. Full host-level redirect list |
| `src/components/Layout.jsx` | Replace with SiteHeader + SiteFooter per brief 6.4 and 6.5 |
| `src/components/Navbar.jsx` | Rewrite as mega menu per brief 6.4 |
| `src/app/services/page.jsx` | Create hub page (brief 7.3) |
| 9 new service page.jsx + screens | Create app-design, brand-identity-design, social-media-design, motion-graphics, video-editing, ai-receptionist, ai-chat-agents, local-seo |
| `src/app/shop/page.jsx` + `src/screens/Shop.jsx` | Delete; replace with redirect |

### Phase 3 (Conversion and tracking)

| File | Action |
|---|---|
| `src/components/CTAButton.jsx`, `CTASection.jsx`, `ProofBar.jsx`, `MobileActionBar.jsx` | Create |
| `src/app/book/page.jsx` + screen | Create |
| `src/app/free-website-audit/page.jsx` + screen | Create |
| `src/app/contact/page.jsx` + screen | Rewrite with Server Actions |
| `src/app/thank-you/page.jsx` + screen | Create |
| `src/app/api/revalidate/route.js` | Create — on-demand revalidation endpoint |
| Supabase migration | leads table (SQL in brief 9.2) |
| `scripts/seed-reviews.mjs` | Create — seed testimonials from fiverr-reviews.json |
| Cookie banner + Consent Mode v2 | Create |

### Phase 4 (Money pages)

| File | Action |
|---|---|
| `scripts/seed-pricing.mjs` | Create — seed price_items, packages, package_items from pricing.json |
| Supabase migration | price_items, packages, package_items tables |
| `src/screens/PackagesPage.jsx` | Rewrite as Server Component |
| `src/screens/Home.jsx` | Rewrite per brief 7.2 locked copy |
| `src/screens/services/Service*.jsx` (6 hubs) | Rewrite as category hub template per brief 7.4 |
| All 16 service screens | Rewrite per brief 7.5 (server-side data) |
| `src/app/packages/launch-kit/page.jsx` + screen | Create |

### Phase 5 (Trust pages)

| File | Action |
|---|---|
| `src/screens/AboutUs.jsx` | Rewrite per brief 7.8 (real headshot, Talha story) |
| `src/screens/OurWorkPage.jsx` | Rewrite per brief 7.7 (server-side) |
| Case study template | Create or rewrite |
| `src/screens/Blogs.jsx` → Insights | Rewrite per brief 7.14 |
| `src/screens/BlogDetail.jsx` → /insights/[slug] | Rewrite (slug-based) |
| `/reviews` page + screen | Create per brief 7.9 |
| Legal pages | Rewrite (Privacy, Terms, Cookie policy) |
| Placeholder post cleanup | Delete 6 placeholder posts |

### Phase 6 (QA)

| File | Action |
|---|---|
| `scripts/seo-audit.mjs` | Create per brief 11.2 |
| `tools/generate-llms.js` | Update to read from src/lib/routes.js |
| `docs/launch/launch-checklist.md` | Create from brief Part 12 |

---

## 9. TODO(Talha) items found in this audit

See `DOCS/launch/TODO-talha.md` for the full list. Items found or confirmed in this audit:

- **Supabase MCP access:** the Maxterz Supabase project is not connected to the Claude Code MCP in this session. Phase 4 table migrations will need to be run via the Supabase dashboard or the MCP needs to be connected. Flag this before Phase 3.
- **Old maxterz.com indexed URLs:** the old single-page thumbnail site was on maxterz.com. Pull the Pages report from Google Search Console (old property) and provide any indexed paths so redirect rules can be added.
- **Founder headshot copied to public:** `docs/assets/founder/muhammad-talha-shakir-800.webp` must be copied to `public/images/team/muhammad-talha-shakir-800.webp` before Phase 5.
- `/services/seo-digital-marketing/seo-services/page.jsx` metadata was added this session but does not match brief 8.3 (wrong title, wrong description, has em dash). Claude Code will fix it in Phase 1.

---

## 10. Biggest risks before launch

1. **Prices never visible to Google:** the entire packages page and every service page pricing section is client-rendered in useEffect. If Phase 4 does not convert these to server rendering, the site will fail the "Packages page shows no packages in server HTML" check on launch day.
2. **Supabase table name mismatch:** the existing tables (`packages_one_time`, `brandingDesignPackages`, etc.) are completely different from the planned schema. Phase 4 must create new tables and migrate all screen code. This is the most work-intensive phase.
3. **No site.js/routes.js means Phase 1 is foundational:** every subsequent phase depends on these files existing. Phase 1 cannot be rushed.
4. **GA4 firing without consent:** this is a UK GDPR/PECR breach. The root layout fires GA4 unconditionally. Must be fixed in Phase 3 at the latest, ideally in Phase 1 when the layout is being rewritten.
5. **Supabase MCP not connected to Maxterz project:** migrations and seeding will need the Supabase dashboard or a connected MCP. Confirm before Phase 3.
