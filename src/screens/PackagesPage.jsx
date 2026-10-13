'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BOOK_LABEL, whatsappHref } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/packages';

import PackageCard from '@/components/packages/PackageCard';
import PainPointCard from '@/components/packages/PainPointCard';

/**
 * Packages and Pricing (brief 7.6, D39). Same sections and design as before (D30); every price
 * comes from Supabase through the server page, and values and savings are calculated (D25, D29).
 *
 * @param {{
 *   h1: string, oneTime: object[], monthly: object[], carePrice: string | null,
 *   designVideoLine: string | null, customFrom: string | null,
 *   serviceCards: Array<{ title: string, href: string, blurb: string, price: string | null, linkText: string, links: Array<{ href: string, label: string }> }>,
 *   bookHref: string,
 * }} props
 */
const PackagesPage = ({ h1, oneTime = [], monthly = [], carePrice, designVideoLine, customFrom, serviceCards = [], bookHref }) => {
  // The Design + Video price is read live from its own price item, never typed.
  const monthlyCards = monthly.map((card) =>
    card.id === 'design-subscription' && designVideoLine ? { ...card, features: [...card.features, designVideoLine] } : card,
  );

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="bg-gray-50/50 pt-8 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 mt-12 relative z-10 text-center max-w-4xl">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="badge-standard-light">{h1}</h1>
            <p className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Clear Pricing. One Team. <br />
              <span className="text-[#1044ff]">Everything Your Business Needs.</span>
            </p>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
              Choose a fixed-price package or a monthly plan, and let one team handle your brand, website and marketing. Every project gets a fixed quote before work starts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="rounded-full h-12 px-6 border-2">
                <a href="#packages">Packages</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-12 px-6 border-2">
                <a href="#monthly">Monthly plans</a>
              </Button>
              <Button asChild className="rounded-full h-12 px-6 bg-[#1044ff] hover:bg-[#0020bf] text-white">
                <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PAIN BRIDGE */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="badge-standard-light">SOUND FAMILIAR?</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">The Way Most Businesses Buy Digital Services Is Broken.</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <PainPointCard message="Juggling invoices from several different freelancers." />
            <PainPointCard message="Final bills that end up far above the budget." />
            <PainPointCard message="An SEO team that never talks to the web developer." />
          </div>
          <div className="inline-block relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10"></div>
            <p className="bg-white px-6 font-bold text-xl text-gray-900 tracking-tight">Maxterz was built to fix this.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FIXED-PRICE PACKAGES */}
      <section id="packages" className="py-24 px-4 bg-gray-50/50 scroll-mt-28">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="badge-standard-light">PACKAGES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Start Strong with a Fixed-Price Package.</h2>
            <p className="text-lg text-gray-600">For new businesses, rebrands and launches.</p>
          </div>

          {oneTime.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {oneTime.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-10">
            Prices in GBP. No VAT is added. Every project gets a fixed quote before work starts.
          </p>
        </div>
      </section>

      {/* SECTION 4: MONTHLY PLANS */}
      <section id="monthly" className="py-24 px-4 bg-white scroll-mt-28">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="badge-standard-light">MONTHLY PLANS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ongoing Support, Without the Overhead.</h2>
            <p className="text-lg text-gray-600 mb-4">One team for design, search and social, month after month.</p>
          </div>

          {monthlyCards.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {monthlyCards.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          )}

          <p className="text-center text-sm font-semibold text-gray-600 mt-10 max-w-3xl mx-auto">
            No long contracts. Design and Care plans: cancel with 30 days&apos; notice. Visibility and Partner plans: 3-month minimum, then rolling. Pay yearly and get 2 months free.
          </p>
        </div>
      </section>

      {/* SECTION 5: CARE PLUS AND SERVICE PRICES (D39) */}
      <section id="services" className="py-24 px-4 bg-gray-900 text-white scroll-mt-28">
        <div className="container mx-auto max-w-6xl">
          {carePrice && (
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-block border border-white/20 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">CARE PLUS</span>
              <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                Every website we build includes Care Plus from launch: hosting, security, edits and Google profile management for {carePrice} a month.
              </p>
            </div>
          )}

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Just Need One Service?</h2>
            <p className="text-gray-300">Each service shows its full prices on its own page.</p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <li
                key={card.href}
                className="flex h-full flex-col gap-3 rounded-[2rem] bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-extrabold text-white">
                  <Link href={card.href} className="hover:underline underline-offset-4">{card.title}</Link>
                </h3>
                <p className="text-base text-gray-300 leading-relaxed">{card.blurb}</p>
                {card.price && <p className="text-base font-bold text-white">{card.price}</p>}
                {card.links.length > 0 && (
                  <ul className="flex-grow space-y-1">
                    {card.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex min-h-[44px] items-center text-sm font-semibold text-gray-200 hover:text-white hover:underline underline-offset-4">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`${card.href}#prices`}
                  className="mt-auto inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white underline underline-offset-4"
                >
                  {card.linkText} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 6: CUSTOM QUOTE */}
      <section id="custom-quote" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center bg-gray-50/50 p-10 md:p-16 rounded-[3rem] border border-gray-100">
          <span className="badge-standard-light">SOMETHING DIFFERENT?</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Need an App, a Platform or AI Built Around You?</h2>
          <p className="text-lg text-gray-600 mb-10">
            {customFrom
              ? `Custom builds start from ${customFrom}, scoped on a free call with a fixed quote for each phase.`
              : 'Custom builds are scoped on a free call, with a fixed quote for each phase.'}{' '}
            Tell us what you need and we will map out the work, the timeline and the cost.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-[#1044ff] hover:bg-[#0020bf]">
              <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 border-2">
              <Link href="/contact">Send us your requirements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="badge-standard-light">QUESTIONS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={faq.q} value={`item-${idx}`} className="bg-white px-6 rounded-2xl border border-gray-100 shadow-sm">
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

      {/* SECTION 8: FINAL CTA */}
      <section className="py-24 px-4 bg-[#1044ff] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white">Not Sure Which Package Fits?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Book a free 30-minute call. We listen to your goals, look at what you have today and recommend the right next step. No hard sell.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-none bg-white text-[#1044ff] hover:bg-gray-100">
              <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL}</Link>
            </Button>
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-none bg-transparent border-2 border-white/60 text-white hover:bg-white/10">
              <a href={whatsappHref('packages')} target="_blank" rel="noopener noreferrer" data-cta="whatsapp">Message us on WhatsApp</a>
            </Button>
          </div>
          <p className="mb-8 text-blue-100">
            Or{' '}
            <Link href="/free-website-audit" className="font-bold text-white underline underline-offset-4">
              get a free website audit
            </Link>
            {' '}or{' '}
            <Link href="/contact" className="font-bold text-white underline underline-offset-4">
              send us your requirements
            </Link>
            .
          </p>
          <p className="text-sm font-bold text-blue-100 tracking-wider">
            {SITE.proof.fiverrRating} stars from {SITE.proof.fiverrReviews} reviews on Fiverr. UK-registered company.
          </p>
        </div>
      </section>
    </>
  );
};

export default PackagesPage;
