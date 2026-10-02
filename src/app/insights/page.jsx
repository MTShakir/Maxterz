import Blogs from '@/screens/Blogs';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/insights'));

export default function InsightsPage() {
  return <Blogs />;
}
