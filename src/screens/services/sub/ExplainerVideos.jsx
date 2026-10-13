'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Star,
  ShieldCheck,
  FileText,
  LayoutPanelLeft,
  Mic,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import WorkImageStrip from '@/components/WorkImageStrip';
import CTASection from '@/components/home/CTASection';
import FromPriceLine from '@/components/service/FromPriceLine';
import ServiceReviews from '@/components/service/ServiceReviews';
import { BOOK_LABEL } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/explainer-videos';
import SharedTypeWriter from '@/components/TypeWriter';

/* ─── typewriter ─────────────────────────────────────────────── */
const EV_STYLES = `
  @keyframes ev-blink { 0%,100%{opacity:1} 50%{opacity:0} }
`;

const PHRASES = [
  'Convert Viewers.',
  'Close More Demos.',
  'Explain It Fast.',
  'Win More Trials.',
  'Drive More Sign-Ups.',
  'Tell It Simply.',
];

const TypeWriter = () => <SharedTypeWriter phrases={PHRASES} blink="ev-blink" />;

/* ─── process steps (what is included, from the price book 2.3) ── */
const steps = [
  {
    n: '01',
    icon: <FileText className="w-5 h-5" aria-hidden="true" />,
    title: 'Creative Brief and Script',
    desc: 'We define your audience, core message, and call to action, then write (or refine) a script built around one clear idea. You approve the script before anything else is touched.',
  },
  {
    n: '02',
    icon: <LayoutPanelLeft className="w-5 h-5" aria-hidden="true" />,
    title: 'Storyboard',
    desc: 'Every scene is sketched out in a frame-by-frame storyboard, mapping visual flow, motion direction, and timing. Nothing moves until you have signed this off.',
  },
  {
    n: '03',
    icon: <Mic className="w-5 h-5" aria-hidden="true" />,
    title: 'Voiceover',
    desc: 'A professional voiceover recorded to the approved script. You hear the final recording and approve it before animation begins.',
  },
  {
    n: '04',
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    title: 'Animation',
    desc: 'Illustration and motion built to the storyboard and synced to the voiceover. Typography, characters and screen recordings come together in one clear story.',
  },
  {
    n: '05',
    icon: <Volume2 className="w-5 h-5" aria-hidden="true" />,
    title: 'Sound Design',
    desc: 'Background music, sound effects, and a final audio mix that polishes the whole piece. The difference between a good video and one that gets watched to the end.',
  },
];

/* ─── component ────────────────────────────────────────────── */
/**
 * Explainer videos service page (D30: same layout, data from the server).
 *
 * @param {{
 *   h1: string, prices?: object[], fromPrice?: number | null, billing?: 'one-off' | 'monthly',
 *   slides?: object[], reviews?: object[], bookHref: string,
 *   caseStudy?: object | null, projects?: object[], related?: React.ReactNode,
 * }} props
 *   prices: price_items for this page with display parts (shown as "from") and book_href.
 *   caseStudy and projects stay empty until Phase 5, so their sections render nothing.
 */
