# Maxterz Decision Log

Every major decision, the reason behind it, and its status. Before changing direction, read the reason. If the reason no longer holds, log a new decision below with the date.

Status key: **Decided** (act on it), **Confirm** (my recommendation, needs your yes), **Under discussion** (open, options below), **Later** (parked with a trigger).

---

## Summary

| ID | Decision | Status |
|---|---|---|
| D01 | maxterz.com is the only agency domain, maxterz.co.uk redirects to it | Decided (30 Sep, Talha) |
| D02 | Position as "your entire digital team under one roof", sell first to UK service businesses | Decided |
| D03 | Flagship offer: Launch Kit, £1,995 + £145/month Care Plus, founding price £1,495 for the first 5 | Decided and locked (1 Oct, Talha) |
| D04 | 6 service categories, 16 service pages at launch (video editing added) | Superseded by D31 |
| D05 | Keep the current URL pattern | Decided |
| D06 | ThumbLab stays on thumblab.maxterz.com; maxterz.com keeps a thumbnail service page | Decided (1 Oct, Talha) |
| D07 | Fiverr stays as a revenue and proof channel, no off-platform moves | Decided |
| D08 | Publish every price: service tiers, 3 packages, 3 monthly plans | Decided (1 Oct, Talha asked for it) |
| D09 | One primary CTA: book a free strategy call | Decided |
| D10 | Remove the shop, placeholder blog posts and unverified stats | Decided |
| D11 | No review star schema for our own business | Decided |
| D12 | Stay on Next.js + Supabase + Vercel, upgrade only when needed | Decided (1 Oct, Talha), with one flag |
| D13 | Tracking stack with UK-compliant consent | Decided |
| D14 | Google Business Profile as a service-area business | Decided |
| D15 | Allow AI crawlers, keep llms.txt but do not rely on it | Decided |
| D16 | Launch on Wednesday 7 October 2026, ads no earlier than week 3 | Date superseded by D34; ads rule holds |
| D17 | Leads go to Supabase, email alert, then HubSpot free CRM | Decided |
| D18 | No city pages at launch, industry pages from week 4 | Later |
| D19 | Be open about the remote team | Decided |
| D20 | Cold outreach follows UK PECR rules | Decided |
| D21 | Maxterz/docs is the shared workspace for Talha, Claude and Claude Code | Decided |
| D22 | Email runs on info@maxterz.com; Resend sends transactional email only | Decided (1 Oct, Talha) |
| D23 | AI receptionist is an upsell, sold with a demo only after Maxterz runs its own | Decided (1 Oct, Talha) |
| D24 | Founder-led trust: real name, real photo, real reviews, named clients only with permission | Decided |
| D25 | Price book v3: proof-building prices at about half of UK agency rates; packages 40 to 47% below a la carte | Locked (1 Oct, Talha) |
| D26 | Git: Claude Code works on a `launch` branch and commits after each phase | Decided (1 Oct) |
| D27 | Show prices: fixed work priced, custom work "from", every card leads to a call | Decided (1 Oct, Talha) |
| D28 | Homepage hero and 5-vs-1 copy locked word for word | Locked (1 Oct, Talha) |
| D29 | All prices live in Supabase; edits go live with no code change or redeploy | Decided (1 Oct, Talha) |
| D30 | Keep the existing page designs, improve them in place | Locked (2 Oct, Talha) |
| D31 | Service page map v2: 17 pages (6 category pages, 11 service pages) | Decided (3 Oct, Talha) |
| D32 | Hero strips in one `hero_slides` table; WebP stills, MP4 animations, no GIF or PNG | Decided (3 Oct) |
| D33 | New Supabase publishable and secret keys; info@ and talha@ mailboxes | Decided (5 Oct) |
| D34 | Launch as soon as Phase 6 passes, no fixed date | Decided (5 Oct, Talha) |
| D35 | One chat for strategy and build | Decided (12 Oct, Talha) |
| D36 | All existing Supabase content is placeholder: hidden or replaced, never shown | Decided (12 Oct, Talha) |
| D37 | Package names locked: Starter Kit, Launch Kit, Scale Kit | Decided (12 Oct, Talha delegated) |
| D38 | MM Window Cleaning received the full Launch Kit set: it is the Launch Kit proof | Decided (13 Oct, Talha) |
| D39 | /packages shows packages and plans only, plus "Services from £X" cards | Decided (13 Oct, Talha) |
| D40 | Partner Plan £2,495 a month (was £1,995) | Decided (13 Oct, Talha) |
| D41 | Stripe Payment Links for the 4 Buy now items now; Stripe API checkout later, with a trigger | Proposed (13 Oct, Claude Code) |

