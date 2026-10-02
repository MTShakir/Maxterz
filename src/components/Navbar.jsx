'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Palette, Video, Users, Cpu, TrendingUp,
  ChevronDown, Menu, X, Facebook, Instagram, Linkedin,
} from 'lucide-react';

// ─── Custom SVG Icons ─────────────────────────────────────────────────────────
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

// ─── Static Data ──────────────────────────────────────────────────────────────
const socialLinks = [
  { href: 'https://www.facebook.com/maxterzhub',          Icon: Facebook,   label: 'Facebook'  },
  { href: 'https://www.instagram.com/maxterzhub/',        Icon: Instagram,  label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/maxterzhub/', Icon: Linkedin,   label: 'LinkedIn'  },
  { href: 'https://x.com/MaxterzHUB',                     Icon: XIcon,      label: 'X'         },
  { href: 'https://www.tiktok.com/@maxterzhub',           Icon: TikTokIcon, label: 'TikTok'    },
];

const serviceCategories = [
  { to: '/services/web-development',         label: 'Web and App Development'    },
  { to: '/services/branding-design',         label: 'Branding and Design'        },
  { to: '/services/video-animation',         label: 'Video and Animation'        },
  { to: '/services/social-media-management', label: 'Social Media Management'    },
  { to: '/services/ai-automation',           label: 'AI and Automation'          },
  { to: '/services/seo-digital-marketing',   label: 'SEO and Digital Marketing'  },
];

const megaCols = [
  {
    Icon: Code,
    label: 'Web and App Development',
    subpages: [
      { to: '/services/web-development/business-website-design', label: 'Business Website Design'   },
      { to: '/services/web-development/ecommerce-website-design', label: 'Ecommerce Website Design' },
      { to: '/services/web-development/mobile-app-development',  label: 'Mobile App Development'    },
      { to: '/services/web-development/app-design',              label: 'App and UI/UX Design'       },
    ],
    anchors: [],
    viewAll: { to: '/services/web-development', label: 'View all web services' },
    borderRight: true, borderTop: false,
  },
  {
    Icon: Palette,
    label: 'Branding and Design',
    subpages: [
      { to: '/services/branding-design/logo-design',            label: 'Logo Design'            },
      { to: '/services/branding-design/brand-identity-design',  label: 'Brand Identity Design'  },
      { to: '/services/branding-design/social-media-design',    label: 'Social Media Design'    },
      { to: '/services/branding-design/thumbnail-design',       label: 'Thumbnail Design'        },
    ],
    anchors: [],
    viewAll: { to: '/services/branding-design', label: 'View all design services' },
    borderRight: true, borderTop: false,
  },
  {
    Icon: Video,
    label: 'Video and Animation',
    subpages: [
      { to: '/services/video-animation/logo-animation',   label: 'Logo Animation'         },
      { to: '/services/video-animation/explainer-videos', label: 'Explainer Videos'        },
      { to: '/services/video-animation/motion-graphics',  label: 'Motion Graphics'         },
      { to: '/services/video-animation/video-editing',    label: 'Video Editing and Reels' },
    ],
    anchors: [],
    viewAll: { to: '/services/video-animation', label: 'View all video services' },
    borderRight: false, borderTop: false,
  },
  {
    Icon: Users,
    label: 'Social Media Management',
    description: 'Strategy, content, reels and community management, handled end to end.',
    subpages: [],
    anchors: [],
    viewAll: { to: '/services/social-media-management', label: 'View social media services' },
    borderRight: true, borderTop: true,
  },
  {
    Icon: Cpu,
    label: 'AI and Automation',
    subpages: [
      { to: '/services/ai-automation/ai-receptionist', label: 'AI Receptionist'                   },
      { to: '/services/ai-automation/ai-chat-agents',  label: 'AI Chat Agents (WhatsApp and SMS)' },
    ],
    anchors: [
      { href: '/services/ai-automation#workflow-automation', label: 'Workflow Automation' },
      { href: '/services/ai-automation#ai-consulting',       label: 'AI Consulting'       },
    ],
    viewAll: { to: '/services/ai-automation', label: 'View all AI services' },
    borderRight: true, borderTop: true,
  },
  {
    Icon: TrendingUp,
    label: 'SEO and Digital Marketing',
    subpages: [
      { to: '/services/seo-digital-marketing/seo-services', label: 'SEO Services'  },
      { to: '/services/seo-digital-marketing/local-seo',    label: 'Local SEO'     },
    ],
    anchors: [
      { href: '/services/seo-digital-marketing#paid-advertising', label: 'Paid Advertising' },
      { href: '/services/seo-digital-marketing#technical-seo',    label: 'Technical SEO'    },
    ],
    viewAll: { to: '/services/seo-digital-marketing', label: 'View all marketing services' },
    borderRight: false, borderTop: true,
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(100);

  const pathname = usePathname();
  const headerRef = useRef(null);
  const servicesBtnRef = useRef(null);
  const megaPanelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const updateHeaderBottom = () => {
    if (headerRef.current) {
      setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
    }
  };

  useEffect(() => {
    updateHeaderBottom();
    window.addEventListener('scroll', updateHeaderBottom, { passive: true });
    window.addEventListener('resize', updateHeaderBottom);
    return () => {
      window.removeEventListener('scroll', updateHeaderBottom);
      window.removeEventListener('resize', updateHeaderBottom);
    };
  }, [isScrolled]);

  useEffect(() => {
    if (megaMenuOpen) updateHeaderBottom();
  }, [megaMenuOpen]);

  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onMouseDown = (e) => {
      const inBtn = servicesBtnRef.current?.contains(e.target);
      const inPanel = megaPanelRef.current?.contains(e.target);
      if (!inBtn && !inPanel) setMegaMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { setMegaMenuOpen(false); setMobileMenuOpen(false); }
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const isActive = (path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  const linkCls = (path) =>
    `px-5 py-2 rounded-full text-[15px] font-bold transition-all duration-300 ${
      isActive(path)
        ? 'bg-[#1044ff] text-white shadow-lg shadow-blue-500/30'
        : 'text-gray-600 hover:text-[#1044ff] hover:bg-white'
    }`;

  const closeMega = () => setMegaMenuOpen(false);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'circOut' }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-in-out px-4 md:px-8 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div
          className={`container mx-auto rounded-full transition-all duration-300 backdrop-blur-xl ${
            isScrolled
              ? 'bg-white/95 shadow-xl shadow-blue-900/5 px-6 py-3 border-2 border-[#1044ff]'
              : 'bg-white/80 px-4 py-2 border border-white/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center gap-2 group relative z-50 mr-8"
            >
              <div className="relative h-10 w-44">
                <img
                  src="/images/maxterz-logo-horizontal.svg"
                  alt="Maxterz"
                  width="176"
                  height="40"
                  className="h-full w-full object-contain object-left group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <nav
              role="navigation"
              aria-label="Main navigation"
              className="hidden lg:flex items-center flex-grow justify-center"
            >
              <div className="flex items-center px-1.5 py-1.5 rounded-full border-2 border-[#eb7444] bg-gray-50/50 backdrop-blur-sm">
                <Link href="/" className={linkCls('/')} onClick={() => window.scrollTo(0, 0)}>
                  Home
                </Link>

                <button
                  ref={servicesBtnRef}
                  onClick={() => setMegaMenuOpen((p) => !p)}
                  aria-expanded={megaMenuOpen}
                  aria-controls="mega-menu"
                  className={`flex items-center gap-1 px-5 py-2 rounded-full text-[15px] font-bold transition-all duration-300 ${
                    megaMenuOpen
                      ? 'bg-[#1044ff] text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-600 hover:text-[#1044ff] hover:bg-white'
                  }`}
                >
                  Services
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <Link href="/packages" className={linkCls('/packages')}>Pricing</Link>
                <Link href="/our-work" className={linkCls('/our-work')}>Our Work</Link>
                <Link href="/about"    className={linkCls('/about')}>About</Link>
                <Link href="/contact"  className={linkCls('/contact')}>Contact</Link>
              </div>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                {socialLinks.slice(0, 3).map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-400 hover:text-[#eb7444] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <Link
                href="/book"
                className="flex items-center gap-2 rounded-full px-6 h-12 text-[15px] font-bold
                           bg-gradient-to-r from-[#eb7444] to-[#e05220] text-white
                           shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40
                           hover:scale-105 transition-all duration-300 border border-orange-400/20"
              >
                Book a free call
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="lg:hidden p-2 text-gray-800 hover:text-[#eb7444] transition-colors"
            >
              <Menu size={28} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            ref={megaPanelRef}
            id="mega-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: `${headerBottom + 8}px`,
              left: 0,
              right: 0,
              margin: '0 auto',
              width: 'min(1160px, calc(100vw - 48px))',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e8eaed',
              boxShadow: '0 16px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
              zIndex: 998,
              maxHeight: `calc(100vh - ${headerBottom + 24}px)`,
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 0,
              }}
            >
              {megaCols.map((col) => (
                <div
                  key={col.label}
                  className="group hover:bg-[#fafbff] transition-colors duration-150"
                  style={{
                    padding: '24px 28px',
                    borderRight: col.borderRight ? '1px solid #f0f2f5' : 'none',
                    borderTop:  col.borderTop   ? '1px solid #f0f2f5' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '180px',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '36px',
                        height: '36px',
                        background: '#1044FF',
                        borderRadius: '8px',
                      }}
                    >
                      <col.Icon size={18} className="text-[#EEF2FF]" />
                    </div>
                    <span className="text-[#111827] text-[15px] font-bold leading-tight">
                      {col.label}
                    </span>
                  </div>

                  {col.description && (
                    <p className="text-[#6b7280] text-[13px] leading-relaxed flex-grow mb-2">
                      {col.description}
                    </p>
                  )}

                  {col.subpages.length > 0 && (
                    <div className="flex flex-col gap-0.5 mb-1">
                      {col.subpages.map(({ to, label }) => (
                        <Link
                          key={to}
                          href={to}
                          onClick={closeMega}
                          className="py-[3px] text-[#374151] text-[13.5px] font-semibold
                                     hover:text-[#1044ff] hover:translate-x-0.5
                                     transition-all duration-150"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}

                  {col.anchors.length > 0 && (
                    <div className="flex flex-col gap-0.5 mb-1">
                      {col.anchors.map(({ href, label }) => (
                        <a
                          key={href}
                          href={href}
                          onClick={closeMega}
                          className="py-[3px] text-[#9ca3af] text-[13.5px] font-normal
                                     hover:text-[#1044ff] hover:translate-x-0.5
                                     transition-all duration-150"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-3">
                    <Link
                      href={col.viewAll.to}
                      onClick={closeMega}
                      className="inline-flex items-center gap-1 text-[13px] font-semibold
                                 text-[#1044ff] hover:text-[#e7581e] transition-colors duration-150"
                    >
                      {col.viewAll.label}
                      <span className="text-[11px]">&#8594;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{   opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[1000] bg-white lg:hidden flex flex-col overflow-y-auto"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="h-16 px-5 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/images/maxterz-logo-horizontal.svg"
                  alt="Maxterz"
                  width="176"
                  height="40"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                className="p-2 text-gray-800 hover:text-[#eb7444] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow pt-6 pb-4 flex flex-col space-y-1">
              {[
                { path: '/',         label: 'Home'     },
                { type: 'services',  label: 'Services' },
                { path: '/packages', label: 'Pricing'  },
                { path: '/our-work', label: 'Our Work' },
                { path: '/about',    label: 'About'    },
                { path: '/contact',  label: 'Contact'  },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.type === 'services' ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen((p) => !p)}
                        className={`w-full flex items-center justify-between px-8 py-3
                                   text-[clamp(26px,6vw,36px)] font-extrabold tracking-tight
                                   transition-colors ${
                                     isActive('/services')
                                       ? 'text-[#eb7444]'
                                       : 'text-gray-900 hover:text-[#eb7444]'
                                   }`}
                      >
                        Services
                        <span className={`text-2xl font-bold transition-transform duration-300 ${
                          mobileServicesOpen ? 'rotate-45 text-[#eb7444]' : 'text-gray-400'
                        }`}>+</span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          mobileServicesOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
                      >
                        <div className="flex flex-col pb-3 pt-1">
                          {serviceCategories.map(({ to, label }) => (
                            <Link
                              key={to}
                              href={to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="px-12 py-2.5 text-[17px] font-semibold
                                         text-gray-700 hover:text-[#eb7444] transition-colors"
                            >
                              {label}
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-12 py-2.5 mt-1 text-[17px] font-bold
                                       text-[#1044ff] hover:text-[#eb7444] transition-colors"
                          >
                            View all services &#8594;
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-8 py-3 text-[clamp(26px,6vw,36px)]
                                 font-extrabold tracking-tight transition-colors ${
                                   isActive(item.path)
                                     ? 'text-[#eb7444]'
                                     : 'text-gray-900 hover:text-[#eb7444]'
                                 }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex-shrink-0 pb-10 px-8"
            >
              <div className="flex justify-center gap-3 mb-6">
                {socialLinks.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center
                               text-gray-500 hover:bg-[#eb7444] hover:text-white hover:border-[#eb7444]
                               transition-all duration-200"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-full py-4 text-[16px] font-bold text-white
                           bg-gradient-to-r from-[#eb7444] to-[#e05220]
                           hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
              >
                Book a free call
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
