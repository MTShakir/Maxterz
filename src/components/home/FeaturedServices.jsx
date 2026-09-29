'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Video, Code, Users, Cpu, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedServices = () => {
  const services = [
    {
      icon: Code,
      title: 'Web & App Development',
      description: 'High-converting, fast, responsive websites and apps designed for credibility, SEO, and lead generation.',
      points: ['Business websites', 'Ecommerce stores', 'Mobile apps', 'UI/UX design'],
      cta: 'Explore Web & App',
      link: '/services/web-development',
      delay: 0.1
    },
    {
      icon: Palette,
      title: 'Branding & Design',
      description: 'Strategic branding that makes your business look established, trustworthy, and memorable.',
      points: ['Logo Design', 'Full brand identity systems', 'Thumbnail design', 'Graphic design'],
      cta: 'Explore Branding',
      link: '/services/branding-design',
      delay: 0.2
    },
    {
      icon: Video,
      title: 'Video & Animation',
      description: 'Bring your brand to life with cinematic, professional video and animations designed for web and social.',
      points: ['Logo Animation', 'Explainer & SaaS videos', 'Video editing', 'Motion graphics'],
      cta: 'Explore Video',
      link: '/services/video-animation',
      delay: 0.3
    },
    {
      icon: Users,
      title: 'Social Media Management',
      description: 'End-to-end social media strategies that build community, increase engagement, and drive sales.',
      points: ['Content creation', 'Community management', 'Reels & TikToks', 'Growth strategy'],
      cta: 'Explore Social Media',
      link: '/services/social-media-management',
      delay: 0.4
    },
    {
      icon: Cpu,
      title: 'AI & Automation',
      description: 'Smart automation and AI development solutions to save time, reduce costs, and scale faster.',
      points: ['AI Chatbots', 'Workflow Automation', 'Custom Software', 'AI Consulting'],
      cta: 'Explore AI',
      link: '/services/ai-automation',
      delay: 0.5
    },
    {
      icon: TrendingUp,
      title: 'SEO & Digital Marketing',
      description: 'Data-driven marketing and SEO to boost your visibility, outrank competitors, and capture leads.',
      points: ['SEO Services', 'Technical Audits', 'Keyword Research', 'Paid Advertising'],
      cta: 'Explore SEO',
      link: '/services/seo-digital-marketing',
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 px-4 bg-gray-50/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-standard-light">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Services That <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">Scale Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-normal leading-relaxed">
            We do not just deliver services. We deliver measurable growth across design, web, marketing, SEO, video, and AI. All from one team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay }}
              whileHover={{ y: -8 }}
              className="group relative h-full min-h-[350px] sm:min-h-[550px] shadow-sm hover:shadow-xl transition-all duration-300 rounded-[1.5rem] md:rounded-[2.5rem]"
            >
              <Link href={service.link} className="block h-full">
                <div className="h-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] p-[18px] sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden flex flex-col border-2 border-white">
                  {/* Decorative Circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />
                  
                  {/* Icon Container with Hover Effect */}
                  <div className="mb-6 md:mb-8 inline-flex p-3 sm:p-4 rounded-[1rem] md:rounded-2xl bg-white/10 backdrop-blur-sm w-fit group-hover:bg-gradient-to-r group-hover:from-[#eb7444] group-hover:to-[#e05220] transition-all duration-300 border border-white shadow-lg">
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg sm:text-2xl font-extrabold text-white mb-3 md:mb-4 group-hover:translate-x-1 transition-transform duration-300 tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/80 mb-5 md:mb-6 font-light leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>

                  <ul className="hidden sm:block mb-6 md:mb-8 space-y-2 md:space-y-3 flex-grow">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start text-sm text-white/90">
                         <CheckCircle2 className="w-4 h-4 mr-2 text-[#eb7444] flex-shrink-0 mt-0.5" />
                         {point}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <span className="inline-flex items-center justify-center w-full py-3 px-4 sm:py-3 sm:px-6 rounded-full bg-white text-[#1044ff] font-bold text-sm border-2 border-[#1044ff] group-hover:bg-[#eb7444] group-hover:text-white group-hover:border-white transition-all duration-300">
                      {service.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-5 md:px-10 md:py-6 text-base md:text-lg border-2 border-[#1044ff] text-[#1044ff] hover:bg-[#1044ff] hover:text-white transition-all duration-300"
          >
            <Link href="/services/web-development">
              View All Services
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;