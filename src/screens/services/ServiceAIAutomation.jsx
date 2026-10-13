'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, CheckCircle, Star, ShieldCheck,
  TrendingUp, Zap, Code2, Lightbulb, Bot, Settings, BarChart2, Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CTASection from '@/components/home/CTASection';
import FromPriceLine from '@/components/service/FromPriceLine';
import ServiceReviews from '@/components/service/ServiceReviews';
import { BOOK_LABEL } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/ai-automation';
import SharedTypeWriter from '@/components/TypeWriter';

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

const TypeWriter = () => <SharedTypeWriter phrases={PHRASES} blink="ai-blink" />;

/* ─── static data ─────────────────────────────────────────────── */
const marqueeWords = [
  'AI CHATBOTS', 'WORKFLOW AUTOMATION', 'AI RECEPTIONIST', 'AI CONSULTING',
  'GPT INTEGRATION', 'PROCESS AUTOMATION', 'N8N', 'MAKE.COM',
  'CRM AUTOMATION', 'API INTEGRATION', 'ZAPIER', 'CUSTOM AI TOOLS',
];

/* Offer facts (price book 2.6) and SITE.proof. No invented statistics. */
const statsData = [
  { value: '24/7', label: 'replies on your website or WhatsApp from an AI chat agent trained on your services and FAQs.' },
  { value: '1 team', label: 'builds your chat agent, your automations and the website they sit on, with one point of contact.' },
  { value: SITE.proof.projects, label: `projects delivered since ${SITE.proof.fiverrSince}, from logos to custom software and AI chatbots.` },
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
    desc: 'AI chatbots for your website or WhatsApp, trained on your services and FAQs. They answer questions, capture leads and hand the chat to a person when needed, 24 hours a day. We built the AI chatbot that is live on the Black and White Leaflets Distribution website.',
    tags: ['Website Chat', 'WhatsApp Bot', 'Lead Capture', 'Hand-over to a Person'],
  },
  {
    id: 'workflow', badge: 'AUTOMATION', animType: 'workflow',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    title: 'Workflow Automation',
    desc: 'Map, automate, and optimise your most repetitive processes. From invoice generation to CRM updates to email sequences. We connect the tools you already use and cut the manual steps in between.',
    tags: ['Make.com', 'Zapier', 'n8n', 'CRM Sync', 'Email Automation'],
  },
  {
    // Sold once Maxterz runs its own (D23): no demo, past clients or results implied.
    id: 'receptionist', badge: 'VOICE AI', animType: 'receptionist',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    title: 'AI Receptionist',
    desc: 'An AI receptionist answers your phone in your business name. It books jobs, texts back missed callers and sends you a summary of each call. We will run one on our own phone line first, because we only sell what we run ourselves.',
    tags: ['Answers Calls', 'Books Jobs', 'Missed Call Text-Back', 'Call Summaries'],
    bookCta: true,
  },
  {
    id: 'consulting', badge: 'STRATEGY', animType: 'consulting',
    badgeClass: 'text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8',
    title: 'AI Consulting',
    desc: 'Not sure where AI fits in your business? We look at how your team works, find the tasks worth automating and recommend the right tools. Custom AI integrations are scoped and quoted after a free call.',
    tags: ['AI Audit', 'Opportunity Mapping', 'Tool Selection', 'Custom Integrations'],
  },
];

/* Services without a published price on this page: quoted after a free call (inventory section 1). */
const quotedServices = [
  { name: 'AI receptionist', desc: 'Answers calls, books jobs, texts back missed callers and sends summaries. We will run one on our own phone line first.' },
  { name: 'Workflow automation', desc: 'Zapier, Make or n8n: forms to CRM, invoicing, follow-ups and reporting.' },
  { name: 'Custom AI integrations', desc: 'AI connected to the tools you already use, scoped on a call.' },
];

