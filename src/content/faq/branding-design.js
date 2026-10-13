// @ts-check

/**
 * FAQ for /services/branding-design. Rendered on the page and used for the FAQPage schema,
 * so the page and the schema always match. Facts follow the price book (docs/05-offers.md,
 * sections 2.2 and 4). No prices: the prices section on the page shows them (brief rule 5).
 *
 * `link` (optional): a phrase inside the answer that the page renders as a link.
 *
 * @type {Array<{ q: string, a: string, link?: { text: string, href: string } }>}
 */
export const faqs = [
  {
    q: 'What do you need from me to start a design project?',
    a: 'A short brief and any brand assets you already have. Send examples of design you like, and any you want to move away from. Tell us who your customers are. We go through it all on a kick-off call before work starts.',
  },
  {
    q: 'How much do logo design and branding cost?',
    a: 'It depends on the service and the tier. Logo design, brand identity, social media design and thumbnails each show their prices on their own page. Business card and stationery prices are in the prices section on this page. You get a fixed quote before any work starts.',
  },
  {
    q: 'How long does a branding project take?',
    a: 'A logo takes 5 to 10 working days, depending on the tier. A brand identity takes 2 to 5 weeks. A business card takes 3 working days and a stationery set takes 1 week. Your quote confirms the dates before we start.',
  },
  {
    q: 'What file formats are included in delivery?',
    a: 'Every logo comes in PNG, SVG and PDF. The Professional logo tier adds AI and EPS files. Business cards and stationery come as print-ready files. Every file is sorted for print and screen.',
  },
  {
    q: 'How do revisions work?',
    a: 'Revisions are part of every project. Logo design includes 2, 3 or 4 revision rounds, depending on the tier. For other work, your quote sets out the revision rounds before we start.',
  },
  {
    q: 'Do you design for print as well as digital?',
    a: 'Yes. We set up all print work with the right colour profile, bleed and resolution for your printer. We flag any print needs before we start, so nothing needs redoing.',
  },
  {
    q: 'Can I cancel the Design Subscription?',
    a: "Yes. The Design Subscription is a monthly plan for steady design needs: unlimited requests and revisions, one active request at a time. Cancel with 30 days' notice. Compare it with our other plans on the packages and plans page.",
    link: { text: 'packages and plans page', href: '/packages' },
  },
];
