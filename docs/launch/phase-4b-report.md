# Phase 4B report: new service pages, packages, Launch Kit and home page

Date: 13 Oct 2026. Branch: `launch`. Author: Claude Code.

Scope (brief Part 10, Phase 4B): build Brand Identity and Social Media Design from the logo design layout, Motion Graphics and Video Editing from the video layouts, then /packages, /packages/launch-kit and the home page. The home page got the full brief 7.2 checklist, not only the packages preview, because Phase 4 owns "Home (7.2)" and the old home still showed placeholder data and a 4.8 rating.

---

## 1. Result

| Page | Built from (D30) | Prices from Supabase | FAQ | Schema |
|---|---|---|---|---|
| /services/branding-design/brand-identity-design | LogoDesign.jsx | Core £995, Complete £1,995, guidelines only from £495 | 8 | Service (AggregateOffer from £495), FAQPage, BreadcrumbList |
| /services/branding-design/social-media-design | LogoDesign.jsx | Post £30, templates pack £195 | 8 | Service, FAQPage, BreadcrumbList |
| /services/video-animation/motion-graphics | LogoAnimation.jsx, plus 2 sections from the video category screen | 15s £595, 30s £995, 60s £1,795 | 8 | Service, FAQPage, BreadcrumbList |
| /services/video-animation/video-editing | LogoAnimation.jsx, prices laid out like ThumbnailDesign.jsx | Try one £50, pack of 30 £1,195, monthly by quote, long-form from £150 | 8 | Service, FAQPage, BreadcrumbList |
| /packages | Existing page, same sections (D30, D39) | 3 packages, 3 monthly plans, Care Plus, 6 "from" cards, custom builds from £9,995 | 7 | OfferCatalog under the Organization, FAQPage |
| /packages/launch-kit | New offer page (brief 7.6a), site styles | £1,995, founding £1,495 (5 places), value £3,480 calculated, Care Plus £145 | 6 | Offer with Care Plus as a monthly price, FAQPage |
| / (home) | Existing sections and order (D30), missing brief items fitted in | Launch Kit block, packages teaser, FAQ prices | 6 | WebPage, FAQPage |

Every page: one H1 from routes.js in the server HTML, title and description in range, absolute self-canonical, no AggregateRating or Review schema, Book a free call to `/book?service={slug}`, an end CTASection, Related services, real Fiverr reviews marked "on Fiverr", and no typed prices (values and savings are calculated from package items).

## 2. Home page (brief 7.2)

Section order kept from the old home (D30), with the missing brief items fitted in:

1. **Hero.** Locked words (D28) checked word for word in the server HTML: eyebrow, H1, subheading, proof line, "Book a free strategy call" (/book) and "See our work" (/our-work). ProofBar directly below with the 4 brief badges and SVG icons. Removed: the "4.8" rating, the flag emoji, the star symbol, the "1.2M Views" overlay on every slide (it implied each slide had 1.2M views) and the contact pop-up (one clear path to /book). The text no longer fades in, so the H1 is visible in the first paint.
2. **Hero slides** come from `hero_slides` (page_path "/") on the server. Until your slides arrive, the hero shows the Maxterz logo animation, converted from the old 1.25MB GIF to a 92KB muted MP4 with a 6KB poster of the finished logo (inventory section 4). Controls: a pause button whenever something moves, previous and next with labels for 2 or more slides, 44px targets. Reduced motion: no rotation and the video stays on its poster. The video pauses in hidden tabs and starts when the tab shows.
3. **Why clients trust Maxterz** (FiverreProof): numbers from `SITE.proof` only, shown as plain text (the counter animated from a number to the same number). "Verified" removed: 10,000+ is a founder figure. Labels now 14px.
4. **Services:** 6 category cards with D31 names from routes.js. Web, branding and video cards link to their service pages; social media, AI and SEO list what they include (single-page categories, D31). "View all services" now goes to /services (it pointed at the web page).
5. **5 vs 1:** locked words (D28) checked word for word. Visual comparison kept.
6. **Launch Kit block (new, brief item 4):** "Look established and get found.", 21 working days from the data, value £3,480 calculated, £1,995, founding £1,495 for the first 5 while `founding_enabled` is on, Care Plus £145 a month with its term. Book a free call and "See what is included".
7. **Why choose us:** 4 reasons from the business profile (the old rows were placeholders). Talha "looks after every client", as the profile says, not "leads every project".
8. **Process (new, brief item 7):** Free call, Plan and quote (within 1 working day), Build, Launch and grow.
9. **Packages teaser:** Starter, Launch (highlighted, founding line) and Scale from Supabase with calculated savings, "Monthly plans from £495." and links to /packages.
10. **Reviews:** 6 real Fiverr reviews from the server, service-tagged and featured first, each with name, country, date (month and year only) and "Logo design review on Fiverr" or similar. No star rows.
11. **Founder note (new, brief item 10):** headshot (copied to `public/images/team/`), 3 lines drafted from the business profile, "Talha, Founder of Maxterz", link to /about. Waiting on your approval (TODO).
12. **FAQ (new, brief item 11):** the 6 brief questions; the cost answer reads live prices. Answers in the server HTML and in FAQPage schema.
13. **CTASection.**

