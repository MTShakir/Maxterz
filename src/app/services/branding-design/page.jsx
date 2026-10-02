import ServiceBrandingDesign from '@/screens/services/ServiceBrandingDesign';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/branding-design'));

export default function BrandingDesignPage() {
  return <ServiceBrandingDesign />;
}
