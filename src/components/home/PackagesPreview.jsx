'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Packages teaser (brief 7.2 item 9): the 3 fixed packages with the Launch Kit highlighted,
 * plus the monthly plans line. Same design as before (D30); every price comes from Supabase
 * through the page, and values and savings are calculated (D25, D29).
 *
 * @param {{
 *   cards: Array<{
 *     id: string, name: string, price: string, description?: string, features?: string[],
 *     is_featured?: boolean, badge?: string, founding?: string, value_line?: string,
 *     href: string, cta_label: string,
 *   }>,
 *   monthlyFrom: string | null,
 * }} props
 */
const PackagesPreview = ({ cards = [], monthlyFrom }) => {
  if (cards.length === 0) return null;

  return (
    <section className="py-24 bg-gray-100 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="badge-standard-light">
            PACKAGES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Clear Prices, Agreed Up Front
          </h2>
          <p className="text-lg text-gray-600">
            Three fixed-price packages for new businesses, rebrands and launches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((pkg, index) => {
            const isFeatured = pkg.is_featured;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col rounded-[2rem] p-8 md:p-10 transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white shadow-2xl scale-100 md:scale-105 z-10 hover:-translate-y-2 hover:shadow-3xl'
                    : 'card-standard-light'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c2410c] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div className="mb-8">
                  <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${isFeatured ? 'text-blue-100' : 'text-gray-500'}`}>
                    One-off package
                  </div>
                  <h3 className={`text-2xl font-extrabold tracking-tight mb-4 ${isFeatured ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isFeatured ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.price}
                    </span>
                  </div>
                  {pkg.founding && (
                    <p className={`mb-4 text-sm font-bold rounded-xl px-3 py-2 ${isFeatured ? 'bg-white/15 text-white' : 'bg-orange-50 text-[#c2410c]'}`}>
                      {pkg.founding}
                    </p>
                  )}
                  {pkg.value_line && (
                    <p className={`mb-4 text-sm font-medium ${isFeatured ? 'text-blue-100' : 'text-gray-500'}`}>
                      {pkg.value_line}
                    </p>
                  )}
                  {pkg.description && (
                    <p className={`text-sm leading-relaxed ${isFeatured ? 'text-blue-100' : 'text-gray-600'}`}>
                      {pkg.description}
                    </p>
                  )}
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {pkg.features?.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={20} className={`shrink-0 mt-0.5 ${isFeatured ? 'text-white' : 'text-[#1044ff]'}`} aria-hidden="true" />
                        <span className={`text-sm font-medium ${isFeatured ? 'text-white' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={pkg.href}
                  className={`w-full min-h-[48px] py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    isFeatured
                      ? 'bg-white text-[#1044ff] hover:bg-gray-50 shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-[#1044ff] shadow-md'
                  }`}
                >
                  {pkg.cta_label}
                  <span className="sr-only">{` in the ${pkg.name}`}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center space-y-4">
          {monthlyFrom && (
            <p className="text-lg font-semibold text-gray-800">
              {`Monthly plans from ${monthlyFrom}.`}{' '}
              <Link href="/packages#monthly" className="text-[#1044ff] underline underline-offset-4 hover:text-[#0020bf]">
                See the monthly plans
              </Link>
            </p>
          )}
          <p>
            <Link
              href="/packages"
              className="inline-flex min-h-[44px] items-center gap-2 font-bold text-[#1044ff] hover:text-[#0020bf] hover:underline underline-offset-4"
            >
              See all packages and prices <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
