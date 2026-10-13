'use client';

import React from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Users, CheckCircle, Calendar, ArrowRight } from 'lucide-react';

/** A proof number, shown as plain text so the server HTML carries the real figure. */
const StatValue = ({ value }) => <span className="font-extrabold text-[#1044ff]">{value}</span>;

/** Proof numbers from SITE.proof only (business profile); the old trust_stats rows were placeholders (D36). */
const STATS = [
  { id: 1, value: SITE.proof.fiverrRating, label: 'Stars on Fiverr' },
  { id: 2, value: SITE.proof.fiverrReviews, label: 'Reviews on Fiverr' },
  { id: 3, value: SITE.proof.projects, label: `Projects delivered since ${SITE.proof.fiverrSince}` },
  { id: 4, value: SITE.proof.logoAnimationReviews, label: 'Logo animation reviews on Fiverr' },
  { id: 5, value: SITE.proof.viralViews, label: 'Views on our logo animation' },
];

const FiverreProof = () => {
  const stats = STATS;

  const getIcon = (label) => {
    const lowerLabel = label.toLowerCase();
    const className = "text-[#1044ff] group-hover:text-[#eb7444] transition-colors duration-300";
    if (lowerLabel.includes('rating') || lowerLabel.includes('star')) return <Star size={16} className={className} />;
    if (lowerLabel.includes('review') || lowerLabel.includes('client')) return <Users size={16} className={className} />;
    if (lowerLabel.includes('project') || lowerLabel.includes('deliver')) return <CheckCircle size={16} className={className} />;
    return <Calendar size={16} className={className} />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative py-28 px-4 bg-gradient-to-br from-[#041249] via-[#0a2799] to-[#1044ff] overflow-hidden">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 bg-pattern-dots-light opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#eb7444]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-[11px] font-bold text-white uppercase tracking-[1.5px] shadow-lg">
              <ShieldCheck size={14} className="text-[#eb7444]" />
              Our Track Record
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 drop-shadow-sm w-full mx-auto md:whitespace-nowrap">
            Why Clients Trust Maxterz
          </h2>
          <p className="text-base text-blue-200/80 max-w-2xl mx-auto font-medium">
            {`Real work for real clients since ${SITE.proof.fiverrSince}.`}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 justify-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id || index}
                variants={cardVariants}
                className={`group relative bg-white/95 backdrop-blur-sm rounded-[1rem] px-3 py-6 md:py-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/20 hover:shadow-[0_20px_40px_rgba(16,68,255,0.25)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col items-center justify-between text-center min-h-[200px] md:min-h-[220px] ${
                  index === stats.length - 1 && stats.length % 2 !== 0 
                    ? 'max-sm:col-span-2 max-sm:w-[calc(50%-0.5rem)] max-sm:mx-auto' 
                    : ''
                }`}
              >
                {/* Subtle hover background highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff]/0 to-[#f0f4ff]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Top Section: Icon & Number */}
                <div className="flex flex-col items-center w-full relative z-10 pt-2">
                  <div className="w-8 h-8 mb-3 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-blue-100 shrink-0">
                    {getIcon(stat.label)}
                  </div>
                  
                  <div className="mb-1">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter leading-none drop-shadow-sm">
                      <StatValue value={stat.value} />
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Label & Progress Bar */}
                <div className="relative z-10 w-full flex flex-col items-center gap-2 mt-auto pt-4 border-t border-gray-100/60">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1044ff] transition-colors leading-tight">
                    {stat.label}
                  </h3>
                  
                  <div className="w-full max-w-[60%] bg-gray-100 h-[3px] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${60 + (index * 10)}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#eb7444] to-[#1044ff] rounded-full group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          {/* D07: Fiverr is linked only from /reviews, so this goes to our own reviews page. */}
          <Link
            href="/reviews"
            className="group relative inline-flex items-center gap-3 bg-white text-[#1044ff] rounded-full px-7 py-3.5 font-bold text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(16,68,255,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read client reviews
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
          </Link>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
};

export default FiverreProof;