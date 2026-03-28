import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { getArticleUrl } from '@/lib/routes';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { MatchQuiz } from '@/components/ui/MatchQuiz';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

function toId(text: string) {
  return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function collectText(n: any): string {
  if (typeof n === 'string') return n;
  if (n?.type === 'text') return n.attributes?.content ?? '';
  return (n?.children ?? []).map(collectText).join('');
}
function extractH2s(content: any): { label: string; id: string }[] {
  const node = 'node' in content ? content.node : content;
  const items: { label: string; id: string }[] = [];
  function walk(n: any) {
    if (n?.type === 'heading' && n?.attributes?.level === 2) {
      const text = collectText(n);
      if (text) items.push({ label: text, id: toId(text) });
    }
    (n?.children ?? []).forEach(walk);
  }
  walk(node);
  return items;
}

const BASE_URL = 'https://blaulichtsingles.ch/magazin';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.articles.read(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = `${BASE_URL}/singles-partnersuche/${slug}`;
  const image = article.featuredImage
    ? `${BASE_URL}${article.featuredImage}`
    : `${BASE_URL}/logos/jobsingles-logo.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1256, height: 710, alt: title }],
      siteName: 'Blaulicht Magazin',
      locale: 'de_CH',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
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
          url: `${BASE_URL}/singles-partnersuche/${slug}`,
          image: article.featuredImage ? `${BASE_URL}${article.featuredImage}` : undefined,
          datePublished: article.publishedAt || undefined,
          authorName: author?.name,
          authorUrl: author?.socialLinks?.find((l) => l.platform === 'Website')?.url ?? undefined,
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

        <TableOfContents items={extractH2s(article.content)} />

        {article.calloutQuestion && (
          <CalloutBox question={article.calloutQuestion}>
            {article.calloutAnswer}
          </CalloutBox>
        )}

        {/* CTA top — dezenter Banner */}
        <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="my-8">
          <div className="p-6 text-center">
            <p className="text-sm text-foreground/70 mb-3">Du bist bei Polizei, Feuerwehr oder Sanität?</p>
            <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
              Jetzt kostenfrei anmelden
            </HeartButton>
          </div>
        </AnimatedGradientBorder>

        <ArticleBody
          content={article.content}
          insertAfterH2={3}
          insertElement={
            <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
              <div className="py-10 px-6 bg-surface-dark text-white text-center">
                <p className="text-lg font-bold mb-2">Genug gelesen?</p>
                <p className="text-white/60 text-sm mb-5">Finde Singles, die deinen Alltag verstehen.</p>
                <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
                  Jetzt kostenfrei mitmachen
                </HeartButton>
              </div>
            </AnimatedGradientBorder>
          }
        />

        {['polizei', 'sanitaet', 'feuerwehr'].includes(article.category) && (
          <PillarBacklinkCard
            beruf={article.category as 'polizei' | 'sanitaet' | 'feuerwehr'}
            variant="partnersuche"
          />
        )}

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {/* Mini Quiz */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-8 px-6">
            <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">Finde deinen Match-Typ</p>
            <MatchQuiz />
          </div>
        </AnimatedGradientBorder>

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
            slug={article.author || undefined}
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
