import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/ecommerce-website-design';
import EcommerceWebsiteDesign from '@/screens/services/sub/EcommerceWebsiteDesign';

const PATH = '/services/web-development/ecommerce-website-design';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function EcommerceWebsiteDesignPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'ecommerce-website-design', reviewSlugs: [] });

  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <EcommerceWebsiteDesign h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
