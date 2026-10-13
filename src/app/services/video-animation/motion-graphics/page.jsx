import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import RelatedServices from '@/components/service/RelatedServices';
import { faqs } from '@/content/faq/motion-graphics';
import MotionGraphics from '@/screens/services/sub/MotionGraphics';

const PATH = '/services/video-animation/motion-graphics';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function MotionGraphicsPage() {
  // No motion graphics reviews yet: the closest real ones are the logo animation reviews on Fiverr.
  const data = await getServicePageData(PATH, { serviceSlug: 'motion-graphics', reviewSlugs: ['logo-animation'] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} setupFee={data.setupFee} faqs={faqs} />
      <MotionGraphics h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
