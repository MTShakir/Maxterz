import process from 'node:process';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ScaledPage from '@/components/case-study/ScaledPage';
import { caseStudies, getCaseStudy } from '@/case-studies';

import '@/case-studies/mm-window-cleaning.css';
import '@/case-studies/bwld.css';
import '@/case-studies/areeka-o-karak.css';
import '@/case-studies/logo-and-graphic-design.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} Case Study | Maxterz`,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const html = fs.readFileSync(path.join(process.cwd(), 'src/case-studies', `${slug}.html`), 'utf8');
  const others = caseStudies.filter((c) => c.slug !== slug);

  return (
    <article className="-mt-[182px] pt-[182px]" style={{ backgroundColor: study.bg }}>
      <section className="px-4 pt-4 pb-10">
        <div className="container mx-auto max-w-5xl">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1044ff] hover:text-[#eb7444] transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to Our Work
          </Link>
          <div><span className="badge-standard-light">{study.category.toUpperCase()}</span></div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {study.title} <span className="text-[#1044ff]">Case Study</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">{study.description}</p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-5xl">
          <div className="overflow-hidden">
            <ScaledPage html={html} className={`cs-${slug}`} />
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">More Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group card-standard-light p-6 flex flex-col"
              >
                <span className="text-[11px] text-[#e7811e] uppercase tracking-[0.6px] font-semibold mb-2">{c.category}</span>
                <h3 className="text-lg font-extrabold text-[#111827] mb-2 group-hover:text-[#1044ff] transition-colors">{c.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-4 flex-grow">{c.description}</p>
                <span className="inline-flex items-center gap-2 text-[#1044ff] text-[13px] font-bold group-hover:text-[#eb7444] transition-colors">
                  View Case Study <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
