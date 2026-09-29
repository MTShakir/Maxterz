'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Type,
  Layers,
  Hexagon,
  Award,
  Sparkles,
  Hash,
  BookOpen,
  Folder,
  Palette,
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
  'WORDMARK', 'LETTERMARK', 'TYPOGRAPHY', 'COLOUR THEORY',
  'VISUAL IDENTITY', 'BRAND GUIDELINES', 'ICON DESIGN', 'SPACING RULES',
  'COLOUR PALETTE', 'TYPE HIERARCHY', 'LOGO SYSTEM', 'BRAND VOICE',
];

const manifestoStats = [
  { value: '89%', label: 'of consumers stay loyal to brands they visually recognise' },
  { value: '7 sec', label: 'is all you have to communicate your brand character' },
  { value: '3×', label: 'more likely to be remembered with a consistent visual identity' },
];

const logoTypes = [
  {
    type: 'Wordmark',
    icon: <Type className="w-5 h-5" />,
    specimenBg: 'bg-gray-900',
    specimenContent: 'text',
    specimenText: 'LOGOTYPE',
    specimenStyle: 'text-white text-3xl font-black tracking-[-0.04em]',
    desc: 'Your name, refined into a typographic mark. Clean, direct, and endlessly scalable from business card to billboard.',
    examples: 'Google · FedEx · Coca-Cola',
  },
  {
    type: 'Lettermark',
    icon: <Hash className="w-5 h-5" />,
    specimenBg: 'bg-gradient-to-br from-[#1044ff] to-[#0020bf]',
    specimenContent: 'text',
    specimenText: 'MX',
    specimenStyle: 'text-white text-6xl font-black tracking-tight',
    desc: 'Initials refined into a bold, compact mark. Works perfectly as a favicon, app icon, or stamp.',
    examples: 'IBM · CNN · HBO',
  },
  {
    type: 'Icon Mark',
    icon: <Hexagon className="w-5 h-5" />,
    specimenBg: 'bg-gradient-to-br from-[#e7811e] to-[#e7581e]',
    specimenContent: 'icon',
    desc: 'A standalone symbol that transcends language. Pure recognition without a single letter.',
    examples: 'Apple · Nike · Twitter',
  },
  {
    type: 'Combination Mark',
    icon: <Layers className="w-5 h-5" />,
    specimenBg: 'bg-white border border-gray-200',
    specimenContent: 'text',
    specimenText: '◆ COMPANY',
    specimenStyle: 'text-gray-900 text-2xl font-black tracking-wide',
    desc: 'Symbol and name working in harmony. Split them apart and both still stand alone.',
    examples: 'Adidas · Amazon · Burger King',
  },
  {
    type: 'Emblem',
    icon: <Award className="w-5 h-5" />,
    specimenBg: 'bg-gray-100',
    specimenContent: 'emblem',
    desc: 'Badge and seal designs that signal heritage, authority, and premium market positioning.',
    examples: 'Starbucks · Harley-Davidson · BMW',
  },
  {
    type: 'Abstract Mark',
    icon: <Sparkles className="w-5 h-5" />,
    specimenBg: 'bg-gradient-to-br from-gray-900 to-gray-700',
    specimenContent: 'abstract',
    desc: 'Non-literal symbols that carry pure brand meaning. Distinctive, ownable, and impossible to copy.',
    examples: 'Pepsi · Chase · Mercedes',
  },
];

