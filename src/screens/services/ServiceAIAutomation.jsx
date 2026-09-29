'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Loader2, CheckCircle, Star, ShieldCheck,
  Calendar, Play, TrendingUp, Zap, Code2, MessageSquare, Lightbulb,
  Bot, GitBranch, Settings, BarChart2,
} from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CTASection from '@/components/home/CTASection';

/* ─── keyframes ───────────────────────────────────────────────── */
const AI_STYLES = `
  @keyframes ai-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes ai-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes ai-pulse   { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
  @keyframes ai-ping    { 0%{transform:scale(1);opacity:.7} 75%,100%{transform:scale(2.4);opacity:0} }
  @keyframes ai-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes ai-dot     { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes ai-node    { 0%,100%{opacity:.28} 50%{opacity:.9} }
  @keyframes ai-flow    { 0%{stroke-dashoffset:40} 100%{stroke-dashoffset:0} }
  @keyframes ai-line    { 0%,100%{opacity:.2} 50%{opacity:.7} }
`;

/* ─── typewriter ──────────────────────────────────────────────── */
const PHRASES = ['Smarter.', 'Faster.', 'Leaner.', 'Autonomously.'];

const TypeWriter = () => {
  const [displayed,  setDisplayed]  = useState('');
  const [phraseIdx,  setPhraseIdx]  = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let delay;
    if (!isDeleting && displayed === phrase)    delay = setTimeout(() => setIsDeleting(true), 2200);
    else if (isDeleting && displayed === '')    delay = setTimeout(() => { setIsDeleting(false); setPhraseIdx(i => (i + 1) % PHRASES.length); }, 400);
    else if (isDeleting)                        delay = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length - 1)), 42);
    else                                        delay = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 88);
    return () => clearTimeout(delay);
  }, [displayed, phraseIdx, isDeleting]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[3px] h-[0.82em] bg-[#1044ff] ml-[3px] align-middle" style={{ animation: 'ai-blink 1s ease-in-out infinite' }} />
    </span>
  );
};

/* ─── static data ─────────────────────────────────────────────── */
const marqueeWords = [
  'AI CHATBOTS', 'WORKFLOW AUTOMATION', 'CUSTOM SOFTWARE', 'AI CONSULTING',
  'GPT INTEGRATION', 'PROCESS AUTOMATION', 'N8N', 'MAKE.COM',
  'CRM AUTOMATION', 'API INTEGRATION', 'ZAPIER', 'CUSTOM AI TOOLS',
];

const statsData = [
  { value: '80%',  label: 'of repetitive business tasks can be fully automated with tools available today.' },
  { value: '14hrs', label: 'saved per employee per week on average after deploying AI workflow automation.' },
  { value: '3.5×', label: 'average ROI businesses report within 12 months of deploying AI across operations.' },
];

const tools = [
  { name: 'OpenAI',           initial: 'AI',  hex: '#10A37F' },
  { name: 'Claude',           initial: 'Cl',  hex: '#1044ff' },
  { name: 'Make.com',         initial: 'Mk',  hex: '#6D00CC' },
  { name: 'Zapier',           initial: 'Zp',  hex: '#FF4A00' },
  { name: 'n8n',              initial: 'n8',  hex: '#EA4B71' },
  { name: 'WhatsApp API',     initial: 'WA',  hex: '#25D366' },
  { name: 'Supabase',         initial: 'Sb',  hex: '#3ECF8E' },
  { name: 'HubSpot',          initial: 'HS',  hex: '#FF7A59' },
  { name: 'Slack',            initial: 'Sl',  hex: '#4A154B' },
];

