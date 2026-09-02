import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Star, Quote, AlertCircle, RefreshCw } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="animate-pulse text-center mb-16">
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-10 w-64 bg-gray-300 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-50 p-8 rounded-[2rem] border border-gray-100 h-64"></div>
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
        <p className="text-gray-600 mb-4">Failed to load testimonials: {error}</p>
        <button onClick={fetchTestimonials} className="flex items-center gap-2 text-[#1044ff] font-semibold hover:underline">
          <RefreshCw size={16} /> Retry
        </button>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-standard-light">
            CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Loved by Brands Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 card-standard-light relative group flex flex-col"
            >
              <Quote size={40} className="text-[#1044ff] opacity-10 absolute top-6 right-6 group-hover:scale-110 transition-transform" />
              
              <div className="flex mb-6 gap-1">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#eb7444] text-[#eb7444]" />
                ))}
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-base italic flex-grow">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                {testimonial.avatar_url ? (
                  <img src={testimonial.avatar_url} alt={testimonial.author_name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {testimonial.avatar_initials}
                  </div>
                )}
                <div>
                  <p className="font-extrabold text-gray-900 tracking-tight">{testimonial.author_name}</p>
                  <p className="text-xs text-gray-500 font-medium">
                    {testimonial.location} {testimonial.platform ? `· via ${testimonial.platform}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;