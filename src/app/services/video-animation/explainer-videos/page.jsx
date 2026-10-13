import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/explainer-videos';
import ExplainerVideos from '@/screens/services/sub/ExplainerVideos';

const PATH = '/services/video-animation/explainer-videos';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function ExplainerVideosPage() {
  // Inventory section 1: both explainer prices show as "from" (quoted after a free call, D27).
  const data = await getServicePageData(PATH, { serviceSlug: 'explainer-videos', reviewSlugs: [], forceFrom: true });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <ExplainerVideos h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
