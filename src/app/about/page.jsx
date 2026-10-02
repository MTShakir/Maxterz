import AboutUs from '@/screens/AboutUs';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/about'));

export default function Page() {
  return <AboutUs />;
}
