'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Play, Star, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const VideoTestimonials = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('video_testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handlePlayClick = () => {
    toast({
      title: "Video playback",
      description: "🚧 This feature isn't implemented yet, but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-[#1044ff] via-[#0a2799] to-[#041249] px-4">
        <div className="container mx-auto">
          <div className="animate-pulse text-center mb-16">
            <div className="h-8 w-48 bg-white/20 rounded mx-auto mb-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white/10 backdrop-blur-md rounded-[2rem] h-80"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-[#1044ff] via-[#0a2799] to-[#041249] flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="text-red-400 mb-2" size={32} />
        <p className="text-white/90 mb-4">Failed to load video testimonials: {error}</p>
        <button onClick={fetchVideos} className="flex items-center gap-2 text-white font-semibold hover:underline">
          <RefreshCw size={16} /> Retry
        </button>
      </section>
    );
  }

  if (videos.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-br from-[#1044ff] via-[#0a2799] to-[#041249] px-4 relative overflow-hidden">
      {/* Decorative ambient lighting elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#eb7444]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-standard-dark border-white/30 shadow-lg">
            OUR PARTNERS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 drop-shadow-sm">
            Hear From Our Partners
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-300 aspect-[9/16] md:aspect-auto md:h-[450px]"
            >
              {/* Fake Video Thumbnail / Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041249] via-[#041249]/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#041249]/30 flex items-center justify-center">
                {video.video_url ? (
                  <img src={video.video_url} alt="" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 opacity-50" />
                )}
              </div>

              {/* Play Button */}
              <button 
                onClick={handlePlayClick}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-300 shadow-xl"
              >
                <Play className="text-white fill-white ml-1 group-hover:text-[#1044ff] group-hover:fill-[#1044ff] transition-colors duration-300" size={24} />
              </button>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex gap-1 mb-3">
                  {[...Array(video.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#eb7444] text-[#eb7444]" />
                  ))}
                </div>
                <p className="text-white/95 font-medium italic mb-4 line-clamp-3 text-sm drop-shadow-sm">
                  "{video.quote}"
                </p>
                <div>
                  <h4 className="text-white font-bold tracking-tight drop-shadow-sm">{video.client_name}</h4>
                  <p className="text-blue-200/80 text-xs mt-0.5">{video.client_role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;