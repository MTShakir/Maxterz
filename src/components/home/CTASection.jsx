'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bookHref, BOOK_LABEL, whatsappHref } from '@/lib/cta';

/**
 * End-of-page call to action (brief 7.1): Book a free call, WhatsApp, or a free website audit.
 * Keeps its existing design (D30); pages pass their own headline and subtext.
 *
 * @param {{ headline?: string, subtext?: string, service?: string }} props
 *   service: the page's service slug, passed on to /book
 */
const CTASection = ({
  headline = 'Ready to Stop Juggling and Start Growing?',
  subtext = 'Book a free 30-minute strategy call. No hard sell, no obligation. Just a clear plan for your digital presence.',
  service,
}) => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#eb7444] to-[#e05220] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border-2 border-white"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1044ff]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="badge-standard-dark mb-6">
              READY TO START?
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              {headline}
            </h2>
            <p className="text-xl text-white/90 mb-10 font-light max-w-2xl">
              {subtext}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-none bg-white text-[#c2410c] hover:bg-gray-100 rounded-full px-8 h-14 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1"
              >
                <Link href={bookHref(service)} data-cta="book-a-free-call">
                  {BOOK_LABEL}
                  <ArrowRight className="ml-2" size={20} aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 rounded-full px-8 h-14 text-lg transition-transform hover:-translate-y-1"
              >
                <a href={whatsappHref(service)} target="_blank" rel="noopener noreferrer" data-cta="whatsapp">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            <p className="mt-8 text-white/90">
              or{' '}
              <Link href="/free-website-audit" className="font-semibold underline underline-offset-4 hover:text-white">
                get a free website audit
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
