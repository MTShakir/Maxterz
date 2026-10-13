'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  ShieldCheck,
  CheckCircle,
  Lightbulb,
  Pencil,
  Eye,
  Package,
  BarChart2,
  Play,
  Monitor,
  Zap,
  BookOpen,
  Share2,
  ChevronLeft,
  ChevronRight,
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
import { faqs } from '@/content/faq/thumbnail-design';

/* ─── static data ─────────────────────────────────────────────── */
/* Copy on this page is written for maxterz.com only; none of it comes from the ThumbLab site (D06). */

const marqueeWords = [
  'CTR OPTIMISATION', 'YOUTUBE THUMBNAILS', 'CLEAR HOOKS', 'VISUAL PSYCHOLOGY',
  'SCROLL PATTERNS', 'CLICK TRIGGERS', 'COLOUR CONTRAST', 'MOBILE READABILITY',
  'FACE EXPRESSIONS', 'BOLD TYPOGRAPHY',
];

/* Offer facts from the price book (docs/05-offers.md 2.2) and SITE.proof, not industry statistics. */
const manifestoStats = [
  { value: '1 to 2', label: 'working days to deliver a single thumbnail' },
  { value: '30', label: 'thumbnails in a pack, to use within 60 days' },
  { value: SITE.proof.projects, label: `projects delivered since ${SITE.proof.fiverrSince}` },
];

/*
 * Illustrated examples of what a planned thumbnail changes. They are design examples,
 * not client results, so they carry no numbers (brief rule 3).
 */
const beforeAfterData = [
  {
    id: 1,
    niche: 'Technology review',
    beforeBadge: 'Long title',
    afterBadge: 'Short hook',
    changeLabel: 'Composition',
    changeBefore: 'No focal point',
    changeAfter: 'One focal point',
    colour: 'Bold accent',
    note: 'One accent colour pulls the eye to the title.',
    afterGradient: 'from-[#1044ff] to-[#0020bf]',
    afterAccentHex: '#e7811e',
    afterTitle: 'THE TRUTH ABOUT',
    afterSubtitle: 'THIS PRODUCT',
  },
  {
    id: 2,
    niche: 'Fitness and lifestyle',
    beforeBadge: 'Long title',
    afterBadge: 'Short hook',
    changeLabel: 'Type',
    changeBefore: 'Small text',
    changeAfter: 'Big, bold type',
    colour: 'Warm palette',
    note: 'A clear promise that reads at phone size.',
    afterGradient: 'from-[#e7811e] to-[#e7581e]',
    afterAccentHex: '#ffffff',
    afterTitle: 'TRANSFORM IN',
    afterSubtitle: '30 DAYS FLAT',
  },
  {
    id: 3,
    niche: 'Finance and investing',
    beforeBadge: 'Long title',
    afterBadge: 'Short hook',
    changeLabel: 'Contrast',
    changeBefore: 'Flat colours',
    changeAfter: 'High contrast',
    colour: 'Dark base',
    note: 'A dark base and one bright accent feel calm and credible.',
    afterGradient: 'from-gray-900 to-gray-700',
    afterAccentHex: '#e7811e',
    afterTitle: 'HOW TO START',
    afterSubtitle: 'INVESTING',
  },
];

