import Link from 'next/link';
import { buildMetadata } from '@/lib/routes';

export const metadata = buildMetadata({
  path: '/404',
  title: 'Page Not Found | Maxterz',
  description: 'The page you were looking for does not exist or has been moved. Return to the homepage or browse our services.',
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <p className="text-sm font-bold text-[#1044ff] tracking-widest uppercase mb-4">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We cannot find that page</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you were looking for does not exist or has been moved. Try one of these instead:
      </p>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
        <Link href="/" className="text-[#1044ff] font-semibold hover:text-[#0020bf] hover:underline">Home</Link>
        <Link href="/services" className="text-[#1044ff] font-semibold hover:text-[#0020bf] hover:underline">Services</Link>
        <Link href="/our-work" className="text-[#1044ff] font-semibold hover:text-[#0020bf] hover:underline">Our Work</Link>
        <Link href="/packages" className="text-[#1044ff] font-semibold hover:text-[#0020bf] hover:underline">Pricing</Link>
        <Link href="/contact" className="text-[#1044ff] font-semibold hover:text-[#0020bf] hover:underline">Contact</Link>
      </div>
    </div>
  );
}
