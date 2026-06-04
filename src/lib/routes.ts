export function getPersonHubUrl(slug: string, show: string = 'bergdoktor'): string {
  return `/tv-news/${show}/person/${slug}`;
}

export function getArticleUrl(slug: string, type: string, series?: string): string {
  switch (type) {
    case 'cluster':
      return `/singles-partnersuche/${slug}`;
    case 'regional':
      return `/regional/${slug}`;
    case 'serie':
      if (series === 'tatort-zuerich') return `/tv-news/tatort-zuerich/${slug}`;
      if (series === 'bergdoktor') return `/tv-news/bergdoktor/${slug}`;
      return `/tv-news/${slug}`;
    case 'story':
      return `/erfolgsgeschichten/${slug}`;
    case 'promi-arzt':
      return `/promi-aerzte-schweiz/${slug}`;
    default:
      return `/singles-partnersuche/${slug}`;
  }
}
