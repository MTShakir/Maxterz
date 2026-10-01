# Maxterz Website: Standing Rules for Claude Code

Claude Code loads this file at the start of every session. It lives at the repo root (the Maxterz folder).

## Context
- Maxterz agency website. Next.js 15.5 App Router, React 18, Supabase, Vercel. GitHub: MTShakir/Maxterz.
- **JavaScript, not TypeScript** (`jsconfig.json`). Write `.js` and `.jsx` with JSDoc types. Source in `src/` (`src/app`, `src/components`, `src/lib`).
- Production: https://maxterz.com. maxterz.co.uk, www and maxterz.vercel.app redirect to it.
- Launch date: Wednesday 7 October 2026.
- Docs folder (called DOCS below): `docs/` at the repo root. Strategy, decisions, the build brief and launch logs all live there.

## Start of every session
1. Read `DOCS/website/MAXTERZ_BUILD_BRIEF.md` (the spec).
2. Read `DOCS/launch/CHANGELOG.md` (what is done) and `DOCS/launch/TODO-talha.md` (what is waiting on Talha).
3. For facts use `DOCS/02-business-profile.md`. For decisions `DOCS/03-decisions.md`. For prices `DOCS/05-offers.md`.
4. Work on the current phase only. If unsure which phase, ask.

## Assets from Talha
- Talha drops raw files in `DOCS/assets/` (headshot, logos, videos). Copy optimised versions into `public/` with descriptive names, then log it in the CHANGELOG. Never edit the originals.
- Reviews seed data: `DOCS/website/data/fiverr-reviews.json`. Follow its `rules` block.

## Email
- Public email: info@maxterz.com. All site email goes through Resend from info@maxterz.com, transactional only.

## Git
- Work on the `launch` branch. At the end of each phase, commit with the message from the brief and push to origin launch. Put the Vercel preview link in the phase report.
- Never commit to main during the sprint. Never force-push or rewrite history. Talha approves the merge of launch into main on launch day.
- Stage specific paths. Leave unrelated files (for example `.agents/`, `.claude/`) alone. Never commit `.env` files or secrets.
- Use `git --no-optional-locks status` for read-only checks.

## Pricing
- Prices are locked in `DOCS/05-offers.md` v3 and `DOCS/website/data/pricing.json`. On the site, every price comes from the Supabase pricing tables (brief 11.1), seeded from `pricing.json`.
- Never hard-code a price in a component. Package values and savings are calculated from their items, never typed by hand.
- Price edits in Supabase must go live with no code change or redeploy (on-demand revalidation, tag `pricing`).

## Locked copy
- The homepage hero and the 5-vs-1 section use the exact words in brief section 7.2 (D28). Change layout, never the words.

## Writing to DOCS
- Free to write: anything in `DOCS/launch/`, and ticking tasks in `DOCS/04-plan.md`.
- Append only, with status **Proposed**: new decisions at the end of `DOCS/03-decisions.md`.
- Read only unless Talha asks: `02-business-profile.md`, `05-offers.md`, `01-optimised-brief.md`, the build brief.
- CHANGELOG entries: newest first, with date, phase, what changed, files touched.

## Workflow
- One phase at a time. End each phase with: `npm run build` and `npm run lint` green, a report in `DOCS/launch/phase-N-report.md`, a CHANGELOG entry, a commit, then stop.
- Read existing code before changing it. Reuse components, the Supabase client and Tailwind tokens.
- Never drop or truncate Supabase tables or delete rows. New migrations only. Show the SQL before applying.
- No major version upgrades of Next.js or React. New dependencies only if the brief allows them.
- Single sources of truth: `src/lib/site.js` for facts, `src/lib/routes.js` for every route's SEO data.

## Facts and claims
- Use only facts from `src/lib/site.js` and the business profile. Missing facts get `TODO(Talha): what is needed` and a line in `DOCS/launch/TODO-talha.md`.
- Never invent numbers, clients, testimonials, results, awards or team members.
- Every rating or review count says "on Fiverr". The rating is 4.9 everywhere.

## Copy rules
- British English. Clear, direct, active voice. Short sentences. Flesch reading ease 80+.
- **No em dashes, no en dashes, no arrows, no emojis** in copy, metadata or alt text.
- No adverbs where avoidable. Banned: leverage, synergy, cutting-edge, world-class, revolutionise, unlock, elevate, seamless, game-changer, masterpiece, innovative solutions, next-level, supercharge, skyrocket.
- Calm and confident, not salesy. Write "Maxterz", not "MAXTERZ" (except the legal bar).
- Worldwide framing ("businesses", "clients"). "UK-registered" is a trust signal, used sparingly.

## SEO rules for every indexable page
- Server-rendered content. No client-side fetching of anything search engines should read.
- Exactly one H1 with the primary keyword, full text in the server HTML.
- Title (30 to 60 characters) and meta description (120 to 158) from `src/lib/routes.js`, set with `buildMetadata`.
- Absolute self-canonical on https://maxterz.com, no query string.
- JSON-LD graph via the `JsonLd` component. No AggregateRating or Review schema about Maxterz.
- Global breadcrumbs (never add breadcrumbs inside a page).
- At least 2 internal links in and 2 out, descriptive anchors.
- Primary CTA above the fold and a CTASection at the end.
- Images via `next/image` with alt text and dimensions. Only the hero image gets `priority` (`preload` on Next.js 16).
- Use the APIs of the installed Next.js version (15.5).

## UI rules
- Buttons `rounded-full`. Primary gradient #1044ff to #0020bf. Accent #e7811e to #e7581e for highlights only.
- Backgrounds #efefef and #ffffff. Hero: white with a muted grey dot or grid pattern.
- Mobile-first. Tap targets at least 44px. Body text at least 16px. Respect `prefers-reduced-motion`.
- WCAG 2.2 AA.

## Commands
- `npm run dev`, `npm run build` (runs `tools/generate-llms.js` first), `npm run start`, `npm run lint`
- `npm run seo:audit` (after Phase 6 creates it)
