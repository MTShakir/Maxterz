import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { BOOK_LABEL } from '@/lib/cta';

/**
 * Flagship offer block on the home page (brief 7.2 item 4). Server component. Every number
 * comes from the packages data through the page, so the founding price switches off in one place.
 *
 * @param {{
 *   kit: { price: string, timeline: string | null, foundingPrice: string | null, foundingSlots: number | null },
 *   value: string | null, carePrice: string | null, careTerm: string | null, parts: string[], bookHref: string,
 * }} props
 */
export default function LaunchKitOffer({ kit, value, carePrice, careTerm, parts = [], bookHref }) {
  if (!kit) return null;

  return (
    <section className="py-24 px-4 bg-white" aria-labelledby="launch-kit-offer-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 items-center rounded-[3rem] border border-gray-100 bg-gray-50/70 p-8 md:p-14 shadow-sm">
          <div>
            <span className="badge-standard-light">THE LAUNCH KIT</span>
            <h2 id="launch-kit-offer-heading" className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Look established and get found.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {`Your brand, website and Google set up${kit.timeline ? ` in ${kit.timeline} from receiving your content` : ''}, by one team with one point of contact.`}
            </p>
            {parts.length > 0 && (
              <ul className="space-y-3 mb-8">
                {parts.map((part) => (
                  <li key={part} className="flex items-start gap-3 text-gray-800 font-medium">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1044ff]" aria-hidden="true" />
                    {part}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Launch Kit</p>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-5xl font-extrabold tracking-tight text-gray-900">{kit.price}</span>
              {value && <span className="text-sm font-semibold text-gray-500">Bought separately: {value}</span>}
            </p>
            {kit.foundingPrice && (
              <p className="mt-4 rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-[#c2410c]">
                Founding price for the first {kit.foundingSlots} clients: {kit.foundingPrice}, in return for a video testimonial and a case study.
              </p>
            )}
            {carePrice && (
              <p className="mt-4 text-sm font-semibold text-gray-600">
                Care Plus from launch: {carePrice} a month{careTerm ? `, ${careTerm}` : ''}. It covers hosting, security, edits and your Google profile.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={bookHref}
                data-cta="book-a-free-call"
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] px-8 text-lg font-bold text-white shadow-xl shadow-blue-500/20 transition-transform hover:scale-105"
              >
                {BOOK_LABEL} <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/packages/launch-kit"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 text-lg font-bold text-gray-800 transition-colors hover:border-[#1044ff] hover:text-[#1044ff]"
              >
                See what is included<span className="sr-only"> in the Launch Kit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
