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
    const SITE = 'https://maxterz.com';

    // Path rules shared across host rules and the direct rule set.
    // Each entry: [source, relative-destination].
    // Used twice: once per proxy host (absolute destination) and once directly.
    const pathRules = [
      ['/portfolio',     '/our-work'],
      ['/portfolio/:id', '/our-work'],
      ['/about-us',      '/about'],
      ['/blogs',         '/insights'],
      ['/blogs/:id',     '/insights'],
      ['/services/design',        '/services/branding-design'],
      ['/services/branding',      '/services/branding-design'],
      ['/services/animations',    '/services/video-animation'],
      ['/services/websites',      '/services/web-development'],
      ['/services/video-editing', '/services/video-animation/video-editing'],
      ['/services/ai-tech',       '/services/ai-automation'],
      ['/shop',          '/packages'],
      ['/insights/:id',  '/insights'],
    ];

    // Hosts that mirror maxterz.com content — redirect every path to maxterz.com.
    // Specific path rules first (one hop to final URL), then catch-all.
    const proxyHosts = [
      'maxterz.co.uk',
      'www.maxterz.co.uk',
      'www.maxterz.com',
      'maxterz.vercel.app',
    ];

    // maxterzhub.co.uk — old WordPress site, specific paths first then root catch-all.
    const maxterzhubHosts = ['maxterzhub.co.uk', 'www.maxterzhub.co.uk'];
    const maxterzhubPaths = [
      ['/services/digital-marketing',               `${SITE}/services/seo-digital-marketing`],
      ['/services/search-engine-optimization-seo',  `${SITE}/services/seo-digital-marketing`],
      ['/services/programing-and-tech',             `${SITE}/services/web-development`],
      ['/services/video-editing',                   `${SITE}/services/video-animation/video-editing`],
      ['/services/short-video-ads-2',               `${SITE}/services/video-animation/motion-graphics`],
      ['/portfolio',                                `${SITE}/our-work`],
    ];

    /** @type {import('next').Redirect[]} */
    const rules = [];

    // 1. maxterzhub.co.uk — specific paths, then root catch-all
    for (const host of maxterzhubHosts) {
      for (const [source, destination] of maxterzhubPaths) {
        rules.push({ source, destination, permanent: true, has: [{ type: 'host', value: host }] });
      }
      rules.push({ source: '/:path*', destination: `${SITE}/`, permanent: true, has: [{ type: 'host', value: host }] });
    }

    // 2. Proxy hosts — specific path rules (one hop to final URL), then catch-all
    for (const host of proxyHosts) {
      for (const [source, dest] of pathRules) {
        rules.push({ source, destination: `${SITE}${dest}`, permanent: true, has: [{ type: 'host', value: host }] });
      }
      rules.push({ source: '/:path*', destination: `${SITE}/:path*`, permanent: true, has: [{ type: 'host', value: host }] });
    }

    // 3. Direct path rules on maxterz.com
    for (const [source, destination] of pathRules) {
      rules.push({ source, destination, permanent: true });
    }

    return rules;
  },
};

export default nextConfig;
