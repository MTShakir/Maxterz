# Page Inventory and Service Page Map (v2)

Checked against the code on the `launch` branch (commit 5e64d7c) and Talha's page plan of 3 October 2026 (D31). Read with D30: built pages keep their layout, Claude Code improves them in place.

---

## 1. Service page map: 17 pages (6 category pages, 11 service pages)

| Category | Menu label | URL | Status | Build from | Prices shown (pricing.json ids) |
|---|---|---|---|---|---|
| Web | Web Development | /services/web-development | Built | | Lowest "from" price of each service page below |
| Web | Business Websites | /services/web-development/business-website-design | Built | | landing-basic, landing-conversion, website-5, website-10, website-25, copywriting (add-on) |
| Web | Ecommerce Stores | /services/web-development/ecommerce-website-design | Built | | shopify-store, custom-store |
| Web | Apps and Software | /services/web-development/app-and-software-development | Built as mobile-app-development. Move to the new URL, rewrite copy for apps and custom software | | app-design, custom-software |
| Branding | Branding and Design | /services/branding-design | Built | | Lowest "from" per service page, business-card, stationery-set |
| Branding | Logo Design | /services/branding-design/logo-design | Built | | logo-essential, logo-professional, logo-signature |
| Branding | Brand Identity | /services/branding-design/brand-identity-design | **To build** | Logo design layout, exact. Own copy | brand-core, brand-complete, brand-guidelines |
| Branding | Social Media Design | /services/branding-design/social-media-design | **To build** | Logo design layout, exact. Own copy, plus a section that sends people to /services/social-media-management | social-templates, social-post |
| Branding | Thumbnail Design | /services/branding-design/thumbnail-design | Built | | thumbnail-single, thumbnail-pack-30, thumbnail-monthly |
| Video | Video and Animation | /services/video-animation | Built | | Lowest "from" per service page, voiceover (add-on) |
| Video | Logo Animation | /services/video-animation/logo-animation | Built | | logo-animation-essential, logo-animation-professional, logo-animation-premium |
| Video | Motion Graphics | /services/video-animation/motion-graphics | **To build** | /services/video-animation layout, customised as needed. Own copy | motion-15, motion-30, motion-60 |
| Video | Explainer Videos | /services/video-animation/explainer-videos | Built | | explainer-60, explainer-90 (show as "from") |
| Video | Video Editing | /services/video-animation/video-editing | **To build** | /services/video-animation layout, customised as needed. Own copy | short-edit-single, short-edit-pack-30, short-edit-monthly, long-form-edit |
| Social | Social Media Management | /services/social-media-management | Built. No service pages | | smm-starter, smm-growth, smm-premium |
| AI | AI and Automation | /services/ai-automation | Built. No service pages. Change the "Custom Software" card to "AI Receptionist". Add a prices section | | ai-chat-agent. Everything else: "Book a free call" for a quote |
| SEO | SEO and Digital Marketing | /services/seo-digital-marketing | Built. No service pages. Add a prices section | | Tier cards: local-seo, seo-growth, seo-authority. "Also available" list: seo-audit, seo-foundation, gbp-setup, gbp-management, blog-post, ads-management, lead-funnel |

Menu: AI and SEO show a one-line description instead of sub-links, the same way Social Media Management does.

### Names, H1s and why (D31)

Menu labels are the link text on every page of the site, so they work as internal anchor text for Google as well as signposts for buyers. They use the words UK buyers search. Creative lines stay on the page as the big headline; the H1 carries the keyword.

| Page | Menu label | H1 |
|---|---|---|
| Web category | Web Design and Development | Web Design and App Development That Wins You Clients |
| Business websites | Website Design | Business Website Design That Wins Enquiries |
| Ecommerce | Ecommerce Website Design | Shopify and Ecommerce Website Design (title: Shopify and Ecommerce Website Design \| Maxterz) |
| Apps and software | App and Software Development | App and Custom Software Development |
| AI | AI and Automation, with the line: AI chat agents for your website and WhatsApp, AI receptionists and workflow automation | AI Chatbots and Automation for Your Business (title: AI Chatbots and Automation for Business \| Maxterz). The page now holds the chatbot keyword the removed page had |
| SEO | SEO and Digital Marketing, with the line: SEO, local SEO, Google Business Profile and paid ads that bring enquiries | SEO and Local SEO Services That Bring Enquiries (title: SEO and Local SEO Services \| Maxterz). The page now holds the local SEO keyword |
| All other pages | Keep current label | Keep the H1 in routes.js |


Not shown on any service page (still used inside packages): social-setup, social-design-monthly, ai-receptionist, workflow-automation.