---

## D01. One agency domain: maxterz.com (updated 30 Sep 2026, Talha's call, agreed)
- **Decision:** maxterz.com is the canonical domain (https, no www, no trailing slash). maxterz.co.uk, both www versions, maxterz.vercel.app and maxterzhub.co.uk all 301 to maxterz.com. Same path to same path wherever the page exists, closest page otherwise.
- **Why .com:** .co.uk is a country-code domain, so Google reads it as UK-focused. .com is neutral and can rank in every market you serve. UK buyers accept .com without a second thought, and "UK-registered company" in the footer, About page and schema keeps the local trust.
- **Why now:** the new site has not built authority on maxterz.co.uk yet. Switching before launch costs almost nothing. Switching in six months would cost rankings.
- **Rules for the switch:**
  1. Path-to-path 301s from maxterz.co.uk to maxterz.com (host rules in next.config).
  2. After launch, verify both domains in Google Search Console and use the Change of Address tool from maxterz.co.uk to maxterz.com.
  3. Keep maxterz.co.uk registered and renewing for at least 2 years so the redirects never break. Talha owns every domain involved.
  4. ThumbLab already lives at thumblab.maxterz.com. Any old ThumbLab URLs still indexed on maxterz.com get a 301 to their ThumbLab equivalent.
  5. Email moves to info@maxterz.com before launch (D22). info@maxterz.co.uk forwards to it for at least 12 months.
  6. When DNS changes, touch only web records. Keep MX, SPF, DKIM and DMARC so email keeps working.
- **Your action:** set up the info@maxterz.com mailbox and the forward from info@maxterz.co.uk before launch.

## D02. Positioning and first market
- **Decision:** Brand promise stays "Your entire digital team under one roof". Paid ads and outreach target UK service businesses that depend on calls and enquiries. Website copy stays worldwide-friendly.
- **Why:** Our website proof is in local service businesses (MM Window Cleaning, Areeka O Karak, BWLD). The pain (missed calls, weak sites, invisible on Maps) is easy to show in one screenshot. These owners pay monthly once they trust you. One market makes ads, content and scripts sharper.

## D03. Flagship offer: Launch Kit (Decided, 1 Oct 2026)
- **Decision (Talha chose all four recommendations):**
  1. **Market:** small UK service businesses that are new or look dated online. Businesses with a strong logo get a brand refresh.
  2. **Logo and guidelines:** included in the price and shown in the value stack. Never called "free".
  3. **Monthly:** Care Plus from launch day (hosting, security, small edits, Google profile management), 3-month minimum then rolling.
  4. **Founding price** for the first 5 clients, in return for a video testimonial and a case study.
- **Prices locked 1 Oct (D25):** Launch Kit **£1,995**, founding price **£1,495** for the first 5 clients, Care Plus **£145 a month**. Talha judged the first research-based prices too high for a new agency with no UK case studies yet, and the price book was rebuilt at proof-building levels.
- **What is inside:** brand identity (Core), website up to 10 pages, Google Business Profile, 3 social accounts set up, 5 launch posts. Value £3,480 (calculated). Live in 21 working days. Full details in 05-offers.md.
- **Upsells during the project:** logo animation, social media, local SEO, and the AI receptionist once Maxterz runs its own (D23).
- **Why:** it sells the skills Maxterz is known for, at agency prices instead of Fiverr prices. It creates recurring revenue from the first client, and the founding price buys the case studies and video proof the agency needs.
- **Offer page:** /packages/launch-kit, built in Phase 4. "Launch Kit" is a working name.

