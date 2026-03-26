import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { ArticleCard } from '@/components/content/ArticleCard';
import { SuccessStory } from '@/components/content/SuccessStory';
import { PillarHero } from '@/components/content/PillarHero';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedStats } from '@/components/ui/AnimatedCounter';

const rotations: Array<'left' | 'right' | 'slight'> = ['left', 'right', 'slight'];

const testimonials = [
  {
    quote: 'Nach drei Jahren Schichtdienst dachte ich, das wird nie was mit der Liebe. Dann hab ich mich hier angemeldet — und nach zwei Wochen sass er neben mir im Café.',
    name: 'Nadine K.',
    role: 'Polizistin, Kapo Bern',
  },
  {
    quote: 'Endlich jemand, der versteht, warum ich um 3 Uhr nachts angerufen werde. Hier wissen alle, was Schichtarbeit bedeutet.',
    name: 'Marco R.',
    role: 'Rettungssanitäter, SRK',
  },
  {
    quote: 'Das Schönste war, dass ich nichts erklären musste. Sie kennt den Alltag, den Piepser, die Einsätze. Das verbindet.',
    name: 'Thomas L.',
    role: 'Berufsfeuerwehr Zürich',
  },
];

export default async function HomePage() {
  const articles = await reader.collections.articles.all();
  const stories = await reader.collections.stories.all();

  const carouselItems = articles.slice(0, 8).map((article) => ({
    title: article.entry.title,
    excerpt: article.entry.excerpt,
    href: getArticleUrl(article.slug, article.entry.type, article.entry.series),
    image: article.entry.featuredImage || undefined,
    category: article.entry.category,
  }));

  return (
    <>
      <PillarHero
        title="Blaulichtsingles"
        texts={[
          "Held sucht Herz",
          "Notruf Herzklopfen",
          "Einsatz: Liebe",
          "Dein Match wartet",
          "Blaulicht. Herzlicht.",
          "Dienst. Frei. Verliebt.",
          "Blaulichtsingles",
        ]}
        subtitle="Das Magazin für Singles bei Polizei, Feuerwehr und Sanität"
      />

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

      {/* Testimonials */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6">
          <CircularTestimonials items={testimonials} />
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
    </>
  );
}
