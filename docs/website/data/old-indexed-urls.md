# Old Indexed URLs and Their Redirects

Source: Google Search Console, maxterz.co.uk property, Pages report, indexed pages. Supplied by Talha on 2 October 2026.

Claude Code uses this file in Phase 2. Every URL below must reach its final page on maxterz.com in one permanent redirect, and that page must return 200.

## maxterz.co.uk (9 indexed pages)

| Old URL | Last crawled | Final URL |
|---|---|---|
| https://maxterz.co.uk/ | 18 Sep 2026 | https://maxterz.com/ |
| https://maxterz.co.uk/blogs | 29 Aug 2026 | https://maxterz.com/insights |
| https://maxterz.co.uk/services | 12 Aug 2026 | https://maxterz.com/services (the new hub, so the old /services redirect must go) |
| https://maxterz.co.uk/privacy-policy | 12 Aug 2026 | https://maxterz.com/privacy-policy |
| https://maxterz.co.uk/services/websites | 20 Jul 2026 | https://maxterz.com/services/web-development |
| https://maxterz.co.uk/portfolio | 12 Jul 2026 | https://maxterz.com/our-work |
| https://maxterz.co.uk/services/branding | 6 Jul 2026 | https://maxterz.com/services/branding-design |
| https://maxterz.co.uk/shop | 3 Jul 2026 | https://maxterz.com/packages |
| https://maxterz.co.uk/contact | 2 Jul 2026 | https://maxterz.com/contact |

## maxterz.com (old ThumbLab page)

The old maxterz.com was a single page at /. The new homepage replaces it. ThumbLab now lives at https://thumblab.maxterz.com, and /services/branding-design/thumbnail-design links to it. No other indexed paths are known. If the maxterz.com Search Console property shows more after verification, add them here and to brief 6.3.

## maxterzhub.co.uk (old WordPress site)

Already mapped in brief 6.3, host rule 1. Nothing extra here.

## How to build it (Phase 2)

- Keep one array of path rules in `next.config.mjs` (brief 6.3). Build the host rules for maxterz.co.uk, www.maxterz.co.uk, www.maxterz.com and maxterz.vercel.app from that same array, each pointing to the final absolute URL on https://maxterz.com, and place them before the `/:path*` catch-all for those hosts.
- Result: old URLs reach the final page in one hop instead of two, and the two lists can never drift apart.
- Next.js sends 308 for `permanent: true`. Google treats 308 the same as 301. Keep it.

## Test (Phase 2, and again on launch day)

For every old URL above, test against `next start` with a `Host` header (Phase 2) or against the live domain (launch day):

- First response is 308 (or 301) and `Location` equals the final URL.
- The final URL returns 200, is self-canonical and indexable.
- Put the result table in the phase report.

## After launch (Talha, week 2)

- Search Console, maxterz.co.uk property: Settings, Change of Address, to maxterz.com.
- maxterz.com property: submit the sitemap, then run URL Inspection on the 9 final URLs above and request indexing.
- Keep maxterz.co.uk renewed and redirecting for good. Never let it lapse.
