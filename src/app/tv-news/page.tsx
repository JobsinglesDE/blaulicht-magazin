import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { SeriesCard } from '@/components/content/SeriesCard';

export const metadata = {
  title: 'TV News',
  description: 'Serien-Artikel zu SRF-Sendungen — Die Assistenzärzte, Tatort Zürich und mehr.',
};

export default async function TVNews() {
  const seriesArticles = await reader.collections.series.all();

  const assistenzaerzte = seriesArticles.filter((s) => s.entry.seriesId === 'assistenzaerzte');
  const tatort = seriesArticles.filter((s) => s.entry.seriesId === 'tatort-zuerich');

  return (
    <>
      <PillarHero
        title="TV News"
        subtitle="Dating-Perspektiven aus beliebten Schweizer TV-Serien."
      />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">Die Assistenzärzte (SRF)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {assistenzaerzte.map((article, i) => (
            <SeriesCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/tv-news/assistenzaerzte/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              seriesLabel="Die Assistenzärzte"
              episodeNumber={i + 1}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Tatort Zürich (SRF)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tatort.map((article, i) => (
            <SeriesCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/tv-news/tatort-zuerich/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              seriesLabel="Tatort Zürich"
              episodeNumber={i + 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
