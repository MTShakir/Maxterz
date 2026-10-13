'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  ShieldCheck,
  CheckCircle,
  Lightbulb,
  PenTool,
  Layers,
  Package,
  Palette,
  BookOpen,
  FileText,
  LayoutTemplate,
  Compass,
  CreditCard,
  Share2,
  Store,
  Mail,
  Monitor,
  Presentation,
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
import { faqs } from '@/content/faq/brand-identity-design';

/* ─── static data ─────────────────────────────────────────────── */

/* Parts of the Core and Complete tiers (price book 2.2). */
const marqueeWords = [
  'LOGO', 'COLOUR PALETTE', 'TYPOGRAPHY', 'BRAND GUIDELINES',
  'BUSINESS CARDS', 'EMAIL SIGNATURE', 'SOCIAL PROFILE KIT', 'STATIONERY',
  'BRAND STRATEGY', 'TONE OF VOICE', 'SOCIAL TEMPLATES', 'PRESENTATION TEMPLATE',
];

/* Offer facts from the price book (docs/05-offers.md 2.2) and how we work, not industry statistics. */
const manifestoStats = [
  { value: '1 team', label: 'designs your whole identity, with one point of contact' },
  { value: '15+', label: 'pages of brand guidelines in Core, and 30+ in Complete' },
  { value: '2 to 5', label: 'weeks from brief to final files, depending on the tier' },
];

/*
 * Where an identity system shows up (inventory section 4: this page shows full systems, never
 * logos alone). Tier notes follow the price book 2.2.
 */
