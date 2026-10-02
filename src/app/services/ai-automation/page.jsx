import ServiceAIAutomation from '@/screens/services/ServiceAIAutomation';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/ai-automation'));

export default function AIAutomationPage() {
  return (
    <>
      <PageSchema path="/services/ai-automation" />
      <ServiceAIAutomation />
    </>
  );
}
