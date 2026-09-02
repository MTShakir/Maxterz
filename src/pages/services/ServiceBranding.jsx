import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ServiceBranding = () => {
  const content = {
    title: "Branding & Identity",
    description: "Strategic logo design and brand identity that defines your market position. We create brands that people remember.",
    heroImage: "https://images.unsplash.com/photo-1634942537034-2531766767d1",
    packages: [
      {
        name: "Identity Starter",
        price: "£499",
        desc: "Essential branding for startups.",
        features: ["Logo Design (3 Concepts)", "Color Palette", "Typography Selection", "Business Card Design", "Final Files (AI, PNG, SVG)"]
      },
      {
        name: "Full Brand Suite",
        price: "£1,299",
        desc: "Comprehensive branding for serious businesses.",
        features: ["Logo Design (Unlimited Revisions)", "Brand Guidelines Book", "Social Media Kit", "Stationery Design", "Email Signature", "Brand Voice Guide"]
      },
      {
        name: "Corporate Rebrand",
        price: "£3,500+",
        desc: "Total transformation for established companies.",
        features: ["Complete Brand Strategy", "Market Research", "Logo & Visual System", "Marketing Collateral", "Website Reskin", "Launch Strategy"]
      }
    ],
    process: [
      { title: "Research", desc: "Deep dive into your market, values, and vision." },
      { title: "Concept", desc: "Exploring creative directions and visual styles." },
      { title: "Refinement", desc: "Polishing the chosen direction to perfection." },
      { title: "Delivery", desc: "Providing all assets and guidelines for consistency." }
    ],
    projects: [
      { title: "EcoLife Rebrand", image: "https://images.unsplash.com/photo-1626785774573-4b799314346d" },
      { title: "FinTech Logo System", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
      { title: "Coffee House Identity", image: "https://images.unsplash.com/photo-1517263904808-5dc8b43d18c0" }
    ]
  };

  return <ServicePageTemplate {...content} />;
};

export default ServiceBranding;