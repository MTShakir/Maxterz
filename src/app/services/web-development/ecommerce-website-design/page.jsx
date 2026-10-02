import EcommerceWebsiteDesign from '@/screens/services/sub/EcommerceWebsiteDesign';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/web-development/ecommerce-website-design'));

export default function EcommerceWebsiteDesignPage() {
  return <EcommerceWebsiteDesign />;
}
