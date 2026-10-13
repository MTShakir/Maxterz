import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import { getServicePageData } from '@/lib/pageData';
import { getFromPricesUnder } from '@/lib/pricing';
import RelatedServices from '@/components/service/RelatedServices';
import { faqs } from '@/content/faq/web-development';
import ServiceWebDevelopment from '@/screens/services/ServiceWebDevelopment';

const PATH = '/services/web-development';

const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function WebDevelopmentPage() {
  const [data, fromPrices] = await Promise.all([
    getServicePageData(PATH, { serviceSlug: 'web-development', reviewSlugs: [] }),
    getFromPricesUnder(PATH), // add-ons such as copywriting never count
  ]);

  const known = Object.values(fromPrices).filter((price) => price != null);
  const fromPrice = known.length ? Math.min(...known) : null;

  return (
    <>
      <PageSchema path={PATH} fromPrice={fromPrice} billing="one-off" faqs={faqs} />
      <ServiceWebDevelopment
        h1={route.h1}
        fromPrice={fromPrice}
        billing="one-off"
        fromPrices={fromPrices}
        slides={data.slides}
        reviews={data.reviews}
        bookHref={data.bookHref}
        related={<RelatedServices path={PATH} />}
      />
    </>
  );
}
