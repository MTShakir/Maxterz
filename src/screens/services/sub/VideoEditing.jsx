'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Star,
  ShieldCheck,
  Upload,
  Scissors,
  Captions,
  MessageSquare,
  Download,
  Play,
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
import { faqs } from '@/content/faq/video-editing';
import SharedTypeWriter from '@/components/TypeWriter';

/*
 * Video editing service page (D30: built from the video service screens, so the site reads as
 * one system). Structure from LogoAnimation.jsx; the "why" band and the bento cards from
 * ServiceVideoAnimation.jsx; the price cards from ThumbnailDesign.jsx (same pricing block, D30).
 * Facts: price book 2.3 and 2.8, and SITE.proof. Prices come from Supabase.
 */

/* ─── keyframes (this page's own names) ──────────────────────── */
const VE_STYLES = `
  @keyframes ve-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes ve-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes ve-morph   { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:rotate(0deg) scale(.85)} 25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:rotate(90deg) scale(.9)} 50%{border-radius:40% 60% 60% 40%/70% 30% 50% 60%;transform:rotate(180deg) scale(.85)} 75%{border-radius:70% 30% 40% 60%/40% 70% 30% 50%;transform:rotate(270deg) scale(.9)} }
  @keyframes ve-morph2  { 0%,100%{border-radius:30% 70% 70% 30%/30% 30% 70% 70%;transform:rotate(0deg) scale(.65);opacity:.25} 50%{border-radius:70% 30% 30% 70%/70% 70% 30% 30%;transform:rotate(180deg) scale(.7);opacity:.45} }
  @keyframes ve-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes ve-wave    { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(.2)} }
  @keyframes ve-node    { 0%,100%{opacity:.3} 50%{opacity:.9} }
`;

/* ─── typewriter ─────────────────────────────────────────────── */
/* Completes "Your Footage. Edited for ___". The first phrase is the one in the server HTML. */
const PHRASES = [
  'Reels.',
  'Shorts.',
  'TikTok.',
  'YouTube.',
];

const TypeWriter = () => <SharedTypeWriter phrases={PHRASES} blink="ve-blink" />;

/* ─── static data ─────────────────────────────────────────────── */
const marqueeWords = [
  'REELS', 'YOUTUBE SHORTS', 'TIKTOK', 'TALKING HEAD', 'CAPTIONS', 'MOTION TEXT',
  'B-ROLL', 'LONG-FORM YOUTUBE', 'MUSIC', 'CLEAN CUTS', 'PACING', 'VERTICAL VIDEO',
];

/* Why work with us: one team, one point of contact, 10,000+ projects, files you own.
   SITE.proof and the 4B brief, not industry statistics. */
const statsData = [
  { value: '1 team', label: 'for your edits, thumbnails and motion graphics, with one point of contact' },
  { value: SITE.proof.projects, label: `projects delivered since ${SITE.proof.fiverrSince}` },
  { value: 'Yours', label: 'the edited videos, to post and reuse wherever you like' },
];

/* What we edit (formats, lengths and inclusions from the price book 2.3). */
const formats = [
  {
    id: 'short-form',
    badge: 'SHORT-FORM',
    title: 'Reels, Shorts and TikToks',
    desc: 'Vertical edits up to 90 seconds with captions, music and motion text, paced to hold attention from the first second.',
    tags: ['Instagram Reels', 'YouTube Shorts', 'TikTok'],
    animType: 'phone',
  },
  {
    id: 'talking-head',
    badge: 'TALKING HEAD',
    title: 'Talking-Head Videos',
    desc: 'You talk to camera. We cut the pauses and retakes, add captions and motion text, and keep the pace tight.',
    tags: ['Founders', 'Coaches', 'Experts'],
    animType: 'morph',
  },
  {
    id: 'long-form',
    badge: 'LONG-FORM',
    title: 'Long-Form YouTube Edits',
    desc: 'Videos up to 15 minutes with cuts, b-roll, captions and graphics, delivered in 3 to 5 working days.',
    link: {
      lead: 'Need a thumbnail for each upload? See our',
      text: 'YouTube thumbnail design',
      href: '/services/branding-design/thumbnail-design',
    },
    tags: ['YouTube', 'Interviews', 'Tutorials'],
    animType: 'wave',
  },
  {
    id: 'included',
    badge: 'INCLUDED',
    title: 'Captions, Music and Motion Text',
    desc: 'Every short-form edit includes captions, so it works with the sound off, plus music and motion text that bring out your key points.',
    tags: ['Captions', 'Music', 'Motion Text'],
    animType: 'film',
  },
];

