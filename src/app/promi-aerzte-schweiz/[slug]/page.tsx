import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
import { JsonLd, articleJsonLd, faqJsonLd } from '@/components/seo/JsonLd';
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
  const articles = await reader.collections.articles.all();
  return articles
    .filter((a) => (a.entry as any).type === 'promi-arzt' && a.entry.status !== 'draft')
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.articles.read(slug);
  if (!article || (article as any).type !== 'promi-arzt') return {};
  const seoTitle = (article as any).seoTitle;
  const seoDescription = (article as any).seoDescription;
  return {
    title: seoTitle || article.title,
    description: seoDescription || article.excerpt,
    alternates: { canonical: `/promi-aerzte-schweiz/${slug}` },
    openGraph: {
      title: seoTitle || article.title,
      description: seoDescription || article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

export default async function PromiArztArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  if (!article || (article as any).type !== 'promi-arzt') notFound();
  if (article.status === 'draft') notFound();

  const author = (article as any).author
    ? await reader.collections.authors.read((article as any).author)
    : null;

  const hasFaq = 'faqItems' in article && (article as any).faqItems && (article as any).faqItems.length > 0;
  const isNews = 'isNews' in article ? (article as any).isNews : false;
  const url = `https://blaulichtsingles.ch/magazin/promi-aerzte-schweiz/${slug}`;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url,
          image: article.featuredImage || undefined,
          datePublished: (article as any).publishedAt || undefined,
          dateModified: (article as any).publishedAt || undefined,
          isNews,
        })}
      />
      {hasFaq && <JsonLd data={faqJsonLd((article as any).faqItems)} />}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category="Promi-Ärzte Schweiz"
        image={article.featuredImage || undefined}
        imageAlt={article.featuredImageAlt || undefined}
        imageCredit={(article as any).featuredImageCredit || undefined}
        date={(article as any).publishedAt || undefined}
      />

      <StickyTOC items={extractH2s(article.content)} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Promi-Ärzte Schweiz', href: '/promi-aerzte-schweiz' },
          { label: article.title, href: `/promi-aerzte-schweiz/${slug}` },
        ]} />

        <ArticleByline publishedAt={(article as any).publishedAt || undefined} />

        <TableOfContents items={extractH2s(article.content)} />

        {'calloutQuestion' in article && (article as any).calloutQuestion && (
          <CalloutBox question={(article as any).calloutQuestion}>
            {'calloutAnswer' in article && (article as any).calloutAnswer}
          </CalloutBox>
        )}

        <ArticleBody content={article.content} />

        {'takeaways' in article && (article as any).takeaways && ((article as any).takeaways as string[]).length > 0 && (
          <TakeawayBox items={(article as any).takeaways as string[]} />
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

        <div className="mt-12 rounded-2xl border border-border bg-surface-dark/40 p-6">
          <div className="text-sm text-foreground/60 mb-1">Pillar</div>
          <Link href="/promi-aerzte-schweiz" className="text-lg font-bold text-brand-orange-text hover:underline">
            ← Alle Promi-Ärzte der Schweiz im Überblick
          </Link>
        </div>

        <div className="text-center py-8">
          <HeartButton href="https://blaulichtsingles.ch/registration/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>
      </div>
    </>
  );
}