const touchpoints = [
  {
    title: 'Business Cards',
    icon: <CreditCard className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gray-900',
    specimen: 'card',
    desc: 'Print-ready cards in your colours and fonts. Complete adds a letterhead and a compliment slip.',
  },
  {
    title: 'Social Profiles',
    icon: <Share2 className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gradient-to-br from-[#1044ff] to-[#0020bf]',
    specimen: 'social',
    desc: 'Core includes a social profile kit, so every account looks like the same business. Complete includes 10 social templates.',
  },
  {
    title: 'Signs and Vans',
    icon: <Store className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gradient-to-br from-[#e7811e] to-[#e7581e]',
    specimen: 'sign',
    desc: 'Your guidelines show sign makers and printers how to use your logo. It looks right on a shopfront, a van or a uniform.',
  },
  {
    title: 'Email Signature',
    icon: <Mail className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-white border border-gray-200',
    specimen: 'email',
    desc: 'Your logo, colours and contact details on every email you send, laid out the same way each time.',
  },
  {
    title: 'Your Website',
    icon: <Monitor className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gray-100',
    specimen: 'website',
    desc: (
      <>
        Your colours, fonts and logo rules give your web designer a clear style to follow. Need the site as well? See our{' '}
        <Link
          href="/services/web-development/business-website-design"
          className="text-[#1044ff] font-semibold hover:underline"
        >
          business website design service
        </Link>
        .
      </>
    ),
  },
  {
    title: 'Presentations',
    icon: <Presentation className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gradient-to-br from-gray-900 to-gray-700',
    specimen: 'slide',
    desc: 'Complete includes a presentation template, so your pitches and proposals match the rest of your brand.',
  },
];

/* What the brand identity tiers deliver (price book 2.2). Logo facts come from the logo tiers they include. */
const deliverables = [
  {
    number: '01',
    icon: <PenTool className="w-6 h-6" aria-hidden="true" />,
    title: 'Your Logo',
    desc: 'Core includes our Professional logo, with 4 concepts and 3 revision rounds. Complete includes our Signature logo, with research, 6 concepts and 4 revision rounds.',
    iconClass: 'bg-[#1044ff] text-white',
    titleClass: 'text-[#1044ff]',
  },
  {
    number: '02',
    icon: <Palette className="w-6 h-6" aria-hidden="true" />,
    title: 'Colours and Fonts',
    desc: 'Your colour palette and fonts, with clear rules for using them. Your brand looks the same in print and on screen.',
    iconClass: 'bg-gray-900 text-white',
    titleClass: 'text-gray-900',
  },
  {
    number: '03',
    icon: <BookOpen className="w-6 h-6" aria-hidden="true" />,
    title: 'Brand Guidelines',
    desc: 'One guide to using your logo, colours and fonts the right way: 15+ pages in Core, and 30+ pages of extended guidelines in Complete.',
    iconClass: 'bg-[#e7811e] text-white',
    titleClass: 'text-[#c2410c]',
  },
  {
    number: '04',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    title: 'Cards and Stationery',
    desc: 'Core includes a business card and an email signature. Complete includes a full stationery set: business card, letterhead, compliment slip and email signature.',
    iconClass: 'bg-blue-50 text-[#1044ff]',
    titleClass: 'text-[#1044ff]',
  },
  {
    number: '05',
    icon: <LayoutTemplate className="w-6 h-6" aria-hidden="true" />,
    title: 'Social Kit and Templates',
    desc: 'Core includes a social profile kit. Complete includes 10 social templates and a presentation template.',
    iconClass: 'bg-orange-50 text-[#e7811e]',
    titleClass: 'text-[#c2410c]',
  },
  {
    number: '06',
    icon: <Compass className="w-6 h-6" aria-hidden="true" />,
    title: 'Strategy and Tone of Voice',
    desc: 'Complete starts with a brand strategy session. It also sets your tone of voice, so your words match your look.',
    iconClass: 'bg-gray-100 text-gray-700',
    titleClass: 'text-gray-700',
  },
];

/* Concept counts follow the logo tiers inside Core (Professional) and Complete (Signature). */
const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We learn your business, your customers and your competitors. Complete starts with a brand strategy session.',
    icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
    tilt: -1.5,
  },
  {
    step: '02',
    title: 'Logo Concepts',
    desc: 'We design 4 logo concepts in Core and 6 in Complete. You choose the one we take forward.',
    icon: <PenTool className="w-6 h-6" aria-hidden="true" />,
    tilt: 1.5,
  },
  {
    step: '03',
    title: 'Identity System',
    desc: 'We refine your chosen logo, then build your colours, fonts, cards and templates around it.',
    icon: <Layers className="w-6 h-6" aria-hidden="true" />,
    tilt: -1,
  },
  {
    step: '04',
    title: 'Guidelines and Files',
    desc: 'We write your brand guidelines and send your final files for print and screen. Once paid in full, they are yours to use.',
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

/**
 * Decorative illustration of one touchpoint. Its wrapper hides it from screen readers.
 * @param {{ kind: string }} props
 */
function TouchpointSpecimen({ kind }) {
  switch (kind) {
    case 'card':
      return (
        <div className="relative z-10 w-36 h-20 bg-white rounded-lg shadow-xl -rotate-6 p-3 flex flex-col justify-between">
          <div className="w-5 h-5 rounded bg-[#1044ff]" />
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-16 rounded-full bg-gray-800" />
            <div className="h-1 w-10 rounded-full bg-gray-300" />
          </div>
        </div>
      );
    case 'social':
      return (
        <div className="relative z-10 w-40 rounded-xl bg-white overflow-hidden shadow-lg">
          <div className="h-8 bg-gradient-to-r from-[#e7811e] to-[#e7581e]" />
          <div className="relative -mt-4 ml-3 w-9 h-9 rounded-full border-4 border-white bg-gray-900" />
          <div className="mx-3 mt-2 mb-3 h-1.5 w-20 rounded-full bg-gray-200" />
        </div>
      );
    case 'sign':
      return (
        <div className="relative z-10 px-6 py-3 bg-white rounded-md shadow-lg flex items-center gap-3">
          <div className="w-3 h-3 bg-[#1044ff] rotate-45" />
          <span className="text-gray-900 text-xl font-black tracking-wide select-none">COMPANY</span>
        </div>
      );
    case 'email':
      return (
        <div className="relative z-10 w-44 flex flex-col gap-2">
          <div className="h-1.5 w-36 rounded-full bg-gray-200" />
          <div className="h-1.5 w-28 rounded-full bg-gray-200" />
          <div className="mt-1 pt-3 border-t border-gray-200 flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#1044ff]" />
            <div className="flex flex-col gap-1">
              <div className="h-1.5 w-20 rounded-full bg-gray-800" />
              <div className="h-1 w-14 rounded-full bg-[#e7811e]" />
            </div>
          </div>
        </div>
      );
    case 'website':
      return (
        <div className="relative z-10 w-44 rounded-lg bg-white shadow-lg overflow-hidden">
          <div className="flex gap-1 px-2 py-1.5 border-b border-gray-100">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
          <div className="m-2 h-8 rounded bg-gradient-to-br from-[#1044ff] to-[#0020bf]" />
          <div className="mx-2 mb-2 h-1.5 w-24 rounded-full bg-gray-200" />
        </div>
      );
    case 'slide':
      return (
        <div className="relative z-10 w-44 h-24 rounded-md bg-white shadow-lg p-3 flex flex-col justify-between">
          <div className="h-2 w-20 rounded-full bg-gray-900" />
          <div className="flex items-end gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-[#1044ff]" />
            <div className="w-4 h-7 rounded-sm bg-[#1044ff]" />
            <div className="w-4 h-10 rounded-sm bg-[#e7811e]" />
          </div>
        </div>
      );
    default:
      return null;
  }
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
 * Brand identity design service page, built from the logo design layout (D30). All data is read
 * on the server in page.jsx and passed in as props. Case study and recent work stay hidden until
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
 *   related?: React.ReactNode,
 * }} props
 *   fromPrice: the hero "from" price. page.jsx passes the lowest tier price (Core), so the hero
 *   shows the price of an identity system, not the guidelines-only service.
 */
const BrandIdentityDesign = ({
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
  // Tier cards (Core, Complete) first; single items (brand guidelines for an existing logo) under them.
  const tiers = prices.filter((item) => item.tier_label);
  const extras = prices.filter((item) => !item.tier_label);

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      {/* ─── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="badge-standard-light mb-8">{h1}</h1>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] text-balance">
                Look Like the Same Business{' '}
                <span className="text-[#1044ff]">Everywhere Customers Find You.</span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                We design your logo, colours and fonts, then write the guidelines that keep them consistent. Your cards, posts and website all look like one business.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="Brand identity" className="mb-12" />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105"
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
                  <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" /> {SITE.proof.projects} projects since {SITE.proof.fiverrSince}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <WorkImageStrip slides={slides} label="Recent Brand Identity Work" />
      </section>

      {/* ─── 2. MORE THAN A LOGO ──────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">BRAND</span>
        </div>

        <div className="overflow-hidden border-b border-white/15 py-5" aria-hidden="true">
          <style>{`@keyframes bimq { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { .bimq-track { animation: none !important; } }`}</style>
          <div className="bimq-track flex gap-10 whitespace-nowrap" style={{ animation: 'bimq 35s linear infinite' }}>
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
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/80 mb-8">
              MORE THAN A LOGO
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
              A Logo Gets Noticed.<br />
              A System Gets<br />
              <span className="text-[#fdba74]">Remembered.</span>
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
          <div className="bimq-track flex gap-10 whitespace-nowrap" style={{ animation: 'bimq 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e]/50 mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. TOUCHPOINTS (what a brand identity fixes) ─────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WHERE YOUR BRAND SHOWS UP</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              One Look on Every Touchpoint.
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Without a system, every card, post and sign starts from scratch, and the styles drift apart. A brand identity gives each one the same look.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {touchpoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group rounded-[2rem] border border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* specimen area: an illustration of the touchpoint, hidden from screen readers */}
                <div className={`h-32 flex items-center justify-center ${point.specimenBg} relative overflow-hidden`} aria-hidden="true">
                  <TouchpointSpecimen kind={point.specimen} />
                </div>

                {/* info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-50 text-[#1044ff] rounded-lg flex items-center justify-center group-hover:bg-[#1044ff] group-hover:text-white transition-all duration-300">
                      {point.icon}
                    </div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{point.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. DELIVERABLES ──────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WHAT YOU RECEIVE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Everything in Your Brand Identity.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Core covers the essentials. Complete adds strategy, tone of voice and more templates. Only need a logo? See our{' '}
              <Link
                href="/services/branding-design/logo-design"
                className="text-[#1044ff] font-semibold hover:underline"
              >
                logo design services
              </Link>
              .
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
              >
                <span className="absolute -top-3 -right-2 text-[80px] font-black text-gray-100/80 leading-none pointer-events-none select-none group-hover:text-blue-50 transition-colors duration-300" aria-hidden="true">
                  {item.number}
                </span>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${item.iconClass}`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-extrabold mb-2 tracking-tight ${item.titleClass}`}>{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
            <span className="badge-standard-light">THE BRAND PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              From First Call to Final Guidelines.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Core takes 2 to 3 weeks and Complete takes 4 to 5 weeks, from your brief to your final files.
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
                  <span className="absolute -bottom-4 -right-2 text-[100px] font-black text-gray-100 select-none leading-none pointer-events-none group-hover:text-blue-50 transition-colors duration-300" aria-hidden="true">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-50 text-[#1044ff] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1044ff] group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 tracking-tight group-hover:text-[#1044ff] transition-colors duration-300">
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
              A brand identity built to grow with a business.
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
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">
                  Case Study
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                  {caseStudy.title}
                </h3>
                <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed font-light">
                  {caseStudy.description}
                </p>
                {caseStudy.key_result && (
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#1044ff] p-5 rounded-r-xl w-full shadow-sm">
                    <p className="text-[#1044ff] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
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
        <section id="brand-identity-work" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">
                  RECENT BRAND IDENTITY WORK
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Systems, Not Just Logos.
                </h2>
              </div>
              <Link
                href="/our-work"
                className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors"
              >
                View all brand work <ArrowRight size={16} aria-hidden="true" />
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
                      <div className="absolute inset-0 bg-[#1044ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#1044ff]" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pb-3 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1044ff] transition-colors leading-tight">
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
              <span className="badge-standard-light">BRAND IDENTITY PRICES</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Choose Your Brand Identity.
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Two fixed prices for a full identity system. Already have a logo you like? Get brand guidelines built around it.
              </p>
            </motion.div>

            {tiers.length > 0 && (
              <div className={`grid grid-cols-1 ${priceGrid(tiers.length)} gap-6 items-stretch`}>
                {tiers.map((item, idx) => {
                  const featured = item.popular;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col gap-6 border transition-all duration-300 ${
                        featured
                          ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent shadow-2xl shadow-blue-500/25 scale-[1.02]'
                          : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      {featured && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#c2410c] text-white whitespace-nowrap">
                          Most popular
                        </span>
                      )}

                      <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${featured ? 'text-white/80' : 'text-gray-600'}`}>
                        {priceEyebrow(item)}
                      </span>

                      <h3 className={`text-2xl font-black tracking-tight leading-tight ${featured ? 'text-white' : 'text-gray-900'}`}>
                        {item.tier_label || item.name}
                      </h3>

                      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                        {item.display.prefix && (
                          <span className={`text-lg font-semibold mb-1.5 ${featured ? 'text-white/60' : 'text-gray-500'}`}>
                            {item.display.prefix}
                          </span>
                        )}
                        <span className={`${item.price_gbp == null ? 'text-4xl' : 'text-5xl'} font-black tracking-tighter ${featured ? 'text-white' : 'text-gray-900'}`}>
                          {item.display.amount}
                        </span>
                        {item.display.suffix && (
                          <span className={`text-lg font-semibold mb-1.5 ${featured ? 'text-white/60' : 'text-gray-500'}`}>
                            {item.display.suffix}
                          </span>
                        )}
                      </div>
                      {item.display.setup && (
                        <p className={`-mt-4 text-sm font-semibold ${featured ? 'text-white/75' : 'text-gray-500'}`}>
                          {item.display.setup}
                        </p>
                      )}

                      <div className={`h-px w-full ${featured ? 'bg-white/15' : 'bg-gray-100'}`} />

                      {item.includes?.length > 0 && (
                        <ul className="flex flex-col gap-3 flex-grow">
                          {item.includes.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle
                                size={16}
                                aria-hidden="true"
                                className={`flex-shrink-0 mt-0.5 ${featured ? 'text-white/60' : 'text-[#1044ff]'}`}
                              />
                              <span className={`text-sm leading-relaxed ${featured ? 'text-white/80' : 'text-gray-600'}`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.timeline && (
                        <div
                          className={`rounded-xl p-4 text-xs leading-relaxed font-medium ${
                            featured
                              ? 'bg-white/10 text-white/70 border border-white/15'
                              : 'bg-gray-50 text-gray-500 border border-gray-100'
                          }`}
                        >
                          Delivery: {item.timeline}
                        </div>
                      )}

                      <div className="mt-auto flex flex-col gap-3">
                        <Button
                          asChild
                          size="lg"
                          className={`rounded-full h-12 text-sm font-bold transition-transform hover:scale-105 ${
                            featured
                              ? 'bg-white bg-none text-[#1044ff] hover:bg-gray-100 shadow-lg'
                              : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'
                          }`}
                        >
                          <Link href={item.book_href} data-cta="book-a-free-call">
                            {BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                          </Link>
                        </Button>
                        {item.buy_url && (
                          <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className={`rounded-full h-12 text-sm font-bold ${
                              featured ? 'border-white text-white bg-transparent' : ''
                            }`}
                          >
                            <a href={item.buy_url} target="_blank" rel="noopener noreferrer" data-cta="buy-now">
                              Buy now
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Single items (brand guidelines for an existing logo): one clear card each, under the tiers. */}
            {extras.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={`max-w-4xl mx-auto rounded-[2rem] p-8 md:p-10 border border-gray-100 bg-gray-50 shadow-sm flex flex-col md:flex-row md:items-center gap-8 ${
                  tiers.length > 0 ? 'mt-10' : ''
                }`}
              >
                <div className="flex-1 flex flex-col gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">
                    {priceEyebrow(item)}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight leading-tight text-gray-900">
                    {item.tier_label || item.name}
                  </h3>
                  {item.includes?.length > 0 && (
                    <ul className="flex flex-col gap-3">
                      {item.includes.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle size={16} aria-hidden="true" className="flex-shrink-0 mt-0.5 text-[#1044ff]" />
                          <span className="text-sm leading-relaxed text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.timeline && (
                    <p className="text-xs leading-relaxed font-medium text-gray-500">Delivery: {item.timeline}</p>
                  )}
                </div>

                <div className="md:w-64 flex-shrink-0 flex flex-col gap-4">
                  <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                    {item.display.prefix && (
                      <span className="text-lg font-semibold mb-1.5 text-gray-500">{item.display.prefix}</span>
                    )}
                    <span className={`${item.price_gbp == null ? 'text-4xl' : 'text-5xl'} font-black tracking-tighter text-gray-900`}>
                      {item.display.amount}
                    </span>
                    {item.display.suffix && (
                      <span className="text-lg font-semibold mb-1.5 text-gray-500">{item.display.suffix}</span>
                    )}
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full h-12 text-sm font-bold transition-transform hover:scale-105 bg-[#1044ff] text-white hover:bg-[#0020bf]"
                  >
                    <Link href={item.book_href} data-cta="book-a-free-call">
                      {BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  {item.buy_url && (
                    <Button asChild variant="outline" size="lg" className="rounded-full h-12 text-sm font-bold">
                      <a href={item.buy_url} target="_blank" rel="noopener noreferrer" data-cta="buy-now">
                        Buy now
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}

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
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-500 text-sm mt-3 max-w-2xl mx-auto"
            >
              Need a website and Google profile too? Our{' '}
              <Link href="/packages/launch-kit" className="text-[#1044ff] font-semibold hover:underline">
                Launch Kit
              </Link>{' '}
              includes the Core brand identity, a website of up to 10 pages and Google Business Profile set-up. It goes live in 21 working days from receiving your content.
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
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-[#1044ff] text-left py-6">
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
        headline="Ready to Look Like One Business Everywhere?"
        subtext="Book a free call. Tell us about your business and we will recommend Core or Complete, with a fixed quote before work starts."
        service="brand-identity-design"
      />
    </div>
  );
};

export default BrandIdentityDesign;
