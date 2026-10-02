import MobileAppDevelopment from '@/screens/services/sub/MobileAppDevelopment';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/web-development/mobile-app-development'));

export default function MobileAppDevelopmentPage() {
  return (
    <>
      <PageSchema path="/services/web-development/mobile-app-development" />
      <MobileAppDevelopment />
    </>
  );
}
