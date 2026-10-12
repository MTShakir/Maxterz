// Unit test for the pricing maths (brief 11.1). Run: npm run test:pricing
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { formatGBP, lowestPrice, packageSaving, packageValue } from '../src/lib/pricing-calc.js';

const data = JSON.parse(readFileSync(new URL('../docs/website/data/pricing.json', import.meta.url), 'utf8'));
const packageItems = data.packages.flatMap((pkg) =>
  pkg.items.map((item) => ({ package_id: pkg.id, price_item_id: item.price_item_id, quantity: item.quantity })),
);
const value = (id) => packageValue(id, packageItems, data.price_items);
const saving = (id) => packageSaving(value(id), data.packages.find((pkg) => pkg.id === id).price_gbp);

test('calculated package values match expected_value_gbp', () => {
  for (const pkg of data.packages) assert.equal(value(pkg.id), pkg.expected_value_gbp ?? null, pkg.id);
});

test('the six values named in the brief', () => {
  assert.equal(value('starter-kit'), 1325);
  assert.equal(value('launch-kit'), 3480);
  assert.equal(value('scale-kit'), 9420);
  assert.equal(value('care-plus'), 240);
  assert.equal(value('visibility-plan'), 1405);
  assert.equal(value('partner-plan'), 3520);
});

test('savings match the price book percentages', () => {
  assert.deepEqual(saving('starter-kit'), { amount: 530, percent: 40 });
  assert.deepEqual(saving('launch-kit'), { amount: 1485, percent: 43 });
  assert.deepEqual(saving('scale-kit'), { amount: 4425, percent: 47 });
  assert.deepEqual(saving('visibility-plan'), { amount: 610, percent: 43 });
  assert.deepEqual(saving('partner-plan'), { amount: 1525, percent: 43 });
});

test('a package with no items has no value or saving', () => {
  assert.equal(value('design-subscription'), null);
  assert.equal(packageSaving(null, 495), null);
});

test('every price item has a price unless it is quote only', () => {
  for (const item of data.price_items) {
    if (item.model === 'quote') continue;
    assert.ok(Number.isInteger(item.price_gbp) && item.price_gbp > 0, item.id);
  }
});

test('lowest price skips quote-only items', () => {
  assert.equal(lowestPrice([{ id: 'a', price_gbp: null }, { id: 'b', price_gbp: 1195 }, { id: 'c', price_gbp: 50 }]), 50);
  assert.equal(lowestPrice([{ id: 'a', price_gbp: null }]), null);
});

test('formatGBP', () => {
  assert.equal(formatGBP(50), '£50');
  assert.equal(formatGBP(1995), '£1,995');
  assert.equal(formatGBP(9995), '£9,995');
  assert.equal(formatGBP(12000), '£12,000');
});
