import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';

export default async function HomePage() {
  const articles = await reader.collections.articles.all();
  const stories = await reader.collections.stories.all();

  return (
    <div data-theme="light">
      {/* Hero */}
      <section className="relative h-[70vh] bg-primary flex items-center justify-center">
        <div className="text-center text-on-primary px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Blaulicht Magazin
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Das Magazin für Singles bei Polizei, Feuerwehr und Sanität
          </p>
        </div>
      </section>

      {/* Neueste Artikel */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Neueste Artikel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <a key={article.slug} href={getArticleUrl(article.slug, article.entry.type, article.entry.series)} className="block rounded-lg overflow-hidden bg-surface shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">{article.entry.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-2">{article.entry.title}</h3>
                <p className="text-foreground/70">{article.entry.excerpt}</p>
              </div>
            </a>
          ))}
          {articles.length === 0 && (
            <p className="text-foreground/50 col-span-3 text-center py-12">
              Noch keine Artikel. Erstelle welche unter{' '}
              <a href="/keystatic" className="text-brand-orange underline">/keystatic</a>
            </p>
          )}
        </div>
      </section>

      {/* Erfolgsgeschichten */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Erfolgsgeschichten</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.slice(0, 3).map((story) => (
            <article key={story.slug} className="bg-surface rounded-lg p-6 shadow-lg rotate-[-1deg] hover:rotate-0 transition-transform">
              <h3 className="text-lg font-semibold">{story.entry.title}</h3>
              <p className="text-sm text-foreground/60 mt-1">{story.entry.couple} — {story.entry.location}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
