import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Loader2,
  CheckCircle,
  Star,
  ShieldCheck,
  Calendar,
  Play,
  FileText,
  LayoutPanelLeft,
  Sparkles,
  Volume2,
  Download,
  Image as ImageIcon,
  Video,
  MonitorPlay,
  X,
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

/* ─── typewriter ─────────────────────────────────────────────── */
const LA_STYLES = `
  @keyframes la-blink { 0%,100%{opacity:1} 50%{opacity:0} }
`;

const PHRASES = [
  'Move.',
  'Alive.',
  'Speak.',
  'Breathe.',
  'Unforgettable.',
];

const TypeWriter = () => {
  const [displayed,  setDisplayed]  = useState('');
  const [phraseIdx,  setPhraseIdx]  = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let delay;
    if (!isDeleting && displayed === phrase) {
      delay = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed === '') {
      delay = setTimeout(() => { setIsDeleting(false); setPhraseIdx((i) => (i + 1) % PHRASES.length); }, 400);
    } else if (isDeleting) {
      delay = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length - 1)), 42);
    } else {
      delay = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 88);
    }
    return () => clearTimeout(delay);
  }, [displayed, phraseIdx, isDeleting]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[3px] h-[0.82em] bg-[#1044ff] ml-[3px] align-middle" style={{ animation: 'la-blink 1s ease-in-out infinite' }} />
    </span>
  );
};

/* ─── process data ────────────────────────────────────────────── */
const steps = [
  {
    n: '01',
    icon: <FileText className="w-5 h-5" />,
    title: 'Creative Brief and Concept',
    desc: 'We learn how your logo currently lives, what movement would represent your brand, and define the motion direction together. You sign off on the concept before anything is animated.',
    mediaType: 'image',
    mediaLabel: 'Sample brief document from Project X',
    mediaHint: 'Upload a screenshot of your creative brief or mood board from a real project',
  },
  {
    n: '02',
    icon: <LayoutPanelLeft className="w-5 h-5" />,
    title: 'Storyboard',
    desc: 'A frame-by-frame storyboard maps every movement before animation begins. You approve this before a single frame is rendered.',
    mediaType: 'image',
    mediaLabel: 'Storyboard from Project X',
    mediaHint: 'Upload a sample storyboard image from a real project',
  },
  {
    n: '03',
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Animation',
    desc: 'The approved storyboard becomes motion. Typography, shape morphs, and transitions are refined to feel sharp, not generic.',
    mediaType: 'video',
    mediaLabel: 'Animation draft from Project X',
    mediaHint: 'Upload or embed a video preview of the animation in progress',
  },
  {
    n: '04',
    icon: <Volume2 className="w-5 h-5" />,
    title: 'Sound Design',
    desc: 'A custom sound effect timed to the motion. Not a stock clip, a designed audio layer that makes the animation complete.',
    mediaType: 'video',
    mediaLabel: 'Final animation with sound from Project X',
    mediaHint: 'Upload the finished animation with sound design applied',
  },
  {
    n: '05',
    icon: <Download className="w-5 h-5" />,
    title: 'Final Exports',
    desc: 'Three ready-to-publish formats delivered: square for social, vertical for Reels and Stories, horizontal for YouTube and presentations.',
    mediaType: 'exports',
    mediaLabel: 'Final exports from Project X',
    mediaHint: 'Upload the three export format previews below',
  },
];

const faqData = [
  { q: 'Can you animate my existing logo without a redesign?', a: 'Yes. We work directly from your existing logo files (SVG, AI, or EPS). No redesign is needed unless you want one.' },
  { q: 'What file formats are included in delivery?', a: 'All packages include MP4 (with and without sound), MOV with transparent background, and GIF for web. Export sizes cover 1:1, 9:16, and 16:9 aspect ratios.' },
  { q: 'How many animation concepts will I see?', a: 'For Brand Motion and Motion Identity packages, you receive two initial direction concepts to choose from. For Quick Sting, we build on a single approved direction from the brief.' },
  { q: 'Can I use my logo animation as a Zoom background or stream overlay?', a: 'Yes. We deliver transparent background versions specifically for overlays, stream graphics, and presentation use.' },
  { q: 'What if I need changes after delivery?', a: 'Each package includes a defined number of revision rounds. After delivery, additional rounds can be added at a flat rate per round.' },
];

