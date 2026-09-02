import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ServiceAITech = () => {
  const content = {
    title: "AI & Future Tech",
    description: "Leveraging cutting-edge AI tools to optimize and scale your business. Stay ahead of the curve with next-gen solutions.",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    packages: [
      {
        name: "AI Consultation",
        price: "£299",
        desc: "Strategy session to identify AI opportunities.",
        features: ["Workflow Audit", "Tool Recommendations", "Implementation Roadmap", "Risk Assessment", "1 Hour Strategy Call"]
      },
      {
        name: "AI Automation",
        price: "£1,499",
        desc: "Automate repetitive tasks with AI.",
        features: ["Custom Chatbot Setup", "Zapier/Make Integrations", "Content Generation Workflows", "Customer Support Automation", "Staff Training"]
      },
      {
        name: "Custom AI Solution",
        price: "Custom",
        desc: "Bespoke AI development for unique needs.",
        features: ["Fine-tuned LLM Models", "Computer Vision Systems", "Predictive Analytics", "Custom API Development", "Secure Data Handling", "Ongoing Maintenance"]
      }
    ],
    process: [
      { title: "Audit", desc: "Analyzing your current workflows for bottlenecks." },
      { title: "Strategy", desc: "Selecting the right AI tools and models." },
      { title: "Implementation", desc: " integrating AI seamlessly into your stack." },
      { title: "Training", desc: "Teaching your team to use the new tools effectively." }
    ],
    projects: [
      { title: "Customer Support Bot", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a" },
      { title: "Automated Content Engine", image: "https://images.unsplash.com/photo-1664575198308-3959904fa430" },
      { title: "Data Analysis Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71" }
    ]
  };

  return <ServicePageTemplate {...content} />;
};

export default ServiceAITech;