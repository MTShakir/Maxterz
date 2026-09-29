'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, TrendingUp, MapPin, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const IconMap = {
  ShieldCheck,
  Layers,
  TrendingUp,
  MapPin,
  CheckCircle2
};

const WhyChooseUs = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeatures = async () => {
    setLoading(true);
    setError(null);
    try {
      let { data, error } = await supabase
        .from('why_choose_us')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      // Fallback data if table wasn't seeded correctly via migration
      if (!data || data.length === 0) {
        data = [
          { id: '1', icon_name: 'ShieldCheck', title: 'Nine Years of Verified Work', description: 'Over 11,600 projects delivered and reviewed by real clients. That track record is public and checkable on one of the largest freelance platforms in the world.', display_order: 1 },
          { id: '2', icon_name: 'Layers', title: 'Everything in One Place', description: 'No briefing five different people. One team handles your entire digital operation, with one account manager you can always reach.', display_order: 2 },
          { id: '3', icon_name: 'TrendingUp', title: 'Quality Proven to Go Viral', description: 'Our work performs as well as it looks. A Maxterz logo animation reached 1.2 million views on Instagram organically. That is the standard we hold on every project.', display_order: 3 },
          { id: '4', icon_name: 'MapPin', title: 'UK-Based, Globally Capable', description: 'Registered in the UK, rooted in British business culture. Backed by a skilled international delivery team that lets us move faster and price more competitively than comparable local agencies.', display_order: 4 }
        ];
      }
      
      setFeatures(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-100 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="animate-pulse text-center mb-16">
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-10 w-64 bg-gray-300 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="h-14 w-14 bg-gray-200 rounded-xl mb-6"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
              </div>
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
        <p className="text-gray-600 mb-4">Failed to load features: {error}</p>
        <button onClick={fetchFeatures} className="flex items-center gap-2 text-[#1044ff] font-semibold hover:underline">
          <RefreshCw size={16} /> Retry
        </button>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1044ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#eb7444]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
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