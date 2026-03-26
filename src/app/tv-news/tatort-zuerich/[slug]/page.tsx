import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd } from '@/components/seo/JsonLd';

export async function generateStaticParams() {
  const all = await reader.collections.series.all();
  return all
    .filter((s) => s.entry.seriesId === 'tatort-zuerich')
    .map((s) => ({ slug: s.slug }));
}

export default async function TatortArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.series.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `https://blaulichtsingles.ch/magazin/tv-news/tatort-zuerich/${slug}`,
          image: article.featuredImage || undefined,
          datePublished: article.publishedAt || undefined,
        })}
      />

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category="Tatort Zürich"
        image={article.featuredImage || undefined}
        date={article.publishedAt || undefined}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'TV News', href: '/tv-news' },
          { label: 'Tatort Zürich', href: '/tv-news/tatort-zuerich' },
          { label: article.title, href: `/tv-news/tatort-zuerich/${slug}` },
        ]} />

        <ArticleBody content={article.content} />
      </div>
    </>
  );
}
