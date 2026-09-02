import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ServiceDesign = () => {
  const content = {
    title: "Graphic Design",
    description: "Stunning visuals for marketing, social media, and print materials. We design specifically to catch the eye and convert.",
    heroImage: "https://images.unsplash.com/photo-1626785774573-4b799314346d",
    packages: [
      {
        name: "Social Media Pack",
        price: "£299",
        desc: "Consistent visuals for your channels.",
        features: ["10 Custom Post Templates", "5 Story Templates", "Profile & Cover Images", "Canva Editable Files", "Brand Style Application"]
      },
      {
        name: "Marketing Collateral",
        price: "£599",
        desc: "Print and digital sales assets.",
        features: ["Brochure Design", "Flyer/Poster Design", "Presentation Deck (15 Slides)", "Infographics", "Print-Ready Files"]
      },
      {
        name: "Creative Retainer",
        price: "£1,500/mo",
        desc: "Ongoing design support for your team.",
        features: ["Unlimited Design Requests", "48h Turnaround", "Dedicated Designer", "Source Files Included", "Priority Support", "Cancel Anytime"]
      }
    ],
    process: [
      { title: "Briefing", desc: "Understanding the goal and audience of the design." },
      { title: "Drafting", desc: "Creating initial layout and composition sketches." },
      { title: "Design", desc: "Applying color, typography, and imagery." },
      { title: "Export", desc: "Preparing files for print or digital deployment." }
    ],
    projects: [
      { title: "Event Poster Series", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5" },
      { title: "Digital Magazine Layout", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad" },
      { title: "Product Packaging", image: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68" }
    ]
  };

  return <ServicePageTemplate {...content} />;
};

export default ServiceDesign;