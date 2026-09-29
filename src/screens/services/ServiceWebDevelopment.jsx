'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Loader2,
  LayoutTemplate,
  ShoppingCart,
  Smartphone,
  Search,
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
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';

import TrustBar from '@/components/TrustBar';
import PackageCard from '@/components/packages/PackageCard';
import CTASection from '@/components/home/CTASection';

const ServiceWebDevelopment = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [packagesError, setPackagesError] = useState(null);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    setProjectsError(null);
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('category', 'Web Development')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      setProjects(data || []);
    } catch (e) {
      console.error("Error fetching projects", e);
      setProjectsError(e.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchPackages = async () => {
    setLoadingPackages(true);
    setPackagesError(null);
    try {
      const { data, error } = await supabase
        .from('packages_one_time')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(3);
      if (error) throw error;
      setPackages(data || []);
    } catch (e) {
      console.error("Error fetching packages", e);
      setPackagesError(e.message);
    } finally {
      setLoadingPackages(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchPackages();
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Web and App Development Services",
        "description": "Full-stack web development, custom software, SaaS platforms, mobile apps, AI integrations, and ecommerce builds for businesses worldwide.",
        "provider": { "@type": "Organization", "name": "Maxterz", "url": "https://maxterz.com" },
        "areaServed": "Worldwide",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "7100" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web Development Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Website Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ecommerce Website Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Platform Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Integration Development" } }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://maxterz.com/" },
          { "@type": "ListItem", "position": 2, "name": "Web Development", "item": "https://maxterz.com/services/web-development" }
        ]
      }
    ]
  };

  const additionalServices = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Custom Software Development",
      desc: "Bespoke applications built around your exact workflows. No off-the-shelf compromises. Software that solves the actual problem, not a generic version of it.",
      tag: "Most Requested",
      tagStyle: "bg-white/15 text-white border border-white/20",
      variant: "dark",
      large: true,
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "UI/UX Design and Prototyping",
      desc: "Research-backed design systems and clickable prototypes that reduce development risk and increase conversion before a single line of code is written.",
      variant: "light",
      large: false,
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "CRM Development and Integration",
      desc: "Custom CRM builds or Salesforce, HubSpot, and Pipedrive integrations tailored to your actual sales process, not the vendor's default.",
      variant: "blue",
      large: false,
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Full SaaS Platform Development",
      desc: "Multi-tenant SaaS products with recurring billing, onboarding flows, user role management, usage analytics, and admin dashboards built to scale.",
      variant: "light",
      large: true,
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Integration and Intelligent Features",
      desc: "Embed LLMs, AI chatbots, recommendation engines, and intelligent automations directly into your product or website. Built on real APIs, not wrappers.",
      tag: "Trending",
      tagStyle: "bg-white/20 text-white border border-white/30",
      variant: "orange",
      large: false,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Progressive Web Apps (PWAs)",
      desc: "App-like web experiences that work offline, install to home screens, and load instantly. Reach mobile users without App Store dependency.",
      variant: "light",
      large: false,
    },
    {
      icon: <Plug className="w-6 h-6" />,
      title: "API Development and Third-Party Integrations",
      desc: "REST and GraphQL APIs, webhook pipelines, and custom integrations that connect your entire tech stack and eliminate manual data handling.",
      variant: "dark",
      large: false,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Membership and Subscription Platforms",
      desc: "Gated content, recurring billing via Stripe, member portals, and loyalty features built for businesses that run on recurring revenue.",
      variant: "blue",
      large: true,
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
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
      cta: "text-gray-500 group-hover:text-white",
    },
    blue: {
      card: "bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent",
      icon: "bg-white/15 text-white group-hover:bg-white group-hover:text-[#1044ff]",
      title: "text-white",
      desc: "text-white/75",
      cta: "text-white/50 group-hover:text-white",
    },
    orange: {
      card: "bg-gradient-to-br from-[#e7811e] to-[#e7581e] border-transparent",
      icon: "bg-white/20 text-white",
      title: "text-white",
      desc: "text-white/85",
      cta: "text-white/60 group-hover:text-white",
    },
    light: {
      card: "bg-white border-gray-100 hover:border-blue-100 hover:shadow-xl",
      icon: "bg-blue-50 text-[#1044ff] group-hover:bg-[#1044ff] group-hover:text-white",
      title: "text-gray-900 group-hover:text-[#1044ff]",
      desc: "text-gray-500",
      cta: "text-gray-300 group-hover:text-[#1044ff]",
    },
  };

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>

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
            <span className="badge-standard-light mb-8">WEB & APP DEVELOPMENT</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.1] text-balance">
              Websites and Apps That <span className="text-[#1044ff]">Work as Hard as You Do.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              From business websites to ecommerce stores, mobile apps to full SaaS platforms, built for performance, search visibility, and results that show in your numbers.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                  Book a Free Consultation
                </a>
              </Button>
              <Button onClick={() => scrollTo('work-samples')} variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-gray-50">
                See Our Work <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <TrustBar />
          </motion.div>
        </div>
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
            <span className="badge-standard-light">OUR SPECIALTIES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Dedicated Solutions.</h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Three core web development services with dedicated teams, proven processes, and full subpages to explore.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <LayoutTemplate size={32} />,
                title: "Business Website Design",
                desc: "High-converting, SEO-ready websites that establish credibility and turn visitors into enquiries.",
                link: "/services/web-development/business-website-design",
              },
              {
                icon: <ShoppingCart size={32} />,
                title: "Ecommerce Website Design",
                desc: "Online stores engineered to reduce cart abandonment, increase average order value, and sell 24/7.",
                link: "/services/web-development/ecommerce-website-design",
              },
              {
                icon: <Smartphone size={32} />,
                title: "Mobile App Development",
                desc: "Cross-platform iOS and Android apps that increase customer retention and open new revenue channels.",
                link: "/services/web-development/mobile-app-development",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
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
                  <p className="text-gray-600 mb-8 flex-grow relative z-10 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="flex items-center text-[#1044ff] font-bold text-sm uppercase tracking-wider relative z-10 mt-auto">
                    Explore Service <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
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
                  key={idx}
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

                  {/* footer cta */}
                  <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mt-auto pt-2 transition-all duration-300 ${s.cta}`}>
                    <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:gap-3 transition-all duration-200">
                      Get a quote <ArrowRight size={13} />
                    </a>
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
            className="text-center text-gray-400 text-sm mt-8"
          >
            Not sure what you need?{' '}
            <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer" className="text-[#1044ff] font-semibold hover:underline">
              Book a free 30-minute call
            </a>{' '}
            and we will scope it with you.
          </motion.p>
        </div>
      </section>

      {/* ─── WHY MAXTERZ ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WHY MAXTERZ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built Around Revenue, Not Just Deliverables.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Search />,
                title: "SEO from day one",
                desc: "Site architecture, page structure, and content built for organic search before the first line of code.",
              },
              {
                icon: <Zap />,
                title: "Speed without compromise",
                desc: "Fast-loading, optimised Core Web Vitals scores. A ranking signal and a conversion signal at once.",
              },
              {
                icon: <Target />,
                title: "Conversion-focused design",
                desc: "Every page has a single clear purpose. Design follows that purpose, not personal preference.",
              },
              {
                icon: <Unlock />,
                title: "You own everything",
                desc: "Full handover of source code, credentials, and documentation. No recurring access fees.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
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

      {/* ─── WORK SAMPLES ─────────────────────────────────────────────── */}
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
              View all projects <ArrowRight size={16} />
            </Link>
          </motion.div>

          {loadingProjects ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-white w-10 h-10" /></div>
          ) : projectsError ? (
            <div className="text-center py-20 text-white/70 border border-white/20 rounded-[2rem] bg-white/5">
              <p className="mb-4">Failed to load projects.</p>
              <Button onClick={fetchProjects} variant="outline" className="bg-transparent text-white hover:bg-white hover:text-blue-900">
                Retry
              </Button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-white/70 border border-white/20 rounded-[2rem]">No projects found.</div>
          ) : (
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
                          <ArrowUpRight size={32} className="text-[#1044ff]" />
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
          )}
        </div>
      </section>

      {/* ─── PACKAGES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WEB DEVELOPMENT PACKAGES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Choose Your Starting Point.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fixed scope. Fixed price. No hidden costs.</p>
          </motion.div>

          {loadingPackages ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#1044ff] w-10 h-10" /></div>
          ) : packagesError ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-[2rem] border border-gray-100">
              <p className="mb-4">Failed to load packages.</p>
              <Button onClick={fetchPackages} variant="outline">Retry</Button>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-[2rem] border border-gray-100">No packages available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <PackageCard {...pkg} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a custom scope?</h3>
            <p className="text-gray-600 mb-8">Custom software, SaaS platforms, complex integrations, and large-scale builds are scoped as bespoke projects with a fixed quote.</p>
            <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-gray-900 hover:bg-black text-white">
              <Link href="/contact">Get a Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Build Something That Converts?"
        subtext="Book a free consultation and we will map out exactly what your business needs online."
        primaryCTA="Book Free Consultation"
        secondaryCTA="Get a Custom Quote"
        whatsapp="https://wa.me/447375874706"
        background="orange"
      />
    </div>
  );
};

export default ServiceWebDevelopment;