## D04. Six categories, 16 service pages (Superseded by D31, 3 Oct 2026)
- **Decision:** Keep the 6 categories already built. Launch with these service pages:
  - Web and App: business website design, ecommerce website design, app design (new), mobile app development
  - Branding: logo design, brand identity design (new), social media design (new), thumbnail design
  - Video: logo animation, motion graphics (new), explainer videos, video editing for reels, shorts, talking head and YouTube (new, added 1 Oct)
  - AI: AI receptionist (new), AI chat agents (new)
  - SEO: SEO services (already built), local SEO (new)
  - Social media management: category page only
- **Why:** These match your service list exactly. Every page has real proof behind it. Eleven categories with thin pages would weaken the whole site. Custom software, paid ads, video editing and workflow automation live as sections inside their category pages until they earn their own page.

## D05. Keep the current URL pattern
- **Decision:** /services/{category}/{service}, /case-studies/{slug}, /our-work, /packages, /insights/{slug}.
- **Why:** The pattern is clean, and changing URLs one week before launch adds risk for no gain. Only legacy and duplicate URLs get redirected.

## D06. ThumbLab and thumbnail SEO (Decided, 1 Oct 2026)
- **Decision:** ThumbLab stays a separate site at https://thumblab.maxterz.com with its own Instagram. maxterz.com keeps /services/branding-design/thumbnail-design as a service page that links to ThumbLab for orders.
- **SEO split:** the maxterz.com page targets "YouTube thumbnail design services" (businesses and agencies buying design). ThumbLab targets its own brand name and creators. Do not copy the same text onto both sites.
- **Why:** maxterz.com is the stronger domain for the service keyword. ThumbLab grows through Instagram and YouTube, where creators look.
- **Watch:** a SaaS product called "ThumbLab" sells on CodeCanyon. Check the name before investing in ThumbLab trademarks or ads.

## D07. Fiverr strategy
- **Decision:** Convert the Fiverr profile to an agency account, raise the lowest-tier prices, add premium packages, and keep it as a revenue stream and proof source. Never ask Fiverr buyers to move off-platform. Link to Fiverr from the website only on the Reviews page, as proof.
- **Why:** 7,000+ reviews is your biggest trust asset. Fiverr's terms ban off-platform contact and payment, and breaking them risks the account. Sending website visitors to Fiverr costs you 20% and loses the lead.

## D08. "From" prices on the website (Confirm)
- **Decision:** Show starting prices for every package (05-offers.md).
- **Why:** Small business owners want a ballpark before they book a call. Prices filter out poor-fit leads and make the booked calls warmer.

## D09. One primary call to action
- **Decision:** Primary CTA on every page: "Book a free strategy call", going to an on-site /book page with the calendar embedded. Secondary: "Get a free website audit". Third: WhatsApp.
- **Why:** One clear next step converts better than five. Keeping the calendar on our own page lets us track bookings and keep the visitor on the site.

## D10. Remove what hurts trust
- **Decision:** Remove /shop (redirect to /packages), the 6 placeholder blog posts dated 2025, the stats on the About page, the flag emoji, and every "coming soon" block. Insights stays out of the main menu until 3 real posts are live.
- **Why:** Thin, fake-looking or outdated content lowers trust for visitors and for Google. An empty shop tells buyers the business is unfinished.

## D11. No star-rating schema for our own business
- **Decision:** Show Fiverr reviews on the page with clear attribution. Do not add AggregateRating or Review schema about Maxterz itself.
- **Why:** Google does not show stars for self-serving reviews on Organization or LocalBusiness markup, and reviews collected on another platform do not qualify. Adding it invites a manual action for no gain.

## D12. Tech stack (Decided, 1 Oct 2026)
- **Decision:** Stay on Next.js App Router, Supabase and Vercel. Upgrade plans and frameworks only when there is a real need.
- **Flag (where I think you are wrong on one point):** Vercel's free Hobby plan is for non-commercial, personal use only. An agency website that sells services is commercial use, so the Pro plan (about $20 a month) is the "real need" from launch day. Staying on Hobby risks the project being paused with no warning, on the site that brings in clients.
- **Supabase:** the free plan is fine at launch. Upgrade when leads flow through it daily, because the free plan has no daily backups.

