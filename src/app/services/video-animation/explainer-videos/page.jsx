import ExplainerVideos from '@/screens/services/sub/ExplainerVideos';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/video-animation/explainer-videos'));

export default function ExplainerVideosPage() {
  return (
    <>
      <PageSchema path="/services/video-animation/explainer-videos" />
      <ExplainerVideos />
    </>
  );
}
