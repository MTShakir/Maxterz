'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Check, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PackagesPreview = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('packages_preview')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setPackages(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-100 px-4">
        <div className="container mx-auto">
          <div className="animate-pulse text-center mb-16">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-gray-100 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-gray-100 h-[500px]"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-100 flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="text-red-500 mb-2" size={32} />
        <p className="text-gray-600 mb-4">Failed to load packages: {error}</p>
        <button onClick={fetchPackages} className="flex items-center gap-2 text-[#1044ff] font-semibold hover:underline">
          <RefreshCw size={16} /> Retry
        </button>
      </section>
    );
  }

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
            Clear Pricing, Zero Surprises
          </h2>
          <p className="text-lg text-gray-600">
            Choose a solution tailored to your stage of business growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
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
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#eb7444] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${isFeatured ? 'text-blue-200' : 'text-gray-500'}`}>
                    {pkg.type === 'one-time' ? 'One-Time Project' : 'Monthly Partnership'}
                  </div>
                  <h3 className={`text-2xl font-extrabold tracking-tight mb-4 ${isFeatured ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isFeatured ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.price}
                    </span>
                    {pkg.price_suffix && (
                      <span className={`text-sm font-medium ${isFeatured ? 'text-blue-200' : 'text-gray-500'}`}>
                        {pkg.price_suffix}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${isFeatured ? 'text-blue-100' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {pkg.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={20} className={`shrink-0 mt-0.5 ${isFeatured ? 'text-[#eb7444]' : 'text-[#1044ff]'}`} />
                        <span className={`text-sm font-medium ${isFeatured ? 'text-white' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={pkg.cta_href || '/packages'}
                  className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    isFeatured
                      ? 'bg-white text-[#1044ff] hover:bg-gray-50 shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-[#1044ff] shadow-md'
                  }`}
                >
                  View Details <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;