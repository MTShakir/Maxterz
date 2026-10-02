import TermsConditions from '@/screens/TermsConditions';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/terms-conditions'));

export default function TermsConditionsPage() {
  return <TermsConditions />;
}
