'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routeLabels = {
  'services': 'Services',
  'web-development': 'Web & App Development',
  'business-website-design': 'Business Website Design',
  'ecommerce-website-design': 'Ecommerce Website Design',
  'mobile-app-development': 'Mobile App Development',
  'branding-design': 'Branding & Design',
  'logo-design': 'Logo Design & Branding',
  'thumbnail-design': 'Thumbnail Design',
  'video-animation': 'Video & Animation',
  'logo-animation': 'Logo Animation',
  'explainer-videos': 'Explainer & SaaS Videos',
  'social-media-management': 'Social Media Management',
  'ai-automation': 'AI & Automation',
  'seo-digital-marketing': 'SEO & Digital Marketing',
  'seo-services': 'SEO Services',
  'packages': 'Packages',
  'our-work': 'Our Work',
  'about': 'About',
  'shop': 'Shop',
  'insights': 'Insights',
  'contact': 'Contact Us',
  'privacy-policy': 'Privacy Policy',
  'terms-conditions': 'Terms & Conditions'
};

const formatLabel = (segment) => {
  return routeLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter(x => x);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    // Check initial position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathnames.length === 0) return null;

  // Determine scaling based on scroll and hover states
  const scaleClass = isScrolled && !isHovered ? 'scale-[0.7] opacity-80' : 'scale-100 opacity-100';

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="sticky top-[116px] z-40 w-full px-4 md:px-8 pointer-events-none pt-2 pb-4"
    >
      <div className="container mx-auto">
        <ol 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`inline-flex flex-wrap items-center m-0 list-none text-[13px] bg-white/90 backdrop-blur-md border border-[#e5e7eb] shadow-sm rounded-full px-5 py-2.5 pointer-events-auto transform origin-left transition-all duration-300 ease-in-out ${scaleClass}`} 
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          <li 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
            className="flex items-center"
          >
            <Link
              href="/"
              itemProp="item"
              className="text-gray-500 hover:text-[#1044ff] transition-colors"
            >
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = formatLabel(value);

            return (
              <li 
                key={to}
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                <span className="mx-2 text-[#d1d5db]" aria-hidden="true">›</span>
                {last ? (
                  <span 
                    itemProp="name" 
                    className="text-[#111827] font-medium"
                    aria-current="page"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={to}
                    itemProp="item"
                    className="text-gray-500 hover:text-[#1044ff] transition-colors"
                  >
                    <span itemProp="name">{label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 2)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;