const platforms = [
  {
    name: 'YouTube Thumbnails',
    desc: 'Standard 16:9 thumbnails designed for the YouTube feed, sidebar, and recommended sections.',
    icon: <Play className="w-6 h-6" aria-hidden="true" />,
    color: 'bg-red-50 text-red-500',
  },
  {
    name: 'YouTube Shorts',
    desc: 'Vertical 9:16 cover art that stops the scroll in the Shorts feed and drives taps.',
    icon: <Zap className="w-6 h-6" aria-hidden="true" />,
    color: 'bg-red-50 text-red-400',
  },
  {
    name: 'Podcast Cover Art',
    desc: 'Square artwork for Spotify, Apple Podcasts, and every major audio platform.',
    icon: <Monitor className="w-6 h-6" aria-hidden="true" />,
    color: 'bg-[#1044ff]/10 text-[#1044ff]',
  },
  {
    name: 'Online Course Covers',
    desc: 'Course thumbnails for Udemy, Skillshare and Teachable that stand out in search results.',
    icon: <BookOpen className="w-6 h-6" aria-hidden="true" />,
    color: 'bg-green-50 text-green-600',
  },
  {
    name: 'Stream and Twitch Art',
    desc: 'Offline screens, panels, and scene thumbnails that build consistent channel identity.',
    icon: <BarChart2 className="w-6 h-6" aria-hidden="true" />,
    color: 'bg-purple-50 text-purple-500',
  },
  {
    name: 'Social Video Covers',
    desc: 'Reel covers, Facebook video thumbnails, and LinkedIn headers done properly.',
    icon: <Share2 className="w-6 h-6" aria-hidden="true" />,
    color: 'bg-orange-50 text-[#e7811e]',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Brief and Niche',
    desc: 'You send the video title and topic. We look at what works in your niche.',
    icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
    tilt: -1.5,
  },
  {
    step: '02',
    title: 'Visual Strategy',
    desc: 'We plan the hook: one focal point, a short title and colours that stand out.',
    icon: <Pencil className="w-6 h-6" aria-hidden="true" />,
    tilt: 1.5,
  },
  {
    step: '03',
    title: 'Design',
    desc: 'We design your thumbnail at 1280 by 720, built to read on a phone screen.',
    icon: <Eye className="w-6 h-6" aria-hidden="true" />,
    tilt: -1,
  },
  {
    step: '04',
    title: 'Feedback and Delivery',
    desc: 'Tell us what to change, then get your final file, ready to upload.',
    icon: <Package className="w-6 h-6" aria-hidden="true" />,
    tilt: 1,
  },
];

/* ─── helpers ─────────────────────────────────────────────────── */

/**
 * Small label above a price card title (inventory section 3).
 * @param {{ tier_label?: string | null, name: string, model: string, unit?: string | null }} item
 */
function priceEyebrow(item) {
  if (item.tier_label) return item.name;
  if (item.model === 'monthly' || item.unit === 'per month') return 'Ongoing';
  if (item.model === 'quote') return 'Custom quote';
  if (item.model === 'from') return 'Starting price';
  if (item.model === 'per-unit') return 'Per item';
  return 'Fixed price';
}

/** Price card columns, so one or two cards never leave empty columns. */
const priceGrid = (count) =>
  count >= 3 ? 'md:grid-cols-3' : count === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'max-w-md mx-auto';

/**
 * An FAQ answer with its optional in-text link (src/content/faq).
 * @param {{ faq: { a: string, link?: { text: string, href: string } } }} props
 */
function FaqAnswer({ faq }) {
  const at = faq.link ? faq.a.indexOf(faq.link.text) : -1;
  if (at === -1) return faq.a;
  return (
    <>
      {faq.a.slice(0, at)}
      <Link href={faq.link.href} className="text-[#1044ff] font-semibold hover:underline">
        {faq.link.text}
      </Link>
      {faq.a.slice(at + faq.link.text.length)}
    </>
  );
}

/** Smooth scroll to an in-page section; an instant jump when the visitor prefers reduced motion. */
const scrollToSection = (event, id) => {
  const el = document.getElementById(id);
  if (!el) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
};

/* ─── component ───────────────────────────────────────────────── */

/**
 * YouTube thumbnail design by ThumbLab (D06, D30: layout kept). All data is read on the
 * server in page.jsx and passed in as props. Case study and recent work stay hidden until
 * Phase 5 passes data.
 *
 * @param {{
 *   h1: string,
 *   prices?: object[],
 *   fromPrice?: number | null,
 *   billing?: 'one-off' | 'monthly',
 *   slides?: object[],
 *   reviews?: object[],
 *   bookHref: string,
 *   caseStudy?: object | null,
 *   projects?: object[],
 * }} props
 */