const processSteps = [
  { n: '01', icon: <BarChart2 className="w-5 h-5" aria-hidden="true" />,  title: 'Discovery and Audit',     desc: 'We map your current processes, find the bottlenecks and spot every task a machine can handle. No assumptions. We look at the real workflow.' },
  { n: '02', icon: <Lightbulb className="w-5 h-5" aria-hidden="true" />,  title: 'Solution Design',          desc: 'A plan built for your specific problem. We recommend the right tools, the right integrations and the right approach, not whatever is easiest to build. You get a fixed quote before work starts.' },
  { n: '03', icon: <Code2 className="w-5 h-5" aria-hidden="true" />,      title: 'Build and Integrate',      desc: 'Development, API connections, and integration with your existing stack. Built to work with the tools you already use, not to replace your entire setup.' },
  { n: '04', icon: <Settings className="w-5 h-5" aria-hidden="true" />,   title: 'Test and Refine',          desc: 'Rigorous testing before anything touches your live operations. Edge cases covered. Fail-safes in place. You sign off before it goes live.' },
  { n: '05', icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />, title: 'Deploy and Support',        desc: 'Go live with confidence. We check how it performs after launch and adjust it as we learn how your customers use it.' },
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
  receptionist: (
    <svg viewBox="0 0 80 80" fill="none">
      <g transform="translate(6 10) scale(2.5)">
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          fill="#1044ff" fillOpacity="0.16" stroke="#1044ff" strokeWidth="1.2" strokeLinejoin="round" opacity="0.6"
        />
        <path d="M14.05 6A5 5 0 0 1 18 10" stroke="#1044ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" style={{ animation: 'ai-node 2s ease-in-out infinite 0s' }} />
        <path d="M14.05 2a9 9 0 0 1 8 7.94" stroke="#1044ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" style={{ animation: 'ai-node 2s ease-in-out infinite .5s' }} />
      </g>
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
const ServiceCard = ({ svc, bookHref }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group h-full">
    <div className="relative overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 h-full p-8 md:p-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1044ff] to-[#0020bf] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" />
      <div aria-hidden="true" className="absolute bottom-4 right-4 w-20 h-20 opacity-60 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none text-[#1044ff]">
        {cellAnimMap[svc.animType]}
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${svc.badgeClass} group-hover:bg-white/15 group-hover:border-white/25 group-hover:text-white`}>
            {svc.badge}
          </span>
          <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-white/70 transition-colors duration-300" aria-hidden="true" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-white mb-3 tracking-tight leading-tight transition-colors duration-300">{svc.title}</h3>
        <p  className="text-gray-500 group-hover:text-white/75 leading-relaxed mb-5 flex-grow text-sm transition-colors duration-300">{svc.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {svc.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 group-hover:bg-white/15 group-hover:text-white/70 group-hover:border-white/20 px-2.5 py-1 rounded-lg transition-all duration-300">{tag}</span>
          ))}
        </div>
        {svc.bookCta && (
          <Link
            href={bookHref}
            data-cta="book-a-free-call"
            className="mt-6 self-start inline-flex items-center h-11 px-5 rounded-full border-2 border-[#1044ff] text-[#1044ff] text-sm font-bold group-hover:border-white group-hover:text-white transition-colors duration-300"
          >
            {BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  </motion.div>
);

/* ─── price card (same card system as the other service pages) ── */
const PriceCard = ({ item, index }) => {
  const isFeatured = item.popular;
  const isQuote = item.price_gbp == null || item.model === 'quote';
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
      className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col gap-5 border transition-all duration-300 ${isFeatured ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent shadow-2xl shadow-blue-500/25 scale-[1.02]' : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'}`}
    >
      {isFeatured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#e7811e] text-white shadow">Most Popular</span>
      )}
      <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isFeatured ? 'text-white/70' : 'text-gray-500'}`}>{isQuote ? 'Custom Quote' : 'Fixed Price'}</span>
      <h3 className={`text-2xl font-black tracking-tight ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{item.tier_label || item.name}</h3>
      <div>
        {item.display.setup && (
          <p className={`text-sm font-semibold mb-1 ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{item.display.setup}, then</p>
        )}
        <div className="flex flex-wrap items-end gap-x-1">
          {item.display.prefix && (
            <span className={`text-lg font-semibold mb-1.5 ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{item.display.prefix}</span>
          )}
          <span className={`${isQuote ? 'text-3xl' : 'text-5xl'} font-black tracking-tighter ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{item.display.amount}</span>
          {item.display.suffix && (
            <span className={`text-lg font-semibold mb-1.5 ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{item.display.suffix}</span>
          )}
        </div>
        {item.timeline && (
          <p className={`text-sm mt-2 ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>Delivery: {item.timeline}</p>
        )}
      </div>
      <div className={`h-px w-full ${isFeatured ? 'bg-white/15' : 'bg-gray-100'}`} />
      <ul className="flex flex-col gap-3 flex-grow">
        {(item.includes ?? []).map((feat) => (
          <li key={feat} className="flex items-start gap-3">
            <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 ${isFeatured ? 'text-white/60' : 'text-[#1044ff]'}`} aria-hidden="true" />
            <span className={`text-sm leading-relaxed ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{feat}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-3">
        <Button asChild size="lg" className={`rounded-full h-12 text-sm font-bold transition-transform hover:scale-105 ${isFeatured ? 'bg-none bg-white text-[#1044ff] hover:bg-gray-100 shadow-lg' : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'}`}>
          <Link href={item.book_href} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" /></Link>
        </Button>
        {item.buy_url && (
          <Button asChild variant="outline" size="lg" className="rounded-full h-12 text-sm font-bold">
            <a href={item.buy_url} target="_blank" rel="noopener noreferrer" data-cta="buy-now">Buy now</a>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

/* ─── main component ──────────────────────────────────────────── */
/**
 * AI and automation category page (D30: existing design, improved in place).
 * All data arrives as props from the server page (getServicePageData), so nothing is fetched
 * in the browser.
 *
 * @param {{
 *   h1: string,
 *   prices?: object[],
 *   fromPrice?: number | null,
 *   billing?: 'one-off' | 'monthly',
 *   reviews?: object[],
 *   bookHref?: string,
 *   caseStudy?: object | null,
 *   projects?: object[],
 * }} props
 *   caseStudy, projects: proof for this service (Phase 5). Each section renders nothing without data.
 */
const ServiceAIAutomation = ({
  h1,
  prices = [],
  fromPrice = null,
  billing = 'monthly',
  setupFee = null,
  reviews = [],
  bookHref = '/book',
  caseStudy = null,
  projects = [],
  related = null,
}) => {
  // Set-up fees always sit next to monthly prices (brief 7.6), including the hero "from" line.

  return (
    <>
      <style>{AI_STYLES}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[82vh] flex flex-col pt-[67px] pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        {/* Floating badges: desktop decoration, facts from the price book */}
        <div aria-hidden="true" className="hidden xl:flex absolute right-20 top-[30%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'ai-float 3.5s ease-in-out infinite' }}>
          <Zap className="w-4 h-4 text-[#1044ff] fill-[#1044ff]" /> Answers customers 24/7
        </div>
        <div aria-hidden="true" className="hidden xl:flex absolute right-8 top-[48%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'ai-float 3.5s ease-in-out infinite 1.2s' }}>
          <Bot className="w-4 h-4 text-green-500" /> Website and WhatsApp
        </div>
        <div aria-hidden="true" className="hidden xl:flex absolute right-24 top-[63%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'ai-float 3.5s ease-in-out infinite 2.4s' }}>
          <TrendingUp className="w-4 h-4 text-[#eb7444]" /> Lead capture built in
        </div>

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <h1 className="badge-standard-light mb-8">{h1}</h1>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Your Business.</span>
                <span className="block">Running</span>
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                AI chatbots that answer customers on your website and WhatsApp, plus workflow automation that cuts admin. Your team gets time back for the work that needs a person.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} setupFee={setupFee} label="AI chat agents" className="mb-10" />
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80">
                  <a href="#prices">
                    <Tag className="mr-2 w-5 h-5" aria-hidden="true" /> See prices
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider">
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#eb7444] fill-current" aria-hidden="true" /> {SITE.proof.fiverrRating} stars on Fiverr</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" aria-hidden="true" /> {SITE.proof.fiverrReviews} reviews on Fiverr</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" /> {SITE.proof.projects} projects since {SITE.proof.fiverrSince}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE OPPORTUNITY ───────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20vw] font-black text-white/[0.04] leading-none tracking-tighter">AI</span>
        </div>
        <div aria-hidden="true" className="overflow-hidden border-b border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ai-marquee 28s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {w} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 mb-8">THE OPPORTUNITY</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
            Your Team Is Doing<br />Work a Machine<br /><span className="text-[#e7811e]">Can Do for You.</span>
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
        <div aria-hidden="true" className="overflow-hidden border-t border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ai-marquee 20s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {w} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
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
              From AI chatbots to automation pipelines, we build what fits your business. Not a generic template dropped into your operations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(svc => <ServiceCard key={svc.id} svc={svc} bookHref={bookHref} />)}
          </div>
          <p className="text-gray-600 mt-8">
            Need custom software, an internal tool or an app instead? See our{' '}
            <Link href="/services/web-development/app-and-software-development" className="text-[#1044ff] font-semibold hover:underline">app and custom software development</Link>{' '}
            service.
          </p>
        </div>
      </section>

      {/* ── TOOLS WE USE ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="badge-standard-light">TECH STACK</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-4 mb-3">
              Proven Tools. Connected to Yours.
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto font-light">
              We use tools that are proven in real businesses, not whatever is trending this week.
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
                  style={{ backgroundColor: tool.hex }} aria-hidden="true">
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

      {/* ── CASE STUDY (Phase 5 supplies it; hidden until then) ────── */}
      {caseStudy && (
        <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="badge-standard-light">CASE STUDY</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Real Automation. Real Results.</h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-white p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all duration-500 group"
            >
              {caseStudy.image_url && (
                <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden bg-gray-100 aspect-[4/3] md:h-[400px] flex-shrink-0 relative">
                  <img src={caseStudy.image_url} alt={caseStudy.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}
              <div className="w-full md:w-1/2 flex flex-col items-start py-4">
                {caseStudy.category_tag && (
                  <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">{caseStudy.category_tag}</span>
                )}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{caseStudy.title}</h3>
                <p className="text-gray-600 text-base mb-6 leading-relaxed font-light">{caseStudy.description}</p>
                {caseStudy.key_result && (
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#1044ff] p-5 rounded-r-xl mb-6 w-full">
                    <p className="text-[#1044ff] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><CheckCircle size={14} aria-hidden="true" /> Key Result</p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{caseStudy.key_result}</p>
                  </div>
                )}
                <Button asChild className="rounded-full bg-[#1044ff] hover:bg-[#0020bf] text-white px-8 h-12 shadow-lg shadow-blue-500/20">
                  <Link href="/our-work">View Case Study <ArrowUpRight className="ml-2 w-4 h-4" aria-hidden="true" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── RECENT WORK (Phase 5 supplies projects; hidden until then) ── */}
      {projects.length > 0 && (
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
                View all work <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <motion.div key={proj.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <Link href={`/our-work/${proj.id}`} className="block">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={proj.title} src={proj.main_image} />
                      <div className="absolute inset-0 bg-[#1044ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#1044ff]" aria-hidden="true" />
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
          </div>
        </section>
      )}

      {/* ── PRICES (from Supabase via props; everything else quoted) ── */}
      <section id="prices" className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">PRICING</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Clear Prices. <span className="text-[#1044ff]">No Surprises.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
              The AI chat agent has a set-up fee and a monthly fee. Everything else gets a fixed quote after a free call.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {prices.map((item, i) => <PriceCard key={item.id} item={item} index={i} />)}

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: prices.length * 0.15 }}
              className="relative rounded-[2rem] p-8 md:p-10 flex flex-col gap-5 border bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">Custom Quote</span>
              <h3 className="text-2xl font-black tracking-tight text-gray-900">Quoted After a Free Call</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                We scope these on a free call. You get a fixed quote and a clear timeline before any work starts.
              </p>
              <div className="h-px w-full bg-gray-100" />
              <ul className="flex flex-col gap-4 flex-grow">
                {quotedServices.map((svc) => (
                  <li key={svc.name} className="flex items-start gap-3">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-[#1044ff]" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-gray-600">
                      <span className="font-bold text-gray-900">{svc.name}.</span> {svc.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="rounded-full h-12 text-sm font-bold mt-auto bg-[#1044ff] text-white hover:bg-[#0020bf] transition-transform hover:scale-105">
                <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" /></Link>
              </Button>
            </motion.div>
          </div>

          <div className="mt-10 space-y-2 text-center">
            <p className="text-gray-600">
              Need something custom?{' '}
              <Link href={bookHref} data-cta="book-a-free-call" className="text-[#1044ff] font-semibold hover:underline">{BOOK_LABEL}</Link>.
            </p>
            <p className="text-gray-600">
              Planning a new website as well? See our{' '}
              <Link href="/services/web-development" className="text-[#1044ff] font-semibold hover:underline">web design and development services</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── REVIEWS (real Fiverr reviews; renders nothing when empty) ── */}
      <ServiceReviews reviews={reviews} />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
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

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-standard-light mb-6">GET STARTED</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              Ready to Stop Doing What a Machine Can Do?
            </h2>
            <p className="text-gray-500 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us about your business and what takes up your team's time. We will come back with a clear plan for what automation can do for you. No commitment needed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 transition-transform hover:scale-105">
                <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg border-2">
                <a href="#prices">
                  <Tag className="mr-2 w-5 h-5" aria-hidden="true" /> See prices
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {related}

      <CTASection
        service="ai-automation"
        headline="Ready to Put AI to Work in Your Business?"
        subtext="Book a free 30-minute call to see where an AI chat agent or automation fits your business. No hard sell, no obligation."
      />
    </>
  );
};

export default ServiceAIAutomation;
