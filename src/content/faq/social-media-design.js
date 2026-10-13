// @ts-check

/**
 * FAQ for /services/branding-design/social-media-design. Rendered on the page and used for the
 * FAQPage schema, so the page and the schema always match. Offer facts follow the price book
 * (docs/05-offers.md, section 2.2: social templates pack and social media post design). Client
 * work follows the business profile (section 3a) and D38. Revisions and ownership follow the
 * terms and conditions. No prices: the prices section on the page shows them.
 *
 * Monthly social design and social account set-up are sold inside packages only (inventory
 * section 1), so they are not offered here.
 *
 * `link` (optional): a phrase inside the answer that the page renders as a link.
 *
 * TODO(Talha): the price book gives no revision rounds for single posts or the templates pack,
 * and does not say which editor the templates are built in (for example Canva). Confirm both,
 * then name them in the answers below.
 *
 * @type {Array<{ q: string, a: string, link?: { text: string, href: string } }>}
 */
export const faqs = [
  {
    q: 'What is included in social media design?',
    a: 'Each post is a static post or a carousel, designed in your brand style and ready in 2 working days. The templates pack gives you 10 editable post and story templates, ready in 5 working days. Your team can then make new posts that stay on brand.',
  },
  {
    q: 'How much does social media design cost?',
    a: 'Single posts have a fixed price per post, and the templates pack has one fixed price. Both are shown in the prices section on this page. Your total depends on how many posts you need, or whether templates suit you better.',
  },
  {
    q: 'How long does social media design take?',
    a: 'A post or carousel takes 2 working days. A pack of 10 templates takes 5 working days. Timelines start once we have your brief and any photos you want to use.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your logo, brand colours and fonts, the message for each post and any photos you want to use. No brand style yet? Start with our brand identity design service.',
    link: { text: 'brand identity design service', href: '/services/branding-design/brand-identity-design' },
  },
  {
    q: 'How do revisions work?',
    a: 'Every design comes to you for review before it is final. The number of revision rounds is set in your project agreement. Send all your changes together within 14 days of delivery, so each round counts.',
  },
  {
    q: 'Who owns the designs?',
    a: 'Once your order is paid in full, you get full rights to use your final posts and templates. Draft designs you did not choose stay with us, as set out in our terms and conditions.',
    link: { text: 'terms and conditions', href: '/terms-conditions' },
  },
  {
    q: 'Who have you designed social media posts for?',
    a: 'We designed social media posts for Black and White Leaflets Distribution, a UK leaflet distribution company, and for MM Window Cleaning, a UK window cleaning business. We built both of their websites too.',
  },
  {
    q: 'Can you post them for us as well?',
    a: 'Yes. Our social media management plans cover strategy, content, posting and community management, with a monthly report. Choose design on its own, or hand the whole job to us. See our social media management service.',
    link: { text: 'social media management service', href: '/services/social-media-management' },
  },
];