## D13. Tracking and consent
- **Decision:** GA4 (already installed, ID G-893VQWSMR6) with Google Consent Mode v2 and a cookie banner (Accept and Reject shown equally). Google Search Console, Bing Webmaster Tools, Microsoft Clarity after consent. Meta Pixel and Google Ads tags added in the ads phase, consent-gated.
- **Why:** UK GDPR and PECR require consent for non-essential cookies. You cannot run profitable ads without clean conversion data.

## D14. Google Business Profile
- **Decision:** Set up as a service-area business, address hidden, serving the UK.
- **Why:** Google does not accept registered office or virtual addresses as a storefront. A service-area profile is allowed, gets you reviews, and still appears for brand searches.

## D15. AI search visibility
- **Decision:** Allow all major AI crawlers in robots.txt. Keep llms.txt. Focus effort on what AI answers use: clear entity facts, consistent profiles, original content and third-party mentions.
- **Why:** Google's May 2026 guidance says AI search optimisation is still SEO and that llms.txt or special markup is not needed. It costs nothing to keep.

## D16. Launch timing
- **Decision:** Website live on maxterz.com by Wednesday 7 October 2026. Organic content starts week 2, outreach week 3. Paid ads start week 3 at the earliest, only after tracking is verified with real test leads.
- **Why:** Ads pointed at an unfinished site with broken tracking burn cash and teach you nothing.

## D17. Lead handling
- **Decision:** Every form writes to a Supabase `leads` table, sends an email alert to info@maxterz.com and an auto-reply to the lead (through Resend, D22). Week 2: connect HubSpot free CRM. Reply to every lead within 5 minutes in working hours.
- **Why:** Speed to lead is the cheapest conversion win in any agency.

## D18. Location and industry pages (Later)
- **Decision:** No city pages at launch. Build industry landing pages (trades, restaurants, clinics) from week 4 as ad destinations. A London page only after we have London clients to show.
- **Trigger:** first 3 case studies in one industry, or a paid campaign that needs a dedicated landing page.
- **Why:** City pages without local proof are thin doorway pages and do not rank.

## D19. Be open about the team
- **Decision:** The About page says it plainly: UK-led, with a delivery team in Pakistan and India.
- **Why:** Honesty builds trust and explains fair pricing. Hiding it and getting found out loses the client and breaks consumer protection rules.

## D20. Cold outreach rules (UK)
- **Decision:** Cold email only to limited companies and LLPs (corporate subscribers), always with a clear opt-out. Sole traders and partnerships need consent first. Screen every number against TPS and CTPS before cold calls. Send cold email from a separate domain to protect maxterz.com.
- **Why:** PECR allows B2B email to corporate subscribers with an opt-out. Fines and a burned main domain cost more than any campaign returns.

## D21. One shared docs folder
- **Decision:** Every strategy file, brief and build log lives in `Maxterz/docs` on Talha's computer. Claude (this workspace) and Claude Code both read and write there.
- **Write rules for Claude Code:**
  - Free to write: `docs/launch/` (phase reports, CHANGELOG, TODO list), and ticking tasks in `04-plan.md`.
  - Append only, marked **Proposed**: new entries in `03-decisions.md`. Talha changes the status to Decided.
  - Read only unless Talha asks: `02-business-profile.md`, `05-offers.md`, `01-optimised-brief.md`, the build brief and CLAUDE.md.
- **Why:** one source of truth. No copies drifting apart between chats, the repo and the folder.

