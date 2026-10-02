import TermsConditions from '@/screens/TermsConditions';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/terms-conditions'));

export default function TermsConditionsPage() {
  return (
    <>
      <PageSchema path="/terms-conditions" />
      <TermsConditions />
    </>
  );
}
