import { ROUTES } from '@/lib/routes';

/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const staticRoutes = ROUTES
    .filter((r) => r.inSitemap)
    .map((r) => ({
      url: `https://maxterz.com${r.path}`,
      lastModified: new Date(r.updatedAt),
    }));

  // TODO(Phase 4): append case study and published post routes from Supabase

  return staticRoutes;
}
