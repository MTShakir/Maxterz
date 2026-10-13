import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import RelatedServices from '@/components/service/RelatedServices';
import { faqs } from '@/content/faq/video-editing';
import VideoEditing from '@/screens/services/sub/VideoEditing';

const PATH = '/services/video-animation/video-editing';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function VideoEditingPage() {
  // No video editing reviews yet, so the reviews block shows general Fiverr reviews.
  const data = await getServicePageData(PATH, { serviceSlug: 'video-editing', reviewSlugs: [] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} setupFee={data.setupFee} faqs={faqs} />
      <VideoEditing h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
