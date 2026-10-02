// @ts-check
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
