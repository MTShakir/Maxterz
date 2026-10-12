/**
 * Seeds the Supabase pricing tables from docs/website/data/pricing.json (brief 11.1).
 *
 * Safe to run more than once. By default it only adds missing rows, so prices Talha
 * edits in Supabase are never overwritten. Add --overwrite to reset every seeded row
 * to pricing.json. Nothing is ever deleted.
 *
 * Run: node tools/seed-pricing.mjs [--overwrite]
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { packageSaving, packageValue } from '../src/lib/pricing-calc.js';

const require = createRequire(import.meta.url);
require('@next/env').loadEnvConfig(process.cwd(), false, { info() {}, error: console.error });
const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const overwrite = process.argv.includes('--overwrite');
const data = JSON.parse(readFileSync(new URL('../docs/website/data/pricing.json', import.meta.url), 'utf8'));

const priceRows = data.price_items.map((item, index) => ({
  id: item.id,
  category: item.category,
  service_page: item.service_page ?? null,
  name: item.name,
  tier_label: item.tier_label ?? null,
  model: item.model,
  price_gbp: item.price_gbp ?? null,
  unit: item.unit ?? null,
  setup_fee_gbp: item.setup_fee_gbp ?? null,
  includes: item.includes ?? [],
  timeline: item.timeline ?? null,
  popular: Boolean(item.popular),
  self_serve: Boolean(item.self_serve),
  stripe_link_env: item.stripe_link_env ?? null,
  note: item.note ?? null,
  sort_order: (index + 1) * 10,
  is_active: true,
}));

const packageRows = data.packages.map((pkg, index) => ({
  id: pkg.id,
  type: pkg.type,
  name: pkg.name,
  price_gbp: pkg.price_gbp,
  founding_price_gbp: pkg.founding_price_gbp ?? null,
  founding_enabled: Boolean(pkg.founding_enabled),
  founding_slots: pkg.founding_slots ?? null,
  ideal_for: pkg.ideal_for ?? null,
  includes_copy: pkg.includes_copy ?? [],
  timeline: pkg.timeline ?? null,
  payment_terms: pkg.payment_terms ?? null,
  minimum_term: pkg.minimum_term ?? null,
  notice: pkg.notice ?? null,
  popular: Boolean(pkg.popular),
  includes_care_plus: Boolean(pkg.includes_care_plus),
  sort_order: (index + 1) * 10,
  is_active: true,
}));

const packageItemRows = data.packages.flatMap((pkg) =>
  pkg.items.map((item) => ({ package_id: pkg.id, price_item_id: item.price_item_id, quantity: item.quantity })),
);

const steps = [
  ['price_items', priceRows, 'id'],
  ['packages', packageRows, 'id'],
  ['package_items', packageItemRows, 'package_id,price_item_id'],
];

for (const [table, rows, onConflict] of steps) {
  const { error } = await supabase.from(table).upsert(rows, { onConflict, ignoreDuplicates: !overwrite });
  if (error) {
    console.error(`${table}: ${error.message}`);
    process.exit(1);
  }
  console.log(`${table}: ${rows.length} rows ${overwrite ? 'written' : 'checked (missing rows added)'}`);
}

// Read back what the site will read and check the calculated values.
const [{ data: items }, { data: packages }, { data: links }] = await Promise.all([
  supabase.from('price_items').select('id, price_gbp'),
  supabase.from('packages').select('id, name, price_gbp'),
  supabase.from('package_items').select('package_id, price_item_id, quantity'),
]);

let failures = 0;
console.log('\nPackage values calculated from Supabase:');
for (const pkg of data.packages) {
  const live = packages.find((p) => p.id === pkg.id);
  const value = packageValue(pkg.id, links, items);
  const saving = packageSaving(value, live.price_gbp);
  const expected = pkg.expected_value_gbp ?? null;
  const ok = value === expected;
  if (!ok) failures += 1;
  console.log(
    `  ${ok ? 'ok  ' : 'FAIL'} ${live.name}: price ${live.price_gbp}, value ${value ?? 'n/a'}` +
      (saving ? `, saving ${saving.amount} (${saving.percent}%)` : '') +
      (ok ? '' : `, expected ${expected}`),
  );
}

if (failures) {
  console.error(`\n${failures} package value(s) differ from pricing.json. Check the prices in Supabase.`);
  process.exit(1);
}
console.log('\nAll package values match pricing.json.');
