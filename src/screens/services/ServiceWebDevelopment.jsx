'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  LayoutTemplate,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Search,
  Star,
  Zap,
  Target,
  Unlock,
  Code2,
  PenTool,
  Database,
  Cloud,
  Bot,
  Globe,
  Plug,
  Users,
  GitBranch,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import FromPriceLine from '@/components/service/FromPriceLine';
import ServiceReviews from '@/components/service/ServiceReviews';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '@/content/faq/web-development';
import WorkImageStrip from '@/components/WorkImageStrip';
import CTASection from '@/components/home/CTASection';
import { BOOK_LABEL } from '@/lib/cta';
import { formatGBP } from '@/lib/pricing-calc';
import { SITE } from '@/lib/site';

const WEBSITES_PATH = '/services/web-development/business-website-design';
const ECOMMERCE_PATH = '/services/web-development/ecommerce-website-design';
const APPS_PATH = '/services/web-development/app-and-software-development';

/** The 3 service pages in this category (D31 names). */
const services = [
  {
    icon: <LayoutTemplate size={32} aria-hidden="true" />,
    title: 'Website Design',
    desc: 'Fast, SEO-ready websites and landing pages that build trust and turn visitors into enquiries.',
    link: WEBSITES_PATH,
  },
  {
    icon: <ShoppingCart size={32} aria-hidden="true" />,
    title: 'Ecommerce Website Design',
    desc: 'Shopify and custom online stores built to cut cart abandonment and sell around the clock.',
    link: ECOMMERCE_PATH,
  },
  {
    icon: <Smartphone size={32} aria-hidden="true" />,
    title: 'App and Software Development',
    desc: 'App design, mobile apps, custom software and SaaS, built around how your business runs.',
    link: APPS_PATH,
  },
];

/** Category price cards: one per service page, with its lowest "from" price (inventory section 3). */
const priceCards = [
  {
    title: 'Website Design',
    link: WEBSITES_PATH,
    idealFor: 'service businesses that want more calls and enquiries',
    features: ['Landing pages', 'Websites of up to 5, 10 or 25 pages', 'CMS, SEO foundations and tracking', 'Copywriting add-on'],
    cta: 'See website design prices',
  },
  {
    title: 'Ecommerce Website Design',
    link: ECOMMERCE_PATH,
    idealFor: 'brands that sell products online',
    features: ['Shopify store set-up', 'Custom online stores', 'Payments and shipping set up', 'Training at handover'],
    cta: 'See ecommerce prices',
  },
  {
    title: 'App and Software Development',
    link: APPS_PATH,
    idealFor: 'businesses with a product idea or a process to build',
    features: ['App design (UI/UX)', 'Mobile apps and web apps', 'Custom software and SaaS', 'A fixed quote for each phase'],
    cta: 'See app and software prices',
  },
];

/**
 * One category price card, in the design of the old packages cards (D30).
 * @param {{ title: string, price: number | null | undefined, idealFor: string, features: string[], href: string, cta: string }} props
 */
