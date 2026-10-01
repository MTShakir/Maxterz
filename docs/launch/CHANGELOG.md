# Launch Changelog

Newest first. Every entry: date, phase, what changed, files touched. Claude Code writes here after every phase.

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
