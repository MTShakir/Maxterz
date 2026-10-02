import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import Link from 'next/link';

const route = ROUTES.find(r => r.path === '/free-website-audit');
export const metadata = buildMetadata(route);

export default function FreeWebsiteAuditPage() {
  return (
    <>
      <PageSchema path="/free-website-audit" />
      <main className="min-h-screen bg-[#efefef] pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {route.h1}
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {route.description}
          </p>
          <div className="bg-white rounded-[1.5rem] p-8 mb-10">
            <p className="text-gray-600 mb-6 text-[15px]">
              Share your website URL and we will record a personal walkthrough covering speed, SEO and
              conversion, with the three fixes that would make the biggest difference.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white font-bold text-[15px] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              Request your free audit
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Already know what you need?{' '}
            <Link href="/book" className="text-[#1044ff] hover:underline font-semibold">
              Book a free call instead
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