const services = [
  {
    id: 'chatbot', badge: 'CHATBOTS', animType: 'chatbot',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    title: 'AI Chatbot Development',
    desc: 'Custom-built AI chatbots for your website, WhatsApp, or CRM. Trained on your business. Handles enquiries, qualifies leads, books appointments, and answers questions — 24 hours a day, 7 days a week, with no staff overhead.',
    tags: ['WhatsApp Bot', 'Website Chat', 'Lead Qualification', 'Appointment Booking'],
  },
  {
    id: 'workflow', badge: 'AUTOMATION', animType: 'workflow',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    title: 'Workflow Automation',
    desc: 'Map, automate, and optimise your most repetitive processes. From invoice generation to CRM updates to email sequences. We connect the tools you already use and remove every manual step in between.',
    tags: ['Make.com', 'Zapier', 'n8n', 'CRM Sync', 'Email Automation'],
  },
  {
    id: 'software', badge: 'CUSTOM BUILD', animType: 'software',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    title: 'Custom Software',
    desc: 'Off-the-shelf tools do not fit every business. We build bespoke internal tools, dashboards, and client portals that match your exact workflow — without the bloat, the unnecessary features, or the recurring licence fees.',
    tags: ['Internal Tools', 'Client Portals', 'Dashboards', 'API Builds'],
  },
  {
    id: 'consulting', badge: 'STRATEGY', animType: 'consulting',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    title: 'AI Consulting',
    desc: 'Not sure where AI fits in your business? We audit your operations, identify the highest-leverage automation opportunities, and give you a clear roadmap — so you invest in what will actually move the needle.',
    tags: ['AI Audit', 'Opportunity Mapping', 'Tool Selection', 'ROI Roadmap'],
  },
];

const processSteps = [
  { n: '01', icon: <BarChart2 className="w-5 h-5" />,  title: 'Discovery and Audit',     desc: 'We map your current processes, identify bottlenecks, and find every place where human time is being spent on work a machine can handle. No assumptions — we look at the actual workflow.' },
  { n: '02', icon: <Lightbulb className="w-5 h-5" />,  title: 'Solution Design',          desc: 'A custom architecture built for your specific problem. We recommend the right tools, the right integrations, and the right approach — not whatever is easiest to build.' },
  { n: '03', icon: <Code2 className="w-5 h-5" />,      title: 'Build and Integrate',      desc: 'Development, API connections, and integration with your existing stack. Built to work with the tools you already use, not to replace your entire setup.' },
  { n: '04', icon: <Settings className="w-5 h-5" />,   title: 'Test and Refine',          desc: 'Rigorous testing before anything touches your live operations. Edge cases covered. Fail-safes in place. You sign off before it goes live.' },
  { n: '05', icon: <TrendingUp className="w-5 h-5" />, title: 'Deploy and Support',        desc: 'Go live with confidence. Ongoing monitoring, updates, and support are included in every engagement. The system improves over time as we learn more about how you use it.' },
];

const faqData = [
  { q: 'What kinds of businesses do you work with?',
    a: 'Any business with repetitive processes. We have built for cleaning companies, restaurants, distribution businesses, SaaS startups, and professional services firms. If you have tasks that happen more than once a week, there is almost certainly an automation opportunity.' },
  { q: 'Do I need technical knowledge to use what you build?',
    a: 'No. Everything we build is designed to be operated by non-technical staff. We document everything, train your team, and ensure the system is simple to use before handover. You do not need to understand how it works — just that it works.' },
  { q: 'How long does a typical project take?',
    a: 'A chatbot or simple automation can be live in two to three weeks. Complex custom software or multi-system workflow integrations typically take four to eight weeks. We give you a realistic timeline in the discovery phase — we do not overpromise and underdeliver.' },
  { q: 'Can you integrate with our existing tools?',
    a: 'Yes. We integrate with CRMs, email platforms, WhatsApp Business API, accounting tools, booking systems, and more. If it has an API, we can connect to it. If it does not, we can often find a workaround.' },
  { q: 'What happens after the project goes live?',
    a: 'Every project includes a support period for monitoring, bug fixes, and adjustments. For ongoing automation management or chatbot maintenance, we offer retainer arrangements. You will never be left with a system that breaks and no one to call.' },
];

