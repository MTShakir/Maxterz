import { buildMetadata, ROUTES } from '@/lib/routes';
import { JsonLd, PageSchema } from '@/lib/schema';
import { getPricing } from '@/lib/pricing';
import { getReviews } from '@/lib/pageData';
import { packageSaving, packageValue } from '@/lib/pricing-calc';
import { bookHref } from '@/lib/cta';
import { SITE } from '@/lib/site';
import { faqs } from '@/content/faq/launch-kit';
import RelatedServices from '@/components/service/RelatedServices';
import LaunchKit from '@/screens/LaunchKit';

const PATH = '/packages/launch-kit';
const route = ROUTES.find((r) => r.path === PATH);
export const metadata = buildMetadata(route);
export const revalidate = 300;

export default async function LaunchKitPage() {
  const [{ items, packages, packageItems }, reviews] = await Promise.all([getPricing(), getReviews(['general'], 3)]);
  const itemById = new Map(items.map((item) => [item.id, item]));
  const kit = packages.find((p) => p.id === 'launch-kit');
  const care = packages.find((p) => p.type === 'care');
  const starter = packages.find((p) => p.id === 'starter-kit');
  const scale = packages.find((p) => p.id === 'scale-kit');

  // The value stack (brief 7.6a): every row and the total come from the price tables.
  const parts = packageItems
    .filter((row) => row.package_id === 'launch-kit')
    .map((row) => ({ ...row, item: itemById.get(row.price_item_id) }))
    .filter((row) => row.item)
    .sort((a, b) => a.item.sort_order - b.item.sort_order);
  const value = kit ? packageValue(kit.id, packageItems, items) : null;
  const saving = kit && value ? packageSaving(value, kit.price_gbp) : null;

  const offer = kit && {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    '@id': `${SITE.url}${PATH}#offer`,
    name: kit.name,
    url: `${SITE.url}${PATH}`,
    price: kit.price_gbp,
    priceCurrency: 'GBP',
    seller: { '@id': `${SITE.url}/#organization` },
    itemOffered: { '@type': 'Service', name: kit.name, description: kit.ideal_for },
    ...(care
      ? {
          priceSpecification: [
            { '@type': 'PriceSpecification', name: kit.name, price: kit.price_gbp, priceCurrency: 'GBP' },
            { '@type': 'UnitPriceSpecification', name: care.name, price: care.price_gbp, priceCurrency: 'GBP', unitCode: 'MON' },
          ],
        }
      : {}),
  };

  return (
    <>
      <PageSchema path={PATH} faqs={faqs} />
      {offer && <JsonLd data={offer} />}
      <LaunchKit
        h1={route.h1}
        kit={kit}
        care={care}
        starter={starter}
        scale={scale}
        parts={parts}
        value={value}
        saving={saving}
        reviews={reviews}
        faqs={faqs}
        bookHref={bookHref('launch-kit')}
        related={<RelatedServices path={PATH} />}
      />
    </>
  );
}
