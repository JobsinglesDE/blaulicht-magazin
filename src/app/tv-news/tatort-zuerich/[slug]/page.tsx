import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

export async function generateStaticParams() {
  const [series, articles] = await Promise.all([
    reader.collections.series.all(),
    reader.collections.articles.all(),
  ]);
  const fromSeries = series
    .filter((s) => s.entry.seriesId === 'tatort-zuerich')
    .map((s) => ({ slug: s.slug }));
  const fromArticles = articles
    .filter((a) => a.entry.type === 'serie' && a.entry.series === 'tatort-zuerich')
    .map((a) => ({ slug: a.slug }));
  return [...fromSeries, ...fromArticles];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seriesArticle = await reader.collections.series.read(slug);
  const article = seriesArticle || await reader.collections.articles.read(slug);
  if (!article) return {};
  const seoTitle = 'seoTitle' in article ? article.seoTitle : undefined;
  const seoDescription = 'seoDescription' in article ? article.seoDescription : undefined;
  return {
    title: seoTitle || article.title,
    description: seoDescription || article.excerpt,
    openGraph: {
      title: seoTitle || article.title,
      description: seoDescription || article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

export default async function TatortArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const seriesArticle = await reader.collections.series.read(slug, { resolveLinkedFiles: true });
  const article = seriesArticle || await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  const hasFaq = 'faqItems' in article && article.faqItems && article.faqItems.length > 0;
  const isNews = 'isNews' in article ? (article as any).isNews : false;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `https://blaulichtsingles.ch/magazin/tv-news/tatort-zuerich/${slug}`,
          image: article.featuredImage || undefined,
          datePublished: article.publishedAt || undefined,
          dateModified: article.publishedAt || undefined,
          isNews,
        })}
      />
      {hasFaq && (
        <JsonLd data={faqJsonLd((article as any).faqItems)} />
      )}

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

        {'calloutQuestion' in article && article.calloutQuestion && (
          <CalloutBox question={article.calloutQuestion}>
            {'calloutAnswer' in article && article.calloutAnswer}
          </CalloutBox>
        )}

        <ArticleBody content={article.content} />

        {'takeaways' in article && article.takeaways && (article.takeaways as string[]).length > 0 && (
          <TakeawayBox items={article.takeaways as string[]} />
        )}

        {hasFaq && (
          <>
            <h2 className="text-2xl font-bold mt-16 mb-2">Häufige Fragen</h2>
            <FAQAccordion items={(article as any).faqItems} />
          </>
        )}

        <div className="text-center py-8">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>
      </div>
    </>
  );
}
