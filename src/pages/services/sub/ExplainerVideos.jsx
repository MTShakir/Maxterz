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
  Mic,
  Sparkles,
  Volume2,
  Image as ImageIcon,
  Video,
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
const EV_STYLES = `
  @keyframes ev-blink { 0%,100%{opacity:1} 50%{opacity:0} }
`;

const PHRASES = [
  'Convert Viewers.',
  'Close More Demos.',
  'Explain It Fast.',
  'Win More Trials.',
  'Drive More Sign-Ups.',
  'Tell It Simply.',
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
      <span className="inline-block w-[3px] h-[0.82em] bg-[#1044ff] ml-[3px] align-middle" style={{ animation: 'ev-blink 1s ease-in-out infinite' }} />
    </span>
  );
};

/* ─── process steps ──────────────────────────────────────────── */
const steps = [
  {
    n: '01',
    icon: <FileText className="w-5 h-5" />,
    title: 'Creative Brief and Script',
    desc: 'We define your audience, core message, and call to action, then write (or refine) a script built around one clear idea. You approve the script before anything else is touched.',
    mediaType: 'image',
    mediaLabel: 'Creative brief and script from Project X',
    mediaHint: 'Upload a screenshot of the brief or script document from a real project',
  },
  {
    n: '02',
    icon: <LayoutPanelLeft className="w-5 h-5" />,
    title: 'Storyboard',
    desc: 'Every scene is sketched out in a frame-by-frame storyboard, mapping visual flow, motion direction, and timing. Nothing moves until you have signed this off.',
    mediaType: 'image',
    mediaLabel: 'Storyboard from Project X',
    mediaHint: 'Upload a sample storyboard image from a real project',
  },
  {
    n: '03',
    icon: <Mic className="w-5 h-5" />,
    title: 'Voice Over',
    desc: 'A professional voice over recorded to the approved script. You select from multiple voice options and hear the final recording before animation begins.',
    mediaType: 'audio',
    mediaLabel: 'Voice over recording from Project X',
    mediaHint: 'Upload the voice over audio file from a real project here',
  },
  {
    n: '04',
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Animation',
    desc: 'Motion built to the storyboard, synced to the voice over. Typography, character animation, and screen recordings woven into a video that never loses the viewer.',
    mediaType: 'video',
    mediaLabel: 'Animation draft from Project X',
    mediaHint: 'Upload or embed a video preview of the animation in progress',
  },
  {
    n: '05',
    icon: <Volume2 className="w-5 h-5" />,
    title: 'Sound Design',
    desc: 'Background music, SFX, and a final audio mix that polishes the whole piece. The difference between a good video and one that gets watched to the end.',
    mediaType: 'video',
    mediaLabel: 'Final video with sound design from Project X',
    mediaHint: 'Upload the finished explainer video with full sound design applied',
  },
];

const faqData = [
  { q: 'Do you write the script or do I need to provide one?', a: 'We write the script for you on Starter Pro and Enterprise packages. For the Starter package, we refine and optimise a script you provide. All scripts go through at least one round of collaborative feedback before voicing.' },
  { q: 'Can I approve the voice over before animation starts?', a: 'Yes, always. We record the voice over first and share it for your feedback. Animation only begins once the voice over is locked.' },
  { q: 'What is a realistic delivery timeline?', a: 'A standard 60-second explainer takes around 10 to 14 business days from brief to final delivery. Longer videos or those needing character design may take up to 21 days.' },
  { q: 'Can the video be used on my website, ads, and social media?', a: 'Yes. All exports include a web-optimised MP4, a social-format cut (square and vertical), and captions on request. Full commercial licence is included.' },
  { q: 'What if my product or service changes after the video is made?', a: 'We keep source files for 12 months post-delivery. Updates are available at a flat rate depending on scope. Most pricing updates take less than a day.' },
];

/* ─── media placeholder components ─────────────────────────── */
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

