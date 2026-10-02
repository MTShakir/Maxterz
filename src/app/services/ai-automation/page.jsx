import ServiceAIAutomation from '@/screens/services/ServiceAIAutomation';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/ai-automation'));

export default function AIAutomationPage() {
  return <ServiceAIAutomation />;
}
