import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { RefreshCw, AlertCircle, ShieldCheck, Star, Users, CheckCircle, Calendar, ArrowRight } from 'lucide-react';

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

const FiverreProof = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      let { data, error } = await supabase
        .from('trust_stats')
        .select('id, value, label, display_order')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        data = [
          { id: 1, value: "4.9", label: "Average Rating", display_order: 1 },
          { id: 2, value: "7,100+", label: "Verified Reviews", display_order: 2 },
          { id: 3, value: "11,600+", label: "Projects Completed", display_order: 3 },
          { id: 4, value: "9", label: "Years On Platform", display_order: 4 },
          { id: 5, value: "5 Star", label: "Trustpilot Rating", display_order: 5 }
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
    if (lowerLabel.includes('rating') || lowerLabel.includes('star')) return <Star size={16} className={className} />;
    if (lowerLabel.includes('review') || lowerLabel.includes('client')) return <Users size={16} className={className} />;
    if (lowerLabel.includes('project') || lowerLabel.includes('deliver')) return <CheckCircle size={16} className={className} />;
    return <Calendar size={16} className={className} />;
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-900 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 justify-center">
          {[1, 2, 3, 4, 5].map((i, index) => (
            <div 
              key={i} 
              className={`animate-pulse bg-gray-800 rounded-[1rem] h-[220px] border border-gray-700 ${
                index === 4 ? 'max-sm:col-span-2 max-sm:w-[calc(50%-0.5rem)] max-sm:mx-auto' : ''
              }`}
            ></div>
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
    <section className="relative py-28 px-4 bg-gradient-to-br from-[#041249] via-[#0a2799] to-[#1044ff] overflow-hidden">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 bg-pattern-dots-light opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#eb7444]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-[11px] font-bold text-white uppercase tracking-[1.5px] shadow-lg">
              <ShieldCheck size={14} className="text-[#eb7444]" />
              Our Verified Track Record
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 drop-shadow-sm w-full mx-auto md:whitespace-nowrap">
            Why Clients Trust MAXTERZ
          </h2>
          <p className="text-base text-blue-200/80 max-w-2xl mx-auto font-medium">
            Every number comes directly from our verified Fiverr profile. Nine years of real work, real clients, and results you can check yourself.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 justify-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id || index}
                variants={cardVariants}
                className={`group relative bg-white/95 backdrop-blur-sm rounded-[1rem] px-3 py-6 md:py-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/20 hover:shadow-[0_20px_40px_rgba(16,68,255,0.25)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col items-center justify-between text-center min-h-[200px] md:min-h-[220px] ${
                  index === stats.length - 1 && stats.length % 2 !== 0 
                    ? 'max-sm:col-span-2 max-sm:w-[calc(50%-0.5rem)] max-sm:mx-auto' 
                    : ''
                }`}
              >
                {/* Subtle hover background highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff]/0 to-[#f0f4ff]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Top Section: Icon & Number */}
                <div className="flex flex-col items-center w-full relative z-10 pt-2">
                  <div className="w-8 h-8 mb-3 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-blue-100 shrink-0">
                    {getIcon(stat.label)}
                  </div>
                  
                  <div className="mb-1">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter leading-none drop-shadow-sm">
                      <AnimatedCounter value={stat.value} />
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Label & Progress Bar */}
                <div className="relative z-10 w-full flex flex-col items-center gap-2 mt-auto pt-4 border-t border-gray-100/60">
                  <h3 className="text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-wide group-hover:text-[#1044ff] transition-colors leading-tight">
                    {stat.label}
                  </h3>
                  
                  <div className="w-full max-w-[60%] bg-gray-100 h-[3px] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${60 + (index * 10)}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#eb7444] to-[#1044ff] rounded-full group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a 
            href="https://www.fiverr.com/creators1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-white text-[#1044ff] rounded-full px-7 py-3.5 font-bold text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(16,68,255,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f0f4ff] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 6.75H17.25V4.5C17.25 3.67125 16.5788 3 15.75 3H8.25C7.42125 3 6.75 3.67125 6.75 4.5V6.75H2.5C2.0865 6.75 1.75 7.0865 1.75 7.5V21.75C1.75 22.1635 2.0865 22.5 2.5 22.5H21.5C21.9135 22.5 22.25 22.1635 22.25 21.75V7.5C22.25 7.0865 21.9135 6.75 21.5 6.75ZM8.25 4.5H15.75V6.75H8.25V4.5ZM20.75 21H3.25V8.25H20.75V21ZM12 16.5C11.5865 16.5 11.25 16.1635 11.25 15.75V11.25C11.25 10.8365 11.5865 10.5 12 10.5C12.4135 10.5 12.75 10.8365 12.75 11.25V15.75C12.75 16.1635 12.4135 16.5 12 16.5Z"/>
              </svg>
              View Our Fiverr Profile
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
};

export default FiverreProof;