import LogoDesign from '@/screens/services/sub/LogoDesign';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/branding-design/logo-design'));

export default function LogoDesignPage() {
  return (
    <>
      <PageSchema path="/services/branding-design/logo-design" />
      <LogoDesign />
    </>
  );
}
