/**
 * FAQ for /services/ai-automation. Rendered on the page and in the FAQPage schema.
 * Facts follow the price book (docs/05-offers.md 2.6) and D23: the AI receptionist is set up on
 * Maxterz's own line first, so nothing here implies a demo, past clients or results for it.
 * No prices here: cost answers point to the prices section, which reads the Supabase pricing tables.
 *
 * @type {Array<{ q: string, a: string }>}
 */
export const faqs = [
  {
    q: 'What does an AI chatbot do for my business?',
    a: 'It answers customer questions on your website or WhatsApp, day and night. We train it on your services and FAQs. It captures each lead and hands the chat to a person when needed. We built the AI chatbot that is live on the Black and White Leaflets Distribution website.',
  },
  {
    q: 'How much does an AI chatbot cost?',
    a: 'An AI chat agent has a one-off set-up fee, then a monthly fee. The set-up covers training it on your services and FAQs. You can see both prices in the prices section on this page.',
  },
  {
    q: 'What happens when the AI cannot answer a question?',
    a: 'It hands the conversation to a person on your team, with the customer details already captured. Every AI chat agent we build includes this hand-over.',
  },
  {
    q: 'Do you offer an AI receptionist for phone calls?',
    a: 'An AI receptionist answers your calls, books jobs, texts back missed callers and sends you a summary of each call. We will run one on our own phone line first, because we only sell what we run ourselves. It will tell callers it is an AI assistant, record calls only with notice, and handle data under UK GDPR. If you want one, book a free call and we will talk through your calls and timings.',
  },
  {
    q: 'What tasks can you automate?',
    a: 'Repeat admin that moves information between your tools. Common examples are sending form enquiries to your CRM, invoicing, follow-ups and reports. We build them with Zapier, Make or n8n, and quote each workflow after a free call.',
  },
  {
    q: 'Can it work with the tools we already use?',
    a: 'In most cases, yes. We connect to CRMs, email platforms, WhatsApp Business, accounting tools and booking systems. If a tool has an API, we can usually connect to it.',
  },
  {
    q: 'Do I need technical knowledge?',
    a: 'No. We set everything up, test it with you and show your team how it works. You sign off before anything reaches your customers.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on the build. You get a clear timeline with your fixed quote, before any work starts.',
  },
];
