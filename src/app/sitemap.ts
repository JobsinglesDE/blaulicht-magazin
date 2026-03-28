import type { MetadataRoute } from 'next';
import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';

const BASE = 'https://blaulichtsingles.ch/magazin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, regional, series, stories, authors] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.regional.all(),
    reader.collections.series.all(),
    reader.collections.stories.all(),
    reader.collections.authors.all(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche/polizei`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche/feuerwehr`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche/sanitaet`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/tv-news`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/tv-news/tatort-zuerich`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/tv-news/bergdoktor`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/regional`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/erfolgsgeschichten`, priority: 0.6, changeFrequency: 'monthly' },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}${getArticleUrl(a.slug, a.entry.type, a.entry.series)}`,
    lastModified: a.entry.publishedAt ? new Date(a.entry.publishedAt) : undefined,
    priority: a.entry.type === 'cluster' ? 0.8 : 0.7,
    changeFrequency: 'monthly',
  }));

  // Regional: collect unique kantons for pillar pages
  const kantons = [...new Set(regional.map((r) => r.entry.kanton.toLowerCase().replace(/\s+/g, '-')))];
  const kantonPages: MetadataRoute.Sitemap = kantons.map((k) => ({
    url: `${BASE}/regional/${k}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const regionalPages: MetadataRoute.Sitemap = regional.map((r) => ({
    url: `${BASE}/regional/${r.entry.kanton.toLowerCase().replace(/\s+/g, '-')}/${r.slug}`,
    lastModified: r.entry.publishedAt ? new Date(r.entry.publishedAt) : undefined,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  const seriesPages: MetadataRoute.Sitemap = series.map((s) => ({
    url: `${BASE}/tv-news/${s.entry.seriesId}/${s.slug}`,
    lastModified: s.entry.publishedAt ? new Date(s.entry.publishedAt) : undefined,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  const storyPages: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${BASE}/erfolgsgeschichten/${s.slug}`,
    lastModified: s.entry.publishedAt ? new Date(s.entry.publishedAt) : undefined,
    priority: 0.5,
    changeFrequency: 'yearly',
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${BASE}/autor/${a.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...kantonPages,
    ...regionalPages,
    ...seriesPages,
    ...storyPages,
    ...authorPages,
  ];
}
