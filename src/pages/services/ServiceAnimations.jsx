import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ServiceAnimations = () => {
  const content = {
    title: "Animation & Motion",
    description: "Captivating 2D/3D animations that explain complex ideas simply. Bring your story to life with fluid motion.",
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    packages: [
      {
        name: "Logo Reveal",
        price: "£299",
        desc: "Dynamic animated intro for your brand.",
        features: ["Custom Logo Animation", "Sound Design", "4K Resolution", "Transparent Background", "2 Revisions"]
      },
      {
        name: "Explainer Video",
        price: "£1,499",
        desc: "60-second animated explainer to boost conversions.",
        features: ["Script Writing", "Storyboard", "Professional Voiceover", "Custom Vector Illustrations", "Background Music", "Full HD Export"]
      },
      {
        name: "3D Product Promo",
        price: "£2,999+",
        desc: "High-end 3D visualization of your product.",
        features: ["3D Modeling", "Texturing & Lighting", "Cinematic Camera Moves", "VFX & Compositing", "4K Rendering", "Commercial Rights"]
      }
    ],
    process: [
      { title: "Scripting", desc: "Crafting a compelling narrative for your video." },
      { title: "Storyboard", desc: "Visualizing scene by scene before animation begins." },
      { title: "Animation", desc: "Adding movement, life, and magic to the assets." },
      { title: "Sound", desc: "Layering sound effects and music for impact." }
    ],
    projects: [
      { title: "App Launch Explainer", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71" },
      { title: "3D Product Reveal", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" },
      { title: "Character Animation Series", image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc" }
    ]
  };

  return <ServicePageTemplate {...content} />;
};

export default ServiceAnimations;