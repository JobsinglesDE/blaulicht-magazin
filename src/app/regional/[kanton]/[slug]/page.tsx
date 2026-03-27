import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';
import { RegionalHero } from '@/components/content/RegionalHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

function toSlug(kanton: string) {
  return kanton.toLowerCase().replace(/[\s-]+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
}

function toId(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractH2s(content: any): { label: string; id: string }[] {
  const node = 'node' in content ? content.node : content;
  const items: { label: string; id: string }[] = [];
  function walk(n: any) {
    if (n?.type === 'heading' && n?.attributes?.level === 2) {
      const text = (n.children ?? [])
        .map((c: any) => (typeof c === 'string' ? c : c?.attributes?.content ?? ''))
        .join('');
      if (text) items.push({ label: text, id: toId(text) });
    }
    (n?.children ?? []).forEach(walk);
  }
  walk(node);
  return items;
}

export async function generateStaticParams() {
  const all = await reader.collections.regional.all();
  return all.map((r) => ({
    kanton: toSlug(r.entry.kanton),
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ kanton: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await reader.collections.regional.read(slug);
  if (!article) return {};
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
  };
}

export default async function RegionalDetail({ params }: { params: Promise<{ kanton: string; slug: string }> }) {
  const { kanton, slug } = await params;
  const article = await reader.collections.regional.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `https://blaulichtsingles.ch/magazin/regional/${toSlug(kanton)}/${slug}`,
          image: article.featuredImage || undefined,
          datePublished: article.publishedAt || undefined,
        })}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <JsonLd data={faqJsonLd(article.faqItems)} />
      )}

      <RegionalHero
        title={article.title}
        kanton={article.kanton}
        city={article.city}
        excerpt={article.excerpt}
        image={article.featuredImage || undefined}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: article.kanton, href: `/regional/${toSlug(article.kanton)}` },
          { label: article.title, href: `/regional/${toSlug(article.kanton)}/${slug}` },
        ]} />

        <TableOfContents items={extractH2s(article.content)} />

        <ArticleBody content={article.content} />

        <PillarBacklinkCard beruf={(article as any).beruf ?? 'polizei'} />

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {article.faqItems && article.faqItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-16 mb-2">Häufige Fragen</h2>
            <FAQAccordion items={article.faqItems} />
          </>
        )}
      </div>
    </>
  );
}
