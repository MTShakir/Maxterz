'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { SITE } from '@/lib/site';

/**
 * Calendly inline widget with UTM pass-through and GA4 book_call event.
 * Loads the Calendly script only on /book.
 */
export default function CalendlyEmbed() {
  const containerRef = useRef(null);

  useEffect(() => {
    function onMessage(e) {
      if (!e.data || e.data.event !== 'calendly.event_scheduled') return;
      try {
        window.gtag?.('event', 'book_call', { source_page: window.location.pathname });
      } catch {}
      window.location.href = '/thank-you?type=call';
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Build Calendly URL with UTM params from sessionStorage (brief 9.4 attribution)
  function getCalendlyUrl() {
    let url = SITE.calendlyUrl;
    try {
      const utm = JSON.parse(sessionStorage.getItem('mx_attribution') || '{}');
      const params = new URLSearchParams();
      if (utm.utm_source)   params.set('utm_source',   utm.utm_source);
      if (utm.utm_medium)   params.set('utm_medium',   utm.utm_medium);
      if (utm.utm_campaign) params.set('utm_campaign', utm.utm_campaign);
      if ([...params].length) url += '?' + params.toString();
    } catch {}
    return url;
  }

  return (
    <>
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full rounded-2xl overflow-hidden bg-white shadow-sm"
        data-url={getCalendlyUrl()}
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
