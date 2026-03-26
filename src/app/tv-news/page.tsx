import { reader } from '@/lib/keystatic';
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
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">TV News</h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Dating-Perspektiven aus beliebten Schweizer TV-Serien — Fiktion trifft auf echtes Leben.
          </p>
        </div>
      </section>

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
