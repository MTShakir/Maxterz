'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PackageCard = ({
  name,
  price,
  price_suffix,
  ideal_for,
  features = [],
  is_featured,
  badge_text,
  cta_href = '/contact'
}) => {
  return (
    <div
      className={`relative flex flex-col rounded-[2rem] p-8 md:p-10 transition-all duration-300 ${
        is_featured
          ? 'bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white shadow-2xl scale-100 md:scale-105 z-10 hover:-translate-y-2'
          : 'bg-white border border-gray-100 text-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      {(badge_text || is_featured) && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#eb7444] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg whitespace-nowrap">
          {badge_text || 'Recommended'}
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-2xl font-extrabold tracking-tight mb-4 ${is_featured ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>
        
        {ideal_for && (
          <p className={`text-sm font-medium mb-6 ${is_featured ? 'text-blue-200' : 'text-gray-500'}`}>
            Ideal for: {ideal_for}
          </p>
        )}

        <div className="flex items-baseline gap-2 mb-2">
          <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${is_featured ? 'text-white' : 'text-gray-900'}`}>
            {price}
          </span>
          {price_suffix && (
            <span className={`text-sm font-medium ${is_featured ? 'text-blue-200' : 'text-gray-500'}`}>
              {price_suffix}
            </span>
          )}
        </div>
      </div>

      <div className="flex-grow">
        <ul className="space-y-4 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check size={20} className={`shrink-0 mt-0.5 ${is_featured ? 'text-[#eb7444]' : 'text-[#1044ff]'}`} />
              <span className={`text-sm font-medium leading-relaxed ${is_featured ? 'text-white' : 'text-gray-700'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={cta_href}
        className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
          is_featured
            ? 'bg-white text-[#1044ff] hover:bg-gray-50 shadow-lg'
            : 'bg-gray-900 text-white hover:bg-[#1044ff] shadow-md'
        }`}
      >
        Get Started <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default PackageCard;