import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import RelatedServices from '@/components/service/RelatedServices';
import { getServicePageData } from '@/lib/pageData';
import { getFromPricesUnder, getPricing } from '@/lib/pricing';
import { faqs } from '@/content/faq/video-animation';
import ServiceVideoAnimation from '@/screens/services/ServiceVideoAnimation';

const PATH = '/services/video-animation';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

/**
 * The long-form card links to the video editing page, whose lowest price is a short-form edit.
 * It shows the long-form edit's own "from" price instead, so the card never under-prices it.
 */
const LONG_FORM_ITEM_ID = 'long-form-edit';

export default async function VideoAnimationPage() {
  const [data, fromPrices, { items }] = await Promise.all([
    getServicePageData(PATH, { serviceSlug: 'video-animation', reviewSlugs: ['logo-animation'] }),
    getFromPricesUnder(PATH),
    getPricing(),
  ]);

  // The category "from" price is the lowest price of its service pages, not the voiceover add-on.
  const servicePrices = Object.values(fromPrices).filter((price) => price != null);
  const categoryFrom = servicePrices.length ? Math.min(...servicePrices) : null;
  const longFormFrom = items.find((item) => item.id === LONG_FORM_ITEM_ID)?.price_gbp ?? null;

  return (
    <>
      <PageSchema path={PATH} fromPrice={categoryFrom} billing={data.billing} faqs={faqs} />
      <ServiceVideoAnimation
        h1={route.h1}
        {...data}
        fromPrice={categoryFrom}
        fromPrices={fromPrices}
        longFormFrom={longFormFrom}
        related={<RelatedServices path={PATH} />}
      />
    </>
  );
}
