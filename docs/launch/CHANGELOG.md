# Launch Changelog

Newest first. Every entry: date, phase, what changed, files touched. Claude Code writes here after every phase.

---

## 2 Oct 2026 | Phase 1 gaps + Logo | Gap fixes and brand assets (Claude Code, launch branch)

**Phase 1 gap fixes identified in Talha's review:**

- **H1 fix (5 pages):** `ServiceBrandingDesign.jsx`, `ServiceVideoAnimation.jsx`, `ServiceSocialMediaManagement.jsx`, `ServiceAIAutomation.jsx`, `ServiceSEODigitalMarketing.jsx` — eyebrow badge promoted to real `<h1>` with `primaryKeyword` text; creative headline demoted to `<p>`. Same visual output, honest semantic HTML.
- **Page schema:** `src/lib/schema.js` — added `buildBreadcrumbItems()`, `buildPageSchema()`, `PageSchema` server component; added Founder Person node to `buildSiteSchema()`. All 22 static `page.jsx` files now render `<PageSchema path="..." />` (WebPage + BreadcrumbList + optional Service JSON-LD).
- **OG image:** `src/app/opengraph-image.jsx` created (next/og, 1200x630, primary gradient, Maxterz icon + wordmark). `buildMetadata` updated: hardcoded `/images/og-default.jpg` removed; Next.js auto-detects the route image. Per-page image override kept when caller passes `image`.
- **Sitemap:** `/insights` set `inSitemap: false` in ROUTES until first post is published.
- **Phase 1 report:** gap summary table appended; Vercel preview link TODO noted.

**Logo assets (Talha delivered `docs/assets/logo/`):**

- `public/images/maxterz-logo-horizontal.svg` — header logo
- `public/images/maxterz-logo-horizontal-dark.svg` — footer logo (dark sections)
- `public/images/maxterz-icon.svg` — icon copy for public use + OG image
- `src/app/icon.svg` — Next.js browser tab icon (auto-served as `/icon.svg`)
- `src/app/apple-icon.png` — 180x180 white-background Apple touch icon
- `public/logo-512.png` — 512x512 for Organization schema logo
- `public/icons/icon-192.png`, `public/icons/icon-512.png` — PWA manifest icons
- `src/app/layout.jsx`: `icons` updated to reference `icon.svg` and `apple-icon.png`
- `src/components/Navbar.jsx`: Supabase CDN `<img>` replaced with `/images/maxterz-logo-horizontal.svg`, alt "Maxterz"
- `src/components/Footer.jsx`: Supabase CDN `<img>` replaced with `/images/maxterz-logo-horizontal-dark.svg`, alt "Maxterz"; email corrected to info@maxterz.com
- `docs/launch/TODO-talha.md`: logo SVG item ticked off

---

## 2 Oct 2026 | Phase 1 | Technical SEO foundation (Claude Code, launch branch)

Build: ✓ npm run build green (33/33 static pages). Lint: ✓ exit 0.

**New files**
- `src/lib/site.js`: SITE constant — single source of truth for all site facts
- `src/lib/routes.js`: ROUTES array (36 entries) + `buildMetadata` helper — every page title, description, canonical and OG from one place
- `src/lib/schema.js`: JsonLd component + 6 builder functions (site, webPage, service, breadcrumb, FAQ, founder)
- `src/app/robots.js`: allows `/`, disallows `/api/`, blocks all on preview, links to sitemap
- `src/app/sitemap.js`: builds sitemap.xml from ROUTES (36 URLs)

**Updated files**
- `src/app/layout.jsx`: lang `en-GB`, metadataBase `https://maxterz.com`, Organization + WebSite JSON-LD, Google Consent Mode v2 defaults (deny all before Phase 3 banner), Supabase CDN icon removed
- `src/app/not-found.jsx`: own metadata with noindex, H1 "We cannot find that page", links to /services, /our-work, /packages, /contact
- All 23 existing static `page.jsx` files: replaced old metadata with `buildMetadata(ROUTES.find(...))` — unique titles, correct canonicals, OG, Twitter, robots
- `src/app/case-studies/[slug]/page.jsx`: `generateMetadata` uses `buildMetadata`
- `src/app/our-work/[id]/page.jsx`, `src/app/insights/[id]/page.jsx`: noindex added (Phase 2 cleans up)
- `next.config.mjs`: `images.formats: ['image/avif', 'image/webp']`, security headers (HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options), preview noindex header; fixed `/services/video-editing` redirect destination and `/blogs/:id` redirect destination
- 5 broken service H1s fixed (sr-only keyword text + aria-hidden on animation spans): ServiceBrandingDesign, ServiceVideoAnimation, ServiceSocialMediaManagement, ServiceAIAutomation, ServiceSEODigitalMarketing

---

## 2 Oct 2026 | Setup | Indexed URLs and Supabase access (Claude, strategy workspace)
- Supabase: the Maxterz project is connected as the MCP server `supabase-maxterz`. CLAUDE.md now says to use only that server in this repo, never the Doovor project.
- The 9 indexed maxterz.co.uk URLs from Search Console are saved with their final destinations in `docs/website/data/old-indexed-urls.md`.
- Brief v1.4, section 6.3: added /services/branding and /portfolio/:id, one-hop host rules built from the path rule array, and a redirect test in Phase 2.
- Files touched: CLAUDE.md, docs/website/MAXTERZ_BUILD_BRIEF.md, docs/website/data/old-indexed-urls.md, docs/launch/TODO-talha.md, docs/launch/CHANGELOG.md, docs/00-START-HERE.md, docs/04-plan.md

