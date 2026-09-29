'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
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
              Ready to Stop Juggling and Start Growing?
            </h2>
            <p className="text-xl text-white/90 mb-10 font-light max-w-2xl">
              Book a free 30-minute strategy call. No hard sell, no obligation. Just a clear plan for your digital presence.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#eb7444] hover:bg-gray-100 rounded-full px-8 h-14 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1"
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 rounded-full px-8 h-14 text-lg transition-transform hover:-translate-y-1"
              >
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;