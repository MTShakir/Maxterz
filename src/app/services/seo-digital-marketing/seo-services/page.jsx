import SEOServices from '@/screens/services/sub/SEOServices';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/seo-digital-marketing/seo-services'));

export default function SEOServicesPage() {
  return (
    <>
      <PageSchema path="/services/seo-digital-marketing/seo-services" />
      <SEOServices />
    </>
  );
}
