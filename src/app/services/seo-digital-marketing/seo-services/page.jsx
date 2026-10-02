import SEOServices from '@/screens/services/sub/SEOServices';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/seo-digital-marketing/seo-services'));

export default function SEOServicesPage() {
  return <SEOServices />;
}
