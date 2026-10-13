import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Star, CalendarClock, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ServiceReviews from '@/components/service/ServiceReviews';
import CTASection from '@/components/home/CTASection';
import { BOOK_LABEL } from '@/lib/cta';
import { formatGBP } from '@/lib/pricing-calc';
import { SITE } from '@/lib/site';

const MM_URL = 'https://mmwindows-cleaning.co.uk/';

/** Row label for the value stack, e.g. "Brand identity (Core)" or "Social media post design, 5 posts". */
const partLabel = ({ item, quantity }) =>
  `${item.name}${item.tier_label ? ` (${item.tier_label})` : ''}${quantity > 1 ? `, ${quantity} posts` : ''}`;

/**
 * Launch Kit offer page (brief 7.6a, D03, D38). Server-rendered with no animation library,
 * so it loads fast for ads and outreach. Every price comes from Supabase through the page.
 * The logo is never called "free"; the founding price shows only while it is switched on.
 *
 * @param {{
 *   h1: string, kit: object, care: object | null, starter: object | null, scale: object | null,
 *   parts: Array<{ item: object, quantity: number }>, value: number | null,
 *   saving: { amount: number, percent: number } | null, reviews: object[],
 *   faqs: Array<{ q: string, a: string }>, bookHref: string, related?: React.ReactNode,
 * }} props
 */
