import Shop from '@/screens/Shop';
import { buildMetadata } from '@/lib/routes';

// /shop redirects to /packages in Phase 2. Noindex this page until the redirect lands.
export const metadata = buildMetadata({
  path: '/shop',
  title: 'Packages and Pricing | Maxterz',
  description: 'Browse Maxterz packages and pricing for websites, branding, video, SEO and AI services.',
  noindex: true,
});

export default function Page() {
  return <Shop />;
}
