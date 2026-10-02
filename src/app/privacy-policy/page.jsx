import PrivacyPolicy from '@/screens/PrivacyPolicy';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/privacy-policy'));

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageSchema path="/privacy-policy" />
      <PrivacyPolicy />
    </>
  );
}