## D22. Email: info@maxterz.com and Resend (Decided, 1 Oct 2026)
- **Decision:** info@maxterz.com is the public email everywhere: website, schema, profiles, signatures, invoices. Resend sends the website's transactional email from it: lead alerts, auto-replies, booking confirmations and opt-in follow-ups.
- **Rules:**
  - Resend never sends cold email. Cold outreach uses its own domain and tool (D20). Resend's terms ban unsolicited email, and one spam complaint wave can damage maxterz.com's sender reputation.
  - Set up SPF, DKIM and DMARC for maxterz.com before launch. Resend gives the DNS records.
  - The inbox (where info@maxterz.com is read) and Resend (what the website sends) are two separate set-ups. Both need to work before launch.

## D25. Price book v3 (Locked by Talha, 1 October 2026)
- **Decision:** the full price book in 05-offers.md v3 and `docs/website/data/pricing.json`.
  - Service highlights: logo £195 / £395 / £795; brand identity £995 / £1,995; logo animation £295 / £595 / £1,195; websites from £1,295 (5 pages) and £1,995 (10 pages); landing pages from £495; social media management £395 / £695 / £1,295 a month; SEO £595 / £1,195 / £1,995 a month; short-form edits and thumbnails at £50 to try one or £1,195 for 30.
  - Packages: Starter Kit £795, Launch Kit £1,995 (founding £1,495), Scale Kit £4,995. Care Plus £145 a month on every website.
  - Monthly plans: Design Subscription £495 (Design + Video £895), Visibility Plan £795, Partner Plan £1,995.
- **Position:** proof-building prices at about half of typical UK agency rates, well above Fiverr. Packages 40 to 47% below the same services bought separately.
- **History:** v2 (research-based, about 30 to 50% below agency rates) was judged too high for a one-person agency moving from Fiverr with no UK case studies yet. Talha's Fiverr prices (£20 to £100) were judged too low for direct clients, because direct work carries calls, revisions and account management.
- **Price rise rule:** raise a service by 10 to 20% after every 10 sales, or when more than 4 in 10 qualified calls close in a month.

## D27. Show prices on the website (Decided, 1 Oct 2026)
- **Decision:** fixed work (logos, animation, websites, packages, monthly plans) shows its price. Custom work (apps, software, AI builds, large sites) shows "from £X, quoted after a free call". Every price card leads to "Book a free call", except 4 self-serve "Buy now" items.
- **Why:** many agencies hide prices because they sell custom work to bigger clients. Maxterz sells standard work to small businesses. Clear prices filter out poor-fit leads, build trust for a new agency, set Maxterz apart, and rank for "how much does X cost" searches.

## D28. Homepage copy locked (Locked by Talha, 1 Oct 2026)
- **Decision:** the hero and the 5-vs-1 section use the exact words in the build brief, section 7.2. Claude Code may change layout, not words.

## D29. Prices live in Supabase (Decided, 1 Oct 2026)
- **Decision:** all prices, packages and plans live in Supabase pricing tables, seeded from `pricing.json`. Talha edits prices in Supabase; a database webhook triggers on-demand revalidation, so changes are live in seconds with no code change or redeploy.


## D30. Keep the existing page designs (Locked by Talha, 2 Oct 2026)
- **Decision:** pages that are already built keep their layout, section order, visual style and components. Claude Code improves them in place for conversion and SEO. It never redesigns them.
- **What changes on existing pages:**
  1. Server-rendered content. Supabase reads move out of client components into the page (server) and pass down as props. Animations stay in client components.
  2. Prices. Each service page shows its own prices from the Supabase pricing tables (D29): tier cards if the service has tiers, one "from" line if not. The existing packages section keeps its design; only its data source changes. The old per-service tables (LogoDesignPackages and the rest) leave the code, not the database.
  3. Proof. Each service page shows the case study and portfolio projects for that exact service, not the whole category. No match: fall back to the category. Still none: hide the section.
  4. Hero. Add the "from" price line and the Book a free call button if missing. Every CTA points to /book.
  5. Copy, FAQ and schema fixes under the copy rules.
- **New pages:** the 9 service pages scaffolded in Phase 2 are built by copying the nearest existing service screen, so the site reads as one system. Examples: brand identity from logo design, video editing from thumbnail design (same pricing block), app design from mobile app development.
- **Brief 7.4 and 7.5** become a checklist of what each page must contain, not a section order. Missing items fit into the existing layout.
- **Why:** the design is done and Talha likes it. A rebuild costs days and adds risk before launch. The gains now come from prices, proof and speed.

