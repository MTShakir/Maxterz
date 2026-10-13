'use client';

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
  Sparkles,
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
import { faqs } from '@/content/faq/motion-graphics';
import SharedTypeWriter from '@/components/TypeWriter';

/*
 * Motion graphics service page (D30: built from the video service screens, so the site reads as
 * one system). Structure from LogoAnimation.jsx; the "why" band and the bento cards are borrowed
 * from ServiceVideoAnimation.jsx. Facts: price book 2.3 and SITE.proof. Prices come from Supabase.
 */

/* ─── keyframes (this page's own names) ──────────────────────── */
const MG_STYLES = `
  @keyframes mg-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes mg-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes mg-morph   { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:rotate(0deg) scale(.85)} 25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:rotate(90deg) scale(.9)} 50%{border-radius:40% 60% 60% 40%/70% 30% 50% 60%;transform:rotate(180deg) scale(.85)} 75%{border-radius:70% 30% 40% 60%/40% 70% 30% 50%;transform:rotate(270deg) scale(.9)} }
  @keyframes mg-morph2  { 0%,100%{border-radius:30% 70% 70% 30%/30% 30% 70% 70%;transform:rotate(0deg) scale(.65);opacity:.25} 50%{border-radius:70% 30% 30% 70%/70% 70% 30% 30%;transform:rotate(180deg) scale(.7);opacity:.45} }
  @keyframes mg-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes mg-node    { 0%,100%{opacity:.3} 50%{opacity:.9} }
  @keyframes mg-dash    { to{stroke-dashoffset:0} }
`;

/* ─── typewriter ─────────────────────────────────────────────── */
/* Completes "Your Message. Told in ___". The first phrase is the one in the server HTML. */
const PHRASES = [
  'Motion.',
  '15 Seconds.',
  '30 Seconds.',
  '60 Seconds.',
];

const TypeWriter = () => <SharedTypeWriter phrases={PHRASES} blink="mg-blink" />;

/* ─── static data ─────────────────────────────────────────────── */
const marqueeWords = [
  'MOTION GRAPHICS', 'SOCIAL ADS', 'PRODUCT LAUNCHES', 'PROMO VIDEOS', 'KINETIC TYPE',
  'STORYBOARDS', 'PRESENTATIONS', 'SOCIAL CUT-DOWNS', 'LICENSED MUSIC', 'BRAND MOTION',
];

/* Why work with us: one team, one point of contact, 10,000+ projects, files you own.
   SITE.proof and the 4B brief, not industry statistics. */
const statsData = [
  { value: '1 team', label: 'plans, designs and animates your video, with one point of contact from brief to delivery' },
  { value: SITE.proof.projects, label: `projects delivered since ${SITE.proof.fiverrSince}, starting with logo animation and design` },
  { value: 'Yours', label: 'the final video files, to use in ads, on social media and in presentations' },
];

/* Where motion graphics work (the uses in the price book and routes.js description). */
const uses = [
  {
    id: 'ads',
    badge: 'ADS',
    title: 'Social and Video Ads',
    desc: 'Short ads built around one offer and one clear next step. A 15-second ad suits a single product. A 30-second ad gives you room to show more.',
    tags: ['Paid Social', 'Promos', 'Offers'],
    animType: 'film',
  },
  {
    id: 'launches',
    badge: 'LAUNCHES',
    title: 'Product Launches',
    desc: 'Show what is new and why it matters in one short video, ready for your website, your launch posts and your ads.',
    tags: ['New Products', 'New Features', 'Announcements'],
    animType: 'morph',
  },
  {
    id: 'social',
    badge: 'SOCIAL',
    title: 'Social Media Content',
    desc: 'Motion posts in your brand colours and fonts. The 30-second ad comes with 2 social cut-downs, so one video gives you more posts.',
    tags: ['Instagram', 'TikTok', 'LinkedIn'],
    animType: 'phone',
  },
  {
    id: 'presentations',
    badge: 'PRESENTATIONS',
    title: 'Presentations and Pitches',
    desc: 'Turn key numbers and ideas into a clear moving sequence for sales decks, investor pitches and webinars.',
    tags: ['Sales Decks', 'Pitches', 'Webinars'],
    animType: 'nodes',
  },
];

