'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Package and monthly plan card. Same design as before (D30); every number comes from
 * Supabase through the page (D29), and value and saving are calculated, never typed.
 *
 * @param {{
 *   name: string, price: string, price_suffix?: string, ideal_for?: string, features?: string[],
 *   is_featured?: boolean, badge_text?: string, founding?: string, value_line?: string,
 *   notes?: string[], cta_href: string, cta_label?: string, cta_data?: string,
 *   secondary?: { href: string, label: string },
 * }} props
 */
const PackageCard = ({
  name,
  price,
  price_suffix,
  ideal_for,
  features = [],
  is_featured,
  badge_text,
  founding,
  value_line,
  notes = [],
  cta_href,
  cta_label = 'Book a free call',
  cta_data = 'book-a-free-call',
  secondary,
}) => {
  const muted = is_featured ? 'text-blue-100' : 'text-gray-500';
  return (
    <div
      className={`relative flex flex-col rounded-[2rem] p-8 md:p-10 transition-all duration-300 ${
        is_featured
          ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white shadow-2xl scale-100 md:scale-105 z-10 hover:-translate-y-2'
          : 'bg-white border border-gray-100 text-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      {badge_text && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c2410c] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg whitespace-nowrap">
          {badge_text}
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-2xl font-extrabold tracking-tight mb-4 ${is_featured ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>

        {ideal_for && (
          <p className={`text-sm font-medium mb-6 ${muted}`}>
            Ideal for: {ideal_for}
          </p>
        )}

        <div className="flex items-baseline gap-2 mb-2">
          <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${is_featured ? 'text-white' : 'text-gray-900'}`}>
            {price}
          </span>
          {price_suffix && (
            <span className={`text-sm font-medium ${muted}`}>
              {price_suffix}
            </span>
          )}
        </div>

        {founding && (
          <p className={`mt-3 text-sm font-bold rounded-xl px-3 py-2 ${is_featured ? 'bg-white/15 text-white' : 'bg-orange-50 text-[#c2410c]'}`}>
            {founding}
          </p>
        )}
        {value_line && <p className={`mt-3 text-sm font-medium ${muted}`}>{value_line}</p>}
      </div>

      <div className="flex-grow">
        <ul className="space-y-4 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check size={20} className={`shrink-0 mt-0.5 ${is_featured ? 'text-white' : 'text-[#1044ff]'}`} aria-hidden="true" />
              <span className={`text-sm font-medium leading-relaxed ${is_featured ? 'text-white' : 'text-gray-700'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        {notes.length > 0 && (
          <ul className={`space-y-1.5 mb-8 text-xs font-semibold ${muted}`}>
            {notes.map((note, i) => <li key={i}>{note}</li>)}
          </ul>
        )}
      </div>

      <Link
        href={cta_href}
        data-cta={cta_data}
        className={`w-full min-h-[48px] py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
          is_featured
            ? 'bg-white text-[#1044ff] hover:bg-gray-50 shadow-lg'
            : 'bg-gray-900 text-white hover:bg-[#1044ff] shadow-md'
        }`}
      >
        {cta_label} <ArrowRight size={18} aria-hidden="true" />
      </Link>
      {secondary && (
        <Link
          href={secondary.href}
          className={`mt-4 text-center text-sm font-bold underline underline-offset-4 ${is_featured ? 'text-white' : 'text-[#1044ff]'}`}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
};

export default PackageCard;
