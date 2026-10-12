# Hero strip images: drop zone

Drop the originals here, one folder per page. Do not convert them to WebP yourself.

- Stills: PNG, 2400 x 1600 (exact 3:2), exported from Illustrator. Keep key content 5% in from the edges and avoid small text: the card is only 288 x 192 on desktop.
- Animations: MP4 (H.264), 3:2 (1440 x 960 or 1080 x 720), 3 to 8 seconds, seamless loop, no audio. GIF also works, MP4 is better.

Claude Code converts them, uploads them to Supabase Storage (`hero-slides/{page-slug}/`) and adds the rows to the `hero_slides` table. These originals are not committed to git.

What the site stores:
- Stills: WebP, 1200 x 800 (3:2), quality 80, about 80 to 150KB each.
- Animations: never GIF. Each GIF becomes a muted MP4 (H.264), 720 x 480, 3 to 8 seconds, under 1MB, plus a WebP poster frame.

Order: name files 01, 02, 03 in the order you want them shown. 6 to 10 per page.

Folders: web-development, business-website-design, ecommerce-website-design (optional), app-and-software-development, branding-design, logo-design, brand-identity-design (full identity systems, not logos only), social-media-design, thumbnail-design, video-animation, logo-animation, motion-graphics, video-editing.
