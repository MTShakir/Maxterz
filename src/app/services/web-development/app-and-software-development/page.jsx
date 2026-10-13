import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/app-and-software-development';
import AppSoftwareDevelopment from '@/screens/services/sub/AppSoftwareDevelopment';

const PATH = '/services/web-development/app-and-software-development';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function AppSoftwareDevelopmentPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'app-and-software-development', reviewSlugs: [] });

  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} faqs={faqs} />
      <AppSoftwareDevelopment h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
