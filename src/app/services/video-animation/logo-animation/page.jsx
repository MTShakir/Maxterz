import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/logo-animation';
import LogoAnimation from '@/screens/services/sub/LogoAnimation';

const PATH = '/services/video-animation/logo-animation';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function LogoAnimationPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'logo-animation', reviewSlugs: ['logo-animation'] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <LogoAnimation h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
