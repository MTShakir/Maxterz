# Waiting on Talha

Claude Code adds items here during the build. Tick them off and add a note on where the asset is.

## Decisions
- [x] Price book v3 locked: services, packages and monthly plans (1 Oct)
- [x] Homepage hero and 5-vs-1 copy locked (1 Oct)
- [ ] Confirm the MM Window Cleaning deliverables list (logo, logo animation, website with lead form, 3 social profiles, post designs, Google profile)
- [ ] Display names for dixonsamanagement.com and adnights.com
- [x] Flagship offer structure: Launch Kit (1 Oct, D03)
- [x] "Max" on the About page: yes, it is Talha's designer name (1 Oct)
- [x] AI work so far: 1 AI chatbot for BWLD, no calling agent (1 Oct)
- [x] ThumbLab: thumblab.maxterz.com, kept separate (1 Oct)
- [x] Founder name: Muhammad Talha Shakir, called Talha (1 Oct)
- [x] VAT: not registered (1 Oct)
- [x] Domains: all owned (1 Oct)
- [x] Doovor: live at doovor.com with beta users (1 Oct)
- [x] BWLD = Black and White Leaflets Distribution (1 Oct)

## Assets
- [x] Headshot: `docs/assets/founder/` (1 Oct)
- [x] Fiverr reviews: `docs/website/data/fiverr-reviews.json`, 33 curated (1 Oct)
- [x] LinkedIn: https://www.linkedin.com/in/mtshakir (1 Oct)
- [x] Portfolio list with links: `02-business-profile.md`, section 3a (1 Oct)
- [ ] 5 video testimonials (BWLD, MM Window Cleaning, Quick Action Sudan, Mikey Official, Awais Creations) plus each client's written OK. Placeholders until then
- [ ] Doovor: 3 to 5 screenshots and a one-paragraph summary
- [ ] Logo as SVG (plus a 512x512 PNG)
- [ ] Best portfolio images and videos per service, compressed
- [ ] Logo animation showreel (MP4, under 2MB for the loop) and a poster image
- [ ] eSIMfo: the 2 ad videos (or links) for the portfolio card
- [ ] One example website audit video thumbnail

## Accounts and settings
- [ ] info@maxterz.com mailbox live, with info@maxterz.co.uk forwarding to it
- [ ] Resend account, maxterz.com verified (SPF, DKIM, DMARC)
- [ ] Vercel Pro plan (needed for a commercial site, see D12)
- [ ] Stripe Payment Links: Logo Design Essential (£195), Logo Animation Essential (£295), Thumbnail try one (£50), Short-form edit try one (£50)
- [ ] Supabase database webhook on the pricing tables, pointing to /api/revalidate (Claude Code gives you the exact URL and secret in Phase 4)
- [ ] Microsoft Clarity project ID
- [ ] Google Search Console Domain property for maxterz.com (verified by DNS TXT record) and maxterz.co.uk
- [ ] ICO data protection fee paid (registration number for the privacy policy)
- [ ] Director identity verified with Companies House (before 13 Nov 2026)

## Phase 0 additions (2 Oct 2026)
- [ ] **Supabase MCP access:** the Maxterz Supabase project (qcsflpsyzvigswlotepz) is NOT connected to the Claude Code MCP session. Only the Doovor project is accessible. Phase 3 and 4 migrations will need the Supabase dashboard unless you reconnect the MCP. Check your MCP server config and confirm access before Phase 3.
- [ ] **Old maxterz.com indexed URLs:** the old single-page thumbnail site was live on maxterz.com before the new site. Open Google Search Console (the old property for maxterz.com), go to the Pages report, and send Claude Code any indexed paths. Redirect rules will be added so that search equity is not lost at launch.
- [ ] **Headshot to public folder:** before Phase 5, copy `docs/assets/founder/muhammad-talha-shakir-800.webp` (and the 400px version) to `public/images/team/`. Claude Code will use them on the About page and in schema.
