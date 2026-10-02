import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import Link from 'next/link';

const route = ROUTES.find(r => r.path === '/packages/launch-kit');
export const metadata = buildMetadata(route);

const included = [
  'Brand identity: logo suite, colours, typography and usage guidelines',
  'Professional website: up to 5 pages, mobile-first and SEO-ready',
  'Google Business Profile set-up and optimisation',
  'Social media profile set-up across 2 platforms',
  'Domain and hosting configuration advice',
];

export default function LaunchKitPage() {
  return (
    <>
      <PageSchema path="/packages/launch-kit" />
      <main className="min-h-screen bg-[#efefef] pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1 text-[#1044ff] text-sm font-semibold mb-8 hover:underline"
          >
            &#8592; Pricing
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {route.h1}
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
            {route.description}
          </p>
          <div className="bg-white rounded-[1.5rem] p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">What is included</h2>
            <ul className="flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-gray-700">
                  <span className="text-[#1044ff] font-bold mt-0.5 shrink-0">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white font-bold text-[15px] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              Book a free call
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-[15px] hover:border-[#1044ff] hover:text-[#1044ff] transition-all duration-300"
            >
              View all packages
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
