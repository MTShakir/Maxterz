import { buildMetadata, ROUTES } from '@/lib/routes';
import { JsonLd, PageSchema } from '@/lib/schema';
import { getPricing } from '@/lib/pricing';
import { formatGBP, packageSaving, packageValue, priceParts } from '@/lib/pricing-calc';
import { bookHref } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/packages';
import PackagesPage from '@/screens/PackagesPage';

const PATH = '/packages';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

/**
 * "Services from £X" cards (D39, D42 proposed): each category names its core service and that
 * service's starting price, read live from Supabase, and links to its service pages.
 */
const SERVICE_CARDS = [
  {
    title: 'Web Design and Development', href: '/services/web-development', item: 'website-5', lead: 'Websites', linkText: 'See web design prices',
    blurb: 'Business websites, online stores, apps and custom software.',
    pages: ['/services/web-development/business-website-design', '/services/web-development/ecommerce-website-design', '/services/web-development/app-and-software-development'],
  },
  {
    title: 'Branding and Design', href: '/services/branding-design', item: 'logo-essential', lead: 'Logos', linkText: 'See branding prices',
    blurb: 'Logos, brand identities, social media design and thumbnails.',
    pages: ['/services/branding-design/logo-design', '/services/branding-design/brand-identity-design', '/services/branding-design/social-media-design', '/services/branding-design/thumbnail-design'],
  },
  {
    title: 'Video and Animation', href: '/services/video-animation', item: 'logo-animation-essential', lead: 'Logo animation', linkText: 'See video prices',
    blurb: 'Logo animation, motion graphics, explainer videos and video editing.',
    pages: ['/services/video-animation/logo-animation', '/services/video-animation/motion-graphics', '/services/video-animation/explainer-videos', '/services/video-animation/video-editing'],
  },
  { title: 'Social Media Management', href: '/services/social-media-management', item: 'smm-starter', lead: 'Monthly plans', linkText: 'See social media prices', blurb: 'Content, posting and community management on up to 4 platforms.', pages: [] },
  { title: 'AI and Automation', href: '/services/ai-automation', item: 'ai-chat-agent', lead: 'AI chat agents', linkText: 'See AI prices', blurb: 'AI chatbots for your website and WhatsApp, plus workflow automation.', pages: [] },
  { title: 'SEO and Digital Marketing', href: '/services/seo-digital-marketing', item: 'local-seo', lead: 'SEO plans', linkText: 'See SEO prices', blurb: 'SEO, local SEO, Google Business Profile and paid ads.', pages: [] },
];

/** Navigation name of a route, from the route registry. */
const routeLabel = (path) => ROUTES.find((r) => r.path === path)?.breadcrumbLabel ?? path;

export default async function Packages() {
  const { items, packages, packageItems } = await getPricing();
  const itemById = new Map(items.map((item) => [item.id, item]));
  const care = packages.find((p) => p.type === 'care');

  /** One package with its calculated value and saving, ready for a card. */
  const toCard = (p) => {
    const value = packageValue(p.id, packageItems, items);
    const saving = packageSaving(value, p.price_gbp);
    const monthly = p.type === 'monthly';
    const notes = [];
    // Timelines run from the day we receive the client's content (price book section 3).
    if (p.timeline) notes.push(`Delivery: ${p.timeline} from receiving your content`);
    if (p.minimum_term) notes.push(`Minimum term: ${p.minimum_term}`);
    if (p.notice) notes.push(`Notice: ${p.notice}`);
    if (p.payment_terms) notes.push(`Payment: ${p.payment_terms}`);
    if (p.includes_care_plus && care) notes.push(`Care Plus from launch: ${formatGBP(care.price_gbp)} a month, ${care.minimum_term}`);
    return {
      id: p.id,
      name: p.name,
      price: formatGBP(p.price_gbp),
      price_suffix: monthly ? 'a month' : '',
      ideal_for: p.ideal_for,
      features: p.includes_copy,
      is_featured: p.popular,
      badge_text: p.popular ? (monthly ? 'Most popular' : 'Recommended') : '',
      founding:
        p.founding_enabled && p.founding_price_gbp
          ? `Founding price for the first ${p.founding_slots} clients: ${formatGBP(p.founding_price_gbp)}, in return for a video testimonial and a case study.`
          : '',
      value_line: value && saving
        ? `Bought separately: ${formatGBP(value)}${monthly ? ' a month' : ''}. You save ${formatGBP(saving.amount)} (${saving.percent}%).`
        : '',
      notes,
      cta_href: bookHref(p.id),
      secondary: p.id === 'launch-kit' ? { href: '/packages/launch-kit', label: 'See what the Launch Kit includes' } : undefined,
    };
  };

  const oneTime = packages.filter((p) => p.type === 'one-time').map(toCard);
  const monthly = packages.filter((p) => p.type === 'monthly').map(toCard);
  const designVideo = itemById.get('design-video-sub');
  const customBuild = itemById.get('custom-software');

  const serviceCards = SERVICE_CARDS.map(({ pages, item: itemId, lead, ...card }) => {
    const item = itemById.get(itemId);
    const d = item ? priceParts(item) : null;
    return {
      ...card,
      links: pages.map((href) => ({ href, label: routeLabel(href) })),
      price: d ? `${lead} from ${d.amount}${d.suffix ? ` ${d.suffix}` : ''}${d.setup ? `, plus ${d.setup}` : ''}` : null,
    };
  });

  // OfferCatalog under the Organization (brief 7.6): packages at a fixed price, plans per month.
  const offers = packages
    .filter((p) => p.type !== 'care')
    .map((p) => ({
      '@type': 'Offer',
      name: p.name,
      url: p.id === 'launch-kit' ? `${SITE.url}/packages/launch-kit` : `${SITE.url}/packages#${p.type === 'monthly' ? 'monthly' : 'packages'}`,
      priceCurrency: 'GBP',
      ...(p.type === 'monthly'
        ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price_gbp, priceCurrency: 'GBP', unitCode: 'MON' } }
        : { price: p.price_gbp }),
      itemOffered: { '@type': 'Service', name: p.name, description: p.ideal_for },
    }));
  const catalog = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        '@id': `${SITE.url}/packages#catalog`,
        name: 'Maxterz packages and monthly plans',
        itemListElement: offers,
      },
      { '@id': `${SITE.url}/#organization`, hasOfferCatalog: { '@id': `${SITE.url}/packages#catalog` } },
    ],
  };

  return (
    <>
      <PageSchema path={PATH} faqs={faqs} />
      <JsonLd data={catalog} />
      <PackagesPage
        h1={route.h1}
        oneTime={oneTime}
        monthly={monthly}
        carePrice={care ? formatGBP(care.price_gbp) : null}
        designVideoLine={designVideo ? `Design + Video: ${formatGBP(designVideo.price_gbp)} a month, with two active requests at a time.` : null}
        customFrom={customBuild?.price_gbp ? formatGBP(customBuild.price_gbp) : null}
        serviceCards={serviceCards}
        bookHref={bookHref('packages')}
      />
    </>
  );
}
