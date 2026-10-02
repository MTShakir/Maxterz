'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialLinks = [
  { name: 'Facebook',  url: 'https://www.facebook.com/maxterzhub',          Icon: Facebook  },
  { name: 'Instagram', url: 'https://www.instagram.com/maxterzhub/',        Icon: Instagram },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/company/maxterzhub/', Icon: Linkedin  },
  { name: 'X',         url: 'https://x.com/MaxterzHUB',                     Icon: XIcon     },
  { name: 'TikTok',    url: 'https://www.tiktok.com/@maxterzhub',           Icon: TikTokIcon },
];

const scrollTop = () => window.scrollTo(0, 0);

const colTitle = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-5 block';
const linkCls  = 'text-[13.5px] text-white/75 hover:text-white transition-colors';

const Footer = () => (
  <footer className="mt-20 px-4 pb-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto rounded-[2.5rem] bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-white pt-14 pb-8 px-8 md:px-16 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

      {/* 5-column grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">

        {/* Col 1: Brand */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link href="/" onClick={scrollTop} className="inline-block mb-5 group">
            <img
              src="/images/maxterz-logo-horizontal-dark.svg"
              alt="Maxterz"
              width="176"
              height="40"
              loading="lazy"
              className="h-10 w-auto object-contain object-left group-hover:opacity-90 transition-opacity"
            />
          </Link>
          <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-xs">
            A UK-registered digital agency for websites, branding, video, SEO and AI.
            10,000+ projects delivered since 2017.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/60
                           hover:text-white hover:bg-white/15 transition-all"
              >
                <Icon className="w-[15px] h-[15px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <span className={colTitle}>Services</span>
          <nav className="flex flex-col gap-3">
            {[
              { label: 'Web and App Development',   path: '/services/web-development'         },
              { label: 'Branding and Design',        path: '/services/branding-design'         },
              { label: 'Video and Animation',        path: '/services/video-animation'         },
              { label: 'Social Media Management',    path: '/services/social-media-management' },
              { label: 'AI and Automation',          path: '/services/ai-automation'           },
              { label: 'SEO and Digital Marketing',  path: '/services/seo-digital-marketing'   },
            ].map(({ label, path }) => (
              <Link key={path} href={path} onClick={scrollTop} className={linkCls}>{label}</Link>
            ))}
          </nav>
        </div>

        {/* Col 3: Popular */}
        <div>
          <span className={colTitle}>Popular</span>
          <nav className="flex flex-col gap-3">
            {[
              { label: 'Free Website Audit', path: '/free-website-audit' },
              { label: 'Pricing',            path: '/packages'           },
              { label: 'Launch Kit',         path: '/packages/launch-kit'},
              { label: 'Our Work',           path: '/our-work'           },
              { label: 'Book a Free Call',   path: '/book'               },
              { label: 'Reviews',            path: '/reviews'            },
            ].map(({ label, path }) => (
              <Link key={path} href={path} onClick={scrollTop} className={linkCls}>{label}</Link>
            ))}
          </nav>
        </div>

        {/* Col 4: Company */}
        <div>
          <span className={colTitle}>Company</span>
          <nav className="flex flex-col gap-3">
            {[
              { label: 'About',               path: '/about'           },
              { label: 'Contact',             path: '/contact'         },
              { label: 'Insights',            path: '/insights'        },
              { label: 'Privacy Policy',      path: '/privacy-policy'  },
              { label: 'Terms',               path: '/terms-conditions'},
              { label: 'Cookie Policy',       path: '/cookie-policy'   },
            ].map(({ label, path }) => (
              <Link key={path} href={path} onClick={scrollTop} className={linkCls}>{label}</Link>
            ))}
          </nav>
        </div>

        {/* Col 5: Talk to us */}
        <div>
          <span className={colTitle}>Talk to Us</span>
          <div className="flex flex-col gap-4 mb-6">
            <a
              href="mailto:info@maxterz.com"
              className="flex items-start gap-3 group"
            >
              <Mail size={16} className="text-orange-300 mt-0.5 shrink-0" />
              <span className="text-[13.5px] text-white/75 group-hover:text-white transition-colors">
                info@maxterz.com
              </span>
            </a>
            <a
              href="tel:+447375874706"
              className="flex items-start gap-3 group"
            >
              <Phone size={16} className="text-orange-300 mt-0.5 shrink-0" />
              <span className="text-[13.5px] text-white/75 group-hover:text-white transition-colors">
                +44 7375 874706
              </span>
            </a>
            <a
              href="https://maps.google.com/?q=128+City+Road,+London+EC1V+2NX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <MapPin size={16} className="text-orange-300 mt-0.5 shrink-0" />
              <span className="text-[13.5px] text-white/75 group-hover:text-white transition-colors leading-snug">
                128 City Road, London<br />EC1V 2NX, UK
              </span>
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/book"
              onClick={scrollTop}
              className="flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold text-white bg-gradient-to-r from-[#eb7444] to-[#e05220] hover:opacity-90 transition-opacity"
            >
              Book a free call
            </Link>
            <a
              href="https://wa.me/447375874706"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="relative z-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-white/45 text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} MAXTERZ LTD. All rights reserved. UK-registered company.
        </p>
        <div className="flex gap-5">
          <Link href="/privacy-policy"   onClick={scrollTop} className="text-white/45 hover:text-white transition-colors text-xs">Privacy</Link>
          <Link href="/terms-conditions" onClick={scrollTop} className="text-white/45 hover:text-white transition-colors text-xs">Terms</Link>
          <Link href="/cookie-policy"    onClick={scrollTop} className="text-white/45 hover:text-white transition-colors text-xs">Cookies</Link>
        </div>
      </div>
    </motion.div>
  </footer>
);

export default Footer;
