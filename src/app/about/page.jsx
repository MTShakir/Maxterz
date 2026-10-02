import AboutUs from '@/screens/AboutUs';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/about'));

export default function Page() {
  return (
    <>
      <PageSchema path="/about" />
      <AboutUs />
    </>
  );
}
