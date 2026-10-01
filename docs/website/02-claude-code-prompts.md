# Claude Code Prompts: Copy, Paste, Review, Continue

This is what you paste into Claude Code, phase by phase. The full spec is `MAXTERZ_BUILD_BRIEF.md` in this folder. Claude Code reads it itself, so these prompts stay short.

---

## Step 1. Set-up (2 minutes, once)

Claude Code already has the repo in the Maxterz folder, with `docs/` and `CLAUDE.md` at the root. It commits them itself and creates the `launch` branch in the kickoff prompt below.

1. Open Claude Code in the Maxterz folder (the repo root).
2. Paste the Kickoff prompt.

Good to know: pushing `docs/` to main triggers a Vercel production build of the current site. That is harmless, because docs do not change the site. After that, every push to `launch` gives you a Vercel preview link to review each phase.

---

## Step 2. Kickoff (git set-up + Phase 0, read-only)

```
You are the lead engineer finalising the Maxterz agency website for launch on https://maxterz.com on Wednesday 7 October 2026. The goal: a site that turns visitors into booked calls, with the strongest technical SEO foundation possible.

The docs folder is docs/ in this repo (called DOCS in the brief).

PART A. Git set-up (do this first)
1. Run git status and git branch. Note the current branch and every changed or untracked file.
2. Switch to main and bring it up to date with origin (git pull --ff-only). If main has diverged from origin, stop and tell me.
3. Stage ONLY the docs/ folder and CLAUDE.md. Do not stage any other changed file (for example files under .agents/ or .claude/); list them in your summary instead. Confirm no .env file or secret is staged.
4. Commit on main with the message "docs: add Maxterz strategy docs, build brief and Claude Code rules" and push main to origin.
5. Create a branch called launch from main, switch to it and push it with tracking (git push -u origin launch).
6. From now on every commit goes to launch. Never commit to main, never force-push, never rewrite history.

PART B. Phase 0 (read-only audit)
7. Read these files fully before doing anything else:
   - CLAUDE.md at the repo root
   - DOCS/website/MAXTERZ_BUILD_BRIEF.md
   - DOCS/website/01-site-audit.md
   - DOCS/02-business-profile.md
   - DOCS/03-decisions.md
   - DOCS/05-offers.md (price book v3, locked) and DOCS/website/data/pricing.json
8. Run Phase 0 only (Part 10 of the brief). Do not change any application code.
9. Write DOCS/launch/phase-0-report.md, add an entry to DOCS/launch/CHANGELOG.md, and add everything you need from me to DOCS/launch/TODO-talha.md. Commit these files on launch with the message "docs: phase 0 audit and launch plan" and push.
10. Stop and give me a summary in 10 lines or fewer: the git result (commits, branch, any files you left out), the biggest risks, anything in the brief that conflicts with the code, and the questions I must answer before Phase 1.

Think hard about the plan. Quality over speed. Do not start Phase 1 until I write "continue with Phase 1".
```

**Your review (5 minutes):** read the summary and the TODO list. Answer its questions in the chat. If it found a conflict with the brief, decide and tell it.

---

## Step 3. Phase prompts

Paste one per day. Each ends with a report and a stop.

### Phase 1. Technical SEO foundation
```
Continue with Phase 1 (Technical SEO foundation) from the brief, using the plan in DOCS/launch/phase-0-report.md. Follow Part 8 exactly, including the titles, descriptions and H1s in 8.3.

Before you finish:
- Run npm run build and npm run lint.
- Run the production build locally and check the raw HTML (not the browser DOM) of /, /services/branding-design and /services/video-animation/logo-animation: title, meta description, canonical, one full H1, JSON-LD present and valid JSON.
- Confirm /robots.txt and /sitemap.xml return 200 with the right content.
Then write DOCS/launch/phase-1-report.md (before and after table), update CHANGELOG and TODO-talha, commit, push to launch, put the Vercel preview link in the report, and stop.
```
**Your review:** open the preview deployment, right-click, View Page Source on the home page. Search for "canonical" and "ld+json". Both should be there.

### Phase 2. Navigation, redirects and new routes
```
Continue with Phase 2 (Navigation, redirects and routes) from the brief. Build the header, mega menu, mobile menu, footer with the exact legal bar, global breadcrumbs, and all redirects in 6.3 (host rules first, in next.config). Create the /services hub and scaffold every new route in 6.2 with its metadata and H1. Remove /shop.

Before you finish:
- List every internal link in the header and footer and confirm each returns 200 without a redirect.
- Run next start and send requests with a custom Host header for maxterz.co.uk, www.maxterz.com, maxterz.vercel.app and maxterzhub.co.uk, including the path /. Every one must return a single 301 or 308 to https://maxterz.com with no loop.
Then write DOCS/launch/phase-2-report.md, update CHANGELOG and TODO-talha, commit, push to launch, put the Vercel preview link in the report, and stop.
```
**Your review:** click every menu and footer link on your phone and on desktop. Nothing should 404 or bounce through a redirect.

