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
  Pencil,
  Eye,
  Package,
  Image as ImageIcon,
  GalleryHorizontal,
  LayoutTemplate,
  Palette,
  MessageSquare,
  Download,
  Square,
  Megaphone,
  Smartphone,
  Quote,
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
import { faqs } from '@/content/faq/social-media-design';

/* ─── static data ─────────────────────────────────────────────── */

const marqueeWords = [
  'SINGLE POSTS', 'CAROUSELS', 'STORY TEMPLATES', 'POST TEMPLATES',
  'AD GRAPHICS', 'REVIEW POSTS', 'BRAND COLOURS', 'TYPOGRAPHY',
  'INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'EDITABLE LAYOUTS',
];

/* Offer facts from the price book (docs/05-offers.md 2.2) and how we work, not industry statistics. */
const manifestoStats = [
  { value: '2', label: 'working days to design a post or carousel' },
  { value: '10', label: 'editable post and story templates in each pack' },
  { value: '1 team', label: 'for your logo, brand and posts, with one point of contact' },
];

/* The formats we design (price book 2.2: static posts, carousels, post and story templates). */
const formats = [
  {
    title: 'Single Posts',
    icon: <Square className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gray-900',
    specimen: 'post',
    desc: 'One clear image and message: an offer, a tip, a new service or a piece of news.',
  },
  {
    title: 'Carousels',
    icon: <GalleryHorizontal className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gradient-to-br from-[#1044ff] to-[#0020bf]',
    specimen: 'carousel',
    desc: 'Swipeable slides for guides, step-by-step tips and before and after stories.',
  },
  {
    title: 'Ad Graphics',
    icon: <Megaphone className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gradient-to-br from-[#e7811e] to-[#e7581e]',
    specimen: 'ad',
    desc: 'Static graphics for paid social ads, in the same style as your posts.',
  },
  {
    title: 'Post Templates',
    icon: <LayoutTemplate className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-white border border-gray-200',
    specimen: 'template',
    desc: 'Feed layouts your team can edit and reuse. Part of our templates pack.',
  },
  {
    title: 'Story Templates',
    icon: <Smartphone className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gray-100',
    specimen: 'story',
    desc: 'Vertical layouts sized for stories, ready for your team to edit. Also part of the templates pack.',
  },
  {
    title: 'Review Posts',
    icon: <Quote className="w-5 h-5" aria-hidden="true" />,
    specimenBg: 'bg-gradient-to-br from-gray-900 to-gray-700',
    specimen: 'review',
    desc: 'A customer review or a key message, turned into a clean, on-brand post.',
  },
];

/* What each order delivers (price book 2.2). */
const deliverables = [
  {
    number: '01',
    icon: <ImageIcon className="w-6 h-6" aria-hidden="true" />,
    title: 'Post Design',
    desc: 'Static posts designed to your brief and your brand, ready in 2 working days.',
    iconClass: 'bg-[#1044ff] text-white',
    titleClass: 'text-[#1044ff]',
  },
  {
    number: '02',
    icon: <GalleryHorizontal className="w-6 h-6" aria-hidden="true" />,
    title: 'Carousel Design',
    desc: 'Swipeable carousels for tips, guides and stories, also ready in 2 working days.',
    iconClass: 'bg-gray-900 text-white',
    titleClass: 'text-gray-900',
  },
  {
    number: '03',
    icon: <LayoutTemplate className="w-6 h-6" aria-hidden="true" />,
    title: 'Editable Templates',
    desc: 'A pack of 10 post and story templates your team can edit and reuse, ready in 5 working days.',
    iconClass: 'bg-[#e7811e] text-white',
    titleClass: 'text-[#c2410c]',
  },
  {
    number: '04',
    icon: <Palette className="w-6 h-6" aria-hidden="true" />,
    title: 'Your Brand Style',
    desc: 'Your logo, colours and fonts on every design, so each post looks like your business.',
    iconClass: 'bg-blue-50 text-[#1044ff]',
    titleClass: 'text-[#1044ff]',
  },
  {
    number: '05',
    icon: <MessageSquare className="w-6 h-6" aria-hidden="true" />,
    title: 'Built Around Your Message',
    desc: 'Tell us what each post should say. We lay it out so the message is clear at a glance.',
    iconClass: 'bg-orange-50 text-[#e7811e]',
    titleClass: 'text-[#c2410c]',
  },
  {
    number: '06',
    icon: <Download className="w-6 h-6" aria-hidden="true" />,
    title: 'Files Ready to Post',
    desc: 'Final files, ready to upload or edit. Once paid in full, they are yours to use.',
    iconClass: 'bg-gray-100 text-gray-700',
    titleClass: 'text-gray-700',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Brief',
    desc: 'Tell us what each post should say, where it will go and who it is for. Send your logo, colours and any photos.',
    icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
    tilt: -1.5,
  },
  {
    step: '02',
    title: 'Design',
    desc: 'We design each post or carousel in your brand style. Single designs are ready in 2 working days.',
    icon: <Pencil className="w-6 h-6" aria-hidden="true" />,
    tilt: 1.5,
  },
  {
    step: '03',
    title: 'Review',
    desc: 'You check each design and send all your changes together, so each round counts.',
    icon: <Eye className="w-6 h-6" aria-hidden="true" />,
    tilt: -1,
  },
  {
    step: '04',
    title: 'Delivery',
    desc: 'You get final files ready to upload, and templates ready to edit and reuse.',
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
 * Decorative illustration of one post format. Its wrapper hides it from screen readers.
 * @param {{ kind: string }} props
 */
function FormatSpecimen({ kind }) {
  switch (kind) {
    case 'post':
      return (
        <div className="relative z-10 w-20 h-20 bg-white rounded-lg shadow-xl p-2 flex flex-col gap-1.5">
          <div className="flex-1 rounded bg-gradient-to-br from-[#1044ff] to-[#0020bf]" />
          <div className="h-1.5 w-12 rounded-full bg-gray-800" />
          <div className="h-1 w-8 rounded-full bg-gray-300" />
        </div>
      );
    case 'carousel':
      return (
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <div className="w-16 h-16 rounded-lg bg-white shadow-lg" />
            <div className="w-16 h-16 rounded-lg bg-white/60" />
            <div className="w-16 h-16 rounded-lg bg-white/30" />
          </div>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      );
    case 'ad':
      return (
        <div className="relative z-10 w-20 h-20 bg-white rounded-lg shadow-xl p-2 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-12 rounded-full bg-gray-800" />
            <div className="h-1 w-9 rounded-full bg-gray-300" />
          </div>
          <div className="h-4 w-12 rounded-full bg-[#1044ff]" />
        </div>
      );
    case 'template':
      return (
        <div className="relative z-10 w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 text-center leading-tight select-none">
            YOUR<br />TEXT
          </span>
        </div>
      );
    case 'story':
      return (
        <div className="relative z-10 w-12 h-24 rounded-lg bg-gradient-to-b from-[#e7811e] to-[#e7581e] shadow-lg p-1.5 flex flex-col justify-end gap-1">
          <div className="h-1 w-7 rounded-full bg-white" />
          <div className="h-1 w-5 rounded-full bg-white/70" />
        </div>
      );
    case 'review':
      return (
        <div className="relative z-10 w-20 h-20 bg-white rounded-lg shadow-xl p-2 flex flex-col gap-1.5">
          <Quote className="w-5 h-5 text-[#1044ff]" />
          <div className="h-1.5 w-14 rounded-full bg-gray-800" />
          <div className="h-1.5 w-12 rounded-full bg-gray-800" />
          <div className="h-1 w-8 rounded-full bg-gray-300" />
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
 * Social media design service page, built from the logo design layout (D30). All data is read
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
 */
const SocialMediaDesign = ({
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
                On-Brand Posts and Carousels,{' '}
                <span className="text-[#1044ff]">Ready to Publish.</span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                We design social media posts and carousels in your brand style. Order one post at a time, or get editable templates your team can reuse.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="Social media posts" className="mb-12" />

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

        <WorkImageStrip slides={slides} label="Recent Social Media Design" />
      </section>

      {/* ─── 2. THE SCROLL TEST ───────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">FEED</span>
        </div>

        <div className="overflow-hidden border-b border-white/15 py-5" aria-hidden="true">
          <style>{`@keyframes sdmq { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { .sdmq-track { animation: none !important; } }`}</style>
          <div className="sdmq-track flex gap-10 whitespace-nowrap" style={{ animation: 'sdmq 35s linear infinite' }}>
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
              THE SCROLL TEST
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
              Feeds Move Fast.<br />
              Your Brand Should Be<br />
              <span className="text-[#fdba74]">Easy to Spot.</span>
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
          <div className="sdmq-track flex gap-10 whitespace-nowrap" style={{ animation: 'sdmq 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e]/50 mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. POST FORMATS (what social media design fixes) ─────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">POST FORMATS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Every Format Your Feed Needs.
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              No time to design, and every post looks a little different? We design each format in your brand style, so your feed looks like one business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {formats.map((format, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group rounded-[2rem] border border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* specimen area: an illustration of the format, hidden from screen readers */}
                <div className={`h-32 flex items-center justify-center ${format.specimenBg} relative overflow-hidden`} aria-hidden="true">
                  <FormatSpecimen kind={format.specimen} />
                </div>

                {/* info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-50 text-[#1044ff] rounded-lg flex items-center justify-center group-hover:bg-[#1044ff] group-hover:text-white transition-all duration-300">
                      {format.icon}
                    </div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{format.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{format.desc}</p>
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
              Everything Your Posts Need.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Designs that match your brand and fit the platform. No brand style yet? See our{' '}
              <Link
                href="/services/branding-design/brand-identity-design"
                className="text-[#1044ff] font-semibold hover:underline"
              >
                brand identity design service
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
            <span className="badge-standard-light">HOW IT WORKS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              From Brief to Ready to Post.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Posts and carousels take 2 working days. A pack of 10 templates takes 5 working days.
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
              Social media design that keeps a brand consistent.
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
        <section id="social-design-work" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">
                  RECENT SOCIAL MEDIA DESIGN
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Posts That Look the Part.
                </h2>
              </div>
              <Link
                href="/our-work"
                className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors"
              >
                View all our design work <ArrowRight size={16} aria-hidden="true" />
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
              <span className="badge-standard-light">SOCIAL MEDIA DESIGN PRICES</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Pick Posts or Templates.
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Order posts one at a time, or get a pack of editable templates your team can reuse.
              </p>
            </motion.div>

            <div className={`grid grid-cols-1 ${priceGrid(prices.length)} gap-6 items-stretch`}>
              {prices.map((item, idx) => {
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
              Launching a new business? Our{' '}
              <Link href="/packages/launch-kit" className="text-[#1044ff] font-semibold hover:underline">
                Launch Kit
              </Link>{' '}
              includes 5 launch post designs. It also covers your brand identity, a website of up to 10 pages and Google Business Profile set-up.
            </motion.p>
          </div>
        </section>
      )}

      {/* ─── 9. SOCIAL MEDIA MANAGEMENT (inventory: posting and community management live on their own page) ─── */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-10"
          >
            <div className="max-w-2xl">
              <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">
                SOCIAL MEDIA MANAGEMENT
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Want Us to Post and Reply for You?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mt-6">
                Our social media management plans cover strategy, content, posting and community management, with a monthly report. Keep design on its own, or hand the whole job to us.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full h-auto min-h-[3.5rem] py-3 px-8 text-base md:text-lg font-bold text-center bg-white bg-none text-[#1044ff] hover:bg-gray-100 shadow-lg w-full sm:w-auto sm:self-start lg:self-auto flex-shrink-0 transition-transform hover:scale-105"
            >
              <Link href="/services/social-media-management">
                See social media management plans <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── 10. REVIEWS (renders nothing without reviews) ────────── */}
      <ServiceReviews reviews={reviews} className="bg-white border-t border-gray-100" />

      {/* ─── 11. FAQ ──────────────────────────────────────────────── */}
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

      {/* ─── 12. CTA ──────────────────────────────────────────────── */}
      {related}

      <CTASection
        headline="Ready for Posts That Look Like Your Brand?"
        subtext="Book a free call. Tell us what you post and where, and we will recommend single posts or a templates pack."
        service="social-media-design"
      />
    </div>
  );
};

export default SocialMediaDesign;
