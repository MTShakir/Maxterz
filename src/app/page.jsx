import Home from '@/screens/Home';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/'));

export default function HomePage() {
  return <Home />;
}