/* Process (what is included and the timelines from the price book 2.3) */
const steps = [
  {
    n: '01',
    icon: <FileText className="w-5 h-5" aria-hidden="true" />,
    title: 'Brief',
    desc: 'We agree what the video is for, who will watch it, where it will run and the one message it must land.',
  },
  {
    n: '02',
    icon: <LayoutPanelLeft className="w-5 h-5" aria-hidden="true" />,
    title: 'Storyboard',
    desc: 'We plan every scene: what moves, what the text says and how the video ends. You approve the storyboard before animation starts.',
  },
  {
    n: '03',
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    title: 'Motion Design',
    desc: 'We design and animate each scene in your brand colours and fonts, timed to licensed music.',
  },
  {
    n: '04',
    icon: <MessageSquare className="w-5 h-5" aria-hidden="true" />,
    title: 'Review and Revisions',
    desc: 'You watch the draft and send your notes. Every length includes 2 revision rounds.',
  },
  {
    n: '05',
    icon: <Download className="w-5 h-5" aria-hidden="true" />,
    title: 'Final Files',
    desc: 'You get the finished video, ready to publish. The 30-second ad adds 2 social cut-downs, and the 60-second video comes in 3 aspect ratios. The files are yours.',
  },
];

/* ─── bento cell animations (sized for an 80x80 container) ───── */

const MorphCell = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <div className="w-14 h-14 bg-[#1044ff]/15" style={{ animation: 'mg-morph 6s ease-in-out infinite' }} />
    <div className="absolute w-9 h-9 bg-[#1044ff]/20" style={{ animation: 'mg-morph2 4s ease-in-out infinite' }} />
    <div className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-[#1044ff]/20 border border-[#1044ff]/30">
      <Play className="w-2.5 h-2.5 text-[#1044ff] fill-[#1044ff] ml-px" />
    </div>
  </div>
);

const NodesCell = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <line x1="8" y1="40" x2="28" y2="18" stroke="#1044ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="28" strokeDashoffset="28" style={{ animation: 'mg-dash 2s linear infinite alternate' }} />
    <line x1="28" y1="18" x2="54" y2="40" stroke="#1044ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="30" strokeDashoffset="30" style={{ animation: 'mg-dash 2s 0.3s linear infinite alternate' }} />
    <line x1="54" y1="40" x2="70" y2="14" stroke="#1044ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="30" strokeDashoffset="30" style={{ animation: 'mg-dash 2s 0.6s linear infinite alternate' }} />
    <line x1="28" y1="18" x2="28" y2="58" stroke="#1044ff" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="40" strokeDashoffset="40" style={{ animation: 'mg-dash 1.5s 0.4s linear infinite alternate' }} />
    {[[8, 40], [28, 18], [28, 58], [54, 40], [70, 14]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 4 : 3} fill="#1044ff" fillOpacity="0.5" style={{ animation: `mg-node 2s ${i * 0.3}s ease-in-out infinite` }} />
    ))}
  </svg>
);

/* Gentle concentric rings (film reel). */
const FilmCell = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <circle cx="40" cy="40" r="32" fill="none" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.2" style={{ animation: 'mg-node 3s ease-in-out infinite' }} />
    <circle cx="40" cy="40" r="20" fill="none" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.25" style={{ animation: 'mg-node 3s 0.6s ease-in-out infinite' }} />
    <circle cx="40" cy="40" r="9" fill="#059669" fillOpacity="0.12" stroke="#059669" strokeWidth="1" strokeOpacity="0.35" />
    <line x1="40" y1="8" x2="40" y2="20" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="40" y1="60" x2="40" y2="72" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="8" y1="40" x2="20" y2="40" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <line x1="60" y1="40" x2="72" y2="40" stroke="#059669" strokeWidth="1" strokeOpacity="0.2" />
    <circle cx="72" cy="40" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'mg-node 2s ease-in-out infinite' }} />
    <circle cx="40" cy="72" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'mg-node 2s 0.3s ease-in-out infinite' }} />
    <circle cx="8" cy="40" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'mg-node 2s 0.6s ease-in-out infinite' }} />
    <circle cx="40" cy="8" r="3" fill="#059669" fillOpacity="0.3" style={{ animation: 'mg-node 2s 0.9s ease-in-out infinite' }} />
  </svg>
);

const PhoneCell = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div
      className="w-9 h-16 rounded-xl border-2 border-[#e7811e]/35 bg-orange-50 flex flex-col items-center justify-center gap-1 shadow-sm"
      style={{ animation: 'mg-float 3s ease-in-out infinite' }}
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
  film: <FilmCell />,
  phone: <PhoneCell />,
};

