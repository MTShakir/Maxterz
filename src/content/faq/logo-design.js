// @ts-check

/**
 * FAQ for /services/branding-design/logo-design. Rendered on the page and used for the
 * FAQPage schema, so the page and the schema always match. Tier facts follow the price book
 * (docs/05-offers.md, section 2.2). No prices: the prices section on the page shows them.
 *
 * `link` (optional): a phrase inside the answer that the page renders as a link.
 *
 * TODO(Talha): the price book lists the full file suite (AI, EPS) and social profile versions
 * under Professional only. Confirm Signature includes them too, then say so in the tier answer
 * below and on the Source Files card in LogoDesign.jsx.
 *
 * @type {Array<{ q: string, a: string, link?: { text: string, href: string } }>}
 */
export const faqs = [
  {
    q: 'What is the difference between a logo and a brand identity?',
    a: 'A logo is a single mark: a symbol, a wordmark or both. A brand identity is the full system around it: colours, fonts, logo versions and brand guidelines. This page covers the logo. If you want the full system, see our brand identity design service.',
    link: { text: 'brand identity design service', href: '/services/branding-design/brand-identity-design' },
  },
  {
    q: 'What is included in each logo tier?',
    a: 'Essential includes 2 concepts, 2 revision rounds, colour and mono versions, and PNG, SVG and PDF files. Professional includes 4 concepts, 3 revision rounds, the full file suite, an icon mark and social profile versions. Signature includes research and a moodboard, 6 concepts, 4 revision rounds, a primary and secondary logo, an icon, a mini brand guide and a business card design.',
  },
  {
    q: 'How much does a logo cost?',
    a: 'Each tier has a fixed price, shown in the prices section on this page. The price depends on how many concepts and revision rounds you need, and on extras such as a mini brand guide. Professional is our most popular tier.',
  },
  {
    q: 'How long does a logo design take?',
    a: 'Essential takes 5 working days, Professional takes 7 and Signature takes 10. Timelines start once we have your brief.',
  },
  {
    q: 'How do revisions work?',
    a: 'A revision round is one set of changes to your chosen concept. Essential includes 2 rounds, Professional 3 and Signature 4. Send all your changes together in each round, so every round counts.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your business name, what you do and who your customers are. Share brands you admire, styles to avoid and any competitors you want to stand apart from. This brief shapes every concept we design.',
  },
  {
    q: 'Who owns the final logo?',
    a: 'Once the project is paid in full, you get full rights to use your final logo. Concepts you did not choose stay with us, as set out in our terms and conditions.',
    link: { text: 'terms and conditions', href: '/terms-conditions' },
  },
  {
    q: 'Do you offer logo animation?',
    a: 'Yes. Logo animation is a separate service. We bring your new logo to life for video intros, outros and social media. Add it when you book, or once your logo is signed off. See our logo animation services for styles and timelines.',
    link: { text: 'logo animation services', href: '/services/video-animation/logo-animation' },
  },
];
