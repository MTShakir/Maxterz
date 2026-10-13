'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, CheckCircle, Star, ShieldCheck,
  TrendingUp, Search, Globe, FileSearch, PenLine, Lightbulb, ChevronRight, Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CTASection from '@/components/home/CTASection';
import FromPriceLine from '@/components/service/FromPriceLine';
import ServiceReviews from '@/components/service/ServiceReviews';
import { BOOK_LABEL } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/seo-digital-marketing';
import SharedTypeWriter from '@/components/TypeWriter';

/* ─── keyframes ───────────────────────────────────────────────── */
const SEO_STYLES = `
  @keyframes seo-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes seo-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes seo-pulse   { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
  @keyframes seo-ping    { 0%{transform:scale(1);opacity:.7} 75%,100%{transform:scale(2.4);opacity:0} }
  @keyframes seo-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes seo-rise    { 0%,100%{transform:scaleY(.38)} 50%{transform:scaleY(1)} }
  @keyframes seo-rise2   { 0%,100%{transform:scaleY(.55)} 50%{transform:scaleY(1)} }
  @keyframes seo-rise3   { 0%,100%{transform:scaleY(.28)} 50%{transform:scaleY(.78)} }
  @keyframes seo-node    { 0%,100%{opacity:.28} 50%{opacity:.90} }
  @keyframes seo-bar     { 0%,100%{transform:scaleY(.42)} 50%{transform:scaleY(1)} }
`;

/* ─── typewriter ──────────────────────────────────────────────── */
const PHRASES = ['Get Revenue.', 'Get Leads.', 'Get Rankings.', 'Get Ahead.'];

const TypeWriter = () => <SharedTypeWriter phrases={PHRASES} blink="seo-blink" />;

/* ─── static data ─────────────────────────────────────────────── */
const marqueeWords = [
  'ON-PAGE SEO', 'OFF-PAGE SEO', 'GOOGLE ADS', 'META ADS', 'TECHNICAL AUDIT',
  'KEYWORD RESEARCH', 'LINK BUILDING', 'LOCAL SEO', 'GOOGLE BUSINESS PROFILE',
  'CORE WEB VITALS', 'CONTENT STRATEGY', 'SCHEMA MARKUP', 'ORGANIC TRAFFIC',
];

/* Offer facts from the price book (2.5). No invented or unsourced statistics. */
const statsData = [
  { value: '3',      label: 'monthly SEO plans: Local, Growth and Authority. Each one comes with a monthly report or strategy call.' },
  { value: '2 to 4', label: 'SEO blog posts a month on the Growth and Authority plans, written around what your customers search for.' },
  { value: '4',      label: 'Google Business Profile posts a month with profile management, plus review requests and replies.' },
];

/* Hero widget bars: decoration only, no click-share figures. */
const serpRows = [
  { pos: '#1', w: 'w-full',  bold: true  },
  { pos: '#2', w: 'w-[55%]', bold: false },
  { pos: '#3', w: 'w-[38%]', bold: false },
  { pos: '#4', w: 'w-[28%]', bold: false },
  { pos: '#5', w: 'w-[22%]', bold: false },
];

const services = [
  {
    id: 'seo', badge: 'ON-PAGE / OFF-PAGE', animType: 'seo',
    title: 'SEO Services',
    desc: 'Full search engine optimisation, from keyword research to links. On-page covers every title, heading, content block, and internal link. Off-page covers the authority signals, backlinks, and digital PR that show Google your site deserves to rank.',
    tags: ['Keyword Research', 'On-Page Optimisation', 'Link Building', 'Content SEO'],
    large: true,
  },
  {
    id: 'local', badge: 'LOCAL SEO', animType: 'local',
    title: 'Local SEO and Google Business Profile',
    desc: 'Get found when people nearby search for what you do, on Google Search and Google Maps. We set up and optimise your Google Business Profile, build local pages and citations, and help you earn more reviews.',
    tags: ['Google Business Profile', 'Google Maps', 'Citations', 'Review Growth'],
    large: true,
  },
  {
    id: 'technical', badge: 'TECHNICAL', animType: 'technical',
    title: 'Technical SEO and Audits',
    desc: 'Site speed, crawlability, Core Web Vitals, schema markup and indexing. This is the base layer that decides whether Google can read and rank your site. We audit, fix, and monitor.',
    tags: ['Core Web Vitals', 'Schema Markup', 'Site Speed', 'Crawl Audit'],
    large: false,
  },
  {
    id: 'paid', badge: 'PPC', animType: 'paid',
    title: 'Paid Advertising',
    desc: 'Google Ads and Meta Ads that put you in front of people searching for what you sell. Every campaign is built, managed, and optimised for cost per lead, not vanity metrics.',
    tags: ['Google Ads', 'Meta Ads', 'PPC Management', 'Retargeting'],
    large: false,
  },
];

