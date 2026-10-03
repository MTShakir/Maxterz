'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

const COOKIE_NAME = 'mx_consent';

function getStoredConsent() {
  if (typeof document === 'undefined') return null;
  try {
    const match = document.cookie.match(/mx_consent=([^;]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function storeConsent(value) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 6);
  document.cookie = `${COOKIE_NAME}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

function updateGtag(status) {
  try {
    window.gtag?.('consent', 'update', {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  } catch {}
}

/**
 * Cookie consent banner with GA4 Consent Mode v2 and optional Clarity.
 * "Accept all" and "Reject all" are equal size. Banner sits at bottom, does
 * not cover the primary CTA on mobile.
 *
 * @param {{ clarityId?: string }} props
 */
export default function CookieBanner({ clarityId }) {
  const [consent, setConsentState] = useState(/** @type {string|null} */ (null));
  const [show, setShow] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (existing) {
      setConsentState(existing);
      if (existing === 'granted') updateGtag('granted');
    } else {
      setShow(true);
    }
    const handler = () => setShow(true);
    window.addEventListener('openCookieSettings', handler);
    return () => window.removeEventListener('openCookieSettings', handler);
  }, []);

  function accept() {
    storeConsent('granted');
    setConsentState('granted');
    updateGtag('granted');
    setShow(false);
  }

  function reject() {
    storeConsent('denied');
    setConsentState('denied');
    setShow(false);
  }

  return (
    <>
      {consent === 'granted' && clarityId && (
        <Script id="clarity-init" strategy="lazyOnload">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `}</Script>
      )}

      {show && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
          className="fixed bottom-20 left-4 right-4 z-50 bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 md:bottom-6 md:left-auto md:right-6 md:max-w-xs"
        >
          <p className="text-[13px] text-gray-700 leading-relaxed mb-4">
            We use cookies to understand how visitors use our site and to improve it.{' '}
            <Link href="/cookie-policy" className="text-[#1044ff] hover:underline font-medium">
              Cookie policy
            </Link>
            .
          </p>
          <div className="flex gap-3">
            <button
              onClick={reject}
              className="flex-1 py-2.5 rounded-full border-2 border-gray-300 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reject all
            </button>
            <button
              onClick={accept}
              className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              Accept all
            </button>
          </div>
        </div>
      )}
    </>
  );
}
