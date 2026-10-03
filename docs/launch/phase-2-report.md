# Phase 2 Report: Navigation, Redirects, Footer and New Routes

**Date:** 2 October 2026
**Branch:** launch
**Build:** `npm run build` exit 0
**Lint:** `npm run lint` exit 0 ("No ESLint warnings or errors")

---

## What was done

### 2.1 Redirects (next.config.mjs)
Complete rewrite of `next.config.mjs`. New structure:
1. **maxterzhub.co.uk and www.maxterzhub.co.uk** (old WordPress site): 6 specific path rules to final URLs on maxterz.com, then `/:path* → https://maxterz.com/` catch-all.
2. **Proxy hosts** (maxterz.co.uk, www.maxterz.co.uk, www.maxterz.com, maxterz.vercel.app): pathRules array applied per-host as absolute URLs, then `/:path* → https://maxterz.com/:path*` catch-all.
3. **Direct path rules on maxterz.com**: same pathRules array with relative destinations.
4. Removed the old `/services → /services/web-development` redirect (now a real hub page).
5. Added `/shop → /packages`, `/about-us → /about`, `/insights/:id → /insights`.

### 2.2 Routes (routes.js)
- Added `/thank-you` route entry with `inSitemap: false` and `noindex: true`.

### 2.3 Navbar (Navbar.jsx)
- Removed `/shop` and `/insights` nav items.
- Added `/contact` as a nav item.
- Renamed "Packages" display text to "Pricing" (href stays `/packages`).
- Changed CTA button from "Contact US" to "Book a free call" linking to `/book`.
- Updated mega menu: all 6 categories now list subpages as real links (app-design, brand-identity-design, social-media-design, motion-graphics, video-editing, ai-receptionist, ai-chat-agents, local-seo, seo-services).
- Fixed mobile menu logo (was still using Supabase CDN; now `/images/maxterz-logo-horizontal.svg`).
- Removed arrow character from "View all services" link (replaced with HTML entity).

### 2.4 Footer (Footer.jsx)
Full rewrite to 5-column layout per brief 6.5:
1. Brand (logo, description, social icons)
2. Services (6 hub links with correct final URLs)
3. Popular (Free Website Audit, Pricing, Launch Kit, Our Work, Book a free call, Reviews)
4. Company (About, Contact, Insights, Privacy Policy, Terms, Cookie Policy)
5. Talk to Us (email, phone, address, Book / WhatsApp CTAs)

Legal bar: copyright, Privacy, Terms, Cookies links.

Updated description: removed banned copy; replaced with factual "A UK-registered digital agency..."
Updated email: `info@maxterz.com` (was `info@maxterz.co.uk` in old code).
Calendly button replaced with `/book` internal link.
Added `/cookie-policy` to legal bar.

### 2.5 Breadcrumb (Breadcrumb.jsx)
Updated `routeLabels` dictionary: added all 15 new route slugs, removed `shop`, updated ampersands to "and" to match copy rules.

### 2.6 New pages (15 page.jsx files created)
All as server components with `buildMetadata`, `PageSchema`, real H1 from ROUTES, description paragraph and internal links. No lorem ipsum.

| Page | Path |
|---|---|
| Services hub | `/services` |
| App and UI/UX Design | `/services/web-development/app-design` |
| Brand Identity Design | `/services/branding-design/brand-identity-design` |
| Social Media Design | `/services/branding-design/social-media-design` |
| Motion Graphics | `/services/video-animation/motion-graphics` |
| Video Editing | `/services/video-animation/video-editing` |
| AI Receptionist | `/services/ai-automation/ai-receptionist` |
| AI Chat Agents | `/services/ai-automation/ai-chat-agents` |
| Local SEO | `/services/seo-digital-marketing/local-seo` |
| Reviews | `/reviews` |
| Book a Free Call | `/book` |
| Free Website Audit | `/free-website-audit` |
| Thank You | `/thank-you` |
| Cookie Policy | `/cookie-policy` |
| Launch Kit | `/packages/launch-kit` |

### 2.7 Deleted /shop page
`src/app/shop/page.jsx` deleted. The path `/shop` now redirects to `/packages` via the path rules.

---

## Redirect test (next start, 2 October 2026)

Tested with `next start` on port 3001, `Host:` header set to `maxterz.co.uk` for each old URL.

| Old URL | Status | Location | Final page |
|---|---|---|---|
| maxterz.co.uk/ | 308 | https://maxterz.com | 200 |
| maxterz.co.uk/blogs | 308 | https://maxterz.com/insights | 200 |
| maxterz.co.uk/services | 308 | https://maxterz.com/services | 200 |
| maxterz.co.uk/privacy-policy | 308 | https://maxterz.com/privacy-policy | 200 |
| maxterz.co.uk/services/websites | 308 | https://maxterz.com/services/web-development | 200 |
| maxterz.co.uk/portfolio | 308 | https://maxterz.com/our-work | 200 |
| maxterz.co.uk/services/branding | 308 | https://maxterz.com/services/branding-design | 200 |
| maxterz.co.uk/shop | 308 | https://maxterz.com/packages | 200 |
| maxterz.co.uk/contact | 308 | https://maxterz.com/contact | 200 |

All 9 old indexed URLs resolve in one hop to the correct final URL. Final page returns 200 in all cases.

---

## Vercel preview

https://maxterz-gr6izb6fw-maxterz.vercel.app/

---

## Open items for later phases

- Phase 4: full content for all 15 scaffold pages.
- Phase 5: Calendly embed on `/book`; audit request form on `/free-website-audit`.
- Phase 4: Fiverr reviews grid on `/reviews` (seed data in `docs/website/data/fiverr-reviews.json`).
- Launch day: Talha to run Search Console change-of-address and submit sitemap per `docs/website/data/old-indexed-urls.md`.