const CategoryPriceCard = ({ title, price, idealFor, features, href, cta }) => (
  <div className="relative flex flex-col h-full rounded-[2rem] p-8 md:p-10 transition-all duration-300 bg-white border border-gray-100 text-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-1">
    <div className="mb-8">
      <h3 className="text-2xl font-extrabold tracking-tight mb-4 text-gray-900">{title}</h3>
      <p className="text-sm font-medium mb-6 text-gray-500">Ideal for: {idealFor}</p>
      <div className="flex items-baseline gap-2 mb-2">
        {price != null ? (
          <>
            <span className="text-sm font-medium text-gray-500">from</span>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{formatGBP(price)}</span>
          </>
        ) : (
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Custom quote</span>
        )}
      </div>
    </div>

    <div className="flex-grow">
      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={20} className="shrink-0 mt-0.5 text-[#1044ff]" aria-hidden="true" />
            <span className="text-sm font-medium leading-relaxed text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <Link
      href={href}
      className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-gray-900 text-white hover:bg-[#1044ff] shadow-md"
    >
      {cta} <ArrowRight size={18} aria-hidden="true" />
    </Link>
  </div>
);

/**
 * Web design and development category page (D30: existing layout, data from the server).
 *
 * @param {{
 *   h1: string, fromPrice: number | null, billing: 'one-off' | 'monthly',
 *   fromPrices: Record<string, number | null>, reviews: object[], bookHref: string, projects?: object[]
 * }} props
 *   projects: recent work, passed in Phase 5 (D36). The section stays hidden while empty.
 */
const ServiceWebDevelopment = ({ h1, fromPrice, billing, fromPrices = {}, slides = [], reviews = [], bookHref, projects = [], related = null }) => {
  const additionalServices = [
    {
      icon: <Code2 className="w-6 h-6" aria-hidden="true" />,
      title: "Custom Software Development",
      desc: "Bespoke applications built around your exact workflows. No off-the-shelf compromises. Software that solves the actual problem, not a generic version of it.",
      tag: "Fixed quote per phase",
      tagStyle: "bg-white/15 text-white border border-white/20",
      variant: "dark",
      large: true,
    },
    {
      icon: <PenTool className="w-6 h-6" aria-hidden="true" />,
      title: "UI/UX Design and Prototyping",
      desc: "User flows, wireframes, design systems and clickable prototypes that cut development risk before a single line of code is written.",
      variant: "light",
      large: false,
    },
    {
      icon: <Database className="w-6 h-6" aria-hidden="true" />,
      title: "CRM Development and Integration",
      desc: "Custom CRM builds or Salesforce, HubSpot, and Pipedrive integrations tailored to your actual sales process, not the vendor's default.",
      variant: "blue",
      large: false,
    },
    {
      icon: <Cloud className="w-6 h-6" aria-hidden="true" />,
      title: "Full SaaS Platform Development",
      desc: "Multi-tenant SaaS products with recurring billing, onboarding flows, user role management, usage analytics, and admin dashboards built to scale.",
      variant: "light",
      large: true,
    },
    {
      icon: <Bot className="w-6 h-6" aria-hidden="true" />,
      title: "AI Integration and Intelligent Features",
      desc: (
        <>
          Add AI chatbots, recommendation engines and automations to your product or website. See{' '}
          <Link href="/services/ai-automation" className="underline underline-offset-2 font-semibold text-white hover:text-white/90">
            AI chatbots and automation
          </Link>
          .
        </>
      ),
      tag: "Chatbots and automation",
      tagStyle: "bg-white/20 text-white border border-white/30",
      variant: "orange",
      large: false,
    },
    {
      icon: <Globe className="w-6 h-6" aria-hidden="true" />,
      title: "Progressive Web Apps (PWAs)",
      desc: "App-like web experiences that work offline, install to home screens, and load fast. Reach mobile users without App Store dependency.",
      variant: "light",
      large: false,
    },
    {
      icon: <Plug className="w-6 h-6" aria-hidden="true" />,
      title: "API Development and Third-Party Integrations",
      desc: "REST and GraphQL APIs, webhook pipelines, and custom integrations that connect your entire tech stack and cut manual data handling.",
      variant: "dark",
      large: false,
    },
    {
      icon: <Users className="w-6 h-6" aria-hidden="true" />,
      title: "Membership and Subscription Platforms",
      desc: "Gated content, recurring billing via Stripe, member portals, and loyalty features built for businesses that run on recurring revenue.",
      variant: "blue",
      large: true,
    },
    {
      icon: <GitBranch className="w-6 h-6" aria-hidden="true" />,
      title: "Headless and Composable Architecture",
      desc: "Decoupled frontends with headless CMS backends for maximum speed, developer flexibility, and performance at scale.",
      variant: "light",
      large: false,
    },
  ];

  const variantStyles = {
    dark: {
      card: "bg-gray-900 border-gray-800",
      icon: "bg-white/10 text-white group-hover:bg-white group-hover:text-gray-900",
      title: "text-white",
      desc: "text-gray-400",
      cta: "text-gray-400 group-hover:text-white",
    },
    blue: {
      card: "bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent",
      icon: "bg-white/15 text-white group-hover:bg-white group-hover:text-[#1044ff]",
      title: "text-white",
      desc: "text-white/75",
      cta: "text-white/90 group-hover:text-white",
    },
    orange: {
      card: "bg-gradient-to-br from-[#e7811e] to-[#e7581e] border-transparent",
      icon: "bg-white/20 text-white",
      title: "text-white",
      desc: "text-white/85",
      cta: "text-white group-hover:text-white",
    },
    light: {
      card: "bg-white border-gray-100 hover:border-blue-100 hover:shadow-xl",
      icon: "bg-blue-50 text-[#1044ff] group-hover:bg-[#1044ff] group-hover:text-white",
      title: "text-gray-900 group-hover:text-[#1044ff]",
      desc: "text-gray-500",
      cta: "text-gray-500 group-hover:text-[#1044ff]",
    },
  };

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />

        <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="badge-standard-light mb-8">{h1}</h1>
            <p className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.1] text-balance">
              Websites and Apps That <span className="text-[#1044ff]">Work as Hard as You Do.</span>
            </p>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
              From business websites to ecommerce stores, mobile apps to full SaaS platforms, built for performance, search visibility, and results that show in your numbers.
            </p>
            <FromPriceLine price={fromPrice} billing={billing} label="Web projects" className="mb-12" />

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                <Link href={bookHref} data-cta="book-a-free-call">
                  {BOOK_LABEL}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-gray-50">
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

        <WorkImageStrip slides={slides} label="Recent Web Work" />
      </section>

      {/* ─── DEDICATED SOLUTIONS ──────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">OUR SPECIALITIES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Dedicated Solutions.</h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Three core web services, each with its own page, prices and process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group h-full"
              >
                <Link href={service.link} className="block h-full bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-100 transition-all duration-500 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-16 h-16 bg-blue-50 text-[#1044ff] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1044ff] group-hover:text-white transition-colors duration-500 relative z-10 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-[#1044ff] transition-colors relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow relative z-10 leading-relaxed">
                    {service.desc}
                  </p>
                  {fromPrices[service.link] != null && (
                    <p className="text-gray-900 font-bold mb-6 relative z-10">
                      From <span className="text-[#1044ff]">{formatGBP(fromPrices[service.link])}</span>
                    </p>
                  )}
                  <div className="flex items-center text-[#1044ff] font-bold text-sm uppercase tracking-wider relative z-10 mt-auto">
                    Explore Service <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FULL CAPABILITY BENTO ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="badge-standard-light">FULL CAPABILITY</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mt-4 mb-5">
              We Build More Than You Think.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              From AI-powered web applications and custom SaaS platforms to headless architecture and CRM systems, our development capability covers the full stack. If it runs on the web, we build it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {additionalServices.map((service, idx) => {
              const s = variantStyles[service.variant];
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
                  className={`group relative rounded-[1.75rem] border p-7 md:p-8 flex flex-col gap-4 transition-all duration-400 cursor-default ${s.card} ${service.large ? 'lg:col-span-2' : 'lg:col-span-1'}`}
                >
                  {/* top row: icon + badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${s.icon}`}>
                      {service.icon}
                    </div>
                    {service.tag && (
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${service.tagStyle}`}>
                        {service.tag}
                      </span>
                    )}
                  </div>

                  {/* content */}
                  <div className="flex flex-col flex-grow gap-2">
                    <h3 className={`text-xl font-extrabold tracking-tight leading-tight transition-colors duration-300 ${s.title}`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${s.desc}`}>
                      {service.desc}
                    </p>
                  </div>

                  {/* footer cta: padded hit area keeps the tap target 44px tall without moving the layout */}
                  <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mt-auto pt-2 transition-all duration-300 ${s.cta}`}>
                    <Link href={bookHref} data-cta="book-a-free-call" className="flex items-center gap-1.5 py-[14px] -my-[14px] hover:gap-3 transition-all duration-200">
                      {BOOK_LABEL} <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-500 text-sm mt-8"
          >
            Not sure what you need?{' '}
            <Link href={bookHref} data-cta="book-a-free-call" className="text-[#1044ff] font-semibold hover:underline">
              {BOOK_LABEL}
            </Link>{' '}
            and we will scope it with you.
          </motion.p>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WHY CHOOSE US</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built Around Revenue, Not Just Deliverables.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Search aria-hidden="true" />,
                title: "SEO from day one",
                desc: (
                  <>
                    Site architecture, page structure, and content built for organic search before the first line of code. For ongoing growth, see our{' '}
                    <Link href="/services/seo-digital-marketing" className="text-[#1044ff] font-semibold hover:underline">
                      SEO and local SEO services
                    </Link>
                    .
                  </>
                ),
              },
              {
                icon: <Zap aria-hidden="true" />,
                title: "Speed without compromise",
                desc: "Fast-loading, optimised Core Web Vitals scores. A ranking signal and a conversion signal at once.",
              },
              {
                icon: <Target aria-hidden="true" />,
                title: "Conversion-focused design",
                desc: "Every page has a single clear purpose. Design follows that purpose, not personal preference.",
              },
              {
                icon: <Unlock aria-hidden="true" />,
                title: "You own everything",
                desc: "Full handover of source code, credentials, and documentation. No recurring access fees.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-start p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-blue-50 p-4 rounded-xl text-[#1044ff] shadow-sm mb-6 border border-blue-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORK SAMPLES (Phase 5: hidden until real projects exist, D36) ─── */}
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
                View all projects <ArrowRight size={16} aria-hidden="true" />
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
                      {project.main_image ? (
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          alt={project.title}
                          src={project.main_image}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                      )}
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

      {/* ─── PRICES (category price cards, inventory section 3) ───────── */}
      <section id="prices" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WEB DEVELOPMENT PRICES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Choose Your Starting Point.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Clear starting prices. A fixed quote before work starts.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {priceCards.map((card, idx) => (
              <motion.div
                key={card.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="h-full"
              >
                <CategoryPriceCard
                  title={card.title}
                  price={fromPrices[card.link]}
                  idealFor={card.idealFor}
                  features={card.features}
                  href={card.link}
                  cta={card.cta}
                />
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16">
            Need a brand and a website together? Our{' '}
            <Link href="/packages" className="text-[#1044ff] font-semibold hover:underline">
              fixed-price packages
            </Link>{' '}
            combine them for less than buying each part on its own.
          </p>

          <div className="text-center bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need something custom?</h3>
            <p className="text-gray-600 mb-8">
              Custom software, SaaS platforms, complex integrations and large builds are scoped on a free call, with a fixed quote for each phase.
            </p>
            <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-gray-900 hover:bg-black text-white">
              <Link href={bookHref} data-cta="book-a-free-call">{BOOK_LABEL}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS (renders nothing without reviews) ─────────────────── */}
      <ServiceReviews reviews={reviews} />

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      {/* FAQ (brief 7.4 item 8): answers are in the server HTML */}
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

      {related}

      <CTASection
        headline="Ready to Build Something That Converts?"
        subtext="Book a free 30-minute call and we will map out what your business needs online."
        service="web-development"
      />
    </div>
  );
};

export default ServiceWebDevelopment;
