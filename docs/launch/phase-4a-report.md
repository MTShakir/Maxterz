# Phase 4A Report: Data Layer and the 13 Built Pages

**Date:** 13 October 2026
**Branch:** launch
**Build:** `npm run build` exit 0 (49 pages). The 13 pages are static with a 5-minute refresh (ISR).
**Lint:** `npm run lint` exit 0, no warnings in `next lint`.
**Unit test:** `npm run test:pricing` 7 of 7 pass.
**Vercel preview:** see the end of this report.

---

## 1. What changed, in plain words

- Every price on the 13 built pages now comes from Supabase. Edit a price in the Supabase table and the page shows it within 5 minutes, or instantly once the price webhook is set up at launch. No code change, no redeploy (D29).
- The pages are rendered on the server. Prices, FAQ answers, reviews and links are in the HTML that Google and AI assistants read.
- All placeholder data is gone from the pages: invented projects, invented testimonials, unsourced statistics, "98% satisfaction", "500+ logos", "11,600 projects", "Trustpilot" logos and the old package names (D36).
- One call to action everywhere: **Book a free call**, which goes to /book with the service name, so Calendly and GA4 know which page the visitor came from.
- 33 real Fiverr reviews are live, each labelled "on Fiverr". The lead forms work end to end: saved in Supabase, alert to info@, auto-reply to the visitor.

## 2. Database (all SQL shown in chat and approved by Talha)

| Migration | What it does |
|---|---|
| `hide_placeholder_portfolio_and_testimonials` | `public_read` on `portfolio_projects` and `video_testimonials` set to `false`. Rows kept. Undo: `using (true)` |
| `pricing_tables_and_hero_slides` | `price_items`, `packages`, `package_items`, `hero_slides`, `set_updated_at()` trigger, read-only row level security, public `hero-slides` bucket (WebP and MP4, 2MB) |
| `testimonials_is_published` | `is_published` column; both read policies use it. The first version (with a `drop policy`) was declined at the tool prompt; the approved version only alters policies |

Data: 57 price items, 7 packages and 32 package links seeded from `pricing.json` (`npm run seed:pricing`, safe to rerun, never overwrites Supabase edits unless `--overwrite`). Partner Plan updated to £2,495 (D40). 33 curated reviews published (`npm run seed:reviews`). Supabase security advisor: no findings.

## 3. The 13 pages

| Page | H1 (from routes.js) | Hero price line |
|---|---|---|
| /services/web-development | Web Design and App Development That Wins You Clients | Web projects from £495 |
| .../business-website-design | Business Website Design That Wins Enquiries | Business websites from £1,295 (landing pages listed from £495) |
| .../ecommerce-website-design | Shopify and Ecommerce Website Design | Online stores from £1,495 |
| .../app-and-software-development (moved) | App and Custom Software Development | Apps and software from £2,995 |
| /services/branding-design | Logo Design and Branding That Makes You Look Established | Logo design from £195 |
| .../logo-design | Logo Design Services for Growing Businesses | Logo design from £195 |
| .../thumbnail-design | YouTube Thumbnail Design by ThumbLab | Thumbnails from £50 |
| /services/video-animation | Video, Motion Graphics and Animation | Logo animation from £295 |
| .../logo-animation | Logo Animation Services | Logo animation from £295 |
| .../explainer-videos | Explainer Video Production | Explainer videos from £2,495 |
| /services/social-media-management | Social Media Management That Brings Enquiries | from £395 a month |
| /services/ai-automation | AI Chatbots and Automation for Your Business | AI chat agents from £149 a month, plus a one-off £795 set-up |
| /services/seo-digital-marketing | SEO and Local SEO Services That Bring Enquiries | SEO plans from £595 a month |

On every page: one H1 equal to the route H1 (Phase 1 pattern: badge is the H1, the creative line is a `<p>`), Book a free call to `/book?service={slug}`, "See prices" to `#prices`, prices section from Supabase with "Need something custom? Book a free call", real reviews before the FAQ, FAQ module in `src/content/faq/` (answers in the HTML and in FAQPage schema), "Related services" block before the end CTA, inline JSON-LD removed (PageSchema covers it, with the live "from" price and set-up fees as a separate price component).

Moved and removed (D31): mobile-app-development moved to app-and-software-development (git keeps its history). app-design, ai-receptionist, ai-chat-agents, seo-services and local-seo removed. All 6 old URLs 308 to their final page in one hop, also from maxterz.co.uk and the other old hosts. Removed from routes, sitemap, menu, footer and breadcrumbs.

AI page: the "Custom Software" card is now "AI Receptionist", framed honestly (Maxterz is setting up its own first, D23; no demo, clients or results implied). New prices section: AI chat agent with its set-up fee, everything else quoted after a free call.
SEO page: new prices section with the Local, Growth and Authority plans and an "Also available" list.

## 4. Shared fixes

| Fix | Why |
|---|---|
| Supabase clients use the new publishable and secret keys | D33; forms could not save before |
| `/api/leads`: auto-reply, all attribution fields, escaped alert email, readable errors, fill-time check | Brief 9.3 and 9.4 |
| Calendly embed built in the browser, passes UTMs and the service | The old embed built the URL on the server, so UTMs never reached Calendly |
| `/thank-you` message and next steps by type (contact, audit, call, purchase) | Brief 7.13; purchase is for the Stripe links |
| Accordion rebuilt on `<details>` | Radix left closed FAQ answers out of the HTML |
| End-of-page CTA block takes headline, subtext and service; links to /book, WhatsApp and the free audit | It ignored its props and linked to /contact |
| Footer legal line: company number, registered office, ICO number; no map link to 128 City Road | UK company law, business profile |
| Menu, footer and breadcrumbs use the D31 names | Sitewide anchor text |
| Header: social icons only from 1280px, the CTA never shrinks | "Book a free call" was cut to "a free" at 1024px |
| Floating WhatsApp button from tablet width up | It overlapped the mobile action bar's WhatsApp button |
| Reduced motion respected (CSS rule and framer-motion `MotionConfig`) | Brief UI rules, WCAG |
| Add-ons (copywriting, voiceover) never set a "from" price | "Business websites from £75" would have misled |
| Hero strip component reads `hero_slides` on the server, hidden below 3 slides | D32, inventory section 4 |

