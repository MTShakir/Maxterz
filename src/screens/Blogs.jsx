'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'The Future of Brand Identity Design in 2025',
      excerpt: 'Explore the emerging trends shaping brand identity design and how to stay ahead of the curve in the ever-evolving creative landscape.',
      category: 'Design Trends',
      author: 'MAXTERZ Team',
      date: 'Jan 15, 2025',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
      readTime: '5 min',
    },
    {
      id: 2,
      title: 'How Animation Boosts Engagement',
      excerpt: 'Discover the powerful impact of animation on user engagement, backed by real statistics and case studies.',
      category: 'Animation',
      author: 'MAXTERZ Team',
      date: 'Jan 12, 2025',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
      readTime: '7 min',
    },
    {
      id: 3,
      title: 'Web Development Best Practices',
      excerpt: 'Essential coding standards, performance optimization techniques, and modern frameworks every developer should know.',
      category: 'Development',
      author: 'MAXTERZ Team',
      date: 'Jan 10, 2025',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
      readTime: '6 min',
    },
    {
      id: 4,
      title: 'Social Media Video Strategy',
      excerpt: 'Master the art of creating compelling social media videos that capture attention and drive engagement.',
      category: 'Video',
      author: 'MAXTERZ Team',
      date: 'Jan 08, 2025',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
      readTime: '4 min',
    },
    {
      id: 5,
      title: 'Color Psychology in Branding',
      excerpt: 'Understanding how colors influence emotions and purchasing decisions to create more effective brand identities.',
      category: 'Branding',
      author: 'MAXTERZ Team',
      date: 'Jan 05, 2025',
      image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4',
      readTime: '8 min',
    },
    {
      id: 6,
      title: 'ROI of Professional Design',
      excerpt: 'Why investing in professional creative services delivers measurable returns and drives long-term business growth.',
      category: 'Business',
      author: 'MAXTERZ Team',
      date: 'Jan 03, 2025',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
      readTime: '5 min',
    },
  ];

  return (
    <>
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="inline-block py-2 px-4 rounded-full bg-white shadow-sm text-sm font-bold tracking-widest text-[#1044ff] uppercase mb-4 border-2 border-[#1044ff]">
              Our Blog
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Creative <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Expert tips, industry analysis, and creative inspiration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-white hover:border-[#1044ff]"
              >
                <Link href={`/blogs/${blog.id}`} className="flex flex-col h-full">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={blog.title}
                      src={blog.image}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur rounded-full text-xs font-bold text-[#1044ff] border border-gray-100 shadow-sm">
                        <Tag size={12} />
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{blog.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1044ff] transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-500 mb-6 line-clamp-3 font-light leading-relaxed flex-grow">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-400">{blog.readTime} read</span>
                      <span className="inline-flex items-center text-sm font-bold text-[#1044ff] group-hover:gap-2 transition-all">
                        Read Article
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;