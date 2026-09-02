import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ServiceWebsites = () => {
  const content = {
    title: "Websites & Development",
    description: "Custom, high-performance websites built for speed, SEO, and maximum conversion. We build digital foundations that scale.",
    heroImage: "https://images.unsplash.com/photo-1547658719-da2b51169166",
    packages: [
      {
        name: "Starter Web",
        price: "£999",
        desc: "Perfect for small businesses establishing an online presence.",
        features: ["Custom 5-Page Design", "Mobile Responsive", "Basic SEO Setup", "Contact Form Integration", "1 Month Support"]
      },
      {
        name: "Pro Business",
        price: "£2,499",
        desc: "Advanced functionality for growing businesses.",
        features: ["10+ Pages Custom Design", "CMS Integration (WordPress/React)", "Advanced SEO Optimization", "Speed Optimization", "Analytics Dashboard", "3 Months Support"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        desc: "Complex web applications and large-scale platforms.",
        features: ["Full Stack Development", "Custom API Integrations", "Database Architecture", "Advanced Security", "User Auth Systems", "Dedicated Support Team"]
      }
    ],
    process: [
      { title: "Discovery", desc: "We analyze your goals, target audience, and competitors." },
      { title: "Wireframing", desc: "Structuring the user journey and layout blueprints." },
      { title: "Development", desc: "Coding your site with clean, modern, scalable code." },
      { title: "Launch", desc: "Testing, optimization, and going live to the world." }
    ],
    projects: [
      { title: "TechCorp SaaS Platform", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" },
      { title: "Luxe Fashion E-commerce", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" },
      { title: "Modern Portfolio Site", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8" }
    ]
  };

  return <ServicePageTemplate {...content} />;
};

export default ServiceWebsites;