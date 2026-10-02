import ServiceVideoAnimation from '@/screens/services/ServiceVideoAnimation';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/video-animation'));

export default function VideoAnimationPage() {
  return (
    <>
      <PageSchema path="/services/video-animation" />
      <ServiceVideoAnimation />
    </>
  );
}
