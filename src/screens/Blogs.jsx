'use client';

import React from 'react';
import Link from 'next/link';

const Blogs = () => (
  <section className="py-24 px-4 bg-[#efefef]">
    <div className="container mx-auto max-w-3xl text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Insights</h1>
      <p className="text-xl text-gray-500 mb-10 font-light">
        Practical guides on websites, branding, SEO and AI automation for business owners.
        The first post is coming soon.
      </p>
      <Link
        href="/contact"
        className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white font-semibold text-base hover:opacity-90 transition-opacity"
      >
        Get in touch
      </Link>
    </div>
  </section>
);

export default Blogs;