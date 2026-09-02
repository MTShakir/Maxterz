import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter, Loader2, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import Breadcrumb from '@/components/Breadcrumb';

const OurWorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  
  const [caseStudies, setCaseStudies] = useState([]);
  const [loadingCaseStudies, setLoadingCaseStudies] = useState(true);

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

    const fetchCaseStudies = async () => {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('is_featured', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        
        // Parse services string array if needed, supabase might return it already parsed depending on column type
        const formattedData = (data || []).map(item => ({
          ...item,
          services: typeof item.services === 'string' ? JSON.parse(item.services) : item.services
        }));
        
        setCaseStudies(formattedData);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoadingCaseStudies(false);
      }
    };

    fetchProjects();
    fetchCaseStudies();
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Our Work | Maxterz | UK Digital Agency Portfolio</title>
        <meta
          name="description"
          content="Browse the Maxterz project portfolio: websites, branding, animations, social media, AI automation, and SEO work for clients across the UK and worldwide."
        />
      </Helmet>

      {/* SECTION 1 - PAGE HEADER */}
      <section className="pt-8 pb-16 px-4 bg-gray-50/50 relative overflow-hidden">
        <div className="container mx-auto mt-12 md:mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="badge-standard-light">
              OUR WORK
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Selected <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">Masterpieces</span>
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Creative vision meeting technical precision. Projects and case studies delivered for clients across the UK and worldwide.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100"
              >
                <CheckCircle className="text-[#1044ff] w-5 h-5" />
                <span className="font-bold text-sm text-gray-800 tracking-tight">11,600+ Projects Delivered</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100"
              >
                <Star className="text-[#eb7444] w-5 h-5 fill-current" />
                <span className="font-bold text-sm text-gray-800 tracking-tight">4.9 Stars from 7,100+ Reviews</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - FEATURED CASE STUDIES */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">
              CASE STUDIES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Real Projects. Real Results.
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Three of our most complete client engagements showing the full scope of what Maxterz delivers.
            </p>
          </motion.div>

          {loadingCaseStudies ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#1044ff]" />
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-xl text-gray-500 font-medium">No featured case studies yet.</p>
            </div>
          ) : (
            <div className="space-y-12 md:space-y-16">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center bg-gray-50/50 p-4 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500"
                >
                  {/* Image Area */}
                  <div className="w-full md:w-1/2 rounded-[1.5rem] overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-auto md:h-[400px] flex-shrink-0 relative">
                    {study.image_url ? (
                      <img 
                        src={study.image_url} 
                        alt={study.title || "Case study"} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-[1.5rem]" data-placeholder="true">
                        <span className="text-gray-400 font-medium text-sm">
                          [Upload case study image to Supabase to display here]
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="w-full md:w-1/2 flex flex-col items-start py-4">
                    {study.category_tag && (
                      <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1044ff] text-xs font-bold uppercase tracking-widest mb-5 border border-blue-100">
                        {study.category_tag}
                      </span>
                    )}
                    
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                      {study.title}
                    </h3>
                    
                    <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed font-light">
                      {study.description}
                    </p>
                    
                    {study.services && Array.isArray(study.services) && study.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {study.services.map((service, idx) => (
                          <span key={idx} className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 shadow-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {study.key_result && (
                      <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#1044ff] p-5 rounded-r-xl mb-8 w-full shadow-sm">
                        <p className="text-[#1044ff] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <CheckCircle size={14} /> Key Result
                        </p>
                        <p className="text-gray-900 font-semibold text-sm md:text-base">
                          {study.key_result}
                        </p>
                      </div>
                    )}
                    
                    {study.cta_href && (
                      <Button asChild className="rounded-full bg-[#1044ff] hover:bg-[#0020bf] text-white px-8 h-12 shadow-lg shadow-blue-500/20">
                        <Link to={study.cta_href}>
                          View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3 - PORTFOLIO GRID */}
      <section className="py-24 px-4 bg-gray-50/50 border-t border-gray-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-standard-light">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              More of Our Work
            </h2>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <div className="flex items-center gap-2 mr-4 text-gray-400 font-medium uppercase tracking-widest text-xs">
              <Filter size={14} /> Filter by:
            </div>
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#eb7444] to-[#e05220] border-orange-500 text-white shadow-orange-500/20'
                    : 'bg-gradient-to-r from-[#1044ff] to-[#0020bf] border-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          {loadingProjects ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#1044ff]" />
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group cursor-pointer bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#1044ff]"
                    >
                      <Link
                        to={`/our-work/${project.id}`}
                        className="block h-full flex flex-col"
                      >
                        <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-4 bg-gray-100">
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            alt={project.title}
                            src={project.main_image}
                          />
                          <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                            <motion.div
                              initial={{ scale: 0.5, opacity: 0 }}
                              whileHover={{ scale: 1.1 }}
                              className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                            >
                              <ArrowUpRight size={32} className="text-[#1044ff]" />
                            </motion.div>
                          </div>
                        </div>

                        <div className="px-3 pb-3 flex-grow flex flex-col">
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#eb7444] to-[#e05220] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm shadow-orange-500/20">
                              {project.category}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1044ff] transition-colors leading-tight">
                            {project.title}
迷                          </h3>
                          <p className="text-gray-500 font-medium text-sm line-clamp-2 leading-relaxed">
                            {project.short_description}
                          </p>

                          {project.tags && project.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1">
                              {project.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-2 py-1 rounded-md border border-gray-100"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-500">
                    <p className="text-xl">No projects found in this category yet.</p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-lg rounded-full shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
            >
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default OurWorkPage;