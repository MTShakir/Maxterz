import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicServerClient } from '@/lib/supabaseServer';
import { getPricing } from '@/lib/pricing';
import { isAddOn, lowestPrice, priceParts } from '@/lib/pricing-calc';
import { bookHref } from '@/lib/cta';

/** A strip with fewer slides than this looks broken, so it stays hidden (inventory section 4). */
const MIN_SLIDES = 3;

/**
 * Stripe Payment Links for the 4 "Buy now" items (price book 2.8). Read on the server,
 * because NEXT_PUBLIC values cannot be looked up by name in the browser.
 * A missing link hides its Buy now button.
 */
const STRIPE_LINKS = {
  NEXT_PUBLIC_STRIPE_LINK_LOGO_DESIGN: process.env.NEXT_PUBLIC_STRIPE_LINK_LOGO_DESIGN,
  NEXT_PUBLIC_STRIPE_LINK_LOGO_ANIMATION: process.env.NEXT_PUBLIC_STRIPE_LINK_LOGO_ANIMATION,
  NEXT_PUBLIC_STRIPE_LINK_THUMBNAIL: process.env.NEXT_PUBLIC_STRIPE_LINK_THUMBNAIL,
  NEXT_PUBLIC_STRIPE_LINK_SHORT_EDIT: process.env.NEXT_PUBLIC_STRIPE_LINK_SHORT_EDIT,
};

/**
 * Hero strip slides for one page (D32), cached with tag 'slides'.
 * @param {string} pagePath
 */
export const getSlides = unstable_cache(
  async (pagePath) => {
    const { data, error } = await createPublicServerClient()
      .from('hero_slides')
      .select('id, media_type, image_url, video_url, poster_url, alt_text')
      .eq('page_path', pagePath)
      .order('display_order');
    // Slides are optional: a read error hides the strip instead of failing the page.
    if (error) {
      console.error(`[slides] ${error.message}`);
      return [];
    }
    return data;
  },
  ['hero-slides'],
  { tags: ['slides'], revalidate: 3600 },
);

/**
 * Published Fiverr reviews: service-matched first, then general ones, cached with tag 'testimonials'.
 * @param {string[]} serviceSlugs e.g. ["logo-design"]
 * @param {number} limit
 */
export const getReviews = unstable_cache(
  async (serviceSlugs, limit) => {
    const { data, error } = await createPublicServerClient()
      .from('testimonials')
      .select('id, author_name, location, quote, service_slug, period_label, is_featured, display_order')
      .order('is_featured', { ascending: false })
      .order('display_order');
    // Reviews are optional: a read error hides the section instead of failing the page.
    if (error) {
      console.error(`[reviews] ${error.message}`);
      return [];
    }
    const matched = data.filter((review) => serviceSlugs.includes(review.service_slug));
    const general = data.filter((review) => review.service_slug === 'general');
    return [...matched, ...general].slice(0, limit);
  },
  ['reviews'],
  { tags: ['testimonials'], revalidate: 3600 },
);

/**
 * A price item ready for display: price parts, Book a free call link and Buy now link.
 * @param {object} item a price_items row
 * @param {string} serviceSlug
 * @param {{ forceFrom?: boolean }} [options]
 */
function toDisplayItem(item, serviceSlug, options) {
  return {
    ...item,
    is_addon: isAddOn(item),
    display: priceParts(item, options),
    book_href: bookHref(serviceSlug),
    buy_url: item.self_serve && item.stripe_link_env ? STRIPE_LINKS[item.stripe_link_env] || null : null,
  };
}

/**
 * Everything a service or category page reads from Supabase, on the server (D30).
 *
 * @param {string} path the page path, e.g. "/services/branding-design/logo-design"
 * @param {{ serviceSlug: string, reviewSlugs?: string[], reviewCount?: number, forceFrom?: boolean }} options
 * @returns {Promise<{
 *   prices: object[], fromPrice: number | null, billing: 'one-off' | 'monthly',
 *   slides: object[], reviews: object[], bookHref: string
 * }>}
 */
export async function getServicePageData(path, { serviceSlug, reviewSlugs = [], reviewCount = 3, forceFrom = false }) {
  const [{ items }, slides, reviews] = await Promise.all([
    getPricing(),
    getSlides(path),
    getReviews(reviewSlugs, reviewCount),
  ]);

  const prices = items
    .filter((item) => item.service_page === path)
    .map((item) => toDisplayItem(item, serviceSlug, { forceFrom }));
  const addOns = prices.filter((item) => item.is_addon);
  // Add-ons are sold with a service, so they never set the page's "from" price.
  const fromPrice = lowestPrice(prices.filter((item) => !item.is_addon));
  const cheapest = prices.find((item) => item.price_gbp === fromPrice && !item.is_addon);

  return {
    prices,
    addOns,
    fromPrice,
    billing: cheapest?.model === 'monthly' ? 'monthly' : 'one-off',
    // A compulsory set-up fee always sits next to the monthly price (brief 7.6).
    setupFee: cheapest?.setup_fee_gbp ?? null,
    slides: slides.length >= MIN_SLIDES ? slides : [],
    reviews,
    bookHref: bookHref(serviceSlug),
  };
}