const ThumbnailDesign = ({
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
  const [currentBA, setCurrentBA] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextBA = () => {
    setDirection(1);
    setCurrentBA((c) => (c + 1) % beforeAfterData.length);
  };
  const prevBA = () => {
    setDirection(-1);
    setCurrentBA((c) => (c - 1 + beforeAfterData.length) % beforeAfterData.length);
  };

  const item = beforeAfterData[currentBA];

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      {/* ─── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-50 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none opacity-70" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="badge-standard-light mb-8">{h1}</h1>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] text-balance">
                Stop the Scroll.{' '}
                <span className="text-[#e7811e]">Win the Click.</span>{' '}
                <span className="text-[#1044ff]">Grow the Channel.</span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Your thumbnail decides whether a viewer watches or scrolls past. We design YouTube thumbnails that earn the click, for business channels, brands and creators.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="Thumbnails" className="mb-12" />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg bg-[#e7811e] hover:bg-[#e7581e] shadow-xl shadow-orange-500/25 w-full sm:w-auto transition-transform hover:scale-105"
                >
                  <Link href={bookHref} data-cta="book-a-free-call">
                    {BOOK_LABEL}
                  </Link>
                </Button>
                {prices.length > 0 && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm"
                  >
                    <a href="#prices" onClick={(event) => scrollToSection(event, 'prices')}>
                      See prices <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider mb-8">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#eb7444] fill-current" aria-hidden="true" /> {SITE.proof.fiverrRating} stars on Fiverr
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1044ff]" aria-hidden="true" /> {SITE.proof.fiverrReviews} reviews on Fiverr
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e7811e]" aria-hidden="true" /> {SITE.proof.thumbnailReviews} thumbnail reviews on Fiverr
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-8">
                ThumbLab is the thumbnail studio by Maxterz.{' '}
                <a
                  href={SITE.thumblabUrl}
                  rel="noopener"
                  data-cta="thumblab"
                  className="font-semibold text-[#1044ff] underline underline-offset-4 hover:text-[#0020bf]"
                >
                  Visit the ThumbLab website
                </a>
                .
              </p>
            </motion.div>
          </div>
        </div>

        <WorkImageStrip slides={slides} label="Recent Thumbnail Work" fadeColor="#ffffff" />
      </section>

      {/* ─── 2. CTR MANIFESTO ─────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">CTR</span>
        </div>

        <div className="overflow-hidden border-b border-white/15 py-5" aria-hidden="true">
          <style>{`@keyframes tdmq { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { .tdmq-track { animation: none !important; } }`}</style>
          <div className="tdmq-track flex gap-10 whitespace-nowrap" style={{ animation: 'tdmq 30s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 mb-8">
              THE THUMBNAIL REALITY
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
              Your Thumbnail Has<br />
              One Job.<br />
              <span className="text-[#e7811e]">Earn the Click.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 rounded-2xl overflow-hidden">
              {manifestoStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-[#0020bf] p-8 md:p-10 hover:bg-white/10 transition-colors duration-300"
                >
                  <p className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter">{stat.value}</p>
                  <p className="text-white/60 text-sm leading-relaxed uppercase tracking-wider font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="overflow-hidden border-t border-white/15 py-5" aria-hidden="true">
          <div className="tdmq-track flex gap-10 whitespace-nowrap" style={{ animation: 'tdmq 22s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e]/50 mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. BEFORE / AFTER EXAMPLES ──────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">THE TRANSFORMATION</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Before Our Design. After Our Design.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Illustrated examples of what changes when a thumbnail is planned for the click.
            </p>
          </motion.div>

          {/* Before/After cards */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentBA}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* The two panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {/* BEFORE panel */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        Before
                      </span>
                      <span className="text-xs text-gray-400 font-medium">Generic, no visual strategy</span>
                    </div>
                    <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-gray-200 border-4 border-gray-200 shadow-sm">
                      {/* Plain thumbnail mockup */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-3">
                        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-400 fill-gray-400" aria-hidden="true" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-sm font-medium leading-snug">
                            My Video About Something<br />Important For You
                          </p>
                          <p className="text-gray-400 text-xs mt-2">Channel Name</p>
                        </div>
                      </div>
                      {/* What is wrong */}
                      <div className="absolute top-3 left-3 bg-gray-600/80 text-white text-xs font-bold font-mono px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        {item.beforeBadge}
                      </div>
                    </div>
                  </div>

                  {/* AFTER panel */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#1044ff' }}>
                        After
                      </span>
                      <span className="text-xs text-gray-400 font-medium">Planned for the click</span>
                    </div>
                    <div className={`relative aspect-video rounded-[1.5rem] overflow-hidden bg-gradient-to-br ${item.afterGradient} border-4 shadow-2xl shadow-blue-500/20`} style={{ borderColor: `${item.afterAccentHex}40` }}>
                      {/* Decorative accent circle */}
                      <div
                        className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-80"
                        style={{ backgroundColor: item.afterAccentHex }}
                      />
                      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                        <p
                          className="font-black text-xl sm:text-2xl leading-tight tracking-tight text-white drop-shadow-lg"
                        >
                          {item.afterTitle}<br />
                          <span style={{ color: item.afterAccentHex }}>{item.afterSubtitle}</span>
                        </p>
                      </div>
                      {/* What changed */}
                      <div
                        className="absolute top-3 left-3 z-20 text-white text-xs font-bold font-mono px-2.5 py-1 rounded-lg"
                        style={{ backgroundColor: item.afterAccentHex === '#ffffff' ? '#1044ff' : item.afterAccentHex }}
                      >
                        {item.afterBadge}
                      </div>
                    </div>
                  </div>
                </div>

                {/* What changed bar */}
                <div className="bg-gray-50 rounded-[1.5rem] border border-gray-100 p-6">
                  <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-5">
                    {item.niche}: illustrated example
                  </p>
                  <div className="flex flex-wrap items-center justify-around gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 justify-center mb-1">
                        <span className="text-xl font-black text-gray-400 line-through">{item.changeBefore}</span>
                        <ArrowRight className="w-4 h-4 text-[#1044ff] flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">changed to</span>
                        <span className="text-xl font-black text-[#1044ff]">{item.changeAfter}</span>
                      </div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.changeLabel}</p>
                    </div>
                    <div className="h-10 w-px bg-gray-200 hidden sm:block flex-shrink-0" />
                    <div className="text-center">
                      <p className="text-2xl font-black text-green-600 mb-1">{item.colour}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Colour</p>
                    </div>
                    <div className="h-10 w-px bg-gray-200 hidden sm:block flex-shrink-0" />
                    <div className="text-center max-w-[200px]">
                      <p className="text-sm text-gray-600 font-medium leading-snug">{item.note}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              type="button"
              onClick={prevBA}
              aria-label="Previous example"
              className="w-11 h-11 rounded-full border-2 border-gray-200 hover:border-[#1044ff] hover:text-[#1044ff] text-gray-400 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex gap-2 items-center">
              {beforeAfterData.map((example, i) => (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => { setDirection(i > currentBA ? 1 : -1); setCurrentBA(i); }}
                  aria-label={`Show example ${i + 1}: ${example.niche}`}
                  aria-current={i === currentBA ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentBA ? 'bg-[#1044ff] w-6' : 'bg-gray-200 w-2 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextBA}
              aria-label="Next example"
              className="w-11 h-11 rounded-full border-2 border-gray-200 hover:border-[#1044ff] hover:text-[#1044ff] text-gray-400 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            {currentBA + 1} of {beforeAfterData.length} examples
          </p>
        </div>
      </section>

      {/* ─── 4. PLATFORMS WE DESIGN FOR ───────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WHAT WE DESIGN</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Every Platform. Every Format.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From YouTube feeds to podcast shelves. Wherever your audience sees you first, we design for the click.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((platform, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.09 }}
                className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
              >
                <span className="absolute -bottom-4 -right-4 text-[90px] font-black text-gray-100/70 leading-none select-none pointer-events-none group-hover:text-blue-50 transition-colors duration-300" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${platform.color}`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight group-hover:text-[#1044ff] transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{platform.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. PROCESS ───────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">THE CREATIVE PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Strategy First. Design Second.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Good-looking is not enough. Every thumbnail is planned around the click.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            {processSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  whileHover={{ rotate: step.tilt, scale: 1.03, y: -10 }}
                  style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
                  className="flex-1 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm cursor-default relative overflow-hidden group"
                >
                  <span className="absolute -bottom-4 -right-2 text-[100px] font-black text-gray-100 select-none leading-none pointer-events-none group-hover:text-orange-50 transition-colors duration-300" aria-hidden="true">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-orange-50 text-[#e7811e] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#e7811e] group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 tracking-tight group-hover:text-[#e7811e] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </motion.div>

                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-gray-300" aria-hidden="true" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. CASE STUDY (renders only when Phase 5 passes a real case study) ─── */}
      {caseStudy && (
        <section className="py-16 px-4 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
              Visuals that drive growth beyond the feed.
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-white p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-auto md:h-[400px] flex-shrink-0 relative">
                {caseStudy.image_url ? (
                  <img
                    src={caseStudy.image_url}
                    alt={caseStudy.title || 'Case study'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start py-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#e7811e] text-xs font-bold uppercase tracking-widest mb-5 border border-orange-100">
                  Case Study
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                  {caseStudy.title}
                </h3>
                <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed font-light">
                  {caseStudy.description}
                </p>
                {caseStudy.key_result && (
                  <div className="bg-gradient-to-r from-orange-50 to-white border-l-4 border-[#e7811e] p-5 rounded-r-xl w-full shadow-sm">
                    <p className="text-[#e7811e] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <CheckCircle size={14} aria-hidden="true" /> Key Result
                    </p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{caseStudy.key_result}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 7. RECENT WORK (renders only when Phase 5 passes real projects) ─── */}
      {projects.length > 0 && (
        <section id="thumbnail-work" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">
                  RECENT THUMBNAIL WORK
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Thumbnails That Win Clicks.
                </h2>
              </div>
              <Link
                href="/our-work"
                className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors"
              >
                View all work <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white"
                >
                  <Link href={`/our-work/${project.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        alt={project.title}
                        src={project.main_image}
                      />
                      <div className="absolute inset-0 bg-[#e7811e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#e7811e]" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pb-3 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#e7811e] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 font-medium text-sm line-clamp-2 leading-relaxed">
                        {project.short_description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. PRICES ────────────────────────────────────────────── */}
      {prices.length > 0 && (
        <section id="prices" className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="badge-standard-light">THUMBNAIL PRICES</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Pick Your Plan. Grow Your Channel.
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Try one thumbnail, buy a pack of 30 for your next run of uploads, or ask for a monthly plan.
              </p>
            </motion.div>

            <div className={`grid grid-cols-1 ${priceGrid(prices.length)} gap-6 items-stretch`}>
              {prices.map((price, idx) => {
                const featured = price.popular;
                return (
                  <motion.div
                    key={price.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col gap-6 border transition-all duration-300 ${
                      featured
                        ? 'bg-gradient-to-br from-[#e7811e] to-[#e7581e] border-transparent shadow-2xl shadow-orange-500/25 scale-[1.02]'
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {featured && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#1044ff] text-white whitespace-nowrap">
                        Most popular
                      </span>
                    )}

                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${featured ? 'text-white/60' : 'text-gray-400'}`}>
                      {priceEyebrow(price)}
                    </span>

                    <h3 className={`text-2xl font-black tracking-tight leading-tight ${featured ? 'text-white' : 'text-gray-900'}`}>
                      {price.tier_label || price.name}
                    </h3>

                    <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                      {price.display.prefix && (
                        <span className={`text-lg font-semibold mb-1.5 ${featured ? 'text-white/60' : 'text-gray-500'}`}>
                          {price.display.prefix}
                        </span>
                      )}
                      <span className={`${price.price_gbp == null ? 'text-4xl' : 'text-5xl'} font-black tracking-tighter ${featured ? 'text-white' : 'text-gray-900'}`}>
                        {price.display.amount}
                      </span>
                      {price.display.suffix && (
                        <span className={`text-lg font-semibold mb-1.5 ${featured ? 'text-white/60' : 'text-gray-500'}`}>
                          {price.display.suffix}
                        </span>
                      )}
                    </div>
                    {price.display.setup && (
                      <p className={`-mt-4 text-sm font-semibold ${featured ? 'text-white/80' : 'text-gray-500'}`}>
                        {price.display.setup}
                      </p>
                    )}

                    <div className={`h-px w-full ${featured ? 'bg-white/20' : 'bg-gray-100'}`} />

                    {price.includes?.length > 0 && (
                      <ul className="flex flex-col gap-3 flex-grow">
                        {price.includes.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle
                              size={16}
                              aria-hidden="true"
                              className={`flex-shrink-0 mt-0.5 ${featured ? 'text-white/70' : 'text-[#e7811e]'}`}
                            />
                            <span className={`text-sm leading-relaxed ${featured ? 'text-white/85' : 'text-gray-600'}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {price.timeline && (
                      <div
                        className={`rounded-xl p-4 text-xs leading-relaxed font-medium ${
                          featured
                            ? 'bg-white/15 text-white/75 border border-white/20'
                            : 'bg-gray-50 text-gray-500 border border-gray-100'
                        }`}
                      >
                        Delivery: {price.timeline}
                      </div>
                    )}

                    <div className="mt-auto flex flex-col gap-3">
                      <Button
                        asChild
                        size="lg"
                        className={`rounded-full h-12 text-sm font-bold transition-transform hover:scale-105 ${
                          featured
                            ? 'bg-white bg-none text-[#c2410c] hover:bg-gray-50 shadow-lg'
                            : 'bg-[#e7811e] text-white hover:bg-[#e7581e]'
                        }`}
                      >
                        <Link href={price.book_href} data-cta="book-a-free-call">
                          {BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                        </Link>
                      </Button>
                      {price.buy_url && (
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className={`rounded-full h-12 text-sm font-bold ${
                            featured ? 'border-white text-white bg-transparent' : ''
                          }`}
                        >
                          <a href={price.buy_url} target="_blank" rel="noopener noreferrer" data-cta="buy-now">
                            Buy now
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-500 text-sm mt-10"
            >
              Need something custom?{' '}
              <Link href={bookHref} data-cta="book-a-free-call" className="text-[#1044ff] font-semibold hover:underline">
                {BOOK_LABEL}
              </Link>
              .
            </motion.p>
          </div>
        </section>
      )}

      {/* ─── 9. REVIEWS (renders nothing without reviews) ─────────── */}
      <ServiceReviews reviews={reviews} className="bg-white border-t border-gray-100" />

      {/* ─── 10. FAQ ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">QUESTIONS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Common Questions
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-white px-6 rounded-2xl border border-gray-100"
              >
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-[#e7811e] text-left py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                  <FaqAnswer faq={faq} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── 11. CTA ──────────────────────────────────────────────── */}
      {related}

      <CTASection
        headline="Ready for Thumbnails That Earn the Click?"
        subtext="Book a free call. Tell us about your channel and upload schedule, and we will recommend the right option, with a fixed quote before work starts."
        service="thumbnail-design"
      />
    </div>
  );
};

export default ThumbnailDesign;
