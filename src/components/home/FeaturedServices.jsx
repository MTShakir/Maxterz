'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Video, Code, Users, Cpu, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ICONS = { web: Code, branding: Palette, video: Video, social: Users, ai: Cpu, seo: TrendingUp };

/**
 * Six category cards (brief 7.2 item 3). Same design as before (D30). Each card links to its
 * category page and to up to 4 service pages; names come from routes.js through the page.
 *
 * @param {{ cards: Array<{
 *   icon: string, title: string, href: string, description: string, cta: string,
 *   links?: Array<{ href: string, label: string }>, points?: string[],
 * }> }} props
 */
const FeaturedServices = ({ cards = [] }) => {
  return (
    <section className="py-24 px-4 bg-gray-50/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-standard-light">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Everything Your Business Needs <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">Online</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-normal leading-relaxed">
            Brand, website, video, social media, SEO and AI. One team plans and builds it all, so every part works together.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
          {cards.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Code;
            return (
              <motion.li
                key={service.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ y: -8 }}
                className="group relative h-full min-h-[350px] sm:min-h-[550px] shadow-sm hover:shadow-xl transition-all duration-300 rounded-[1.5rem] md:rounded-[2.5rem]"
              >
                <div className="h-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] p-[18px] sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden flex flex-col border-2 border-white">
                  {/* Decorative Circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" aria-hidden="true" />

                  {/* Icon Container with Hover Effect */}
                  <div className="mb-6 md:mb-8 inline-flex p-3 sm:p-4 rounded-[1rem] md:rounded-2xl bg-white/10 backdrop-blur-sm w-fit group-hover:bg-gradient-to-r group-hover:from-[#eb7444] group-hover:to-[#e05220] transition-all duration-300 border border-white shadow-lg">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-extrabold text-white mb-3 md:mb-4 group-hover:translate-x-1 transition-transform duration-300 tracking-tight leading-tight">
                    <Link href={service.href} className="hover:underline underline-offset-4">
                      {service.title}
                    </Link>
                  </h3>

                  <p className="text-white/90 mb-5 md:mb-6 font-light leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>

                  {/* Hidden on phones, as in the original design (D30); the card button links to the category */}
                  <ul className="hidden sm:block mb-6 md:mb-8 space-y-1 flex-grow">
                    {service.links?.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center min-h-[44px] text-sm font-semibold text-white hover:underline underline-offset-4"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2 text-white flex-shrink-0" aria-hidden="true" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {service.points?.map((point) => (
                      <li key={point} className="flex items-center min-h-[44px] text-sm text-white/90">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-white flex-shrink-0" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={service.href}
                      className="inline-flex items-center justify-center w-full min-h-[44px] py-3 px-4 sm:px-6 rounded-full bg-white text-[#1044ff] font-bold text-sm border-2 border-[#1044ff] hover:bg-[#c2410c] hover:text-white hover:border-white transition-all duration-300"
                    >
                      {service.cta} <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-5 md:px-10 md:py-6 text-base md:text-lg border-2 border-[#1044ff] text-[#1044ff] hover:bg-[#1044ff] hover:text-white transition-all duration-300"
          >
            <Link href="/services">
              View all services
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