---

## 2 Oct 2026 | Phase 0 | Audit and plan (Claude Code, launch branch)
- Created `launch` branch from main. All sprint work happens here.
- Committed docs/ and CLAUDE.md to main: 20 files, 4,449 insertions. Pulled remote changes to Footer.jsx and OurWorkPage.jsx before pushing.
- Read all 7 docs files + codebase audit: 27 existing routes mapped, 15 new routes identified, all client-side data-fetch patterns catalogued.
- Confirmed Next.js 15.5.26, React 18.3.x, JavaScript, ESLint 9, npm.
- Confirmed all Part 5 issues (C1–C12) still present. Found 14 additional issues (N1–N14): lang en not en-GB, no metadataBase, GA4 without consent, broken redirect for /services/video-editing and /blogs/:id, missing /about-us and /shop redirects, no security headers, no host redirects.
- Supabase: existing pricing table names (packages_one_time, brandingDesignPackages, etc.) do not match the planned schema (price_items, packages, package_items). Full replacement in Phase 4.
- Identified that the Maxterz Supabase project is not accessible via MCP in this session (only Doovor project is). Talha must connect it or use the dashboard for migrations.
- seo-services/page.jsx metadata added earlier this session has wrong title/description vs brief 8.3 and contains an em dash. Claude Code fixes it in Phase 1.
- Output: `docs/launch/phase-0-report.md` (full findings + file-level phase plan), `docs/launch/CHANGELOG.md` (this), `docs/launch/TODO-talha.md` (updated).
- Files touched: docs/launch/phase-0-report.md, docs/launch/CHANGELOG.md, docs/launch/TODO-talha.md

---

## 1 Oct 2026 | Setup | Prices and homepage copy locked (Claude, strategy workspace)
- Price book v3 locked by Talha (D25). Services: logo £195 / £395 / £795, brand identity £995 / £1,995, websites from £1,295 and £1,995, social media management from £395 a month, thumbnails and short edits £50 or 30 for £1,195. Packages: Starter £795, Launch £1,995 (founding £1,495), Scale £4,995. Plans: Design £495 (with video £895), Visibility £795, Partner £1,995. Care Plus £145.
- `docs/website/data/pricing.json` added: 57 price items and 7 packages, values verified.
- Prices live in Supabase with on-demand revalidation, no redeploy needed (D29). Brief 11.1 and 8.6 rewritten.
- New service page: /services/video-animation/video-editing (16 service pages). /services/video-editing now redirects there.
- Homepage hero and 5-vs-1 copy locked word for word (D28, brief 7.2). Price transparency decision recorded (D27).

## 1 Oct 2026 | Setup | Price book v2, portfolio, git workflow (Claude, strategy workspace)
- `05-offers.md` rewritten as price book v2 from UK market research: every service priced (tiers or "from"), 3 one-time packages (Starter £1,495, Launch £3,495, Scale £7,495), 3 monthly plans (Design £595, Visibility £995, Partner £2,495), Care Plus £145. Talha signs off by 3 Oct (D25).
- Launch Kit price updated to £3,495, founding £2,495, Care Plus £145 (D03).
- Research notes with sources: `docs/website/data/pricing-research-2026-10.md`.
- Portfolio added to the business profile (section 3a): 8 client websites, Areeka O Karak system, eSIMfo ads, Doovor. BWLD is the lead case study.
- LinkedIn, the "Max" designer name, AI chatbot proof (BWLD) and video testimonial placeholders added to the brief.
- Git workflow (D26): Claude Code commits docs and CLAUDE.md to main, then all work on the `launch` branch. Kickoff prompt updated.

## 1 Oct 2026 | Setup | Talha's answers added (Claude, strategy workspace)
- Email is now info@maxterz.com everywhere. Resend sends transactional email only (D22).
- Founder: Muhammad Talha Shakir (Talha). Headshot optimised into `docs/assets/founder/`.
- 33 of 39 Fiverr reviews curated into `docs/website/data/fiverr-reviews.json` (seed for the testimonials table in Phase 3).
- ThumbLab stays at thumblab.maxterz.com (D06). Doovor marked live in beta. VAT: not registered.
- Flagship offer decided: Launch Kit, £2,497 + £147/month Care Plan, founding price £1,997 for the first 5 clients (D03). New page /packages/launch-kit added to the brief. AI receptionist becomes an upsell after Maxterz runs its own (D23).
- D12 decided: upgrade only when needed, with a flag that Vercel Pro is needed for commercial use.
- Removed a stale `.git/index.lock` that a status check had left behind.

## 30 Sep 2026 | Setup | Docs created (Claude, strategy workspace)
- Created the shared docs folder: business profile, decisions, plan, offers, optimised brief.
- Audited maxterz.vercel.app (31 URLs, server HTML). Findings in `website/01-site-audit.md`.
- Wrote the build brief, CLAUDE.md template and phase prompts for Claude Code.
- Decision D01 updated: production domain is maxterz.com, maxterz.co.uk redirects to it.
- Repo found in the Maxterz folder (Next.js 15.5, JavaScript, src/ layout). Brief adapted: JS files, src/ paths, existing seo-services, our-work/[id] and insights/[id] routes, Formspree replacement.
- CLAUDE.md placed at the repo root. docs/ now sits inside the repo.
- Docs reviewed for consistency; fixes applied (redirect loop risks, QA on local builds, pricing display, claims).
- Next: Talha commits, creates the launch branch and runs the Phase 0 kickoff prompt.
