import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Loader2,
  Star,
  ShieldCheck,
  CheckCircle,
  Lightbulb,
  Pencil,
  Eye,
  Package,
  TrendingUp,
  BarChart2,
  Play,
  Monitor,
  Zap,
  BookOpen,
  Share2,
  ChevronLeft,
  ChevronRight,
  MousePointer,
} from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import WorkImageStrip from '@/components/WorkImageStrip';
import CTASection from '@/components/home/CTASection';

/* ─── static data ─────────────────────────────────────────────── */

const marqueeWords = [
  'CTR OPTIMISATION', 'YOUTUBE THUMBNAILS', 'A/B TESTING', 'VISUAL PSYCHOLOGY',
  'SCROLL PATTERNS', 'CLICK TRIGGERS', 'COLOUR CONTRAST', 'THUMBNAIL TESTING',
  'FACE EXPRESSIONS', 'BOLD TYPOGRAPHY',
];

const manifestoStats = [
  { value: '5.8×', label: 'average CTR improvement after a professional thumbnail redesign' },
  { value: '90%', label: 'of the click decision is made from the thumbnail alone, not the title' },
  { value: '1.3s', label: 'is the window you have before a viewer scrolls past your video forever' },
];

const beforeAfterData = [
  {
    id: 1,
    niche: 'Technology Review',
    ctr_before: '1.8%',
    ctr_after: '8.4%',
    views_increase: '+340%',
    result_note: 'Channel grew from 2K to 18K monthly views in 60 days post-redesign',
    afterGradient: 'from-[#1044ff] to-[#0020bf]',
    afterAccentHex: '#e7811e',
    afterTitle: 'THE TRUTH ABOUT',
    afterSubtitle: 'THIS PRODUCT',
  },
  {
    id: 2,
    niche: 'Fitness & Lifestyle',
    ctr_before: '2.1%',
    ctr_after: '9.3%',
    views_increase: '+280%',
    result_note: 'Subscriber growth rate tripled in the first 30 days after the rebrand',
    afterGradient: 'from-[#e7811e] to-[#e7581e]',
    afterAccentHex: '#ffffff',
    afterTitle: 'TRANSFORM IN',
    afterSubtitle: '30 DAYS FLAT',
  },
  {
    id: 3,
    niche: 'Finance & Investing',
    ctr_before: '1.4%',
    ctr_after: '7.2%',
    views_increase: '+220%',
    result_note: 'Video was surfaced to 3× more unique viewers by the algorithm in week one',
    afterGradient: 'from-gray-900 to-gray-700',
    afterAccentHex: '#e7811e',
    afterTitle: 'HOW TO MAKE',
    afterSubtitle: '£1,000/WEEK',
  },
];

const platforms = [
  {
    name: 'YouTube Thumbnails',
    desc: 'Standard 16:9 thumbnails engineered for the YouTube feed, sidebar, and recommended sections.',
    icon: <Play className="w-6 h-6" />,
    color: 'bg-red-50 text-red-500',
  },
  {
    name: 'YouTube Shorts',
    desc: 'Vertical 9:16 cover art that stops the scroll in the Shorts feed and drives taps.',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-red-50 text-red-400',
  },
  {
    name: 'Podcast Cover Art',
    desc: 'Square artwork for Spotify, Apple Podcasts, and every major audio platform.',
    icon: <Monitor className="w-6 h-6" />,
    color: 'bg-[#1044ff]/10 text-[#1044ff]',
  },
  {
    name: 'Online Course Covers',
    desc: 'Udemy, Skillshare, and Teachable thumbnails that turn browsers into paying students.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-50 text-green-600',
  },
  {
    name: 'Stream & Twitch Art',
    desc: 'Offline screens, panels, and scene thumbnails that build consistent channel identity.',
    icon: <BarChart2 className="w-6 h-6" />,
    color: 'bg-purple-50 text-purple-500',
  },
  {
    name: 'Social Video Covers',
    desc: 'Reel covers, Facebook video thumbnails, and LinkedIn headers done properly.',
    icon: <Share2 className="w-6 h-6" />,
    color: 'bg-orange-50 text-[#e7811e]',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Channel Audit',
    desc: 'We review your niche, top-performing competitor thumbnails, and your current CTR baseline.',
    icon: <Lightbulb className="w-6 h-6" />,
    tilt: -1.5,
  },
  {
    step: '02',
    title: 'Visual Strategy',
    desc: 'We establish the click triggers, colour psychology, and face/text balance for your channel.',
    icon: <Pencil className="w-6 h-6" />,
    tilt: 1.5,
  },
  {
    step: '03',
    title: 'Design and A/B',
    desc: 'Each thumbnail ships with an A/B variant so you can test and double down on what wins.',
    icon: <Eye className="w-6 h-6" />,
    tilt: -1,
  },
  {
    step: '04',
    title: 'Optimise and Scale',
    desc: 'We review CTR data and iterate the design system so results compound over time.',
    icon: <TrendingUp className="w-6 h-6" />,
    tilt: 1,
  },
];

