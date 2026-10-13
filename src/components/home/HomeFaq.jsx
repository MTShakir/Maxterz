import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * Home FAQ (brief 7.2 item 11). The answers sit in the server HTML (details and summary), and
 * the same list feeds the FAQPage schema on the page.
 *
 * @param {{ faqs: Array<{ q: string, a: string }> }} props
 */
export default function HomeFaq({ faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <section className="py-24 px-4 bg-white" aria-labelledby="home-faq-heading">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="badge-standard-light">QUESTIONS</span>
          <h2 id="home-faq-heading" className="text-3xl md:text-5xl font-bold text-gray-900">Common Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={faq.q} value={`item-${idx}`} className="bg-gray-50/70 px-6 rounded-2xl border border-gray-100 shadow-sm">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-[#1044ff] text-left py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
