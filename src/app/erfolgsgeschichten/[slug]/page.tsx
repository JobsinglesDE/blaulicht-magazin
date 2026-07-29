import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleBody } from '@/components/content/ArticleBody';
import { PolaroidCard } from '@/components/ui/PolaroidCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleByline } from '@/components/content/ArticleByline';
import { JsonLd, articleJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';

export async function generateStaticParams() {
  const stories = await reader.collections.stories.all();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await reader.collections.stories.read(slug);
  if (!story) return {};

  const title = story.seoTitle || story.title;
  const description = story.seoDescription || story.excerpt;

  const url = `https://blaulichtsingles.ch/magazin/erfolgsgeschichten/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      ...(story.featuredImage && { images: [{ url: story.featuredImage }] }),
    },
  };
}

export default async function StoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await reader.collections.stories.read(slug, { resolveLinkedFiles: true });
  if (!story) notFound();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: story.title,
          description: story.excerpt,
          url: `https://blaulichtsingles.ch/magazin/erfolgsgeschichten/${slug}`,
          image: story.featuredImage || undefined,
          datePublished: story.publishedAt || undefined,
        })}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Erfolgsgeschichten', href: '/erfolgsgeschichten' },
          { label: story.title, href: `/erfolgsgeschichten/${slug}` },
        ]} />

        <ArticleByline publishedAt={story.publishedAt || undefined} />

        {story.featuredImage && (
          <div className="flex justify-center mb-12">
            <PolaroidCard rotation="slight" tape="center">
              <img width="600" height="400"
                src={withBasePath(story.featuredImage)}
                alt={story.featuredImageAlt || `${story.couple} — Erfolgsgeschichte blaulichtsingles.ch`}
                className="w-full max-w-sm aspect-square object-cover"
              />
              <div className="p-3 text-center">
                <p className="font-bold text-gray-900">{story.couple}</p>
                {story.location && <p className="text-xs text-gray-500">{story.location}</p>}
                {/* Art. 50 Abs. 4 KI-VO + § 5 UWG: Die Story nennt konkrete Personen,
                    das Bild zeigt sie nicht. "Symbolbild" ist hier Teil der Wahrheit. */}
                <p className="mt-1 text-[11px] text-gray-500">Symbolbild · KI-generiert</p>
              </div>
            </PolaroidCard>
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold mb-4">{story.title}</h1>
        <p className="text-brand-orange text-lg mb-1">{story.couple}</p>
        {story.location && <p className="text-foreground/60 mb-8">{story.location}</p>}

        <ArticleBody content={story.content} />
      </div>
    </>
  );
}
