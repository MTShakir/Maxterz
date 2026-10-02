import Contact from '@/screens/Contact';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/contact'));

export default function ContactPage() {
  return <Contact />;
}
