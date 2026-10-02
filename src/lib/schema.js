// @ts-check
import { ROUTES } from './routes';
import { SITE } from './site';

/**
 * Inline JSON-LD script component.
 * @param {{ data: object }} props
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/**
 * Build breadcrumb items from ROUTES parent chain.
 * @param {string} path
 * @returns {Array<{ name: string, url: string }>}
 */
export function buildBreadcrumbItems(path) {
  const items = [];
  let current = ROUTES.find(r => r.path === path);
  while (current) {
    items.unshift({ name: current.breadcrumbLabel, url: `${SITE.url}${current.path}` });
    current = current.parent ? ROUTES.find(r => r.path === current.parent) : null;
  }
  if (path !== '/' && items[0]?.url !== `${SITE.url}/`) {
    items.unshift({ name: 'Home', url: `${SITE.url}/` });
  }
  return items;
}

/**
 * Build the full JSON-LD graph for a static page: WebPage + BreadcrumbList + optional Service.
 * Returns null for paths not in ROUTES.
 * @param {string} path
 * @returns {object|null}
 */
export function buildPageSchema(path) {
  const route = ROUTES.find(r => r.path === path);
  if (!route) return null;

  const url = `${SITE.url}${path}`;
  const graph = [];

  const pageType = route.schema.includes('AboutPage') ? 'AboutPage'
    : route.schema.includes('ContactPage') ? 'ContactPage'
    : 'WebPage';

  /** @type {object} */
  const webPage = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: route.title.replace(' | Maxterz', '').replace(' | Maxterz', ''),
    description: route.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
    dateModified: route.updatedAt,
  };
  if (path !== '/') {
    webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
  }
  graph.push(webPage);

  if (path !== '/') {
    const crumbs = buildBreadcrumbItems(path);
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  if (route.schema.includes('Service')) {
    /** @type {object} */
    const serviceNode = {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: route.h1,
      serviceType: route.primaryKeyword,
      description: route.description,
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: 'Worldwide',
      url,
    };
    if (route.fromPriceGBP) {
      serviceNode.offers = route.billing === 'monthly'
        ? { '@type': 'UnitPriceSpecification', price: route.fromPriceGBP, priceCurrency: 'GBP', unitCode: 'MON' }
        : { '@type': 'AggregateOffer', lowPrice: `${route.fromPriceGBP}`, priceCurrency: 'GBP' };
    }
    graph.push(serviceNode);
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * Server component: renders the page-level JSON-LD for a route.
 * @param {{ path: string }} props
 */
export function PageSchema({ path }) {
  const data = buildPageSchema(path);
  if (!data) return null;
  return <JsonLd data={data} />;
}

/**
 * Site-wide Organization + WebSite graph for the root layout.
 * @returns {object}
 */
export function buildSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/logo-512.png`,
          width: 512,
          height: 512,
        },
        description: SITE.description,
        slogan: SITE.tagline,
        email: SITE.email,
        telephone: SITE.phoneE164,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'UK Companies House number',
          value: SITE.companyNumber,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.registeredOffice.street,
          addressLocality: SITE.registeredOffice.locality,
          postalCode: SITE.registeredOffice.postcode,
          addressCountry: SITE.registeredOffice.country,
        },
        areaServed: 'Worldwide',
        founder: { '@id': `${SITE.url}/about#founder` },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: SITE.email,
            telephone: SITE.phoneE164,
            availableLanguage: ['English'],
          },
        ],
        knowsAbout: [
          'Web design', 'Web development', 'Mobile app development', 'UI/UX design',
          'Logo design', 'Brand identity', 'Logo animation', 'Motion graphics',
          'Explainer videos', 'Social media management', 'Search engine optimisation',
          'Local SEO', 'AI receptionists', 'AI chat agents', 'Workflow automation',
        ],
        sameAs: SITE.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: 'en-GB',
        publisher: { '@id': `${SITE.url}/#organization` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE.url}/about#founder`,
        name: SITE.founder.fullName,
        alternateName: SITE.founder.preferredName,
        jobTitle: SITE.founder.role,
        worksFor: { '@id': `${SITE.url}/#organization` },
        sameAs: [SITE.founder.linkedin],
      },
    ],
  };
}

/**
 * WebPage (or subtype) schema node for individual pages.
 * @param {{ url: string, name: string, description: string, dateModified: string, schemaType?: string }} opts
 * @returns {object}
 */
export function buildWebPageSchema({ url, name, description, dateModified, schemaType = 'WebPage' }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': schemaType,
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: 'en-GB',
        isPartOf: { '@id': `${SITE.url}/#website` },
        dateModified,
      },
    ],
  };
}

/**
 * BreadcrumbList schema node.
 * @param {{ items: Array<{ name: string, url: string }> }} opts
 * @returns {object}
 */
export function buildBreadcrumbSchema({ items }) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Service schema node for category hubs and service pages.
 * @param {{ url: string, name: string, serviceType: string, description: string, fromPriceGBP?: number, billing?: "one-off"|"monthly" }} opts
 * @returns {object}
 */
export function buildServiceSchema({ url, name, serviceType, description, fromPriceGBP, billing }) {
  /** @type {object} */
  const node = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: 'Worldwide',
    url,
  };
  if (fromPriceGBP) {
    node.offers = billing === 'monthly'
      ? { '@type': 'UnitPriceSpecification', price: fromPriceGBP, priceCurrency: 'GBP', unitCode: 'MON' }
      : { '@type': 'AggregateOffer', lowPrice: `${fromPriceGBP}`, priceCurrency: 'GBP' };
  }
  return node;
}

/**
 * FAQPage schema node — only add where the questions are visible on the page.
 * @param {{ questions: Array<{ question: string, answer: string }> }} opts
 * @returns {object}
 */
export function buildFAQSchema({ questions }) {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/**
 * Person schema for the founder (used on /about).
 * @param {{ photo?: string }} opts
 * @returns {object}
 */
export function buildFounderSchema({ photo } = {}) {
  return {
    '@type': 'Person',
    '@id': `${SITE.url}/about#founder`,
    name: SITE.founder.fullName,
    alternateName: SITE.founder.preferredName,
    jobTitle: SITE.founder.role,
    ...(photo ? { image: `${SITE.url}${photo}` } : {}),
    worksFor: { '@id': `${SITE.url}/#organization` },
    sameAs: [SITE.founder.linkedin],
  };
}
