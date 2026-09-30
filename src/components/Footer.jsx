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

  const exploreLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/our-work' },
    { name: 'About Us', path: '/about' },
    { name: 'Blogs', path: '/insights' },
  ];

  const colTitle = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-6 block';
  const linkCls = 'text-sm text-white/80 hover:text-white transition-colors inline-flex items-center group w-fit';

  const contactItems = [
    { label: 'Office', Icon: MapPin, href: 'https://maps.google.com/?q=128+City+Road,+London+EC1V+2NX,+United+Kingdom', external: true, text: <>128 City Road, London<br />EC1V 2NX, United Kingdom</> },
    { label: 'Email Us', Icon: Mail, href: 'mailto:info@maxterz.co.uk', text: 'info@maxterz.co.uk' },
    { label: 'Call Us', Icon: Phone, href: 'tel:+447375874706', text: '+44 7375 874706' },
  ];

  return (
    <footer className="mt-20 px-4 pb-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto rounded-[2.5rem] bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white pt-14 pb-8 px-8 md:px-16 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <motion.div variants={itemVariants} className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/15">
          <div className="max-w-md">
            <Link href="/" onClick={handleLinkClick} className="inline-block mb-5 group">
              <img
                src="https://qcsflpsyzvigswlotepz.supabase.co/storage/v1/object/public/BrandingFiles/MaxtrerzLogoFW.png"
                alt="MAXTERZ Logo"
                loading="lazy"
                className="h-14 w-auto object-contain object-left group-hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              We are a premium creative studio engineering digital awe. We transform bold visions into market-dominating realities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="h-12 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <a href="https://wa.me/447375874706" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} className="mr-2" />
                Contact on WhatsApp
              </a>
            </Button>
            <Button asChild className="h-12 px-6 rounded-full bg-gradient-to-r from-[#eb7444] to-[#e05220] text-white hover:opacity-90 shadow-lg shadow-orange-900/20">
              <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                <Calendar size={18} className="mr-2" />
                Book free Consultation
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 py-12 relative z-10">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <span className={colTitle}>Explore</span>
            <nav className="flex flex-col gap-3">
              {exploreLinks.map((item) => (
                <Link key={item.name} href={item.path} onClick={handleLinkClick} className={linkCls}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <span className={colTitle}>Services</span>
            <nav className="flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <Link key={service.name} href={service.path} onClick={handleLinkClick} className={linkCls}>
                  {service.name}
                  <ArrowUpRight size={12} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-4 lg:col-start-9">
            <span className={colTitle}>Contact</span>
            <div className="flex flex-col gap-5">
              {contactItems.map(({ label, Icon, href, external, text }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 group"
                >
                  <Icon size={18} className="text-orange-300 mt-1 shrink-0" />
                  <div>
                    <span className="text-[11px] text-white/50 uppercase tracking-widest font-semibold block mb-1">{label}</span>
                    <span className="text-sm text-white/90 group-hover:text-white transition-colors leading-relaxed">{text}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-white/50 text-xs text-center md:text-left">
            © {new Date().getFullYear()} MAXTERZ LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all"
              >
                <social.Icon size={16} className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" onClick={handleLinkClick} className="text-white/50 hover:text-white transition-colors text-xs">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" onClick={handleLinkClick} className="text-white/50 hover:text-white transition-colors text-xs">
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