/* ─── helpers ─────────────────────────────────────────────────── */

/**
 * A use card in the category bento style (ServiceVideoAnimation ServiceCard), without a link:
 * it describes where motion graphics work and does not lead to another page.
 * @param {{ item: { badge: string, title: string, desc: string, tags: string[], animType: string } }} props
 */
const UseCard = ({ item }) => (
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
        <p className="text-sm text-gray-500 group-hover:text-white/75 leading-relaxed mb-4 flex-grow transition-colors duration-300">
          {item.desc}
        </p>

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
 * Motion graphics service page. All data is read on the server in page.jsx and passed in.
 *
 * @param {{
 *   h1: string, prices?: object[], fromPrice?: number | null, billing?: 'one-off' | 'monthly',
 *   slides?: object[], reviews?: object[], bookHref: string,
 *   caseStudy?: object | null, projects?: object[], related?: React.ReactNode,
 * }} props
 *   prices: price_items for this page (motion-15, motion-30, motion-60) with display parts,
 *   book_href and buy_url (getServicePageData).
 *   caseStudy and projects stay empty until Phase 5, so their sections render nothing.
 */
const MotionGraphics = ({
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
      <style>{MG_STYLES}</style>

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
                <span className="block">Your Message.</span>{' '}
                <span className="block">Told in</span>{' '}
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Short motion graphics ads and videos for product launches, social media and presentations. Each one is planned on a storyboard you approve and set to licensed music.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="Motion graphics ads" className="mb-12" />

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
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" aria-hidden="true" /> {SITE.proof.logoAnimationReviews} logo animation reviews on Fiverr</span>
                <span aria-hidden="true" className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" /> {SITE.proof.viralViews} views on our logo animation on Instagram</span>
              </div>
            </motion.div>
          </div>
        </div>

        <WorkImageStrip slides={slides} label="Recent Motion Graphics" fadeColor="#ffffff" />
      </section>

      {/* ── WHAT THIS SOLVES AND WHY US (band from the video category page) ── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        {/* Watermark */}
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">MOTION</span>
        </div>

        {/* Top marquee (decorative) */}
        <div aria-hidden="true" className="overflow-hidden border-b border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'mg-marquee 35s linear infinite' }}>
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
              WHY MOTION GRAPHICS
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
              Busy Feeds.<br />{' '}
              A Few Seconds.<br />{' '}
              <span className="text-[#fdba74]">One Clear Message.</span>
            </h2>
            <p className="text-white/75 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-16 md:mb-20">
              Feeds are full, and people decide fast. A still image is easy to pass by. A short motion graphics video shows your product, your offer and your next step before people scroll on.
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
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'mg-marquee 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e]/50 mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE IT WORKS (bento cards from the video category page) ── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">WHERE IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Built for Ads, Launches, Social Media and Presentations.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
              Tell us where the video will run. We plan the length, pace and format around it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uses.map((item) => (
              <UseCard key={item.id} item={item} />
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
              From Brief to Final File in Five Steps.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              You approve each step before the next one starts. A 15-second ad takes 5 working days, a 30-second ad takes 7 to 10 working days, and a 60-second video takes 2 to 3 weeks.
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
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Motion Graphics in Practice.</h2>
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
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Motion Graphics We Have Made.</h2>
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

      {/* ── PRICES (tiers from Supabase) ─────────────────────────── */}
      <section id="prices" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">PRICING</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Three Lengths. <span className="text-[#1044ff]">Fixed Prices.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">Pick the length that fits your message. Your price is fixed before work starts, with no hourly billing.</p>
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
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#c2410c] text-white">
                        Most popular
                      </span>
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>
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
                        <Button asChild variant="outline" size="lg" className={`rounded-full h-12 text-sm font-bold ${isFeatured ? 'border-white text-white bg-transparent' : ''}`}>
                          <a href={item.buy_url} target="_blank" rel="noopener noreferrer" data-cta="buy-now">Buy now</a>
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
              Want motion graphics every month? Our{' '}
              <Link href="/packages#monthly" className="text-[#1044ff] font-semibold hover:underline">
                Design + Video subscription
              </Link>{' '}
              includes motion graphics up to 30 seconds.
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
        headline="Ready to Put Your Message in Motion?"
        subtext="Book a free call. Tell us what the video is for and where it will run, and we will recommend the right length, with a fixed price before work starts."
        service="motion-graphics"
      />
    </>
  );
};

export default MotionGraphics;
