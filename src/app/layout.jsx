import Script from 'next/script';
import Layout from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';
import { JsonLd, buildSiteSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';
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