## D31. Service page map v2 (Decided by Talha, 3 Oct 2026)
- **Decision:** 17 service pages: 6 category pages and 11 service pages. Full map, prices per page and redirects: `website/03-page-inventory.md`.
  - Web: Business Websites, Ecommerce Stores, Apps and Software (moves to /services/web-development/app-and-software-development and covers app design and custom software). The separate app design page is dropped.
  - Branding: Logo Design, Brand Identity (new), Social Media Design (new), Thumbnail Design.
  - Video: Logo Animation, Motion Graphics (new), Explainer Videos, Video Editing (new).
  - Social Media Management, AI and Automation, SEO and Digital Marketing: one page each, no service pages. The AI page sells the AI chat agent with a price and takes everything else as a quote.
- **Names:** menu labels are sitewide anchor text, so they use the search terms: Web Design and Development, Website Design, Ecommerce Website Design, App and Software Development. The AI and SEO pages take over the keywords of the pages they absorbed (AI chatbots, local SEO). Full table in the inventory. Only the apps page URL moves, because its scope changed.
- **Hero image strips:** one `hero_slides` table replaces the 7 slide tables, read on the server.
- **Proof:** recent work and case studies wait for the portfolio (Phase 5). Until then no page shows work from the wrong service.
- **Later:** a dedicated AI receptionist page once Maxterz runs its own (D23), and a Local SEO page once there is a local SEO case study. Both are strong search terms.
- **Why:** fewer, stronger pages launch faster and rank better than thin ones. Every page now has real prices behind it.

## D32. Hero strips and media formats (Decided, 3 Oct 2026)
- **Decision:** hero strips stay in Supabase, as one `hero_slides` table read on the server, not 7 tables read in the browser. Stills are WebP, animations are muted MP4 with a WebP poster. No GIFs or PNGs on the site. Talha drops originals in `docs/assets/hero/`; Claude Code converts and uploads.
- **Why:** swap images without a deploy and edit them from a future admin dashboard, with the same speed as static files once the page is rendered on the server and cached. MP4 is 5 to 10 times lighter than GIF, which protects page speed and conversions.

## D33. Supabase keys and email set-up (Decided, 5 Oct 2026)
- **Supabase keys:** use the new publishable and secret keys, not the legacy anon and service_role keys. Supabase ends the legacy keys at the end of 2026, and the new ones can be rotated one at a time without downtime. Secret keys also refuse to work from a browser.
  - Env names: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (public) and `SUPABASE_SECRET_KEY` (server only, Sensitive on Vercel).
  - One secret key per place: one named `vercel` for Production and Preview, one named `local` for `.env.local`. A leak then only forces one rotation.
  - Keep the legacy keys active until launch day: the current live site on maxterz.co.uk is built with the anon key. Deactivate them after the new site is live (reversible in the dashboard).
- **Email:** two real mailboxes: info@maxterz.com (public address, forms, Resend sender) and talha@maxterz.com (proposals, follow-ups and client threads; buyers reply more to a named founder than to info@). support@, accounts@ and privacy@ are free aliases into info@. Turn off the catch-all once the aliases exist: it collects spam sent to random names and hides real mail. Keep the other 3 mailbox slots for the first hires. Cold email never goes from maxterz.com (separate domain, plan week 2).
- **Twilio:** not needed for launch. Decide in week 2 with the AI receptionist (D23): pick the voice platform first, and only open Twilio if that platform needs it.

## D26. Git workflow (Decided, 1 Oct 2026)
- **Decision:** Claude Code commits `docs/` and `CLAUDE.md` to main once, then creates a `launch` branch. All sprint work happens on `launch`, with a commit after each phase. Each push gives a Vercel preview link for review. `launch` merges into main on launch day.
- **Why:** main stays deployable at all times, and every phase can be reviewed or rolled back.

