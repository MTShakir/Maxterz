import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import { lowestPrice } from '@/lib/pricing-calc';
import { faqs } from '@/content/faq/seo-digital-marketing';
import RelatedServices from '@/components/service/RelatedServices';
import ServiceSEODigitalMarketing from '@/screens/services/ServiceSEODigitalMarketing';

const PATH = '/services/seo-digital-marketing';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function SEODigitalMarketingPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'seo-digital-marketing', reviewSlugs: [] });
  // The hero anchors on the monthly SEO plans (Local, Growth, Authority), not on the smaller
  // items in "Also available", so "SEO plans from £X" always matches the plan cards.
  const fromPrice = lowestPrice(data.prices.filter((item) => item.tier_label)) ?? data.fromPrice;

  return (
    <>
      <PageSchema path={PATH} fromPrice={fromPrice} billing="monthly" faqs={faqs} />
      <ServiceSEODigitalMarketing
        h1={route.h1}
        {...data}
        fromPrice={fromPrice}
        billing="monthly"
        related={<RelatedServices path={PATH} />}
      />
    </>
  );
}
