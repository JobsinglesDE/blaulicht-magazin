import { reader } from '@/lib/keystatic';

const BASE = 'https://blaulichtsingles.ch/magazin';

export async function GET() {
  const [articles, series] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.series.all(),
  ]);

  // News-Sitemap: nur Artikel der letzten 2 Tage (Google-Anforderung)
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  type NewsEntry = { url: string; title: string; date: string };
  const newsEntries: NewsEntry[] = [];

  for (const a of articles) {
    if (a.entry.status !== 'published' || !a.entry.publishedAt) continue;
    const pubDate = new Date(a.entry.publishedAt);
    if (pubDate < twoDaysAgo) continue;

    const slug = a.entry.type === 'cluster'
      ? `/singles-partnersuche/${a.slug}`
      : `/singles-partnersuche/${a.slug}`;

    newsEntries.push({
      url: `${BASE}${slug}`,
      title: a.entry.title,
      date: pubDate.toISOString(),
    });
  }

  for (const s of series) {
    if (s.entry.status !== 'published' || !s.entry.publishedAt) continue;
    const pubDate = new Date(s.entry.publishedAt);
    if (pubDate < twoDaysAgo) continue;

    newsEntries.push({
      url: `${BASE}/tv-news/${s.entry.seriesId}/${s.slug}`,
      title: s.entry.title,
      date: pubDate.toISOString(),
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsEntries.map((e) => `  <url>
    <loc>${e.url}</loc>
    <news:news>
      <news:publication>
        <news:name>Blaulicht Magazin</news:name>
        <news:language>de</news:language>
      </news:publication>
      <news:publication_date>${e.date}</news:publication_date>
      <news:title>${escapeXml(e.title)}</news:title>
    </news:news>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
