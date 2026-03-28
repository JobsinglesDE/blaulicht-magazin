import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { ArticleCard } from '@/components/content/ArticleCard';
import { SuccessStory } from '@/components/content/SuccessStory';
import { HeartButton } from '@/components/ui/HeartButton';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedStats } from '@/components/ui/AnimatedCounter';
import { MatchQuiz } from '@/components/ui/MatchQuiz';

const rotations: Array<'left' | 'right' | 'slight'> = ['left', 'right', 'slight'];

export default async function HomePage() {
  const allArticles = await reader.collections.articles.all();
  const stories = await reader.collections.stories.all();
  const articles = allArticles.filter((a) => a.entry.status !== 'draft');

  const carouselItems = articles.slice(0, 8).map((article) => ({
    title: article.entry.title,
    excerpt: article.entry.excerpt,
    href: getArticleUrl(article.slug, article.entry.type, article.entry.series),
    image: article.entry.featuredImage || undefined,
    category: article.entry.category,
  }));

  return (
    <>
      <section className="relative overflow-hidden min-h-[420px] md:min-h-[560px]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-startseite.webp"
            alt="Blaulicht-Singles — Polizei, Feuerwehr, Sanität und Ärzte auf einer Brücke in der Schweiz"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 15%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[420px] md:min-h-[560px] pb-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            Blaulicht<span className="text-brand-orange">singles</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Das Magazin für Singles bei Polizei, Feuerwehr und Sanität
          </p>
        </div>
      </section>

      {/* Neueste Artikel — Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">Neueste Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
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
      </ScrollReveal>

      {/* Erfolgsgeschichten */}
      {stories.length > 0 && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      {/* Weitere Artikel — Carousel */}
      {carouselItems.length > 3 && (
        <ScrollReveal>
          <CarouselCards title="Mehr entdecken" items={carouselItems.slice(3)} />
        </ScrollReveal>
      )}

      {/* Stats */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-16">
          <AnimatedStats
            items={[
              { value: 2300, suffix: '+', label: 'Registrierte Singles' },
              { value: 85, suffix: '%', label: 'Blaulicht-Berufe' },
              { value: 127, suffix: '', label: 'Erfolgspaare' },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Quiz */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Finde deinen Match-Typ</h2>
          <p className="text-foreground/60 mb-8 text-center">3 Fragen — und du weisst, wer zu dir passt.</p>
          <MatchQuiz />
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bereit für die Partnersuche?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Tausende Blaulicht-Singles warten auf dich.
          </p>
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

    </>
  );
}
