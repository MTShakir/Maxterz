'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  CheckCircle,
  Star,
  Sparkles,
  Zap,
  Film,
  ChevronRight,
  ShieldCheck,
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
import { formatGBP } from '@/lib/pricing-calc';
import { BOOK_LABEL } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/video-animation';
import SharedTypeWriter from '@/components/TypeWriter';

/* ─── keyframes ───────────────────────────────────────────────── */
const VA_STYLES = `
  @keyframes va-morph  { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:rotate(0deg) scale(.85)} 25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:rotate(90deg) scale(.9)} 50%{border-radius:40% 60% 60% 40%/70% 30% 50% 60%;transform:rotate(180deg) scale(.85)} 75%{border-radius:70% 30% 40% 60%/40% 70% 30% 50%;transform:rotate(270deg) scale(.9)} }
  @keyframes va-morph2 { 0%,100%{border-radius:30% 70% 70% 30%/30% 30% 70% 70%;transform:rotate(0deg) scale(.65);opacity:.25} 50%{border-radius:70% 30% 30% 70%/70% 70% 30% 30%;transform:rotate(180deg) scale(.7);opacity:.45} }
  @keyframes va-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes va-rec    { 0%,100%{opacity:1} 50%{opacity:.15} }
  @keyframes va-wave   { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(.2)} }
  @keyframes va-node   { 0%,100%{opacity:.3} 50%{opacity:.9} }
  @keyframes va-dash   { to{stroke-dashoffset:0} }
  @keyframes va-marquee{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes va-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
`;

/* ─── static data ─────────────────────────────────────────────── */
const marqueeWords = [
  'MOTION DESIGN','LOGO ANIMATION','EXPLAINER VIDEO','BRAND FILM',
  'PODCAST VIDEO','REELS','SAAS DEMO','DOCUMENTARY','TALKING HEAD',
  'PROMO TRAILER','CASH COW VIDEO','KINETIC TYPE',
];

/* Our own proof from SITE.proof, not industry statistics. Review counts always say "on Fiverr". */
const statsData = [
  { value: SITE.proof.viralViews,           label: 'views on our logo animation on Instagram' },
  { value: SITE.proof.logoAnimationReviews, label: 'logo animation reviews on Fiverr' },
  { value: SITE.proof.projects,             label: `projects delivered since ${SITE.proof.fiverrSince}` },
];

/* services: [0] Logo and [1] Explainer in the top row, [2 to 4] in the bottom row.
   Every card links to a service page and shows that page's "from" price (getFromPricesUnder).
   priceKey 'longForm': the card shows the long-form edit price, not the page's lowest price. */
const services = [
  {
    id: 'logo-animation',
    title: 'Logo Animation',
    badge: 'SIGNATURE',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    desc: 'A static logo is a missed opportunity. We bring your brand mark to life with bespoke motion that commands attention in intros, outros, and everywhere in between.',
    tags: ['Brand Intros', 'Outro Stings', 'Social Avatars', 'Lower Thirds'],
    href: '/services/video-animation/logo-animation',
    animType: 'morph',
  },
  {
    id: 'explainer',
    title: 'Explainer and SaaS Videos',
    badge: 'CONVERT',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    desc: 'Turn a complex product into a clear pitch. Script, storyboard, animation and voiceover in one place, built to move prospects from curious to convinced.',
    tags: ['SaaS Demos', 'Product Explainers', 'Onboarding Videos'],
    href: '/services/video-animation/explainer-videos',
    animType: 'nodes',
  },
  {
    id: 'longform',
    title: 'Podcast, YouTube and Documentary Edits',
    badge: 'LONGFORM',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    desc: 'Faceless channels, interview formats, and in-depth documentary edits that keep viewers watching and your authority growing.',
    tags: ['Faceless YouTube', 'Interview Edit', 'Voiceover Sync'],
    href: '/services/video-animation/video-editing',
    priceKey: 'longForm',
    animType: 'wave',
  },
  {
    id: 'motion',
    title: 'Motion Graphics Ads and Promos',
    badge: 'MOTION',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    desc: 'Ads and promo videos of 15 to 60 seconds for launches and social media, planned on a storyboard and set to licensed music.',
    tags: ['Product Promos', 'Social Ads', 'Launch Videos'],
    href: '/services/video-animation/motion-graphics',
    animType: 'film',
  },
  {
    id: 'shortform',
    title: 'Short-Form, Reels and Talking Head',
    badge: 'VIRAL',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    desc: 'Scroll-stopping cuts built natively for TikTok, Reels, and Shorts, with captions and pacing optimised for maximum watch time.',
    tags: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    href: '/services/video-animation/video-editing',
    animType: 'phone',
  },
];

