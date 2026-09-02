import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Loader2,
  Star,
  ShieldCheck,
  CheckCircle,
  Palette,
  LayoutGrid,
  Printer,
  Share2,
  Lightbulb,
  Pencil,
  Eye,
  Package,
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
  'LOGO DESIGN', 'BRAND IDENTITY', 'TYPOGRAPHY', 'COLOUR THEORY',
  'VISUAL HIERARCHY', 'ICONOGRAPHY', 'PRINT DESIGN', 'SOCIAL VISUALS',
  'MOTION GRAPHICS', 'BRAND GUIDELINES',
];

const manifestoStats = [
  { value: '94%', label: 'of first impressions are made before a single word is read' },
  { value: '3×', label: 'more revenue for brands with consistent visual identity' },
  { value: '7 sec', label: 'is all it takes to form a lasting brand impression' },
];

const services = [
  {
    number: '01',
    icon: <Palette className="w-7 h-7" />,
    title: 'Logo Design and Brand Identity',
    desc: 'Visual identities built to last. Logos, colour systems, typography, and brand guidelines that give your business a consistent, recognisable presence across every touchpoint.',
    link: '/services/branding-design/logo-design',
    linkLabel: 'Explore Service',
    internal: true,
  },
  {
    number: '02',
    icon: <LayoutGrid className="w-7 h-7" />,
    title: 'Thumbnail and Graphic Design',
    desc: 'Scroll-stopping visuals for YouTube, social platforms, and digital campaigns. Engineered to maximise click-through rates and build instant brand recall.',
    link: '/services/branding-design/thumbnail-design',
    linkLabel: 'Explore Service',
    internal: true,
  },
  {
    number: '03',
    icon: <Printer className="w-7 h-7" />,
    title: 'Graphic and Print Design',
    desc: 'Brochures, banners, flyers, business cards, and all marketing collateral designed for both digital and physical media. Print-ready files delivered at every resolution.',
    link: 'https://calendly.com/maxterz-info/30min',
    linkLabel: 'Get a Quote',
    internal: false,
  },
  {
    number: '04',
    icon: <Share2 className="w-7 h-7" />,
    title: 'Social Media Visuals',
    desc: 'Post templates, story graphics, ad creatives, and content calendar assets that keep your brand visually consistent and recognisable across every platform.',
    link: 'https://calendly.com/maxterz-info/30min',
    linkLabel: 'Get a Quote',
    internal: false,
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Brief and Direction',
    desc: 'We learn your brand, audience, and competitors first.',
    icon: <Lightbulb className="w-6 h-6" />,
    tilt: -1.5,
  },
  {
    step: '02',
    title: 'Concepts and Exploration',
    desc: 'Multiple visual directions, not one opinion presented as the answer.',
    icon: <Pencil className="w-6 h-6" />,
    tilt: 1.5,
  },
  {
    step: '03',
    title: 'Refinement and Feedback',
    desc: 'The chosen direction refined in full, revisions included.',
    icon: <Eye className="w-6 h-6" />,
    tilt: -1,
  },
  {
    step: '04',
    title: 'Delivery and Asset Files',
    desc: 'Every format you need, organised and ready to use.',
    icon: <Package className="w-6 h-6" />,
    tilt: 1,
  },
];

const faqs = [
  { q: 'What do you need from me to start a design project?', a: 'A brief, any existing brand assets, examples of design you like or want to move away from, and a clear picture of your audience. We walk through all of this in a kick-off call before anything starts.' },
  { q: 'What file formats are included in delivery?', a: 'All final designs are delivered in PNG, JPG, SVG, and PDF. Where applicable, source files in AI or EPS are included. You get everything needed for print and digital use, properly organised.' },
  { q: 'How do revisions work?', a: 'Revisions are included in every project and do not count against your request credits in the subscription or bundle. We iterate until the result is right, not until the clock runs out.' },
  { q: 'Can I pause or cancel the Design Subscription?', a: 'Yes. Pause with 30 days notice or cancel at the end of any billing cycle. No long-term contracts, no exit fees.' },
  { q: 'What happens when my Design Bundle requests run out?', a: 'You can top up with a new bundle, upgrade to the monthly subscription, or commission individual pieces at a standard project rate.' },
  { q: 'Do you design for print as well as digital?', a: 'Yes. All print work is delivered in the correct colour profiles, bleed settings, and resolution for commercial printing. We flag any print-specific requirements before starting so nothing needs redoing.' },
];

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Branding and Design Services',
      description: 'Logo design, brand identity, graphic design, print design, and social media visuals for businesses worldwide.',
      provider: { '@type': 'Organization', name: 'Maxterz', url: 'https://maxterz.com' },
      areaServed: 'Worldwide',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '7100' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Branding and Design Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logo Design and Brand Identity' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Thumbnail and Graphic Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic and Print Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Visuals' } },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maxterz.com/' },
        { '@type': 'ListItem', position: 2, name: 'Branding and Design', item: 'https://maxterz.com/services/branding-design' },
      ],
    },
  ],
};

