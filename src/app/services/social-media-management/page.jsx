import ServiceSocialMediaManagement from '@/screens/services/ServiceSocialMediaManagement';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/social-media-management'));

export default function SocialMediaManagementPage() {
  return (
    <>
      <PageSchema path="/services/social-media-management" />
      <ServiceSocialMediaManagement />
    </>
  );
}
