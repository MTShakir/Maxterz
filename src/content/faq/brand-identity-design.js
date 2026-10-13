// @ts-check

/**
 * FAQ for /services/branding-design/brand-identity-design. Rendered on the page and used for the
 * FAQPage schema, so the page and the schema always match. Tier facts follow the price book
 * (docs/05-offers.md, section 2.2). Core includes the Professional logo and Complete the Signature
 * logo, so their concept and revision counts come from those logo tiers. Revisions and ownership
 * follow the terms and conditions. No prices: the prices section on the page shows them.
 *
 * `link` (optional): a phrase inside the answer that the page renders as a link.
 *
 * TODO(Talha): the price book lists Complete without "everything in Core". Confirm Complete also
 * includes the colour palette and typography, the email signature and the social profile kit.
 * Then start Complete's includes with "Everything in Core, plus" (Supabase and pricing.json) and
 * say so in the first answer below and on the page.
 *
 * @type {Array<{ q: string, a: string, link?: { text: string, href: string } }>}
 */
export const faqs = [
  {
    q: 'What is included in a brand identity?',
    a: 'Core includes a Professional logo, a colour palette and typography, brand guidelines of 15+ pages, a business card, an email signature and a social profile kit. Complete includes a Signature logo, a brand strategy session, tone of voice, extended guidelines of 30+ pages, a stationery set, 10 social templates and a presentation template.',
  },
  {
    q: 'How much does a brand identity cost?',
    a: 'Core and Complete each have a fixed price, shown in the prices section on this page. The price depends on the depth of the logo work, the length of the guidelines and how many templates you need. Brand guidelines for an existing logo have a starting price, and we confirm a fixed quote once we have seen your logo. Core is our most popular tier.',
  },
  {
    q: 'How long does a brand identity take?',
    a: 'Core takes 2 to 3 weeks and Complete takes 4 to 5 weeks. Brand guidelines for an existing logo take 1 to 2 weeks. Timelines start once we have your brief.',
  },
  {
    q: 'I already have a logo. Do I need a full rebrand?',
    a: 'Not always. If your logo still works, our brand guidelines service builds the rules around it: logo use, colours, typography, imagery and examples. If your logo holds you back, Core and Complete both include a new logo and the system around it. We rebranded Black and White Leaflets Distribution, a UK leaflet distribution company.',
  },
  {
    q: 'How do revisions work?',
    a: 'Your logo comes with set revision rounds: 3 in Core and 4 in Complete. A revision round is one set of changes. Send all your changes together in each round, so every round counts. Revisions for the rest of your identity are set out in your project agreement.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your business name, what you do and who your customers are. Share brands you admire, styles to avoid and the competitors you want to stand apart from. If you have a logo, colours or photos you want to keep, send those too.',
  },
  {
    q: 'Who owns the brand identity?',
    a: 'Once the project is paid in full, you get full rights to use your final logo, guidelines and brand files. Concepts you did not choose stay with us, as set out in our terms and conditions.',
    link: { text: 'terms and conditions', href: '/terms-conditions' },
  },
  {
    q: 'What happens after delivery?',
    a: 'Your brand is ready to use straight away. Share your guidelines with anyone who designs or prints for you. When you need more, the same team can build your website, design your social media posts or animate your logo. See our business website design service.',
    link: { text: 'business website design service', href: '/services/web-development/business-website-design' },
  },
];
