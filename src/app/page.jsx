import Home from '@/screens/Home';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getPricing } from '@/lib/pricing';
import { getReviews, getSlides } from '@/lib/pageData';
import { formatGBP, packageSaving, packageValue } from '@/lib/pricing-calc';
import { bookHref } from '@/lib/cta';
import { FEATURED_SERVICES, FOUNDER_NOTE, PROCESS_STEPS, buildHomeFaqs } from '@/content/home';

const route = ROUTES.find((r) => r.path === '/');
export const metadata = buildMetadata(route);
export const revalidate = 300;

/** Navigation name of a route, from the route registry. */
const routeLabel = (path) => ROUTES.find((r) => r.path === path)?.breadcrumbLabel ?? path;

export default async function HomePage() {
  const [{ items, packages, packageItems }, slides, reviews] = await Promise.all([
    getPricing(),
    getSlides('/'),
    // Service-tagged reviews first, so each card can name its service (brief 7.2 item 8).
    getReviews(['logo-design', 'logo-animation', 'thumbnail-design'], 6),
  ]);
  const itemById = new Map(items.map((item) => [item.id, item]));
  const care = packages.find((p) => p.type === 'care');
  const kit = packages.find((p) => p.id === 'launch-kit');

  // Service cards: names from routes.js, so menus, breadcrumbs and cards always match.
  const serviceCards = FEATURED_SERVICES.map((card) => ({
    icon: card.icon,
    title: routeLabel(card.hub),
    href: card.hub,
    description: card.description,
    cta: card.cta,
    links: card.links?.map((href) => ({ href, label: routeLabel(href) })),
    points: card.points,
  }));

  // Launch Kit block (brief 7.2 item 4): value calculated from its items, never typed.
  const kitValue = kit ? packageValue(kit.id, packageItems, items) : null;
  const launchKit = kit
    ? {
        kit: {
          price: formatGBP(kit.price_gbp),
          timeline: kit.timeline,
          foundingPrice: kit.founding_enabled && kit.founding_price_gbp ? formatGBP(kit.founding_price_gbp) : null,
          foundingSlots: kit.founding_slots,
        },
        value: kitValue ? formatGBP(kitValue) : null,
        carePrice: care ? formatGBP(care.price_gbp) : null,
        careTerm: care?.minimum_term ?? null,
        parts: kit.includes_copy ?? [],
        bookHref: bookHref('launch-kit'),
      }
    : null;

  // Packages teaser (brief 7.2 item 9): the fixed-price packages, Launch Kit highlighted.
  const packageCards = packages
    .filter((p) => p.type === 'one-time')
    .map((p) => {
      const value = packageValue(p.id, packageItems, items);
      const saving = packageSaving(value, p.price_gbp);
      return {
        id: p.id,
        name: p.name,
        price: formatGBP(p.price_gbp),
        description: p.ideal_for,
        features: p.includes_copy,
        is_featured: p.popular,
        badge: p.popular ? 'Recommended' : '',
        founding:
          p.founding_enabled && p.founding_price_gbp
            ? `Founding price for the first ${p.founding_slots} clients: ${formatGBP(p.founding_price_gbp)}`
            : '',
        value_line: value && saving ? `Bought separately: ${formatGBP(value)}. You save ${formatGBP(saving.amount)} (${saving.percent}%).` : '',
        href: p.id === 'launch-kit' ? '/packages/launch-kit' : '/packages#packages',
        cta_label: 'See what is included',
      };
    });
  const monthlyPrices = packages.filter((p) => p.type === 'monthly').map((p) => p.price_gbp);
  const monthlyFrom = monthlyPrices.length ? formatGBP(Math.min(...monthlyPrices)) : null;

  const landing = itemById.get('landing-basic');
  const website = itemById.get('website-5');
  const faqs = buildHomeFaqs({
    landingFrom: landing ? formatGBP(landing.price_gbp) : null,
    websiteFrom: website ? formatGBP(website.price_gbp) : null,
    launchKitPrice: kit ? formatGBP(kit.price_gbp) : null,
  });

  return (
    <>
      <PageSchema path="/" faqs={faqs} />
      <Home
        slides={slides}
        bookHref="/book"
        serviceCards={serviceCards}
        launchKit={launchKit}
        processSteps={PROCESS_STEPS}
        packageCards={packageCards}
        monthlyFrom={monthlyFrom}
        reviews={reviews}
        founderLines={FOUNDER_NOTE}
        faqs={faqs}
      />
    </>
  );
}
