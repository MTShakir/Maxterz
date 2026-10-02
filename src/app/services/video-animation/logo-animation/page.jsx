import LogoAnimation from '@/screens/services/sub/LogoAnimation';
import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';

export const metadata = buildMetadata(ROUTES.find((r) => r.path === '/services/video-animation/logo-animation'));

export default function LogoAnimationPage() {
  return (
    <>
      <PageSchema path="/services/video-animation/logo-animation" />
      <LogoAnimation />
    </>
  );
}
