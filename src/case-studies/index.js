export const caseStudies = [
  {
    slug: 'mm-window-cleaning',
    bg: '#ffffff',
    title: 'MM Window Cleaning',
    category: 'Web Development',
    description:
      'A trust-first website and social presence for a local window cleaning business, built to turn searches into booked enquiries.',
    width: 3324.46725,
    height: 7309.34715,
  },
  {
    slug: 'bwld',
    bg: '#ffffff',
    title: 'BWLD',
    category: 'Web Development',
    description:
      'A conversion-focused website with search and social marketing built around it, designed to earn trust and drive enquiries.',
    width: 3324.46725,
    height: 7309.34715,
  },
  {
    slug: 'areeka-o-karak',
    bg: '#fffbf5',
    title: 'Areeka O Karak',
    category: 'Web Development',
    description:
      'A custom, engaging website with a smooth customer experience and a secure admin dashboard for managing the business.',
    width: 2936.53335,
    height: 8724.2739,
  },
  {
    slug: 'logo-and-graphic-design',
    bg: '#ffffff',
    title: 'Logo & Graphic Design',
    category: 'Branding & Design',
    description:
      'A complete logo and graphic design project, from concept through to the final brand assets.',
    width: 1770.6717,
    height: 5758.19115,
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
