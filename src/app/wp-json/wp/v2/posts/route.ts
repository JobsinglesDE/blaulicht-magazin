import { NextResponse } from 'next/server';
import { reader } from '@/lib/keystatic';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [allArticles, allStories] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.stories.all(),
  ]);

  // Featured Articles
  const featuredArticles = allArticles
    .filter((a) => a.entry.isFeatured && a.entry.status === 'published')
    .map((a) => {
      const categoryPath =
        a.entry.category === 'tv-news' ? 'tv-news' : 'singles-partnersuche';
      return {
        title: a.entry.title,
        excerpt: a.entry.excerpt || '',
        url: `https://blaulichtsingles.ch/magazin/${categoryPath}/${a.slug}/`,
        image: a.entry.featuredImage
          ? `https://blaulichtsingles.ch/magazin${a.entry.featuredImage}`
          : '',
        date: a.entry.publishedAt || '2026-01-01',
      };
    });

  // Featured Stories
  const featuredStories = allStories
    .filter((s) => s.entry.isFeatured)
    .map((s) => ({
      title: s.entry.title,
      excerpt: s.entry.excerpt || '',
      url: `https://blaulichtsingles.ch/magazin/erfolgsgeschichten/${s.slug}/`,
      image: s.entry.featuredImage
        ? `https://blaulichtsingles.ch/magazin${s.entry.featuredImage}`
        : '',
      date: s.entry.publishedAt || '2026-01-01',
    }));

  const featured = [...featuredArticles, ...featuredStories].slice(0, 3);

  // WP REST API kompatibles Format
  const posts = featured.map((item, index) => ({
    id: index + 1,
    date: item.date + 'T00:00:00',
    title: { rendered: item.title },
    excerpt: { rendered: `<p>${item.excerpt}</p>` },
    link: item.url,
    featured_media: index + 1,
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: item.image,
          alt_text: item.title,
          media_details: {
            width: 768,
            height: 404,
            sizes: {
              medium: { source_url: item.image, width: 768, height: 404 },
              thumbnail: { source_url: item.image, width: 225, height: 300 },
            },
          },
        },
      ],
    },
  }));

  return NextResponse.json(posts, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'X-WP-Total': String(posts.length),
      'X-WP-TotalPages': '1',
    },
  });
}
