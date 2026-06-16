import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { StickyTOC } from '@/components/content/StickyTOC';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleByline } from '@/components/content/ArticleByline';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
import { RelatedSeriesArticles } from '@/components/content/RelatedSeriesArticles';
import { JsonLd, articleJsonLd, faqJsonLd, videoJsonLd, extractYoutubeEmbed } from '@/components/seo/JsonLd';
import { AuthorBio } from '@/components/ui/AuthorBio';

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

export async function generateStaticParams() {
  const series = await reader.collections.series.all();
  return series
    .filter((s) => s.entry.seriesId === 'bergdoktor' && s.entry.status !== 'draft')
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.series.read(slug);
  if (!article) return {};
  const seoTitle = article.seoTitle;
  const seoDescription = article.seoDescription;
  return {
    title: seoTitle || article.title,
    description: seoDescription || article.excerpt,
    alternates: { canonical: `/tv-news/bergdoktor/${slug}` },
    openGraph: {
      title: seoTitle || article.title,
      description: seoDescription || article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default async function BergdoktorArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = await reader.collections.series.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  const author = (article as any).author
    ? await reader.collections.authors.read((article as any).author)
    : null;
  if (article.status === 'draft') notFound();

  const articlePerson: string | undefined = (article as any).person || undefined;
  let personName: string | undefined;
  if (articlePerson) {
    const allPersons = await reader.collections.persons.all();
    const matched = allPersons.find((p) => p.slug === articlePerson);
    if (matched) {
      personName = matched.entry.name;
    }
  }

  const hasFaq = 'faqItems' in article && article.faqItems && article.faqItems.length > 0;
  const isNews = 'isNews' in article ? (article as any).isNews : false;
  const ytEmbed = extractYoutubeEmbed(article.content);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `https://blaulichtsingles.ch/magazin/tv-news/bergdoktor/${slug}`,
          image: article.featuredImage || undefined,
          datePublished: article.publishedAt || undefined,
          dateModified: article.publishedAt || undefined,
          isNews,
        })}
      />
      {hasFaq && (
        <JsonLd data={faqJsonLd((article as any).faqItems)} />
      )}
      {ytEmbed && (
        <JsonLd data={videoJsonLd({
          name: ytEmbed.title || article.title,
          description: article.excerpt,
          videoId: ytEmbed.videoId,
          uploadDate: article.publishedAt ? `${article.publishedAt}T08:00:00+02:00` : undefined,
        })} />
      )}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category="Der Bergdoktor"
        image={article.featuredImage || undefined}
        imageAlt={article.featuredImageAlt || undefined}
        imageCredit={article.featuredImageCredit || undefined}
        date={article.publishedAt || undefined}
      />

      <StickyTOC items={extractH2s(article.content)} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'TV News', href: '/tv-news' },
          { label: 'Der Bergdoktor', href: '/tv-news/bergdoktor' },
          { label: article.title, href: `/tv-news/bergdoktor/${slug}` },
        ]} />

        <ArticleByline publishedAt={article.publishedAt || undefined} />

        <TableOfContents items={extractH2s(article.content)} />

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
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">Häufige Fragen</h2>
            <FAQAccordion items={(article as any).faqItems} />
          </>
        )}

        {author && (
          <AuthorBio
            name={author.name}
            slug={(article as any).author || undefined}
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        <RelatedSeriesArticles currentSlug={slug} currentSeriesId={article.seriesId} />

        <PillarBacklinkCard
          variant="tv-news"
          seriesId="bergdoktor"
          person={personName ? articlePerson : undefined}
          personName={personName}
        />

        <div className="text-center py-8">
          <HeartButton href="https://blaulichtsingles.ch/registration/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>
      </div>
    </>
  );
}
