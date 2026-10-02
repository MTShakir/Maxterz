import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import Link from 'next/link';

const route = ROUTES.find(r => r.path === '/services/ai-automation/ai-chat-agents');
export const metadata = buildMetadata(route);

export default function AIChatAgentsPage() {
  return (
    <>
      <PageSchema path="/services/ai-automation/ai-chat-agents" />
      <main className="min-h-screen bg-[#efefef] pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/services/ai-automation"
            className="inline-flex items-center gap-1 text-[#1044ff] text-sm font-semibold mb-8 hover:underline"
          >
            &#8592; AI and Automation
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {route.h1}
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl">
            {route.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] text-white font-bold text-[15px] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              Book a free call
            </Link>
            <Link
              href="/services/ai-automation"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-[15px] hover:border-[#1044ff] hover:text-[#1044ff] transition-all duration-300"
            >
              All AI services
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
