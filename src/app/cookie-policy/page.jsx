import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import Link from 'next/link';

const route = ROUTES.find(r => r.path === '/cookie-policy');
export const metadata = buildMetadata(route);

export default function CookiePolicyPage() {
  return (
    <>
      <PageSchema path="/cookie-policy" />
      <main className="min-h-screen bg-[#efefef] pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {route.h1}
          </h1>
          <div className="bg-white rounded-[1.5rem] p-8 md:p-12 prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              This policy explains what cookies and storage items are used on maxterz.com,
              what each one does, how long it lasts, and how to change your preferences.
              It covers MAXTERZ LTD (company number 15768014), operating from 128 City Road,
              London EC1V 2NX.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What are cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Cookies are small text files that a website stores on your device when you visit.
              They help the site remember your preferences and understand how you use the site,
              so we can improve it for you and for other visitors.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies we use</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We use essential cookies only to make this site function correctly. We do not
              use advertising or tracking cookies without your consent. A full list of every
              cookie, its purpose and its expiry will be published here before the site launch
              on 7 October 2026.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">How to manage cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              You can manage or delete cookies at any time through your browser settings.
              Please note that turning off essential cookies may affect how the site works.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about how we use cookies?{' '}
              <Link href="/contact" className="text-[#1044ff] hover:underline">Get in touch</Link>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