/* ─── component ───────────────────────────────────────────────── */

const ServiceBrandingDesign = () => {
  const [caseStudy, setCaseStudy] = useState(null);
  const [loadingCaseStudy, setLoadingCaseStudy] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // case study
      try {
        const { data } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', 'uk-cleaning-company')
          .single();
        setCaseStudy(data);
      } catch (e) {
        console.error('Case study fetch error', e);
      } finally {
        setLoadingCaseStudy(false);
      }

      // portfolio projects
      try {
        const { data } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('category', 'Branding & Design')
          .order('created_at', { ascending: false })
          .limit(3);
        setProjects(data || []);
      } catch (e) {
        console.error('Projects fetch error', e);
      } finally {
        setLoadingProjects(false);
      }

      // branding packages
      try {
        const { data } = await supabase
          .from('brandingDesignPackages')
          .select('*')
          .order('display_order', { ascending: true });
        setPackages(data || []);
      } catch (e) {
        console.error('Packages fetch error', e);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchData();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white selection:bg-[#1044ff] selection:text-white">
      <Helmet>
        <title>Logo Design, Brand Identity and Graphic Design Services | Maxterz</title>
        <meta name="description" content="Logo design, brand identity systems, graphic design, print design, and social media visuals for businesses worldwide. 4.9 stars from 7,100 verified reviews." />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

      {/* ─── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        {/* orange accent blob */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        {/* Centred hero content — flex-1 fills available height */}
        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="badge-standard-light mb-8">BRANDING AND DESIGN</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] text-balance">
                Your Brand Is a Feeling{' '}
                <span className="text-[#1044ff]">Before Is a Design.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                From identity systems and print collateral to scroll-stopping visuals, we design brands that people remember, trust, and choose over competitors.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105"
                >
                  <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                    Book a Brand Consultation
                  </a>
                </Button>
                <Button
                  onClick={() => scrollTo('work-samples')}
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm"
                >
                  See Brand Work <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-gray-800 uppercase tracking-wider mb-8">
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#eb7444] fill-current" /> 4.9 Stars</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1044ff]" /> 7,100 Reviews</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 11,600 Projects</span>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Strip pinned to bottom of hero — full viewport width, no px constraint */}
        <WorkImageStrip table="LogoAndBrandingSlideImages" label="Recent Brand Work" />
      </section>

{/* ─── 3. SIGNATURE SERVICES ────────────────────────────────── */}
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl px-4 pt-20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-standard-light">WHAT WE DO</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mt-4">
              Signature Services.
            </h2>
          </motion.div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 pb-20 flex flex-col gap-4">
          {services.map((service, idx) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-10 py-8 md:py-10 px-6 md:px-10 rounded-[2rem] border border-gray-100 hover:bg-[#1044ff] hover:border-transparent transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                {/* large background number */}
                <span className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-[96px] md:text-[130px] font-black text-gray-100/60 group-hover:text-white/10 select-none leading-none pointer-events-none transition-colors duration-300">
                  {service.number}
                </span>

                {/* left: icon + content */}
                <div className="flex items-start md:items-center gap-5 relative z-10 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1044ff] flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[#1044ff] transition-all duration-300 shadow-sm">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 group-hover:text-white transition-colors duration-300 tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 group-hover:text-white/75 transition-colors duration-300 mt-1.5 text-sm md:text-base leading-relaxed max-w-2xl">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* right: cta */}
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors duration-300 flex-shrink-0 relative z-10 pl-[4.75rem] md:pl-0">
                  {service.linkLabel}
                  <ArrowRight size={15} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </motion.div>
            );

            return service.internal ? (
              <Link key={idx} to={service.link}>{inner}</Link>
            ) : (
              <a key={idx} href={service.link} target="_blank" rel="noopener noreferrer">{inner}</a>
            );
          })}
        </div>
      </section>

      {/* ─── 2. MANIFESTO ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] overflow-hidden">
        {/* Decorative background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[22vw] font-black text-white/[0.05] leading-none tracking-tighter">DESIGN</span>
        </div>

        {/* Marquee strip */}
        <div className="overflow-hidden border-b border-white/15 py-5">
          <style>{`@keyframes bmarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'bmarquee 35s linear infinite' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="text-[#e7811e] mx-2">·</span>
              </span>
            ))}
          </div>
        </div>


        {/* Main content */}
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 mb-8">
              THE MAXTERZ DESIGN PHILOSOPHY
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-16 md:mb-20">
              Design Is Not<br />
              Decoration.<br />
              <span className="text-[#e7811e]">It Is Decision.</span>
            </h2>

            {/* Stats grid */}
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

        {/* Bottom marquee strip */}
        <div className="overflow-hidden border-t border-white/15 py-5">
          <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'bmarquee 25s linear infinite reverse' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="text-white/20 text-[11px] font-bold uppercase tracking-[0.4em] flex-shrink-0">
                {word} <span className="text-[#e7811e]/50 mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CASE STUDY ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">It works. Here is the proof.</h3>

          {loadingCaseStudy ? (
            <div className="flex justify-center items-center py-20 bg-gray-50 rounded-[2rem] border border-gray-100">
              <Loader2 className="animate-spin text-[#1044ff] w-10 h-10" />
            </div>
          ) : caseStudy ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
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
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-[2rem] border border-gray-100">Case study not available.</div>
          )}
        </div>
      </section>

      {/* ─── 5. PROCESS (tilt cards) ──────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">THE CREATIVE PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              From Brief to Brand Asset.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Every great brand starts the same way: with the right questions asked in the right order.
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
                  {/* large step number background */}
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

      {/* ─── 6. RECENT WORK ───────────────────────────────────────── */}
      <section id="work-samples" className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">
                RECENT BRAND WORK
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">The Work Speaks.</h2>
            </div>
            <Link to="/our-work" className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors">
              View all brand work <ArrowRight size={16} />
            </Link>
          </motion.div>

          {loadingProjects ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-white w-10 h-10" /></div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-white/60 border border-white/20 rounded-[2rem]">
              <p className="mb-2 font-semibold">Brand work coming soon.</p>
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

      {/* ─── 7. PACKAGES ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">DESIGN PACKAGES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Start However Makes Sense for You.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Whether you want to try us once, sprint through a campaign, or have design on tap every month.
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
                    {/* badge */}
                    {pkg.badge_text && (
                      <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow ${
                        featured ? 'bg-[#e7811e] text-white' : 'bg-gray-900 text-white'
                      }`}>
                        {pkg.badge_text}
                      </span>
                    )}

                    {/* type label */}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${featured ? 'text-white/50' : 'text-gray-400'}`}>
                      {pkg.type === 'monthly' ? 'Monthly Subscription' : pkg.type === 'bundle' ? 'Request Bundle' : 'Pay Per Request'}
                    </span>

                    {/* name */}
                    <h3 className={`text-2xl font-black tracking-tight leading-tight ${featured ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.name}
                    </h3>

                    {/* price */}
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

                    {/* tagline */}
                    {pkg.tagline && (
                      <p className={`text-sm italic leading-relaxed ${featured ? 'text-white/75' : 'text-gray-500'}`}>
                        "{pkg.tagline}"
                      </p>
                    )}

                    {/* divider */}
                    <div className={`h-px w-full ${featured ? 'bg-white/15' : 'bg-gray-100'}`} />

                    {/* ideal for */}
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

                    {/* features */}
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

                    {/* addon */}
                    {pkg.addon_text && (
                      <div className={`rounded-xl p-4 text-xs leading-relaxed font-medium ${
                        featured ? 'bg-white/10 text-white/70 border border-white/15' : 'bg-gray-50 text-gray-500 border border-gray-100'
                      }`}>
                        {pkg.addon_text}
                      </div>
                    )}

                    {/* cta */}
                    <Button
                      asChild
                      size="lg"
                      className={`rounded-full h-12 text-sm font-bold mt-auto transition-transform hover:scale-105 ${
                        featured
                          ? 'bg-white text-[#1044ff] hover:bg-gray-100 shadow-lg'
                          : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'
                      }`}
                    >
                      <a href={pkg.cta_href || 'https://calendly.com/maxterz-info/30min'} target="_blank" rel="noopener noreferrer">
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
            Not sure which is right for you?{' '}
            <a
              href="https://calendly.com/maxterz-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1044ff] font-semibold hover:underline"
            >
              Book a free 15-minute chat
            </a>{' '}
            and we will point you in the right direction.
          </motion.p>
        </div>
      </section>

      {/* ─── 8. FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
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

      {/* ─── 9. CTA ───────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Build a Brand People Actually Remember?"
        subtext="Book a free brand consultation. We look at where you are, where you need to be, and tell you exactly what it takes to close that gap."
        primaryCTA="Book a Brand Consultation"
        secondaryCTA="View Our Work"
        whatsapp="https://wa.me/447375874706"
        background="orange"
      />
    </div>
  );
};

export default ServiceBrandingDesign;
