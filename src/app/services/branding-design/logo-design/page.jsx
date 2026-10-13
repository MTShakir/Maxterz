import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/logo-design';
import LogoDesign from '@/screens/services/sub/LogoDesign';

const PATH = '/services/branding-design/logo-design';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function LogoDesignPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'logo-design', reviewSlugs: ['logo-design'] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <LogoDesign h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
