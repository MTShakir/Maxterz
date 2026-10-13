import { Buffer } from 'node:buffer';
import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * On-demand revalidation (brief 8.6, D29): a Supabase edit goes live in seconds, no redeploy.
 *
 * POST /api/revalidate with header `x-revalidate-secret: <REVALIDATE_SECRET>` and either:
 * - a Supabase Database Webhook payload ({ type, table, record, ... }): the table picks the tag, or
 * - a manual body { "tag": "pricing" }, or the query string ?tag=pricing.
 */
const TABLE_TAGS = {
  price_items: 'pricing',
  packages: 'pricing',
  package_items: 'pricing',
  testimonials: 'testimonials',
  hero_slides: 'slides',
  case_studies: 'work',
  portfolio_projects: 'work',
};
const ALLOWED_TAGS = new Set(Object.values(TABLE_TAGS));

/** @param {string | null} given */
function secretMatches(given) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request) {
  if (!secretMatches(request.headers.get('x-revalidate-secret'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    // A ?tag= request may have no body.
  }

  const tag =
    new URL(request.url).searchParams.get('tag') ||
    body?.tag ||
    TABLE_TAGS[body?.table];

  if (!ALLOWED_TAGS.has(tag)) {
    return NextResponse.json({ error: `Unknown tag or table. Tags: ${[...ALLOWED_TAGS].join(', ')}` }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ ok: true, tag, revalidated: new Date().toISOString() });
}
