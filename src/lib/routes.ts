export function getArticleUrl(slug: string, type: string, series?: string): string {
  switch (type) {
    case 'cluster':
      return `/singles-partnersuche/${slug}`;
    case 'regional':
      return `/regional/${slug}`;
    case 'serie':
      if (series === 'assistenzaerzte') return `/tv-news/assistenzaerzte/${slug}`;
      if (series === 'tatort-zuerich') return `/tv-news/tatort-zuerich/${slug}`;
      return `/tv-news/${slug}`;
    case 'story':
      return `/erfolgsgeschichten/${slug}`;
    default:
      return `/singles-partnersuche/${slug}`;
  }
}