---

## 2. Removed pages and redirects (permanent)

| From | To |
|---|---|
| /services/web-development/mobile-app-development | /services/web-development/app-and-software-development |
| /services/web-development/app-design | /services/web-development/app-and-software-development |
| /services/ai-automation/ai-receptionist | /services/ai-automation |
| /services/ai-automation/ai-chat-agents | /services/ai-automation |
| /services/seo-digital-marketing/seo-services | /services/seo-digital-marketing |
| /services/seo-digital-marketing/local-seo | /services/seo-digital-marketing |

None of these were indexed by Google, so nothing is lost. Remove them from routes.js, the sitemap, the menu, the footer, breadcrumbs and every internal link. Add them to the shared path rules so the host rules send them to the final URL in one hop.

New metadata for the moved page:

| URL | Title | Description | H1 |
|---|---|---|---|
| /services/web-development/app-and-software-development | App and Software Development \| Maxterz | Custom apps, software and SaaS built around how your business runs. UI/UX design, build, launch and support from one team with one point of contact. | App and Custom Software Development |

---

## 3. How prices display

- Every price comes from the Supabase pricing tables (D29), matched on `service_page`. Never typed in a component.
- Items with a tier label: tier cards inside the page's existing prices section. Mark the popular one.
- Single items: one clear line each ("from £X"). Add-ons as a short list.
- Quote-only services: "Book a free call", no price.
- Category pages: the lowest "from" price of each service page in that category, as a card that links to it.
- Under every prices section: "Need something custom? Book a free call".

---

## 4. Hero image strips (D32)

- **One table, `hero_slides`:** page_path, media_type (image or video), image_url, video_url, poster_url, alt_text, display_order, active. It replaces the 7 slide tables. Copy their rows across and leave the old tables in the database.
- **Read on the server**, cached with a `slides` tag, refreshed by the same webhook as prices. No browser fetch.
- **Files in Supabase Storage**, bucket `hero-slides/{page-slug}/`. Images go through next/image (AVIF and WebP).
- **Stills:** WebP, 1200 x 800 (3:2; the card is 288 x 192 and the lightbox 576 wide), quality 80. Never PNG or SVG for work images.
- **Animations:** never GIF on the site. Each GIF becomes a muted MP4 (H.264), 720 x 480, 3 to 8 seconds, under 1MB, with a WebP poster. Videos play only while on screen.
- **Loading:** only the first visible slides load at once. Alt text names the project and the service.
- **Intake:** Talha drops originals in `docs/assets/hero/{page-slug}/` (see the README there): PNG 2400 x 1600 for stills, MP4 (or GIF) for animations. The script re-encodes MP4 originals the same way as GIFs. Claude Code converts, uploads and adds rows. Originals are not committed.
- Web pages get a new strip, placed the same way as on the branding pages. The existing explainer and social media management strips move across from their tables.
- **Brand identity:** do not reuse the logo strip. The page sells £995 to £1,995 identity systems, so it shows full systems (logo, cards, signage, social, guidelines). Logo-only images make it look like the £195 logo page and pull buyers down to the cheaper option. For launch, the logo strip is allowed as a stopgap only.

---

## 5. Buttons and schema on every page

- Every "Book a call", "Get a quote" and Calendly button becomes one button: **Book a free call**, linking to `/book?service={page-slug}`. /book passes the service to Calendly and GA4.
- Remove the inline JSON-LD in the web category page and its service pages. PageSchema already covers it.
- Every page's H1 is the keyword H1 from routes.js (names table above), using the same pattern as the 5 category pages fixed in Phase 1: keyword H1, creative line kept as the big styled headline. Today the 7 built service pages and the web category page still use the creative line as the H1.

---

## 6. Portfolio and case studies (Phase 5, before launch)

- Current recent work and case study sections are design placeholders. Leave them as they are in Phase 4.
- Talha fills `docs/website/data/portfolio.csv` (copy of `portfolio-template.csv`) with images in `docs/assets/portfolio/{project-slug}/`.
- Phase 5 builds the Our Work page, the case study template and the tables, seeds them from the CSV, then wires every service page: items tagged with the page slug; category pages show items tagged with any page in their category.
- No match: hide the section. Never show placeholder or wrong-service work on the live site.

**Service tags** (use these exact values, separated by `|`):
business-website-design, ecommerce-website-design, app-and-software-development, logo-design, brand-identity-design, social-media-design, thumbnail-design, logo-animation, motion-graphics, explainer-videos, video-editing, social-media-management, ai-automation, seo-digital-marketing
