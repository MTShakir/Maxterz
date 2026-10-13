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
  Palette,
  Layers,
  LayoutGrid,
  Printer,
  Share2,
  Lightbulb,
  Pencil,
  Eye,
  Package,
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
import { formatGBP } from '@/lib/pricing-calc';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/branding-design';

/* ─── static data ─────────────────────────────────────────────── */

const marqueeWords = [
  'LOGO DESIGN', 'BRAND IDENTITY', 'TYPOGRAPHY', 'COLOUR THEORY',
  'VISUAL HIERARCHY', 'ICONOGRAPHY', 'PRINT DESIGN', 'SOCIAL VISUALS',
  'MOTION GRAPHICS', 'BRAND GUIDELINES',
];

/* Offer facts from the price book (docs/05-offers.md 2.2), not industry statistics. */
const manifestoStats = [
  { value: '2 to 6', label: 'logo concepts to choose from, depending on the tier' },
  { value: '15+', label: 'pages of brand guidelines in the Core brand identity tier' },
  { value: '5', label: 'working days to deliver an Essential logo' },
];

/*
 * Every service page in the category (brief 7.4 item 2), plus print design, which is priced
 * on this page. "From" prices come from Supabase through props, never typed here.
 */
const services = [
  {
    number: '01',
    icon: <Palette className="w-7 h-7" aria-hidden="true" />,
    title: 'Logo Design',
    desc: 'An original logo with 2 to 6 concepts to choose from, set revision rounds and the files you need for print and screen.',
    link: '/services/branding-design/logo-design',
    linkLabel: 'Explore Service',
  },
  {
    number: '02',
    icon: <Layers className="w-7 h-7" aria-hidden="true" />,
    title: 'Brand Identity Design',
    desc: 'Visual identities built to last. Logo, colour system, typography and brand guidelines that give your business a consistent, recognisable presence.',
    link: '/services/branding-design/brand-identity-design',
    linkLabel: 'Explore Service',
  },
  {
    number: '03',
    icon: <Share2 className="w-7 h-7" aria-hidden="true" />,
    title: 'Social Media Design',
    desc: 'Post templates, carousels, story graphics and ad creatives that keep your brand consistent and recognisable on every platform.',
    link: '/services/branding-design/social-media-design',
    linkLabel: 'Explore Service',
  },
  {
    number: '04',
    icon: <LayoutGrid className="w-7 h-7" aria-hidden="true" />,
    title: 'YouTube Thumbnail Design',
    desc: 'Click-worthy thumbnails from ThumbLab, our thumbnail studio. Try one, or order a pack of 30 for your next run of uploads.',
    link: '/services/branding-design/thumbnail-design',
    linkLabel: 'Explore Service',
  },
  {
    number: '05',
    icon: <Printer className="w-7 h-7" aria-hidden="true" />,
    title: 'Graphic and Print Design',
    desc: 'Business cards, stationery, flyers and brochures, delivered as print-ready files.',
    link: '#prices',
    linkLabel: 'See Prices',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Brief and Direction',
    desc: 'We learn your brand, audience, and competitors first.',
    icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
    tilt: -1.5,
  },
  {
    step: '02',
    title: 'Concepts and Exploration',
    desc: 'Multiple visual directions, not one opinion presented as the answer.',
    icon: <Pencil className="w-6 h-6" aria-hidden="true" />,
    tilt: 1.5,
  },
  {
    step: '03',
    title: 'Refinement and Feedback',
    desc: 'The chosen direction refined in full, revisions included.',
    icon: <Eye className="w-6 h-6" aria-hidden="true" />,
    tilt: -1,
  },
  {
    step: '04',
    title: 'Delivery and Asset Files',
    desc: 'Every format you need, organised and ready to use.',
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
 * Branding and design category page (D30: layout kept). All data is read on the server in
 * page.jsx and passed in as props. Case study and recent work stay hidden until Phase 5.
 *
 * @param {{
 *   h1: string,
 *   prices?: object[],
 *   fromPrice?: number | null,
 *   fromPrices?: Record<string, number | null>,
 *   slides?: object[],
 *   reviews?: object[],
 *   bookHref: string,
 *   caseStudy?: object | null,
 *   projects?: object[],
 * }} props
 *   prices: this page's own items (business card, stationery set)
 *   fromPrice: the lowest of those, shown on the print design card
 *   fromPrices: the lowest price of each service page, keyed by path
 */
const ServiceBrandingDesign = ({
  h1,
  prices = [],
  fromPrice = null,
  fromPrices = {},
  slides = [],
  reviews = [],
  bookHref,
  caseStudy = null,
  projects = [],
  related = null,
}) => {
  const hasPrices = prices.length > 0;
  const visibleServices = services.filter((service) => service.link !== '#prices' || hasPrices);
  const priceFor = (service) => (service.link === '#prices' ? fromPrice : fromPrices[service.link] ?? null);
  const servicePrices = services.filter((service) => service.link.startsWith('/') && fromPrices[service.link] != null);

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      {/* ─── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        {/* orange accent blob */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        {/* Centred hero content: flex-1 fills available height */}
        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="badge-standard-light mb-8">{h1}</h1>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] text-balance">
                <span>Your Brand Is a Feeling{' '}</span>
                <span className="text-[#1044ff]">Before It Is a Design.</span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                From identity systems and print collateral to scroll-stopping visuals, we design brands that people remember, trust, and choose over competitors.
              </p>
              {/* Anchors on the core service, not the cheapest item (D39 reasoning); the schema keeps the true lowest price. */}
              <FromPriceLine price={fromPrices['/services/branding-design/logo-design']} billing="one-off" label="Logo design" className="mb-12" />

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
                {hasPrices && (
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
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#eb7444] fill-current" aria-hidden="true" /> {SITE.proof.fiverrRating} stars on Fiverr</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" aria-hidden="true" /> {SITE.proof.fiverrReviews} reviews on Fiverr</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" /> {SITE.proof.projects} projects since {SITE.proof.fiverrSince}</span>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Strip pinned to bottom of hero: full viewport width, renders nothing until real slides exist */}
        <WorkImageStrip slides={slides} label="Recent Brand Work" />
      </section>

{/* ─── 3. SIGNATURE SERVICES ────────────────────────────────── */}
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl px-4 pt-20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-standard-light">WHAT WE DO</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mt-4">
              Signature Services.
            </h2>
          </motion.div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 pb-20 flex flex-col gap-4">
          {visibleServices.map((service, idx) => {
            const price = priceFor(service);
            return (
              <Link
                key={service.link}
                href={service.link}
                onClick={service.link === '#prices' ? (event) => scrollToSection(event, 'prices') : undefined}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-10 py-8 md:py-10 px-6 md:px-10 rounded-[2rem] border border-gray-100 hover:bg-[#1044ff] hover:border-transparent transition-all duration-300 relative overflow-hidden cursor-pointer"
                >
                  {/* large background number */}
                  <span className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-[96px] md:text-[130px] font-black text-gray-100/60 group-hover:text-white/10 select-none leading-none pointer-events-none transition-colors duration-300" aria-hidden="true">
                    {service.number}
                  </span>

                  {/* left: icon + content */}
                  <div className="flex items-start md:items-center gap-5 relative z-10 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1044ff] flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[#1044ff] transition-all duration-300 shadow-sm">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 group-hover:text-white transition-colors duration-300 tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 group-hover:text-white/75 transition-colors duration-300 mt-1.5 text-sm md:text-base leading-relaxed max-w-2xl">
                        {service.desc}
                      </p>
                      {price != null && (
                        <p className="mt-2 text-sm md:text-base font-bold text-[#1044ff] group-hover:text-white transition-colors duration-300">
                          From {formatGBP(price)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* right: cta */}
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors duration-300 flex-shrink-0 relative z-10 pl-[4.75rem] md:pl-0">
                    {service.linkLabel}
                    <ArrowRight size={15} className="group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── 2. MANIFESTO ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        {/* Decorative background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">DESIGN</span>
        </div>

        {/* Marquee strip */}
        <div className="overflow-hidden border-b border-white/15 py-5" aria-hidden="true">
          <style>{`@keyframes bmarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { .bmarquee-track { animation: none !important; } }`}</style>
          <div className="bmarquee-track flex gap-10 whitespace-nowrap" style={{ animation: 'bmarquee 35s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>


        {/* Main content */}
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 mb-8">
              OUR DESIGN PHILOSOPHY
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
              Design Is Not<br />
              Decoration.<br />
              <span className="text-[#e7811e]">It Is Decision.</span>
            </h2>

            {/* Stats grid */}
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

        {/* Bottom marquee strip */}
        <div className="overflow-hidden border-t border-white/15 py-5" aria-hidden="true">
          <div className="bmarquee-track flex gap-10 whitespace-nowrap" style={{ animation: 'bmarquee 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e]/50 mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CASE STUDY (renders only when Phase 5 passes a real case study) ─── */}
      {caseStudy && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">It works. Here is the proof.</h3>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
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

      {/* ─── 5. PROCESS (tilt cards) ──────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">THE CREATIVE PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              From Brief to Brand Asset.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Every great brand starts the same way: with the right questions asked in the right order.
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
                  {/* large step number background */}
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

      {/* ─── 6. RECENT WORK (renders only when Phase 5 passes real projects) ─── */}
      {projects.length > 0 && (
        <section id="work-samples" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">
                  RECENT BRAND WORK
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">The Work Speaks.</h2>
              </div>
              <Link href="/our-work" className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors">
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

      {/* ─── 7. PRICES ────────────────────────────────────────────── */}
      {hasPrices && (
        <section id="prices" className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="badge-standard-light">PRINT DESIGN PRICES</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Print Design, Priced Up Front.
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Business cards and stationery at fixed prices, with print-ready files. Every other branding service shows its prices on its own page.
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
                    {/* badge */}
                    {featured && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#e7811e] text-white whitespace-nowrap">
                        Most popular
                      </span>
                    )}

                    {/* type label */}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${featured ? 'text-white/50' : 'text-gray-400'}`}>
                      {priceEyebrow(item)}
                    </span>

                    {/* name */}
                    <h3 className={`text-2xl font-black tracking-tight leading-tight ${featured ? 'text-white' : 'text-gray-900'}`}>
                      {item.tier_label || item.name}
                    </h3>

                    {/* price */}
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

                    {/* divider */}
                    <div className={`h-px w-full ${featured ? 'bg-white/15' : 'bg-gray-100'}`} />

                    {/* features */}
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

                    {/* delivery time */}
                    {item.timeline && (
                      <div className={`rounded-xl p-4 text-xs leading-relaxed font-medium ${
                        featured ? 'bg-white/10 text-white/70 border border-white/15' : 'bg-gray-50 text-gray-500 border border-gray-100'
                      }`}>
                        Delivery: {item.timeline}
                      </div>
                    )}

                    {/* cta */}
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

            {/* Lowest price of each service page (inventory section 3) */}
            {servicePrices.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-sm font-semibold text-gray-500 mb-4">
                  Prices for our other branding services:
                </p>
                <ul className="flex flex-wrap justify-center gap-3">
                  {servicePrices.map((service) => (
                    <li key={service.link}>
                      <Link
                        href={service.link}
                        className="inline-flex items-center min-h-[44px] px-5 rounded-full border-2 border-gray-100 bg-white text-sm font-bold text-gray-700 hover:border-[#1044ff] hover:text-[#1044ff] transition-colors"
                      >
                        {service.title} from {formatGBP(fromPrices[service.link])}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
              New or rebranding? Our Launch Kit includes a Core brand identity, a website of up to 10 pages and Google Business Profile set-up.{' '}
              <Link href="/packages" className="text-[#1044ff] font-semibold hover:underline">
                Compare our packages
              </Link>
              .
            </motion.p>
          </div>
        </section>
      )}

      {/* ─── 8. REVIEWS (renders nothing without reviews) ─────────── */}
      <ServiceReviews reviews={reviews} className="bg-white border-t border-gray-100" />

      {/* ─── 9. FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">QUESTIONS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Common Questions</h2>
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

      {/* ─── 10. CTA ──────────────────────────────────────────────── */}
      {related}

      <CTASection
        headline="Ready to Build a Brand People Remember?"
        subtext="Book a free call. We look at where your brand is now, where it needs to be, and what it takes to get there."
        service="branding-design"
      />
    </div>
  );
};

export default ServiceBrandingDesign;
