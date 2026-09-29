'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, TrendingUp, Heart, Zap, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Custom Icons
const XIcon = ({ className, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TikTokIcon = ({ className, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const AboutUs = () => {
  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '350+', label: 'Happy Clients' },
    { value: '5+', label: 'Years Experience' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const values = [
    { icon: Award, title: 'Excellence', description: 'We strive for perfection in every project.' },
    { icon: Heart, title: 'Passion', description: 'We love what we do, and it shows in our work.' },
    { icon: Users, title: 'Collaboration', description: 'Your success is our success.' },
    { icon: Zap, title: 'Innovation', description: 'Staying ahead of trends and technologies.' },
    { icon: Target, title: 'Results', description: 'Focus on measurable outcomes.' },
    { icon: TrendingUp, title: 'Growth', description: 'Helping brands scale and evolve.' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/maxterzhub', Icon: Facebook, color: 'hover:bg-blue-600' },
    { name: 'Instagram', url: 'https://www.instagram.com/maxterzhub/', Icon: Instagram, color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/maxterzhub/', Icon: Linkedin, color: 'hover:bg-blue-700' },
    { name: 'X', url: 'https://x.com/MaxterzHUB', Icon: XIcon, color: 'hover:bg-black' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@maxterzhub', Icon: TikTokIcon, color: 'hover:bg-black' },
  ];

  return (
    <>
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="inline-block py-2 px-4 rounded-full bg-white shadow-sm text-sm font-bold tracking-widest text-[#1044ff] uppercase mb-4 border-2 border-[#1044ff]">
              About MAXTERZ
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Creative Excellence <span className="bg-gradient-to-r from-[#eb7444] to-[#e05220] bg-clip-text text-transparent">Delivered</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              We're a team of passionate creatives dedicated to transforming visions into exceptional realities.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[#1044ff] rounded-[2.5rem] rotate-[-3deg] opacity-10"></div>
              <img className="w-full h-auto rounded-[2.5rem] shadow-2xl border-4 border-white relative z-10" alt="MAXTERZ creative team working together" src="https://images.unsplash.com/photo-1690191886622-fd8d6cda73bd" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Who We Are
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-light">
                <p>
                  MAXTERZ is a premium creative studio established with a singular vision: to deliver world-class design, animation, development, and video editing services that drive real business results.
                </p>
                <p>
                  Since our inception, we've worked with over 350 clients across diverse industries, from ambitious startups to established enterprises. Our team combines technical expertise with creative innovation to produce work that doesn't just look good. It performs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                 {stats.map((stat, i) => (
                   <div key={i} className="bg-gradient-to-br from-[#1044ff] to-[#0020bf] p-6 rounded-[2rem] text-white border-2 border-white shadow-lg">
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">{stat.label}</div>
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>

          {/* Logo Animation Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 flex justify-center"
          >
            <div className="relative w-full max-w-4xl aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#1044ff]">
              <video
                src="https://qcsflpsyzvigswlotepz.supabase.co/storage/v1/object/public/BrandingFiles/Maxterz%20LA01.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label="MAXTERZ logo animation video"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-[#1044ff] group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#eb7444] to-[#e05220] flex items-center justify-center mb-6 shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                    <value.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-500 font-light">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#eb7444] to-[#e05220] rounded-[3rem] p-12 md:p-16 text-center border-2 border-gray-100 text-white"
          >
             <h2 className="text-3xl md:text-4xl font-bold mb-6">
               Follow Us On Social Media
             </h2>
             <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
               Stay updated with our latest projects, behind-the-scenes content, and industry insights. Join our growing community!
             </p>

             <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-3 group`}
                  >
                    <div className={`w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-[#eb7444] transition-all duration-300 ${social.color} group-hover:text-white border-2 border-transparent group-hover:border-white`}>
                      <social.Icon size={28} />
                    </div>
                    <span className="font-bold text-sm text-white group-hover:text-gray-100 transition-colors">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
             </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;