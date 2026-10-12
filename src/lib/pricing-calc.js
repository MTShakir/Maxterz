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
