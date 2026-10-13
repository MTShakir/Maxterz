'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { SITE } from '@/lib/site';

/**
 * Builds the Calendly URL in the browser: first-touch UTMs (brief 9.4) plus the service
 * the visitor came from (/book?service=..., inventory section 5), carried in utm_content
 * unless a campaign already set it. Calendly stores these on the booking.
 */
function buildCalendlyUrl() {
  const params = new URLSearchParams();
  try {
    const utm = JSON.parse(sessionStorage.getItem('mx_attribution') || '{}');
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (utm[key]) params.set(key, utm[key]);
    }
  } catch {}
  const service = new URLSearchParams(window.location.search).get('service');
  if (service && !params.has('utm_content')) params.set('utm_content', service.slice(0, 100));
  const query = params.toString();
  return query ? `${SITE.calendlyUrl}?${query}` : SITE.calendlyUrl;
}

/** The page the visitor was on before /book, when it was on this site. */
function sourcePage() {
  try {
    const ref = new URL(document.referrer);
    if (ref.origin === window.location.origin) return ref.pathname;
  } catch {}
  return window.location.pathname;
}

/**
 * Calendly inline widget with attribution pass-through and the GA4 book_call event.
 * The Calendly script loads only on /book. The widget starts once the script is ready,
 * so the URL is always built in the browser, never during server rendering.
 */
export default function CalendlyEmbed() {
  const containerRef = useRef(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    function onMessage(e) {
      if (e.origin !== 'https://calendly.com' || e.data?.event !== 'calendly.event_scheduled') return;
      try {
        window.gtag?.('event', 'book_call', {
          source_page: sourcePage(),
          service: new URLSearchParams(window.location.search).get('service') || undefined,
        });
      } catch {}
      window.location.href = '/thank-you?type=call';
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    const parentElement = containerRef.current;
    if (!scriptReady || !parentElement || !window.Calendly) return;
    parentElement.innerHTML = '';
    window.Calendly.initInlineWidget({ url: buildCalendlyUrl(), parentElement });
  }, [scriptReady]);

  return (
    <>
      <div
        ref={containerRef}
        role="region"
        aria-label="Booking calendar"
        className="w-full rounded-2xl overflow-hidden bg-white shadow-sm"
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
    </>
  );
}
