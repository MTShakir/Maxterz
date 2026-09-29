'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { RefreshCw, AlertCircle, ShieldCheck, Star, Users, Briefcase, Trophy } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasPlus = value.includes('+');
  const isDecimal = value.includes('.');
  const suffix = value.replace(/[0-9.,+]/g, '').trim();
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (isDecimal) return latest.toFixed(1);
    return Math.floor(latest).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  useEffect(() => {
    const controls = animate(count, numericValue, { duration, ease: "easeOut" });
    return controls.stop;
  }, [numericValue, duration, count]);

  return (
    <span className="font-extrabold text-[#1044ff]">
      <motion.span>{rounded}</motion.span>
      {hasPlus && "+"}
      {suffix && ` ${suffix}`}
    </span>
  );
};

const TrustStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      let { data, error } = await supabase
        .from('trust_stats')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      // Fallback data in case the table is empty during preview
      if (!data || data.length === 0) {
        data = [
          { id: 1, value: "4.9", label: "Average Rating", display_order: 1 },
          { id: 2, value: "7,100+", label: "Verified Reviews", display_order: 2 },
          { id: 3, value: "11,600+", label: "Projects Completed", display_order: 3 },
          { id: 4, value: "9", label: "Years Experience", display_order: 4 }
        ];
      }
      
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getIcon = (label) => {
    const lowerLabel = label.toLowerCase();
    const className = "text-[#1044ff] group-hover:text-[#eb7444] transition-colors duration-300";
    if (lowerLabel.includes('rating') || lowerLabel.includes('star')) return <Star size={32} className={className} />;
    if (lowerLabel.includes('review') || lowerLabel.includes('client')) return <Users size={32} className={className} />;
    if (lowerLabel.includes('project') || lowerLabel.includes('deliver')) return <Briefcase size={32} className={className} />;
    return <Trophy size={32} className={className} />;
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-900 px-4">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-gray-800 rounded-[2rem] h-48 border border-gray-700"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-900 flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="text-red-400 mb-2" size={32} />
        <p className="text-gray-300 mb-4">Failed to load stats: {error}</p>
        <button onClick={fetchStats} className="flex items-center gap-2 text-blue-400 font-semibold hover:underline">
          <RefreshCw size={16} /> Retry
        </button>
      </section>
    );
  }

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
    <section className="relative py-28 px-4 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1044ff] overflow-hidden">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 bg-pattern-dots-light opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#eb7444]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-xs font-bold text-white uppercase tracking-[1.5px] shadow-lg">
              <ShieldCheck size={16} className="text-[#eb7444]" />
              Our Proven Results
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
            Why Clients Trust MAXTERZ
          </h2>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto font-medium">
            We don't just make promises. We deliver measurable impact backed by years of platform-verified success.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              variants={cardVariants}
              className="group relative bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/20 hover:shadow-[0_20px_40px_rgba(16,68,255,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff]/0 to-[#f0f4ff]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-blue-100">
                  {getIcon(stat.label)}
                </div>
                <div className="text-right">
                  <div className="text-5xl md:text-6xl font-black tracking-tighter leading-none drop-shadow-sm">
                    <AnimatedCounter value={stat.value} />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide group-hover:text-[#1044ff] transition-colors">
                  {stat.label}
                </h3>
                
                {/* Visual Progress/Magnitude Indicator */}
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${60 + (index * 10)}%` }} // Staggered arbitrary width for visual effect
                    transition={{ duration: 1.5, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#eb7444] to-[#1044ff] rounded-full group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStats;