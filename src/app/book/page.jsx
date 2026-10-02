import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import Link from 'next/link';

const route = ROUTES.find(r => r.path === '/book');
export const metadata = buildMetadata(route);

export default function BookPage() {
  return (
    <>
      <PageSchema path="/book" />
      <main className="min-h-screen bg-[#efefef] pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {route.h1}
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {route.description}
          </p>
          <a
            href="https://calendly.com/maxterz-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white font-bold text-[15px] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 mb-8"
          >
            Choose a time
          </a>
          <p className="text-sm text-gray-500 mb-10">
            Prefer to write first?{' '}
            <Link href="/contact" className="text-[#1044ff] hover:underline font-semibold">
              Send us a message
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
