# MAXTERZ BUILD BRIEF: Website Finalisation for Conversion and SEO

Version 1.4, 2 October 2026 (prices locked: price book v3; homepage copy locked; prices live in Supabase; indexed URLs mapped)
Owner: Talha, founder of Maxterz
Executor: Claude Code, working in the Maxterz Next.js repository (GitHub MTShakir/Maxterz)

**Where things live.** The repo root is the Maxterz folder on Talha's computer (`C:\Users\haree\Desktop\Data\Max website\Maxterz`). In this brief, `DOCS` means the `docs/` folder at the repo root. This brief is `docs/website/MAXTERZ_BUILD_BRIEF.md`. Standing rules are in `CLAUDE.md` at the repo root. Business facts: `docs/02-business-profile.md`. Decisions: `docs/03-decisions.md`. Offers: `docs/05-offers.md`. Plan: `docs/04-plan.md`. The docs folder is committed with the code, so its history is kept in git.

**Repo facts (checked 30 Sep 2026, confirm in Phase 0):**
- Next.js 15.5 (App Router) with React 18. **JavaScript, not TypeScript** (`jsconfig.json`). Write `.js` and `.jsx` with JSDoc types. Do not convert the project to TypeScript. File names in this brief follow that rule.
- Source lives in `src/`: `src/app`, `src/components`, `src/lib` (Supabase client at `src/lib/customSupabaseClient.js`), `src/case-studies`, `src/screens`, `src/contexts`, `src/hooks`.
- Scripts: `npm run dev`, `npm run build` (runs `tools/generate-llms.js` first), `npm run start`, `npm run lint` (ESLint 9). No typecheck script.
- Existing redirects live in `next.config.mjs`, including `/services` to `/services/web-development`, which must go.
- The contact form uses Formspree (`@formspree/react`). Phase 3 replaces it.
- Existing routes not in the original plan: `/services/seo-digital-marketing/seo-services`, `/our-work/[id]`, `/insights/[id]`.

**What you may write in DOCS** (decision D21):
- Freely: everything in `DOCS/launch/` (phase reports, CHANGELOG, TODO list, launch checklist) and ticking tasks in `DOCS/04-plan.md`.
- Append only, status **Proposed**: new decisions at the end of `DOCS/03-decisions.md`.
- Read only unless Talha asks: `02-business-profile.md`, `05-offers.md`, `01-optimised-brief.md`, and this brief.

---

## PART 1. MISSION

Finalise the Maxterz website (Next.js App Router, Supabase, Vercel) and launch it on **https://maxterz.com** by **Wednesday 7 October 2026**.

The site has three jobs, in this order:
1. **Convert.** Turn visitors into booked strategy calls and qualified enquiries.
2. **Rank.** Be technically flawless for Google and Bing: every indexable page server-rendered, unique metadata, canonical, structured data, sitemap, fast on mobile.
3. **Be understood.** Make Maxterz a clear, consistent entity that search engines and AI assistants can describe correctly.

### Definition of done

The launch is done when all of these are true:

- [ ] Lighthouse mobile on home, one category page, one service page, packages and one case study: Performance at least 90, Accessibility at least 95, Best Practices 100, SEO 100.
- [ ] Lab Core Web Vitals on the same pages: LCP under 2.5s (aim for 2.0s), CLS under 0.05, TBT under 200ms.
- [ ] Zero broken internal links. Zero internal links that hit a redirect.
- [ ] Every indexable page has: exactly one H1, a unique title (30 to 60 characters), a unique meta description (120 to 158 characters), an absolute self-referencing canonical, Open Graph tags, valid JSON-LD, breadcrumbs (except home).
- [ ] sitemap.xml lists every indexable page and nothing else. robots.txt points to it.
- [ ] maxterz.vercel.app and preview deployments are not indexable.
- [ ] Every page has a primary CTA above the fold and a CTA block at the end.
- [ ] Every form saves to Supabase, sends an email alert, fires a GA4 event and lands on /thank-you.
- [ ] Cookie consent works: Accept and Reject equal, analytics waits for consent.
- [ ] No placeholder text, lorem ipsum, fake stats, unattributed reviews, em dashes, en dashes, arrows or emojis in visible copy.
- [ ] `npm run build` and `npm run lint` pass. `scripts/seo-audit.mjs` passes with zero errors.

---

## PART 2. HOW YOU WORK

1. **Phases.** Work through the phases in Part 10 in order. At the end of each phase: run the checks, commit, write a short report to `DOCS/launch/phase-N-report.md`, then stop and wait for "continue".
2. **Read before you write.** Inspect the existing code first. Reuse existing components, the existing Supabase client (check `@/lib/customSupabaseClient` or equivalent), Tailwind config and design tokens. Do not rewrite what already works.
3. **Protect data.** Never drop or truncate Supabase tables or delete rows. Schema changes go in new migration files. Show the SQL in your report before applying it.
4. **Dependencies.** Add a package only when it removes real work. Pre-approved: `zod`, `resend`, `@next/third-parties`, `@next/bundle-analyzer` (dev, if it works with your build setup). Do not upgrade Next.js or React major versions during this sprint.
10. **Match the installed Next.js version** (15.5 today). Phase 0 confirms it. Use the APIs of that version. If the project is ever moved to Next.js 16: `proxy.ts` replaces `middleware.ts` and `next/image` uses `preload` instead of `priority`.
5. **Facts.** Use only the facts in Part 3. If something is missing, insert a visible-in-code marker `TODO(Talha): what is needed` and list it in the phase report. Never invent numbers, clients, testimonials, awards, team members or results.
6. **Copy.** Follow Part 4 exactly.
7. **Keep it green.** `npm run build` and `npm run lint` must pass at every commit.
8. **Log changes** in `DOCS/launch/CHANGELOG.md` (newest first: date, phase, what changed, files touched). Keep every open item for Talha in `DOCS/launch/TODO-talha.md`.
9. **Single sources of truth.** Site facts in `src/lib/site.js`. Every route's SEO data in `src/lib/routes.js`. Pages, nav, footer, breadcrumbs, sitemap and the audit script all read from these. No hard-coded duplicates.

---

## PART 3. FACTS (the only allowed claims)

```js
// src/lib/site.js (create or update)
export const SITE = {
  url: "https://maxterz.com",
  name: "Maxterz",
  legalName: "MAXTERZ LTD",
  companyNumber: "16822859",
  registeredIn: "England and Wales",
  registeredOffice: {
    street: "128 City Road",
    locality: "London",
    postcode: "EC1V 2NX",
    country: "GB",
    countryName: "United Kingdom",
  },
  email: "info@maxterz.com", // D22. Talha sets up the mailbox before launch
  phoneDisplay: "+44 7375 874706",
  phoneE164: "+447375874706",
  whatsappUrl: "https://wa.me/447375874706",
  calendlyUrl: "https://calendly.com/maxterz-info/30min",
  tagline: "One Hub, Endless Digital Solutions",
  description:
    "Maxterz is a UK-registered digital agency for websites, branding, video, SEO and AI agents, trusted by businesses worldwide since 2017.",
  ga4Id: "G-893VQWSMR6",
  proof: {
    fiverrRating: "4.9",
    fiverrReviews: "7,000+",        // exact figure 7,094 on 30 Sep 2026
    fiverrSince: "2017",
    projects: "10,000+",
    logoAnimationReviews: "1,000+",
    instagramFollowers: "6,000+",
    viralViews: "1.2M",            // Maxterz logo animation on Instagram
  },
  founder: {
    fullName: "Muhammad Talha Shakir",   // About page heading and schema name
    preferredName: "Talha",              // everywhere else in copy
    role: "Founder",
    designerName: "Max",                 // clients call him Max; anyone can
    linkedin: "https://www.linkedin.com/in/mtshakir",
    education: "BSc and MSc in Software Engineering",
    photo: "/images/team/muhammad-talha-shakir-800.webp", // source files in docs/assets/founder/
  },
  thumblabUrl: "https://thumblab.maxterz.com",
  vatRegistered: false,
  socialLinks: [ // footer and header icons (no Fiverr, see D07)
    "https://www.instagram.com/maxterzhub/",
    "https://www.facebook.com/maxterzhub",
    "https://www.linkedin.com/company/maxterzhub/",
    "https://x.com/MaxterzHUB",
    "https://www.tiktok.com/@maxterzhub",
    "https://www.behance.net/maxterz",
  ],
  sameAs: [ // schema only
    "https://thumblab.maxterz.com",
    "https://www.fiverr.com/creators1",
    "https://www.instagram.com/maxterzhub/",
    "https://www.facebook.com/maxterzhub",
    "https://www.linkedin.com/company/maxterzhub/",
    "https://x.com/MaxterzHUB",
    "https://www.tiktok.com/@maxterzhub",
    "https://www.behance.net/maxterz",
    "https://find-and-update.company-information.service.gov.uk/company/16822859",
  ],
};
```

### Story facts (for About, founder notes and bios)
- Founder: Muhammad Talha Shakir, known as Talha. His designer name is "Max", and clients often call him Max (confirmed). The About page says so in one line, which also explains why reviews mention Max.
- Talha started freelancing in 2017 in Pakistan with logo animation and design.
- He holds a BSc and an MSc in Software Engineering.
- He built Maxterz in the final year of his BSc, ran it for two years, then moved to the UK for his MSc.
- Maxterz is UK-led: Talha handles every client relationship from the UK. The delivery team works from Pakistan and India.
- 10,000+ projects delivered and 7,000+ reviews at 4.9 stars on Fiverr since 2017.
- Doovor is Maxterz's own software product. It is live and serving beta users (October 2026). Say "live, in beta". Never claim user numbers or results that Talha has not supplied.
- As an agency, Maxterz has delivered 8 client websites, a restaurant ordering and management system, motion graphics ads and an AI chatbot for UK and international clients. The full list with links is in `docs/02-business-profile.md`, section 3a. Use it for /our-work and case studies.
- AI proof: one AI chatbot built and live (Black and White Leaflets Distribution). No AI calling agent built yet.
- Do not name Road2Olympia or Crave. Never publish client budgets.
- Maxterz built a restaurant management system for Areeka O Karak (online ordering, payments, admin dashboard).
- Fiverr certifications: Logo Intro Animator, Logo Designer, Animation BootCamp, After Effects Kickstart.

