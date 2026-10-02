import PackagesPage from '@/screens/PackagesPage';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/packages'));

export default function Page() {
  return <PackagesPage />;
}
