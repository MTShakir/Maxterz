import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ServiceVideoEditing = () => {
  const content = {
    title: "Video Editing",
    description: "Professional post-production that turns raw footage into cinematic gold. We tell stories through the art of the cut.",
    heroImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c",
    packages: [
      {
        name: "Social Clips",
        price: "£199",
        desc: "Short, punchy edits for Instagram/TikTok.",
        features: ["Up to 60 Seconds", "Dynamic Captions", "Trending Transitions", "Color Correction", "Music Sync", "Vertical Format"]
      },
      {
        name: "YouTube Pro",
        price: "£499",
        desc: "Engaging edits for long-form content.",
        features: ["Up to 15 Minutes", "Narrative Pacing", "B-Roll Sourcing", "Sound Mixing", "Motion Graphics Titles", "Thumbnail Design"]
      },
      {
        name: "Commercial Film",
        price: "£1,500+",
        desc: "Broadcast-quality editing for ads and docs.",
        features: ["Advanced Color Grading", "Sound Design & Mastering", "VFX Cleanup", "Multi-Cam Editing", "Director's Cut", "Multiple Format Exports"]
      }
    ],
    process: [
      { title: "Ingest", desc: "Organizing footage and syncing audio sources." },
      { title: "Assembly", desc: "Creating the rough cut to establish the story structure." },
      { title: "Polish", desc: "Adding color, effects, transitions, and graphics." },
      { title: "Mastering", desc: "Final audio mix and high-quality export." }
    ],
    projects: [
      { title: "Travel Vlog Series", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4" },
      { title: "Corporate Interview", image: "https://images.unsplash.com/photo-1559056961-1f4dbbf9d36a" },
      { title: "Music Video Production", image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38" }
    ]
  };

  return <ServicePageTemplate {...content} />;
};

export default ServiceVideoEditing;