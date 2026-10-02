import ServiceSocialMediaManagement from '@/screens/services/ServiceSocialMediaManagement';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/social-media-management'));

export default function SocialMediaManagementPage() {
  return <ServiceSocialMediaManagement />;
}