/* Process (what is included and the timelines from the price book 2.3) */
const steps = [
  {
    n: '01',
    icon: <Upload className="w-5 h-5" aria-hidden="true" />,
    title: 'Send Your Footage',
    desc: 'Share your raw clips in a shared folder, with a short brief: where the video will run, what it is about and any edits you like the style of.',
  },
  {
    n: '02',
    icon: <Scissors className="w-5 h-5" aria-hidden="true" />,
    title: 'The Edit',
    desc: 'We cut the pauses and retakes, set the pace and add music. Long-form edits get b-roll and graphics where they help the story.',
  },
  {
    n: '03',
    icon: <Captions className="w-5 h-5" aria-hidden="true" />,
    title: 'Captions and Motion Text',
    desc: 'Every edit gets captions, so it works with the sound off. Short-form edits also get motion text on the points that matter.',
  },
  {
    n: '04',
    icon: <MessageSquare className="w-5 h-5" aria-hidden="true" />,
    title: 'Your Review',
    desc: 'You watch the draft and tell us what to change. We make the changes and send the final cut.',
  },
  {
    n: '05',
    icon: <Download className="w-5 h-5" aria-hidden="true" />,
    title: 'Ready to Post',
    desc: 'You get the final video in the right size for its platform, ready to upload. The edited videos are yours.',
  },
];

/* ─── bento cell animations (sized for an 80x80 container) ───── */

const MorphCell = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <div className="w-14 h-14 bg-[#1044ff]/15" style={{ animation: 've-morph 6s ease-in-out infinite' }} />
    <div className="absolute w-9 h-9 bg-[#1044ff]/20" style={{ animation: 've-morph2 4s ease-in-out infinite' }} />
    <div className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-[#1044ff]/20 border border-[#1044ff]/30">
      <Play className="w-2.5 h-2.5 text-[#1044ff] fill-[#1044ff] ml-px" />
    </div>
  </div>
);

const WaveCell = () => (
  <div className="w-full h-full flex items-end justify-center pb-1.5 gap-[2px]">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="w-1.5 rounded-full bg-purple-400/55"
        style={{
          height: `${10 + Math.sin(i * 0.6) * 8}px`,
          animation: `ve-wave ${0.6 + (i % 5) * 0.1}s ease-in-out infinite`,
          animationDelay: `${i * 0.08}s`,
        }}
      />
    ))}
  </div>
);

/* Gentle concentric rings (film reel). */
const FilmCell = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <circle cx="40" cy="40" r="32" fill="none" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.2" style={{ animation: 've-node 3s ease-in-out infinite' }} />
    <circle cx="40" cy="40" r="20" fill="none" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.25" style={{ animation: 've-node 3s 0.6s ease-in-out infinite' }} />
    <circle cx="40" cy="40" r="9" fill="#059669" fillOpacity="0.12" stroke="#059669" strokeWidth="1" strokeOpacity="0.35" />
    <line x1="40" y1="8" x2="40" y2="20" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="40" y1="60" x2="40" y2="72" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="8" y1="40" x2="20" y2="40" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="60" y1="40" x2="72" y2="40" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <circle cx="72" cy="40" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 've-node 2s ease-in-out infinite' }} />
    <circle cx="40" cy="72" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 've-node 2s 0.3s ease-in-out infinite' }} />
    <circle cx="8" cy="40" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 've-node 2s 0.6s ease-in-out infinite' }} />
    <circle cx="40" cy="8" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 've-node 2s 0.9s ease-in-out infinite' }} />
  </svg>
);

const PhoneCell = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div
      className="w-9 h-16 rounded-xl border-2 border-[#e7811e]/35 bg-orange-50 flex flex-col items-center justify-center gap-1 shadow-sm"
      style={{ animation: 've-float 3s ease-in-out infinite' }}
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
  wave: <WaveCell />,
  film: <FilmCell />,
  phone: <PhoneCell />,
};

/* ─── helpers ─────────────────────────────────────────────────── */

/**
 * Small label above a price card title (inventory section 3), as on the thumbnail page.
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
 * A format card in the category bento style (ServiceVideoAnimation ServiceCard), without a card
 * link: it describes what we edit. An optional in-text link points to a related service.
 * @param {{ item: { badge: string, title: string, desc: string, tags: string[], animType: string,
 *   link?: { lead: string, text: string, href: string } } }} props
 */
const FormatCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group h-full"
  >
    <div className="relative overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 h-full p-8 min-h-[280px]">
      {/* Blue gradient hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1044ff] to-[#0020bf] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem] pointer-events-none" />

      {/* Animation icon, bottom-right corner */}
      <div aria-hidden="true" className="absolute bottom-4 right-4 w-20 h-20 opacity-70 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
        {cellAnimMap[item.animType]}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start mb-4">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/5 group-hover:bg-white/15 group-hover:border-white/25 group-hover:text-white transition-all duration-300">
            {item.badge}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-white mb-2 tracking-tight leading-tight transition-colors duration-300">
          {item.title}
        </h3>
        <div className="flex-grow mb-4">
          <p className="text-sm text-gray-500 group-hover:text-white/75 leading-relaxed transition-colors duration-300">
            {item.desc}
          </p>
          {item.link && (
            <p className="text-sm text-gray-500 group-hover:text-white/75 leading-relaxed mt-3 transition-colors duration-300">
              {item.link.lead}{' '}
              <Link href={item.link.href} className="font-semibold text-[#1044ff] group-hover:text-white underline-offset-4 hover:underline">
                {item.link.text}
              </Link>
              .
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pr-20">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-gray-600 bg-white border border-gray-100 group-hover:bg-white/15 group-hover:text-white/70 group-hover:border-white/20 px-2.5 py-1 rounded-lg transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/**
 * An FAQ answer with its optional in-text link (src/content/faq), as on the thumbnail page.
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

/* ─── component ──────────────────────────────────────────────── */
/**
 * Video editing service page. All data is read on the server in page.jsx and passed in.
 *
 * @param {{
 *   h1: string, prices?: object[], fromPrice?: number | null, billing?: 'one-off' | 'monthly',
 *   slides?: object[], reviews?: object[], bookHref: string,
 *   caseStudy?: object | null, projects?: object[], related?: React.ReactNode,
 * }} props
 *   prices: price_items for this page (short-edit-single, short-edit-pack-30, short-edit-monthly,
 *   long-form-edit) with display parts, book_href and buy_url (getServicePageData).
 *   caseStudy and projects stay empty until Phase 5, so their sections render nothing.
 */
const VideoEditing = ({
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
  // Short-form options show as cards. "From" items (the long-form edit) show as one clear line
  // each, with what drives the final price (inventory section 3, brief 7.5 item 5).
  const cardItems = prices.filter((item) => item.model !== 'from');
  const lineItems = prices.filter((item) => item.model === 'from');

  return (
    <>
      <style>{VE_STYLES}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <h1 className="badge-standard-light mb-8">{h1}</h1>

              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Your Footage.</span>{' '}
                <span className="block">Edited for</span>{' '}
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Edits for Reels, Shorts, TikTok and talking-head videos up to 90 seconds, plus long-form YouTube videos. Every short-form edit comes with captions, music and motion text.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="Video editing" className="mb-12" />

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

        <WorkImageStrip slides={slides} label="Recent Edits" fadeColor="#ffffff" />
      </section>

      {/* ── WHAT THIS SOLVES AND WHY US (band from the video category page) ── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        {/* Watermark */}
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">EDIT</span>
        </div>

        {/* Top marquee (decorative) */}
        <div aria-hidden="true" className="overflow-hidden border-b border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 've-marquee 35s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/80 mb-8">
              WHY HAND IT OVER
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
              You Film It.<br />{' '}
              We Edit It.<br />{' '}
              <span className="text-[#fdba74]">You Post It.</span>
            </h2>
            <p className="text-white/75 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-16 md:mb-20">
              Editing takes hours you could spend filming or running your business. Long pauses and retakes lose viewers, and when edits pile up, posting stops. Send us your footage and keep to your schedule.
            </p>

            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/80 mb-6">
              WHY WORK WITH US
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 rounded-2xl overflow-hidden">
              {statsData.map((stat, idx) => (
                <motion.div
                  key={stat.value}
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
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 've-marquee 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e]/50 mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE EDIT (bento cards from the video category page) ── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">WHAT WE EDIT</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Short or Long. One Editing Team.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
              Reels, Shorts, TikToks and talking-head videos up to 90 seconds, plus long-form YouTube edits up to 15 minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formats.map((item) => (
              <FormatCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="badge-standard-light">OUR PROCESS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
              From Raw Footage to Ready to Post.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              A short-form edit takes 2 working days. A long-form edit takes 3 to 5 working days. The time starts when we have your footage and brief.
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
                  {/* Step meta. Sample media boxes stay out until real project media exists. */}
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
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Video Editing in Practice.</h2>
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
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">RECENT EDITS</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Edits We Have Delivered.</h2>
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

      {/* ── PRICES (from Supabase; card layout from the thumbnail page, D30) ── */}
      <section id="prices" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">PRICING</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Try One. Buy a Pack. <span className="text-[#1044ff]">Or Go Monthly.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
              Every short-form edit covers a video up to 90 seconds, with captions, music and motion text. Try one, buy a pack of 30 for your next run of posts, or ask for a monthly plan. Long-form YouTube edits are priced per video.
            </p>
          </motion.div>

          {cardItems.length > 0 && (
            <div className={`grid grid-cols-1 ${priceGrid(cardItems.length)} gap-6 items-stretch`}>
              {cardItems.map((item, idx) => {
                const featured = Boolean(item.popular);
                const { prefix, amount, suffix, setup } = item.display;
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
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#c2410c] text-white">
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
                      {prefix && (
                        <span className={`text-lg font-semibold mb-1.5 ${featured ? 'text-white/60' : 'text-gray-500'}`}>{prefix}</span>
                      )}
                      <span className={`${item.price_gbp == null ? 'text-4xl' : 'text-5xl'} font-black tracking-tighter ${featured ? 'text-white' : 'text-gray-900'}`}>
                        {amount}
                      </span>
                      {suffix && (
                        <span className={`text-lg font-semibold mb-1.5 ${featured ? 'text-white/60' : 'text-gray-500'}`}>{suffix}</span>
                      )}
                    </div>
                    {setup && (
                      <p className={`-mt-4 text-sm font-semibold ${featured ? 'text-white/80' : 'text-gray-500'}`}>{setup}</p>
                    )}

                    <div className={`h-px w-full ${featured ? 'bg-white/20' : 'bg-gray-100'}`} />

                    {item.includes?.length > 0 && (
                      <ul className="flex flex-col gap-3 flex-grow">
                        {item.includes.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle size={16} aria-hidden="true" className={`flex-shrink-0 mt-0.5 ${featured ? 'text-white/70' : 'text-[#1044ff]'}`} />
                            <span className={`text-sm leading-relaxed ${featured ? 'text-white/85' : 'text-gray-600'}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.timeline && (
                      <div
                        className={`rounded-xl p-4 text-sm leading-relaxed font-medium ${
                          featured
                            ? 'bg-white/15 text-white/80 border border-white/20'
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
                          featured ? 'bg-none bg-white text-[#1044ff] hover:bg-gray-100 shadow-lg' : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'
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
                          className={`rounded-full h-12 text-sm font-bold ${featured ? 'border-white text-white bg-transparent' : ''}`}
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

          {/* "From" items: one clear line each, in the same card style */}
          {lineItems.length > 0 && (
            <div className="mt-6 flex flex-col gap-6">
              {lineItems.map((item) => {
                const { prefix, amount, suffix } = item.display;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[2rem] p-8 md:p-10 border bg-white border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
                  >
                    <div className="flex-1 flex flex-col gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">{priceEyebrow(item)}</span>
                      <h3 className="text-2xl font-black tracking-tight leading-tight text-gray-900">{item.tier_label || item.name}</h3>
                      {item.includes?.length > 0 && (
                        <ul className="flex flex-wrap gap-x-6 gap-y-3">
                          {item.includes.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <CheckCircle size={16} aria-hidden="true" className="flex-shrink-0 mt-0.5 text-[#1044ff]" />
                              <span className="text-sm leading-relaxed text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="text-sm leading-relaxed text-gray-500">
                        Your final price depends on the length of your video and the editing it needs. You get a fixed quote before work starts.
                      </p>
                      {item.timeline && (
                        <p className="self-start rounded-xl px-4 py-3 text-sm leading-relaxed font-medium bg-gray-50 text-gray-500 border border-gray-100">
                          Delivery: {item.timeline}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-4 md:items-end md:min-w-[240px]">
                      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                        {prefix && <span className="text-lg font-semibold mb-1.5 text-gray-500">{prefix}</span>}
                        <span className={`${item.price_gbp == null ? 'text-4xl' : 'text-5xl'} font-black tracking-tighter text-gray-900`}>{amount}</span>
                        {suffix && <span className="text-lg font-semibold mb-1.5 text-gray-500">{suffix}</span>}
                      </div>
                      <Button asChild size="lg" className="rounded-full h-12 px-8 text-sm font-bold w-full md:w-auto transition-transform hover:scale-105 bg-[#1044ff] text-white hover:bg-[#0020bf]">
                        <Link href={item.book_href} data-cta="book-a-free-call">
                          {BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                        </Link>
                      </Button>
                      {item.buy_url && (
                        <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 text-sm font-bold w-full md:w-auto">
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

          <div className="mt-10 space-y-3 text-center">
            <p className="text-gray-500 text-base">
              Need something custom?{' '}
              <Link href={bookHref} data-cta="book-a-free-call" className="text-[#1044ff] font-semibold hover:underline">
                Book a free call
              </Link>
              .
            </p>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              Need design work as well as edits? Our{' '}
              <Link href="/packages#monthly" className="text-[#1044ff] font-semibold hover:underline">
                Design + Video subscription
              </Link>{' '}
              includes short-form edits and motion graphics up to 30 seconds.
            </p>
          </div>
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
                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed"><FaqAnswer faq={faq} /></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {related}

      <CTASection
        headline="Ready to Hand Over Your Editing?"
        subtext="Book a free call. Tell us where you post and how often, and we will recommend one edit, a pack or a monthly plan, with a clear price before work starts."
        service="video-editing"
      />
    </>
  );
};

export default VideoEditing;
