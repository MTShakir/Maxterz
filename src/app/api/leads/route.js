import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabaseServer';
import { SITE } from '@/lib/site';

const optionalText = (max) => z.string().trim().max(max).optional();

const schema = z.object({
  source:           z.enum(['contact', 'free-website-audit', 'book']),
  name:             z.string().trim().min(1).max(200),
  email:            z.string().trim().email().max(254),
  phone:            optionalText(30),
  company:          optionalText(200),
  website_url:      z.string().trim().max(500).regex(/^\S*$/, 'Enter a web address without spaces').optional(),
  service:          optionalText(100),
  budget:           optionalText(100),
  timeline:         optionalText(100),
  message:          optionalText(5000),
  business_type:    optionalText(100),
  main_goal:        optionalText(100),
  consent_followup: z.boolean().default(false),
  page_path:        optionalText(500),
  referrer:         optionalText(500),
  utm_source:       optionalText(200),
  utm_medium:       optionalText(200),
  utm_campaign:     optionalText(200),
  utm_term:         optionalText(200),
  utm_content:      optionalText(200),
  gclid:            optionalText(500),
  fbclid:           optionalText(500),
  _hp:              z.string().optional(),
  _elapsed:         z.number().optional(),
});

const FORM_LABELS = {
  contact: 'contact form',
  'free-website-audit': 'free website audit form',
  book: 'booking page',
};

const failMessage = `We could not send your message. Please email ${SITE.email} or message us on WhatsApp.`;

/** @param {unknown} value */
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** @param {string} value */
const oneLine = (value) => value.replace(/[\r\n]+/g, ' ');

const legalLine =
  `${SITE.legalName}. Registered in ${SITE.registeredIn}. Company number ${SITE.companyNumber}. ` +
  `Registered office: ${SITE.registeredOffice.street}, ${SITE.registeredOffice.locality}, ` +
  `${SITE.registeredOffice.countryName}, ${SITE.registeredOffice.postcode}.`;

/** Alert to the Maxterz inbox with every field and the attribution data. */
function alertEmail(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Company', lead.company],
    ['Website', lead.website_url],
    ['Service', lead.service],
    ['Budget', lead.budget],
    ['Timeline', lead.timeline],
    ['Business type', lead.business_type],
    ['Main goal', lead.main_goal],
    ['Follow-up emails', lead.source === 'free-website-audit' ? (lead.consent_followup ? 'Yes' : 'No') : undefined],
    ['Message', lead.message],
    ['Page', lead.page_path],
    ['Referrer', lead.referrer],
    ['UTM source', lead.utm_source],
    ['UTM medium', lead.utm_medium],
    ['UTM campaign', lead.utm_campaign],
    ['UTM term', lead.utm_term],
    ['UTM content', lead.utm_content],
    ['gclid', lead.gclid],
    ['fbclid', lead.fbclid],
  ].filter(([, value]) => value);

  const form = FORM_LABELS[lead.source];
  return {
    from: `Maxterz <${SITE.email}>`,
    to: SITE.email,
    replyTo: lead.email,
    subject: oneLine(`New lead: ${lead.name} (${form})`),
    text: rows.map(([key, value]) => `${key}: ${value}`).join('\n'),
    html:
      `<h2>New lead from the ${escapeHtml(form)}</h2>` +
      rows.map(([key, value]) => `<p><b>${key}:</b> ${escapeHtml(value).replace(/\n/g, '<br>')}</p>`).join(''),
  };
}

/**
 * Auto-reply to the person who filled in the form (brief 9.3). Transactional, not marketing.
 * It never repeats free text from the form, so nobody can use it to send their own words
 * from info@maxterz.com. A first name is used only when it looks like a name.
 */
function autoReply(lead) {
  const first = lead.name.split(/\s+/)[0];
  const greeting = /^[\p{L}'-]{1,30}$/u.test(first) ? `Thanks ${first}` : 'Thanks';
  const isAudit = lead.source === 'free-website-audit';
  // Calm wording and one link: words like "free" in a subject push mail towards spam.
  const paragraphs = isAudit
    ? [
        `${greeting}, we have your audit request.`,
        'Talha will record a short video audit of your website, covering speed, SEO and conversion. You will have it within 48 hours.',
      ]
    : [`${greeting}, we have your message.`, 'Talha will reply within one working day.'];
  paragraphs.push(`If you would like to talk sooner, you can book a 30-minute call here: ${SITE.url}/book`);

  return {
    from: `Maxterz <${SITE.email}>`,
    to: lead.email,
    replyTo: SITE.email,
    subject: isAudit ? 'Your website audit request' : 'Thanks for contacting Maxterz',
    text: `${paragraphs.join('\n\n')}\n\nBest regards,\nTalha - Team Maxterz\n\n--\n${legalLine}`,
    html:
      paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('') +
      '<p>Best regards,<br>Talha - Team Maxterz</p>' +
      `<p style="color:#6b7280;font-size:12px">${escapeHtml(legalLine)}</p>`,
  };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Spam: honeypot filled in, or sent faster than a person can fill the form. Pretend it worked.
  if (body?._hp || (typeof body?._elapsed === 'number' && body._elapsed < 3000)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again.', fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const supabase = createServerClient();
  if (!supabase) {
    console.error('[leads] SUPABASE_SECRET_KEY is not set');
    return NextResponse.json({ error: failMessage }, { status: 503 });
  }

  const { _hp, _elapsed, ...lead } = parsed.data;

  // Save first. Email never decides whether a lead is kept (brief 9.3).
  const { data: saved, error: dbError } = await supabase.from('leads').insert(lead).select('id').single();
  if (dbError) {
    console.error('[leads] db error', dbError);
    return NextResponse.json({ error: failMessage }, { status: 500 });
  }

  const emailErrors = [];
  let alertSent = false;

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const { error } = await resend.emails.send(alertEmail(lead));
      if (error) throw new Error(error.message);
      alertSent = true;
    } catch (err) {
      emailErrors.push(`alert: ${err.message ?? err}`);
    }

    // At most one auto-reply per address every 15 minutes, so the form cannot be used to flood
    // someone's inbox. The lead is still saved and the alert still goes to info@.
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: recent } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('email', lead.email)
      .gte('created_at', since)
      .neq('id', saved.id);

    if (recent) {
      emailErrors.push('auto-reply skipped: same address within 15 minutes');
    } else {
      try {
        const { error } = await resend.emails.send(autoReply(lead));
        if (error) throw new Error(error.message);
      } catch (err) {
        emailErrors.push(`auto-reply: ${err.message ?? err}`);
      }
    }
  } else {
    emailErrors.push('RESEND_API_KEY is not set');
  }

  if (emailErrors.length) console.error('[leads] email:', emailErrors.join('; '));

  await supabase
    .from('leads')
    .update({ email_sent: alertSent, email_error: emailErrors.join('; ') || null })
    .eq('id', saved.id);

  return NextResponse.json({ ok: true, id: saved.id });
}