/* ─── animated icons ──────────────────────────────────────────── */
const cellAnimMap = {
  chatbot: (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="6"  y="8"  width="52" height="36" rx="12" fill="#1044ff" opacity="0.16" />
      <path d="M14 44 L8 56 L24 44" fill="#1044ff" opacity="0.16" />
      <circle cx="20" cy="26" r="4" fill="#1044ff" opacity="0.50" style={{ animation: 'ai-dot 1.2s ease-in-out infinite 0s' }} />
      <circle cx="32" cy="26" r="4" fill="#1044ff" opacity="0.50" style={{ animation: 'ai-dot 1.2s ease-in-out infinite .3s' }} />
      <circle cx="44" cy="26" r="4" fill="#1044ff" opacity="0.50" style={{ animation: 'ai-dot 1.2s ease-in-out infinite .6s' }} />
      <rect x="22" y="54" width="52" height="22" rx="10" fill="#1044ff" opacity="0.28" style={{ animation: 'ai-pulse 2.5s ease-in-out infinite .8s' }} />
      <rect x="28" y="61" width="36" height="3.5" rx="1.75" fill="#1044ff" opacity="0.40" />
      <rect x="28" y="68" width="24" height="3.5" rx="1.75" fill="#1044ff" opacity="0.30" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="12" cy="40" r="8" fill="#1044ff" opacity="0.60" style={{ animation: 'ai-node 2s ease-in-out infinite 0s' }} />
      <circle cx="40" cy="40" r="8" fill="#1044ff" opacity="0.80" />
      <circle cx="68" cy="40" r="8" fill="#1044ff" opacity="0.60" style={{ animation: 'ai-node 2s ease-in-out infinite .6s' }} />
      <line x1="20" y1="40" x2="32" y2="40" stroke="#1044ff" strokeWidth="2" opacity="0.30" />
      <line x1="48" y1="40" x2="60" y2="40" stroke="#1044ff" strokeWidth="2" opacity="0.30" />
      <circle cx="40" cy="14" r="6" fill="#1044ff" opacity="0.35" style={{ animation: 'ai-pulse 2s ease-in-out infinite .3s' }} />
      <line x1="40" y1="20" x2="40" y2="32" stroke="#1044ff" strokeWidth="1.5" opacity="0.20" />
      <circle cx="40" cy="66" r="6" fill="#1044ff" opacity="0.35" style={{ animation: 'ai-pulse 2s ease-in-out infinite .9s' }} />
      <line x1="40" y1="48" x2="40" y2="60" stroke="#1044ff" strokeWidth="1.5" opacity="0.20" />
    </svg>
  ),
  software: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M22 18 L8 40 L22 62" stroke="#1044ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.50" />
      <path d="M58 18 L72 40 L58 62" stroke="#1044ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.50" />
      <rect x="28" y="30" width="20" height="4"   rx="2" fill="#1044ff" opacity="0.45" style={{ animation: 'ai-line 2s ease-in-out infinite 0s' }} />
      <rect x="28" y="38" width="28" height="4"   rx="2" fill="#1044ff" opacity="0.35" style={{ animation: 'ai-line 2s ease-in-out infinite .3s' }} />
      <rect x="28" y="46" width="16" height="4"   rx="2" fill="#1044ff" opacity="0.45" style={{ animation: 'ai-line 2s ease-in-out infinite .6s' }} />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="32" r="20" stroke="#1044ff" strokeWidth="1.5" opacity="0.12" />
      <circle cx="40" cy="32" r="13" fill="#1044ff" opacity="0.14" style={{ animation: 'ai-pulse 2.2s ease-in-out infinite' }} />
      <circle cx="40" cy="32" r="7"  fill="#1044ff" opacity="0.65" style={{ animation: 'ai-pulse 1.6s ease-in-out infinite .3s' }} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const r = deg * Math.PI / 180;
        const x1 = 40 + Math.cos(r) * 16; const y1 = 32 + Math.sin(r) * 16;
        const x2 = 40 + Math.cos(r) * 22; const y2 = 32 + Math.sin(r) * 22;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1044ff" strokeWidth="1.5" opacity="0.22" strokeLinecap="round" style={{ animation: `ai-node 2.4s ease-in-out infinite ${i * .15}s` }} />;
      })}
      <rect x="33" y="52" width="14" height="5"  rx="2.5" fill="#1044ff" opacity="0.30" />
      <rect x="35" y="59" width="10" height="5"  rx="2.5" fill="#1044ff" opacity="0.22" />
    </svg>
  ),
};

