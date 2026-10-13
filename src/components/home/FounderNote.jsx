import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/site';

/**
 * Founder note (brief 7.2 item 10): headshot, 3 short lines from Talha and a signature line.
 * Server component.
 *
 * @param {{ lines: string[] }} props
 */
export default function FounderNote({ lines = [] }) {
  if (!lines.length) return null;

  return (
    <section className="py-24 px-4 bg-gray-50/50" aria-labelledby="founder-note-heading">
      <div className="container mx-auto max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] rounded-[3rem] border border-gray-100 bg-white p-8 md:p-14 shadow-sm">
          <Image
            src={SITE.founder.photo}
            alt={`${SITE.founder.fullName}, ${SITE.founder.role} of ${SITE.name}`}
            width={560}
            height={560}
            sizes="(min-width: 768px) 280px, 70vw"
            className="mx-auto w-full max-w-[280px] rounded-[2rem] object-cover"
          />
          <div>
            <span className="badge-standard-light">FROM THE FOUNDER</span>
            <h2 id="founder-note-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
              One Person Who Knows Your Project
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-6 font-bold text-gray-900">
              {`${SITE.founder.preferredName}, ${SITE.founder.role} of ${SITE.name}`}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-bold text-[#1044ff] hover:text-[#0020bf] hover:underline underline-offset-4"
            >
              Read our story <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