/* ─── media placeholder components ───────────────────────────── */
const ImagePlaceholder = ({ label, hint, modal = false }) => (
  <div className={`w-full rounded-2xl bg-gray-50 group-hover:bg-white/15 border-2 border-dashed border-gray-200 group-hover:border-white/40 flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer transition-all duration-300 ${modal ? 'aspect-[16/10]' : 'h-32'}`}>
    <div className={`rounded-xl bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300 ${modal ? 'w-12 h-12' : 'w-8 h-8'}`}>
      <ImageIcon className={`text-gray-300 group-hover:text-white/60 transition-colors duration-300 ${modal ? 'w-6 h-6' : 'w-4 h-4'}`} />
    </div>
    <div>
      <p className={`font-bold text-gray-500 group-hover:text-white/80 transition-colors duration-300 ${modal ? 'text-sm' : 'text-xs'}`}>{label}</p>
      <p className={`text-gray-300 group-hover:text-white/50 mt-0.5 leading-relaxed transition-colors duration-300 ${modal ? 'text-xs max-w-[220px]' : 'text-[10px] max-w-[180px]'}`}>{hint}</p>
    </div>
  </div>
);

const VideoPlaceholder = ({ label, hint, modal = false }) => (
  <div className={`w-full rounded-2xl bg-gray-50 group-hover:bg-white/15 border-2 border-dashed border-gray-200 group-hover:border-white/40 flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer transition-all duration-300 ${modal ? 'aspect-video' : 'h-28'}`}>
    <div className={`rounded-xl bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300 ${modal ? 'w-12 h-12' : 'w-8 h-8'}`}>
      <Video className={`text-gray-300 group-hover:text-white/60 transition-colors duration-300 ${modal ? 'w-6 h-6' : 'w-4 h-4'}`} />
    </div>
    <div>
      <p className={`font-bold text-gray-500 group-hover:text-white/80 transition-colors duration-300 ${modal ? 'text-sm' : 'text-xs'}`}>{label}</p>
      <p className={`text-gray-300 group-hover:text-white/50 mt-0.5 leading-relaxed transition-colors duration-300 ${modal ? 'text-xs max-w-[220px]' : 'text-[10px] max-w-[180px]'}`}>{hint}</p>
    </div>
  </div>
);

const ExportsPlaceholder = ({ hint, modal = false }) => modal ? (
  <div className="w-full space-y-3">
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Square 1:1', cls: 'aspect-square', rot: '' },
        { label: 'Vertical 9:16', cls: 'aspect-[9/16]', rot: 'rotate-90' },
        { label: 'Horizontal 16:9', cls: 'aspect-video col-span-3', rot: '' },
      ].map(({ label, cls, rot }) => (
        <div key={label} className={`${cls} rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 p-3 text-center`}>
          <MonitorPlay className={`w-5 h-5 text-gray-300 ${rot}`} />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        </div>
      ))}
    </div>
    <p className="text-xs text-gray-300 text-center leading-relaxed">{hint}</p>
  </div>
) : (
  <div className="w-full rounded-2xl bg-gray-50 group-hover:bg-white/15 border-2 border-dashed border-gray-200 group-hover:border-white/40 p-4 cursor-pointer transition-all duration-300">
    <div className="flex items-end gap-2 mb-2">
      <div className="h-[60px] w-[60px] rounded-lg bg-gray-100/80 group-hover:bg-white/20 border border-dashed border-gray-200 group-hover:border-white/30 flex flex-col items-center justify-center gap-1 flex-shrink-0 transition-all duration-300">
        <MonitorPlay className="w-3.5 h-3.5 text-gray-300 group-hover:text-white/50 transition-colors duration-300" />
        <p className="text-[9px] font-bold text-gray-400 group-hover:text-white/60 uppercase transition-colors duration-300">1:1</p>
      </div>
      <div className="h-[76px] w-[44px] rounded-lg bg-gray-100/80 group-hover:bg-white/20 border border-dashed border-gray-200 group-hover:border-white/30 flex flex-col items-center justify-center gap-1 flex-shrink-0 transition-all duration-300">
        <MonitorPlay className="w-3.5 h-3.5 text-gray-300 group-hover:text-white/50 rotate-90 transition-colors duration-300" />
        <p className="text-[9px] font-bold text-gray-400 group-hover:text-white/60 uppercase transition-colors duration-300">9:16</p>
      </div>
      <div className="flex-1 h-[44px] rounded-lg bg-gray-100/80 group-hover:bg-white/20 border border-dashed border-gray-200 group-hover:border-white/30 flex items-center justify-center gap-1.5 transition-all duration-300">
        <MonitorPlay className="w-3.5 h-3.5 text-gray-300 group-hover:text-white/50 transition-colors duration-300" />
        <p className="text-[9px] font-bold text-gray-400 group-hover:text-white/60 uppercase transition-colors duration-300">16:9</p>
      </div>
    </div>
    <p className="text-[10px] text-gray-300 group-hover:text-white/40 text-center leading-relaxed transition-colors duration-300">{hint}</p>
  </div>
);

