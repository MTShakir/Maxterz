import Script from 'next/script';
import Layout from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata = {
  title: 'Maxterz | Websites and Apps | SEO London | Brand Strategy',
  description:
    'Maxterz is a UK-based digital development agency providing websites and apps, technical seo services, social media marketing services and brand strategy for startups and businesses.',
  generator: 'Maxterz',
  icons: {
    icon: 'https://qcsflpsyzvigswlotepz.supabase.co/storage/v1/object/public/BrandingFiles/Signature.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
        <Toaster />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-893VQWSMR6"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-893VQWSMR6');
          `}
        </Script>
      </body>
    </html>
  );
}