const processSteps = [
  { n: '01', icon: <FileSearch className="w-5 h-5" aria-hidden="true" />,  title: 'SEO Audit and Baseline',       desc: 'A full technical and content audit of your existing site. We find what is blocking your rankings, benchmark where you are today, and identify your biggest opportunities before writing a single line of strategy.' },
  { n: '02', icon: <Lightbulb className="w-5 h-5" aria-hidden="true" />,   title: 'Keyword and Content Strategy',  desc: 'Research into what your customers search for, near you and nationally. We build a keyword map and content plan that matches your business goals to the search terms that bring qualified traffic.' },
  { n: '03', icon: <PenLine className="w-5 h-5" aria-hidden="true" />,     title: 'On-Page Optimisation',          desc: 'Every page title, meta description, heading hierarchy, internal link, image alt text, and content block optimised. Both for search engines to understand and for visitors to convert when they arrive.' },
  { n: '04', icon: <Globe className="w-5 h-5" aria-hidden="true" />,       title: 'Off-Page, Local and Technical', desc: 'Link building, digital PR, Google Business Profile, citations, Core Web Vitals, schema and crawl health. These are the trust signals and technical foundations that decide where Google places you against your competitors.' },
  { n: '05', icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,  title: 'Track, Report and Compound',    desc: 'Monthly reports covering keyword rankings, organic traffic, and leads from search. Each month\'s data shapes the next month\'s work. SEO compounds: it gets stronger the longer you invest.' },
];

/** Includes as short sentences for the "Also available" list, e.g. "Keyword research. Featured image." */
const asSentences = (list) => `${list.map((part) => part.replace(/[.\s]+$/, '')).join('. ')}.`;