/* ─── service card ────────────────────────────────────────────── */
const ServiceCard = ({ svc }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group h-full">
    <div className="relative overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 h-full p-8 md:p-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1044ff] to-[#0020bf] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" />
      <div className="absolute bottom-4 right-4 w-20 h-20 opacity-60 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none text-[#1044ff]">
        {cellAnimMap[svc.animType]}
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${svc.badgeClass} group-hover:bg-white/15 group-hover:border-white/25 group-hover:text-white`}>
            {svc.badge}
          </span>
          <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-white/70 transition-colors duration-300" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-white mb-3 tracking-tight leading-tight transition-colors duration-300">{svc.title}</h3>
        <p  className="text-gray-500 group-hover:text-white/75 leading-relaxed mb-5 flex-grow text-sm transition-colors duration-300">{svc.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {svc.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 group-hover:bg-white/15 group-hover:text-white/70 group-hover:border-white/20 px-2.5 py-1 rounded-lg transition-all duration-300">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── main component ──────────────────────────────────────────── */
const ServiceAIAutomation = () => {
  const [caseStudy,        setCaseStudy]        = useState(null);
  const [loadingCS,        setLoadingCS]        = useState(true);
  const [portfolio,        setPortfolio]        = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);

  useEffect(() => {
    (async () => {
      try { const { data } = await supabase.from('case_studies').select('*').eq('slug', 'uk-distribution-business').single(); setCaseStudy(data); }
      catch (e) { console.error(e); } finally { setLoadingCS(false); }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try { const { data } = await supabase.from('portfolio_projects').select('*').eq('category', 'AI & Automation').order('created_at', { ascending: false }).limit(3); setPortfolio(data || []); }
      catch (e) { console.error(e); } finally { setLoadingPortfolio(false); }
    })();
  }, []);

  return (
    <>
      <style>{AI_STYLES}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[82vh] flex flex-col pt-[67px] pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        {/* Floating badges */}
        <div className="hidden xl:flex absolute right-20 top-[30%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'ai-float 3.5s ease-in-out infinite' }}>
          <Zap className="w-4 h-4 text-[#1044ff] fill-[#1044ff]" /> 94% tasks automated
        </div>
        <div className="hidden xl:flex absolute right-8 top-[48%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'ai-float 3.5s ease-in-out infinite 1.2s' }}>
          <Bot className="w-4 h-4 text-green-500" /> AI chatbot live in 2 weeks
        </div>
        <div className="hidden xl:flex absolute right-24 top-[63%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'ai-float 3.5s ease-in-out infinite 2.4s' }}>
          <TrendingUp className="w-4 h-4 text-[#eb7444]" /> 3.5× average ROI
        </div>

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <span className="badge-standard-light mb-8">AI AND AUTOMATION</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Your Business.</span>
                <span className="block">Running</span>
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                AI chatbots, workflow automation, and custom software that remove the manual grind and give your team back hours every single week.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80">
                  <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 w-5 h-5" /> Book a Meeting
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider">
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#eb7444] fill-current" /> 4.9 Stars</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" /> 7,100 Reviews</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 11,600 Projects</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE OPPORTUNITY ───────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20vw] font-black text-white/[0.04] leading-none tracking-tighter">AI</span>
        </div>
        <div className="overflow-hidden border-b border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ai-marquee 28s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {w} <span className="text-[#e7811e] mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 mb-8">THE OPPORTUNITY</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
            Your Team Is Doing<br />Work a Machine<br /><span className="text-[#e7811e]">Can Do for Free.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 rounded-2xl overflow-hidden">
            {statsData.map((stat, i) => (
              <div key={i} className="bg-[#0020bf] p-8 md:p-10 hover:bg-white/10 transition-colors duration-300">
                <p className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter">{stat.value}</p>
                <p className="text-white/60 text-sm leading-relaxed uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden border-t border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ai-marquee 20s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {w} <span className="text-[#e7811e] mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <span className="badge-standard-light">WHAT WE BUILD</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
              Four Ways AI Transforms How You Operate.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              From conversational chatbots to complex automation pipelines, we build what fits your business — not a generic template dropped into your operations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(svc => <ServiceCard key={svc.id} svc={svc} />)}
          </div>
        </div>
      </section>

      {/* ── TOOLS WE USE ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="badge-standard-light">TECH STACK</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-4 mb-3">
              Best-in-Class Tools. Integrated Seamlessly.
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto font-light">
              We use the tools that are actually proven in production — not whatever is trending on Twitter.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-full px-4 py-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                  style={{ backgroundColor: tool.hex }}>
                  {tool.initial}
                </div>
                <span className="text-sm font-semibold text-gray-800">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="badge-standard-light">HOW WE WORK</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
              From Discovery to Deployed. Fast.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              A clear five-step process that keeps every project on track and ensures you always know what is happening and why.
            </p>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute left-[1.35rem] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#1044ff]/30 via-[#1044ff]/20 to-transparent" />
            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 md:gap-8 items-start group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border-2 border-[#1044ff]/25 group-hover:border-[#1044ff] group-hover:bg-[#1044ff] flex items-center justify-center text-[#1044ff] group-hover:text-white font-black text-sm transition-all duration-300 shadow-sm z-10">
                    {step.n}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-[1.5rem] border border-gray-100 p-6 md:p-7 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300 mb-1">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-[#1044ff]/10 border border-[#1044ff]/15 flex items-center justify-center text-[#1044ff] flex-shrink-0 group-hover:bg-[#1044ff]/15 transition-colors duration-300">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-gray-900 mb-1.5 tracking-tight">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="badge-standard-light">CASE STUDY</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Real Automation. Real Results.</h2>
          </motion.div>

          {loadingCS ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#1044ff]" /></div>
          ) : !caseStudy ? (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-white p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all duration-500"
            >
              <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden aspect-[4/3] md:h-[360px] flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-100">
                <Bot className="w-16 h-16 text-[#1044ff]/30" />
              </div>
              <div className="w-full md:w-1/2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">UK Distribution Business</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                  AI Chatbot Now Handles Initial Enquiries and Quotes Automatically — 24/7
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-light">
                  A 20-year-old UK distribution company was spending hours each day answering the same questions and manually generating quotes. We built a custom AI chatbot integrated with their systems. It now handles all initial contact, qualifies enquiries, and delivers quotes without a single staff member involved.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[{ v: '100%', l: 'Enquiries handled' }, { v: '6hrs', l: 'Saved per day' }, { v: '24/7', l: 'Always available' }].map(s => (
                    <div key={s.l} className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                      <p className="text-2xl font-black text-[#1044ff]">{s.v}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
                <Button asChild className="rounded-full bg-[#1044ff] hover:bg-[#0020bf] text-white px-8 h-12 shadow-lg shadow-blue-500/20">
                  <Link href="/our-work">See Our Work <ArrowUpRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-white p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all duration-500 group"
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
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#1044ff] p-5 rounded-r-xl mb-6 w-full">
                    <p className="text-[#1044ff] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><CheckCircle size={14} /> Key Result</p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{caseStudy.key_result}</p>
                  </div>
                )}
                <Button asChild className="rounded-full bg-[#1044ff] hover:bg-[#0020bf] text-white px-8 h-12 shadow-lg shadow-blue-500/20">
                  <Link href="/our-work">View Case Study <ArrowUpRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── RECENT WORK ───────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">RECENT WORK</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Automation That Ships.</h2>
            </div>
            <Link href="/our-work" className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors">
              View all work <ArrowRight size={16} />
            </Link>
          </motion.div>

          {loadingPortfolio ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-white" /></div>
          ) : portfolio.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'AI Lead Qualification Bot',    tag: 'AI Chatbot',          desc: 'Handles 200+ enquiries per week without a single staff member involved.' },
                { title: 'Multi-Step CRM Automation',   tag: 'Workflow Automation',  desc: 'Connects 6 tools into one seamless pipeline — zero manual data entry.' },
                { title: 'Custom Ops Dashboard',         tag: 'Custom Software',      desc: 'Real-time view of every order, job, and team member — built from scratch.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1044ff]/10 border border-[#1044ff]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <GitBranch className="w-7 h-7 text-[#1044ff]" />
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1044ff] mb-1">{item.tag}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#1044ff] transition-colors leading-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolio.map((proj, i) => (
                <motion.div key={proj.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <Link href={`/our-work/${proj.id}`} className="block">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={proj.title} src={proj.main_image} />
                      <div className="absolute inset-0 bg-[#1044ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#1044ff]" />
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pb-3">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1044ff] transition-colors leading-tight">{proj.title}</h3>
                      <p className="text-gray-500 font-medium text-sm line-clamp-2">{proj.short_description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">QUESTIONS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Common Questions</h2>
          </motion.div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white px-6 rounded-2xl border border-gray-100">
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-[#1044ff] text-left py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-standard-light mb-6">GET STARTED</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              Ready to Stop Doing What a Machine Can Do?
            </h2>
            <p className="text-gray-500 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us about your business and what is eating your team's time. We will come back with a clear plan for what automation can achieve for you — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 transition-transform hover:scale-105">
                <Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg border-2">
                <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 w-5 h-5" /> Book a Meeting
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ServiceAIAutomation;