const AudioPlaceholder = ({ label, hint, modal = false }) => (
  <div className={`w-full rounded-2xl bg-gray-50 group-hover:bg-white/15 border-2 border-dashed border-gray-200 group-hover:border-white/40 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-all duration-300 ${modal ? 'p-8 min-h-[140px]' : 'p-4 h-28'}`}>
    <div className={`rounded-xl bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300 ${modal ? 'w-12 h-12' : 'w-8 h-8'}`}>
      <Mic className={`text-gray-300 group-hover:text-white/60 transition-colors duration-300 ${modal ? 'w-6 h-6' : 'w-4 h-4'}`} />
    </div>
    <div className={`flex items-center gap-[2px] ${modal ? 'h-8' : 'h-5'}`}>
      {(modal
        ? [6, 10, 14, 8, 18, 12, 6, 20, 16, 10, 14, 8, 20, 12, 6, 18, 14, 10, 8, 16]
        : [3, 5, 7, 4, 9, 6, 3, 10, 8, 5, 7, 4, 10, 6, 3, 9, 7, 5, 4, 8]
      ).map((h, i) => (
        <span key={i} className="w-[2px] bg-gray-200 group-hover:bg-white/40 rounded-full flex-shrink-0 transition-colors duration-300" style={{ height: `${h}px` }} />
      ))}
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

/* ─── component ────────────────────────────────────────────── */
const ExplainerVideos = () => {
  const [packages,         setPackages]         = useState([]);
  const [loadingPackages,  setLoadingPackages]  = useState(true);
  const [caseStudy,        setCaseStudy]        = useState(null);
  const [loadingCS,        setLoadingCS]        = useState(true);
  const [portfolio,        setPortfolio]        = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const go = async () => {
      try { const { data } = await supabase.from('ExplainerVideoPackages').select('*').order('display_order', { ascending: true }); setPackages(data || []); }
      catch (e) { console.error(e); } finally { setLoadingPackages(false); }
    };
    go();
  }, []);

  useEffect(() => {
    const go = async () => {
      try { const { data } = await supabase.from('case_studies').select('*').eq('slug', 'us-restaurant').single(); setCaseStudy(data); }
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
      <style>{EV_STYLES}</style>
      <Helmet>
        <title>Explainer Video Production | Maxterz UK</title>
        <meta name="description" content="Script-to-screen explainer and SaaS demo videos that convert viewers into customers. Maxterz delivers clear, story-driven animation for complex products." />
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col pt-[67px] pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60" />

        <div className="flex-1 w-full flex flex-col justify-center items-center px-4">
          <div className="container mx-auto relative z-10 text-center max-w-5xl mt-12 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <span className="badge-standard-light mb-8">EXPLAINER VIDEOS</span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.05]">
                <span className="block">Complex Products.</span>
                <span className="block">Videos That</span>
                <span className="block text-[#1044ff] min-h-[1.1em]"><TypeWriter /></span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Script-to-screen explainer and SaaS demo videos that make viewers understand what you do in under 90 seconds and want to buy it.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-[#1044ff] hover:bg-[#0020bf] shadow-xl shadow-blue-500/20 w-full sm:w-auto transition-transform hover:scale-105">
                  <Link to="/contact">Start Your Explainer Video <ArrowRight className="ml-2 w-5 h-5" /></Link>
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

        <WorkImageStrip table="ExplainerVideoSlideImages" label="Explainer Video Work" fadeColor="#ffffff" />
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
                    {step.mediaType === 'audio' && <AudioPlaceholder label={step.mediaLabel} hint={step.mediaHint} />}
                    {step.mediaType === 'video' && <VideoPlaceholder label={step.mediaLabel} hint={step.mediaHint} />}
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
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">US Restaurant Brand</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                  A 75-Second Brand Story Video That Became the Restaurant's Most-Shared Marketing Asset
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-light">
                  A US restaurant group needed to explain their sourcing philosophy in a way that felt personal, not corporate. We scripted, voiced, and animated a 75-second story that drove a 38% increase in direct table reservations.
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
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Stories We Have Animated.</h2>
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
                { title: 'SaaS Onboarding Explainer', tag: 'Explainer Video', desc: '90-second animated explainer for a UK fintech onboarding flow.' },
                { title: 'Product Demo Animation', tag: 'Product Video', desc: 'A screen-and-story hybrid that reduced support tickets by 40%.' },
                { title: 'Startup Pitch Video', tag: 'Brand Story', desc: '60-second investor pitch animation with voiceover and motion graphics.' },
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

      {/* ── PACKAGES ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-standard-light">PRICING</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Flat-Rate Packages. <span className="text-[#1044ff]">No Hourly Billing.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">You know the cost upfront. No scope creep, no surprise invoices.</p>
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
            Need a longer video or a unique format?{' '}
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
              key="ev-modal-overlay"
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
                {step.mediaType === 'image' && <ImagePlaceholder label={step.mediaLabel} hint={step.mediaHint} modal />}
                {step.mediaType === 'audio' && <AudioPlaceholder label={step.mediaLabel} hint={step.mediaHint} modal />}
                {step.mediaType === 'video' && <VideoPlaceholder label={step.mediaLabel} hint={step.mediaHint} modal />}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <CTASection />
    </>
  );
};

export default ExplainerVideos;
