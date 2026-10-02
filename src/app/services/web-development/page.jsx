import ServiceWebDevelopment from '@/screens/services/ServiceWebDevelopment';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/web-development'));

export default function WebDevelopmentPage() {
  return <ServiceWebDevelopment />;
}
