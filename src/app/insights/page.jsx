import Blogs from '@/screens/Blogs';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

const route = ROUTES.find((r) => r.path === '/insights');
export const metadata = buildMetadata({ ...route, noindex: true });

export default function InsightsPage() {
  return (
    <>
      <PageSchema path="/insights" />
      <Blogs />
    </>
  );
}
