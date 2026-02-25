const baseUrl = 'https://www.cosmetictreatment.co.uk';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#org`,
        name: 'Cosmetic Treatment London',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo-512.png`,
        },
        areaServed: 'London, UK',
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Cosmetic Treatments London',
        publisher: { '@id': `${baseUrl}/#org` },
      },
    ],
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: (items || []).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema({ service, url, areaName }) {
  const name = areaName ? `${service.name} in ${areaName}` : `${service.name} in London`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: service.description || service.shortDescription || '',
    areaServed: areaName || 'London',
    provider: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#org`,
      name: 'Cosmetic Treatment London',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function blogPostSchema({ blog, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt || '',
    image: blog.image ? [blog.image] : undefined,
    datePublished: blog.date || undefined,
    dateModified: blog.date || undefined,
    author: {
      '@type': 'Person',
      name: blog.author || 'Cosmetic Treatment London',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#org`,
      name: 'Cosmetic Treatment London',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function faqSchema({ faqs, url }) {
  const cleanFaqs = (faqs || [])
    .filter((f) => f && f.question && f.answer)
    .map((f) => ({
      '@type': 'Question',
      name: String(f.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: String(f.answer),
      },
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cleanFaqs,
    mainEntityOfPage: url
      ? {
          '@type': 'WebPage',
          '@id': url,
        }
      : undefined,
  };
}
