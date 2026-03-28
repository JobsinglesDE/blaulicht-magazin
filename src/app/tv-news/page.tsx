import { reader } from '@/lib/keystatic';
import { SeriesCard } from '@/components/content/SeriesCard';

export const metadata = {
  title: 'TV News',
  description: 'Das echte Leben der TV-Stars — Tatort Zürich, Der Bergdoktor und mehr. Was die Darsteller privat machen.',
};

export default async function TVNews() {
  const seriesArticles = await reader.collections.series.all();
  const published = seriesArticles.filter((s) => s.entry.status !== 'draft');

  const bergdoktor = published.filter((s) => s.entry.seriesId === 'bergdoktor');
  const tatort = published.filter((s) => s.entry.seriesId === 'tatort-zuerich');

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">TV News</h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Das echte Leben der TV-Stars — was die Darsteller aus «Tatort» Zürich und «Der Bergdoktor» privat machen.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">«Tatort» Zürich</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        <h2 className="text-2xl font-bold mb-6">Der Bergdoktor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bergdoktor.map((article, i) => (
            <SeriesCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/tv-news/bergdoktor/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              seriesLabel="Der Bergdoktor"
              episodeNumber={i + 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
