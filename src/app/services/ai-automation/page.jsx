import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import { faqs } from '@/content/faq/ai-automation';
import RelatedServices from '@/components/service/RelatedServices';
import ServiceAIAutomation from '@/screens/services/ServiceAIAutomation';

const PATH = '/services/ai-automation';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function AIAutomationPage() {
  const data = await getServicePageData(PATH, { serviceSlug: 'ai-automation', reviewSlugs: [] });
  return (
    <>
      <PageSchema path={PATH} fromPrice={data.fromPrice} billing={data.billing} setupFee={data.setupFee} faqs={faqs} />
      <ServiceAIAutomation h1={route.h1} {...data} related={<RelatedServices path={PATH} />} />
    </>
  );
}
