import Script from 'next/script';
import Layout from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';
import { JsonLd, buildSiteSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';
import CookieBanner from '@/components/CookieBanner';
import './globals.css';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Maxterz | Web Design, Branding and AI Agency',
    template: '%s',
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>
        <JsonLd data={buildSiteSchema()} />
        <Layout>{children}</Layout>
        <Toaster />
        <CookieBanner clarityId={process.env.NEXT_PUBLIC_CLARITY_ID} />

        {/* Attribution: capture UTM params and referrer on first page load (brief 9.4) */}
        <Script id="attribution" strategy="afterInteractive">{`
          (function(){
            try {
              if(sessionStorage.getItem('mx_attribution')) return;
              var p = new URLSearchParams(location.search);
              var keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
              var data = {};
              keys.forEach(function(k){ if(p.get(k)) data[k] = p.get(k); });
              if(p.get('gclid')) data.gclid = p.get('gclid');
              if(p.get('fbclid')) data.fbclid = p.get('fbclid');
              data.referrer = document.referrer;
              data.landing_path = location.pathname;
              sessionStorage.setItem('mx_attribution', JSON.stringify(data));
            } catch(e){}
          })();
        `}</Script>

        {/* Global CTA click tracking */}
        <Script id="cta-tracking" strategy="afterInteractive">{`
          document.addEventListener('click', function(e){
            var el = e.target.closest('[data-cta]');
            if(!el) return;
            try {
              window.gtag?.('event', 'cta_click', {
                cta_text: el.textContent.trim().slice(0,60),
                cta_location: el.getAttribute('data-cta'),
                page_path: location.pathname
              });
            } catch(e){}
          });
          document.addEventListener('click', function(e){
            var a = e.target.closest('a[href]');
            if(!a) return;
            var href = a.getAttribute('href');
            if(href && href.startsWith('https://wa.me')) {
              try { window.gtag?.('event','whatsapp_click',{page_path:location.pathname}); } catch(e){}
            }
            if(href && href.startsWith('tel:')) {
              try { window.gtag?.('event','phone_click',{page_path:location.pathname}); } catch(e){}
            }
            if(href && href.startsWith('mailto:')) {
              try { window.gtag?.('event','email_click',{page_path:location.pathname}); } catch(e){}
            }
          });
        `}</Script>

        {/* Consent mode v2 defaults: deny analytics until user accepts (Phase 3 updates on accept) */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 2000
            });
          `}
        </Script>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SITE.ga4Id}');
          `}
        </Script>
      </body>
    </html>
  );
}
