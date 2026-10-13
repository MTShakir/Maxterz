'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/site';
import { fiverrAttribution, showPeriod } from '@/lib/reviews';

/** Initials for the avatar circle, from the reviewer's name. */
const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

/**
 * Real Fiverr reviews (brief 7.2 item 8), read on the server and passed in. Same card design as
 * before (D30), without star rows. Each card names the service and says "on Fiverr" (D11).
 *
 * @param {{ reviews: Array<{ id: string, author_name: string, location: string | null, quote: string, service_slug: string, period_label: string | null }> }} props
 */
const Testimonials = ({ reviews = [] }) => {
  if (reviews.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-standard-light">
            CLIENT REVIEWS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            What Clients Say on Fiverr
          </h2>
          <p className="text-lg text-gray-600">
            {`${SITE.proof.fiverrRating} stars from ${SITE.proof.fiverrReviews} reviews on Fiverr since ${SITE.proof.fiverrSince}.`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            const details = [review.location, showPeriod(review.period_label) ? review.period_label : null].filter(Boolean);
            return (
              <motion.figure
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 card-standard-light relative group flex flex-col"
              >
                <Quote size={40} className="text-[#1044ff] opacity-10 absolute top-6 right-6 group-hover:scale-110 transition-transform" aria-hidden="true" />

                <blockquote className="text-gray-700 mb-8 leading-relaxed text-base italic flex-grow">
                  <p>&ldquo;{review.quote}&rdquo;</p>
                </blockquote>

                <figcaption className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <span
                    className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] flex items-center justify-center text-white font-bold text-sm shadow-md"
                    aria-hidden="true"
                  >
                    {initials(review.author_name)}
                  </span>
                  <span>
                    <span className="block font-extrabold text-gray-900 tracking-tight">{review.author_name}</span>
                    {details.length > 0 && (
                      <span className="block text-sm text-gray-600 font-medium">{details.join(', ')}</span>
                    )}
                    <span className="block text-sm text-gray-600">{fiverrAttribution(review.service_slug)}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <p className="text-center mt-12">
          <Link
            href="/reviews"
            className="inline-flex min-h-[44px] items-center gap-2 font-bold text-[#1044ff] hover:text-[#0020bf] hover:underline underline-offset-4"
          >
            Read more client reviews <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
