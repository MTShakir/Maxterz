import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import Link from 'next/link';
import AuditForm from './AuditForm';
import ProofBar from '@/components/ProofBar';

const route = ROUTES.find(r => r.path === '/free-website-audit');
export const metadata = buildMetadata(route);

export default function FreeWebsiteAuditPage() {
  return (
    <>
      <PageSchema path="/free-website-audit" />
      <main className="min-h-screen bg-[#efefef] pt-14 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: pitch */}
            <div className="pt-10 lg:pt-20">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {route.h1}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Share your website and we will record a personal video covering speed, SEO and
                conversion, with the three fixes that would bring you more enquiries.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Personal walkthrough of your live website',
                  'Speed, SEO and conversion analysis',
                  '3 specific fixes, ranked by impact',
                  'Video in your inbox within 48 hours',
                  'No obligation to buy anything',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-gray-700">
                    <span className="w-5 h-5 flex-shrink-0 rounded-full bg-[#1044ff]/10 text-[#1044ff] flex items-center justify-center text-xs font-bold">
                      &#10003;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mb-10">
                <ProofBar />
              </div>

              <p className="text-sm text-gray-500">
                Rather book a call?{' '}
                <Link href="/book" className="text-[#1044ff] hover:underline font-semibold">
                  Pick a time here
                </Link>
              </p>
            </div>

            {/* Right: form */}
            <div className="pt-4 lg:pt-16">
              <div className="bg-white rounded-[1.5rem] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request your free audit</h2>
                <p className="text-gray-500 text-[14px] mb-8">
                  Takes 60 seconds. We will record and send within 48 hours.
                </p>
                <AuditForm />
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
