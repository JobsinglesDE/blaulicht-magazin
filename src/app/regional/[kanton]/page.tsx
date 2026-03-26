import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export async function generateStaticParams() {
  const all = await reader.collections.regional.all();
  const kantons = new Set(all.map((r) => r.entry.kanton.toLowerCase().replace(/\s+/g, '-')));
  return Array.from(kantons).map((kanton) => ({ kanton }));
}

export default async function KantonPage({ params }: { params: Promise<{ kanton: string }> }) {
  const { kanton } = await params;
  const allRegional = await reader.collections.regional.all();
  const entries = allRegional.filter(
    (r) => r.entry.kanton.toLowerCase().replace(/\s+/g, '-') === kanton
  );

  const kantonName = entries[0]?.entry.kanton || kanton;

  return (
    <>
      <PillarHero
        title={`Kanton ${kantonName}`}
        subtitle={`Blaulicht-Singles im Kanton ${kantonName}.`}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: kantonName, href: `/regional/${kanton}` },
        ]} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {entries.map((entry) => (
            <ArticleCard
              key={entry.slug}
              title={entry.entry.title}
              excerpt={entry.entry.excerpt}
              href={`/regional/${kanton}/${entry.slug}`}
              image={entry.entry.featuredImage || undefined}
              category={entry.entry.city || kantonName}
              date={entry.entry.publishedAt || undefined}
            />
          ))}
        </div>
      </div>
    </>
  );
}
