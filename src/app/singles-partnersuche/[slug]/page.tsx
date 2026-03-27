import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { getArticleUrl } from '@/lib/routes';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.articles.read(slug);
  if (!article) return {};
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await reader.collections.articles.all();
  return articles
    .filter((a) => a.entry.type === 'cluster')
    .map((a) => ({ slug: a.slug }));
}

export default async function ClusterArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  const author = article.author
    ? await reader.collections.authors.read(article.author)
    : null;

  const allArticles = await reader.collections.articles.all();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.entry.category === article.category)
    .slice(0, 6)
    .map((a) => ({
      title: a.entry.title,
      excerpt: a.entry.excerpt,
      href: getArticleUrl(a.slug, a.entry.type, a.entry.series),
      image: a.entry.featuredImage || undefined,
      category: a.entry.category,
    }));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `https://blaulichtsingles.ch/magazin/singles-partnersuche/${slug}`,
          image: article.featuredImage || undefined,
          datePublished: article.publishedAt || undefined,
          authorName: author?.name,
          authorUrl: author?.socialLinks?.find((l) => l.platform === 'Website')?.url,
        })}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <JsonLd data={faqJsonLd(article.faqItems)} />
      )}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category={article.category}
        image={article.featuredImage || undefined}
        date={article.publishedAt || undefined}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: article.title, href: `/singles-partnersuche/${slug}` },
        ]} />

        {article.calloutQuestion && (
          <CalloutBox question={article.calloutQuestion}>
            {article.calloutAnswer}
          </CalloutBox>
        )}

        <ArticleBody content={article.content} />

        {/* CTA mid-article */}
        <div className="text-center py-8">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {article.faqItems && article.faqItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-16 mb-2">Häufige Fragen</h2>
            <FAQAccordion items={article.faqItems} />
          </>
        )}

        {/* Author Bio */}
        {author && (
          <AuthorBio
            name={author.name}
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}
      </div>

      {/* Related Articles Carousel */}
      {relatedArticles.length > 0 && (
        <CarouselCards title="Weitere Artikel" items={relatedArticles} />
      )}

      {/* Bottom CTA */}
      <section className="text-center py-16 px-6">
        <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
          Jetzt kostenfrei mitmachen
        </HeartButton>
      </section>
    </>
  );
}
