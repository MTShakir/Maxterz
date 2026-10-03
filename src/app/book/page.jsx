import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';
import Link from 'next/link';
import CalendlyEmbed from './CalendlyEmbed';

const route = ROUTES.find(r => r.path === '/book');
export const metadata = buildMetadata(route);

const callPoints = [
  'We map your goals and current situation.',
  'We identify the quick wins you can act on now.',
  'We recommend the right next step, whether that is working with us or not.',
];

export default function BookPage() {
  return (
    <>
      <PageSchema path="/book" />
      <main className="min-h-screen bg-[#efefef] pt-14 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: info */}
            <div className="pt-10 lg:pt-20">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {route.h1}
              </h1>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                30 minutes. No pressure. Just a clear plan.
              </p>

              <h2 className="text-[17px] font-bold text-gray-900 mb-4">What happens on the call</h2>
              <ul className="space-y-3 mb-10">
                {callPoints.map(point => (
                  <li key={point} className="flex items-start gap-3 text-[15px] text-gray-700">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-[#1044ff]/10 text-[#1044ff] flex items-center justify-center text-xs font-bold">
                      &#10003;
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <h2 className="text-[17px] font-bold text-gray-900 mb-3">Who it is for</h2>
              <p className="text-[15px] text-gray-600 mb-10">
                Business owners and founders who need a website, rebrand, video content, SEO or an
                AI agent, and want a clear plan before committing.
              </p>

              <h2 className="text-[17px] font-bold text-gray-900 mb-3">What to prepare</h2>
              <p className="text-[15px] text-gray-600 mb-10">
                A sentence or two on your business and what you are trying to achieve. That is it.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="book-whatsapp"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#25D366] hover:underline"
                >
                  Prefer WhatsApp?
                </a>
                <Link
                  href="/contact"
                  data-cta="book-contact"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1044ff] hover:underline"
                >
                  Send us a message instead
                </Link>
              </div>
            </div>

            {/* Right: Calendly widget */}
            <div className="pt-4 lg:pt-16">
              <CalendlyEmbed />
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
