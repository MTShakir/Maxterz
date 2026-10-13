// @ts-check

/**
 * Pure pricing maths, shared by the site, the seed script and the unit test.
 * No imports, so plain Node can run it. Package values and savings are always
 * calculated from their items, never typed by hand (brief 11.1, D25).
 */

/**
 * @typedef {{ id: string, price_gbp: number | null }} PriceItemLike
 * @typedef {{ package_id: string, price_item_id: string, quantity: number }} PackageItemLike
 */

/**
 * Value of a package: the sum of its items' prices times quantity.
 * @param {string} packageId
 * @param {PackageItemLike[]} packageItems
 * @param {PriceItemLike[]} items
 * @returns {number | null} null when the package has no items or an item has no price
 */
export function packageValue(packageId, packageItems, items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const rows = packageItems.filter((row) => row.package_id === packageId);
  if (!rows.length) return null;

  let total = 0;
  for (const row of rows) {
    const item = byId.get(row.price_item_id);
    if (!item || item.price_gbp == null) return null;
    total += item.price_gbp * row.quantity;
  }
  return total;
}

/**
 * Saving against the calculated value.
 * @param {number | null} value
 * @param {number} price
 * @returns {{ amount: number, percent: number } | null} null when there is no real saving
 */
export function packageSaving(value, price) {
  if (value == null || value <= price) return null;
  const amount = value - price;
  return { amount, percent: Math.round((amount / value) * 100) };
}

/**
 * Add-ons are sold with a service, never on their own (price book 2.1 and 2.3), so they never
 * set a "from" price. Kept here until the price table gets its own add-on column.
 */
export const ADD_ON_IDS = new Set(['copywriting', 'voiceover']);

/** @param {{ id: string }} item */
export const isAddOn = (item) => ADD_ON_IDS.has(item.id);

/**
 * Lowest price among items, for "from £X" lines. Quote-only items are skipped.
 * @param {PriceItemLike[]} items
 * @returns {number | null}
 */
export function lowestPrice(items) {
  const prices = items.map((item) => item.price_gbp).filter((price) => price != null);
  return prices.length ? Math.min(...prices) : null;
}

/**
 * £1,995 style, no pence.
 * @param {number} gbp
 */
export function formatGBP(gbp) {
  return `£${String(gbp).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

/**
 * How a price item is shown. Card layouts use prefix, amount and suffix separately;
 * text uses label. Set-up fees always sit next to monthly prices (brief 7.6).
 *
 * @param {{ model: string, price_gbp: number | null, unit?: string | null, setup_fee_gbp?: number | null }} item
 * @param {{ forceFrom?: boolean }} [options] forceFrom shows "from" on fixed tiers (explainer videos)
 * @returns {{ prefix: string, amount: string, suffix: string, setup: string, label: string }}
 */
export function priceParts(item, { forceFrom = false } = {}) {
  if (item.model === 'quote' || item.price_gbp == null) {
    return { prefix: '', amount: 'Custom quote', suffix: '', setup: '', label: 'Custom quote' };
  }

  const prefix = item.model === 'from' || forceFrom ? 'from' : '';
  const amount = formatGBP(item.price_gbp);
  const suffix =
    item.model === 'monthly' ? 'a month'
      : item.unit && item.unit !== 'one-off' ? item.unit
        : '';
  const setup = item.setup_fee_gbp ? `${formatGBP(item.setup_fee_gbp)} set-up` : '';

  const main = [prefix, amount, suffix].filter(Boolean).join(' ');
  const label = setup ? `${setup}, then ${main}` : main;
  return { prefix, amount, suffix, setup, label };
}