const processSteps = [
  { step: '01', title: 'Creative Brief',      desc: 'We dive deep on your brand, audience, goal, and platform. No guesswork, no generic scripts.',                       icon: <Sparkles className="w-6 h-6" aria-hidden="true" /> },
  { step: '02', title: 'Script and Storyboard', desc: 'Every frame is planned before a single pixel moves. You approve the story before production begins.',             icon: <Film className="w-6 h-6" aria-hidden="true" /> },
  { step: '03', title: 'Production and Motion', desc: 'Animation, sound design, voiceover and colour grading, checked before every delivery.',                   icon: <Play className="w-6 h-6" aria-hidden="true" /> },
  { step: '04', title: 'Revise and Export',     desc: 'You review the draft and we refine it. Final files arrive in the formats your project needs, ready to publish.', icon: <Zap className="w-6 h-6" aria-hidden="true" /> },
];

/* Category price cards: one per service page, linking to its prices.
   The price on each card comes from Supabase (getFromPricesUnder); the copy is from the price book 2.3. */
const priceCards = [
  {
    path: '/services/video-animation/logo-animation',
    title: 'Logo Animation',
    kind: 'One-off project',
    desc: 'Your logo brought to life for intros, outros, websites and social media.',
    features: ['2D reveals, custom 2D concepts or 3D', '5 to 15 seconds, with music and sound', 'MP4, transparent MOV and Lottie files'],
    delivery: '3 to 10 working days',
    cta: 'See logo animation prices',
    featured: true,
  },
  {
    path: '/services/video-animation/explainer-videos',
    title: 'Explainer Videos',
    kind: 'One-off project',
    desc: 'Script-to-screen videos that make a complex product easy to understand.',
    features: ['60 or 90 seconds', 'Script, storyboard and illustration', 'Professional voiceover and music', '3 revision rounds'],
    delivery: '3 to 5 weeks',
    cta: 'See explainer video prices',
  },
  {
    path: '/services/video-animation/motion-graphics',
    title: 'Motion Graphics',
    kind: 'One-off project',
    desc: 'Motion graphics ads and videos for launches, promos and social media.',
    features: ['15, 30 or 60 seconds', 'Storyboard, motion design and licensed music', '2 revision rounds'],
    delivery: '5 working days to 3 weeks',
    cta: 'See motion graphics prices',
  },
  {
    path: '/services/video-animation/video-editing',
    title: 'Video Editing and Reels',
    kind: 'Per video or monthly',
    desc: 'Reels, Shorts, TikToks, talking-head videos and YouTube edits.',
    features: ['Short-form edits up to 90 seconds', 'Captions, music and motion text', 'Long-form edits up to 15 minutes', 'Try one, buy a pack of 30 or go monthly'],
    delivery: '2 to 5 working days per video',
    cta: 'See video editing prices',
  },
];

/* ─── bento cell animations (sized for 80x80 container) ─────── */

const MorphCell = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <div className="w-14 h-14 bg-[#1044ff]/15" style={{ animation: 'va-morph 6s ease-in-out infinite' }} />
    <div className="absolute w-9 h-9 bg-[#1044ff]/20" style={{ animation: 'va-morph2 4s ease-in-out infinite' }} />
    <div className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-[#1044ff]/20 border border-[#1044ff]/30">
      <Play className="w-2.5 h-2.5 text-[#1044ff] fill-[#1044ff] ml-px" />
    </div>
  </div>
);

const NodesCell = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <line x1="8" y1="40" x2="28" y2="18" stroke="#1044ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="28" strokeDashoffset="28" style={{ animation: 'va-dash 2s linear infinite alternate' }} />
    <line x1="28" y1="18" x2="54" y2="40" stroke="#1044ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="30" strokeDashoffset="30" style={{ animation: 'va-dash 2s 0.3s linear infinite alternate' }} />
    <line x1="54" y1="40" x2="70" y2="14" stroke="#1044ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="30" strokeDashoffset="30" style={{ animation: 'va-dash 2s 0.6s linear infinite alternate' }} />
    <line x1="28" y1="18" x2="28" y2="58" stroke="#1044ff" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="40" strokeDashoffset="40" style={{ animation: 'va-dash 1.5s 0.4s linear infinite alternate' }} />
    {[[8,40],[28,18],[28,58],[54,40],[70,14]].map(([cx,cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={i%2===0?4:3} fill="#1044ff" fillOpacity="0.5" style={{ animation: `va-node 2s ${i*0.3}s ease-in-out infinite` }} />
    ))}
  </svg>
);