### Claim rules (UK DMCC Act 2024 and ASA CAP Code)
- Every rating or review count must say "on Fiverr" in the same sentence or badge.
- Use 4.9 everywhere. Remove 4.8.
- Delete these from the site: "500+ Projects Completed", "350+ Happy Clients", "5+ Years Experience", "98% Satisfaction Rate".
- Case study results only if real. Otherwise describe the deliverables.

---

## PART 4. BRAND AND COPY RULES

### Voice
- British English (optimise, colour, enquiry, organisation). Light UK phrasing, used sparingly.
- Clear, direct, active voice. Short sentences. Target Flesch reading ease 80+.
- Calm and confident. Not salesy. No hype.
- No adverbs where avoidable. Banned words: leverage, synergy, cutting-edge, world-class, revolutionise, unlock, elevate, seamless, game-changer, masterpiece, innovative solutions, next-level, supercharge, skyrocket.
- Worldwide framing: "businesses" and "clients". Use "UK-registered" as a trust signal, not in every sentence.
- Brand name "Maxterz" in copy. "MAXTERZ LTD" only in legal text.

### Characters
- **No em dashes or en dashes anywhere in visible copy, metadata or alt text.** Use a full stop, comma, colon or the word "to".
- No arrows, emojis, flag emojis or decorative symbols in copy. Icons are SVG components with aria-hidden.
- Straight quotes in code; typographic quotes are fine in rendered copy only if the font supports them.

### Headlines
- Each H1 contains the page's primary keyword or a close natural variant (Part 8.3).
- The full H1 text must be in the server HTML. Animated or rotating words are decoration only: render the complete sentence as real text, wrap the animation in `aria-hidden` spans, and make sure words are separated by real spaces.
- Benefit first. Plain words. No puns.

### UI rules
- Buttons: `rounded-full`. One primary button style (blue gradient), one secondary (outline).
- Colours: backgrounds #efefef and #ffffff; primary gradient #1044ff to #0020bf; accent gradient #e7811e to #e7581e for highlights only, never for small text on white (fails contrast).
- Hero sections: white background with a muted grey dot or grid pattern.
- Mobile-first. Tap targets at least 44px. Body text at least 16px. Line length 60 to 75 characters on desktop.
- Respect `prefers-reduced-motion`.

---

## PART 5. CURRENT STATE (audit summary, 30 Sep 2026)

Confirm each item in Phase 0 and fix it in the phase shown.

| Issue | Fix in |
|---|---|
| robots.txt and sitemap.xml return 404 | Phase 1 |
| No canonical tags on any page | Phase 1 |
| maxterz.vercel.app is indexable | Phase 1 |
| No Organization, WebSite or WebPage schema. Only 3 pages have Service + BreadcrumbList | Phase 1 and 4 |
| `<html lang="en">` should be `en-GB` | Phase 1 |
| 404 page reuses the homepage title | Phase 1 |
| Broken H1s in server HTML: "Motion Is Not a Medium.It Is Your", "Your Social Media.Built for", "Your Business.Running", "Get Found.Get Clicked." | Phase 1 |
| H1 typo: "Your Brand Is a Feeling Before Is a Design." | Phase 1 |
| Footer links to /about-us (404) and legacy URLs (/services/design, /animations, /websites, /video-editing, /ai-tech, /portfolio, /blogs) | Phase 2 |
| /services redirects instead of being a hub page | Phase 2 |
| /shop is a "coming soon" page | Phase 2 |
| Header label "Contact US" | Phase 2 |
| Booking CTAs leave the site for Calendly. Hero "Book a Free Call" has no link in server HTML | Phase 3 |
| Contact form options outdated, no qualification fields | Phase 3 |
| Packages page shows no packages or prices in server HTML | Phase 4 |
| Homepage title keyword-stuffed (Phase 1); rating shows 4.8 (Phase 4) | Phase 1 and 4 |
| About, Contact, Insights, Privacy, Terms use the old "premium creative studio" template and voice | Phase 5 |
| 6 placeholder blog posts at /blogs/1 to /blogs/6 dated 2025 | Phase 5 |
| Logo is a PNG from Supabase storage | Phase 6 |

---

## PART 6. INFORMATION ARCHITECTURE

### 6.1 URL rules
- Production origin: `https://maxterz.com`. No www. No trailing slash. Lowercase. Hyphens.
- Max depth: `/services/{category}/{service}`.
- Query parameters never create indexable pages. Filters on /our-work are client-side over server-rendered data.

### 6.2 Page map

| URL | Page | Action | Primary keyword | Sitemap |
|---|---|---|---|---|
| / | Home | Rewrite sections | digital agency, web design and branding agency | Yes |
| /services | Services hub | **Create** | digital agency services | Yes |
| /services/web-development | Web and App Development | Improve | web design and development agency | Yes |
| /services/web-development/business-website-design | Business Website Design | Improve | business website design | Yes |
| /services/web-development/ecommerce-website-design | Ecommerce Website Design | Improve | ecommerce website design | Yes |
| /services/web-development/app-design | App Design (UI/UX) | **Create** | app design, UI/UX design services | Yes |
| /services/web-development/mobile-app-development | Mobile App Development | Improve | mobile app development | Yes |
| /services/branding-design | Branding and Design | Improve, fix H1 | logo design and branding agency | Yes |
| /services/branding-design/logo-design | Logo Design | Improve | logo design services | Yes |
| /services/branding-design/brand-identity-design | Brand Identity Design | **Create** | brand identity design | Yes |
| /services/branding-design/social-media-design | Social Media Design | **Create** | social media design services | Yes |
| /services/branding-design/thumbnail-design | Thumbnail Design by ThumbLab | Improve | YouTube thumbnail design | Yes |
| /services/video-animation | Video and Animation | Improve, fix H1 | motion graphics and animation agency | Yes |
| /services/video-animation/logo-animation | Logo Animation | Improve | logo animation services | Yes |
| /services/video-animation/motion-graphics | Motion Graphics | **Create** | motion graphics services | Yes |
| /services/video-animation/explainer-videos | Explainer Videos | Improve | explainer video production | Yes |
| /services/video-animation/video-editing | Video Editing (reels, shorts, talking head, YouTube) | **Create** | video editing services, reels editing | Yes |
| /services/social-media-management | Social Media Management | Improve, fix H1 | social media management agency | Yes |
| /services/ai-automation | AI and Automation | Improve, fix H1 | AI automation agency | Yes |
| /services/ai-automation/ai-receptionist | AI Receptionist | **Create** | AI receptionist | Yes |
| /services/ai-automation/ai-chat-agents | AI Chat Agents | **Create** | AI chatbot for business, WhatsApp AI agent | Yes |
| /services/seo-digital-marketing | SEO and Digital Marketing | Improve, fix H1 | SEO agency | Yes |
| /services/seo-digital-marketing/seo-services | SEO Services | Improve (exists) | SEO services | Yes |
| /services/seo-digital-marketing/local-seo | Local SEO | **Create** | local SEO services | Yes |
| /packages | Packages and Pricing | Rebuild content | website packages and prices | Yes |
| /our-work | Our Work | Improve | agency portfolio | Yes |
| /case-studies/{slug} | Case studies (existing 4 + Doovor + eSIMfo when assets arrive) | Improve template | {client} case study | Yes |
| /packages/launch-kit | Launch Kit (flagship offer page, D03) | **Create** in Phase 4. Copy and prices from 05-offers.md section 2 | website and branding package for small businesses | Yes |
| /our-work/{id} | Existing portfolio item pages | Phase 0 decides: rich pages move to slugs and stay indexed; thin pages get noindex or a 301 to /our-work | | Rich pages only |
| /about | About | Rewrite | about Maxterz | Yes |
| /reviews | Reviews | **Create** | Maxterz reviews | Yes |
| /contact | Contact | Rewrite | contact Maxterz | Yes |
| /book | Book a strategy call | **Create** | book a call | Yes |
| /free-website-audit | Free website audit | **Create** | free website audit | Yes |
| /insights | Insights listing | Rebuild | (brand) | Only when at least 1 post is published |
| /insights/{slug} | Insights post | **Create** template (replaces /insights/[id]) | per post | Published posts only |
| /privacy-policy | Privacy policy | Rewrite | | Yes |
| /terms-conditions | Terms and conditions | Rewrite | | Yes |
| /cookie-policy | Cookie policy | **Create** | | Yes |
| /thank-you | Thank you | **Create**, noindex | | No |
| not-found | 404 | Improve, own metadata | | No |

### 6.3 Redirects (permanent, in `next.config` `redirects()`)

| From | To |
|---|---|
| /portfolio | /our-work |
| /portfolio/:id | /our-work |
| /about-us | /about |
| /blogs | /insights |
| /blogs/:id | /insights (replace the existing rule that sends it to /insights/:id) |
| /services/design | /services/branding-design |
| /services/branding | /services/branding-design (indexed on maxterz.co.uk, keep the existing rule) |
| /services/animations | /services/video-animation |
| /services/websites | /services/web-development |
| /services/video-editing | /services/video-animation/video-editing |
| /services/ai-tech | /services/ai-automation |
| /shop | /packages |
| /insights/:id (numeric placeholder posts) | /insights |

Remove the existing redirect on /services (find it in next.config, middleware or a page) so the new hub can render.

**Host-level redirects (also in `next.config` `redirects()`, listed FIRST, before the path rules above):**

Next.js runs `next.config` redirects before middleware, so host rules live in `next.config` too, using `has: [{ type: "host", value: "..." }]`. Every destination is an absolute URL on `https://maxterz.com`, so no rule can ever loop back to its own host. These rules only match those hosts, so localhost and QA are not affected.

1. maxterzhub.co.uk and www.maxterzhub.co.uk (works once Talha adds the domain to the Vercel project). Specific paths first, then the catch-all:

