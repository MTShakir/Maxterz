import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';
import Link from 'next/link';

const route = ROUTES.find(r => r.path === '/thank-you');
export const metadata = buildMetadata({ ...route, noindex: true });

/** What happens next, by form type (brief 7.13). */
const MESSAGES = {
  contact: {
    lead: 'We have your message. Talha will reply within one working day.',
    steps: [
      'Talha reads your message and looks at your website.',
      'You get a reply with any questions or a clear next step within one working day.',
      'If it helps, we book a free 30-minute call to plan the work.',
    ],
  },
  audit: {
    lead: 'We have your audit request. Your video will reach you within 48 hours.',
    steps: [
      'Talha reviews your website for speed, SEO and conversion.',
      'You get a short personal video with the 3 fixes that would bring you more enquiries.',
      'If you want help with the fixes, reply to the email or book a free call.',
    ],
  },
  call: {
    lead: 'Your call is booked. Check your inbox for the calendar invite.',
    steps: [
      'You get a calendar invite now and a reminder before the call.',
      'Before the call, Talha looks at your website and your goals.',
      'On the call you get a clear plan. If it fits, a fixed quote follows within one working day.',
    ],
  },
  purchase: {
    lead: 'Thank you for your order. Stripe has emailed your receipt.',
    steps: [
      'Talha emails you within one working day to collect your brief.',
      'Work starts as soon as we have your brief.',
      'You get your files by the delivery time for your order, with the revision rounds it includes.',
    ],
  },
};

export default async function ThankYouPage({ searchParams }) {
  const { type } = await searchParams;
  const message = Object.hasOwn(MESSAGES, type ?? '') ? MESSAGES[type] : MESSAGES.contact;

  return (
    <>
      <PageSchema path="/thank-you" />
      <main className="min-h-screen bg-[#efefef] pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-xl text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {route.h1}
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">{message.lead}</p>

          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">What happens next</h2>
          <ol className="text-left bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 mb-10 space-y-4">
            {message.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1044ff] text-white text-sm font-bold flex items-center justify-center" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/our-work"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white font-bold text-[15px] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              See our work
            </Link>
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-[15px] hover:border-[#1044ff] hover:text-[#1044ff] transition-all duration-300"
            >
              Read client reviews
            </Link>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full bg-[#25D366] text-gray-900 font-bold text-[15px] hover:bg-[#1ebe5a] transition-colors duration-300"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
