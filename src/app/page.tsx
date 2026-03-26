import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { ArticleCard } from '@/components/content/ArticleCard';
import { SuccessStory } from '@/components/content/SuccessStory';
import { PillarHero } from '@/components/content/PillarHero';
import { HeartButton } from '@/components/ui/HeartButton';

const rotations: Array<'left' | 'right' | 'slight'> = ['left', 'right', 'slight'];

export default async function HomePage() {
  const articles = await reader.collections.articles.all();
  const stories = await reader.collections.stories.all();

  return (
    <>
      <PillarHero
        title="Dein Herz kennt keinen Dienstplan"
        subtitle="Das Magazin für Singles bei Polizei, Feuerwehr und Sanität"
      />

      {/* Neueste Artikel */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Neueste Artikel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 6).map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={getArticleUrl(article.slug, article.entry.type, article.entry.series)}
              image={article.entry.featuredImage || undefined}
              category={article.entry.category}
              date={article.entry.publishedAt || undefined}
            />
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
      {stories.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">Erfolgsgeschichten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {stories.slice(0, 3).map((story, i) => (
              <SuccessStory
                key={story.slug}
                title={story.entry.title}
                couple={story.entry.couple}
                location={story.entry.location}
                excerpt={story.entry.excerpt}
                href={`/erfolgsgeschichten/${story.slug}`}
                image={story.entry.featuredImage || undefined}
                rotation={rotations[i % 3]}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Bereit für die Partnersuche?</h2>
        <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
          Tausende Blaulicht-Singles warten auf dich.
        </p>
        <HeartButton href="https://blaulichtsingles.ch/registrieren">
          Jetzt kostenlos anmelden
        </HeartButton>
      </section>
    </>
  );
}
