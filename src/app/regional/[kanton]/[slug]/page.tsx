import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';
import { RegionalHero } from '@/components/content/RegionalHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { MatchQuiz } from '@/components/ui/MatchQuiz';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
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
  const all = await reader.collections.regional.all();
  return all.map((r) => ({
    kanton: toSlug(r.entry.kanton),
    slug: r.slug,
  }));
}

const BASE_URL = 'https://blaulichtsingles.ch/magazin';

export async function generateMetadata({ params }: { params: Promise<{ kanton: string; slug: string }> }): Promise<Metadata> {
  const { kanton, slug } = await params;
  const article = await reader.collections.regional.read(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = `${BASE_URL}/regional/${toSlug(kanton)}/${slug}`;
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
          url: `${BASE_URL}/regional/${toSlug(kanton)}/${slug}`,
          image: article.featuredImage ? `${BASE_URL}${article.featuredImage}` : undefined,
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

        {/* CTA oben */}
        <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="my-8">
          <div className="p-6 text-center">
            <p className="text-sm text-foreground/70 mb-3">Du bist bei Polizei, Feuerwehr oder Sanität?</p>
            <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
              Jetzt kostenfrei anmelden
            </HeartButton>
          </div>
        </AnimatedGradientBorder>

        <ArticleBody content={article.content} />

        <PillarBacklinkCard beruf={(article as any).beruf ?? 'polizei'} />

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

        {/* CTA unten */}
        <div className="text-center py-12">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>
      </div>
    </>
  );
}
