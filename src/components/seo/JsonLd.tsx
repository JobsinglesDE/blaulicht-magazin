interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Stabile Entity-Graph-Wurzeln — auf jeder Seite via layout.tsx emittiert,
// andere Schema-Nodes (Article/CollectionPage) referenzieren sie per @id.
export const SITE_BASE = 'https://blaulichtsingles.ch/magazin';
export const WEBSITE_ID = `${SITE_BASE}#website`;
export const ORG_ID = `${SITE_BASE}#organization`;

/** Site-weiter Entity-Graph (WebSite + Organization). CH-Seite → de-CH. */
export function siteGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_BASE,
        name: 'Blaulicht Magazin',
        inLanguage: 'de-CH',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Blaulicht Magazin',
        url: SITE_BASE,
        logo: `${SITE_BASE}/logos/jobsingles-logo.webp`,
        sameAs: ['https://www.facebook.com/thomashonold1/'],
      },
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  isNews,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  isNews?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': isNews ? 'NewsArticle' : 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description,
    url,
    ...(image && {
      image: image.startsWith('http') ? [image] : [`https://blaulichtsingles.ch${image.startsWith('/') ? '' : '/'}${image}`],
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      '@type': 'Person',
      name: authorName || 'Tommy Honold',
      url: authorUrl || 'https://blaulichtsingles.ch/magazin/autor/tommy-honold',
      sameAs: [
        'https://www.facebook.com/thomashonold1/',
        'https://blaulichtsingles.ch/magazin/autor/tommy-honold',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Blaulicht Magazin',
      logo: `${SITE_BASE}/logos/jobsingles-logo.webp`,
    },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'de-CH',
  };
}

export function faqJsonLd(items: readonly { readonly question: string; readonly answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function videoJsonLd({
  name,
  description,
  videoId,
  uploadDate,
  duration = 'PT35S',
}: {
  name: string;
  description: string;
  videoId: string;
  uploadDate?: string;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    ...(uploadDate ? { uploadDate: uploadDate.includes('T') ? uploadDate : `${uploadDate}T00:00:00+02:00` } : {}),
    duration,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    publisher: {
      '@type': 'Organization',
      name: 'BlaulichtSingles.ch',
      url: 'https://blaulichtsingles.ch',
    },
  };
}

/**
 * Extract YouTube embed info from a Keystatic Markdoc content tree.
 * Finds the first `{% youtube url="..." title="..." /%}` tag node.
 */
export function extractYoutubeEmbed(content: unknown): { videoId: string; title: string } | null {
  const root = content && typeof content === 'object' && 'node' in content
    ? (content as { node: unknown }).node
    : content;
  let found: { videoId: string; title: string } | null = null;

  function walk(n: unknown): void {
    if (found || !n || typeof n !== 'object') return;
    const node = n as {
      type?: string;
      name?: string;
      tag?: string;
      attributes?: { url?: string; title?: string };
      children?: unknown[];
    };
    const tagName = node.tag ?? node.name;
    if (node.type === 'tag' && tagName === 'youtube') {
      const url = node.attributes?.url;
      const title = node.attributes?.title ?? '';
      if (url) {
        const m = url.match(/(?:v=|youtu\.be\/|shorts\/)([^&\s?]+)/);
        if (m) {
          found = { videoId: m[1], title };
          return;
        }
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  }
  walk(root);
  return found;
}

export function personJsonLd({
  name,
  role,
  image,
  url,
  sameAs,
}: {
  name: string;
  role?: string;
  image?: string;
  url: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
    ...(role && { jobTitle: role }),
    ...(image && {
      image: image.startsWith('http')
        ? image
        : `https://blaulichtsingles.ch${image.startsWith('/') ? '' : '/'}${image}`,
    }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage: 'de-CH',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: it.url,
      })),
    },
  };
}

export function placeJsonLd({
  name,
  description,
  url,
  kanton,
}: {
  name: string;
  description: string;
  url: string;
  kanton: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name,
    description,
    url,
    address: {
      '@type': 'PostalAddress',
      addressRegion: kanton,
      addressCountry: 'CH',
    },
    containedInPlace: {
      '@type': 'Country',
      name: 'Schweiz',
    },
  };
}
