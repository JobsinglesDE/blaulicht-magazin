import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { StickyTOC } from '@/components/content/StickyTOC';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
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

export async function generateStaticParams() {
  const items = await reader.collections.bekanntschaften.all();
  return items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.bekanntschaften.read(slug);
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

export default async function BekanntschaftenArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.bekanntschaften.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  const hasFaq = article.faqItems && article.faqItems.length > 0;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `https://blaulichtsingles.ch/magazin/regional/bekanntschaften/${slug}`,
          image: article.featuredImage || undefined,
          datePublished: article.publishedAt || undefined,
          dateModified: article.publishedAt || undefined,
          isNews: false,
        })}
      />
      {hasFaq && <JsonLd data={faqJsonLd(article.faqItems)} />}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category={`Bekanntschaften ${article.city || ''}`}
        image={article.featuredImage || undefined}
        date={article.publishedAt || undefined}
      />

      <StickyTOC items={extractH2s(article.content)} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: 'Bekanntschaften', href: '/regional/bekanntschaften' },
          { label: article.city || article.title, href: `/regional/bekanntschaften/${slug}` },
        ]} />

        <TableOfContents items={extractH2s(article.content)} />
        <ArticleBody content={article.content} />

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {hasFaq && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">Häufige Fragen</h2>
            <FAQAccordion items={article.faqItems} />
          </>
        )}

        <PillarBacklinkCard variant="bekanntschaften" />

        <div className="text-center py-8">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>
      </div>
    </>
  );
}
