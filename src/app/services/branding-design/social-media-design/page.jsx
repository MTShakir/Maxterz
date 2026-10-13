import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import RelatedServices from '@/components/service/RelatedServices';
import { faqs } from '@/content/faq/social-media-design';
import SocialMediaDesign from '@/screens/services/sub/SocialMediaDesign';

const PATH = '/services/branding-design/social-media-design';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function SocialMediaDesignPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'social-media-design', reviewSlugs: [] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} setupFee={data.setupFee} faqs={faqs} />
      <SocialMediaDesign h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