/* ─── animated icons ──────────────────────────────────────────── */
const cellAnimMap = {
  seo: (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="33" cy="33" r="23" stroke="#1044ff" strokeWidth="2.5" opacity="0.18" />
      <circle cx="33" cy="33" r="16" fill="#1044ff" opacity="0.07" />
      <rect x="19" y="37" width="7" height="12" rx="2" fill="#1044ff" opacity="0.30"
        style={{ animation: 'seo-rise3 2.4s ease-in-out infinite 0s', transformOrigin: 'center bottom', transformBox: 'fill-box' }} />
      <rect x="29" y="26" width="7" height="23" rx="2" fill="#1044ff" opacity="0.55"
        style={{ animation: 'seo-rise 2.4s ease-in-out infinite .35s', transformOrigin: 'center bottom', transformBox: 'fill-box' }} />
      <rect x="39" y="31" width="7" height="18" rx="2" fill="#1044ff" opacity="0.42"
        style={{ animation: 'seo-rise2 2.4s ease-in-out infinite .7s', transformOrigin: 'center bottom', transformBox: 'fill-box' }} />
      <line x1="49" y1="49" x2="70" y2="70" stroke="#1044ff" strokeWidth="5.5" strokeLinecap="round" opacity="0.32" />
    </svg>
  ),
  paid: (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="36" stroke="#1044ff" strokeWidth="1.5" opacity="0.08" />
      <circle cx="40" cy="40" r="26" stroke="#1044ff" strokeWidth="1.5" opacity="0.14" />
      <circle cx="40" cy="40" r="16" stroke="#1044ff" strokeWidth="1.5" opacity="0.22" />
      <circle cx="40" cy="40" r="7"  fill="#1044ff" opacity="0.72" style={{ animation: 'seo-pulse 1.8s ease-in-out infinite' }} />
      <circle cx="40" cy="40" r="7"  stroke="#1044ff" strokeWidth="2" opacity="0.40" style={{ animation: 'seo-ping 2s ease-out infinite' }} />
      <line x1="40" y1="2"  x2="40" y2="16" stroke="#1044ff" strokeWidth="1.5" opacity="0.16" strokeLinecap="round" />
      <line x1="40" y1="64" x2="40" y2="78" stroke="#1044ff" strokeWidth="1.5" opacity="0.16" strokeLinecap="round" />
      <line x1="2"  y1="40" x2="16" y2="40" stroke="#1044ff" strokeWidth="1.5" opacity="0.16" strokeLinecap="round" />
      <line x1="64" y1="40" x2="78" y2="40" stroke="#1044ff" strokeWidth="1.5" opacity="0.16" strokeLinecap="round" />
    </svg>
  ),
  technical: (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="30" y="4"  width="20" height="14" rx="4" fill="#1044ff" opacity="0.65" style={{ animation: 'seo-pulse 2.2s ease-in-out infinite' }} />
      <line x1="40" y1="18" x2="40" y2="32" stroke="#1044ff" strokeWidth="1.5" opacity="0.22" />
      <line x1="12" y1="32" x2="68" y2="32" stroke="#1044ff" strokeWidth="1.5" opacity="0.22" />
      <line x1="12" y1="32" x2="12" y2="40" stroke="#1044ff" strokeWidth="1.5" opacity="0.22" />
      <line x1="40" y1="32" x2="40" y2="40" stroke="#1044ff" strokeWidth="1.5" opacity="0.22" />
      <line x1="68" y1="32" x2="68" y2="40" stroke="#1044ff" strokeWidth="1.5" opacity="0.22" />
      <rect x="2"  y="40" width="20" height="12" rx="3" fill="#1044ff" opacity="0.38" style={{ animation: 'seo-node 2.4s ease-in-out infinite .2s' }} />
      <rect x="30" y="40" width="20" height="12" rx="3" fill="#1044ff" opacity="0.45" style={{ animation: 'seo-node 2.4s ease-in-out infinite .5s' }} />
      <rect x="58" y="40" width="20" height="12" rx="3" fill="#1044ff" opacity="0.38" style={{ animation: 'seo-node 2.4s ease-in-out infinite .8s' }} />
      <line x1="12" y1="52" x2="12" y2="60" stroke="#1044ff" strokeWidth="1.5" opacity="0.16" />
      <line x1="40" y1="52" x2="40" y2="60" stroke="#1044ff" strokeWidth="1.5" opacity="0.16" />
      <rect x="4"  y="60" width="16" height="8" rx="2" fill="#1044ff" opacity="0.20" />
      <rect x="32" y="60" width="16" height="8" rx="2" fill="#1044ff" opacity="0.20" />
      <rect x="52" y="60" width="16" height="8" rx="2" fill="#1044ff" opacity="0.16" />
    </svg>
  ),
  local: (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="4"  y="6"  width="72" height="22" rx="11" fill="#1044ff" opacity="0.10" stroke="#1044ff" strokeWidth="1.5" />
      <circle cx="62" cy="17" r="6"  stroke="#1044ff" strokeWidth="2"   opacity="0.32" />
      <line   x1="66" y1="21" x2="72" y2="27" stroke="#1044ff" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
      <rect   x="14" y="12" width="2"  height="10" rx="1" fill="#1044ff" opacity="0.50" style={{ animation: 'seo-blink 1s ease-in-out infinite' }} />
      <rect x="4"  y="38" width="30" height="12" rx="6" fill="#1044ff" opacity="0.22" style={{ animation: 'seo-float 3.2s ease-in-out infinite 0s'  }} />
      <rect x="38" y="38" width="38" height="12" rx="6" fill="#1044ff" opacity="0.32" style={{ animation: 'seo-float 3.2s ease-in-out infinite .5s' }} />
      <rect x="4"  y="56" width="46" height="12" rx="6" fill="#1044ff" opacity="0.26" style={{ animation: 'seo-float 3.2s ease-in-out infinite 1s'  }} />
      <rect x="54" y="56" width="22" height="12" rx="6" fill="#1044ff" opacity="0.18" style={{ animation: 'seo-float 3.2s ease-in-out infinite 1.5s'}} />
    </svg>
  ),
};

