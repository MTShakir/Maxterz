import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/social-media-management';
import ServiceSocialMediaManagement from '@/screens/services/ServiceSocialMediaManagement';

const PATH = '/services/social-media-management';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function SocialMediaManagementPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'social-media-management', reviewSlugs: [] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <ServiceSocialMediaManagement h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
