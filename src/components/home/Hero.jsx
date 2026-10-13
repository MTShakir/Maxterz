'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, MousePointer2, ChevronLeft, ChevronRight, Pause, Play, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProofBar from '@/components/ProofBar';
import { SITE } from '@/lib/site';

/**
 * Shown until the home page has its own slides in hero_slides (page_path "/").
 * Our own logo animation, converted from the old GIF to a muted MP4 with a WebP poster
 * (inventory section 4: no GIFs on the site).
 */
const FALLBACK_SLIDES = [
  {
    id: 'fallback',
    media_type: 'video',
    video_url: '/images/hero/maxterz-logo-animation.mp4',
    poster_url: '/images/hero/maxterz-logo-animation-poster.webp',
    alt_text: 'Maxterz logo animation',
  },
];

const SLIDE_SECONDS = 5;

/**
 * One slide: a still through next/image, or a muted looping video that stays on its poster
 * frame for visitors who prefer reduced motion.
 */
function HeroMedia({ slide, priority, reduceMotion, paused }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    // Browsers hold back playback in hidden tabs, so start (or stop) again when the tab shows.
    const sync = () => {
      if (reduceMotion || paused || document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [reduceMotion, paused]);

  if (slide.media_type === 'video' && slide.video_url) {
    return (
      <video
        ref={videoRef}
        src={slide.video_url}
        poster={slide.poster_url || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={slide.alt_text}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <Image
      src={slide.image_url}
      alt={slide.alt_text}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 600px, 100vw"
      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
    />
  );
}

/**
 * Home hero (brief 7.2, D28). The words are locked: eyebrow, H1, subheading, proof line and both
 * buttons. Slides come from hero_slides on the server (D32) and pass in as props.
 *
 * @param {{
 *   slides?: Array<{ id: string, media_type: string, image_url?: string, video_url?: string, poster_url?: string, alt_text: string }>,
 *   bookHref: string,
 * }} props
 */
const Hero = ({ slides = [], bookHref }) => {
  const items = slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const rotating = items.length > 1 && !paused && !hovered && !reduceMotion;
  const isVideo = (items[currentIndex] ?? items[0]).media_type === 'video';

  useEffect(() => {
    if (!rotating) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, SLIDE_SECONDS * 1000);
    return () => clearInterval(timer);
  }, [rotating, items.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const slide = items[currentIndex] ?? items[0];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 px-4 bg-white">
      {/* Background: muted dot pattern and soft colour (UI rules) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-pattern-dots opacity-70" />
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#1044ff]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#eb7444]/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-gradient-to-r from-[#1044ff]/10 to-[#0020bf]/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Text: visible in the first paint, no fade-in, so the H1 is never hidden */}
          <div className="flex-1 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border-2 border-[#1044ff] rounded-full mb-8 shadow-sm text-sm font-semibold tracking-wide text-gray-700 uppercase">
              Web design, branding and AI agency
            </p>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
              Your Entire Digital Team{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">
                Under One Roof.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-normal mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Brand, website, SEO, social media, video and AI, built by one team with one point of contact. Look established, get found and win more enquiries.
            </p>

            <p className="text-base font-semibold text-gray-800 mb-10">
              {`${SITE.proof.projects} projects since ${SITE.proof.fiverrSince}. ${SITE.proof.fiverrRating} stars from ${SITE.proof.fiverrReviews} reviews on Fiverr.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300">
                <Link href={bookHref} data-cta="book-a-free-call">
                  Book a free strategy call
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 border-[#1044ff] text-[#1044ff] hover:bg-[#1044ff] hover:text-white">
                <Link href="/our-work">
                  <Rocket className="mr-2 w-5 h-5" aria-hidden="true" />
                  See our work
                </Link>
              </Button>
            </div>

            <ProofBar align="start" />
          </div>

          {/* Visual: slides from hero_slides */}
          <motion.div
            initial={{ scale: 0.95, rotate: 3 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full max-w-[600px] lg:max-w-none lg:-mt-12"
          >
            <div className="relative">
              <div className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-500 border-2 border-[#1044ff]">
                <div
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] group bg-gray-100"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label={slides.length > 0 ? 'Recent work' : 'Maxterz logo animation'}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onFocus={() => setHovered(true)}
                  onBlur={() => setHovered(false)}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={slide.id ?? currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${currentIndex + 1} of ${items.length}`}
                    >
                      <HeroMedia slide={slide} priority={currentIndex === 0} reduceMotion={reduceMotion} paused={paused} />
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls: always visible, 44px targets. Anything that moves gets a pause button (WCAG 2.2.2). */}
                  {(items.length > 1 || (isVideo && !reduceMotion)) && (
                    <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm p-1 shadow-lg">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={prevSlide}
                          aria-label="Previous slide"
                          className="w-11 h-11 rounded-full flex items-center justify-center text-[#1044ff] hover:bg-blue-50 transition-colors"
                        >
                          <ChevronLeft size={20} aria-hidden="true" />
                        </button>
                      )}
                      {!reduceMotion && (
                        <button
                          type="button"
                          onClick={() => setPaused((p) => !p)}
                          aria-label={paused ? 'Play' : 'Pause'}
                          className="w-11 h-11 rounded-full flex items-center justify-center text-[#1044ff] hover:bg-blue-50 transition-colors"
                        >
                          {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
                        </button>
                      )}
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={nextSlide}
                          aria-label="Next slide"
                          className="w-11 h-11 rounded-full flex items-center justify-center text-[#1044ff] hover:bg-blue-50 transition-colors"
                        >
                          <ChevronRight size={20} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Floating badge */}
                  <Link
                    href="/our-work"
                    className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg hidden sm:flex items-center gap-3 border-2 border-[#1044ff] z-10 hover:scale-105 transition-transform duration-300"
                  >
                    <span className="bg-[#1044ff] p-2 rounded-lg text-white border border-white">
                      <MousePointer2 size={20} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-600 font-semibold uppercase">Latest projects</span>
                      <span className="block text-sm font-bold text-gray-900">Explore our work</span>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Background decor cards */}
              <div className="absolute top-4 -right-4 w-full h-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] rounded-3xl -z-10 opacity-20 rotate-[3deg] border-2 border-white" aria-hidden="true"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-[#eb7444] to-[#e05220] rounded-3xl -z-20 opacity-10 rotate-[-5deg] border-2 border-white" aria-hidden="true"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
