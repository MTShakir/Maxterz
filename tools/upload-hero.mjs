/**
 * Hero strip uploader (D32, inventory section 4).
 *
 * Reads Talha's originals from docs/assets/hero/{page-slug}/, converts them and uploads
 * them to the Supabase Storage bucket `hero-slides`, then writes the hero_slides rows.
 * - Stills (PNG, JPG, WebP, SVG): WebP, 1200 x 800, cropped from the centre, quality 80.
 * - Animations (MP4, MOV, GIF): muted H.264 MP4, 720 x 480, at most 8 seconds, plus a WebP poster.
 *   Needs ffmpeg: set FFMPEG_PATH, or have ffmpeg on the PATH.
 * - Alt text comes from docs/assets/hero/{page-slug}/alt.json: { "01.png": "Logo design for ..." }.
 *   Files without alt text are skipped, so nothing ships without a description.
 *
 * Uses sharp and @next/env, which come with Next.js, so nothing extra to install.
 * Safe to run again: a file already uploaded updates its row instead of adding a new one.
 * Nothing is deleted. Run: node tools/upload-hero.mjs [page-slug ...]
 */
import { readFileSync, readdirSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import nextEnv from '@next/env';
import { createClient } from '@supabase/supabase-js';

nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error: console.error });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local');
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const BUCKET = 'hero-slides';
const ROOT = 'docs/assets/hero';
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

/** Drop-zone folder to page path. */
const PAGES = {
  home: '/',
  'web-development': '/services/web-development',
  'business-website-design': '/services/web-development/business-website-design',
  'ecommerce-website-design': '/services/web-development/ecommerce-website-design',
  'app-and-software-development': '/services/web-development/app-and-software-development',
  'branding-design': '/services/branding-design',
  'logo-design': '/services/branding-design/logo-design',
  'brand-identity-design': '/services/branding-design/brand-identity-design',
  'social-media-design': '/services/branding-design/social-media-design',
  'thumbnail-design': '/services/branding-design/thumbnail-design',
  'video-animation': '/services/video-animation',
  'logo-animation': '/services/video-animation/logo-animation',
  'motion-graphics': '/services/video-animation/motion-graphics',
  'explainer-videos': '/services/video-animation/explainer-videos',
  'video-editing': '/services/video-animation/video-editing',
  'social-media-management': '/services/social-media-management',
};

const STILLS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);
const MOTION = new Set(['.mp4', '.mov', '.gif']);

async function upload(path, body, contentType) {
  const { error } = await supabase.storage.from(BUCKET).upload(path, body, { contentType, upsert: true });
  if (error) throw new Error(`${path}: ${error.message}`);
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Still image: 1200 x 800 WebP, centre crop. */
async function processStill(file) {
  return sharp(file, { density: 300 })
    .resize(1200, 800, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toBuffer();
}

/** Animation: 720 x 480 muted MP4 (at most 8 s) and a WebP poster from the first second. */
function processMotion(file, workDir) {
  const out = join(workDir, 'clip.mp4');
  const poster = join(workDir, 'poster.png');
  const scale = 'scale=720:480:force_original_aspect_ratio=increase,crop=720:480';
  execFileSync(FFMPEG, ['-y', '-i', file, '-t', '8', '-an', '-vf', `${scale},fps=30`, '-c:v', 'libx264',
    '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: 'ignore' });
  execFileSync(FFMPEG, ['-y', '-ss', '0.5', '-i', out, '-frames:v', '1', poster], { stdio: 'ignore' });
  return { clip: readFileSync(out), poster };
}

async function saveRow(row) {
  const match = row.media_type === 'image' ? { image_url: row.image_url } : { video_url: row.video_url };
  const { data: existing } = await supabase.from('hero_slides').select('id').match(match).maybeSingle();
  const { error } = existing
    ? await supabase.from('hero_slides').update(row).eq('id', existing.id)
    : await supabase.from('hero_slides').insert(row);
  if (error) throw new Error(error.message);
  return existing ? 'updated' : 'added';
}

const only = process.argv.slice(2);
const slugs = Object.keys(PAGES).filter((slug) => !only.length || only.includes(slug));

for (const slug of slugs) {
  const dir = join(ROOT, slug);
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir)
    .filter((name) => STILLS.has(extname(name).toLowerCase()) || MOTION.has(extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  if (!files.length) continue;

  const altFile = join(dir, 'alt.json');
  const alts = existsSync(altFile) ? JSON.parse(readFileSync(altFile, 'utf8')) : {};
  console.log(`\n${slug}: ${files.length} file(s)`);

  for (const [index, name] of files.entries()) {
    const alt = alts[name]?.trim();
    if (!alt) {
      console.log(`  skip ${name}: no alt text in alt.json`);
      continue;
    }
    const file = join(dir, name);
    const stem = basename(name, extname(name)).toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const ext = extname(name).toLowerCase();
    const animated = MOTION.has(ext) && (ext !== '.gif' || (await sharp(file).metadata()).pages > 1);

    let row;
    if (animated) {
      const workDir = mkdtempSync(join(tmpdir(), 'hero-'));
      try {
        const { clip, poster } = processMotion(file, workDir);
        const posterWebp = await sharp(poster).webp({ quality: 80 }).toBuffer();
        row = {
          page_path: PAGES[slug],
          media_type: 'video',
          video_url: await upload(`${slug}/${stem}.mp4`, clip, 'video/mp4'),
          poster_url: await upload(`${slug}/${stem}-poster.webp`, posterWebp, 'image/webp'),
          alt_text: alt,
          display_order: index + 1,
          active: true,
        };
        console.log(`  ${name}: video ${(clip.length / 1024).toFixed(0)}KB${clip.length > 1024 * 1024 ? ' (over 1MB, check it)' : ''}`);
      } finally {
        rmSync(workDir, { recursive: true, force: true });
      }
    } else {
      const webp = await processStill(file);
      row = {
        page_path: PAGES[slug],
        media_type: 'image',
        image_url: await upload(`${slug}/${stem}.webp`, webp, 'image/webp'),
        alt_text: alt,
        display_order: index + 1,
        active: true,
      };
      console.log(`  ${name}: image ${(webp.length / 1024).toFixed(0)}KB`);
    }
    console.log(`    row ${await saveRow(row)}`);
  }
}

console.log('\nDone. Pages show their strip once they have 3 or more slides (cache: up to 1 hour, or revalidate tag "slides").');
