import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { RegionalProgress } from '@/components/ui/RegionalProgress';

export const metadata = {
  title: 'Regional',
  description: 'Blaulicht-Dating in deinem Kanton — regionale Tipps und lokale Singles.',
};

export default async function Regional() {
  const allRegional = await reader.collections.regional.all();

  const kantons = new Map<string, typeof allRegional>();
  for (const entry of allRegional) {
    const k = entry.entry.kanton;
    if (!kantons.has(k)) kantons.set(k, []);
    kantons.get(k)!.push(entry);
  }

  return (
    <>
      <PillarHero
        title="Regional"
        subtitle="Blaulicht-Singles in deinem Kanton finden."
      />

      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Kanton overview */}
        {kantons.size > 0 && (
          <div className="max-w-md mb-16">
            {Array.from(kantons.entries()).map(([kanton, entries]) => (
              <RegionalProgress
                key={kanton}
                label={kanton}
                value={entries.length}
                max={Math.max(...Array.from(kantons.values()).map((e) => e.length))}
              />
            ))}
          </div>
        )}

        {Array.from(kantons.entries()).map(([kanton, entries]) => (
          <div key={kanton} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{kanton}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {entries.map((entry) => (
                <ArticleCard
                  key={entry.slug}
                  title={entry.entry.title}
                  excerpt={entry.entry.excerpt}
                  href={`/regional/${entry.entry.kanton.toLowerCase().replace(/\s+/g, '-')}/${entry.slug}`}
                  image={entry.entry.featuredImage || undefined}
                  category={entry.entry.city || entry.entry.kanton}
                  date={entry.entry.publishedAt || undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
