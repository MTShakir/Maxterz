import MobileAppDevelopment from '@/screens/services/sub/MobileAppDevelopment';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/web-development/mobile-app-development'));

export default function MobileAppDevelopmentPage() {
  return <MobileAppDevelopment />;
}