const faqs = [
  {
    q: 'What information do you need before starting a thumbnail?',
    a: 'The video title, a brief description of the content, your channel name or niche, and any branding assets you have (logo, brand colours). If you have a specific image, face photo, or product shot you want featured, send that too. We handle the rest.',
  },
  {
    q: 'What is an A/B variant and why does it matter?',
    a: 'An A/B variant is a second version of the thumbnail with a different visual approach: different title placement, colour, or composition. YouTube lets you test both and see which drives higher CTR. Over time, this compounds into significantly better channel performance. All our Creator Bundle and Channel Partner packages include A/B variants.',
  },
  {
    q: 'What file format and size are the thumbnails delivered in?',
    a: 'All thumbnails are delivered in PNG at 1280×720 pixels (the maximum YouTube resolution), fully optimised for fast loading. We can also provide JPG if preferred. Source PSD or AI files are available on request.',
  },
  {
    q: 'How quickly can I expect a thumbnail to be ready?',
    a: 'Thumbnail Tester delivers in 48 hours. Creator Bundle batches run at 2-3 days per batch of 5. Channel Partner requests are prioritised and delivered within 24 hours.',
  },
  {
    q: 'Can I use these thumbnails on platforms other than YouTube?',
    a: 'Yes. The files work for any platform: Facebook Video, LinkedIn, Udemy, Teachable, and more. If you need a specific crop or aspect ratio for a different platform, mention it when briefing the design and we will include it.',
  },
  {
    q: 'What happens if I am not happy with the design?',
    a: 'All packages include revisions. We iterate until the thumbnail is right. In over five years of thumbnail work, we have never had a client walk away unhappy after the revision stage. If it is genuinely not working, we will tell you why and redesign from a new angle.',
  },
];

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Thumbnail and Graphic Design',
      description: 'Scroll-stopping YouTube thumbnail design and graphic design that increases CTR, drives views, and builds channel growth.',
      provider: { '@type': 'Organization', name: 'Maxterz', url: 'https://maxterz.com' },
      areaServed: 'Worldwide',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maxterz.com/' },
        { '@type': 'ListItem', position: 2, name: 'Branding and Design', item: 'https://maxterz.com/services/branding-design' },
        { '@type': 'ListItem', position: 3, name: 'Thumbnail Design', item: 'https://maxterz.com/services/branding-design/thumbnail-design' },
      ],
    },
  ],
};

/* ─── component ───────────────────────────────────────────────── */