Deferred to Phase 5 on purpose: selected work (4 case studies), the logo animation showreel and video testimonials. Their old components read placeholder rows (D36) and are no longer on the home page.

## 3. Shared changes

- `ProofBar`: the 4 brief badges with SVG icons (also on /free-website-audit).
- `getReviews(null, n)` returns all published reviews, featured first. General reviews are no longer added twice when a page asks for "general".
- `src/lib/reviews.js`: one attribution helper for every review card. Service pages now say "Logo animation review on Fiverr" in readable grey (it was 2.5:1).
- /packages: the 6 "Services from £X" cards link to their service pages and use proper link text ("See AI prices", not "See ai and automation prices"); delivery times read "from receiving your content"; the end section gained WhatsApp and the free audit link. Card prices name the core service (D42, proposed).
- /our-work (both hero buttons go there): invented "11,600+" and "7,100+" replaced with `SITE.proof`, rating now says "on Fiverr", "Masterpieces" removed, keyword H1 "Our Work". The rest of the page is Phase 5.
- Contrast on the 4 new pages and the Launch Kit page: badges and card titles in #c2410c, orange words on blue in #fdba74 (large text), faint labels darkened. H1s on /packages and the 4 new pages are visible in the first paint.
- Partner Plan: "ad spend up to £3,000 a month" in Supabase and pricing.json (the price book says a month; no price changed).
- routes.js: home schema lists FAQPage; updatedAt 13 Oct for the 7 pages; motion graphics description no longer promises "files for every platform".
- Removed the unused `TrustStats` component (it said "MAXTERZ" and read placeholder rows).

## 4. Checks

- `npm run build`: exit 0, 49 pages; all 7 pages static with 5-minute ISR.
- `npm run lint`: exit 0. `npm run test:pricing`: 9 of 9.
- Server HTML on all 7 pages: one H1, title 41 to 57 characters, description 125 to 152, canonical, FAQ answers visible and equal to the schema, no banned words or characters, no rating without "on Fiverr", no Calendly links in the body.
- 375px: no horizontal scroll on the 7 pages or /free-website-audit.
- Prices checked against Supabase: Starter £795 (value £1,325, save £530, 40%), Launch £1,995 (value £3,480, save £1,485, 43%), Scale £4,995 (value £9,420, save £4,425, 47%), monthly from £495.

## 5. Fresh review

A fresh reviewer checked the change set against the brief, the inventory, D25 to D41, the facts and the rendered HTML. It confirmed: locked copy word for word, one H1 and SEO ranges on all 7 pages, FAQ answers visible and equal to the schema, no rating or review schema, no typed prices, savings equal to the Supabase rows, founding price only while switched on, no banned words or characters, inbound links to the 4 new pages, no horizontal scroll at 375px.

