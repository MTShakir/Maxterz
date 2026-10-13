'use client';

import React from 'react';
import { SITE } from '@/lib/site';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, TrendingUp, MapPin, CheckCircle2 } from 'lucide-react';

const IconMap = {
  ShieldCheck,
  Layers,
  TrendingUp,
  MapPin,
  CheckCircle2
};

/**
 * Four reasons, written from verified facts only (business profile, sections 2 and 3). The old
 * why_choose_us rows were placeholders with unverified numbers (D36).
 */
const FEATURES = [
  { id: 'one-team', icon_name: 'Layers', title: 'One Team, One Point of Contact', description: 'Brand, website, SEO, social media, video and AI from one team. Talha handles your project from the first call to launch and after, so you never brief five people.' },
  { id: 'track-record', icon_name: 'ShieldCheck', title: 'A Track Record You Can Check', description: `${SITE.proof.projects} projects since ${SITE.proof.fiverrSince}, with ${SITE.proof.fiverrRating} stars from ${SITE.proof.fiverrReviews} reviews on Fiverr.` },
  { id: 'work-people-share', icon_name: 'TrendingUp', title: 'Work People Share', description: `Our own logo animation reached ${SITE.proof.viralViews} views on Instagram.` },
  { id: 'open-team', icon_name: 'MapPin', title: 'Open About Our Team', description: 'Talha looks after every client from the UK. Our delivery team works from Pakistan and India.' },
];

const WhyChooseUs = () => {
  const features = FEATURES;

  return (
    <section className="py-24 px-4 bg-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1044ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#eb7444]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-standard-light">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Not Just Another Agency
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four specific reasons businesses choose Maxterz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {features.map((feature, index) => {
            const Icon = IconMap[feature.icon_name] || CheckCircle2;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 card-standard-light group text-left"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 text-[#1044ff] mb-6 group-hover:bg-[#1044ff] group-hover:text-white transition-colors duration-300">
                  <Icon size={28} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;