const WaveCell = () => (
  <div className="w-full h-full flex items-end justify-center pb-1.5 gap-[2px]">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="w-1.5 rounded-full bg-purple-400/55"
        style={{
          height: `${10 + Math.sin(i * 0.6) * 8}px`,
          animation: `va-wave ${0.6 + (i % 5) * 0.1}s ease-in-out infinite`,
          animationDelay: `${i * 0.08}s`,
        }}
      />
    ))}
  </div>
);

/* Gentle concentric rings (film reel). Replaces a distracting scan beam. */
const FilmCell = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <circle cx="40" cy="40" r="32" fill="none" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.2" style={{ animation: 'va-node 3s ease-in-out infinite' }} />
    <circle cx="40" cy="40" r="20" fill="none" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.25" style={{ animation: 'va-node 3s 0.6s ease-in-out infinite' }} />
    <circle cx="40" cy="40" r="9" fill="#059669" fillOpacity="0.12" stroke="#059669" strokeWidth="1" strokeOpacity="0.35" />
    <line x1="40" y1="8" x2="40" y2="20" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="40" y1="60" x2="40" y2="72" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="8"  y1="40" x2="20" y2="40" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="60" y1="40" x2="72" y2="40" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <circle cx="72" cy="40" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'va-node 2s ease-in-out infinite' }} />
    <circle cx="40" cy="72" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'va-node 2s 0.3s ease-in-out infinite' }} />
    <circle cx="8"  cy="40" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'va-node 2s 0.6s ease-in-out infinite' }} />
    <circle cx="40" cy="8"  r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'va-node 2s 0.9s ease-in-out infinite' }} />
  </svg>
);

const PhoneCell = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div
      className="w-9 h-16 rounded-xl border-2 border-[#e7811e]/35 bg-orange-50 flex flex-col items-center justify-center gap-1 shadow-sm"
      style={{ animation: 'va-float 3s ease-in-out infinite' }}
    >
      <div className="w-3 h-0.5 rounded-full bg-[#e7811e]/30" />
      <div className="w-5 h-7 rounded-md bg-orange-200/40 border border-orange-100 flex items-center justify-center">
        <Play className="w-2 h-2 text-[#e7811e] fill-[#e7811e]" />
      </div>
      <div className="w-2 h-2 rounded-full border border-[#e7811e]/30" />
    </div>
  </div>
);

const cellAnimMap = {
  morph: <MorphCell />,
  nodes: <NodesCell />,
  wave:  <WaveCell />,
  film:  <FilmCell />,
  phone: <PhoneCell />,
};

/* ─── typewriter cycling headline ────────────────────────────── */
/* Phrases complete the sentence "It Is Your ___"
   Kept short so they never wrap on mobile */
const PHRASES = [
  'Message.',
  'Brand Soul.',
  'Statement.',
  'Legacy.',
  'Voice.',
];

const TypeWriter = () => <SharedTypeWriter phrases={PHRASES} blink="va-blink" />;

/* ─── service card (pure CSS group-hover, no React state) ────── */
/**
 * @param {{ svc: object, price: number | null | undefined, compact?: boolean }} props
 *   price: the "from" price for the card, read from Supabase on the server
 */