## D23. AI receptionist as an upsell (Decided, 1 Oct 2026)
- **Decision:** The AI receptionist is offered as an upsell during projects, not inside the starting offer. The service pages stay live because they bring in demand.
- **Condition:** before selling it, Maxterz runs its own AI receptionist on the Maxterz number. That gives a live demo, real call recordings for content, and the know-how to deliver.
- **Why:** selling a service you have not run yourself is the fastest way to lose a client and a review.

## D24. Founder-led trust (Decided)
- **Decision:** The About page shows Muhammad Talha Shakir, with his real photo and story. Reviews show real Fiverr usernames and countries. Clients in Talha's portfolio list (02-business-profile.md, section 3a) are shown with their name and a link. Video testimonials go live only with written permission; placeholders until then. Road2Olympia and Crave are not named. Client budgets are never published.
- **Why:** In a crowded agency market, a real founder with a face and a track record is the strongest trust signal a small agency has.

---

## Answered on 1 October 2026
- ThumbLab: thumblab.maxterz.com, kept separate (D06).
- Founder: Muhammad Talha Shakir, called Talha, designer name "Max" (anyone can use it). LinkedIn: linkedin.com/in/mtshakir. Headshot in `docs/assets/founder/`.
- VAT: not registered. Prices show no VAT.
- AI: one AI chatbot built (Black and White Leaflets Distribution). No calling agent yet (D23).
- Domains: Talha owns all of them.
- Portfolio: 8 client websites, a restaurant system, eSIMfo ads, Doovor (02-business-profile.md, section 3a). 5 video testimonials, placeholders until permission arrives.
- BWLD is Black and White Leaflets Distribution.
- Doovor: live at doovor.com with beta users. Placeholder images until screenshots arrive.
- Flagship offer: Launch Kit, all four recommendations accepted (D03).
- Pricing: price book v3 locked (D25). Homepage copy locked (D28). Prices live in Supabase (D29).

## Open questions for Talha
1. **MM Window Cleaning:** your list "3 social profiles, website, lead form, social post designs, Google Business Profile, logo design and logo animation" sat under the restaurant line in your message. Confirm it belongs to MM Window Cleaning. **Answered 13 Oct: yes (D38).**
2. **Display names:** how should dixonsamanagement.com and adnights.com appear on the site?
3. **Video testimonials:** send the files and each client's written OK. Placeholders stay hidden on the live site until then.
4. **Doovor:** 3 to 5 screenshots and a one-paragraph summary.

Open questions and recommendations from 12 Oct onwards live in `launch/TODO-talha.md`, in phase order.

---

## D34. Launch date: as soon as Phase 6 passes (Decided by Talha, 5 Oct 2026)
- **Decision:** the site launches as soon as Phase 6 passes. No fixed date, and no corners cut to hit one. This replaces the 7 October date in D16. The rest of D16 holds: organic content from week 2, outreach from week 3, paid ads only after tracking is verified with real test leads.
- **Why:** a launch with missing proof or broken tracking costs more than a few days' delay.
- **Logged on 12 Oct:** the decision was recorded in CLAUDE.md, the brief and the plan on 5 Oct, but not here.

## D35. One chat for strategy and build (Decided by Talha, 12 Oct 2026)
- **Decision:** Talha works with Claude Code in one chat for strategy and build. The separate strategy workspace is retired. Claude Code acts as the agency operator: it leads with a recommendation, questions decisions that cost returns, and records every decision made in chat here and in the doc it changes, in the same turn (CLAUDE.md, "Your role").
- **Changes D21:** when Talha makes a decision in chat, Claude Code also updates the business profile, offers, brief or inventory it affects. Without a decision from Talha, those files stay read only.
- **Why:** one place for decisions and build. No hand-offs between two chats and no copies drifting apart.

