import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BOOK_LABEL } from '@/lib/cta';

/**
 * How a project runs, in 4 steps (brief 7.1 ProcessSteps, 7.2 item 7). Server component.
 *
 * @param {{ steps: Array<{ title: string, text: string }>, bookHref: string }} props
 */
export default function ProcessSteps({ steps = [], bookHref }) {
  if (!steps.length) return null;

  return (
    <section className="py-24 px-4 bg-white" aria-labelledby="process-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="badge-standard-light">HOW IT WORKS</span>
          <h2 id="process-heading" className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            From First Call to Launch
          </h2>
          <p className="text-lg text-gray-600">Four clear steps, with a fixed price and agreed dates before any work starts.</p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col rounded-[2rem] border border-gray-100 bg-gray-50/70 p-8 shadow-sm">
              <span
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] text-lg font-extrabold text-white shadow-md"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-3">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-center">
          <Link
            href={bookHref}
            data-cta="book-a-free-call"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1044ff] to-[#0020bf] px-8 font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            {BOOK_LABEL} <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
