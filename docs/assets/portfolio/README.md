# Portfolio: drop zone

One folder per project, named with the `project_slug` from `docs/website/data/portfolio.csv`.

- `cover.jpg` or `cover.png`: the card image, at least 1600 px wide, 16:10.
- `01`, `02`, `03`...: gallery images in display order, at least 1600 px wide. Websites: full-page desktop and mobile screenshots.
- Videos: MP4 originals (logo animations, ads, reels). No GIFs.
- Biggest originals you have. Claude Code makes the web versions (WebP and MP4) and uploads them to Supabase Storage. Originals are not committed to git.

For each case study, also send 5 answers (Claude writes the copy from them):
1. The client's problem before Maxterz.
2. What Maxterz delivered.
3. Timeline.
4. Results with real numbers the client has confirmed. No numbers if none were confirmed.
5. A client quote, with their permission to publish it.
