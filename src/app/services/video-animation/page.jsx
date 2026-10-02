import ServiceVideoAnimation from '@/screens/services/ServiceVideoAnimation';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/video-animation'));

export default function VideoAnimationPage() {
  return <ServiceVideoAnimation />;
}
