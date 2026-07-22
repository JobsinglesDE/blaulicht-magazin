import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { StudyReport } from '@/components/content/StudyReport';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleByline } from '@/components/content/ArticleByline';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, articleJsonLd, faqJsonLd, studieDatasetJsonLd } from '@/components/seo/JsonLd';

const BASE_URL = 'https://blaulichtsingles.ch/magazin';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await reader.collections.articles.all();
  return articles
    .filter((a) => a.entry.type === 'studie')
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.articles.read(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = `${BASE_URL}/studien/${slug}`;
  const image = article.featuredImage
    ? `${BASE_URL}${article.featuredImage}`
    : `${BASE_URL}/logos/jobsingles-logo.webp`;

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
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function StudieArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  if (!article || article.type !== 'studie') notFound();

  const author = article.author
    ? await reader.collections.authors.read(article.author)
    : null;

  const url = `${BASE_URL}/studien/${slug}`;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url,
          image: article.featuredImage ? `${BASE_URL}${article.featuredImage}` : undefined,
          datePublished: article.publishedAt || undefined,
          authorName: author?.name,
          authorUrl: author?.socialLinks?.find((l) => l.platform === 'Website')?.url ?? undefined,
        })}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <JsonLd data={faqJsonLd(article.faqItems)} />
      )}
      {(() => {
        const ds = studieDatasetJsonLd({
          name: article.title,
          description: article.excerpt,
          url,
          datenpunkte: (article.studieDatenpunkte || []).map((d) => ({
            label: d.label,
            wert: d.wert || undefined,
            einheit: d.einheit || undefined,
            quelle: d.quelle || undefined,
          })),
          temporalCoverage: article.studieDatengrundlage || undefined,
          dateModified: article.publishedAt || undefined,
        });
        return ds ? <JsonLd data={ds} /> : null;
      })()}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category={article.category}
        image={article.featuredImage || undefined}
        imageAlt={article.featuredImageAlt || undefined}
        imageCredit={article.featuredImageCredit || undefined}
        date={article.publishedAt || undefined}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Wissenschaft & Liebe', href: '/studien' },
          { label: article.title, href: `/studien/${slug}` },
        ]} />

        <ArticleByline publishedAt={article.publishedAt || undefined} />

        {article.calloutQuestion && (
          <CalloutBox question={article.calloutQuestion}>
            {article.calloutAnswer}
          </CalloutBox>
        )}

        <ArticleBody content={article.content} />

        <StudyReport
          methodik={article.studieMethodik || undefined}
          datengrundlage={article.studieDatengrundlage || undefined}
          stichprobe={article.studieStichprobe || undefined}
          institut={article.studieInstitut || undefined}
          datenpunkte={article.studieDatenpunkte || []}
          quellen={article.studieQuellen || []}
        />

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {article.faqItems && article.faqItems.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Häufige Fragen</h2>
            <FAQAccordion items={article.faqItems} />
          </div>
        )}

        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-10 px-6 bg-surface-dark text-white text-center">
            <p className="text-lg font-bold mb-2">Selbst Teil der Daten werden?</p>
            <p className="text-white/60 text-sm mb-5">Blaulicht-Singles — Polizei, Feuerwehr und Rettung — finden hier zueinander.</p>
            <HeartButton href="https://blaulichtsingles.ch/registration/?AID=magazin">
              Jetzt kostenfrei mitmachen
            </HeartButton>
          </div>
        </AnimatedGradientBorder>
      </div>
    </>
  );
}
