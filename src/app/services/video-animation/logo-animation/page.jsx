import LogoAnimation from '@/screens/services/sub/LogoAnimation';
import { buildMetadata, ROUTES } from '@/lib/routes';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/video-animation/logo-animation'));

export default function LogoAnimationPage() {
  return <LogoAnimation />;
}
