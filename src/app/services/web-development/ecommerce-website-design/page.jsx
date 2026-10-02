import EcommerceWebsiteDesign from '@/screens/services/sub/EcommerceWebsiteDesign';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/web-development/ecommerce-website-design'));

export default function EcommerceWebsiteDesignPage() {
  return (
    <>
      <PageSchema path="/services/web-development/ecommerce-website-design" />
      <EcommerceWebsiteDesign />
    </>
  );
}