/* ─── component ──────────────────────────────────────────────── */
const LogoAnimation = () => {
  const [packages,        setPackages]        = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [caseStudy,       setCaseStudy]       = useState(null);
  const [loadingCS,       setLoadingCS]       = useState(true);
  const [portfolio,       setPortfolio]       = useState([]);
  const [loadingPortfolio,setLoadingPortfolio]= useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const go = async () => {
      try { const { data } = await supabase.from('LogoAnimationPackages').select('*').order('display_order', { ascending: true }); setPackages(data || []); }
      catch (e) { console.error(e); } finally { setLoadingPackages(false); }
    };
    go();
  }, []);

  useEffect(() => {
    const go = async () => {
      try { const { data } = await supabase.from('case_studies').select('*').eq('slug', 'uk-cleaning-company').single(); setCaseStudy(data); }
      catch (e) { console.error(e); } finally { setLoadingCS(false); }
    };
    go();
  }, []);

  useEffect(() => {
    const go = async () => {
      try { const { data } = await supabase.from('portfolio_projects').select('*').eq('category', 'Video & Animation').order('created_at', { ascending: false }).limit(3); setPortfolio(data || []); }
      catch (e) { console.error(e); } finally { setLoadingPortfolio(false); }
    };
    go();
  }, []);

  return (
    <>
      <style>{LA_STYLES}</style>
      <Helmet>
        <title>Logo Animation Services | Maxterz UK</title>
        <meta name="description" content="Bespoke logo animations for intros, outros, overlays, and social. Maxterz delivers motion identity that makes your brand impossible to forget." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <span className="badge-standard-light mb-8">LOGO ANIMATION</span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Your Logo.</span>
                <span className="block">Make It</span>
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Bespoke logo animations for intros, outros, stream overlays, and social. Motion built around your brand, not a template.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link to="/contact">Start Your Logo Animation <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 w-full sm:w-auto bg-white/80">
                  <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 w-5 h-5" /> Book a Free Call
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

        <WorkImageStrip table="LogoAnimationSlideImages" label="Logo Animation Work" fadeColor="#ffffff" />
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="badge-standard-light">OUR PROCESS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
              Five Steps. Zero Surprises.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              We involve you at every stage. Each step is approved before the next begins, not a surprise delivery misaligned with your vision.
            </p>
          </motion.div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08 }}
                className="relative group bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1044ff] to-[#0020bf] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
                  {/* Step meta */}
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-5xl font-black text-gray-100 group-hover:text-white/20 leading-none select-none tabular-nums transition-colors duration-300">{step.n}</span>
                      <div className="w-10 h-10 rounded-xl bg-[#1044ff]/10 border border-[#1044ff]/15 group-hover:bg-white/20 group-hover:border-white/30 flex items-center justify-center text-[#1044ff] group-hover:text-white flex-shrink-0 transition-all duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-white mb-3 tracking-tight transition-colors duration-300">{step.title}</h3>
                    <p className="text-gray-500 group-hover:text-white/75 text-sm leading-relaxed transition-colors duration-300">{step.desc}</p>
                  </div>

                  {/* Media placeholder */}
                  <div className="w-full md:w-1/2 flex-shrink-0" onClick={() => setActiveModal(step.n)}>
                    {step.mediaType === 'image' && <ImagePlaceholder label={step.mediaLabel} hint={step.mediaHint} />}
                    {step.mediaType === 'video' && <VideoPlaceholder label={step.mediaLabel} hint={step.mediaHint} />}
                    {step.mediaType === 'exports' && <ExportsPlaceholder hint={step.mediaHint} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="badge-standard-light">CASE STUDY</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">It Works. Here Is the Proof.</h2>
          </motion.div>

          {loadingCS ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#1044ff]" /></div>
          ) : !caseStudy ? (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500"
            >
              <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden aspect-[4/3] md:h-[360px] flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 flex items-center justify-center">
                <Play className="w-12 h-12 text-[#1044ff]/40" />
              </div>
              <div className="w-full md:w-1/2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">UK Cleaning Brand</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                  A Static Logo Turned Into a Motion Identity Used Across YouTube, Instagram, and Live Events
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-light">
                  A UK cleaning company's rebrand included a full motion identity. Five logo animations, sound design, and all export formats. Now used in every video, social post, and presentation.
                </p>
                <Button asChild className="rounded-full bg-[#1044ff] hover:bg-[#0020bf] text-white px-8 h-12 shadow-lg shadow-blue-500/20">
                  <Link to="/our-work">See Our Work <ArrowUpRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
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
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#1044ff] p-5 rounded-r-xl mb-6 w-full shadow-sm">
                    <p className="text-[#1044ff] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><CheckCircle size={14} /> Key Result</p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{caseStudy.key_result}</p>
                  </div>
                )}
                {caseStudy.cta_href && (
                  <Button asChild className="rounded-full bg-[#1044ff] hover:bg-[#0020bf] text-white px-8 h-12 shadow-lg shadow-blue-500/20">
                    <Link to={caseStudy.cta_href}>View Case Study <ArrowUpRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── RECENT WORK ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1044ff] to-[#0020bf]">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="inline-block border border-white/30 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">RECENT WORK</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Motion We Are Proud Of.</h2>
            </div>
            <Link to="/our-work" className="text-white hover:text-white/80 flex items-center gap-2 font-semibold transition-colors">
              View all work <ArrowRight size={16} />
            </Link>
          </motion.div>

          {loadingPortfolio ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-white" /></div>
          ) : portfolio.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'SaaS Brand Logo Animation', tag: 'Logo Animation', desc: 'Full motion identity with 4 stings and social formats.' },
                { title: 'E-Commerce Store Intro', tag: 'Logo Animation', desc: 'Animated logo intro for YouTube and TikTok.' },
                { title: 'Agency Rebrand Motion Suite', tag: 'Motion Identity', desc: 'Logo animation system across all brand touchpoints.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white"
                >
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1044ff]/10 border border-[#1044ff]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-[#1044ff] fill-[#1044ff] ml-0.5" />
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
                  className="group cursor-pointer bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white"
                >
                  <Link to={`/our-work/${proj.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={proj.title} src={proj.main_image} />
                      <div className="absolute inset-0 bg-[#1044ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={32} className="text-[#1044ff]" />
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pb-3 flex-grow flex flex-col">
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

      {/* ── PACKAGES ────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">PRICING</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Pick Your Package. <span className="text-[#1044ff]">We Handle the Rest.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">Transparent, flat-rate pricing. No hourly billing, no scope surprises.</p>
          </motion.div>

          {loadingPackages ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#1044ff]" /></div>
          ) : packages.length === 0 ? (
            <div className="text-center text-gray-400 py-10">Packages coming soon.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {packages.map((pkg, i) => {
                const isFeatured = pkg.is_featured;
                const features   = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : (pkg.features || []);
                const typeSuffix = pkg.package_type === 'monthly' ? '/month' : ' one-time';
                return (
                  <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                    className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col gap-5 border transition-all duration-300 ${
                      isFeatured
                        ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] border-transparent shadow-2xl shadow-blue-500/25 scale-[1.02]'
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {isFeatured && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow bg-[#e7811e] text-white">
                        Most Popular
                      </span>
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isFeatured ? 'text-white/50' : 'text-gray-400'}`}>
                      {pkg.package_type === 'monthly' ? 'Monthly Retainer' : 'One-Time Project'}
                    </span>
                    <h3 className={`text-2xl font-black tracking-tight ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{pkg.name}</h3>
                    {pkg.description && <p className={`text-sm leading-relaxed ${isFeatured ? 'text-white/75' : 'text-gray-500'}`}>{pkg.description}</p>}
                    <div className="flex items-end gap-1">
                      <span className={`text-5xl font-black tracking-tighter ${isFeatured ? 'text-white' : 'text-gray-900'}`}>£{Number(pkg.price).toLocaleString()}</span>
                      <span className={`text-lg font-semibold mb-1.5 ${isFeatured ? 'text-white/60' : 'text-gray-500'}`}>{typeSuffix}</span>
                    </div>
                    <div className={`h-px w-full ${isFeatured ? 'bg-white/15' : 'bg-gray-100'}`} />
                    <ul className="flex flex-col gap-3 flex-grow">
                      {features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-3">
                          <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 ${isFeatured ? 'text-white/60' : 'text-[#1044ff]'}`} />
                          <span className={`text-sm leading-relaxed ${isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild size="lg" className={`rounded-full h-12 text-sm font-bold mt-auto transition-transform hover:scale-105 ${isFeatured ? 'bg-white text-[#1044ff] hover:bg-gray-100 shadow-lg' : 'bg-[#1044ff] text-white hover:bg-[#0020bf]'}`}>
                      <Link to="/contact">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}

          <p className="text-center text-gray-400 text-sm mt-10">
            Need something custom?{' '}
            <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer" className="text-[#1044ff] font-semibold hover:underline">
              Book a free 15-minute chat.
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
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

      {/* ── PROCESS STEP MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {activeModal !== null && (() => {
          const step = steps.find(s => s.n === activeModal);
          if (!step) return null;
          return (
            <motion.div
              key="la-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                className="bg-white rounded-[2rem] p-8 max-w-2xl w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-gray-100 tabular-nums leading-none">{step.n}</span>
                    <h3 className="text-xl font-extrabold text-gray-900">{step.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {step.mediaType === 'image'   && <ImagePlaceholder label={step.mediaLabel} hint={step.mediaHint} modal />}
                {step.mediaType === 'video'   && <VideoPlaceholder label={step.mediaLabel} hint={step.mediaHint} modal />}
                {step.mediaType === 'exports' && <ExportsPlaceholder hint={step.mediaHint} modal />}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <CTASection />
    </>
  );
};

export default LogoAnimation;
