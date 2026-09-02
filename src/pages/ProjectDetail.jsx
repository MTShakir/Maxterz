import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error fetching project detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#1044ff]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Button asChild>
          <Link to="/portfolio">Back to Portfolio</Link>
        </Button>
      </div>
    );
  }

  // Helper to format date if available
  const formattedDate = project.project_date 
    ? new Date(project.project_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) 
    : 'Recently Completed';

  return (
    <>
      <Helmet>
        <title>{project.title} - Portfolio | MAXTERZ</title>
        <meta name="description" content={project.short_description || project.title} />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              to="/portfolio"
              className="inline-flex items-center text-[#1044ff] hover:text-[#0020bf] mb-8 font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Portfolio
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <span className="text-sm font-semibold text-[#1044ff] uppercase tracking-wider">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                  {project.title}
                </h1>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  {project.client_name && (
                    <div className="flex items-center space-x-2">
                      <User size={18} className="text-gray-400" />
                      <span className="text-gray-600">{project.client_name}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="text-gray-600">{formattedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag size={18} className="text-gray-400" />
                    <span className="text-gray-600">{project.category}</span>
                  </div>
                </div>

                <div className="text-lg text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap">
                  {project.full_description || project.short_description}
                </div>

                <div className="space-y-6">
                  {project.challenge_text && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">The Challenge</h2>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{project.challenge_text}</p>
                    </div>
                  )}

                  {project.solution_text && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Solution</h2>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{project.solution_text}</p>
                    </div>
                  )}

                  {project.results_metrics && project.results_metrics.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">Results</h2>
                      <ul className="space-y-2">
                        {project.results_metrics.map((result, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-[#1044ff] mt-1">✓</span>
                            <span className="text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.technologies_used && project.technologies_used.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">Technologies</h2>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies_used.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600 border border-gray-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                 {/* Main Image */}
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl overflow-hidden shadow-lg border border-gray-100"
                  >
                    <img className="w-full h-auto" alt={project.title} src={project.main_image} />
                 </motion.div>

                 {/* YouTube Embed */}
                 {project.youtube_embed_url && (
                    <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={project.youtube_embed_url} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                 )}

                 {/* Gallery Images */}
                {project.images && project.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="rounded-xl overflow-hidden shadow-lg border border-gray-100"
                  >
                    <img className="w-full h-auto" alt={`${project.title} gallery ${index + 1}`} src={image} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1044ff]/10 to-[#eb7444]/10 rounded-xl p-8 text-center mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-600 mb-6">
                Let's discuss how we can bring your vision to life with exceptional creative solutions.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] hover:opacity-90 rounded-full"
              >
                <Link to="/contact">Get Free Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;