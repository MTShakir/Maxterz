import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, ArrowRight, Waypoints, Focus, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const OneHubStatement = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="relative py-32 px-4 w-full bg-[#f8f9fc] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-60" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 uppercase tracking-[1px]">
            <Lightbulb size={14} className="text-[#eb7444]" />
            Why Maxterz Exists
          </span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.3] max-w-3xl">
          Most businesses work with <span className="text-[#1044ff] relative whitespace-nowrap">
            5 different people
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#1044ff]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
            </svg>
          </span> to manage their digital presence.
        </motion.h2>

        {/* Visual Fragmentation vs Unity Illustration */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-6 my-10 w-full max-w-2xl">
          <div className="flex -space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center shadow-sm z-[${6-i}] ${i === 1 ? 'bg-blue-100 text-blue-600' : i === 2 ? 'bg-orange-100 text-orange-600' : i === 3 ? 'bg-green-100 text-green-600' : i === 4 ? 'bg-purple-100 text-purple-600' : 'bg-pink-100 text-pink-600'}`}>
                <Users size={18} />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col items-center px-4">
            <Waypoints size={24} className="text-gray-300 md:rotate-0 rotate-90" />
            <span className="text-xs font-bold text-gray-400 mt-2 tracking-widest uppercase">vs</span>
          </div>

          <div className="bg-gradient-to-br from-[#1044ff] to-[#0020bf] p-4 rounded-2xl shadow-lg border-2 border-white/20 relative group hover:scale-105 transition-transform duration-300 cursor-default">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-inner">
              <Focus size={28} className="text-[#1044ff]" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#eb7444] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm border-2 border-white">
              1
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6 max-w-2xl mx-auto text-left relative">
          <Quote className="absolute -top-6 -left-8 text-gray-200 w-16 h-16 opacity-50 rotate-180 pointer-events-none" />
          
          <p className="text-[17px] text-[#4b5563] leading-[1.8] relative z-10 pl-6 border-l-2 border-gray-200">
            A web developer. A graphic designer. A social media manager. An SEO specialist. A video editor. Five invoices, five communication threads, five different timelines and none of them talk to each other.
          </p>
          
          <p className="text-[18px] font-semibold text-[#1a1a2e] leading-[1.7] relative z-10 bg-white/60 p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
            Maxterz was built to replace all of them. <span className="text-[#1044ff]">One agency, one team, one account manager</span> who handles everything from brand to build to growth. You focus on running your business. We handle the rest.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12">
          <Link 
            to="/about" 
            className="inline-flex items-center gap-2 text-[#1044ff] font-bold text-[15px] hover:text-[#0020bf] transition-colors group"
          >
            Learn more about our approach
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OneHubStatement;