| Old path on maxterzhub.co.uk | Destination |
|---|---|
| /services/digital-marketing | https://maxterz.com/services/seo-digital-marketing |
| /services/search-engine-optimization-seo | https://maxterz.com/services/seo-digital-marketing |
| /services/programing-and-tech | https://maxterz.com/services/web-development |
| /services/video-editing | https://maxterz.com/services/video-animation/video-editing |
| /services/short-video-ads-2 | https://maxterz.com/services/video-animation/motion-graphics |
| /portfolio | https://maxterz.com/our-work |
| /:path* (everything else, including /) | https://maxterz.com/ |

2. maxterz.co.uk, www.maxterz.co.uk, www.maxterz.com and maxterz.vercel.app: `source: "/:path*"` to `https://maxterz.com/:path*`, permanent. Path-to-path matters: it carries any authority maxterz.co.uk has earned and lets Search Console's Change of Address tool validate.

   One hop, not two: before that catch-all, add a rule for each of these hosts for every path rule in the table above, pointing straight to the final absolute URL (for example maxterz.co.uk/blogs to https://maxterz.com/insights). Generate them in code from the same array as the path rules, so the lists can never drift. Details and the test list: `DOCS/website/data/old-indexed-urls.md`.

3. Indexed URLs (Search Console, 2 Oct 2026): `DOCS/website/data/old-indexed-urls.md` lists the 9 indexed maxterz.co.uk URLs, their final destinations and the test to run. The old maxterz.com was a single page at /, covered by the new homepage.

Old WordPress URLs end in a slash. Next.js first strips the slash, then the host rule fires. Two hops is acceptable for legacy URLs; do not add custom trailing-slash handling.

**Noindex outside production (no middleware needed):**
- In `next.config` `headers()`: when `process.env.VERCEL_ENV === "preview"` at build time, add `X-Robots-Tag: noindex, nofollow` to every path.
- Other auto-generated production URLs (`*.vercel.app` deployment links) keep a canonical to maxterz.com, which is enough.
- Test the host rules in Phase 2 by sending requests with a custom `Host` header to `next start`, including `/` on every host.

### 6.4 Header
- Logo (links to /), then: **Services** (mega menu), **Work** (/our-work), **Pricing** (/packages), **About** (/about), **Contact** (/contact). Button: **Book a free call** (/book).
- Mega menu: 6 columns, one per category. Category name links to the hub. Under it, links to each service page. Footer row inside the menu: "All services" (/services) and "See pricing" (/packages).
- Every menu item is a real `<a href>` rendered on the server. Opening and closing is progressive enhancement. Keyboard accessible (Tab, Enter, Escape), `aria-expanded` on triggers.
- Mobile: full-screen menu with the same links, plus Call, WhatsApp and Book buttons.
- Insights is not in the header until 3 posts are published (then add it).

### 6.5 Footer
- Column 1: logo, one-line description (SITE.description), social icons from `SITE.socialLinks` (Instagram, Facebook, LinkedIn, X, TikTok, Behance). Fiverr is not a social icon (D07).
- Column 2 "Services": the 6 category hubs.
- Column 3 "Popular": Logo animation, Business websites, AI receptionist, Local SEO, Logo design, Free website audit.
- Column 4 "Company": About, Our work, Reviews, Pricing, Contact. Add Insights only once at least 1 post is published.
- Column 5 "Talk to us": email, phone, WhatsApp, Book a free call.
- Legal bar (required by UK company law, keep it exact):
  `MAXTERZ LTD. Registered in England and Wales. Company number 16822859. Registered office: 128 City Road, London, United Kingdom, EC1V 2NX.`
  Links: Privacy policy, Terms and conditions, Cookie policy, Cookie settings (button that reopens the banner).
- All footer links must point to final URLs (no redirects, no 404s).

### 6.6 Breadcrumbs
- Rendered globally from the route registry on every page except home. Visible trail plus BreadcrumbList JSON-LD with absolute URLs. Page components must not add their own breadcrumbs.
- Labels are short: Home, Services, Branding and Design, Logo Design.

### 6.7 Internal linking rules
- Home links to all 6 category hubs and the 5 most important service pages.
- /services links to every hub and every service page.
- Each hub links to all its service pages (cards with a one-line description).
- Each service page links to: its parent hub, up to 2 related services (siblings first, then from a related category), the matching section of /packages, a relevant case study where one exists, /book.
- Each case study links to every service it used.
- Each Insights post links to 1 primary service page with a descriptive anchor and 2 related posts.
- Anchor text describes the target ("logo animation services"), never "click here" or "learn more" alone. Where a design needs "Learn more", add visually hidden context text.
- No orphan pages. The audit script checks it.

---

## PART 7. PAGE SPECIFICATIONS

### 7.1 Global components to build or standardise
- `SiteHeader`, `MegaMenu`, `MobileMenu`, `SiteFooter`, `Breadcrumbs`
- `CTAButton` (primary, secondary), `CTASection` (end-of-page block: headline, one line, Book a free call, WhatsApp, "or get a free website audit")
- `ProofBar`: 4 badges: "4.9 stars from 7,000+ reviews on Fiverr", "10,000+ projects since 2017", "1.2M views on our logo animation", "UK-registered company". SVG icons, no emojis.
- `ReviewCard`, `ReviewGrid` (reads the testimonials table, filter by service)
- `ServiceCard`, `CaseStudyCard`, `PricingCard`, `ProcessSteps`, `FAQ` (accessible accordion using `<details>` or ARIA; content in server HTML)
- `MobileActionBar`: fixed bottom bar on mobile only with "Book a free call" and a WhatsApp icon button. Reserve space so it never covers content or causes layout shift.
- `JsonLd` component (Part 8.8)
- `CookieBanner` (Part 9.5)

### 7.2 Home (/)
Section order:
**Locked copy (approved by Talha, 1 October 2026). Use these words exactly. Layout and styling are free; the words are not.**

1. **Hero.**
   - Eyebrow (a paragraph, not a heading): "Web design, branding and AI agency"
   - H1: "Your Entire Digital Team Under One Roof."
   - Subheading: "Brand, website, SEO, social media, video and AI, built by one team with one point of contact. Look established, get found and win more enquiries."
   - Proof line: "10,000+ projects since 2017. 4.9 stars from 7,000+ reviews on Fiverr."
   - Primary CTA: "Book a free strategy call" (/book). Secondary: "See our work" (/our-work). ProofBar directly below.
2. **Problem and solution (5 vs 1).** Keep the existing visual comparison of 5 people against 1 team.
   - Heading: "Most businesses juggle five people to run their online presence."
   - Body: "A web developer. A designer. A social media manager. An SEO specialist. A video editor. Five invoices, five inboxes, five timelines, and none of them talk to each other."
   - Solution heading: "Maxterz replaces all five."
   - Solution body: "One team builds your brand, website, Google profile and social media, so every part works as one. One point of contact, Talha, handles it from the first call to launch and after. You run your business. We handle the rest."
3. **Services.** 6 category cards, each with up to 4 service links (Social media management links to its hub only). Link to /services.
4. **Flagship offer block: Launch Kit.** Headline: "Look established and get found." Body: brand, website and Google set up in 21 working days, by one team. Show the value total (£3,480, calculated), the price (£1,995) and, while `founding_enabled` is on, the founding price (£1,495 for the first 5 clients). Care Plus £145 a month from launch. CTA: Book a free call. Secondary: See what is included (/packages/launch-kit). Read all numbers from the packages data so the founding price can be switched off in one place.
5. **Selected work.** 4 case study cards: Black and White Leaflets Distribution, MM Window Cleaning, Areeka O Karak, Doovor (live in beta). Link to /our-work.
6. **Logo animation showreel.** Lightweight video facade (poster image, loads on click or when in view). Caption: "Our own logo animation reached 1.2M views on Instagram."
7. **Process.** 4 steps: Free call, Plan and quote (within 1 working day), Build (with clear dates), Launch and grow.
8. **Reviews.** 6 real Fiverr reviews (from the testimonials table), each with name, country, service and "on Fiverr". Link to /reviews.
9. **Packages teaser.** The 3 fixed packages (Starter Kit £795, Launch Kit £1,995 highlighted, Scale Kit £4,995) from the pricing tables, plus one line: "Monthly plans from £495." Link to /packages.
10. **Founder note.** Headshot, 3 short lines from Talha, signature line "Talha, Founder of Maxterz". Link to /about.
11. **FAQ.** 6 questions: website cost, project timeline, who I will work with, ownership of files and code, working with clients outside the UK, what happens on the free call.
12. **CTASection.**

### 7.3 Services hub (/services)
- H1: "Digital Agency Services for Growing Businesses"
- Intro: 2 lines on one team for everything.
- 6 category blocks. Each: name (links to hub), 1 line on who it is for, list of service links, "from" price.
- "Not sure where to start?" block: Book a free call and Free website audit.
- FAQ (4), CTASection.
- Schema: WebPage + ItemList of the 6 hubs (ListItem with position, url and name).

### 7.4 Category hub template (6 pages)
1. Hero: H1 with the category keyword, subheading on outcome and audience, primary and secondary CTA, ProofBar.
2. Service cards: every service page in the category with a 1-line description and link. This is the key internal link block.
3. "We also deliver": capabilities without their own page (for web: custom software, CRM, SaaS, PWAs, API integrations; for video: video editing, reels; for SEO: technical SEO audits, paid ads; for AI: workflow automation).
4. Proof: 3 to 6 portfolio items or case studies tagged with this category.
5. Pricing overview: up to 3 "from" prices that exist for this category, link to the matching /packages anchor (see 7.6).
6. Process with timelines.
7. Reviews: 3 service-relevant reviews.
8. FAQ: 6 to 8 real buyer questions.
9. Related categories: 2 links.
10. CTASection.
- Schema: WebPage, Service (serviceType = category), BreadcrumbList, FAQPage (only if FAQ is visible).
- Length: as long as it takes to answer the buyer's questions. Typically 900 to 1,500 words of useful text.

### 7.5 Service page template (16 pages)
1. Hero: H1 with the service keyword, one-line promise, "from" price, primary CTA (Book a free call), secondary (See examples, anchors to proof), ProofBar.
2. Proof strip: 3 to 6 relevant portfolio items.
3. What this solves: 3 short pain points and the outcome.
4. What you get: concrete deliverables list.
5. Pricing: the tiers or "from" price for this service from the pricing data (price book section 2). Show tiers as cards (mark the "most popular" tier), "from" prices as one clear line with what drives the final quote. Link to the package that includes this service. Never invent tiers.
6. Process and timeline: 4 to 5 steps with days.
7. Case study highlight: 1 relevant case study card if one exists. Otherwise hide the section.
8. Reviews: 3 reviews for this service.
9. Why Maxterz: 4 specific reasons (one team, 10,000+ projects, you own everything, SEO and tracking built in). No generic claims.
10. FAQ: 6 to 8 questions (cost, timeline, what I need to provide, revisions, ownership, support after launch, plus 2 service-specific).
11. Related: parent hub, up to 2 related services, 1 related Insights post when available.
12. CTASection.
- Schema: WebPage, Service (with `offers` as AggregateOffer using the "from" price in GBP), BreadcrumbList, FAQPage when visible.
- Typical length 700 to 1,200 words of useful text.

**Service-specific notes:**
- **Logo animation:** showreel at the top of the proof section, VideoObject schema for each hosted video, "Buy now" button using the Stripe Payment Link in env `NEXT_PUBLIC_STRIPE_LINK_LOGO_ANIMATION` (hide the button if unset).
- **Thumbnail design:** branded "Thumbnail design by ThumbLab". Pricing block: try one for £50 ("Buy now", `NEXT_PUBLIC_STRIPE_LINK_THUMBNAIL`), a pack of 30 for £1,195 used within 60 days (most popular), or a custom monthly plan with a 3-month minimum ("Get a quote"). Link to https://thumblab.maxterz.com. Write unique copy for this page. Do not copy text from the ThumbLab site (D06).
- **Video editing (new page):** reels, Shorts, TikToks and talking-head videos up to 90 seconds, plus long-form YouTube edits. Same pricing block as thumbnails: try one for £50 ("Buy now", `NEXT_PUBLIC_STRIPE_LINK_SHORT_EDIT`), a pack of 30 for £1,195 within 60 days, a custom monthly plan (3-month minimum), and long-form edits from £150. Proof: Maxterz editing work and the Awais Creations website (a video editing agency client).
- **AI receptionist (sold as an upsell, D23):** nothing is built yet, so never imply a demo or past clients. Frame it as "Now taking founding clients". Primary CTA here is "Book a free call". Explain in plain steps (call comes in, AI answers in your business name, books or qualifies, you get a summary). If `NEXT_PUBLIC_AI_DEMO_NUMBER` is set, show a "Call our AI receptionist now" click-to-call block near the top. Cover UK caller expectations: it says it is an AI assistant, calls are recorded only with notice, data handled under UK GDPR.
- **AI chat agents:** WhatsApp, SMS and website chat. Same plain-steps structure. Proof: the AI chatbot Maxterz built for Black and White Leaflets Distribution (link to the case study).
- **Local SEO:** Google Business Profile, local pages, citations, reviews. No ranking guarantees.

### 7.6 Packages (/packages)
- H1: "Packages and Pricing"
- Source: the Supabase pricing tables (11.1), seeded from `docs/website/data/pricing.json` (price book v3, locked). Render everything on the server. Package "value" and "save" figures are **calculated** from the prices of their parts, never typed by hand. A price change in Supabase must show on the site without a code change or redeploy.
- Section order and anchors:
  1. **#packages: "Start strong with a fixed-price package."** 3 cards: Starter Kit £795, Launch Kit £1,995 (highlighted "Recommended", founding price £1,495 for the first 5 clients while `founding_enabled` is on), Scale Kit £4,995. Each card: ideal for, price, value and saving, 4 to 6 inclusions, timeline, "Care Plus from launch", CTA "Book a free call". Launch Kit card links to /packages/launch-kit.
  2. **Custom builds strip:** "Need an app, a platform or AI built around your business? Custom builds from £9,995, scoped on a free call."
  3. **#monthly: "Ongoing support, without the overhead."** 3 cards: Design Subscription £495 (toggle or line for Design + Video £895), Visibility Plan £795 (highlighted "Most popular"), Partner Plan £1,995. Terms line under the cards: "No long contracts. Design and Care plans: cancel with 30 days' notice. Visibility and Partner plans: 3-month minimum, then rolling." Plus "Pay yearly, get 2 months free."
  4. **Care Plus strip:** "Every website we build includes Care Plus from launch: hosting, security, edits and Google profile management for £145 a month."
  5. **#services: full service price list** as an accessible accordion by category (#web, #branding, #video, #social, #seo, #ai, #care), matching section 2 of the price book. Every row links to its service page. Self-serve items show "Buy now" (section 2.8 of the price book).
  6. FAQ (6): can I customise a package, contracts and notice, delivery times, combining services, who I work with (Talha), revisions.
  7. CTASection.
- Wording rules: "unlimited" always sits next to "one active request at a time"; set-up fees always sit next to monthly prices; no "only X left" unless the number is real.
- Note under prices: "Prices in GBP. No VAT is added. Every project gets a fixed quote before work starts."
- Schema: WebPage, OfferCatalog under the Organization. Each Offer has name, url and a `priceSpecification` with `minPrice` and `priceCurrency` GBP for "from" prices, or `price` for fixed packages. Monthly plans use `UnitPriceSpecification` with `unitCode` "MON". Set-up fees are a separate price component.

### 7.6a Launch Kit (/packages/launch-kit)
- H1: "Launch Kit: Brand, Website and Google, Done for You"
- Sections: hero with promise, price (£1,995) and founding price (£1,495 for the first 5 clients); who it is for and who it is not for; what is included (value stack table, total £3,480, calculated); timeline (brand in week 1, website in weeks 2 to 4, live in 21 working days); Care Plus (£145 a month, 3-month minimum); both guarantees; founding client terms in plain words; proof (MM Window Cleaning case study once Talha confirms, plus reviews); comparison line with the Starter and Scale kits; FAQ (6: timeline, what I need to provide, what if I already have a logo, what happens after launch, can I cancel Care Plus, payment terms); CTASection.
- Never call the logo "free". Never invent scarcity: the founding price shows "first 5 clients" and switches off from the pricing data.
- Schema: WebPage, Offer (price 1995, priceCurrency GBP, plus Care Plus as a UnitPriceSpecification with unitCode "MON"), BreadcrumbList (Home, Packages, Launch Kit), FAQPage.
- This page is the landing page for Launch Kit ads and outreach.

### 7.7 Our Work (/our-work) and case studies (/case-studies/{slug})
- /our-work H1: "Our Work". Intro line. Filter chips (All, Websites and Apps, Branding, Video and Animation, Social Media, AI, SEO) filtering server-rendered cards on the client. Case studies first, then the portfolio archive.
- Case study template: H1 "{Client}: {what we did}" (for example "BWLD: A Website Built to Win Enquiries"). Summary box (client, industry, services with links, year). Sections: The challenge, What we did, What we delivered, Results (real numbers only, else remove the section), Gallery (next/image), Testimonial (if real), Tools used, Related services, Next case study, CTASection.
- **Portfolio items:** add every client from `docs/02-business-profile.md` section 3a as a card (name, sector, country, services, link to the live site with `rel="noopener"`). Display names for dixonsamanagement.com and adnights.com: `TODO(Talha)`.
- **Black and White Leaflets Distribution:** upgrade to the lead case study. Feature the interactive campaign calculator (select areas or postcodes on a map, see houses and price), the rebrand, SEO, blog content, Google profile and the on-site AI chatbot.
- **MM Window Cleaning:** frame as the Launch Kit in action once Talha confirms the deliverables list (logo, logo animation, website with lead form, 3 social profiles, post designs, Google profile).
- **Doovor** (https://doovor.com): Maxterz's own product, live with beta users. Badge: "Live, in beta". Until screenshots arrive, use a designed product card (Doovor name on the brand gradient with the badge), not a grey placeholder. `TODO(Talha): screenshots and a one-paragraph summary`.
- **eSIMfo:** portfolio card for 2 motion graphics ads. Never show budgets.
- **Video testimonials (5):** Black and White Leaflets Distribution, MM Window Cleaning, Quick Action Sudan, Mikey Official, Awais Creations. Build with placeholder data. Placeholders show in development and preview only. On production, a video renders only when its record has a real file and `permission_confirmed = true`.
- Rename "Logo & Graphic Design" to a named client project (`TODO(Talha)`).
- Schema per case study: Article (headline, about the Service, author Organization, image, datePublished), BreadcrumbList.

### 7.8 About (/about)
- H1: "About Maxterz"
- Founder block: headshot (`docs/assets/founder/`, copy the WebP into `public/images/team/`), name "Muhammad Talha Shakir", role "Founder", 1-line intro using "Talha", plus one line: "Clients often call me Max, my designer name."
- Founder story in 5 short paragraphs from the story facts in Part 3.
- Timeline: 2017 first Fiverr orders, 10,000+ projects, UK company incorporated, today.
- How the team works: UK-led, delivery team in Pakistan and India, one point of contact.
- 3 values written as behaviours (for example "We answer within one working day").
- Proof numbers (only from SITE.proof).
- Company details block: legal name, company number, registered office, registered in England and Wales, link to Companies House.
- CTASection.
- Schema: AboutPage, Person (founder, `@id` = `https://maxterz.com/about#founder`), Organization reference.

### 7.9 Reviews (/reviews)
- H1: "Client Reviews"
- Summary: "4.9 stars from 7,094 reviews on Fiverr (September 2026)" with a "Verify on Fiverr" link (`rel="nofollow noopener"`, new tab). This is the only page that links to Fiverr.
- Grid of curated reviews from the Supabase `testimonials` table (created in Phase 3): id, author_name, author_country, source ('fiverr' | 'google' | 'direct' | 'video'), service_slug, rating, quote, period_label, delivery_time, is_featured, is_excerpt, video_url, poster_url, permission_confirmed (boolean, default false), created_at. Filter by service.
- **Seed data:** `docs/website/data/fiverr-reviews.json` (33 curated Fiverr reviews). Follow the `rules` block in that file: verbatim words, "on Fiverr" label, username and country, no project prices, hide period labels that read "Over a year ago". Seed it in Phase 3 with an idempotent script.
- Featured reviews (`is_featured`) feed the home page and service pages. Use service-matched reviews first.
- **Video testimonials:** a section for 5 client videos (see 7.7), each with a poster image, click-to-play facade, captions file, client name and company. Placeholders in development and preview only. On production, render a video only when `permission_confirmed` is true. `TODO(Talha): video files and permissions`.
- Review themes for headings, taken from the reviews themselves: fast turnaround, clear communication, clients who come back.
- **No Review or AggregateRating schema** (self-serving reviews are not eligible and risk a manual action).
- CTASection.

### 7.10 Book (/book)
- H1: "Book a Free Strategy Call"
- Left: what happens on the call (3 bullets), who it is for, what to prepare. Right: Calendly inline embed, loaded only on this page, with UTM parameters passed through.
- Listen for the Calendly `calendly.event_scheduled` postMessage: fire the GA4 `book_call` event, then send the visitor to /thank-you?type=call.
- Fallback links: WhatsApp and email.

### 7.11 Free website audit (/free-website-audit)
- H1: "Get a Free Website Audit Video"
- Promise: a personal video within 48 hours covering speed, SEO and conversion, with the 3 fixes that would bring more enquiries.
- Form: name, email, website URL, business type (select), main goal (select: more calls, more bookings, more online sales, look more professional). Consent checkbox for follow-up emails (unticked by default).
- Show 1 example audit thumbnail (`TODO(Talha)`), 3 reviews, FAQ (3).
- This page is the landing page for outreach and ads. No header mega menu distractions on mobile above the form.

### 7.12 Contact (/contact)
- H1: "Contact Maxterz"
- Promise: "We reply within one working day."
- Form fields: name*, email*, phone, company, website URL, service* (select: Starter Kit, Launch Kit, Scale Kit, a monthly plan, the 6 categories, Not sure yet), budget* (Under £1,000 / £1,000 to £3,000 / £3,000 to £7,500 / £7,500+), timeline (ASAP / Within 1 month / 1 to 3 months / Just exploring), message*. Prefill service from the `?service=` query on the client (reading it on the server would make the page dynamic).
- Side panel: Book a call, WhatsApp, phone, email, registered office (no map embed, it adds weight and suggests a walk-in office).
- Schema: ContactPage.

### 7.13 Thank you (/thank-you)
- noindex, not in sitemap. Message varies by `?type=` (contact, audit, call). What happens next in 3 steps. Links to /our-work and /reviews. WhatsApp button.

### 7.14 Insights (/insights and /insights/{slug})
- Remove the 6 placeholder posts and the /blogs routes (redirects in 6.3).
- Content source: keep the existing one if it is data-driven (Supabase table with slug, title, description, body markdown, category, author, published_at, updated_at, cover image, published boolean). Otherwise MDX files in `content/insights`.
- Listing: H1 "Insights", cards with title, description, date, category. If no posts are published, the page is noindex and excluded from the sitemap.
- Post template: H1, author box (Talha, with photo and 1-line bio linking to /about), published and updated dates, table of contents for posts over 1,200 words, body, inline CTA to the primary service, related posts (2), CTASection.
- Schema: BlogPosting (headline, description, image, datePublished, dateModified, author Person @id, publisher Organization @id, mainEntityOfPage), BreadcrumbList.
- Do not write or publish posts in this sprint. Build the templates and 3 unpublished drafts with outlines only (topics in Part 13).

### 7.15 Legal pages
- Privacy policy: UK GDPR. Controller MAXTERZ LTD with company details. What we collect (forms, bookings, analytics), why, lawful bases, processors (Vercel, Supabase, Google Analytics, Calendly, Resend, Microsoft Clarity, Meta when ads start), international transfers, retention, rights, ICO complaint route, contact email. `TODO(Talha): ICO registration number`.
- Terms and conditions: website terms of use plus a summary of business terms (quotes, deposits, IP transfer on final payment, revisions, governing law England and Wales).
- Cookie policy: table of every cookie and storage key, purpose, duration, category.
- Add a line to each: "Last updated: {date}". Flag in the phase report that Talha should have them reviewed. These are drafts, not legal advice.

### 7.16 404
- Title "Page Not Found | Maxterz", noindex. H1 "We cannot find that page". Links to /, /services, /our-work, /contact, and a search of the 6 hubs as cards.

---

## PART 8. TECHNICAL SEO SPECIFICATION

### 8.1 Route registry
Create `src/lib/routes.js` with one entry per static indexable page, typed with JSDoc:

```js
/**
 * @typedef {Object} RouteEntry
 * @property {string} path              e.g. "/services/branding-design/logo-design"
 * @property {string} title             exact title from 8.3 (used with title.absolute)
 * @property {string} description       exact meta description from 8.3
 * @property {string} h1
 * @property {string} primaryKeyword
 * @property {string} breadcrumbLabel
 * @property {string} [parent]          parent path for breadcrumbs and related links
 * @property {"web"|"branding"|"video"|"social"|"ai"|"seo"} [category]
 * @property {boolean} inSitemap
 * @property {Array<"WebPage"|"Service"|"FAQPage"|"AboutPage"|"ContactPage"|"CollectionPage"|"ItemList"|"OfferCatalog">} schema
 * @property {number} [fromPriceGBP]    lowest "from" price
 * @property {number} [setupFeeGBP]     required set-up fee, shown next to monthly prices
 * @property {"one-off"|"monthly"} [billing]
 * @property {string} updatedAt         ISO date, update when content changes
 */

/** @type {RouteEntry[]} */
export const ROUTES = [ /* one entry per page in 6.2 */ ];
```

Everything reads from it: `generateMetadata`, breadcrumbs, mega menu, footer, related links, sitemap and the audit script.

### 8.2 Metadata
- Root layout: `metadataBase: new URL(SITE.url)`, default Open Graph (siteName "Maxterz", locale "en_GB", type "website"), Twitter `summary_large_image`, `robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }`, `verification.google` from env `GOOGLE_SITE_VERIFICATION` if set.
- `<html lang="en-GB">`.
- A helper `buildMetadata({ path, title, description, image, noindex })` returns: `title: { absolute: title }`, description, `alternates.canonical` (absolute, no query string), Open Graph (url, title, description, images 1200x630 with alt), Twitter, robots.
- Every page uses the helper. No page may fall back to the root title.
- Dynamic pages (case studies, posts) build metadata from their data with the same helper and the same length limits (trim at a word boundary).

### 8.3 Titles, descriptions and H1s (final)

Titles use `title.absolute`. Lengths are checked.

| Path | Title | Meta description | H1 |
|---|---|---|---|
| / | Maxterz \| Web Design, Branding and AI Agency | UK-registered digital agency for websites, branding, video, SEO and AI agents. 10,000+ projects delivered since 2017. Book a free strategy call. | Your Entire Digital Team Under One Roof. |
| /services | Services: Websites, Branding, Video, SEO and AI \| Maxterz | One team for websites, apps, branding, video, social media, SEO and AI automation. Clear prices, fixed timelines and one point of contact. | Digital Agency Services for Growing Businesses |
| /services/web-development | Web Design and App Development Agency \| Maxterz | Fast, SEO-ready websites, ecommerce stores and mobile apps built to win enquiries. Fixed prices, clear timelines and full code handover. | Web Design and App Development That Wins You Clients |
| /services/web-development/business-website-design | Business Website Design That Wins Enquiries \| Maxterz | Business websites built to turn visitors into calls and bookings. Mobile-first, fast and SEO-ready, with a launch date agreed before we start. | Business Website Design That Wins Enquiries |
| /services/web-development/ecommerce-website-design | Ecommerce Website Design and Development \| Maxterz | Online stores built for fast checkout and repeat sales. Shopify or custom builds with SEO, tracking and payments set up from day one. | Ecommerce Website Design Built to Sell |
| /services/web-development/app-design | App Design and UI/UX Design Services \| Maxterz | App and product design that users understand at first tap. Research, wireframes, clickable prototypes and developer-ready design files. | App Design and UI/UX That Users Understand |
| /services/web-development/mobile-app-development | Mobile App Development for iOS and Android \| Maxterz | Cross-platform mobile apps built around your customers and workflows. From first prototype to app store launch, with one team throughout. | Mobile App Development for iOS and Android |
| /services/branding-design | Logo Design and Branding Agency \| Maxterz | Logos, brand identities and social media design that make your business look established. From the team behind 10,000+ projects since 2017. | Logo Design and Branding That Makes You Look Established |
| /services/branding-design/logo-design | Logo Design Services for Growing Businesses \| Maxterz | Original logo design with multiple concepts, clear revision rounds and every file format you need. Add a logo animation to launch with impact. | Logo Design Services for Growing Businesses |
| /services/branding-design/brand-identity-design | Brand Identity Design and Brand Guidelines \| Maxterz | Complete brand identity systems: logo suite, colours, typography, templates and guidelines that keep every touchpoint consistent. | Brand Identity Design and Guidelines |
| /services/branding-design/social-media-design | Social Media Design: Posts, Carousels and Ads \| Maxterz | On-brand social media graphics, carousels, story templates and ad creatives designed to stop the scroll and match your brand. | Social Media Design That Stops the Scroll |
| /services/branding-design/thumbnail-design | YouTube Thumbnail Design by ThumbLab \| Maxterz | Click-worthy YouTube thumbnails from ThumbLab, the thumbnail studio by Maxterz. Designed to earn the click on every upload you publish. | YouTube Thumbnail Design by ThumbLab |
| /services/video-animation | Video, Motion Graphics and Animation Agency \| Maxterz | Logo animations, motion graphics, explainer videos and short-form edits from the studio behind a logo animation with 1.2M views. | Video, Motion Graphics and Animation |
| /services/video-animation/logo-animation | Logo Animation Services: Intros and Reveals \| Maxterz | Custom logo animations for intros, outros, websites and social media. Made by the studio with 1,000+ logo animation reviews on Fiverr and a 1.2M-view reel. | Logo Animation Services |
| /services/video-animation/motion-graphics | Motion Graphics Design Services \| Maxterz | Motion graphics for ads, product launches, social media and presentations. Clear storyboards, fast delivery and files for every platform. | Motion Graphics Design Services |
| /services/video-animation/video-editing | Video Editing for Reels, Shorts and YouTube \| Maxterz | Edits for reels, TikTok and Shorts, talking-head videos and YouTube, with captions, music and motion text. Try one edit, buy a pack or go monthly. | Video Editing for Reels, Shorts and YouTube |
| /services/video-animation/explainer-videos | Explainer Video Production and SaaS Demos \| Maxterz | Script-to-screen explainer and product demo videos that make complex offers simple. Script, voiceover, animation and edit in one place. | Explainer Video Production |
| /services/social-media-management | Social Media Management Agency \| Maxterz | Done-for-you social media: strategy, content, posting and community management that turns followers into enquiries. Simple monthly plans. | Social Media Management That Brings Enquiries |
| /services/ai-automation | AI Automation Agency: AI Agents and Workflows \| Maxterz | AI receptionists, WhatsApp and chat agents, and workflow automation that answer customers 24/7 and take repetitive admin off your team. | AI Agents and Automation for Your Business |
| /services/ai-automation/ai-receptionist | AI Receptionist for Small Businesses \| Maxterz | An AI receptionist that answers every call 24/7, books appointments, qualifies leads and sends you a summary. Tested before it takes a real call. | An AI Receptionist That Answers Every Call |
| /services/ai-automation/ai-chat-agents | AI Chat Agents for WhatsApp, SMS and Websites \| Maxterz | AI text agents that reply in seconds on WhatsApp, SMS and your website. They answer questions, capture leads and book calls around the clock. | AI Chat Agents for WhatsApp, SMS and Your Website |
| /services/seo-digital-marketing | SEO and Digital Marketing Agency \| Maxterz | Technical SEO, local SEO, content and paid ads that bring qualified traffic and measurable enquiries. Clear monthly reports you can read. | SEO and Digital Marketing That Brings Enquiries |
| /services/seo-digital-marketing/seo-services | SEO Services That Bring Qualified Traffic \| Maxterz | Technical SEO, on-page optimisation, content and link building that grow qualified organic traffic, with clear monthly reports you can read. | SEO Services That Bring Qualified Traffic |
| /services/seo-digital-marketing/local-seo | Local SEO Services and Google Business Profile \| Maxterz | Get found in Google Maps and local results. Google Business Profile optimisation, local pages, citations and reviews that bring in local calls. | Local SEO Services That Bring Local Calls |
| /packages/launch-kit | Launch Kit: Brand, Website and Google Set-up \| Maxterz | Everything a small business needs to look established and get found: brand identity, website, Google profile and social set-up, live in 21 working days. | Launch Kit: Brand, Website and Google, Done for You |
| /packages | Packages and Pricing: Websites, Branding and AI \| Maxterz | Clear starting prices for websites, branding, animation, SEO, social media and AI agents. Fixed-price projects and simple monthly plans. | Packages and Pricing |
| /our-work | Our Work: Websites, Branding and Animation \| Maxterz | Case studies and selected projects across websites, apps, branding, logo animation and AI. See what we built and how it works for each client. | Our Work |
| /about | About Maxterz: The Team Behind 10,000+ Projects | Maxterz is a UK-registered digital agency with 10,000+ projects delivered since 2017, led by a founder with an MSc in Software Engineering. | About Maxterz |
| /reviews | Client Reviews: 4.9 Stars on Fiverr \| Maxterz | Read what clients say about Maxterz: 4.9 stars from 7,000+ reviews on Fiverr since 2017. Filter by service to see feedback on work like yours. | Client Reviews |
| /contact | Contact Maxterz: Get a Quote or Book a Call | Tell us about your project and get a clear plan and quote within one working day. Call, WhatsApp, email or book a free strategy call. | Contact Maxterz |
| /book | Book a Free 30-Minute Strategy Call \| Maxterz | Pick a time that suits you. In 30 minutes we map your goals, spot quick wins and recommend the right next step. No obligation. | Book a Free Strategy Call |
| /free-website-audit | Free Website Audit Video in 48 Hours \| Maxterz | Get a personal video audit of your website covering speed, SEO and conversion, plus the three fixes that would bring you more enquiries. | Get a Free Website Audit Video |
| /insights | Insights: Guides on Web, Branding, SEO and AI \| Maxterz | Practical guides on websites, branding, SEO and AI automation for business owners. Costs, checklists and lessons from real projects. | Insights |
| /privacy-policy | Privacy Policy: How We Handle Your Data \| Maxterz | How MAXTERZ LTD collects, uses and protects personal data from our website, forms and bookings, and how to use your rights under UK GDPR. | Privacy Policy |
| /terms-conditions | Terms and Conditions for Our Website and Services \| Maxterz | The terms that apply when you use the Maxterz website or buy our services, including quotes, payments, revisions, ownership and governing law. | Terms and Conditions |
| /cookie-policy | Cookie Policy: Cookies We Use and Why \| Maxterz | Every cookie and storage item used on the Maxterz website, what it does, how long it lasts and how to change your cookie settings at any time. | Cookie Policy |

Case study title pattern: `{Client} Case Study: {Main service} | Maxterz`. Post title pattern: `{Post title} | Maxterz` (trim to 60).
The "\|" above is the pipe character escaped for this table. Use a plain "|" in code.

### 8.4 robots.js
```js
// src/app/robots.js
/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  // Block crawling only on Vercel preview builds. Local builds and production stay crawlable,
  // so the Phase 6 audit and Lighthouse run against the real rules.
  if (process.env.VERCEL_ENV === "preview") return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://maxterz.com/sitemap.xml",
    host: "https://maxterz.com",
  };
}
```
Do not block AI crawlers. Do not block CSS, JS or `/_next/`. Do not block /thank-you in robots.txt: it carries a noindex tag, and Google must be able to crawl it to see that tag.

### 8.5 sitemap.js
- `src/app/sitemap.js` builds from `src/lib/routes.js` (where `inSitemap` is true) plus Supabase case studies and published posts.
- `lastModified` = the real content update date. Skip `changeFrequency` and `priority`.
- Absolute URLs on https://maxterz.com. No redirected, noindex or 404 URLs.

### 8.6 Rendering and data
- All indexable pages are static or ISR. Run `next build` and confirm every marketing route shows as static or ISR in the build output. Report any dynamic route and why.
- Supabase content is fetched in Server Components, never in client `useEffect` for anything a search engine should read (packages, reviews, case studies, FAQs).
- ISR: `export const revalidate = 3600` on data-driven pages. Pages that show prices use the cache tag `pricing` and `revalidate = 300` as a safety net.
- **On-demand revalidation (required for prices):** a `/api/revalidate` route, protected by `REVALIDATE_SECRET`, calls `revalidateTag('pricing')`. A Supabase database webhook on the pricing tables calls it on every insert, update or delete, so a price edit in Supabase is live in seconds with no redeploy. Same pattern for testimonials and case studies (tags `testimonials`, `work`).
- `generateStaticParams` for case studies and posts.

### 8.7 Canonicals and duplicates
- Every page: absolute self-canonical on https://maxterz.com without query strings.
- Host redirects (Part 6.3) remove www, maxterz.co.uk, vercel.app and old domain duplicates.
- One URL per page. Internal links always use the final URL.

### 8.8 Structured data (JSON-LD)
Build `src/lib/schema.js` with builder functions (JSDoc typed) and a `JsonLd` component:

```jsx
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

The root layout outputs the site-wide graph (Organization and WebSite). Each page outputs its own graph that references them by `@id`. Two JSON-LD script tags per page is fine. Use stable `@id`s so entities link together.

**Site-wide (in the root layout):**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://maxterz.com/#organization",
      "name": "Maxterz",
      "legalName": "MAXTERZ LTD",
      "url": "https://maxterz.com",
      "logo": { "@type": "ImageObject", "url": "https://maxterz.com/logo-512.png", "width": 512, "height": 512 },
      "description": "Maxterz is a UK-registered digital agency for websites, branding, video, SEO and AI agents, trusted by businesses worldwide since 2017.",
      "slogan": "One Hub, Endless Digital Solutions",
      "email": "info@maxterz.com",
      "telephone": "+447375874706",
      "identifier": { "@type": "PropertyValue", "propertyID": "UK Companies House number", "value": "16822859" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "128 City Road",
        "addressLocality": "London",
        "postalCode": "EC1V 2NX",
        "addressCountry": "GB"
      },
      "areaServed": "Worldwide",
      "founder": { "@id": "https://maxterz.com/about#founder" },
      "contactPoint": [{
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@maxterz.com",
        "telephone": "+447375874706",
        "availableLanguage": ["English"]
      }],
      "knowsAbout": ["Web design", "Web development", "Mobile app development", "UI/UX design", "Logo design", "Brand identity", "Logo animation", "Motion graphics", "Explainer videos", "Social media management", "Search engine optimisation", "Local SEO", "AI receptionists", "AI chat agents", "Workflow automation"],
      "sameAs": "<insert the SITE.sameAs array here>"
    },
    {
      "@type": "WebSite",
      "@id": "https://maxterz.com/#website",
      "url": "https://maxterz.com",
      "name": "Maxterz",
      "inLanguage": "en-GB",
      "publisher": { "@id": "https://maxterz.com/#organization" }
    }
  ]
}
```
Do not add `SearchAction` (Google retired the sitelinks search box). Do not add AggregateRating or Review about Maxterz.

**Per page (merged into the page graph):**
- `WebPage` (or AboutPage, ContactPage, CollectionPage): `@id` = `{url}#webpage`, url, name, description, `isPartOf` website, `breadcrumb` = `{url}#breadcrumb`, `inLanguage` "en-GB", `dateModified`.
- `BreadcrumbList`: `@id` = `{url}#breadcrumb`, absolute item URLs.
- `Service` on hubs and service pages: `@id` = `{url}#service`, name, serviceType, description, `provider` = organization @id, `areaServed` "Worldwide", `offers` = `{ "@type": "AggregateOffer", "lowPrice": "1997", "priceCurrency": "GBP" }` when a "from" price exists (add a `UnitPriceSpecification` with `unitCode` "MON" for monthly services), `url`.
- `FAQPage` only where the same questions and answers are visible on the page.
- `Person` on /about: `@id` `https://maxterz.com/about#founder`, name "Muhammad Talha Shakir", alternateName "Talha", image (absolute URL of the headshot), jobTitle "Founder", worksFor organization @id, knowsAbout, sameAs LinkedIn (add once supplied).
- `Article` on case studies, `BlogPosting` on posts (Part 7).
- `VideoObject` for each hosted showcase video: name, description, thumbnailUrl, uploadDate, contentUrl, duration (ISO 8601).
- `ItemList` on /services and /our-work, each ListItem with `position`.

Validate every template with the Schema.org validator and Google's Rich Results Test (Phase 6).

### 8.9 Images, fonts and video
- Every image through `next/image` with width, height (or `fill` with a sized parent), `sizes`, and descriptive alt text written for a person (not keyword lists). Decorative images get `alt=""`.
- `images.remotePatterns` for the Supabase storage host. `images.formats: ["image/avif", "image/webp"]`.
- Only the hero LCP image gets `priority` (`preload` on Next.js 16). Nothing else is preloaded. Remove the global logo PNG preload.
- Logo: inline SVG component (`TODO(Talha): logo SVG` if not in the repo). Keep a 512x512 PNG in /public for schema and a favicon set (ico, 32px, 180px apple-touch, 192px and 512px for the manifest).
- Fonts via `next/font` (self-hosted), at most 2 families and 3 weights, `display: swap`.
- Video: MP4 (H.264) plus WebM, under 2MB for short loops, `muted playsInline loop preload="none"` with a poster, or a click-to-play facade. Never a YouTube iframe above the fold (use a facade that loads the iframe on click).

### 8.10 Performance budget
- JavaScript on home under 170KB gzipped for first load. Check with the build output and a bundle analyzer that works with your build setup, and report the top 10 modules.
- Server Components by default. `"use client"` only on interactive leaves.
- Animation libraries (for example framer-motion) are never on the LCP element and load lazily. Prefer CSS for simple effects.
- Third-party scripts: GA4 via `@next/third-parties/google` or `next/script` `afterInteractive`, consent-gated. Calendly only on /book. Clarity `lazyOnload` after consent.
- No layout shift from banners, fonts, menus or the mobile action bar.

### 8.11 Security and headers (next.config `headers()`)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-Frame-Options: SAMEORIGIN`
- Skip a strict Content-Security-Policy during this sprint (GA4 and Calendly make it fragile). Note it for later.

### 8.12 llms.txt
- The build already runs `tools/generate-llms.js`. Update it to read `src/lib/routes.js` and output: site description, then one line per indexable page with title, absolute maxterz.com URL and description. Low effort, no reliance on it.

### 8.13 Accessibility (WCAG 2.2 AA)
- Landmarks (header, nav, main, footer), skip link, one H1, no skipped heading levels.
- Visible focus states, keyboard access for menus, accordions and filters.
- Colour contrast at least 4.5:1 for text.
- Form fields with labels, clear error messages linked with `aria-describedby`, success state announced.
- `prefers-reduced-motion` disables non-essential animation.

---

## PART 9. CONVERSION AND TRACKING SYSTEM

### 9.1 CTA hierarchy
1. **Primary:** "Book a free strategy call" to /book in the hero, after proof sections and at the end of pages. The header button and mobile action bar use the short label "Book a free call" (same destination).
2. **Secondary:** "Get a free website audit" to /free-website-audit. In CTASection and on web and SEO pages.
3. **Third:** WhatsApp (prefilled message: "Hi Maxterz, I'm on your {page name} page and I'd like to talk about a project.").
- Every CTA is a real `<a href>`. Track clicks with a `data-cta` attribute and one global listener.

### 9.2 Leads table (new migration)
```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form text not null check (form in ('contact', 'audit', 'other')),
  name text not null,
  email text not null,
  phone text,
  company text,
  website_url text,
  service text,
  budget text,
  timeline text,
  business_type text,
  goal text,
  message text,
  page_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  marketing_consent boolean not null default false,
  status text not null default 'new'
);
alter table public.leads enable row level security;
-- No public policies. Inserts happen only in server actions using the service role key.
```
- The service role key lives in a server-only env var (`SUPABASE_SERVICE_ROLE_KEY`) and is never imported into client code.

### 9.3 Form handling
- Server Actions with `zod` validation on the server. Client-side validation for instant feedback only.
- Spam: hidden honeypot field plus a minimum fill time of 3 seconds. Add Cloudflare Turnstile later only if spam appears.
- On success: insert the lead, send an alert email to info@maxterz.com (all fields plus UTM data), send the lead an auto-reply ("Thanks {name}, Talha will reply within one working day." signed "Best regards, Talha - Team Maxterz"), then redirect to /thank-you?type={form}.
- Email via Resend (`RESEND_API_KEY`). From: `Maxterz <info@maxterz.com>`. Reply-to: info@maxterz.com. Transactional only (D22): never use Resend for cold or bulk marketing email. If the key is missing, still save the lead and log a warning. Never lose a lead because email failed.
- Show inline errors and keep what the visitor typed.

### 9.4 Attribution
- On first page load, read `utm_*`, `gclid` and `fbclid` from the URL and keep them in `sessionStorage` (first touch). Attach them plus `document.referrer` and the landing path to every form submission and to the Calendly embed URL.

### 9.5 Consent (UK GDPR and PECR)
- Lightweight custom banner, no heavy CMP. Buttons: "Accept all", "Reject all" (equal size and style) and "Settings" (analytics and marketing toggles).
- Google Consent Mode v2: set defaults before any Google tag loads: `ad_storage`, `ad_user_data`, `ad_personalization` and `analytics_storage` all "denied". Update on choice.
- Clarity and any Meta Pixel load only after consent for their category.
- Store the choice in a first-party cookie for 6 months. "Cookie settings" in the footer reopens the banner.
- The banner must not cause layout shift or cover the primary CTA on mobile.

### 9.6 GA4 events

| Event | When | Parameters |
|---|---|---|
| generate_lead | Contact or audit form success | form, service, budget |
| book_call | Calendly event scheduled | source_page |
| cta_click | Any element with data-cta | cta_text, cta_location, page_path |
| whatsapp_click | WhatsApp link | page_path |
| phone_click | tel: link | page_path |
| email_click | mailto: link | page_path |
| outbound_click | Fiverr and ThumbLab links | url |

List in the Phase 3 report which events Talha must mark as key events in GA4 (generate_lead, book_call).

### 9.7 Stripe Payment Links (optional, env-driven)
- `NEXT_PUBLIC_STRIPE_LINK_LOGO_DESIGN` (Essential, £195), `NEXT_PUBLIC_STRIPE_LINK_LOGO_ANIMATION` (Essential, £295), `NEXT_PUBLIC_STRIPE_LINK_THUMBNAIL` (try one, £50), `NEXT_PUBLIC_STRIPE_LINK_SHORT_EDIT` (try one, £50). The env name for each item is also stored in its pricing row (`stripe_link_env`). Show "Buy now" only when set.

---

## PART 10. PHASES

Each phase ends with: build and lint green; relevant checks run; commit with the message shown; report in `DOCS/launch/phase-N-report.md`; stop.

### Phase 0. Audit and plan (read-only, no code changes)
- Map every route: file path, render mode from `next build` output (static, ISR, dynamic), data source (Supabase table or file), metadata source, H1 as rendered in server HTML.
- List Supabase tables used by the site and their columns.
- List client-side data fetching that affects indexable content.
- Confirm or correct every row in Part 5.
- Check packages, reviews and portfolio data: what exists, what is missing.
- Dependencies: list heavy client packages and where they load.
- Run Lighthouse mobile on 5 key pages and record scores as the baseline.
- Output: `DOCS/launch/phase-0-report.md` with the findings, a file-level plan for Phases 1 to 6, and a full list of `TODO(Talha)` items.
- Also record: exact Next.js and React versions, router type, package manager, lint set-up.
- Commit only the new docs: `docs: phase 0 audit and launch plan`

### Phase 1. Technical SEO foundation
- `src/lib/site.js`, `src/lib/routes.js`, `buildMetadata`, `JsonLd`, `src/lib/schema.js`.
- Root layout: `lang="en-GB"`, metadataBase, default OG and Twitter, site-wide Organization and WebSite graph.
- Metadata, canonical and WebPage schema on every existing page using 8.3.
- `src/app/robots.js`, `src/app/sitemap.js` and the preview noindex header. (Host redirects come in Phase 2.)
- Fix all H1s (typo, missing words, spacing, server-rendered full text).
- 404 metadata and noindex.
- Security headers. Default OG image (1200x630, brand colours, logo, tagline).
- Commit: `feat(seo): metadata system, canonicals, schema, robots, sitemap, host rules`

### Phase 2. Navigation, redirects and routes
- Header with mega menu, mobile menu, footer with legal bar, global breadcrumbs.
- All redirects in 6.3: host rules first, then path rules, plus the preview noindex header. Remove the /services redirect and create the /services hub.
- Test every URL in `DOCS/website/data/old-indexed-urls.md`: one permanent redirect straight to its final URL, which returns 200. Put the result table in the phase report.
- Scaffold every new route from 6.2 with metadata, H1 and placeholder-free structure (sections can be minimal until Phase 4 and 5, but no lorem ipsum ever ships).
- Remove /shop and the "coming soon" code.
- Fix every internal link to its final URL.
- Commit: `feat(ia): navigation, footer, breadcrumbs, redirects, new routes`

### Phase 3. Conversion and tracking
- CTAButton, CTASection, ProofBar, MobileActionBar.
- /book with Calendly embed and booking event. /free-website-audit and /contact forms with Server Actions (replacing Formspree; remove `@formspree/react` once the new flow is verified), leads and testimonials table migrations (show SQL first, testimonials schema in 7.9), an idempotent seed script that loads `docs/website/data/fiverr-reviews.json` into testimonials, Resend emails from info@maxterz.com, /thank-you.
- Attribution capture, consent banner with Consent Mode v2, GA4 events, Clarity after consent (`NEXT_PUBLIC_CLARITY_ID`).
- Test: submit each form 3 times locally with test data. Confirm rows, emails and events (GA4 DebugView).
- Commit: `feat(conversion): booking, lead forms, consent, analytics events`

### Phase 4. Money pages
- Supabase pricing tables, seed script and value tests (11.1), seeded from `docs/website/data/pricing.json`. Show the migration SQL before applying it.
- Home (7.2), Services hub (7.3), 6 category hubs (7.4), 16 service pages (7.5), Packages (7.6), Launch Kit page (7.6a).
- Write copy that follows Part 4, uses only Part 3 facts, and answers real buyer questions. Every FAQ answer is specific.
- Service, FAQPage, OfferCatalog and ItemList schema.
- Reviews and portfolio pulled per service from Supabase. If the testimonials table is still empty, hide the review sections and log it in TODO-talha.
- Commit: `feat(pages): home, services, category hubs, service pages, packages`

### Phase 5. Trust pages
- About (7.8), Reviews (7.9) using the testimonials table from Phase 3, Our Work and case study template (7.7) with the Doovor case study, Insights templates (7.14), legal pages (7.15), 404 (7.16).
- Remove placeholder posts and old blog routes.
- Commit: `feat(trust): about, reviews, work, case studies, insights templates, legal`

### Phase 6. QA, speed and launch readiness
- Build `scripts/seo-audit.mjs` (Part 11.2) and fix everything it reports.
- Lighthouse mobile on the 5 key pages. Fix to budget.
- Accessibility pass with axe (via Playwright or the browser extension).
- Test on a 375px wide viewport and on desktop: header, menus, forms, banner, action bar.
- Content pass: search the codebase and Supabase content for em dashes (U+2014), en dashes (U+2013), arrows (U+2190 to U+21FF), emojis, "lorem", "TODO" (in rendered copy), "MAXTERZ" outside legal text, "4.8", "98%", "350+", "500+". Fix all.
- Regenerate llms.txt.
- Write `DOCS/launch/launch-checklist.md` from Part 12 with anything still open.
- Commit: `chore(launch): QA, performance, accessibility, audit script`

---

## PART 11. REFERENCE DATA AND QA

### 11.1 Pricing data (Supabase)
- **Locked prices:** `docs/05-offers.md` v3 (human-readable) and `docs/website/data/pricing.json` (seed). Never copy prices from older versions of this brief.
- **Live source:** Supabase. Talha edits prices in the Supabase table editor. No code change, no redeploy.
- **Tables** (Phase 0 checks what already exists; extend existing pricing tables if they fit, otherwise create these in a new migration):
  - `price_items`: id (text, primary key, e.g. `logo-professional`), category, service_page, name, tier_label, model (`tier`, `from`, `fixed`, `monthly`, `per-unit`, `quote`), price_gbp (integer, nullable for quotes), unit, setup_fee_gbp, includes (text array), timeline, popular, self_serve, stripe_link_env, note, sort_order, is_active, updated_at.
  - `packages`: id, type (`one-time`, `monthly`, `care`), name, price_gbp, founding_price_gbp, founding_enabled, founding_slots, ideal_for, includes_copy (text array), timeline, payment_terms, minimum_term, notice, popular, includes_care_plus, sort_order, is_active, updated_at.
  - `package_items`: package_id, price_item_id, quantity (primary key on the pair).
- **Security:** row level security on all three tables. Public can `select` active rows only. Writes only through the Supabase dashboard or the service role.
- **Seed:** `scripts/seed-pricing.mjs` upserts everything from `pricing.json` by id. Safe to run more than once.
- **Calculated values:** a server-side helper computes each package's value as the sum of item price x quantity, and the saving as value minus price. Never store these numbers.
- **Unit test:** the calculated values must match `expected_value_gbp` in `pricing.json`: Starter Kit £1,325, Launch Kit £3,480, Scale Kit £9,420, Care Plus £240, Visibility Plan £1,405, Partner Plan £3,520.
- **Founding price:** shown only while `packages.founding_enabled` is true for the Launch Kit. Talha switches it off in Supabase when the fifth founding client signs.
- **Revalidation:** see 8.6. Every page that shows a price reads through a cached helper tagged `pricing`.

### 11.2 `scripts/seo-audit.mjs`
A Node script (no heavy deps; use `fetch` and a light HTML parser such as `node-html-parser` as a dev dependency) that runs against `next start` on localhost. It rewrites every `https://maxterz.com` URL from the sitemap and links to `http://localhost:3000` for fetching, but compares canonicals against the production URL:
1. Reads `/sitemap.xml`, then crawls every internal link found on those pages.
2. For each URL checks: status 200 (no redirect), exactly one H1, title 30 to 60 characters and unique, description 120 to 158 characters and unique, absolute canonical equal to the production URL of the page, no `noindex` on sitemap pages, `lang="en-GB"`, all JSON-LD parses and contains the expected types for its template, every `<img>` has alt and dimensions, no internal link returns 3xx or 4xx.
3. Finds pages linked internally but missing from the sitemap, and sitemap pages with fewer than 2 internal links pointing to them (orphans).
4. Scans visible text for em dashes (U+2014), en dashes (U+2013), arrows (U+2190 to U+21FF), emoji ranges, "lorem", "TODO", "MAXTERZ" (outside the legal bar) and prints each hit with URL.
5. Prints a summary table and exits with code 1 on any error.
Add `"seo:audit"` to package.json scripts.

---

## PART 12. LAUNCH CHECKLIST (Talha, after Phase 6)

- [ ] Vercel on the Pro plan. Production domain maxterz.com set as primary.
- [ ] Old thumbnail content moved off maxterz.com to ThumbLab's own domain.
- [ ] DNS for maxterz.com points to Vercel. HTTPS active. www redirects to the apex.
- [ ] In Vercel Domains, maxterz.com is the primary domain. Do not let Vercel redirect maxterz.com to www (that would loop with the host rules).
- [ ] maxterz.co.uk (and www) added to the same Vercel project so the host rules 301 every path to maxterz.com. Test 5 old URLs by hand.
- [ ] **Email safety:** when you change DNS for maxterz.co.uk or maxterz.com, change only the web records (A and CNAME). Keep MX, SPF, DKIM and DMARC exactly as they are. If you move nameservers, copy the mail records first. Send a test email to info@maxterz.com and info@maxterz.co.uk after every DNS change.
- [ ] info@maxterz.com mailbox live, info@maxterz.co.uk forwarding to it, and Resend's SPF, DKIM and DMARC records verified on maxterz.com.
- [ ] maxterzhub.co.uk added to the Vercel project so its redirects work.
- [ ] Keep maxterz.co.uk on auto-renew for at least 2 years.
- [ ] Environment variables set in Vercel: Supabase keys, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_CLARITY_ID`, `REVALIDATE_SECRET`, the 4 Stripe links, `NEXT_PUBLIC_AI_DEMO_NUMBER` (if ready). `GOOGLE_SITE_VERIFICATION` is only needed for a URL-prefix property; a Domain property verifies through DNS.
- [ ] Supabase database webhook on `price_items`, `packages` and `package_items` (and testimonials) calling https://maxterz.com/api/revalidate with the secret. Test: change one price in Supabase and see it on /packages within a minute.
- [ ] Submit 1 test lead on each form in production. Check Supabase, inbox, auto-reply and GA4 DebugView.
- [ ] Google Search Console: Domain property for maxterz.com, sitemap submitted, URL inspection on home and 5 key pages, request indexing.
- [ ] Google Search Console: verify maxterz.co.uk as well, then run Settings, Change of Address, from maxterz.co.uk to maxterz.com.
- [ ] Bing Webmaster Tools: import from Search Console, submit sitemap.
- [ ] GA4: mark generate_lead and book_call as key events. Link GA4 to Search Console.
- [ ] Google Business Profile: service-area business, address hidden, website link to maxterz.com.
- [ ] Update the website link to maxterz.com and the standard description on Fiverr, Instagram, Facebook, LinkedIn, X, TikTok and Behance.
- [ ] When info@maxterz.com is live: change `SITE.email`, email signatures and every profile in one go.
- [ ] Run PageSpeed Insights on the live home page and the AI receptionist page.
- [ ] Rich Results Test on home, a service page and a case study.

---

## PART 13. INSIGHTS TOPIC MAP (post-launch, 2 posts a week)

Write from real project experience. Each post links to one money page.

| Cluster | Post | Links to |
|---|---|---|
| Web | How much does a website cost in the UK in 2026? | Business website design |
| Web | 21 things every business website needs to win enquiries | Business website design |
| Web | Shopify or custom ecommerce: which fits your business? | Ecommerce website design |
| Web | Website redesign: signs you need one and how to plan it | Web development hub |
| AI | AI receptionist for small businesses: costs, set-up and what to expect | AI receptionist |
| AI | AI receptionist or call answering service: which should you choose? | AI receptionist |
| AI | WhatsApp AI agents for business: what they can and cannot do | AI chat agents |
| AI | How to automate lead follow-up for a service business | AI automation hub |
| Branding | How much does a logo cost in the UK? | Logo design |
| Branding | Logo or brand identity: what your business needs | Brand identity design |
| Video | Logo animation: types, costs and where to use it | Logo animation |
| Video | Explainer video cost and process, step by step | Explainer videos |
| SEO | Local SEO checklist for UK service businesses | Local SEO |
| SEO | Google Business Profile optimisation guide | Local SEO |
| SEO | How long does SEO take to work? | SEO hub |
| Social | What should a service business post on Instagram? | Social media management |
| Agency | Agency or freelancers: cost and risk compared | Services hub |

The first 3 drafts (unpublished, outline only) in Phase 5: website cost, AI receptionist costs, logo animation types and costs.

---

## PART 14. DO NOT

- Do not invent facts, testimonials, client logos, results or team members.
- Do not add review star schema for Maxterz.
- Do not create city or "near me" pages.
- Do not publish placeholder or AI-filler blog posts.
- Do not fetch indexable content on the client.
- Do not add chat widgets, popups or exit-intent modals.
- Do not link to Fiverr anywhere except /reviews.
- Do not upgrade major framework versions or change the URL pattern.
- Do not use em dashes, en dashes, arrows or emojis in copy.
- Do not skip the phase report and stop.
