/**
 * Home page content (brief 7.2) that is not locked copy. Facts from docs/02-business-profile.md,
 * docs/05-offers.md and pricing.json. No typed prices: the FAQ takes live prices as arguments.
 */

/**
 * Service cards (brief 7.2 item 3). Names come from src/lib/routes.js through the page.
 * Categories with their own service pages link to them; single-page categories (D31) list
 * what they include instead.
 */
export const FEATURED_SERVICES = [
  {
    icon: 'web',
    hub: '/services/web-development',
    description: 'Websites and online stores that load fast, look established and turn visitors into enquiries.',
    cta: 'Explore web design',
    links: [
      '/services/web-development/business-website-design',
      '/services/web-development/ecommerce-website-design',
      '/services/web-development/app-and-software-development',
    ],
  },
  {
    icon: 'branding',
    hub: '/services/branding-design',
    description: 'Logos and brand identities that make your business look established and easy to remember.',
    cta: 'Explore branding',
    links: [
      '/services/branding-design/logo-design',
      '/services/branding-design/brand-identity-design',
      '/services/branding-design/social-media-design',
      '/services/branding-design/thumbnail-design',
    ],
  },
  {
    icon: 'video',
    hub: '/services/video-animation',
    description: 'Logo animations, motion graphics, explainers and edited videos for your website and social channels.',
    cta: 'Explore video',
    links: [
      '/services/video-animation/logo-animation',
      '/services/video-animation/motion-graphics',
      '/services/video-animation/explainer-videos',
      '/services/video-animation/video-editing',
    ],
  },
  {
    icon: 'social',
    hub: '/services/social-media-management',
    description: 'We plan, design and post your content each month and reply to your followers, so your pages stay active.',
    cta: 'Explore social media',
    points: ['2 to 4 platforms', 'Posts and reels designed for you', 'Scheduling and replies', 'Monthly report'],
  },
  {
    icon: 'ai',
    hub: '/services/ai-automation',
    description: 'AI chat agents that answer questions, capture leads and hand over to a person, plus automation for routine tasks.',
    cta: 'Explore AI',
    points: ['AI chat agents for your website', 'AI chat agents for WhatsApp', 'AI receptionist', 'Workflow automation'],
  },
  {
    icon: 'seo',
    hub: '/services/seo-digital-marketing',
    description: 'SEO, local SEO and Google Business Profile work that helps the right customers find you.',
    cta: 'Explore SEO',
    points: ['SEO plans', 'Local SEO', 'Google Business Profile', 'Paid ads on Google and Meta'],
  },
];

/** Process (brief 7.2 item 7): 4 steps. */
export const PROCESS_STEPS = [
  {
    title: 'Free call',
    text: 'A 30-minute call about your goals and what you have today. You leave with a clear next step.',
  },
  {
    title: 'Plan and quote',
    text: 'Within 1 working day you get a written plan and a fixed quote, so you know the cost before we start.',
  },
  {
    title: 'Build',
    text: 'We work to the dates we agree, and you review each stage before we move on.',
  },
  {
    title: 'Launch and grow',
    text: 'We launch, then keep your site safe and help you grow with care, SEO and social media plans.',
  },
];

/**
 * Founder note (brief 7.2 item 10). Facts from the business profile, section 2.
 * TODO(Talha): approve or rewrite these 3 lines. They are in your voice.
 */
export const FOUNDER_NOTE = [
  'I started in 2017 with logo animation and design, and built Maxterz from there.',
  'Today I look after every client from the UK, and our delivery team works from Pakistan and India.',
  'You deal with me from the first call to launch and after. One person, who knows your project.',
];

/**
 * Home FAQ (brief 7.2 item 11): 6 questions. Prices come in from Supabase through the page.
 *
 * @param {{ landingFrom: string | null, websiteFrom: string | null, launchKitPrice: string | null }} prices formatted GBP amounts
 * @returns {Array<{ q: string, a: string }>}
 */
export function buildHomeFaqs({ landingFrom, websiteFrom, launchKitPrice }) {
  const cost = [
    landingFrom && websiteFrom
      ? `A landing page starts from ${landingFrom} and a website of up to 5 pages from ${websiteFrom}.`
      : 'Every website has a published starting price on its service page.',
    launchKitPrice ? `The Launch Kit, with your brand, website and Google set-up in one package, is ${launchKitPrice}.` : '',
    'Every project gets a fixed quote before work starts. Prices are in GBP and no VAT is added.',
  ]
    .filter(Boolean)
    .join(' ');

  return [
    { q: 'How much does a website cost?', a: cost },
    {
      q: 'How long does a project take?',
      a: 'A landing page takes 5 to 10 working days. A website of up to 5 pages takes 2 to 3 weeks. The Launch Kit goes live in 21 working days from the day we receive your content. We agree your launch date before we start.',
    },
    {
      q: 'Who will I work with?',
      a: 'Talha, our founder, is your one point of contact from the first call to launch and after. Our delivery team does the work, so you never manage several freelancers.',
    },
    {
      q: 'Who owns the files and code?',
      a: 'You do. Once the final payment is made, your website, its code and the files listed in your package are yours.',
    },
    {
      q: 'Do you work with clients outside the UK?',
      a: 'Yes. Maxterz is a UK-registered company and has worked with businesses worldwide since 2017. Prices are in GBP and international clients pay by card. You book your call at a time that suits you, wherever you are.',
    },
    {
      q: 'What happens on the free call?',
      a: 'It takes 30 minutes. We look at your goals and what you have today, point out quick wins and recommend the right next step, whether that is working with us or not. There is no hard sell.',
    },
  ];
}
