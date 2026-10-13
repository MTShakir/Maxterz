import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import { lowestPrice } from '@/lib/pricing-calc';
import { faqs } from '@/content/faq/business-website-design';
import RelatedServices from '@/components/service/RelatedServices';
import BusinessWebsiteDesign from '@/screens/services/sub/BusinessWebsiteDesign';

const PATH = '/services/web-development/business-website-design';

const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function BusinessWebsiteDesignPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'business-website-design', reviewSlugs: [] });
  // Add-ons (copywriting) show as a line under the cards and never set the "from" price.
  const prices = data.prices.filter((item) => !item.is_addon);
  // The hero says what a website costs. Landing pages (the tier items) start lower and are
  // listed in the prices section; the schema keeps the true lowest price on the page.
  const websitesFrom = lowestPrice(prices.filter((item) => !item.tier_label)) ?? data.fromPrice;

  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <BusinessWebsiteDesign
        h1={route.h1}
        {...data}
        prices={prices}
        fromPrice={websitesFrom}
        related={<RelatedServices path={PATH} />}
      />
    </>
  );
}
