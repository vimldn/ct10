const baseUrl = "https://www.cosmetictreatment.co.uk";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#org`,
        name: "Cosmetic Treatment London",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo-512.png`,
        },
        areaServed: "London, UK",
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Cosmetic Treatments London",
        publisher: {
          "@id": `${baseUrl}/#org`,
        },
      },
    ],
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema(service, city = null) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city
      ? `${service.name} in ${city.name}`
      : `${service.name} in London`,
    description: service.description,
    areaServed: city ? city.name : "London",
    provider: {
      "@type": "Organization",
      name: "Cosmetic Treatment London",
      url: baseUrl,
    },
  };
}

export function blogPostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Cosmetic Treatment London",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}