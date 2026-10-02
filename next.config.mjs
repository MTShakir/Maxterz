/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'qcsflpsyzvigswlotepz.supabase.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    const securityHeaders = [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    ];
    const previewHeaders =
      process.env.VERCEL_ENV === 'preview'
        ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
        : [];
    return [
      {
        source: '/(.*)',
        headers: [...securityHeaders, ...previewHeaders],
      },
    ];
  },

  async redirects() {
    return [
      // Services hub redirect — keep until Phase 2 creates the hub page
      { source: '/services', destination: '/services/web-development', permanent: true },

      // Old individual service paths
      { source: '/services/websites', destination: '/services/web-development', permanent: true },
      { source: '/services/branding', destination: '/services/branding-design', permanent: true },
      { source: '/services/animations', destination: '/services/video-animation', permanent: true },
      { source: '/services/design', destination: '/services/branding-design', permanent: true },
      { source: '/services/ai-tech', destination: '/services/ai-automation', permanent: true },

      // Fixed: was /services/video-animation (wrong) — now correct destination
      { source: '/services/video-editing', destination: '/services/video-animation/video-editing', permanent: true },

      // Portfolio rename
      { source: '/portfolio', destination: '/our-work', permanent: true },
      { source: '/portfolio/:id', destination: '/our-work', permanent: true },

      // Blogs rename — Fixed: /blogs/:id was going to /insights/:id (placeholder posts), now /insights
      { source: '/blogs', destination: '/insights', permanent: true },
      { source: '/blogs/:id', destination: '/insights', permanent: true },
    ];
  },
};

export default nextConfig;
