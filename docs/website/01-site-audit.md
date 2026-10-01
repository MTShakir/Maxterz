# Site Audit: maxterz.vercel.app

Checked on 30 September 2026 by fetching the live server HTML of 31 URLs (grouped in the table at the end). This is what Google sees today.

**Verdict:** strong base. Next.js App Router, pages render on the server, good new service pages. The gaps are technical SEO basics, legacy pages that break trust, and a conversion path that leaks. All fixable in one week.

---

## What is already good

- Server-side rendering works. Page text is in the HTML, so Google can read it.
- New service pages are rich (11,000 to 12,500 characters of text) with sensible titles.
- Service and BreadcrumbList schema on 3 pages.
- GA4 installed (G-893VQWSMR6).
- Clean URL pattern for services: /services/{category}/{service}.
- llms.txt exists.
- 4 case studies with their own pages.

---

## Critical (fix before launch)

| # | Issue | Where | Impact |
|---|---|---|---|
| C1 | **No robots.txt** (returns 404) | /robots.txt | Crawlers get no rules and no sitemap pointer |
| C2 | **No sitemap.xml** (returns 404) | /sitemap.xml | Google has to guess which pages exist |
| C3 | **No canonical tags on any page** | All pages | Duplicate risk between maxterz.vercel.app, maxterz.co.uk, maxterz.com and URL parameters |
| C4 | **Staging domain is indexable** | maxterz.vercel.app | Google can index a full duplicate of your site |
| C5 | **No Organization or WebSite schema** | Homepage | Google and AI assistants cannot tie the site to MAXTERZ LTD, Fiverr, Instagram and the rest |
| C6 | **Broken H1s**: rotating words are missing from the server HTML and lines join without spaces | Video, Social, AI, SEO pages | Google reads "Motion Is Not a Medium.It Is Your", "Your Business.Running", "Get Found.Get Clicked." |
| C7 | **Typo in an H1**: "Your Brand Is a Feeling Before Is a Design." | /services/branding-design | Missing word "It". Looks careless on the page that sells design |
| C8 | **Broken and legacy footer links**: /about-us (404), /services/design, /services/animations, /services/websites, /services/video-editing, /services/ai-tech, /portfolio, /blogs | Footer on every page | Every page leaks crawl budget into redirects and a 404 |
| C9 | **/services has no page.** It redirects, and "View All Services" points to the web development page | /services | Missing hub for the whole service section |
| C10 | **Conflicting proof numbers**: homepage says 4.8 stars, service pages say 4.9, About says "500+ projects, 350+ clients, 5+ years, 98% satisfaction" | Home, About | Contradicts 10,000+ projects and 7,000+ reviews. Breaks trust and UK advertising rules |
| C11 | **Reviews not attributed to Fiverr** in meta descriptions ("4.9 stars from 7,100 verified reviews") | Service pages | Misleading under the DMCC Act 2024 unless the source is clear |
| C12 | **Packages page shows no packages or prices** in the server HTML | /packages | The page that should close buyers says nothing. If prices load in the browser, Google cannot see them either |

---

## High (fix during the sprint)

| # | Issue | Where |
|---|---|---|
| H1 | Old template pages still in the old voice: "premium creative studio", "MAXTERZ" in capitals, "Let's Build Something Amazing" | About, Contact, Insights, Shop, Privacy, Terms |
| H2 | Contact form dropdown is outdated (Web Development, Branding, Animation, Video Editing, Other). No budget, timeline or website fields | /contact |
| H3 | "Book a Free Call" in the homepage hero has no link in the server HTML (it may open a popup). Primary CTAs should be real links | Homepage |
| H4 | Main booking CTAs send visitors off-site to Calendly | Site-wide |
| H5 | Blog has 6 placeholder posts dated January 2025 at /blogs/1 to /blogs/6 (numeric URLs, generic topics, "MAXTERZ Team" author) | /insights |
| H6 | Shop page is "coming soon" | /shop |
| H7 | 404 page reuses the homepage title and description | All 404s |
| H8 | `<html lang="en">` should be `en-GB` | All pages |
| H9 | Homepage title is keyword-stuffed: "Maxterz \| Websites and Apps \| SEO London \| Brand Strategy" | Homepage |
| H10 | Weak or generic meta descriptions on legacy pages ("Start your project with MAXTERZ today.") | About, Contact, Insights |
| H11 | Logo loads as a PNG from Supabase storage and is preloaded on every page | Header |
| H12 | Flag emoji in the trust bar | Homepage |
| H13 | GA4 loads in the head of every page. Confirm it waits for cookie consent (UK GDPR and PECR) | Site-wide |
| H14 | Menu label "Contact US" | Header |

---

## Medium (fix if time allows, else week 2)

- Case study "Logo & Graphic Design" is generic. Replace with a named client project.
- No Doovor case study, the best proof that Maxterz builds real software.
- No founder presence anywhere (name, photo, story). Weak E-E-A-T for a service business.
- No reviews page, despite 7,000+ reviews being the biggest trust asset.
- No free audit or lead magnet page for ads and outreach.
- No thank-you page, so conversions cannot be tracked cleanly.
- llms.txt lists legacy pages and titles. Regenerate after launch.

---

## Other domains found in Google

| Domain | What is there | Action |
|---|---|---|
| maxterz.com | Old single page: thumbnails, "I am a full stack developer" | **Becomes the production domain (D01).** Move the thumbnail content to ThumbLab first |
| maxterz.co.uk | Indexed with the new site title | 301 every path to the same path on maxterz.com, then Search Console Change of Address |
| maxterzhub.co.uk | Old WordPress site, pages still indexed (services, portfolio, short video ads) | 301 each old URL to its closest new page |
| behance.net/maxterz | Titled "ThumbLab by Maxterz" | Rename to Maxterz, or split into two profiles |

---

## URLs checked

| URL | Status | Note |
|---|---|---|
| / | 200 | No schema, no canonical |
| /services | Redirect | No hub page |
| /packages | 200 | No packages in HTML |
| /our-work | 200 | H1 "Selected Masterpieces" has no keyword |
| /portfolio | Redirect | Footer link |
| /about | 200 | Old template and unverified stats |
| /about-us | 404 | Footer link |
| /shop | 200 | Coming soon |
| /insights | 200 | 6 placeholder posts |
| /blogs, /blogs/1 | Redirect | Footer link, numeric URLs |
| /contact | 200 | Old template |
| /services/web-development | 200 | Service + Breadcrumb schema |
| /services/web-development/business-website-design | 200 | Service + Breadcrumb schema |
| /services/branding-design | 200 | H1 typo |
| /services/video-animation | 200 | Broken H1 |
| /services/social-media-management | 200 | Broken H1, no schema |
| /services/ai-automation | 200 | Broken H1, no schema |
| /services/seo-digital-marketing | 200 | Broken H1, no schema |
| /services/design, /animations, /websites, /video-editing, /ai-tech | Redirect | Legacy footer links |
| /case-studies/bwld | 200 | No schema |
| /privacy-policy, /terms-conditions | 200 | Old template |
| /robots.txt, /sitemap.xml | 404 | Missing |
| /llms.txt | 200 | Present |
