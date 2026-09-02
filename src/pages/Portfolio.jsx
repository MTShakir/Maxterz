import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default filters - you can also make this dynamic by fetching distinct categories from DB
  const filters = ['All', 'Graphics Design', 'Animation', 'Web Development', 'Video Editing'];

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
        // We could set an empty array or handle error state visually
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Portfolio - Our Masterpieces | MAXTERZ</title>
        <meta name="description" content="View our portfolio of award-winning work across web design, branding, animation, and video editing." />
      </Helmet>

      <section className="py-24 px-4 bg-gray-50/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-2 px-4 rounded-full bg-white shadow-sm text-sm font-bold tracking-widest text-[#1044ff] uppercase mb-4 border border-blue-100">
              Our Work
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Selected <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">Masterpieces</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Where creative vision meets technical perfection. Explore our latest work.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
          {loading ? (
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
                      className="group cursor-pointer bg-white rounded-[2.5rem] p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#1044ff] hover:border-[#1044ff]"
                    >
                      <Link to={`/portfolio/${project.id}`} className="block h-full flex flex-col">
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
                          </h3>
                          <p className="text-gray-500 font-medium text-sm line-clamp-2 leading-relaxed">
                            {project.short_description}
                          </p>
                          
                          {/* Tags Display */}
                          {project.tags && project.tags.length > 0 && (
                             <div className="mt-4 flex flex-wrap gap-1">
                               {project.tags.slice(0, 3).map((tag, idx) => (
                                 <span key={idx} className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
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
            className="text-center"
          >
             <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
               <Link to="/contact">Start Your Project</Link>
             </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;