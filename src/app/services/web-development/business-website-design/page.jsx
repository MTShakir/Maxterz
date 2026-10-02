import BusinessWebsiteDesign from '@/screens/services/sub/BusinessWebsiteDesign';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/web-development/business-website-design'));

export default function BusinessWebsiteDesignPage() {
  return (
    <>
      <PageSchema path="/services/web-development/business-website-design" />
      <BusinessWebsiteDesign />
    </>
  );
}
