import Blogs from '@/screens/Blogs';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/insights'));

export default function InsightsPage() {
  return (
    <>
      <PageSchema path="/insights" />
      <Blogs />
    </>
  );
}
