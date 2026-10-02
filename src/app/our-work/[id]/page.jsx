import ProjectDetail from '@/screens/ProjectDetail';
import { buildMetadata } from '@/lib/routes';

// Legacy portfolio item pages. Phase 2 audits which to keep indexed and which to move to /case-studies/{slug}.
export const metadata = buildMetadata({
  path: '/our-work',
  title: 'Our Work | Maxterz',
  description: 'Case studies and selected projects across websites, apps, branding, logo animation and AI.',
  noindex: true,
});

export default function ProjectDetailPage() {
  return <ProjectDetail />;
}