### Phase 3. Conversion and tracking
```
Continue with Phase 3 (Conversion and tracking) from the brief, Part 9. Show me the leads and testimonials table SQL in the chat and wait for my "apply" before running the migrations. Then seed testimonials from docs/website/data/fiverr-reviews.json, following the rules block in that file. All site email goes through Resend from info@maxterz.com.

Before you finish:
- Submit the contact form and the audit form 3 times each with test data. Confirm the rows in Supabase, the alert email, the auto-reply and the GA4 events in DebugView (or explain what needs my keys).
- Confirm the cookie banner blocks GA4 cookies until Accept, and that Reject works.
- Confirm the Calendly booking event fires and lands on /thank-you?type=call.
Then write DOCS/launch/phase-3-report.md, list the env vars I must set in Vercel, update CHANGELOG and TODO-talha, commit, push to launch, put the Vercel preview link in the report, and stop.
```
**Your review:** fill in every form yourself on your phone. Check your inbox and the Supabase leads table.

### Phase 4. Money pages
```
Continue with Phase 4 (Money pages) from the brief: home (7.2), services hub (7.3), 6 category hubs (7.4), 16 service pages (7.5), packages (7.6) and the Launch Kit page (7.6a), with the Supabase pricing tables, seed script and value tests from 11.1 first. Use only facts from DOCS/02-business-profile.md and prices from DOCS/05-offers.md. Follow the copy rules in Part 4 and CLAUDE.md strictly.

Work in this order and commit and push after each group: home, services hub and packages, then web, branding, video, social, AI, SEO.

Before you finish:
- Search all new copy for em dashes, en dashes, arrows, emojis and the banned words. Fix every hit.
- Confirm every page matches its row in 8.3 and has Service schema with the right "from" price.
Then write DOCS/launch/phase-4-report.md with a list of every page and its word count, update CHANGELOG and TODO-talha, and stop.
```
**Your review:** read the home page and 3 service pages out loud. If a sentence sounds like an advert, mark it. Send the list back to Claude Code with "rewrite these lines".

### Phase 5. Trust pages
```
Continue with Phase 5 (Trust pages) from the brief: about (7.8), reviews (7.9) using the testimonials table from Phase 3, our work and the case study template (7.7) including the Doovor case study, insights templates with 3 unpublished drafts (7.14, Part 13), legal pages (7.15) and the 404 page (7.16). Remove the placeholder posts and old blog routes.

Where you lack real content (headshot, reviews, Doovor status and details), build the section, mark it TODO(Talha), hide it from the rendered page until the data exists, and add it to TODO-talha.

Then write DOCS/launch/phase-5-report.md, update CHANGELOG and TODO-talha, commit, push to launch, put the Vercel preview link in the report, and stop.
```
**Your review:** check the About page photo and name, and the Reviews page. Send your LinkedIn URL, Doovor URL and screenshots, and any video testimonials with written permission.

### Phase 6. QA, speed and launch readiness
```
Continue with Phase 6 (QA, speed and launch readiness) from the brief. Build scripts/seo-audit.mjs exactly as in 11.2 and fix everything it reports. Run Lighthouse mobile on home, /services/web-development, /services/video-animation/logo-animation, /packages and one case study, and fix until every score meets the Definition of Done in Part 1. Run an axe accessibility check. Do the content pass in Phase 6.

Then write DOCS/launch/phase-6-report.md with the final scores and audit output, write DOCS/launch/launch-checklist.md from Part 12 with what is still open, update CHANGELOG, commit, open a pull request from the launch branch, and stop.
```
**Your review:** go through `launch-checklist.md` line by line on launch day.

---

## Useful prompts during the week

**When Claude Code drifts off the brief**
```
Stop. Re-read CLAUDE.md and the part of the brief for this phase. List anything you changed that the brief did not ask for, revert it, then continue the phase.
```

**When you want a change to copy**
```
Rewrite these lines on [page URL]. Keep the facts, follow the copy rules in CLAUDE.md, keep the H1 keyword, and show me before and after in a table before you save:
[paste lines]
```

**When you add a new fact or asset**
```
I added [fact or asset] to DOCS/02-business-profile.md. Update src/lib/site.js and every page that should use it, remove the related TODO(Talha) markers, log it in the CHANGELOG, and commit.
```

**After launch: add a new service page**
```
Add a new service page for [service] under /services/[category]/[slug], following the service page template (7.5) and all SEO rules in the brief. Propose the title, meta description, H1 and FAQ list first and wait for my approval before building.
```
