import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicServerClient } from '@/lib/supabaseServer';
import { isAddOn, lowestPrice, packageSaving, packageValue } from '@/lib/pricing-calc';

/**
 * Every active price, package and package item, read on the server and cached.
 * Tag 'pricing': the Supabase webhook calls /api/revalidate, so a price edit goes live
 * with no code change or redeploy (D29). The 5-minute revalidate is a safety net.
 * A failed read throws, so a page without prices is never cached.
 */
export const getPricing = unstable_cache(
  async () => {
    const supabase = createPublicServerClient();
    const [items, packages, packageItems] = await Promise.all([
      supabase.from('price_items').select('*').order('sort_order'),
      supabase.from('packages').select('*').order('sort_order'),
      supabase.from('package_items').select('*'),
    ]);
    const error = items.error || packages.error || packageItems.error;
    if (error) throw new Error(`Pricing read failed: ${error.message}`);
    return { items: items.data, packages: packages.data, packageItems: packageItems.data };
  },
  ['pricing'],
  { tags: ['pricing'], revalidate: 300 },
);

/**
 * Price items shown on one page, matched on service_page (inventory section 3).
 * @param {string} path
 */
export async function getPagePrices(path) {
  const { items } = await getPricing();
  return items.filter((item) => item.service_page === path);
}

/**
 * Lowest "from" price for each service page under a category path, for category cards.
 * Add-ons never count (pricing-calc ADD_ON_IDS).
 * @param {string} categoryPath e.g. "/services/branding-design"
 * @returns {Promise<Record<string, number | null>>} keyed by service page path
 */
export async function getFromPricesUnder(categoryPath) {
  const { items } = await getPricing();
  const byPage = {};
  for (const item of items) {
    if (!item.service_page?.startsWith(`${categoryPath}/`) || isAddOn(item)) continue;
    (byPage[item.service_page] ??= []).push(item);
  }
  return Object.fromEntries(Object.entries(byPage).map(([page, list]) => [page, lowestPrice(list)]));
}

/**
 * One package with its calculated value and saving.
 * @param {string} id
 */
export async function getPackage(id) {
  const { items, packages, packageItems } = await getPricing();
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) return null;
  const value = packageValue(id, packageItems, items);
  return { ...pkg, value, saving: packageSaving(value, pkg.price_gbp) };
}
