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
        category: a.entry.category,
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
      category: 'erfolgsgeschichte',
    }));

  const featured = [...featuredArticles, ...featuredStories].slice(0, 3);

  return NextResponse.json(featured, {
    headers: {
      'Access-Control-Allow-Origin': 'https://blaulichtsingles.ch',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