## D36. Existing Supabase content is placeholder (Decided by Talha, 12 Oct 2026)
- **Decision:** every row in the current Supabase tables and storage is placeholder content: portfolio, case studies, testimonials, video testimonials, trust stats, why choose us, the old package tables, the slide tables and hero images. None of it is shown on the new site.
  - Hidden now from public reads: `portfolio_projects` and `video_testimonials` (the live old site reads `portfolio_projects`). Nothing deleted. Undo: the same policy with `using (true)`.
  - `hero_slides` starts empty and is filled only from Talha's originals. The old slide rows are not copied across (this replaces that step in inventory section 4).
  - Real data replaces the rest: prices from `pricing.json` and reviews from `fiverr-reviews.json` in Phase 4A; portfolio and case studies from `portfolio.csv` and Talha's answers in Phase 5.
  - Old tables stay in the database, unused by the new code. No rows are deleted.
- **Why:** nothing fake ships (D24). Made-up testimonials are banned under the DMCC Act 2024, and invented client work misleads buyers.

## D37. Package names locked: Starter Kit, Launch Kit, Scale Kit (Decided 12 Oct 2026, Talha delegated the call)
- **Decision:** the three package names stay. This ends the "working name" status in D03 and in `05-offers.md` section 10.
- **Why:** the names show a clear path (start, launch, scale). "Launch Kit" is short and ownable in ads, and the /packages/launch-kit URL, ads and outreach depend on it. The page titles and H1s carry the search terms ("brand, website and Google"), so the name does not have to.

## D38. MM Window Cleaning is the Launch Kit proof (Decided by Talha, 13 Oct 2026)
- **Decision:** MM Window Cleaning received the full Launch Kit set: logo, logo animation, website with lead form, 3 social profiles, post designs and Google Business Profile set-up. The Launch Kit page uses it as the proof line, and the home page shows it as a case study.
- **Why:** real proof that the exact package has been delivered is the strongest line on an offer page.

## D39. /packages sells packages and plans; service prices live on service pages (Decided by Talha, 13 Oct 2026)
- **Decision:** /packages shows the 3 packages, the 3 monthly plans, Care Plus and 6 "Services from £X" cards that link to the service pages. It no longer lists all 57 price items. Every price stays public on its own service page (D27 holds), including the "Buy now" items. Replaces brief 7.6 item 5.
- **Why:** £30 and £50 items next to a £4,995 package pull buyers to the cheapest option and away from the packages. Three clear choices convert better than a long menu, and each service price sits on the page that ranks for "how much does X cost".

## D40. Partner Plan £2,495 a month (Decided by Talha, 13 Oct 2026)
- **Decision:** the Partner Plan rises from £1,995 to £2,495 a month. Value stays £3,520 (calculated), so the saving is £1,025 (29%). Changes the Partner price in D25 and `05-offers.md` section 4. Live in Supabase and `pricing.json` the same day.
- **Why:** £1,995 sat below the UK range for a full outsourced retainer (£2,000 to £3,500) while it includes more than most: SEO, social on 3 platforms, ads on 2 platforms, design and video, care and fortnightly calls with Talha. The higher price protects margin on the heaviest plan, and as the top anchor it makes the Visibility Plan look like the sensible choice.

## D41. Stripe: Payment Links now, API checkout later (Proposed by Claude Code, 13 Oct 2026)
- **Context:** Talha's Stripe account is set up and approved. He asked whether to use the Stripe API for pricing and payments on the site instead of Payment Links.
- **Proposal:** use 4 Stripe Payment Links for the 4 Buy now items (price book 2.8). No Stripe keys on the website. Deposits, Care Plus and monthly plans are billed with Stripe invoices and subscriptions from the dashboard. Supabase stays the only source of displayed prices (D29); Stripe only collects money.
- **Price rule:** a Buy now price changes in two places on the same day: the Supabase row and a new Stripe Payment Link at the new price (then update the env var). The amount charged must always equal the advertised price (consumer law).
- **Trigger to build API checkout:** about 10 self-serve orders a month, or the wish to take card deposits and Care Plus subscriptions on the site. Then build Stripe Checkout Sessions created from the Supabase price, with a verified webhook that writes orders to Supabase.
- **Why:** links need no code, no secret keys and no webhook to secure, and they work today. An API checkout costs a build, testing and a second place that holds prices, for items that have not sold yet.