export default function LaunchKit({ h1, kit, care, starter, scale, parts, value, saving, reviews, faqs, bookHref, related }) {
  if (!kit) return null;
  const founding = kit.founding_enabled && kit.founding_price_gbp;

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20 px-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden="true" />
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="badge-standard-light mb-8">{h1}</h1>
          <p className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] text-balance">
            Look Established. <span className="text-[#1044ff]">Get Found.</span>
          </p>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Your brand, website and Google profile, built by one team with one point of contact. Live in {kit.timeline} from receiving your content.
          </p>

          <div className="mx-auto mb-10 max-w-xl rounded-[2rem] border border-gray-100 bg-gray-50 p-8 text-left shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Launch Kit</p>
            <p className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold tracking-tight text-gray-900">{formatGBP(kit.price_gbp)}</span>
              {value && <span className="text-sm font-semibold text-gray-500">Bought separately: {formatGBP(value)}</span>}
            </p>
            {founding && (
              <p className="mt-4 rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-[#c2410c]">
                Founding price for the first {kit.founding_slots} clients: {formatGBP(kit.founding_price_gbp)}, in return for a video testimonial and a case study.
              </p>
            )}
            {care && (
              <p className="mt-4 text-sm font-semibold text-gray-600">
                Then {care.name} from launch: {formatGBP(care.price_gbp)} a month ({care.minimum_term}).
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href={bookHref}
              data-cta="book-a-free-call"
              className="inline-flex min-h-[56px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] px-8 text-lg font-bold text-white shadow-xl shadow-blue-500/20 transition-transform hover:scale-105"
            >
              {BOOK_LABEL} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a
              href="#included"
              className="inline-flex min-h-[56px] w-full sm:w-auto items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 text-lg font-bold text-gray-800 transition-colors hover:border-[#1044ff] hover:text-[#1044ff]"
            >
              See what is included
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-wider text-gray-800">
            <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-current text-[#c2410c]" aria-hidden="true" /> {SITE.proof.fiverrRating} stars on Fiverr</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#1044ff]" aria-hidden="true" /> {SITE.proof.fiverrReviews} reviews on Fiverr</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" /> {SITE.proof.projects} projects since {SITE.proof.fiverrSince}</span>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="bg-gray-50 border-y border-gray-100 py-24 px-4">
        <div className="container mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Who it is for</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1044ff]" aria-hidden="true" /> New businesses that want to look established from day one.</li>
              <li className="flex gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1044ff]" aria-hidden="true" /> Businesses with a dated look that are losing work to sharper competitors.</li>
              <li className="flex gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1044ff]" aria-hidden="true" /> Owners who want one team for brand, website and Google, not five freelancers.</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Who it is not for</h2>
            <ul className="space-y-4 text-gray-700">
              <li>Large online stores: see <Link href="/services/web-development/ecommerce-website-design" className="font-semibold text-[#1044ff] underline underline-offset-4">ecommerce website design</Link>.</li>
              <li>Apps and custom software: see <Link href="/services/web-development/app-and-software-development" className="font-semibold text-[#1044ff] underline underline-offset-4">app and software development</Link>.</li>
              <li>Businesses that only need a logo: see <Link href="/services/branding-design/logo-design" className="font-semibold text-[#1044ff] underline underline-offset-4">logo design</Link>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED: value stack */}
      <section id="included" className="py-24 px-4 bg-white scroll-mt-28">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="badge-standard-light">WHAT IS INCLUDED</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Everything to Launch Properly.</h2>
            <p className="mt-4 text-gray-500">Each part is a service we also sell on its own, at the price shown.</p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm">
            <table className="w-full text-left">
              <caption className="sr-only">What the Launch Kit includes and what each part costs on its own</caption>
              <thead className="bg-gray-50 text-sm uppercase tracking-wider text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">Included</th>
                  <th scope="col" className="px-6 py-4 font-bold text-right">On its own</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {parts.map((part) => (
                  <tr key={part.price_item_id}>
                    <td className="px-6 py-5 align-top">
                      <span className="block font-bold text-gray-900">{partLabel(part)}</span>
                      {part.item.includes?.length > 0 && (
                        <span className="mt-1 block text-sm text-gray-500">{part.item.includes.join(', ')}.</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right align-top font-semibold text-gray-700 whitespace-nowrap">
                      {formatGBP(part.item.price_gbp * part.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                {value && (
                  <tr>
                    <th scope="row" className="px-6 py-4 font-bold text-gray-900">Bought separately</th>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">{formatGBP(value)}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row" className="px-6 py-4 font-bold text-[#1044ff]">Launch Kit price</th>
                  <td className="px-6 py-4 text-right text-xl font-extrabold text-[#1044ff]">{formatGBP(kit.price_gbp)}</td>
                </tr>
                {saving && (
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-gray-700">You save</th>
                    <td className="px-6 py-4 text-right font-semibold text-gray-700">{formatGBP(saving.amount)} ({saving.percent}%)</td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* TIMELINE AND CARE PLUS */}
      <section className="bg-gradient-to-br from-[#1044ff] to-[#0020bf] py-24 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-14 text-center text-4xl md:text-5xl font-bold tracking-tight">Live in {kit.timeline}.</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            <li className="rounded-[2rem] bg-white/10 p-8">
              <CalendarClock className="mb-4 h-7 w-7" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-widest text-white">Week 1</p>
              <p className="mt-2 text-xl font-bold">Your brand</p>
              <p className="mt-2 text-blue-50">Discovery, logo concepts, colours, typography and your brand guidelines.</p>
            </li>
            <li className="rounded-[2rem] bg-white/10 p-8">
              <Sparkles className="mb-4 h-7 w-7" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-widest text-white">Weeks 2 to 4</p>
              <p className="mt-2 text-xl font-bold">Your website and profiles</p>
              <p className="mt-2 text-blue-50">Website design and build, Google Business Profile, 3 social accounts and 5 launch posts.</p>
            </li>
            <li className="rounded-[2rem] bg-white/10 p-8">
              <CheckCircle className="mb-4 h-7 w-7" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-widest text-white">Launch</p>
              <p className="mt-2 text-xl font-bold">You go live</p>
              <p className="mt-2 text-blue-50">
                {care
                  ? `${care.name} starts on launch day for ${formatGBP(care.price_gbp)} a month: hosting, security, edits and Google profile management.`
                  : 'Your business goes live, ready for enquiries.'}
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* GUARANTEES AND FOUNDING TERMS */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8 md:p-10">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Two guarantees</h2>
            <ol className="space-y-5 text-gray-700">
              <li><span className="font-bold text-gray-900">On time.</span> You go live in {kit.timeline} from receiving your content, or your first month of Care Plus is free.</li>
              <li><span className="font-bold text-gray-900">A logo you like.</span> If none of the first 4 logo concepts works for you, we design 4 new ones at no extra cost.</li>
            </ol>
          </div>
          {founding ? (
            <div className="rounded-[2rem] border border-orange-100 bg-orange-50 p-8 md:p-10">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Founding clients</h2>
              <p className="text-gray-700 leading-relaxed">
                The first {kit.founding_slots} Launch Kit clients pay {formatGBP(kit.founding_price_gbp)} instead of {formatGBP(kit.price_gbp)}. In return, you agree in writing that we can record a short video testimonial and publish a case study about your project. When the {kit.founding_slots} places are taken, the founding price ends.
              </p>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8 md:p-10">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">How payment works</h2>
              <p className="text-gray-700 leading-relaxed">{kit.payment_terms}. You get a fixed quote before any work starts.</p>
            </div>
          )}
        </div>
      </section>

      {/* PROOF (D38) */}
      <section className="bg-gray-50 border-y border-gray-100 py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="badge-standard-light">THE LAUNCH KIT IN ACTION</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">MM Window Cleaning</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
            A UK window cleaning business that received this kit: a logo, a website with a lead form, 3 social profiles, post designs and Google Business Profile set-up, plus a logo animation.
          </p>
          <a
            href={MM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="outbound-mm-window-cleaning"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 font-bold text-gray-800 hover:border-[#1044ff] hover:text-[#1044ff]"
          >
            Visit the MM Window Cleaning website <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <ServiceReviews reviews={reviews} />

      {/* COMPARISON */}
      {(starter || scale) && (
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Not quite the right fit?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {starter && <>The <span className="font-bold text-gray-900">{starter.name}</span> ({formatGBP(starter.price_gbp)}) gets a new business looking professional fast. </>}
              {scale && <>The <span className="font-bold text-gray-900">{scale.name}</span> ({formatGBP(scale.price_gbp)}) adds a larger website, SEO and a motion graphics ad. </>}
              <Link href="/packages#packages" className="font-semibold text-[#1044ff] underline underline-offset-4">Compare all packages</Link>.
            </p>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-100 py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <span className="badge-standard-light">QUESTIONS</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={faq.q} value={`item-${idx}`} className="bg-white px-6 rounded-2xl border border-gray-100">
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-[#1044ff] text-left py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {related}

      <CTASection
        headline="Ready to Launch Your Business Properly?"
        subtext="Book a free 30-minute call. We look at where you are today and map out your Launch Kit, week by week."
        service="launch-kit"
      />
    </div>
  );
}
