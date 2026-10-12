# Hero strip images: drop zone

Drop the originals here, one folder per page. Do not convert them yourself.

- Stills: any format and size (PNG, JPG, WebP, or SVG with the text outlined). Best: 3:2 landscape, at least 1200 x 800. Other shapes are cropped from the centre, so keep the key part in the middle and avoid small text: the card is only 288 x 192 on desktop.
- Animations: MP4 (GIF also works), 3 to 8 seconds, seamless loop, no audio. No YouTube links for strips.

Claude Code converts them, uploads them to Supabase Storage (`hero-slides/{page-slug}/`) and adds the rows to the `hero_slides` table. These originals are not committed to git. The old slide tables were placeholders (D36), so every strip is filled from these folders only. A strip stays hidden until its page has images.

What the site stores:
- Stills: WebP, 1200 x 800 (3:2), quality 80, about 80 to 150KB each.
- Animations: never GIF. Each one becomes a muted MP4 (H.264), 720 x 480, 3 to 8 seconds, under 1MB, plus a WebP poster frame.

Order: name files 01, 02, 03 in the order you want them shown. 6 to 10 per page.

Folders: home (home page hero), web-development, business-website-design, ecommerce-website-design (optional), app-and-software-development, branding-design, logo-design, brand-identity-design (full identity systems, not logos only), social-media-design, thumbnail-design, video-animation, logo-animation, motion-graphics, video-editing, explainer-videos, social-media-management.