const deliverables = [
  {
    number: '01',
    icon: <Star className="w-6 h-6" />,
    title: 'Primary Logo',
    desc: 'Your master logo. The definitive version used across every major touchpoint.',
    iconClass: 'bg-[#1044ff] text-white',
    titleClass: 'text-[#1044ff]',
  },
  {
    number: '02',
    icon: <Layers className="w-6 h-6" />,
    title: 'Logo Variants',
    desc: 'Horizontal, stacked, icon-only, reversed. Every version your brand needs to stay consistent.',
    iconClass: 'bg-gray-900 text-white',
    titleClass: 'text-gray-900',
  },
  {
    number: '03',
    icon: <Palette className="w-6 h-6" />,
    title: 'Brand Colour Palette',
    desc: 'Primary, secondary, and neutral colours with hex, RGB, and CMYK values for every use case.',
    iconClass: 'bg-[#e7811e] text-white',
    titleClass: 'text-[#e7811e]',
  },
  {
    number: '04',
    icon: <Type className="w-6 h-6" />,
    title: 'Typography System',
    desc: 'Heading and body font pairings with size hierarchy, weight rules, and real usage examples.',
    iconClass: 'bg-blue-50 text-[#1044ff]',
    titleClass: 'text-[#1044ff]',
  },
  {
    number: '05',
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Brand Guidelines PDF',
    desc: 'A clear, professional rulebook covering logo usage, spacing, dos and don\'ts, and more.',
    iconClass: 'bg-orange-50 text-[#e7811e]',
    titleClass: 'text-[#e7811e]',
  },
  {
    number: '06',
    icon: <Folder className="w-6 h-6" />,
    title: 'All Source Files',
    desc: 'SVG, AI, EPS, PNG, and PDF. Print-ready and screen-ready, fully organised for immediate use.',
    iconClass: 'bg-gray-100 text-gray-700',
    titleClass: 'text-gray-700',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Brand Discovery',
    desc: 'We learn your audience, competitors, and vision before a single stroke is drawn.',
    icon: <Lightbulb className="w-6 h-6" />,
    tilt: -1.5,
  },
  {
    step: '02',
    title: 'Concept Development',
    desc: 'Multiple distinct visual directions explored before any one path is committed to.',
    icon: <Pencil className="w-6 h-6" />,
    tilt: 1.5,
  },
  {
    step: '03',
    title: 'Identity Refinement',
    desc: 'Colours, typography, and spacing dialled until every element is deliberate.',
    icon: <Eye className="w-6 h-6" />,
    tilt: -1,
  },
  {
    step: '04',
    title: 'Asset Delivery',
    desc: 'Every file format, neatly organised and ready to use across print and digital.',
    icon: <Package className="w-6 h-6" />,
    tilt: 1,
  },
];

const faqs = [
  {
    q: 'What is the difference between a logo and a brand identity?',
    a: 'A logo is a single mark: a symbol or wordmark. A brand identity is the full system built around it: colour palette, typography, logo variants, spacing rules, and usage guidelines. A logo without a system creates inconsistency. A system built around a great logo creates recognition.',
  },
  {
    q: 'How many concepts will I see before committing to a direction?',
    a: 'That depends on the package. Brand Mark includes one fully developed concept. Brand Identity includes three distinct directions, not token options, but genuinely different visual approaches worth choosing between. Brand Authority includes five.',
  },
  {
    q: 'Can I request a specific style or reference brands I admire?',
    a: 'Yes, that happens during the discovery brief. You share what you love, what you want to move away from, and any competitors you want to stand clearly apart from. That brief directly shapes the visual direction we explore.',
  },
  {
    q: 'What file formats are included, and can I edit them?',
    a: 'You receive SVG, AI, EPS, PNG, and PDF. AI and SVG are fully editable vectors. PNG and PDF are ready to use without design software. Everything is organised by use case: print, digital, and web. Nothing needs hunting for.',
  },
  {
    q: 'How long does a full brand identity take to complete?',
    a: 'Brand Mark delivers in 5 days. Brand Identity takes 10 business days. Brand Authority is a 21-day process. These timelines include discovery, concept rounds, refinement, and full delivery, not just the final export.',
  },
  {
    q: 'Do you offer logo animation as an add-on?',
    a: 'Yes. Animated logos for intros, outros, and social media content are available as a standalone service. Let us know when you book and we will factor it into the scope.',
  },
];

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Logo Design and Brand Identity',
      description: 'Professional logo design and brand identity systems including typography, colour palettes, brand guidelines, and all source files for businesses worldwide.',
      provider: { '@type': 'Organization', name: 'Maxterz', url: 'https://maxterz.com' },
      areaServed: 'Worldwide',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maxterz.com/' },
        { '@type': 'ListItem', position: 2, name: 'Branding and Design', item: 'https://maxterz.com/services/branding-design' },
        { '@type': 'ListItem', position: 3, name: 'Logo Design', item: 'https://maxterz.com/services/branding-design/logo-design' },
      ],
    },
  ],
};

