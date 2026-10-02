import OurWorkPage from '@/screens/OurWorkPage';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/our-work'));

export default function Page() {
  return <OurWorkPage />;
}
