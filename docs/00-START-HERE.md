# Maxterz Docs: Start Here

Last updated: 2 October 2026

This folder is the single source of truth for building Maxterz. You, Claude and Claude Code all read and write here. If it is not in this folder, it is not decided.

**Current phase:** finalise the website and launch it on **maxterz.com** by **Wednesday 7 October 2026**.

---

## What is in here

| File | What it is | Use it when |
|---|---|---|
| `01-optimised-brief.md` | Your instructions, rewritten as a sharp operating brief | Paste into the Claude Project instructions once |
| `02-business-profile.md` | Verified facts, proof, links, legal details | Before writing any copy, bio, ad or profile |
| `03-decisions.md` | Every major decision, why, and its status | Before changing direction |
| `04-plan.md` | 7-day website sprint and 90-day growth plan | Every morning |
| `05-offers.md` | Price book v3 (locked): every service price, 3 packages, 3 monthly plans, upsells | Packages page, sales calls, ads |
| `website/data/pricing.json` | The same prices as data, used to seed the Supabase pricing tables | Seeding and price checks |
| `website/01-site-audit.md` | What is broken or weak on the current build | Context for the build |
| `website/MAXTERZ_BUILD_BRIEF.md` | The full spec Claude Code builds from | Claude Code reads it every session |
| `website/02-claude-code-prompts.md` | The prompts you paste, phase by phase | Day 1 to Day 7 |
| `../CLAUDE.md` (repo root) | Standing rules for Claude Code, loaded every session | Already in place |
| `launch/CHANGELOG.md` | What has been done, newest first | Check progress |
| `launch/TODO-talha.md` | Everything waiting on you | Clear it daily |
| `launch/phase-N-report.md` | Claude Code's report after each phase | Review before you say "continue" |
| `launch/launch-checklist.md` | Created in Phase 6: what is left before go-live | Launch day |
| `website/data/fiverr-reviews.json` | 33 curated Fiverr reviews, ready to seed the site | Reviews, home and service pages |
| `website/data/pricing-research-2026-10.md` | UK market price research with sources | When prices are questioned |
| `website/data/old-indexed-urls.md` | Old URLs Google has indexed and where each one redirects | Phase 2 and launch day |
| `assets/` | Inbox for your files (headshot, logos, videos). Claude Code moves optimised copies into the site | Drop new assets here |

---

## Who writes what

| File | Talha | Claude (strategy) | Claude Code (build) |
|---|---|---|---|
| Business profile, offers, optimised brief | Edit | Edit on request | Read only |
| Decisions | Edit, approve | Edit | Append as "Proposed" |
| Plan | Edit | Edit | Tick tasks |
| Build brief, CLAUDE.md | Edit | Edit | Read only |
| `launch/` folder | Read, tick | Read | Write freely |

---

## Do this today

1. Paste the "continue with Phase 1" message into Claude Code. Read each `launch/phase-N-report.md` before you say "continue".
2. Clear `launch/TODO-talha.md`, starting with the info@maxterz.com mailbox, Resend and Vercel Pro.
3. Answer the open questions at the bottom of `03-decisions.md`.

---

## The 5 decisions that matter most right now

1. **maxterz.com is the agency domain.** maxterz.co.uk redirects to it, path for path.
2. **One flagship offer: Launch Kit.** Brand, website, Google profile, 3 social set-ups and 5 posts for £1,995 plus Care Plus at £145 a month. First 5 clients pay £1,495 for a video testimonial and case study. Full price book locked (D25): Starter Kit £795, Scale Kit £4,995, monthly plans from £495. Prices live in Supabase (D29).
3. **One primary CTA everywhere:** book a free strategy call on /book.
4. **Six service categories, 16 service pages, plus the Launch Kit page.** No thin pages, no city pages yet.
5. **Nothing fake ships.** Every number is verified and every review says "on Fiverr".
