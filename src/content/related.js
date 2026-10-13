// @ts-check

/**
 * Related links for each service and category page (brief 6.7 and 7.5 item 11):
 * service pages link to their parent hub and up to 2 related services (siblings first,
 * then a natural next step from another category); category pages link to 2 related
 * categories. Labels and descriptions come from src/lib/routes.js.
 *
 * @type {Record<string, string[]>}
 */
export const RELATED = {
  // Web
  '/services/web-development': ['/services/branding-design', '/services/seo-digital-marketing'],
  '/services/web-development/business-website-design': [
    '/services/web-development',
    '/services/web-development/ecommerce-website-design',
    '/services/branding-design/logo-design',
  ],
  '/services/web-development/ecommerce-website-design': [
    '/services/web-development',
    '/services/web-development/business-website-design',
    '/services/web-development/app-and-software-development',
  ],
  '/services/web-development/app-and-software-development': [
    '/services/web-development',
    '/services/web-development/business-website-design',
    '/services/ai-automation',
  ],

  // Branding
  '/services/branding-design': ['/services/video-animation', '/services/web-development'],
  '/services/branding-design/logo-design': [
    '/services/branding-design',
    '/services/branding-design/brand-identity-design',
    '/services/video-animation/logo-animation',
  ],
  '/services/branding-design/thumbnail-design': [
    '/services/branding-design',
    '/services/branding-design/social-media-design',
    '/services/video-animation/video-editing',
  ],

  // Video
  '/services/video-animation': ['/services/branding-design', '/services/social-media-management'],
  '/services/video-animation/logo-animation': [
    '/services/video-animation',
    '/services/video-animation/motion-graphics',
    '/services/branding-design/logo-design',
  ],
  '/services/video-animation/explainer-videos': [
    '/services/video-animation',
    '/services/video-animation/motion-graphics',
    '/services/video-animation/video-editing',
  ],

  // Single category pages
  '/services/social-media-management': ['/services/branding-design', '/services/seo-digital-marketing'],
  '/services/ai-automation': ['/services/web-development', '/services/seo-digital-marketing'],
  '/services/seo-digital-marketing': ['/services/web-development', '/services/social-media-management'],
};