/* ─── service card ────────────────────────────────────────────── */
const ServiceCard = ({ svc }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group h-full">
    <div className={`relative overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 h-full ${svc.large ? 'p-8 md:p-10 min-h-[280px]' : 'p-7 md:p-8 min-h-[230px]'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1044ff] to-[#0020bf] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" />
      <div aria-hidden="true" className="absolute bottom-4 right-4 w-20 h-20 opacity-60 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none">
        {cellAnimMap[svc.animType]}
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border text-[#1044ff] border-[#1044ff]/20 bg-[#1044ff]/8 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/25 group-hover:text-white">
            {svc.badge}
          </span>
          <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-white/70 transition-colors duration-300" aria-hidden="true" />
        </div>
        <h3 className={`font-extrabold text-gray-900 group-hover:text-white mb-3 tracking-tight leading-tight transition-colors duration-300 ${svc.large ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>{svc.title}</h3>
        <p  className={`text-gray-500 group-hover:text-white/75 leading-relaxed mb-4 flex-grow transition-colors duration-300 ${svc.large ? 'text-sm' : 'text-xs'}`}>{svc.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {svc.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 group-hover:bg-white/15 group-hover:text-white/70 group-hover:border-white/20 px-2.5 py-1 rounded-lg transition-all duration-300">{tag}</span>
          ))}
        </div>
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
      <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isFeatured ? 'text-white/70' : 'text-gray-500'}`}>{item.model === 'monthly' ? 'Monthly SEO Plan' : 'Fixed Price'}</span>
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
 * SEO and digital marketing category page (D30: existing design, improved in place).
 * All data arrives as props from the server page (getServicePageData), so nothing is fetched
 * in the browser. Tier items (with a tier label) show as cards; the rest as "Also available".
 *
 * @param {{
 *   h1: string,
 *   prices?: object[],
 *   fromPrice?: number | null,
 *   billing?: 'one-off' | 'monthly',
 *   reviews?: object[],
 *   bookHref?: string,
 * }} props
 */
const ServiceSEODigitalMarketing = ({
  h1,
  prices = [],
  fromPrice = null,
  billing = 'monthly',
  reviews = [],
  bookHref = '/book',
  related = null,
}) => {
  const tiers = prices.filter((item) => item.tier_label);
  const extras = prices.filter((item) => !item.tier_label);

  return (
    <>
      <style>{SEO_STYLES}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[82vh] flex flex-col pt-[67px] pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        {/* Search results widget: desktop decoration only */}
        <div aria-hidden="true" className="hidden xl:block absolute right-6 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 w-64 pointer-events-none z-10" style={{ animation: 'seo-float 4s ease-in-out infinite' }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Google search results</p>
          {serpRows.map((row) => (
            <div key={row.pos} className="flex items-center gap-3 mb-2.5">
              <span className={`text-xs font-black w-6 flex-shrink-0 ${row.bold ? 'text-[#1044ff]' : 'text-gray-300'}`}>{row.pos}</span>
              <div className="flex-1 h-6 bg-gray-50 rounded-lg overflow-hidden">
                <div className={`h-full rounded-lg ${row.bold ? 'bg-gradient-to-r from-[#1044ff] to-[#3366ff]' : 'bg-gray-200'} ${row.w}`} />
              </div>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1044ff] flex-shrink-0" style={{ animation: 'seo-pulse 1.6s ease-in-out infinite' }} />
            <p className="text-[11px] font-bold text-[#1044ff]">Your business should be here.</p>
          </div>
        </div>

        {/* Floating badges: left of the widget, facts from the price book */}
        <div aria-hidden="true" className="hidden xl:flex absolute right-[17.5rem] top-[32%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'seo-float 3.5s ease-in-out infinite .5s' }}>
          <TrendingUp className="w-4 h-4 text-green-500" /> Clear monthly reports
        </div>
        <div aria-hidden="true" className="hidden xl:flex absolute right-[17.5rem] top-[50%] items-center gap-2 bg-white rounded-full shadow-xl border border-gray-100 px-4 py-2.5 text-sm font-bold text-gray-800 pointer-events-none z-10" style={{ animation: 'seo-float 3.5s ease-in-out infinite 1.8s' }}>
          <Search className="w-4 h-4 text-[#1044ff]" /> Google Business Profile
        </div>

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <h1 className="badge-standard-light mb-8">{h1}</h1>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Get Found.</span>
                <span className="block">Get Clicked.</span>
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                SEO, local SEO, Google Business Profile and paid ads that help the right customers find you. Clear monthly reports you can read.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="SEO plans" className="mb-10" />
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></Link>
                </Button>
                {prices.length > 0 && (
                  <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80">
                    <a href="#prices">
                      <Tag className="mr-2 w-5 h-5" aria-hidden="true" /> See prices
                    </a>
                  </Button>
                )}
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

      {/* ── THE REALITY ───────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20vw] font-black text-white/[0.04] leading-none tracking-tighter">SEO</span>
        </div>
        <div aria-hidden="true" className="overflow-hidden border-b border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'seo-marquee 28s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {w} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 mb-8">THE REALITY</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
            If You Are Not<br />on Page One,<br /><span className="text-[#e7811e]">You Are Not in the Game.</span>
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
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'seo-marquee 22s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {w} <span className="inline-block w-1 h-1 rounded-full bg-[#e7811e] mx-2 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <span className="badge-standard-light">WHAT WE DO</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
              Every Channel That Earns You Traffic.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              Organic and local rankings that build over time. Paid campaigns that bring traffic from the day they go live. Technical foundations that make both work better.
            </p>
          </motion.div>

          {/* Service grid: two large cards, then two smaller ones */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.filter(s => s.large).map(svc => <ServiceCard key={svc.id} svc={svc} />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.filter(s => !s.large).map(svc => <ServiceCard key={svc.id} svc={svc} />)}
            </div>
          </div>

          {/* Other marketing services strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4">
            <Link href={bookHref} data-cta="book-a-free-call" className="group flex flex-col sm:flex-row items-center justify-between gap-4 w-full rounded-[2rem] border-2 border-dashed border-[#eb7444]/30 bg-orange-50/50 hover:bg-orange-50 hover:border-[#eb7444]/60 px-8 py-6 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#eb7444]/10 border border-[#eb7444]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#eb7444]/20 transition-colors duration-300">
                  <Globe className="w-5 h-5 text-[#eb7444]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-lg leading-tight">Other Marketing Services We Offer</p>
                  <p className="text-gray-500 text-sm mt-0.5">Lead funnels with email follow-ups, SEO blog posts and conversion improvements. Ask us about them on a free call.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#c2410c] font-bold text-sm flex-shrink-0 group-hover:gap-3 transition-all duration-300">
                {BOOK_LABEL} <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="badge-standard-light">OUR PROCESS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
              A System Built to Rank. Not to Impress.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              Five clear steps, zero black-box tactics. You will always know what we are doing, why we are doing it, and what it is producing.
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
                  <div className="flex-1 bg-white rounded-[1.5rem] border border-gray-100 p-6 md:p-7 hover:shadow-lg hover:border-gray-200 transition-all duration-300 mb-1">
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

      {/* Case study and recent work: rebuilt in Phase 5 from real portfolio data (D36). */}

      {/* ── PRICES (from Supabase via props) ──────────────────────── */}
      {prices.length > 0 && (
        <section id="prices" className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="badge-standard-light">PRICING</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Clear Plans. <span className="text-[#1044ff]">Clear Reports.</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
                Monthly SEO plans for local and national growth, plus one-off services when you need them. You see what we did and what changed, every month.
              </p>
            </motion.div>

            {tiers.length > 0 && (
              <>
                <div className="grid md:grid-cols-3 gap-6 items-stretch">
                  {tiers.map((item, i) => <PriceCard key={item.id} item={item} index={i} />)}
                </div>
                <p className="text-center text-gray-500 text-sm mt-10">SEO monthly plans: 3-month minimum, then rolling with 30 days&apos; notice.</p>
              </>
            )}

            {extras.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mt-16 max-w-4xl mx-auto bg-gray-50 rounded-[2rem] border border-gray-100 p-6 md:p-10"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">One-off services and add-ons</span>
                <h3 className="text-2xl font-black tracking-tight text-gray-900 mt-2">Also Available</h3>
                <ul className="mt-4 divide-y divide-gray-200">
                  {extras.map((item) => (
                    <li key={item.id} className="py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-8">
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        {item.includes?.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{asSentences(item.includes)}</p>
                        )}
                        {item.note && (
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.note}</p>
                        )}
                      </div>
                      <p className="font-black text-[#1044ff] sm:text-right sm:max-w-[16rem] flex-shrink-0">{item.display.label}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <div className="mt-10 space-y-2 text-center">
              <p className="text-gray-600">
                Need something custom?{' '}
                <Link href={bookHref} data-cta="book-a-free-call" className="text-[#1044ff] font-semibold hover:underline">{BOOK_LABEL}</Link>.
              </p>
              <p className="text-gray-600">
                Want local SEO, Google Business Profile and social media in one plan? See our{' '}
                <Link href="/packages#monthly" className="text-[#1044ff] font-semibold hover:underline">monthly marketing plans</Link>.
              </p>
              <p className="text-gray-600">
                Need a website built for search from day one? See our{' '}
                <Link href="/services/web-development/business-website-design" className="text-[#1044ff] font-semibold hover:underline">business website design</Link>{' '}
                service.
              </p>
            </div>
          </div>
        </section>
      )}

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
              Find Out Where You Can Win in Search.
            </h2>
            <p className="text-gray-500 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us about your business and we will show you where your best search opportunities are, and what it takes to win them.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 transition-transform hover:scale-105">
                <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL} <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></Link>
              </Button>
              {prices.length > 0 && (
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg border-2">
                  <a href="#prices">
                    <Tag className="mr-2 w-5 h-5" aria-hidden="true" /> See prices
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {related}

      <CTASection
        service="seo-digital-marketing"
        headline="Ready to Be Found by More Customers?"
        subtext="Book a free 30-minute call. We will look at where you show up on Google today and what to fix first. No hard sell, no obligation."
      />
    </>
  );
};

export default ServiceSEODigitalMarketing;
