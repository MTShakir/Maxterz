import ThumbnailDesign from '@/screens/services/sub/ThumbnailDesign';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/branding-design/thumbnail-design'));

export default function ThumbnailDesignPage() {
  return <ThumbnailDesign />;
}
