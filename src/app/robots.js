/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  if (process.env.VERCEL_ENV === 'preview') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: 'https://maxterz.com/sitemap.xml',
    host: 'https://maxterz.com',
  };
}