const ThumbnailDesign = () => {
  const [currentBA, setCurrentBA]         = useState(0);
  const [direction, setDirection]         = useState(1);
  const [caseStudy, setCaseStudy]         = useState(null);
  const [loadingCaseStudy, setLoadingCS]  = useState(true);
  const [projects, setProjects]           = useState([]);
  const [loadingProjects, setLoadingPJ]   = useState(true);
  const [packages, setPackages]           = useState([]);
  const [loadingPackages, setLoadingPK]   = useState(true);

  const nextBA = () => {
    setDirection(1);
    setCurrentBA((c) => (c + 1) % beforeAfterData.length);
  };
  const prevBA = () => {
    setDirection(-1);
    setCurrentBA((c) => (c - 1 + beforeAfterData.length) % beforeAfterData.length);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', 'uk-distribution-company')
          .single();
        setCaseStudy(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCS(false);
      }

      try {
        const { data } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('category', 'Branding & Design')
          .order('created_at', { ascending: false })
          .limit(3);
        setProjects(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingPJ(false);
      }

      try {
        const { data } = await supabase
          .from('ThumbnailDesignPackages')
          .select('*')
          .order('display_order', { ascending: true });
        setPackages(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingPK(false);
      }
    };

    fetchAll();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const item = beforeAfterData[currentBA];

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      <Helmet>
        <title>Thumbnail Design and Graphic Design Services | Maxterz</title>
        <meta
          name="description"
          content="Professional YouTube thumbnail design that increases CTR and drives views. Scroll-stopping visuals for YouTube, podcasts, courses, and social platforms."
        />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

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
              <span className="badge-standard-light mb-8">THUMBNAIL AND GRAPHIC DESIGN</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] text-balance">
                Stop the Scroll.{' '}
                <span className="text-[#e7811e]">Win the Click.</span>{' '}
                <span className="text-[#1044ff]">Grow the Channel.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Your thumbnail decides whether a viewer watches your video or scrolls to the next one. We design thumbnails that win that decision, consistently.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg bg-[#e7811e] hover:bg-[#e7581e] shadow-xl shadow-orange-500/25 w-full sm:w-auto transition-transform hover:scale-105"
                >
                  <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                    Boost My CTR Now
                  </a>
                </Button>
                <Button
                  onClick={() => scrollTo('thumbnail-work')}
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm"
                >
                  See the Results <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider mb-8">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#eb7444] fill-current" /> 4.9 Stars
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#e7811e]" /> 5.8× Avg CTR Lift
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1044ff]" /> 2,000+ Thumbnails Delivered
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <WorkImageStrip table="ThumbnailSlideImages" label="Recent Thumbnail Work" fadeColor="#ffffff" />
      </section>

      {/* ─── 2. CTR MANIFESTO ─────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">CTR</span>
        </div>

        <div className="overflow-hidden border-b border-white/15 py-5">
          <style>{`@keyframes tdmq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'tdmq 30s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="text-[#e7811e] mx-2">·</span>
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
              1.3 Seconds.<br />
              <span className="text-[#e7811e]">Use Them Right.</span>
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

        <div className="overflow-hidden border-t border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'tdmq 22s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="text-[#e7811e]/50 mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. BEFORE / AFTER TRANSFORMATION ────────────────────── */}
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
              Real results from real channels. The numbers do not lie.
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
                      {/* Boring thumbnail mockup */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-3">
                        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-400 fill-gray-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-sm font-medium leading-snug">
                            My Video About Something<br />Important For You
                          </p>
                          <p className="text-gray-400 text-xs mt-2">Channel Name</p>
                        </div>
                      </div>
                      {/* CTR badge */}
                      <div className="absolute top-3 left-3 bg-gray-600/80 text-white text-xs font-bold font-mono px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        CTR: {item.ctr_before}
                      </div>
                    </div>
                  </div>

                  {/* AFTER panel */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#1044ff' }}>
                        After
                      </span>
                      <span className="text-xs text-gray-400 font-medium">Maxterz engineered for clicks</span>
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
                      {/* CTR badge */}
                      <div
                        className="absolute top-3 left-3 z-20 text-white text-xs font-bold font-mono px-2.5 py-1 rounded-lg"
                        style={{ backgroundColor: item.afterAccentHex }}
                      >
                        CTR: {item.ctr_after}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results bar */}
                <div className="bg-gray-50 rounded-[1.5rem] border border-gray-100 p-6">
                  <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-5">
                    {item.niche} · Real Results
                  </p>
                  <div className="flex flex-wrap items-center justify-around gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 justify-center mb-1">
                        <span className="text-xl font-black text-gray-400 line-through">{item.ctr_before}</span>
                        <ArrowRight className="w-4 h-4 text-[#1044ff] flex-shrink-0" />
                        <span className="text-xl font-black text-[#1044ff]">{item.ctr_after}</span>
                      </div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Click-Through Rate</p>
                    </div>
                    <div className="h-10 w-px bg-gray-200 hidden sm:block flex-shrink-0" />
                    <div className="text-center">
                      <p className="text-2xl font-black text-green-600 mb-1">{item.views_increase}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Views Increase</p>
                    </div>
                    <div className="h-10 w-px bg-gray-200 hidden sm:block flex-shrink-0" />
                    <div className="text-center max-w-[200px]">
                      <p className="text-sm text-gray-600 font-medium leading-snug">{item.result_note}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={prevBA}
              className="w-11 h-11 rounded-full border-2 border-gray-200 hover:border-[#1044ff] hover:text-[#1044ff] text-gray-400 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2 items-center">
              {beforeAfterData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentBA ? 1 : -1); setCurrentBA(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentBA ? 'bg-[#1044ff] w-6' : 'bg-gray-200 w-2 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextBA}
              className="w-11 h-11 rounded-full border-2 border-gray-200 hover:border-[#1044ff] hover:text-[#1044ff] text-gray-400 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            {currentBA + 1} of {beforeAfterData.length} transformations
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
              From YouTube feeds to podcast shelves. Wherever your audience sees you first, we make sure they click.
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
                <span className="absolute -bottom-4 -right-4 text-[90px] font-black text-gray-100/70 leading-none select-none pointer-events-none group-hover:text-blue-50 transition-colors duration-300">
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
              Good-looking thumbnails are not enough. Ours are engineered to convert.
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
                  <span className="absolute -bottom-4 -right-2 text-[100px] font-black text-gray-100 select-none leading-none pointer-events-none group-hover:text-orange-50 transition-colors duration-300">
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
                    <ArrowRight className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. CASE STUDY ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
            Visuals that drive growth beyond the feed.
          </h3>

          {loadingCaseStudy ? (
            <div className="flex justify-center items-center py-20 bg-white rounded-[2rem] border border-gray-100">
              <Loader2 className="animate-spin text-[#1044ff] w-10 h-10" />
            </div>
          ) : caseStudy ? (
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
                      <CheckCircle size={14} /> Key Result
                    </p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{caseStudy.key_result}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-10 text-gray-500 bg-white rounded-[2rem] border border-gray-100">
              Case study not available.
            </div>
          )}
        </div>
      </section>

      {/* ─── 7. RECENT WORK ───────────────────────────────────────── */}
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
              to="/our-work"
              className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors"
            >
              View all work <ArrowRight size={16} />
            </Link>
          </motion.div>

          {loadingProjects ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-white w-10 h-10" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-white/60 border border-white/20 rounded-[2rem]">
              <p className="mb-2 font-semibold">Thumbnail work coming soon.</p>
              <p className="text-sm">Check back shortly or view all our work.</p>
            </div>
          ) : (
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
                  <Link to={`/our-work/${project.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        alt={project.title}
                        src={project.main_image}
                      />
                      <div className="absolute inset-0 bg-[#e7811e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#e7811e]" />
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
          )}
        </div>
      </section>

      {/* ─── 8. PACKAGES ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">THUMBNAIL PACKAGES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Pick Your Plan. Grow Your Channel.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Try us on three videos, sprint through a content push, or get a dedicated designer on retainer.
            </p>
          </motion.div>

          {loadingPackages ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#1044ff] w-10 h-10" />
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-[2rem] border border-gray-100">
              Packages coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {packages.map((pkg, idx) => {
                const featured = pkg.is_featured;
                return (
                  <motion.div
                    key={pkg.id}
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
                    {pkg.badge_text && (
                      <span
                        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow ${
                          featured ? 'bg-[#1044ff] text-white' : 'bg-gray-900 text-white'
                        }`}
                      >
                        {pkg.badge_text}
                      </span>
                    )}

                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${featured ? 'text-white/60' : 'text-gray-400'}`}>
                      {pkg.type === 'monthly' ? 'Monthly Subscription' : pkg.type === 'bundle' ? 'Request Bundle' : 'One-Time Package'}
                    </span>

                    <h3 className={`text-2xl font-black tracking-tight leading-tight ${featured ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.name}
                    </h3>

                    <div className="flex items-end gap-1">
                      <span className={`text-5xl font-black tracking-tighter ${featured ? 'text-white' : 'text-gray-900'}`}>
                        {pkg.price}
                      </span>
                      {pkg.price_suffix && (
                        <span className={`text-lg font-semibold mb-1.5 ${featured ? 'text-white/60' : 'text-gray-500'}`}>
                          {pkg.price_suffix}
                        </span>
                      )}
                    </div>

                    {pkg.tagline && (
                      <p className={`text-sm italic leading-relaxed ${featured ? 'text-white/85' : 'text-gray-500'}`}>
                        "{pkg.tagline}"
                      </p>
                    )}

                    <div className={`h-px w-full ${featured ? 'bg-white/20' : 'bg-gray-100'}`} />

                    {pkg.ideal_for && (
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${featured ? 'text-white/50' : 'text-gray-400'}`}>
                          Ideal for
                        </p>
                        <p className={`text-sm leading-relaxed ${featured ? 'text-white/85' : 'text-gray-600'}`}>
                          {pkg.ideal_for}
                        </p>
                      </div>
                    )}

                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="flex flex-col gap-3 flex-grow">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle
                              size={16}
                              className={`flex-shrink-0 mt-0.5 ${featured ? 'text-white/70' : 'text-[#e7811e]'}`}
                            />
                            <span className={`text-sm leading-relaxed ${featured ? 'text-white/85' : 'text-gray-600'}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {pkg.addon_text && (
                      <div
                        className={`rounded-xl p-4 text-xs leading-relaxed font-medium ${
                          featured
                            ? 'bg-white/15 text-white/75 border border-white/20'
                            : 'bg-gray-50 text-gray-500 border border-gray-100'
                        }`}
                      >
                        {pkg.addon_text}
                      </div>
                    )}

                    <Button
                      asChild
                      size="lg"
                      className={`rounded-full h-12 text-sm font-bold mt-auto transition-transform hover:scale-105 ${
                        featured
                          ? 'bg-white text-[#e7581e] hover:bg-gray-50 shadow-lg'
                          : 'bg-[#e7811e] text-white hover:bg-[#e7581e]'
                      }`}
                    >
                      <a
                        href={pkg.cta_href || 'https://calendly.com/maxterz-info/30min'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pkg.cta_label || 'Get Started'} <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-400 text-sm mt-10"
          >
            Not sure where to start?{' '}
            <a
              href="https://calendly.com/maxterz-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e7811e] font-semibold hover:underline"
            >
              Book a free 15-minute chat
            </a>{' '}
            and we will look at your channel and tell you exactly what will move the needle.
          </motion.p>
        </div>
      </section>

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
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── 10. CTA ──────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Turn Your Thumbnails Into a Growth Engine?"
        subtext="Book a free channel audit. We look at your current CTR, your competitors, and tell you exactly what needs to change, before you spend a penny."
        primaryCTA="Boost My CTR Now"
        secondaryCTA="See Our Work"
        whatsapp="https://wa.me/447375874706"
        background="blue"
      />
    </div>
  );
};

export default ThumbnailDesign;
