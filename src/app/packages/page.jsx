import PackagesPage from '@/screens/PackagesPage';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/packages'));

export default function Page() {
  return (
    <>
      <PageSchema path="/packages" />
      <PackagesPage />
    </>
  );
}