| Finding | Fixed |
|---|---|
| MUST: hero fallback was a 610KB animated WebP that never stopped (no pause, ignored reduced motion, preloaded in full) | Yes: 92KB MP4 and poster, pause button, reduced motion, WebP deleted |
| MUST: "See ai and automation prices" on /packages | Yes: link text per card |
| MUST: "Our Verified Track Record" over a founder figure | Yes: "Our Track Record" |
| SHOULD: 21 working days without "from receiving your content" | Yes: Launch Kit block and /packages |
| SHOULD: Partner Plan ad spend cap read as a total | Yes: "a month" (Supabase and pricing.json) |
| SHOULD: "Talha leads every project" | Yes: "looks after every client" (Why choose us, founder note) |
| SHOULD: home reviews without date or service | Yes |
| SHOULD: "Review on Fiverr" at 2.5:1 on service pages | Yes: grey 600 plus the service name |
| SHOULD: contrast on the 4 new pages and the Launch Kit timeline | Yes |
| SHOULD: stats labels at 10px | Yes: 14px |
| SHOULD: /our-work invented numbers and banned word | Yes (minimum fix; page rebuilt in Phase 5) |
| SHOULD: H1 hidden until hydration on /packages and the 4 new pages | Yes. The 13 Phase 4A pages still fade in: Phase 6 |
| SHOULD: cost FAQs on service pages give no figures | No: one helper for all 17 pages in Phase 6 (FAQ rich results are not shown for agencies, so this is for AI answers, not snippets) |
| SHOULD: name eSIMfo on the motion graphics page | No: waiting for your yes to name eSIMfo (TODO) |
| SHOULD: terms page contradicts the new FAQs (payment split, copyright) | No: the Phase 5 legal rewrite must match the FAQs and the price book |
| SHOULD: CTASection orange gradient fails contrast (2.7 to 3.0:1) on every page | No: your colour call, Phase 6. Recommended: #c2410c to #9a3412 |
| NICE: generic "See what is included" links | Yes: hidden context text |
| NICE: /packages end CTA without WhatsApp and audit | Yes |
| NICE: home schema url with a trailing slash | Yes |
| NICE: open-ended "we revise the edit" promise | Yes: "the number of revision rounds is set in your quote" until you answer |
| NICE: unused CaseStudies, VideoTestimonials, RecentProjects, TrustBar; raw img in gated sections; "✓" characters on /book and /free-website-audit | Phase 5 and the Phase 6 content pass |


## 6. Left for later

- Strip images for all 15 service pages and the home hero slides (TODO). ffmpeg 6.0 works for MP4 and GIF originals: `C:/Users/haree/AppData/Local/Temp/claude/C--Users-haree-Desktop-Data-Max-website-Maxterz/37f4050c-bfde-4aa8-a499-a57cd41add58/scratchpad/ffmpeg-dl/ffmpeg.exe`. Run `FFMPEG_PATH=<that path> npm run upload:hero home` after writing `alt.json` in the folder. If the temp folder was cleaned, download ffmpeg-static b6.0 (win32-x64) again; Talha approved a temporary copy on 12 Oct.
- 7 FAQ answers waiting on Talha (revision rounds and inclusions; TODO).
- Founder note approval, D41 to D43, and the home section order (TODO).
- Phase 5 must: rebuild /our-work and the case studies (the home has no client-work proof until then); rewrite the terms to match the FAQs (50% to start and 50% before launch, 40/30/30 on the Scale Kit, files and code yours on final payment); every founding-client video testimonial says it was given for a discount (CMA guidance under the DMCC Act 2024).
- Phase 6: footer and breadcrumb links are 20px tall (WCAG 2.5.8 passes on spacing, but the site rule is 44px); several pages nest a `<main>` inside the layout's `<main>` (book, contact pages and others, not 4B pages); the navbar logo is preloaded next to the hero image; orange contrast list from 4A.

## 7. Preview

- 4A commit 1c1a956: https://maxterz-49otiw5f5-maxterz.vercel.app (Vercel login needed).
- 4B commit 3b457c9: https://maxterz-4top5lhl6-maxterz.vercel.app (Vercel login needed). Build succeeded on Vercel.
- Latest launch branch, always current: https://maxterz-git-launch-maxterz.vercel.app (Vercel login needed).