const ServiceCard = ({ svc, price, compact = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group h-full"
  >
    <Link
      href={svc.href}
      className={`block relative overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-pointer h-full ${compact ? 'p-6 min-h-[200px]' : 'p-8 min-h-[280px]'}`}
    >
      {/* Blue gradient hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1044ff] to-[#0020bf] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" />

      {/* Animation icon, bottom-right corner */}
      <div aria-hidden="true" className="absolute bottom-4 right-4 w-20 h-20 opacity-70 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
        {cellAnimMap[svc.animType]}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${svc.badgeClass} group-hover:bg-white/15 group-hover:border-white/25 group-hover:text-white`}>
            {svc.badge}
          </span>
          <ArrowUpRight aria-hidden="true" className="w-5 h-5 text-gray-300 group-hover:text-white/70 transition-colors duration-300" />
        </div>

        <h3 className={`font-extrabold text-gray-900 group-hover:text-white mb-2 tracking-tight leading-tight transition-colors duration-300 ${compact ? 'text-lg' : 'text-xl md:text-2xl'}`}>
          {svc.title}
        </h3>
        <p className={`text-gray-500 group-hover:text-white/75 leading-relaxed mb-4 flex-grow transition-colors duration-300 ${compact ? 'text-xs' : 'text-sm'}`}>
          {svc.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {svc.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 group-hover:bg-white/15 group-hover:text-white/70 group-hover:border-white/20 px-2.5 py-1 rounded-lg transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold transition-colors duration-300">
          {price != null && (
            <span className="text-gray-900 group-hover:text-white transition-colors duration-300">from {formatGBP(price)}</span>
          )}
          <span className="flex items-center gap-1 text-[#1044ff] group-hover:text-white transition-colors duration-300">
            View Service <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ─── page component ──────────────────────────────────────────── */
/**
 * Video and Animation category page (D30: same layout, data from the server).
 *
 * @param {{
 *   h1: string, prices?: object[], fromPrice?: number | null, billing?: 'one-off' | 'monthly',
 *   slides?: object[], reviews?: object[], bookHref: string,
 *   fromPrices?: Record<string, number | null>, longFormFrom?: number | null,
 *   caseStudy?: object | null, projects?: object[], related?: React.ReactNode,
 * }} props
 *   prices: this page's own items (the voiceover add-on). fromPrices: lowest price per service page.
 *   caseStudy and projects stay empty until Phase 5, so their sections render nothing.
 */
const ServiceVideoAnimation = ({
  h1,
  prices = [],
  fromPrice = null,
  billing = 'one-off',
  slides = [],
  reviews = [],
  bookHref,
  fromPrices = {},
  longFormFrom = null,
  caseStudy = null,
  projects = [],
  related = null,
}) => {
  const cardPrice = (svc) => (svc.priceKey === 'longForm' ? longFormFrom : fromPrices[svc.href]);
  const visiblePriceCards = priceCards
    .map((card) => ({ ...card, price: fromPrices[card.path] }))
    .filter((card) => card.price != null);

  return (
    <>
      <style>{VA_STYLES}</style>

      {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        {/* Grid: matches all other service page heroes */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              {/* REC badge: the H1, with the keyword from routes.js */}
              <h1 className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-2 mb-8">
                <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/40" style={{ animation: 'va-rec 1.2s ease-in-out infinite' }} />
                <span className="text-xs font-bold text-red-600 tracking-[0.2em] uppercase">{h1}</span>
              </h1>

              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Motion Is Not a Medium.</span>
                <span className="block text-[#1044ff]">It Is Your</span>
                <span className="block text-[#1044ff] min-h-[1.1em]">
                  <TypeWriter />
                </span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Logo animations, motion graphics, explainer videos, and short-form content engineered for a single outcome: growth.
              </p>
              {/* Anchors on our signature service, not the cheapest item (D39 reasoning); the schema keeps the true lowest price. */}
              <FromPriceLine price={fromPrices['/services/video-animation/logo-animation']} billing="one-off" label="Logo animation" className="mb-12" />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm">
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

        <WorkImageStrip slides={slides} label="Recent Video Work" fadeColor="#ffffff" />
      </section>

      {/* ── SECTION 2: STATS, styled like branding philosophy ───── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        {/* Watermark */}
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">MOTION</span>
        </div>

        {/* Top marquee (decorative) */}
        <div aria-hidden="true" className="overflow-hidden border-b border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'va-marquee 35s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 mb-8">
              OUR TRACK RECORD
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
              Motion Is Not<br />
              Optional Anymore.<br />
              <span className="text-[#e7811e]">It Is Expected.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 rounded-2xl overflow-hidden">
              {statsData.map((stat, idx) => (
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

        {/* Bottom marquee (decorative) */}
        <div aria-hidden="true" className="overflow-hidden border-t border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'va-marquee 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e]/50 mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHAT WE CREATE ────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">WHAT WE CREATE</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Every Format. One Creative Team.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
              From a 5-second logo reveal to a 15-minute YouTube edit, one team handles the whole production.
            </p>
          </motion.div>

          <div className="space-y-4">
            {/* Row 1: Logo Animation + Explainer (2 wide cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.slice(0, 2).map((svc) => (
                <ServiceCard key={svc.id} svc={svc} price={cardPrice(svc)} compact={false} />
              ))}
            </div>
            {/* Row 2: Long-form + Motion Graphics + Short-Form (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.slice(2).map((svc) => (
                <ServiceCard key={svc.id} svc={svc} price={cardPrice(svc)} compact={true} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PROCESS ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              From Brief to Brilliant.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every great video starts with the right questions asked in the right order.</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            {processSteps.map((step, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ rotate: i % 2 === 0 ? -1.5 : 1.5, scale: 1.03, y: -10 }}
                  className="flex-1 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm cursor-default relative overflow-hidden group"
                >
                  <span aria-hidden="true" className="absolute -bottom-4 -right-2 text-[100px] font-black text-gray-100 select-none leading-none pointer-events-none group-hover:text-blue-50 transition-colors duration-300">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-50 text-[#1044ff] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1044ff] group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 tracking-tight group-hover:text-[#1044ff] transition-colors duration-300">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </motion.div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-gray-300" aria-hidden="true" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CASE STUDY (renders only with a real case study, Phase 5) ── */}
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
                  : <div className="absolute inset-0 flex items-center justify-center bg-gray-200"><span className="text-gray-400 text-sm">No image</span></div>
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

      {/* ── SECTION 6: PORTFOLIO (renders only with real projects, Phase 5) ── */}
      {projects.length > 0 && (
        <section className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
          <div className="container mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">RECENT VIDEO WORK</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Motion in Action.</h2>
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

      {/* ── SECTION 7: PRICES (one card per service page, from Supabase) ── */}
      <section id="prices" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">PRICING</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Clear Prices. <span className="text-[#1044ff]">One Team.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
              Every service has a published starting price, and you get a fixed quote before work starts.
            </p>
          </motion.div>

          {visiblePriceCards.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
              {visiblePriceCards.map((card, i) => {
                const isFeatured = Boolean(card.featured);
                return (
                  <motion.div
                    key={card.path}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col gap-6 border transition-all duration-300 ${
                      isFeatured
                        ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent shadow-2xl shadow-blue-500/25 scale-[1.02]'
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {isFeatured && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#e7811e] text-white">
                        {SITE.proof.logoAnimationReviews} reviews on Fiverr
                      </span>
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isFeatured ? 'text-white/50' : 'text-gray-400'}`}>
                      {card.kind}
                    </span>
                    <h3 className={`text-2xl font-black tracking-tight leading-tight ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                    <p className={`text-sm leading-relaxed ${isFeatured ? 'text-white/75' : 'text-gray-500'}`}>{card.desc}</p>
                    <div className="flex flex-wrap items-end gap-x-2">
                      <span className={`text-lg font-semibold mb-1.5 ${isFeatured ? 'text-white/60' : 'text-gray-500'}`}>from</span>
                      <span className={`text-5xl font-black tracking-tighter ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{formatGBP(card.price)}</span>
                    </div>
                    <p className={`text-sm font-semibold -mt-3 ${isFeatured ? 'text-white/70' : 'text-gray-500'}`}>Delivery: {card.delivery}</p>
                    <div className={`h-px w-full ${isFeatured ? 'bg-white/15' : 'bg-gray-100'}`} />
                    <ul className="flex flex-col gap-3 flex-grow">
                      {card.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <CheckCircle size={16} aria-hidden="true" className={`flex-shrink-0 mt-0.5 ${isFeatured ? 'text-white/60' : 'text-[#1044ff]'}`} />
                          <span className={`text-sm leading-relaxed ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild size="lg" className={`rounded-full h-auto min-h-12 py-3 text-sm font-bold mt-auto whitespace-normal text-center transition-transform hover:scale-105 ${isFeatured ? 'bg-none bg-white text-[#1044ff] hover:bg-gray-100 shadow-lg' : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'}`}>
                      <Link href={`${card.path}#prices`}>{card.cta} <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" aria-hidden="true" /></Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Add-ons for this page (the voiceover), as one short line each */}
          {prices.length > 0 && (
            <ul className="mt-12 flex flex-col items-center gap-2">
              {prices.map((item) => (
                <li key={item.id} className="text-center text-base text-gray-600">
                  <span className="font-bold text-gray-900">{item.name}:</span> {item.display.label}.
                  {item.includes?.length ? ` ${item.includes.join('. ')}.` : ''}
                </li>
              ))}
            </ul>
          )}

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="text-center text-gray-500 text-base mt-10"
          >
            Need something custom?{' '}
            <Link href={bookHref} data-cta="book-a-free-call" className="text-[#1044ff] font-semibold hover:underline">
              Book a free call
            </Link>
            .
          </motion.p>
        </div>
      </section>

      {/* ── REVIEWS (real Fiverr reviews; renders nothing when empty) ── */}
      <ServiceReviews reviews={reviews} />

      {/* ── SECTION 8: FAQ ──────────────────────────────────────── */}
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

      {/* ── SECTION 9: CTA ──────────────────────────────────────── */}
      {related}

      <CTASection
        headline="Ready to Put Your Brand in Motion?"
        subtext="Book a free call. Tell us what you want to make, and we will send a fixed quote with clear dates."
        service="video-animation"
      />
    </>
  );
};

export default ServiceVideoAnimation;
