import ExplainerVideos from '@/screens/services/sub/ExplainerVideos';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/video-animation/explainer-videos'));

export default function ExplainerVideosPage() {
  return <ExplainerVideos />;
}
