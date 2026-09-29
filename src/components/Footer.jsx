'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowUpRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
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

const WhatsAppIcon = ({ className, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);


const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/maxterzhub', Icon: Facebook },
    { name: 'Instagram', url: 'https://www.instagram.com/maxterzhub/', Icon: Instagram },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/maxterzhub/', Icon: Linkedin },
    { name: 'X', url: 'https://x.com/MaxterzHUB', Icon: XIcon },
    { name: 'TikTok', url: 'https://www.tiktok.com/@maxterzhub', Icon: TikTokIcon },
  ];

  const serviceLinks = [
    { name: 'Graphics Design', path: '/services/design' },
    { name: 'Animation & Motion', path: '/services/animations' },
    { name: 'Web Development', path: '/services/websites' },
    { name: 'Video Editing', path: '/services/video-editing' },
    { name: 'AI Solutions', path: '/services/ai-tech' }
  ];

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="mt-20 px-4 pb-4">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto rounded-[3rem] bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white pt-20 pb-10 px-8 md:px-16 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16 relative z-10">
          
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link href="/" onClick={handleLinkClick} className="inline-block mb-6 group">
              <div className="relative h-20 w-80">
                 <img
                    src="https://qcsflpsyzvigswlotepz.supabase.co/storage/v1/object/public/BrandingFiles/MaxtrerzLogoFW.png"
                    alt="MAXTERZ Logo"
                    loading="lazy"
                    className="h-full w-full object-contain object-left group-hover:scale-105 transition-transform duration-300"
                 />
              </div>
            </Link>
            <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-sm font-light">
              We are a premium creative studio engineering digital awe. We transform bold visions into market-dominating realities.
            </p>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#eb7444] hover:border-[#eb7444] transition-all"
                  aria-label={social.name}
                >
                  <social.Icon size={18} className="w-[18px] h-[18px]" />
                </motion.a>
              ))}
            </div>
            
            <div className="flex flex-col gap-4">
                <Button asChild className="w-full sm:w-auto justify-start bg-[#25D366] hover:bg-[#128C7E] text-white border-2 border-white rounded-xl">
                    <a href="https://wa.me/447375874706" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon size={20} className="mr-2 fill-current" />
                        Contact on WhatsApp
                    </a>
                </Button>
                <Button asChild className="w-full sm:w-auto justify-start bg-gradient-to-r from-[#eb7444] to-[#e05220] text-white hover:opacity-90 border-2 border-white rounded-xl">
                    <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                        <Calendar size={20} className="mr-2" />
                        Book free Consultation
                    </a>
                </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <span className="font-bold text-lg mb-6 text-white tracking-wide block">Explore</span>
            <nav className="flex flex-col gap-3">
              {['Home', 'Services', 'Portfolio', 'About Us', 'Blogs'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  onClick={handleLinkClick}
                  className="text-blue-100 hover:text-white transition-colors text-sm hover:translate-x-1 duration-200 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 mr-2 transition-opacity" />
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <span className="font-bold text-lg mb-6 text-white tracking-wide block">Services</span>
            <nav className="flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <Link key={service.name} href={service.path} onClick={handleLinkClick} className="text-blue-100 hover:text-white transition-colors text-sm hover:translate-x-1 duration-200 flex items-center justify-between group w-fit">
                  {service.name}
                  <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0" />
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <span className="font-bold text-lg mb-6 text-white tracking-wide block">Contact</span>
            <div className="flex flex-col gap-5">
               <a href="https://maps.google.com/?q=128+City+Road,+London+EC1V+2NX,+United+Kingdom" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group hover:bg-white/5 p-2 rounded-2xl transition-colors -ml-2">
                 <div className="p-3 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                   <MapPin size={20} className="text-orange-400" />
                 </div>
                 <div>
                   <span className="text-xs text-blue-200 uppercase tracking-wider font-bold block mb-1">Office</span>
                   <p className="text-white/90 text-sm leading-relaxed">
                    128 City Road, London<br />
                    EC1V 2NX, United Kingdom
                   </p>
                 </div>
               </a>

               <a href="mailto:info@maxterz.co.uk" className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-2xl transition-colors -ml-2">
                 <div className="p-3 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                   <Mail size={20} className="text-orange-400" />
                 </div>
                 <div>
                   <span className="text-xs text-blue-200 uppercase tracking-wider font-bold block mb-1">Email Us</span>
                   <span className="text-white/90 group-hover:text-white transition-colors text-sm font-medium">
                     info@maxterz.co.uk
                   </span>
                 </div>
               </a>

               <a href="tel:+447375874706" className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-2xl transition-colors -ml-2">
                 <div className="p-3 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                   <Phone size={20} className="text-orange-400" />
                 </div>
                 <div>
                   <span className="text-xs text-blue-200 uppercase tracking-wider font-bold block mb-1">Call Us</span>
                   <span className="text-white/90 group-hover:text-white transition-colors text-sm font-medium">
                     +44 7375 874706
                   </span>
                 </div>
               </a>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-blue-100/60 text-xs font-medium text-center md:text-left">
            © {new Date().getFullYear()} MAXTERZ LTD. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" onClick={handleLinkClick} className="text-blue-100/60 hover:text-white transition-colors text-xs font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" onClick={handleLinkClick} className="text-blue-100/60 hover:text-white transition-colors text-xs font-medium">
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;