'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, MousePointer2, ChevronLeft, ChevronRight, Calendar, Mail, Rocket, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import * as Dialog from '@radix-ui/react-dialog';

const WhatsAppIcon = ({ className, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Hero = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_section_images')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setImages(data);
        } else {
          setImages([
            { id: 1, image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000', alt_text: 'Futuristic digital art' },
            { id: 2, image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000', alt_text: 'Tech workspace' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
        setImages([
          { id: 1, image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000', alt_text: 'Futuristic digital art' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 px-4 bg-white">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#1044ff]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#eb7444]/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-gradient-to-r from-[#1044ff]/10 to-[#0020bf]/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border-2 border-[#1044ff] rounded-full mb-8 shadow-sm">
              <span className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
                ★ UK's All-In-One Digital Agency
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
              Your Entire Digital Team <br />
              <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">
                 Under One Roof.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-normal mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Design, web, SEO, marketing, video, and AI: all handled by one agency and one point of contact. No juggling five different freelancers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* DIALOG FOR "LET'S DISCUSS YOUR NEEDS" */}
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size="lg" className="rounded-2xl h-14 px-8 text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300">
                    Book a Free Call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
                  <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl">
                    <div className="flex flex-col space-y-4 text-center">
                      <Dialog.Title className="text-2xl font-bold leading-none tracking-tight">
                        Let’s talk
                      </Dialog.Title>
                      <Dialog.Description className="text-muted-foreground mb-4">
                        Choose the easiest way to connect.
                      </Dialog.Description>

                      <div className="grid gap-4">
                        <a
                          href="https://wa.me/447375874706"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-xl border-2 border-green-100 bg-green-50 hover:bg-green-100 hover:border-green-300 transition-all group"
                        >
                          <div className="bg-[#25D366] p-2 rounded-full text-white mr-4">
                            <WhatsAppIcon size={24} className="fill-current" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 group-hover:text-green-700">Chat with us on WhatsApp</h3>
                            <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Fastest response</span>
                          </div>
                        </a>

                        <a
                          href="https://calendly.com/maxterz-info/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-xl border-2 border-blue-100 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all group"
                        >
                          <div className="bg-[#1044ff] p-2 rounded-full text-white mr-4">
                            <Calendar size={24} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-700">Book a free strategy call</h3>
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">30-minute consultation</span>
                          </div>
                        </a>

                        <Link
                          href="/contact"
                          onClick={handleLinkClick}
                          className="flex items-center p-4 rounded-xl border-2 border-orange-100 bg-orange-50 hover:bg-orange-100 hover:border-orange-300 transition-all group"
                        >
                          <div className="bg-[#eb7444] p-2 rounded-full text-white mr-4">
                            <Mail size={24} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 group-hover:text-orange-700">Send us your project details</h3>
                            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Get a personalised quote by email</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <div className="h-4 w-4">✕</div>
                      <span className="sr-only">Close</span>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <Button asChild variant="outline" size="lg" className="rounded-2xl h-14 px-8 text-lg border-2 border-[#1044ff] text-[#1044ff] hover:bg-[#1044ff] hover:text-white">
                <Link href="/our-work" onClick={handleLinkClick}>
                  <Rocket className="mr-2 w-5 h-5" />
                  See Our Work
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Visual Content - Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full max-w-[600px] lg:max-w-none lg:-mt-12"
          >
            {/* Image Group Wrapper to contain decorations relative to image only */}
            <div className="relative">
              <div className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-500 border-2 border-[#1044ff]">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group bg-gray-100">

                  <AnimatePresence mode="wait">
                    {images.length > 0 && (
                      <motion.img
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        alt={images[currentIndex]?.alt_text || "Hero visual"}
                        src={images[currentIndex]?.image_url}
                      />
                    )}
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white text-[#1044ff] shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white text-[#1044ff] shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight size={20} />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                              }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Floating Badge (Now a Link) */}
                  <Link
                    href="/portfolio"
                    onClick={handleLinkClick}
                    className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border-2 border-[#1044ff] z-10 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="bg-[#1044ff] p-2 rounded-lg text-white border border-white">
                      <MousePointer2 size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Latest Projects</p>
                      <p className="text-sm font-bold text-gray-900">Explore Our Work</p>
                    </div>
                  </Link>

                  {/* Viral Badge Overlay */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-gray-100 z-10 flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">▶ 1.2M Views</span>
                    <span className="text-xs text-gray-400">Instagram</span>
                  </div>
                </div>
              </div>

              {/* Background Decor Card - relative to the image wrapper */}
              <div className="absolute top-4 -right-4 w-full h-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] rounded-3xl -z-10 opacity-20 rotate-[3deg] border-2 border-white"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-[#eb7444] to-[#e05220] rounded-3xl -z-20 opacity-10 rotate-[-5deg] border-2 border-white"></div>
            </div>

            {/* TRUST STRIP - MOVED COMPLETELY BELOW MEDIA & DECOR ELEMENTS */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-700 relative z-10">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">4.8★ Rating | 7,000+ Reviews</span>
              </div>
             
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-500" />
                <span className="font-bold">🇬🇧 UK Registered Company</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;