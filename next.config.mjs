/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'qcsflpsyzvigswlotepz.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      // Old services hub + legacy individual service routes
      { source: '/services', destination: '/services/web-development', permanent: true },
      { source: '/services/websites', destination: '/services/web-development', permanent: true },
      { source: '/services/branding', destination: '/services/branding-design', permanent: true },
      { source: '/services/animations', destination: '/services/video-animation', permanent: true },
      { source: '/services/video-editing', destination: '/services/video-animation', permanent: true },
      { source: '/services/design', destination: '/services/branding-design', permanent: true },
      { source: '/services/ai-tech', destination: '/services/ai-automation', permanent: true },

      // Portfolio -> Our Work rename
      { source: '/portfolio', destination: '/our-work', permanent: true },
      { source: '/portfolio/:id', destination: '/our-work', permanent: true },

      // Blogs -> Insights rename
      { source: '/blogs', destination: '/insights', permanent: true },
      { source: '/blogs/:id', destination: '/insights/:id', permanent: true },
    ];
  },
};

export default nextConfig;
