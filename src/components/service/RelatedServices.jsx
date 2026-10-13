import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { RELATED } from '@/content/related';

/**
 * "Related services" block near the end of a service or category page (brief 7.5 item 11,
 * 6.7 internal linking). Descriptive anchors from the route registry. Server-safe, no state.
 *
 * @param {{ path: string, className?: string }} props
 */
export default function RelatedServices({ path, className = 'bg-white' }) {
  const links = (RELATED[path] ?? [])
    .map((href) => ROUTES.find((route) => route.path === href))
    .filter(Boolean);
  if (!links.length) return null;

  return (
    <section className={`py-20 px-4 ${className}`} aria-labelledby="related-services-heading">
      <div className="container mx-auto max-w-6xl">
        <h2 id="related-services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-center mb-12">
          Related services
        </h2>
        <ul className={`grid grid-cols-1 gap-6 ${links.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'}`}>
          {links.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className="group flex h-full flex-col gap-3 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="flex items-center justify-between gap-3 text-xl font-extrabold text-gray-900 group-hover:text-[#1044ff]">
                  {route.breadcrumbLabel}
                  <ArrowRight className="h-5 w-5 shrink-0 text-gray-300 transition-colors group-hover:text-[#1044ff]" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-gray-500">{route.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
