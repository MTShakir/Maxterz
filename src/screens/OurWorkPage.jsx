'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Loader2, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { caseStudies } from '@/case-studies';

const INITIAL_COUNT = 6;

const OurWorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const filters = [
    'All',
    'Websites & Apps',
    'Branding & Design',
    'Video & Animation',
    'Social Media',
    'AI & Automation',
    'SEO & Marketing',
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);

  return (
    <>
      {/* HEADER */}
      <section className="pt-8 pb-10 px-4">
        <div className="container mx-auto mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <span className="badge-standard-light">OUR WORK</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                Selected{' '}
                <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">
                  Masterpieces
                </span>
              </h1>
              <p className="text-lg text-gray-500 font-light mt-4 max-w-xl">
                Creative vision meeting technical precision, delivered for clients across the UK and worldwide.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold text-gray-800">
              <span className="flex items-center gap-2">
                <CheckCircle className="text-[#1044ff] w-4 h-4" /> 11,600+ Projects Delivered
              </span>
              <span className="flex items-center gap-2">
                <Star className="text-[#eb7444] w-4 h-4 fill-current" /> 4.9 Stars from 7,100+ Reviews
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="pb-14 px-4">
        <div className="container mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
            Case Studies · Real Projects. Real Results.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  aria-label={`${study.title} case study`}
                  className="group relative flex flex-col justify-between h-64 p-7 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:16px_16px] opacity-10" />
                  <div className="relative flex items-start justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">{study.category}</span>
                    <span className="w-10 h-10 rounded-full bg-white/15 group-hover:bg-white group-hover:text-[#1044ff] flex items-center justify-center transition-colors">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <div className="relative">
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-2">{study.title}</h3>
                    <p className="text-sm text-white/75 font-light line-clamp-2">{study.description}</p>
                    <span className="sr-only">View Case Study</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO ARCHIVE */}
      <section className="py-14 px-4 bg-gray-50/60 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">More of Our Work</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowAll(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                    activeFilter === filter
                      ? 'bg-[#1044ff] border-[#1044ff] text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#1044ff] hover:text-[#1044ff]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {loadingProjects ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#1044ff]" />
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {visibleProjects.length > 0 ? (
                  visibleProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Link href={`/our-work/${project.id}`} className="group block">
                        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            alt={project.title}
                            src={project.main_image}
                            loading="lazy"
                          />
                          <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/70 to-transparent">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-300">
                              {project.category}
                            </span>
                            <h3 className="text-white font-bold text-base md:text-lg leading-tight">{project.title}</h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 text-gray-500">
                    No projects found in this category yet.
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {filteredProjects.length > INITIAL_COUNT && (
              <Button variant="outline" className="rounded-full px-8 h-11" onClick={() => setShowAll((v) => !v)}>
                {showAll ? 'Show less' : `View all ${filteredProjects.length} projects`}
              </Button>
            )}
            <Button asChild className="rounded-full px-8 h-11 bg-[#1044ff] hover:bg-[#0020bf]">
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurWorkPage;
