import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import OneHubStatement from '@/components/home/OneHubStatement';
import FiverreProof from '@/components/home/FiverreProof';
import LaunchKitOffer from '@/components/home/LaunchKitOffer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ProcessSteps from '@/components/home/ProcessSteps';
import PackagesPreview from '@/components/home/PackagesPreview';
import Testimonials from '@/components/home/Testimonials';
import FounderNote from '@/components/home/FounderNote';
import HomeFaq from '@/components/home/HomeFaq';
import CTASection from '@/components/home/CTASection';

/**
 * Home page (brief 7.2). Same sections and order as before (D30), with the missing brief items
 * fitted in: Launch Kit block, process, founder note and FAQ. All data arrives from the server
 * page as props. Case studies and video testimonials return in Phase 5 with real content (D36).
 *
 * @param {{
 *   slides: object[], bookHref: string, serviceCards: object[], launchKit: object | null,
 *   processSteps: object[], packageCards: object[], monthlyFrom: string | null,
 *   reviews: object[], founderLines: string[], faqs: Array<{ q: string, a: string }>,
 * }} props
 */
const Home = ({
  slides,
  bookHref,
  serviceCards,
  launchKit,
  processSteps,
  packageCards,
  monthlyFrom,
  reviews,
  founderLines,
  faqs,
}) => {
  return (
    <>
      <Hero slides={slides} bookHref={bookHref} />
      <FiverreProof />
      <FeaturedServices cards={serviceCards} />
      <OneHubStatement />
      {launchKit && <LaunchKitOffer {...launchKit} />}
      <WhyChooseUs />
      <ProcessSteps steps={processSteps} bookHref={bookHref} />
      <PackagesPreview cards={packageCards} monthlyFrom={monthlyFrom} />
      <Testimonials reviews={reviews} />
      <FounderNote lines={founderLines} />
      <HomeFaq faqs={faqs} />
      <CTASection />
    </>
  );
};

export default Home;