## 5. Judgement calls (easy to change)

- Category hero lines anchor on the core service (Logo design from £195, Logo animation from £295), not the cheapest item (£30 social post, £50 short edit). Same reasoning as D39. The schema keeps the true lowest price.
- SEO hero line anchors on the plans (£595 a month), not Google Business Profile management (£145).
- The web pages' "TrustBar" (Google, Trustpilot, Meta, Stripe, Shopify and Fiverr logos) was removed: it implied clients and Trustpilot reviews.
- Unsourced statistics in the "cost" sections became plain pain points in the same cards.

## 6. Fresh review (independent subagent, against the brief, the inventory and D30 to D41)

Result: 5 MUST FIX and 25 SHOULD FIX. All MUST FIX items and most SHOULD FIX items are fixed; the rest are listed in section 7.

**MUST FIX, all fixed**
1. The lead auto-reply repeated free text (website and name) to any address, so the form could send someone else's words from info@maxterz.com. Now it repeats nothing from the form, uses a first name only when it looks like a name, rejects web addresses with spaces, and sends at most one auto-reply per address every 15 minutes (the lead is still saved and the alert still goes to info@).
2. "We built and run the AI chatbot for BWLD" went beyond the business profile. Now: "We built the AI chatbot that is live on the Black and White Leaflets Distribution website."
3. Commented-out blocks with invented results (a "UK Cleaning Brand", "340% engagement lift", "40+ local keywords") deleted from the social media and SEO screens.
4. Arrow characters in the mega menu and on /services replaced with an SVG icon.
5. The web category page had no hero strip, so Talha's images for it would never show. Added.

**SHOULD FIX, fixed**
- Per-review stars removed (stored ratings were rounded; one 4.7 review would have shown 5 stars). The section heading states the real 4.9 on Fiverr.
- The ads-management note no longer repeats prices (updated in Supabase and pricing.json; no price changed).
- Hero lines no longer suggest the wrong product: "Business websites from £1,295" (landing pages stay listed from £495), brand identity card from £995 (the identity systems), not the guidelines-only service.
- The revalidate route now accepts standard Supabase Database Webhook payloads (table name to cache tag), a manual tag, or ?tag=, with a timing-safe secret check. Tested. A REVALIDATE_SECRET is in .env.local.
- "Fixed quote before work starts" removed from the hero price line (wrong for fixed prices; the price sections carry it where it fits).
- Typing headlines: one shared, accessible component. The server HTML has the complete phrase, screen readers hear one phrase, reduced motion shows it still, and it stops after one cycle.
- Hydration mismatch on the 3 web approach sections fixed with the existing useIsMobile hook.
- Hype lines rewritten (explainer "flat-rate" contradiction, "extraordinary output", "cinematic", "while you sleep", the fear-based SEO heading); "&" in step titles replaced with "and".
- Logo style examples labelled "Famous examples:" so famous brands never read as clients.
- Facts from SITE only: thumbnail review count added to SITE.proof; "1.2M views on our logo animation on Instagram".
- AI receptionist wording follows D23 ("We will run one on our own phone line first") and the FAQ covers caller expectations (AI disclosure, recording notice, UK GDPR).
- Page dates in routes.js updated (sitemap and schema dates).
- The web category page got a FAQ (7 questions, FAQPage schema).
- The header and mobile bar pass the page's service to /book; WhatsApp links carry the prefilled message from brief 9.1.
- /thank-you can no longer be crashed by an unusual ?type= value.
- Slides and reviews fail soft (a read error hides the section instead of failing the page); prices stay strict.
- `server-only` guard on pageData, pricing and supabaseServer.
- Calendly loads after the page is interactive (not lazily), and the container is a labelled region.
- Unit tests for priceParts and add-ons (9 of 9 pass).
- Breadcrumb separator is an SVG icon.
- Found outside 4A and fixed: the cookie policy gave the wrong company number (15768014); it now reads 16822859 from SITE.

## 7. Left for later

- **Phase 4B:** home page (it still shows placeholder trust stats and case studies from Supabase, and old claims), /packages (D39; it still has "cancel any time", "dedicated account manager" and a rating without "on Fiverr"), /packages/launch-kit, and the 4 new service pages. Some 4A links point at their #prices sections and /packages#monthly, which 4B creates.
- **Phase 5:** Our Work, case studies and recent work (gated now); the /reviews page (the "Read more client reviews" links go there).
- **Phase 6 (needs Talha's view on the orange style):** contrast. White text on the orange "Most popular" badges, the orange header and thumbnail buttons and the orange CTA block sits at about 2.7 to 3.9 to 1; many 10 to 11px gray-400 labels. The smallest fix is the darker orange #c2410c or the primary blue.
- **Phase 6:** the remaining typing animations have no pause control (they now stop after one cycle); the unused TrustBar component; the Next.js workspace-root warning (set outputFileTracingRoot); page weight (service pages 168 to 176 KB first load).
- **Data model:** add-ons are a list in code (ADD_ON_IDS). A later migration can add an is_addon column so Talha can flag them in Supabase.
- **Strip videos:** the ffmpeg download failed twice on this connection. Still images work.
- **ThumbLab:** thumblab.maxterz.com does not resolve (TODO-talha).
