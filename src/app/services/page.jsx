import { buildMetadata, ROUTES } from '@/lib/routes';
import { PageSchema } from '@/lib/schema';
import Link from 'next/link';
import { Code, Palette, Video, Users, Cpu, TrendingUp } from 'lucide-react';

const route = ROUTES.find(r => r.path === '/services');
export const metadata = buildMetadata(route);

const categories = [
  {
    icon: Code,
    label: 'Web and App Development',
    description: 'Websites, ecommerce stores, mobile apps and UI/UX design built for performance.',
    href: '/services/web-development',
  },
  {
    icon: Palette,
    label: 'Branding and Design',
    description: 'Logos, brand identities, social media graphics and thumbnail design.',
    href: '/services/branding-design',
  },
  {
    icon: Video,
    label: 'Video and Animation',
    description: 'Logo animation, explainer videos, motion graphics and reels editing.',
    href: '/services/video-animation',
  },
  {
    icon: Users,
    label: 'Social Media Management',
    description: 'Done-for-you strategy, content, posting and community management.',
    href: '/services/social-media-management',
  },
  {
    icon: Cpu,
    label: 'AI and Automation',
    description: 'AI receptionists, chat agents and workflow automations that work around the clock.',
    href: '/services/ai-automation',
  },
  {
    icon: TrendingUp,
    label: 'SEO and Digital Marketing',
    description: 'Technical SEO, local SEO, content and paid advertising that bring qualified enquiries.',
    href: '/services/seo-digital-marketing',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageSchema path="/services" />
      <main className="min-h-screen bg-[#efefef] pt-40 pb-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-2xl mb-14">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
              {route.h1}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {route.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {categories.map(({ icon: Icon, label, description, href }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white rounded-[1.5rem] p-7 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1044ff] flex items-center justify-center mb-5">
                  <Icon size={20} className="text-white" />
                </div>
                <h2 className="text-[17px] font-bold text-gray-900 mb-2 group-hover:text-[#1044ff] transition-colors">
                  {label}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-grow">
                  {description}
                </p>
                <span className="mt-4 text-[13px] font-semibold text-[#1044ff] group-hover:text-[#e7581e] transition-colors">
                  View services &#8594;
                </span>
              </Link>
            ))}
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-bold text-[15px] hover:border-[#1044ff] hover:text-[#1044ff] transition-all duration-300"
            >
              View pricing
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