const ExplainerVideos = ({
  h1,
  prices = [],
  fromPrice = null,
  billing = 'one-off',
  slides = [],
  reviews = [],
  bookHref,
  caseStudy = null,
  projects = [],
  related = null,
}) => {
  return (
    <>
      <style>{EV_STYLES}</style>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <h1 className="badge-standard-light mb-8">{h1}</h1>

              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Complex Products.</span>
                <span className="block">Videos That</span>
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Script-to-screen explainer and SaaS demo videos that show viewers what you do, and why it matters, in 60 or 90 seconds.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="Explainer videos" className="mb-12" />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80">
                  <a href="#prices">See prices</a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider">
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#eb7444] fill-current" aria-hidden="true" /> {SITE.proof.fiverrRating} stars on Fiverr</span>
                <span aria-hidden="true" className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" aria-hidden="true" /> {SITE.proof.fiverrReviews} reviews on Fiverr</span>
                <span aria-hidden="true" className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" /> {SITE.proof.projects} projects since {SITE.proof.fiverrSince}</span>
              </div>
            </motion.div>
          </div>
        </div>

        <WorkImageStrip slides={slides} label="Explainer Video Work" fadeColor="#ffffff" />
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="badge-standard-light">OUR PROCESS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
              Five Steps. Zero Surprises.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              We involve you at every stage. Each step is approved before the next begins, not a surprise delivery misaligned with your vision.
            </p>
          </motion.div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08 }}
                className="relative group bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1044ff] to-[#0020bf] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
                  {/* Step meta. The sample media boxes stay out until real project media exists. */}
                  <div className="w-full">
                    <div className="flex items-center gap-4 mb-5">
                      <span aria-hidden="true" className="text-5xl font-black text-gray-100 group-hover:text-white/20 leading-none select-none tabular-nums transition-colors duration-300">{step.n}</span>
                      <div className="w-10 h-10 rounded-xl bg-[#1044ff]/10 border border-[#1044ff]/15 group-hover:bg-white/20 group-hover:border-white/30 flex items-center justify-center text-[#1044ff] group-hover:text-white flex-shrink-0 transition-all duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-white mb-3 tracking-tight transition-colors duration-300">{step.title}</h3>
                    <p className="text-gray-500 group-hover:text-white/75 text-sm leading-relaxed max-w-3xl transition-colors duration-300">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY (renders only with a real case study, Phase 5) ── */}
      {caseStudy && (
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="badge-standard-light">CASE STUDY</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">It Works. Here Is the Proof.</h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
            >
              <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden bg-gray-100 aspect-[4/3] md:h-[400px] flex-shrink-0 relative">
                {caseStudy.image_url
                  ? <img src={caseStudy.image_url} alt={caseStudy.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  : <div className="absolute inset-0 flex items-center justify-center"><span className="text-gray-400 text-sm">No image</span></div>
                }
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start py-4">
                {caseStudy.category_tag && (
                  <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">{caseStudy.category_tag}</span>
                )}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{caseStudy.title}</h3>
                <p className="text-gray-600 text-base mb-6 leading-relaxed font-light">{caseStudy.description}</p>
                {caseStudy.key_result && (
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#1044ff] p-5 rounded-r-xl mb-6 w-full shadow-sm">
                    <p className="text-[#1044ff] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><CheckCircle size={14} aria-hidden="true" /> Key Result</p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{caseStudy.key_result}</p>
                  </div>
                )}
                {caseStudy.cta_href && (
                  <Button asChild className="rounded-full bg-[#1044ff] hover:bg-[#0020bf] text-white px-8 h-12 shadow-lg shadow-blue-500/20">
                    <Link href={caseStudy.cta_href}>View Case Study <ArrowUpRight className="ml-2 w-4 h-4" aria-hidden="true" /></Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── RECENT WORK (renders only with real projects, Phase 5) ── */}
      {projects.length > 0 && (
        <section className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
          <div className="container mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">RECENT WORK</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Stories We Have Animated.</h2>
              </div>
              <Link href="/our-work" className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors">
                View all work <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <motion.div key={proj.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white"
                >
                  <Link href={`/our-work/${proj.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={proj.title} src={proj.main_image} />
                      <div className="absolute inset-0 bg-[#1044ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#1044ff]" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pb-3 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1044ff] transition-colors leading-tight">{proj.title}</h3>
                      <p className="text-gray-500 font-medium text-sm line-clamp-2">{proj.short_description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRICES (from Supabase, shown as "from") ──────────────── */}
      <section id="prices" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">PRICING</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Clear Starting Prices. <span className="text-[#1044ff]">No Hourly Billing.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">You get a fixed quote before work starts, so there are no surprise invoices.</p>
          </motion.div>

          {prices.length > 0 && (
            <div className={`grid gap-6 items-stretch ${prices.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'}`}>
              {prices.map((item, i) => {
                const isFeatured = Boolean(item.popular);
                const { prefix, amount, suffix, setup } = item.display;
                return (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                    className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col gap-5 border transition-all duration-300 ${
                      isFeatured
                        ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent shadow-2xl shadow-blue-500/25 scale-[1.02]'
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {isFeatured && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#e7811e] text-white">
                        Most popular
                      </span>
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isFeatured ? 'text-white/50' : 'text-gray-400'}`}>
                      {item.model === 'monthly' ? 'Monthly plan' : 'One-off project'}
                    </span>
                    <h3 className={`text-2xl font-black tracking-tight ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{item.tier_label || item.name}</h3>
                    {item.note && <p className={`text-sm leading-relaxed ${isFeatured ? 'text-white/75' : 'text-gray-500'}`}>{item.note}</p>}
                    <div className="flex flex-wrap items-end gap-x-2">
                      {prefix && <span className={`text-lg font-semibold mb-1.5 ${isFeatured ? 'text-white/60' : 'text-gray-500'}`}>{prefix}</span>}
                      <span className={`${item.price_gbp == null ? 'text-3xl' : 'text-5xl'} font-black tracking-tighter ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{amount}</span>
                      {suffix && <span className={`text-lg font-semibold mb-1.5 ${isFeatured ? 'text-white/60' : 'text-gray-500'}`}>{suffix}</span>}
                    </div>
                    {setup && <p className={`text-sm font-semibold -mt-2 ${isFeatured ? 'text-white/70' : 'text-gray-500'}`}>{setup}</p>}
                    {item.timeline && <p className={`text-sm font-semibold -mt-2 ${isFeatured ? 'text-white/70' : 'text-gray-500'}`}>Delivery: {item.timeline}</p>}
                    <div className={`h-px w-full ${isFeatured ? 'bg-white/15' : 'bg-gray-100'}`} />
                    <ul className="flex flex-col gap-3 flex-grow">
                      {(item.includes || []).map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <CheckCircle size={16} aria-hidden="true" className={`flex-shrink-0 mt-0.5 ${isFeatured ? 'text-white/60' : 'text-[#1044ff]'}`} />
                          <span className={`text-sm leading-relaxed ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-col gap-3">
                      <Button asChild size="lg" className={`rounded-full h-12 text-sm font-bold transition-transform hover:scale-105 ${isFeatured ? 'bg-none bg-white text-[#1044ff] hover:bg-gray-100 shadow-lg' : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'}`}>
                        <Link href={item.book_href} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" /></Link>
                      </Button>
                      {item.buy_url && (
                        <Button asChild variant="outline" size="lg" className="rounded-full h-12 text-sm font-bold">
                          <a href={item.buy_url} target="_blank" rel="noopener noreferrer" data-cta="buy-now">Buy now</a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <p className="text-center text-gray-500 text-base mt-10">
            Need something custom?{' '}
            <Link href={bookHref} data-cta="book-a-free-call" className="text-[#1044ff] font-semibold hover:underline">
              Book a free call
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── REVIEWS (real Fiverr reviews; renders nothing when empty) ── */}
      <ServiceReviews reviews={reviews} />

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">QUESTIONS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Common Questions</h2>
          </motion.div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white px-6 rounded-2xl border border-gray-100">
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-[#1044ff] text-left py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {related}

      <CTASection
        headline="Ready to Make Your Product Easy to Understand?"
        subtext="Book a free call. Tell us what you sell and who buys it, and we will plan the story and send a fixed quote."
        service="explainer-videos"
      />
    </>
  );
};

export default ExplainerVideos;
