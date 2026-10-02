import Contact from '@/screens/Contact';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/contact'));

export default function ContactPage() {
  return (
    <>
      <PageSchema path="/contact" />
      <Contact />
    </>
  );
}
