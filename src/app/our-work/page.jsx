import OurWorkPage from '@/screens/OurWorkPage';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/our-work'));

export default function Page() {
  return (
    <>
      <PageSchema path="/our-work" />
      <OurWorkPage />
    </>
  );
}
