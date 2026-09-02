import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, CheckCircle, ArrowUpRight, Loader2, Star, ShieldCheck, Layers, Zap, Smartphone, Code2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import TrustBar from '@/components/TrustBar';
import PackageCard from '@/components/packages/PackageCard';
import CTASection from '@/components/home/CTASection';

const AnimatedNumber = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, duration, count]);

  return (
    <span ref={ref} className="inline-block">
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

const MobileAppDevelopment = () => {
  const [caseStudy, setCaseStudy] = useState(null);
  const [loadingCaseStudy, setLoadingCaseStudy] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [hoveredApproach, setHoveredApproach] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', 'restaurant-management-system')
          .single();
        setCaseStudy(data);
      } catch (e) {
        console.error("Error fetching case study", e);
      } finally {
        setLoadingCaseStudy(false);
      }

      try {
        const { data } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('category', 'Web Development')
          .order('created_at', { ascending: false })
          .limit(3);
        setProjects(data || []);
      } catch (e) {
        console.error("Error fetching projects", e);
      } finally {
        setLoadingProjects(false);
      }

      try {
        const { data } = await supabase
          .from('packages_one_time')
          .select('*')
          .in('name', ['Brand Presence Kit', 'Growth Launchpad', 'Digital Authority Kit'])
          .order('display_order', { ascending: true });
        setPackages(data || []);
      } catch (e) {
        console.error("Error fetching packages", e);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchData();
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
        "name": "Mobile App Development",
        "description": "Custom mobile apps for iOS and Android built around your workflows, your customers, and your growth goals.",
        "provider": {
          "@type": "Organization",
          "name": "Maxterz"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "7100"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://maxterz.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://maxterz.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Mobile App Development", "item": "https://maxterz.com/services/web-development/mobile-app-development" }
        ]
      }
    ]
  };

  const faqs = [
    { q: "Do you build for both iOS and Android?", a: "Yes. We build cross-platform using React Native or Flutter so your app works on both from a single codebase, cutting cost without compromising quality." },
    { q: "How long does a mobile app take to build?", a: "Most apps take 8 to 16 weeks depending on complexity, number of screens, and integrations required. We scope this precisely during discovery." },
    { q: "Do I own the code after the project?", a: "Yes. Full source code, all assets, and all credentials are handed over at project completion. No lock-in." },
    { q: "Can you integrate the app with our existing systems?", a: "Yes. We connect to existing databases, CRMs, payment systems, booking tools, and APIs as part of the build scope." },
    { q: "Do you handle App Store and Google Play submission?", a: "Yes. Submission to both stores is included. We manage the technical requirements, compliance review, and version configuration." },
    { q: "What if I only have an idea and no specification?", a: "That is how most projects start. Our discovery process turns your idea into a scoped, costed plan with wireframes before any development begins." }
  ];

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      <Helmet>
        <title>Mobile App Development for Businesses | Maxterz</title>
        <meta name="description" content="Custom mobile apps for iOS and Android. Built around your workflows, your customers, and your growth goals. 4.9 stars from 7,100 verified reviews." />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />

        <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="badge-standard-light mb-8">MOBILE APP DEVELOPMENT</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.1] text-balance">
              Your Customers Are on Their Phones. <span className="text-[#1044ff]">Meet Them There.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Most businesses still rely on websites while their customers are already living inside apps. There is a gap, and your competitors are filling it.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                  Discuss Your App Idea
                </a>
              </Button>
              <Button onClick={() => scrollTo('work-samples')} variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm">
                See Our Work <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider mb-8">
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#eb7444] fill-current" /> 4.9 Stars</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" /> 7,100 Reviews</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 11,600 Projects</span>
            </div>

            <TrustBar />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — THE COST */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-y border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block border border-white/20 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">WHY AN APP MATTERS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">What Not Having an App Is Costing You.</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { val: 90, suf: "%", title: "Mobile time is spent inside apps, not browsers.", desc: "Your website is the last place your customers actually want to interact with your business on their phone.", color: "text-[#1044ff]" },
              { val: 7, suf: "x", title: "Higher engagement from push notifications vs email.", desc: "Direct communication with your customers, with no algorithm deciding whether they see it.", color: "text-[#eb7444]" },
              { val: 85, suf: "%", title: "Prefer apps for repeat tasks over mobile websites.", desc: "Once a customer downloads your app, your retention rate changes completely.", color: "text-[#1044ff]" },
              { textVal: "8 to 16", title: "Weeks to a fully launched cross-platform app.", desc: "Most businesses assume an app takes years. With the right process, yours can be live in a matter of months.", color: "text-[#eb7444]" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className="group relative bg-white rounded-[1rem] px-4 py-6 md:py-8 shadow-xl border border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col items-center justify-start text-center h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff]/0 to-[#f0f4ff]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className={`text-4xl md:text-5xl lg:text-6xl font-black ${stat.color} mb-3 tracking-tighter relative z-10`}>
                  {stat.textVal ? <span>{stat.textVal}</span> : <AnimatedNumber value={stat.val} suffix={stat.suf} />}
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

      {/* SECTION 3 — OUTCOMES */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">WHAT CHANGES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">What the Right App Does for Your Business.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Keeps customers engaged and coming back.", desc: "Push notifications, in-app offers, and seamless UX that keep your brand front of mind without relying on social media algorithms." },
              { title: "Automates what your team does manually.", desc: "From booking flows to order management and internal tools, the right app removes operational drag and frees up time." },
              { title: "Builds a direct channel to your customer.", desc: "No platform dependency. No algorithm. Just your brand, in your customer's pocket, always one tap away." }
            ].map((outcome, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative h-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] p-[18px] sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col border-2 border-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />
                <div className="mb-6 md:mb-8 inline-flex p-3 sm:p-4 rounded-[1rem] md:rounded-2xl bg-white/10 backdrop-blur-sm w-fit group-hover:bg-gradient-to-r group-hover:from-[#eb7444] group-hover:to-[#e05220] transition-all duration-300 border border-white shadow-lg relative z-10">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
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

      {/* CASE STUDY INSERTION */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">It works. Here is the proof.</h3>

          {loadingCaseStudy ? (
            <div className="flex justify-center items-center py-20 bg-gray-50 rounded-[2rem] border border-gray-100"><Loader2 className="animate-spin text-[#1044ff] w-10 h-10" /></div>
          ) : caseStudy ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
            >
              <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-auto md:h-[400px] flex-shrink-0 relative">
                {caseStudy.image_url ? (
                  <img src={caseStudy.image_url} alt={caseStudy.title || "Case study"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start py-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">Case Study</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{caseStudy.title}</h3>
                <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed font-light">{caseStudy.description}</p>
                {caseStudy.key_result && (
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#1044ff] p-5 rounded-r-xl w-full shadow-sm">
                    <p className="text-[#1044ff] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><CheckCircle size={14} /> Key Result</p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{caseStudy.key_result}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-[2rem] border border-gray-100">Case study not available.</div>
          )}
        </div>
      </section>

      {/* SECTION 4 — APPROACH */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">HOW WE BUILD IT</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built for the Real World, Not a Demo.</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 md:gap-0 [perspective:1200px] py-10">
            {[
              { icon: <Smartphone className="w-8 h-8" />, title: "iOS and Android, built once.", desc: "Cross-platform development means you reach all users without doubling the cost or maintaining two separate codebases." },
              { icon: <Layers className="w-8 h-8" />, title: "UX before UI.", desc: "Every tap, swipe, and user flow is mapped and tested before a single screen is designed. Bad UX is expensive to fix after the build." },
              { icon: <Code2 className="w-8 h-8" />, title: "Backend built alongside the app.", desc: "APIs, databases, and admin panels are part of the build, not bolted on after. Everything works together from day one." },
              { icon: <Zap className="w-8 h-8" />, title: "App Store launch included.", desc: "We handle submission, compliance requirements, and version management for both the App Store and Google Play." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                onMouseEnter={() => setHoveredApproach(idx)}
                onMouseLeave={() => setHoveredApproach(null)}
                className="relative w-full max-w-[340px] bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:-ml-8 transition-all duration-500 ease-out flex flex-col group shrink-0"
                style={{
                  zIndex: hoveredApproach === idx ? 50 : 10 - idx,
                  transform: typeof window !== 'undefined' && window.innerWidth >= 768
                    ? hoveredApproach === idx
                      ? 'rotateY(0deg) scale(1.05) translateY(-16px)'
                      : 'rotateY(-12deg) scale(0.95)'
                    : 'none'
                }}
              >
                <div className="w-14 h-14 bg-blue-50/80 rounded-2xl flex items-center justify-center text-[#1044ff] mb-6 group-hover:scale-110 group-hover:bg-[#1044ff] group-hover:text-white transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-4 leading-tight group-hover:text-[#1044ff] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">{item.desc}</p>
                <div className="mt-auto pt-4 flex items-center text-sm font-bold text-gray-300 group-hover:text-[#1044ff] transition-colors uppercase tracking-widest">
                  Step 0{idx + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — PROCESS */}
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
                { step: "01", title: "Discovery and Scoping", desc: "We map every user flow, integration, and screen before design begins. You get a detailed spec and cost before committing to development." },
                { step: "02", title: "Design and Prototype", desc: "A clickable prototype is built and tested with real user feedback before any development starts." },
                { step: "03", title: "Development and QA", desc: "Full build, backend integration, and thorough QA across real devices. No emulators, no assumptions." },
                { step: "04", title: "Launch and Support", desc: "App Store submission, launch-day support, and 30 days of post-launch coverage included as standard." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
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

      {/* SECTION 6 — WORK SAMPLES */}
      <section id="work-samples" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">OUR WORK</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Recent Projects.</h2>
            </div>
            <Link to="/our-work" className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors">
              View all projects <ArrowRight size={16} />
            </Link>
          </motion.div>

          {loadingProjects ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-white w-10 h-10" /></div>
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
                  <Link to={`/our-work/${project.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-900">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={project.title} src={project.main_image} />
                      <div className="absolute inset-0 bg-[#1044ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#1044ff]" />
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pb-3 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">{project.title}</h3>
                      <p className="text-gray-400 font-medium text-sm line-clamp-2 leading-relaxed">{project.short_description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7 — PACKAGES */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">APP PACKAGES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Choose Your Starting Point.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fixed scope. Fixed price. No hidden costs.</p>
          </motion.div>

          {loadingPackages ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#1044ff] w-10 h-10" /></div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-[2rem] border border-gray-100">No packages available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg, idx) => (
                <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}>
                  <PackageCard {...pkg} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Building something more complex?</h3>
            <p className="text-gray-600 mb-8">Multi-role apps, custom APIs, third-party integrations, and enterprise-level systems are scoped as bespoke projects with a detailed specification and fixed quote.</p>
            <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-gray-900 hover:bg-black text-white">
              <Link to="/contact">Get a Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
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
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-gray-50 px-6 rounded-2xl border border-gray-100">
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

      {/* SECTION 9 — FINAL CTA */}
      <CTASection
        headline="Ready to Build Something Your Customers Will Actually Use?"
        subtext="Book a free 30-minute strategy call. We map out your app, the tech required, and what it would cost to build it right."
        primaryCTA="Book a Strategy Call"
        secondaryCTA="Get a Project Quote"
        whatsapp="https://wa.me/447375874706"
        background="orange"
      />
    </div>
  );
};

export default MobileAppDevelopment;
