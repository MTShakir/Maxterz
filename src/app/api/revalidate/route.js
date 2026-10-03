import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint (brief 8.6).
 * Called by Supabase database webhooks on pricing/testimonials/work table changes.
 *
 * POST /api/revalidate
 * Header: x-revalidate-secret: <REVALIDATE_SECRET>
 * Body: { "tag": "pricing" | "testimonials" | "work" }
 */
export async function POST(request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let tag;
  try {
    ({ tag } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const allowed = ['pricing', 'testimonials', 'work'];
  if (!allowed.includes(tag)) {
    return NextResponse.json({ error: `Unknown tag. Allowed: ${allowed.join(', ')}` }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ ok: true, tag, revalidated: new Date().toISOString() });
}
