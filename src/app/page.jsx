import Home from '@/screens/Home';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/'));

export default function HomePage() {
  return (
    <>
      <PageSchema path="/" />
      <Home />
    </>
  );
}
