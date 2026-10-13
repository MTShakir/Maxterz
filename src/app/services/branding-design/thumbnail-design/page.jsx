import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/thumbnail-design';
import ThumbnailDesign from '@/screens/services/sub/ThumbnailDesign';

const PATH = '/services/branding-design/thumbnail-design';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function ThumbnailDesignPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'thumbnail-design', reviewSlugs: ['thumbnail-design'] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <ThumbnailDesign h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
