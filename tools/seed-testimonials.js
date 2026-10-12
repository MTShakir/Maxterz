/**
 * Idempotent seed script: loads the curated Fiverr reviews from
 * docs/website/data/fiverr-reviews.json into the Supabase testimonials table.
 *
 * Upserts on (author_name, platform, quote), so running it twice changes nothing.
 * Seeded reviews are published; the old placeholder rows stay hidden (D36).
 * Run: npm run seed:reviews
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local
 */
import { readFileSync } from 'node:fs';
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
const data = JSON.parse(readFileSync(new URL('../docs/website/data/fiverr-reviews.json', import.meta.url), 'utf8'));

const rows = data.reviews.map((r, index) => ({
  author_name:     r.author_name,
  location:        r.author_country,
  platform:        r.source,
  rating:          Math.round(r.rating),
  quote:           r.quote,
  is_featured:     r.is_featured,
  avatar_initials: r.author_name.slice(0, 2).toUpperCase(),
  display_order:   index + 1,
  service_slug:    r.service_slug   ?? null,
  period_label:    r.period_label   ?? null,
  delivery_time:   r.delivery_time  ?? null,
  is_excerpt:      r.is_excerpt     ?? false,
  is_published:    true,
}));

const { error } = await supabase
  .from('testimonials')
  .upsert(rows, { onConflict: 'author_name,platform,quote' });

if (error) {
  console.error('Upsert error:', error.message);
  process.exit(1);
}

const { count } = await supabase
  .from('testimonials')
  .select('id', { count: 'exact', head: true })
  .eq('is_published', true);

console.log(`Done. ${rows.length} reviews upserted. ${count} published in total.`);