/* ─── component ───────────────────────────────────────────────── */

const LogoDesign = () => {
  const [caseStudy, setCaseStudy]         = useState(null);
  const [loadingCaseStudy, setLoadingCS]  = useState(true);
  const [projects, setProjects]           = useState([]);
  const [loadingProjects, setLoadingPJ]   = useState(true);
  const [packages, setPackages]           = useState([]);
  const [loadingPackages, setLoadingPK]   = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', 'uk-cleaning-company')
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
          .from('LogoDesignPackages')
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

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>

      {/* ─── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="badge-standard-light mb-8">LOGO DESIGN AND BRAND IDENTITY</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] text-balance">
                A Logo Is the First Impression{' '}
                <span className="text-[#1044ff]">Your Brand Will Never Stop Making.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                We craft logo systems and brand identities that communicate who you are before you say a word, built for longevity, recognition, and competitive advantage.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105"
                >
                  <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                    Start Your Brand Identity
                  </a>
                </Button>
                <Button
                  onClick={() => scrollTo('logo-work')}
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm"
                >
                  See Logo Work <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider mb-8">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#eb7444] fill-current" /> 4.9 Stars
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1044ff]" /> 500+ Logos Delivered
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> 98% Satisfaction Rate
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <WorkImageStrip table="LogoDesignSlideImages" label="Recent Logo Work" />
      </section>

      {/* ─── 2. IDENTITY PHILOSOPHY ───────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">MARK</span>
        </div>

        <div className="overflow-hidden border-b border-white/15 py-5">
          <style>{`@keyframes ldmq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ldmq 35s linear infinite' }}>
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
              THE IDENTITY PHILOSOPHY
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
              Your Logo Is Not<br />
              a Picture.<br />
              <span className="text-[#e7811e]">It Is a Promise.</span>
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
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ldmq 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="text-[#e7811e]/50 mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. LOGO TYPES ────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">LOGO STYLES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Every Mark Tells a Different Story.
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We work across every logo category, and we help you choose the right one for your brand before we pick up a pen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {logoTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group rounded-[2rem] border border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* specimen area */}
                <div className={`h-32 flex items-center justify-center ${type.specimenBg} relative overflow-hidden`}>
                  {type.specimenContent === 'text' && (
                    <span className={`${type.specimenStyle} relative z-10 select-none`}>
                      {type.specimenText}
                    </span>
                  )}
                  {type.specimenContent === 'icon' && (
                    <Hexagon className="w-16 h-16 text-white/90 drop-shadow-lg relative z-10" />
                  )}
                  {type.specimenContent === 'emblem' && (
                    <div className="relative z-10 w-20 h-20 rounded-full border-4 border-gray-400 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 text-[9px] font-black uppercase tracking-widest text-center leading-tight">
                          EST<br />MMXXIV
                        </span>
                      </div>
                    </div>
                  )}
                  {type.specimenContent === 'abstract' && (
                    <div className="relative z-10 w-16 h-16">
                      <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-white/25" />
                      <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white/45" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70" />
                    </div>
                  )}
                </div>

                {/* info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-50 text-[#1044ff] rounded-lg flex items-center justify-center group-hover:bg-[#1044ff] group-hover:text-white transition-all duration-300">
                      {type.icon}
                    </div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{type.type}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{type.desc}</p>
                  <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{type.examples}</p>
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
              Everything Your Brand Identity Needs.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Not just a logo file. A complete identity system built to work across every medium, surface, and scale.
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
                <span className="absolute -top-3 -right-2 text-[80px] font-black text-gray-100/80 leading-none pointer-events-none select-none group-hover:text-blue-50 transition-colors duration-300">
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
            <span className="badge-standard-light">THE CREATIVE PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              From Discovery to Delivery.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Every great brand identity starts with the right questions asked in the right order.
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
                  <span className="absolute -bottom-4 -right-2 text-[100px] font-black text-gray-100 select-none leading-none pointer-events-none group-hover:text-blue-50 transition-colors duration-300">
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
            A brand identity built to grow with a business.
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
      <section id="logo-work" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">
                RECENT LOGO WORK
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Identities That Last.
              </h2>
            </div>
            <Link
              href="/our-work"
              className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors"
            >
              View all brand work <ArrowRight size={16} />
            </Link>
          </motion.div>

          {loadingProjects ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-white w-10 h-10" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-white/60 border border-white/20 rounded-[2rem]">
              <p className="mb-2 font-semibold">Logo work coming soon.</p>
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
                  <Link href={`/our-work/${project.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        alt={project.title}
                        src={project.main_image}
                      />
                      <div className="absolute inset-0 bg-[#1044ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#1044ff]" />
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
            <span className="badge-standard-light">LOGO DESIGN PACKAGES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Choose Your Identity Level.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              From a single clean mark to a full brand authority system, matched to where you are and where you are going.
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
                        ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent shadow-2xl shadow-blue-500/25 scale-[1.02]'
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {pkg.badge_text && (
                      <span
                        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow ${
                          featured ? 'bg-[#e7811e] text-white' : 'bg-gray-900 text-white'
                        }`}
                      >
                        {pkg.badge_text}
                      </span>
                    )}

                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${featured ? 'text-white/50' : 'text-gray-400'}`}>
                      {pkg.type === 'monthly' ? 'Monthly Subscription' : pkg.type === 'bundle' ? 'Request Bundle' : 'One-Time Project'}
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
                      <p className={`text-sm italic leading-relaxed ${featured ? 'text-white/75' : 'text-gray-500'}`}>
                        "{pkg.tagline}"
                      </p>
                    )}

                    <div className={`h-px w-full ${featured ? 'bg-white/15' : 'bg-gray-100'}`} />

                    {pkg.ideal_for && (
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${featured ? 'text-white/40' : 'text-gray-400'}`}>
                          Ideal for
                        </p>
                        <p className={`text-sm leading-relaxed ${featured ? 'text-white/80' : 'text-gray-600'}`}>
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
                              className={`flex-shrink-0 mt-0.5 ${featured ? 'text-white/60' : 'text-[#1044ff]'}`}
                            />
                            <span className={`text-sm leading-relaxed ${featured ? 'text-white/80' : 'text-gray-600'}`}>
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
                            ? 'bg-white/10 text-white/70 border border-white/15'
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
                          ? 'bg-white text-[#1044ff] hover:bg-gray-100 shadow-lg'
                          : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'
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
            Not sure which package fits?{' '}
            <a
              href="https://calendly.com/maxterz-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1044ff] font-semibold hover:underline"
            >
              Book a free 15-minute discovery call
            </a>{' '}
            and we will find the right starting point together.
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

      {/* ─── 10. CTA ──────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Build a Brand Identity That Lasts?"
        subtext="Book a free discovery call. We look at your brand, your market, and your goals, and design an identity that makes you the obvious choice."
        primaryCTA="Start Your Brand Identity"
        secondaryCTA="See Our Logo Work"
        whatsapp="https://wa.me/447375874706"
        background="orange"
      />
    </div>
  );
};

export default LogoDesign;
