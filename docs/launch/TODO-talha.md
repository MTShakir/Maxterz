# Waiting on Talha

Ordered by what blocks the next phase. Next phase: **4A** (pricing tables, `hero_slides`, the 13 built pages). Done items are at the bottom. Tick an item and note where the file is. Never paste secret keys in chat.

Rewritten 12 Oct 2026 by Claude Code.

---

## Blocks Phase 4A (next)

- [ ] **Strip images, 11 built pages.** All old strips were placeholders (D36), so every page needs its own set. Folders in `docs/assets/hero/`: web-development, business-website-design, ecommerce-website-design (optional), app-and-software-development, branding-design, logo-design, thumbnail-design, video-animation, logo-animation, explainer-videos, social-media-management. Any format and size (PNG, JPG, WebP, or SVG with text outlined). 3:2 landscape is best; other shapes are cropped from the centre. Animations: MP4 only (no YouTube for strips). 6 to 10 per page, named 01, 02, 03 in display order. A strip stays hidden until its page has images.

## Blocks Phase 4B

- [ ] **Stripe.** Account for MAXTERZ LTD (business bank account, statement descriptor MAXTERZ, no tax). 4 Payment Links in GBP: Logo Design Essential £195, Logo Animation Essential £295, YouTube Thumbnail try one £50, Short-form Edit try one £50. On each link: collect name, email and phone, add a field "Business or channel name", require acceptance of your terms (https://maxterz.com/terms-conditions) and redirect after payment to `https://maxterz.com/thank-you?type=purchase`. Send the 4 links in chat (they are public). Vercel names: `NEXT_PUBLIC_STRIPE_LINK_LOGO_DESIGN`, `NEXT_PUBLIC_STRIPE_LINK_LOGO_ANIMATION`, `NEXT_PUBLIC_STRIPE_LINK_THUMBNAIL`, `NEXT_PUBLIC_STRIPE_LINK_SHORT_EDIT`. Buy now buttons stay hidden until set.
- [ ] **Strip images, 4 new pages.** Folders `brand-identity-design` (full identity systems: logo, cards, signage, social, guidelines; never logos alone, or the page looks like the £195 logo page), `social-media-design`, `motion-graphics`, `video-editing`. Same spec as the built pages.
- [ ] **Home hero visual.** Today it shows your Maxterz logo animation GIF, with stock photos as a fallback (stock goes). Recommended: 1 to 3 device mockups of finished client work (a website on laptop and phone, the brand on cards), because Launch Kit buyers want to see a brand and website, not a logo reveal. Folder `docs/assets/hero/home/`.

## Blocks Phase 5 (proof and trust pages)

- [ ] **Portfolio list.** Copy `docs/website/data/portfolio-template.csv` to `portfolio.csv`. One row per project (the 10 in business profile section 3a), service tags from page inventory section 6, `permission_to_name` yes or no for each. This is the proof on every service page. Without it, those sections stay hidden at launch.
- [ ] **Portfolio files.** `docs/assets/portfolio/{project_slug}/`: a cover (at least 1600 px wide, 16:10), gallery 01, 02, 03 (websites: full-page desktop and mobile screenshots) and MP4 originals for video work. Biggest originals, not compressed.
- [ ] **Case studies: BWLD, MM Window Cleaning, Areeka O Karak, Doovor.** 5 answers each, in a `notes.md` in the project folder: the problem before Maxterz, what we delivered, timeline, results the client confirmed (none if none), a quote with permission to publish.
- [ ] **Display names** for dixonsamanagement.com and adnights.com.
- [ ] **Doovor.** 3 to 5 screenshots and one paragraph (what it does, who it is for, beta status) in `docs/assets/portfolio/doovor/`.
- [ ] **eSIMfo.** The 2 ad videos (MP4 originals) and a yes to name eSIMfo, in `docs/assets/portfolio/esimfo/`.
- [ ] **Logo animation showreel.** The original MP4 of the 1.2M-view animation plus 5 to 8 of your best logo animations (originals, only work you may show publicly) in `docs/assets/portfolio/logo-animation-showreel/`. Claude Code makes the web loop (under 2MB) and the poster. Used on home and the logo animation page.
- [ ] **Example audit video.** One real 2 to 4 minute audit (Loom link or MP4) of a public UK service business website, no private data, in `docs/assets/portfolio/example-audit/`. It is the proof on the free audit page.
- [ ] **Video testimonials (optional for launch).** For each of the 5 clients: `testimonial.mp4` plus their written OK (email screenshot or PDF) in that client's portfolio folder. None show on the live site without the OK.
- [ ] **Review drafts.** About story, founder note (3 lines) and case study copy. Claude Code drafts them from the docs; you approve before Phase 5 closes.

## Blocks Phase 6 (QA and launch readiness)

- [ ] **Vercel Pro** (about $20 a month). Hobby is for non-commercial use only (D12). Do it now.
- [ ] **Google Search Console.** Domain properties for maxterz.com and maxterz.co.uk, verified by DNS TXT record. Do it now: the maxterz.com property shows any old URLs still in Google, and they go into the redirect tests. Export its Pages report into `docs/website/data/`.
- [ ] **Microsoft Clarity.** New project for https://maxterz.com. Send the project ID in chat (it is public) and add it in Vercel as `NEXT_PUBLIC_CLARITY_ID`. Needed to test that Clarity waits for consent.
- [ ] **Calendly.** Rename the event to "Free strategy call", send booking alerts to talha@, connect the calendar you use, add 15-minute buffers and 3 questions: website URL, what you need help with, budget range. Every call then arrives qualified.
- [ ] **DNS and hosting facts.** Which company runs DNS for maxterz.com, maxterz.co.uk and maxterzhub.co.uk; where the old maxterz.co.uk site and the old maxterz.com page are hosted; what thumblab.maxterz.com points to. Claude Code writes the exact launch-day records so email and ThumbLab keep working.
- [ ] **Legal review.** Have the privacy policy, terms and cookie policy drafts (end of Phase 5) checked by a solicitor or a legal review service. The terms must cover the 14-day cancellation right for consumers who use Buy now.
- [ ] **Your QA pass.** Proofread every page on your phone. Submit one test on each form from a Gmail address (it shows whether the auto-reply lands in the inbox) and make one test booking.

## Launch day (after Phase 6 passes)

- [ ] **Domains in Vercel:** maxterz.com (primary), www.maxterz.com, maxterz.co.uk, www.maxterz.co.uk, maxterzhub.co.uk and www.maxterzhub.co.uk. Change web records only (A and CNAME). Keep MX, SPF, DKIM, DMARC and the thumblab record. Send a test email to info@maxterz.com and info@maxterz.co.uk after every change.
- [ ] **Vercel env check:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, `REVALIDATE_SECRET` (Claude Code generates it), `NEXT_PUBLIC_CLARITY_ID` and the 4 Stripe links.
- [ ] **Price webhook.** Say "apply" and Claude Code creates it in Supabase: the pricing tables and testimonials call /api/revalidate with the secret. Test: change one price and see it on /packages within a minute.
- [ ] **Search Console and Bing.** Submit the sitemap, inspect home and 5 key pages, then run Change of Address from maxterz.co.uk to maxterz.com. Bing Webmaster Tools: import from Search Console.
- [ ] **GA4.** Mark `generate_lead` and `book_call` as key events, link Search Console and set data retention to 14 months (the default is 2).
- [ ] **Supabase.** Deactivate the legacy anon and service_role keys once the new site is live (D33). Move to the Pro plan (about $25 a month) for daily backups: leads are the most valuable data the business holds.
- [ ] **Profiles.** Same name, one-line description, logo and maxterz.com link on Instagram, Facebook, LinkedIn (company and yours), X, TikTok and Behance (rename it from "ThumbLab by Maxterz"). Not on Fiverr: outside links break Fiverr's rules (D07).
- [ ] **Email signatures** for info@ and talha@: MAXTERZ LTD, company number 16822859 and the registered office address. UK law requires these details on company emails.
- [ ] **Auto-renew** maxterz.co.uk and maxterzhub.co.uk for at least 2 years.

## Before your first client (target 31 Oct)

- [ ] **Services agreement** (England and Wales) that matches the site terms: deposits, IP transfer on final payment, revision rounds, Care Plus 3-month minimum, founding client consent for the video testimonial and case study. Claude Code drafts it; a solicitor checks it.
- [ ] **Professional indemnity insurance.**
- [ ] **Business bank account and Stripe billing** for deposit invoices and monthly plans (Stripe takes cards and Bacs Direct Debit).
- [ ] **HubSpot free CRM** with the pipeline in `04-plan.md`. Count founding places there and switch `founding_enabled` off in Supabase the day the fifth signs.
- [ ] **Proposal template and discovery call script.** Claude Code can draft both.

## Dated

- [ ] **By 13 Nov 2026:** verify your identity with Companies House (GOV.UK One Login), then file the confirmation statement.

## After launch

- [ ] **Google Business Profile** as a service-area business with the address hidden (D14). Verify with an address where you work or live, never 128 City Road: Google suspends virtual office addresses. Start early, verification can take days.
- [ ] **AI receptionist.** Pick the voice platform and run it on your number (D23, D33). Then the AI page gets a demo block and, later, its own page (D31).
- [ ] **DMARC** to `p=quarantine` about a month after launch, once mail from the mailbox and Resend passes.

---

## Done

- [x] Price book v3 locked: services, packages and monthly plans (1 Oct)
- [x] Homepage hero and 5-vs-1 copy locked (1 Oct)
- [x] Flagship offer structure: Launch Kit (1 Oct, D03)
- [x] "Max" on the About page: yes, Talha's designer name (1 Oct)
- [x] AI work so far: 1 AI chatbot for BWLD, no calling agent (1 Oct)
- [x] ThumbLab: thumblab.maxterz.com, kept separate (1 Oct)
- [x] Founder name: Muhammad Talha Shakir, called Talha (1 Oct)
- [x] VAT: not registered (1 Oct)
- [x] Domains: all owned (1 Oct)
- [x] Doovor: live at doovor.com with beta users (1 Oct)
- [x] BWLD = Black and White Leaflets Distribution (1 Oct)
- [x] Headshot: `docs/assets/founder/` (1 Oct). Claude Code copies it to `public/images/team/` in Phase 5 (a Claude Code task, not yours)
- [x] Fiverr reviews: `docs/website/data/fiverr-reviews.json`, 33 curated (1 Oct). Claude Code seeds them in 4A
- [x] LinkedIn: https://www.linkedin.com/in/mtshakir (1 Oct)
- [x] Portfolio list with links: `02-business-profile.md`, section 3a (1 Oct)
- [x] Logo as SVG and 512px PNG: `docs/assets/logo/`, copied into `public/` and `src/app/` (2 Oct)
- [x] Supabase MCP access: connected as `supabase-maxterz` (2 Oct)
- [x] Old indexed URLs: `docs/website/data/old-indexed-urls.md` (2 Oct)
- [x] ICO registered: ZC165156 (4 Oct). Claude Code adds it to `src/lib/site.js`, the privacy policy and the footer legal bar
- [x] Mailboxes info@ and talha@, aliases support@, accounts@ and privacy@ (5 Oct). Check the catch-all is off
- [x] Resend account, maxterz.com verified, DMARC `p=none` (5 Oct)
- [x] Supabase new keys (5 Oct): publishable key in Vercel and `.env.local`; secret key `vercel` in Vercel (Sensitive), `local` in `.env.local`. Legacy keys stay active until launch day
- [x] Strategy docs committed on the launch branch (12 Oct, e50c528)
- [x] Placeholder projects and video testimonials hidden from public reads (12 Oct). All existing Supabase content is placeholder (D36)
- [x] Package names locked: Starter Kit, Launch Kit, Scale Kit (12 Oct, D37). All 5 founding places open
- [x] Line endings: `.gitattributes` added (12 Oct, 6966bef)
- [x] Migrations applied: pricing tables, `hero_slides`, `hero-slides` bucket, reviews `is_published` (12 Oct). 57 prices seeded, 33 real reviews live
- [x] ffmpeg: temporary copy approved for strip videos (12 Oct)
- [x] Resend API keys in Vercel and `.env.local` (12 Oct). Test leads: saved, alerts and auto-replies sent. The audit auto-reply landed in spam once (sent from info@ to itself; subject made calmer). Retest from a Gmail address in Phase 6
- [x] MM Window Cleaning received the full Launch Kit set (13 Oct, D38)
- [x] /packages shows packages and plans only, plus "Services from £X" cards (13 Oct, D39)
- [x] Partner Plan £2,495 a month (13 Oct, D40). Live in Supabase
