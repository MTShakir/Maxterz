// @ts-check
import { SITE } from './site';

/**
 * The one primary call to action (D09, inventory section 5): Book a free call.
 * Every booking button links here, with the page's service slug so /book can pass
 * it on to Calendly and GA4.
 *
 * @param {string} [serviceSlug] e.g. "logo-design"
 * @returns {string}
 */
export function bookHref(serviceSlug) {
  return serviceSlug ? `/book?service=${encodeURIComponent(serviceSlug)}` : '/book';
}

/** Button and link text for the primary call to action. */
export const BOOK_LABEL = 'Book a free call';

/**
 * The service slug for a page path, for site-wide buttons (header, mobile bar):
 * "/services/branding-design/logo-design" gives "logo-design", "/packages/launch-kit" gives "launch-kit".
 *
 * @param {string | null} pathname
 * @returns {string | undefined}
 */
export function serviceSlugFromPath(pathname) {
  if (!pathname) return undefined;
  if (pathname.startsWith('/services/') || pathname.startsWith('/packages/')) {
    return pathname.split('/').filter(Boolean).pop();
  }
  return undefined;
}

/**
 * WhatsApp link with the prefilled message from brief 9.1.
 * @param {string} [serviceSlug] the page's service, e.g. "logo-design"
 * @returns {string}
 */
export function whatsappHref(serviceSlug) {
  const page = serviceSlug ? `your ${serviceSlug.replace(/-/g, ' ')} page` : 'your website';
  return `${SITE.whatsappUrl}?text=${encodeURIComponent(`Hi Maxterz, I'm on ${page} and I'd like to talk about a project.`)}`;
}
