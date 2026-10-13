import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import { lowestPrice } from '@/lib/pricing-calc';
import RelatedServices from '@/components/service/RelatedServices';
import { faqs } from '@/content/faq/brand-identity-design';
import BrandIdentityDesign from '@/screens/services/sub/BrandIdentityDesign';

const PATH = '/services/branding-design/brand-identity-design';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function BrandIdentityDesignPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'brand-identity-design', reviewSlugs: ['logo-design'] });
  // The hero anchors on the identity systems (the Core and Complete tiers), not the guidelines-only
  // service, so it shows the price of what this page sells (inventory section 4). The schema keeps
  // the true lowest price.
  const tierFrom = lowestPrice(data.prices.filter((item) => item.tier_label));
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} setupFee={data.setupFee} faqs={faqs} />
      <BrandIdentityDesign h1={route.h1} {...data} fromPrice={tierFrom} related={<RelatedServices path={PATH} />} />
    </>
  );
}
