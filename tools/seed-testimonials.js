/**
 * Idempotent seed script: inserts all Fiverr reviews from
 * docs/website/data/fiverr-reviews.json into the Supabase testimonials table.
 *
 * Uses upsert on (author_name, source, quote) to stay idempotent.
 * Run: node tools/seed-testimonials.js
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const { createClient } = require('@supabase/supabase-js');

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);
const data     = require('../docs/website/data/fiverr-reviews.json');

async function main() {
  const rows = data.reviews.map(r => ({
    author_name:     r.author_name,
    location:        r.author_country,
    platform:        r.source,
    rating:          Math.round(r.rating),
    quote:           r.quote,
    is_featured:     r.is_featured,
    avatar_initials: r.author_name.slice(0, 2).toUpperCase(),
    display_order:   0,
    service_slug:    r.service_slug   ?? null,
    period_label:    r.period_label   ?? null,
    delivery_time:   r.delivery_time  ?? null,
    is_excerpt:      r.is_excerpt     ?? false,
  }));

  // Upsert on (author_name, platform, quote) — existing unique index expected.
  // If upsert fails due to missing unique constraint, run as plain inserts.
  const { error, count } = await supabase
    .from('testimonials')
    .upsert(rows, {
      onConflict: 'author_name,platform,quote',
      ignoreDuplicates: true,
      count: 'exact',
    });

  if (error) {
    console.error('Upsert error:', error);
    process.exit(1);
  }

  console.log(`Done. ${count ?? rows.length} rows processed (duplicates ignored).`);
}

main();
