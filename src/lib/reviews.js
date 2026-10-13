// @ts-check

/** Service names for review cards, keyed by testimonials.service_slug ("general" has none). */
export const REVIEW_SERVICE_LABELS = {
  'logo-design': 'Logo design',
  'logo-animation': 'Logo animation',
  'thumbnail-design': 'Thumbnail design',
};

/**
 * Shows a period label only when it is a month and year (fiverr-reviews.json rules).
 * @param {string | null | undefined} label
 */
export const showPeriod = (label) => Boolean(label) && /^[A-Z][a-z]+ \d{4}$/.test(String(label));

/**
 * The attribution line every review carries (D11: reviews are always "on Fiverr").
 * @param {string | null | undefined} serviceSlug
 */
export const fiverrAttribution = (serviceSlug) => {
  const service = serviceSlug ? REVIEW_SERVICE_LABELS[serviceSlug] : undefined;
  return service ? `${service} review on Fiverr` : 'Review on Fiverr';
};
