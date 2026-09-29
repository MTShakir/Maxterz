'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, RefreshCw, Camera } from 'lucide-react';
import Link from 'next/link';

const CaseStudies = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudies = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setStudies(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto">
          <div className="animate-pulse text-center mb-16">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-gray-100 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-50 rounded-[2rem] h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="text-red-500 mb-2" size={32} />
        <p className="text-gray-600 mb-4">Failed to load case studies: {error}</p>
        <button onClick={fetchStudies} className="flex items-center gap-2 text-[#1044ff] font-semibold hover:underline">
          <RefreshCw size={16} /> Retry
        </button>
      </section>
    );
  }

  if (studies.length === 0) return null;

  return (
    <section className="py-24 bg-white px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="badge-standard-light">
              FEATURED WORK
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Real Results for Real Businesses
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/our-work" className="inline-flex items-center gap-2 text-[#1044ff] font-bold hover:text-[#eb7444] transition-colors">
              View All Work <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studies.map((study, index) => {
            
            // Ensure services is an array, handle if stored as JSON string
            let parsedServices = [];
            if (Array.isArray(study.services)) {
              parsedServices = study.services;
            } else if (typeof study.services === 'string') {
              try {
                parsedServices = JSON.parse(study.services);
              } catch (e) {
                parsedServices = [];
              }
            }

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col card-standard-light overflow-hidden"
              >
                {/* TOP IMAGE AREA */}
                <div className="h-[200px] relative bg-gradient-to-br from-[#1044ff] to-[#0020bf] flex items-center justify-center overflow-hidden rounded-t-[2rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:16px_16px] opacity-10"></div>
                  
                  {study.image_url ? (
                    <img src={study.image_url} alt={study.title || 'Case study image'} className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center justify-center relative z-10" data-placeholder="true">
                      <Camera className="text-white mb-2" size={28} />
                      <span className="text-[12px] text-white/50">[Upload project screenshot]</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-[12px] left-[12px] bg-white text-[#1044ff] text-[11px] font-semibold rounded-full px-[12px] py-[4px] z-20 shadow-sm">
                    Case Study
                  </div>
                  
                  {parsedServices.length > 0 && (
                    <div className="absolute bottom-[12px] right-[12px] bg-white/20 backdrop-blur-md text-white text-[11px] rounded-full px-[10px] py-[3px] z-20">
                      {parsedServices.length} {parsedServices.length === 1 ? 'Service' : 'Services'}
                    </div>
                  )}
                </div>
                
                {/* BOTTOM CONTENT AREA */}
                <div className="p-[24px] flex flex-col gap-0 flex-grow">
                  {study.category_tag && (
                    <span className="text-[11px] text-[#e7811e] uppercase tracking-[0.6px] font-semibold mb-[8px]">
                      {study.category_tag}
                    </span>
                  )}
                  
                  <h3 className="text-[18px] font-extrabold text-[#111827] mb-[10px] group-hover:text-[#1044ff] transition-colors line-clamp-2">
                    {study.title}
                  </h3>
                  
                  <p className="text-[14px] text-[#6b7280] leading-[1.6] line-clamp-3 mb-[16px] flex-grow">
                    {study.description}
                  </p>
                  
                  {parsedServices.length > 0 && (
                    <div className="flex flex-wrap gap-[6px] mb-[20px]">
                      {parsedServices.map((service, i) => (
                        <span key={i} className="bg-[#f0f4ff] text-[#1044ff] text-[11px] font-medium rounded-full px-[10px] py-[3px]">
                          {service}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="h-[1px] bg-[#f0f0f0] w-full mb-[16px]"></div>

                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      href={study.cta_href || '/our-work'}
                      className="text-[#1044ff] text-[13px] font-bold hover:text-[#eb7444] transition-colors"
                    >
                      View Case Study
                    </Link>
                    <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                       <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;