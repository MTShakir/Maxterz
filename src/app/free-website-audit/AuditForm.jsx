'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const businessTypes = [
  'Local service business',
  'E-commerce store',
  'Professional services (consultant, coach, agency)',
  'Hospitality (restaurant, hotel, venue)',
  'Healthcare or wellness',
  'Other',
];

const mainGoals = [
  'More calls and enquiries',
  'More bookings',
  'More online sales',
  'Look more professional',
];

export default function AuditForm() {
  const router = useRouter();
  const startTime = useRef(Date.now());
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // Minimum fill time (3 seconds) to catch bots
    if (Date.now() - startTime.current < 3000) {
      setError('Please take a moment to fill the form.');
      return;
    }

    const fd = new FormData(e.currentTarget);
    if (fd.get('_hp')) return; // honeypot

    const attribution = (() => {
      try { return JSON.parse(sessionStorage.getItem('mx_attribution') || '{}'); } catch { return {}; }
    })();

    const payload = {
      source:           'free-website-audit',
      name:             fd.get('name'),
      email:            fd.get('email'),
      website_url:      fd.get('website_url'),
      business_type:    fd.get('business_type'),
      main_goal:        fd.get('main_goal'),
      consent_followup: fd.get('consent_followup') === 'on',
      _hp:              fd.get('_hp') || '',
      page_path:        window.location.pathname,
      referrer:         document.referrer,
      ...attribution,
    };

    setPending(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');

      try { window.gtag?.('event', 'generate_lead', { form: 'free-website-audit' }); } catch {}
      router.push('/thank-you?type=audit');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again or email us directly.');
      setPending(false);
    }
  }

  const inputCls = 'w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1044ff] focus:outline-none transition-colors text-[15px]';
  const labelCls = 'block text-sm font-bold text-gray-700 mb-2';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="aud-name" className={labelCls}>Your name *</label>
        <input id="aud-name" name="name" type="text" required maxLength={200} className={inputCls} placeholder="Jane Smith" />
      </div>

      <div>
        <label htmlFor="aud-email" className={labelCls}>Email address *</label>
        <input id="aud-email" name="email" type="email" required maxLength={254} className={inputCls} placeholder="jane@example.com" />
      </div>

      <div>
        <label htmlFor="aud-url" className={labelCls}>Your website URL *</label>
        <input id="aud-url" name="website_url" type="url" required maxLength={500} className={inputCls} placeholder="https://yoursite.com" />
      </div>

      <div>
        <label htmlFor="aud-type" className={labelCls}>Type of business</label>
        <select id="aud-type" name="business_type" className={`${inputCls} appearance-none`}>
          <option value="">Select...</option>
          {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="aud-goal" className={labelCls}>Main goal</label>
        <select id="aud-goal" name="main_goal" className={`${inputCls} appearance-none`}>
          <option value="">Select...</option>
          {mainGoals.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="aud-consent"
          name="consent_followup"
          type="checkbox"
          className="mt-1 w-4 h-4 accent-[#1044ff]"
        />
        <label htmlFor="aud-consent" className="text-[13px] text-gray-500 leading-relaxed">
          I am happy to receive the occasional email with tips and updates. I can unsubscribe at any time.
        </label>
      </div>

      {error && (
        <p role="alert" className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full h-14 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white font-bold text-[15px] hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-60"
      >
        {pending ? 'Sending...' : 'Request my free audit'}
      </button>

      <p className="text-center text-xs text-gray-400">
        We will send your audit video within 48 hours. No spam, ever.
      </p>
    </form>
  );
}
