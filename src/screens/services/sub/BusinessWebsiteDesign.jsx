'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, CheckCircle, ArrowUpRight, Star, ShieldCheck, Layers, Zap, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import WorkImageStrip from '@/components/WorkImageStrip';
import FromPriceLine from '@/components/service/FromPriceLine';
import ServiceReviews from '@/components/service/ServiceReviews';
import CTASection from '@/components/home/CTASection';
import { BOOK_LABEL } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/business-website-design';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * One price card, in the design of the old packages cards (D30). Every value comes from Supabase.
 * @param {{ item: object, headingLevel?: 3 | 4 }} props
 */
const PriceCard = ({ item, headingLevel = 3 }) => {
  const featured = item.popular;
  const Title = headingLevel === 4 ? 'h4' : 'h3';
  const showName = Boolean(item.tier_label) && item.name !== item.tier_label;
  const muted = featured ? 'text-blue-200' : 'text-gray-500';

  return (
    <div
      className={`relative flex flex-col h-full rounded-[2rem] p-8 md:p-10 transition-all duration-300 ${
        featured
          ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white shadow-2xl scale-100 md:scale-105 z-10 hover:-translate-y-2'
          : 'bg-white border border-gray-100 text-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#eb7444] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg whitespace-nowrap">
          Most popular
        </div>
      )}

      <div className="mb-8">
        <Title className={`text-2xl font-extrabold tracking-tight mb-4 ${featured ? 'text-white' : 'text-gray-900'}`}>
          {item.tier_label || item.name}
        </Title>
        {showName && <p className={`text-sm font-medium mb-6 ${muted}`}>{item.name}</p>}

        <div className="flex items-baseline gap-2 mb-2">
          {item.display.prefix && <span className={`text-sm font-medium ${muted}`}>{item.display.prefix}</span>}
          <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${featured ? 'text-white' : 'text-gray-900'}`}>
            {item.display.amount}
          </span>
          {item.display.suffix && <span className={`text-sm font-medium ${muted}`}>{item.display.suffix}</span>}
        </div>
        {item.display.setup && <p className={`text-sm font-medium ${muted}`}>{item.display.setup}</p>}
        {item.timeline && <p className={`text-sm font-medium mt-2 ${muted}`}>Delivery: {item.timeline}</p>}
      </div>

      <div className="flex-grow">
        <ul className="space-y-4 mb-8">
          {(item.includes || []).map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check size={20} className={`shrink-0 mt-0.5 ${featured ? 'text-[#eb7444]' : 'text-[#1044ff]'}`} aria-hidden="true" />
              <span className={`text-sm font-medium leading-relaxed ${featured ? 'text-white' : 'text-gray-700'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={item.book_href}
        data-cta="book-a-free-call"
        className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
          featured
            ? 'bg-none bg-white text-[#1044ff] hover:bg-gray-50 shadow-lg'
            : 'bg-gray-900 text-white hover:bg-[#1044ff] shadow-md'
        }`}
      >
        {BOOK_LABEL} <ArrowRight size={18} aria-hidden="true" />
      </Link>
      {item.buy_url && (
        <a
          href={item.buy_url}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="buy-now"
          className={`mt-3 w-full min-h-[44px] py-3 rounded-full border-2 font-bold flex items-center justify-center transition-all duration-300 ${
            featured
              ? 'border-white text-white hover:bg-white/10'
              : 'border-gray-900 text-gray-900 hover:border-[#1044ff] hover:text-[#1044ff]'
          }`}
        >
          Buy now
        </a>
      )}
    </div>
  );
};

/**
 * Business website design page (D30: existing layout, data read on the server and passed in).
 *
 * @param {{
 *   h1: string, prices: object[], addOns?: object[], fromPrice: number | null, billing: 'one-off' | 'monthly',
 *   slides: object[], reviews: object[], bookHref: string, caseStudy?: object | null, projects?: object[]
 * }} props
 *   prices: website and landing page items; addOns: items shown as a line under the cards.
 *   caseStudy and projects arrive in Phase 5 (D36). Their sections stay hidden while empty.
 */
const BusinessWebsiteDesign = ({
  h1,
  prices = [],
  addOns = [],
  fromPrice,
  billing,
  slides = [],
  reviews = [],
  bookHref,
  caseStudy = null,
  projects = [],
  related = null,
}) => {
  // State for the Approach Section 3D hover effect
  const [hoveredApproach, setHoveredApproach] = useState(null);
  // Same value on the server and the first browser render, so the 3D fan never mismatches.
  const isMobile = useIsMobile();

  const landingPages = prices.filter((item) => item.id.startsWith('landing-'));
  const websites = prices.filter((item) => !item.id.startsWith('landing-'));

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[80vh] flex flex-col pt-24 pb-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="badge-standard-light mb-8">{h1}</h1>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.1] text-balance">
                Your Website Is Either <span className="text-[#1044ff]">Winning Clients</span> or Losing Them.
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Most websites were built to look presentable. Not to convert. There is a significant difference.
              </p>
              <FromPriceLine price={fromPrice} billing={billing} label="Business websites" className="mb-12" />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link href={bookHref} data-cta="book-a-free-call">
                    {BOOK_LABEL}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm">
                  <a href="#prices">
                    See prices <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider mb-8">
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#eb7444] fill-current" aria-hidden="true" /> {SITE.proof.fiverrRating} Stars on Fiverr</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" aria-hidden="true" /> {SITE.proof.fiverrReviews} Reviews on Fiverr</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" /> {SITE.proof.projects} Projects Since {SITE.proof.fiverrSince}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Strip pinned to the bottom of the hero, as on the branding pages. Hidden until real slides exist (D32). */}
        <WorkImageStrip slides={slides} label="Recent Website Work" />
      </section>

      {/* SECTION 2: THE COST */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-y border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block border border-white/20 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">THE REAL COST</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">What a Poor Website Costs You.</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "Slow", title: "Slow pages lose visitors.", desc: "People leave a slow site before they read a word about you.", color: "text-[#1044ff]" },
              { value: "Dated", title: "An old design costs trust.", desc: "Buyers look you up before they call. A dated site sends them to a competitor.", color: "text-[#eb7444]" },
              { value: "Hidden", title: "Missing from Google.", desc: "If search engines cannot read your site, buyers find someone else first.", color: "text-[#1044ff]" },
              { value: "Stuck", title: "Every edit needs a developer.", desc: "Small changes wait for days and cost you money each time.", color: "text-[#eb7444]" }
            ].map((stat, idx) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className="group relative bg-white rounded-[1rem] px-4 py-6 md:py-8 shadow-xl border border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col items-center justify-start text-center h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff]/0 to-[#f0f4ff]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className={`text-4xl md:text-5xl lg:text-6xl font-black ${stat.color} mb-3 tracking-tighter relative z-10`}>
                  <span>{stat.value}</span>
                </div>

                <h3 className="text-[11px] md:text-xs lg:text-sm font-bold text-gray-900 mb-2 relative z-10 uppercase tracking-wide group-hover:text-[#1044ff] transition-colors leading-tight">
                  {stat.title}
                </h3>

                <div className="w-full h-px bg-gray-100/60 my-3 relative z-10" />

                <p className="text-gray-500 text-[10px] md:text-xs lg:text-sm leading-relaxed relative z-10 flex-grow">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: OUTCOMES */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WHAT CHANGES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">What the Right Website Does.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Brings in enquiries around the clock.", desc: "A clear site takes visitors from first look to contact form, day and night." },
              { title: "Builds credibility before the first call.", desc: "Clients look you up before reaching out. A premium site confirms they made the right choice." },
              { title: "Works as hard as your sales team.", desc: "It qualifies visitors, handles objections, and delivers a clear next step at the right moment." }
            ].map((outcome, idx) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative h-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] p-[18px] sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col border-2 border-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />

                <div className="mb-6 md:mb-8 inline-flex p-3 sm:p-4 rounded-[1rem] md:rounded-2xl bg-white/10 backdrop-blur-sm w-fit group-hover:bg-gradient-to-r group-hover:from-[#eb7444] group-hover:to-[#e05220] transition-all duration-300 border border-white shadow-lg relative z-10">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 md:mb-4 group-hover:translate-x-1 transition-transform duration-300 tracking-tight leading-tight relative z-10">
                  {outcome.title}
                </h3>

                <p className="text-white/80 font-light leading-relaxed text-sm md:text-base relative z-10">
                  {outcome.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY INSERTION (Phase 5: hidden until a real case study exists, D36) */}
      {caseStudy && (
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">It works. Here is the proof.</h3>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
            >
              <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-auto md:h-[400px] flex-shrink-0 relative">
                {caseStudy.image_url ? (
                  <img
                    src={caseStudy.image_url}
                    alt={caseStudy.title || "Case study"}
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
                    <p className="text-gray-900 font-semibold text-sm md:text-base">
                      {caseStudy.key_result}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SECTION 4: APPROACH / HOW WE BUILD IT (3D overlapping cards) */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">HOW WE BUILD IT</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built Around Revenue, Not Just Design.</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 md:gap-0 [perspective:1200px] py-10">
            {[
              { icon: <ShieldCheck className="w-8 h-8" aria-hidden="true" />, title: "SEO from day one.", desc: "Site structure and content built for search visibility before a line of code is written." },
              { icon: <Layers className="w-8 h-8" aria-hidden="true" />, title: "Conversion-focused on every page.", desc: "Every page has a clear job. Design follows conversion intent." },
              { icon: <Zap className="w-8 h-8" aria-hidden="true" />, title: "Speed without compromise.", desc: "Fast-loading, high-scoring on Core Web Vitals. A ranking and trust signal." },
              { icon: <Unlock className="w-8 h-8" aria-hidden="true" />, title: "You own everything.", desc: "Full file handover, all credentials, no ongoing access fees." }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50, rotateY: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                onMouseEnter={() => setHoveredApproach(idx)}
                onMouseLeave={() => setHoveredApproach(null)}
                className="relative w-full max-w-[340px] bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:-ml-8 transition-all duration-500 ease-out flex flex-col group shrink-0"
                style={{
                  zIndex: hoveredApproach === idx ? 50 : 10 - idx,
                  // Desktop 3D Transform
                  transform: !isMobile
                    ? hoveredApproach === idx
                      ? 'rotateY(0deg) scale(1.05) translateY(-16px)'
                      : 'rotateY(-12deg) scale(0.95)'
                    : 'none'
                }}
              >
                <div className="w-14 h-14 bg-blue-50/80 rounded-2xl flex items-center justify-center text-[#1044ff] mb-6 group-hover:scale-110 group-hover:bg-[#1044ff] group-hover:text-white transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 mb-4 leading-tight group-hover:text-[#1044ff] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="mt-auto pt-4 flex items-center text-sm font-bold text-gray-300 group-hover:text-[#1044ff] transition-colors uppercase tracking-widest">
                  Step 0{idx + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PROCESS */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="badge-standard-light">THE PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Four Steps. No Surprises.</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 hidden md:block -translate-y-1/2 rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
              {[
                { step: "01", title: "Discovery and Brief", desc: "We ask the questions most agencies skip. You get a plan and a fixed quote within one working day." },
                { step: "02", title: "Design and Approval", desc: "Key pages designed and approved before any development begins." },
                { step: "03", title: "Build and Refine", desc: "Full build, SEO set-up and speed checks. Two revision rounds on 5 and 10-page sites." },
                { step: "04", title: "Launch and Handover", desc: "Launch on the agreed date, device testing, and a full walkthrough so you can manage it yourself." }
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-2xl font-black text-gray-400 mb-6 group-hover:border-[#1044ff] group-hover:text-[#1044ff] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WORK SAMPLES (Phase 5: hidden until real projects exist, D36) */}
      {projects.length > 0 && (
        <section id="work-samples" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">OUR WEBSITE WORK</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Recent Projects.</h2>
              </div>
              <Link href="/our-work" className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors">
                View all website projects <ArrowRight size={16} aria-hidden="true" />
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
                  className="group cursor-pointer bg-gray-800 rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700 hover:border-blue-400"
                >
                  <Link href={`/our-work/${project.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-900">
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
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 font-medium text-sm line-clamp-2 leading-relaxed">
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

      {/* SECTION 7: PRICES (from Supabase, inventory section 3) */}
      <section id="prices" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WEBSITE PRICES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Choose Your Starting Point.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Clear starting prices. A fixed quote before work starts.</p>
          </motion.div>

          {websites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {websites.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="h-full"
                >
                  <PriceCard item={item} />
                </motion.div>
              ))}
            </div>
          )}

          {landingPages.length > 0 && (
            <div className="max-w-5xl mx-auto mb-16">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Landing pages</h3>
                <p className="text-gray-600 mt-3">One focused page for a campaign, a launch or a single service.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {landingPages.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="h-full"
                  >
                    <PriceCard item={item} headingLevel={4} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
            {addOns.map((item) => (
              <p key={item.id} className="text-gray-700">
                <span className="font-bold text-gray-900">Add-on: {item.name}, {item.display.label}.</span>
                {item.includes?.length ? ` ${item.includes.join('. ')}.` : ''}
              </p>
            ))}
            <p className="text-gray-700">
              Need a brand and a Google profile as well? The{' '}
              <Link href="/packages/launch-kit" className="text-[#1044ff] font-semibold hover:underline">
                Launch Kit
              </Link>{' '}
              brings brand identity, a website of up to 10 pages and Google Business Profile set-up together, live in 21 working days from receiving your content.
            </p>
          </div>

          <div className="text-center bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need something custom?</h3>
            <p className="text-gray-600 mb-8">
              Larger sites, complex integrations, online stores and apps are scoped on a free call with a fixed quote. See{' '}
              <Link href="/services/web-development/ecommerce-website-design" className="text-[#1044ff] font-semibold hover:underline">
                ecommerce website design
              </Link>{' '}
              for online stores and{' '}
              <Link href="/services/web-development/app-and-software-development" className="text-[#1044ff] font-semibold hover:underline">
                app and software development
              </Link>{' '}
              for apps and custom software.
            </p>
            <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-gray-900 hover:bg-black text-white">
              <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS (renders nothing without reviews) */}
      <ServiceReviews reviews={reviews} />

      {/* SECTION 8: FAQ */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
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
              <AccordionItem key={faq.q} value={`item-${idx}`} className="bg-gray-50 px-6 rounded-2xl border border-gray-100">
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

      {/* SECTION 9: FINAL CTA */}
      {related}

      <CTASection
        headline="Ready to Turn Your Website Into Your Best Sales Asset?"
        subtext="Book a free 30-minute call. We look at your current site and show you what is holding it back and what to change."
        service="business-website-design"
      />
    </div>
  );
};

export default BusinessWebsiteDesign;
