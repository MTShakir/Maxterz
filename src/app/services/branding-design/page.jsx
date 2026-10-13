import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { getFromPricesUnder, getPagePrices } from '@/lib/pricing';
import { lowestPrice } from '@/lib/pricing-calc';
import { faqs } from '@/content/faq/branding-design';
import ServiceBrandingDesign from '@/screens/services/ServiceBrandingDesign';

const PATH = '/services/branding-design';
const IDENTITY_PATH = '/services/branding-design/brand-identity-design';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function BrandingDesignPage() {
  const [data, fromPrices, identityItems] = await Promise.all([
    getServicePageData(PATH, { serviceSlug: 'branding-design', reviewSlugs: ['logo-design'] }),
    getFromPricesUnder(PATH),
    getPagePrices(IDENTITY_PATH),
  ]);

  // The schema uses the lowest price anywhere in the category: each service page's "from"
  // price plus this page's own items (business card, stationery).
  const categoryFromPrice = lowestPrice([
    ...data.prices,
    ...Object.entries(fromPrices).map(([id, price_gbp]) => ({ id, price_gbp })),
  ]);

  // The brand identity card shows the identity systems (Core and Complete), not the
  // guidelines-only service, so the card never suggests a full identity at the guidelines price.
  const cardPrices = {
    ...fromPrices,
    [IDENTITY_PATH]: lowestPrice(identityItems.filter((item) => item.tier_label)) ?? fromPrices[IDENTITY_PATH],
  };

  return (
    <>
      <PageSchema path={PATH} fromPrice={categoryFromPrice} billing="one-off" faqs={faqs} />
      <ServiceBrandingDesign
        h1={route.h1}
        {...data}
        fromPrices={cardPrices}
        related={<RelatedServices path={PATH} />}
      />
    </>
  );
}
