import PrivacyPolicy from '@/screens/PrivacyPolicy';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/privacy-policy'));

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
