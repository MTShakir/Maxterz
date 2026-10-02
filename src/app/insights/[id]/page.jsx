import BlogDetail from '@/screens/BlogDetail';
import { buildMetadata } from '@/lib/routes';

// /insights/:id numeric placeholder posts redirect to /insights in Phase 2.
// Noindex these pages until then.
export const metadata = buildMetadata({
  path: '/insights',
  title: 'Insights | Maxterz',
  description: 'Practical guides on websites, branding, SEO and AI automation for business owners.',
  noindex: true,
});

export default function BlogDetailPage() {
  return <BlogDetail />;
}
