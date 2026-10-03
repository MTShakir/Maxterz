import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabaseServer';

const schema = z.object({
  source:           z.enum(['contact', 'free-website-audit', 'book']),
  name:             z.string().min(1).max(200),
  email:            z.string().email().max(254),
  phone:            z.string().max(30).optional(),
  company:          z.string().max(200).optional(),
  website_url:      z.string().max(500).optional(),
  service:          z.string().max(100).optional(),
  budget:           z.string().max(100).optional(),
  timeline:         z.string().max(100).optional(),
  message:          z.string().max(5000).optional(),
  business_type:    z.string().max(100).optional(),
  main_goal:        z.string().max(100).optional(),
  consent_followup: z.boolean().default(false),
  page_path:        z.string().max(500).optional(),
  referrer:         z.string().max(500).optional(),
  utm_source:       z.string().max(200).optional(),
  utm_medium:       z.string().max(200).optional(),
  utm_campaign:     z.string().max(200).optional(),
  _hp:              z.string().max(0).optional(), // honeypot — must be empty
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot check
  if (body._hp) {
    return NextResponse.json({ ok: true }); // silent reject
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { _hp, page_path, referrer, utm_source, utm_medium, utm_campaign, ...coreData } = parsed.data;

  // Attribution fields are collected but stored separately once the migration is applied.
  // For now only insert columns that exist in the current leads table.
  const insertData = {
    ...coreData,
    page_path, referrer, utm_source, utm_medium, utm_campaign,
  };

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[leads] SUPABASE_SERVICE_ROLE_KEY is not set');
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const supabase = createServerClient();

  const { data: lead, error: dbError } = await supabase
    .from('leads')
    .insert(insertData)
    .select('id')
    .single();

  if (dbError) {
    console.error('[leads] db error', dbError);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }

  let emailSent = false;
  let emailError = null;

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const d = parsed.data;
      const rows = [
        ['Source', d.source],
        ['Name', d.name],
        ['Email', d.email],
        d.phone        && ['Phone', d.phone],
        d.company      && ['Company', d.company],
        d.website_url  && ['Website', d.website_url],
        d.service      && ['Service', d.service],
        d.budget       && ['Budget', d.budget],
        d.timeline     && ['Timeline', d.timeline],
        d.business_type && ['Business type', d.business_type],
        d.main_goal    && ['Main goal', d.main_goal],
        d.message      && ['Message', d.message],
        ['---', ''],
        d.page_path    && ['Page', d.page_path],
        d.referrer     && ['Referrer', d.referrer],
        d.utm_source   && ['UTM source', d.utm_source],
        d.utm_medium   && ['UTM medium', d.utm_medium],
        d.utm_campaign && ['UTM campaign', d.utm_campaign],
      ]
        .filter(Boolean)
        .map(([k, v]) => k === '---' ? '<hr>' : `<p><b>${k}:</b> ${v}</p>`)
        .join('');

      await resend.emails.send({
        from:    'Maxterz <info@maxterz.com>',
        to:      'info@maxterz.com',
        replyTo: d.email,
        subject: `New ${d.source} lead: ${d.name}`,
        html:    `<h2>New lead</h2>${rows}`,
      });

      emailSent = true;
    } catch (err) {
      emailError = String(err.message ?? err);
      console.error('[leads] email error', emailError);
    }
  } else {
    console.warn('[leads] RESEND_API_KEY not set — lead saved, no email sent');
  }

  await supabase
    .from('leads')
    .update({ email_sent: emailSent, email_error: emailError })
    .eq('id', lead.id);

  return NextResponse.json({ ok: true, id: lead.id });
}
