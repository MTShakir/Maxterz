'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const blog = {
    id: id,
    title: 'The Future of Brand Identity Design in 2025',
    category: 'Design Trends',
    author: 'MAXTERZ Team',
    date: 'January 15, 2025',
    readTime: '5 min read',
    content: `Brand identity design continues to evolve at a rapid pace, shaped by technological advancements, changing consumer behaviors, and emerging aesthetic trends. As we move through 2025, understanding these shifts is crucial for creating brands that resonate with modern audiences.

The integration of AI and machine learning has revolutionized how designers approach brand creation. These tools enable rapid iteration and testing of design concepts, allowing for more data-driven decisions while maintaining creative excellence.

Minimalism continues to dominate, but with a twist. We're seeing the emergence of "warm minimalism" that combines clean lines with organic textures and human-centric elements. This approach creates brands that feel both modern and approachable.

Color psychology plays an increasingly important role, with brands carefully selecting palettes that trigger specific emotional responses and align with their core values. The use of gradients has evolved beyond simple two-color transitions to complex, multi-dimensional color stories.

Typography is breaking traditional boundaries, with custom typefaces becoming more accessible and expected. Brands are investing in unique letterforms that communicate their personality before a single word is read.

Motion design has become integral to brand identity, with animated logos and dynamic visual systems creating more engaging brand experiences across digital platforms.`,
    image: 'Modern brand identity design with futuristic elements and color gradients',
  };

  const handleShare = () => {
    toast({
      title: "Share functionality",
      description: "🚧 This feature isn't implemented yet, but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <article className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center text-[#1044ff] hover:text-[#0020bf] mb-8 font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Blog
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="inline-block px-4 py-1 bg-[#1044ff]/10 text-[#1044ff] rounded-full text-sm font-semibold mb-4">
                  {blog.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                  <div className="flex items-center space-x-2">
                    <User size={18} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={18} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="mb-8"
                >
                  <Share2 size={18} className="mr-2" />
                  Share Article
                </Button>
              </div>

              <div className="rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <img className="w-full h-auto" alt={blog.title} src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
              </div>

              <div className="prose prose-lg max-w-none">
                {blog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t">
                <div className="bg-gradient-to-r from-[#1044ff]/10 to-[#eb7444]/10 rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Transform Your Brand?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Let our expert team help you create a brand identity that stands out in 2025 and beyond.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] hover:opacity-90"
                  >
                    <Link href="/contact">Get Free Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;