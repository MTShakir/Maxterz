'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import TrustStats from '@/components/home/TrustStats';
import FeaturedServices from '@/components/home/FeaturedServices';
import OneHubStatement from '@/components/home/OneHubStatement';
import FiverreProof from '@/components/home/FiverreProof';
import CaseStudies from '@/components/home/CaseStudies';
import VideoTestimonials from '@/components/home/VideoTestimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PackagesPreview from '@/components/home/PackagesPreview';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <FiverreProof />
        <FeaturedServices />
        <OneHubStatement />
        <CaseStudies />
        <VideoTestimonials />
        <WhyChooseUs />
        <PackagesPreview />
        <Testimonials />
        <CTASection />
      </main>
    </>
  );
};

export default Home;
