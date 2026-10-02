import ServiceSEODigitalMarketing from '@/screens/services/ServiceSEODigitalMarketing';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/seo-digital-marketing'));

export default function SEODigitalMarketingPage() {
  return <ServiceSEODigitalMarketing />;
}
