import Link from 'next/link';
import Image from 'next/image';
import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { ArticleCard } from '@/components/content/ArticleCard';
import { SuccessStory } from '@/components/content/SuccessStory';
import { PillarHero } from '@/components/content/PillarHero';
import { HeartButton } from '@/components/ui/HeartButton';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedStats } from '@/components/ui/AnimatedCounter';
import { MatchQuiz } from '@/components/ui/MatchQuiz';

export const metadata = {
  alternates: { canonical: '/' },
};

const rotations: Array<'left' | 'right' | 'slight'> = ['left', 'right', 'slight'];

export default async function HomePage() {
  const allArticles = await reader.collections.articles.all();
  const stories = await reader.collections.stories.all();
  const allSeries = await reader.collections.series.all();

  const byDateDesc = <T extends { entry: { publishedAt?: string | null } }>(a: T, b: T) =>
    (b.entry.publishedAt || '').localeCompare(a.entry.publishedAt || '');

  const articles = allArticles
    .filter((a) => a.entry.status !== 'draft')
    .sort(byDateDesc);

  const seriesSorted = allSeries
    .filter((s) => s.entry.status !== 'draft')
    .sort(byDateDesc);
  const tvNewsBergdoktor = seriesSorted.filter((s) => s.entry.seriesId === 'bergdoktor').slice(0, 2);
  const tvNewsTatort = seriesSorted.filter((s) => s.entry.seriesId === 'tatort-zuerich').slice(0, 1);
  const tvNews = [...tvNewsBergdoktor, ...tvNewsTatort];

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
          <Image
            src="/images/hero-startseite.webp"
            alt="Blaulicht-Singles — Polizei, Feuerwehr, Sanität und Ärzte auf einer Brücke in der Schweiz"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 15%' }}
            sizes="100vw"
            priority
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

      {/* Particle Hero — direkt unter dem Header-Bild */}
      <ScrollReveal>
        <PillarHero
          as="h2"
          title="Blaulichtsingles"
          texts={[
            "Held sucht Herz",
            "Notruf Liebe",
            "Einsatz Herz",
            "Dein Match",
            "Blaulicht Herz",
            "Frei. Verliebt.",
            "Blaulicht Singles",
          ]}
        />
      </ScrollReveal>

      {/* Neueste Artikel — einheitliche ArticleCards (Bild + Text darunter) */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 pt-4 pb-12">
          <h2 className="text-3xl font-bold mb-6">Neueste Artikel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article, i) => (
              <ArticleCard
                key={article.slug}
                title={article.entry.title}
                excerpt={article.entry.excerpt}
                href={getArticleUrl(article.slug, article.entry.type, article.entry.series)}
                image={article.entry.featuredImage || undefined}
                imageAlt={article.entry.featuredImageAlt || undefined}
                category={article.entry.category}
                date={article.entry.publishedAt || undefined}
                priority={i === 0}
              />
            ))}
            {articles.length === 0 && (
              <p className="text-foreground/50 col-span-full text-center py-12">
                Noch keine Artikel. Erstelle welche unter{' '}
                <Link href="/keystatic" className="text-brand-orange underline">/keystatic</Link>
              </p>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <AnimatedStats
            items={[
              { value: 2300, suffix: '+', label: 'Registrierte Singles' },
              { value: 85, suffix: '%', label: 'Blaulicht-Berufe' },
              { value: 127, suffix: '', label: 'Erfolgspaare' },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Erfolgsgeschichten */}
      {stories.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
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
                  imageAlt={story.entry.featuredImageAlt || undefined}
                  rotation={rotations[i % 3]}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* TV News */}
      {tvNews.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">TV News</h2>
              <Link href="/tv-news" className="text-brand-orange hover:underline text-sm font-semibold">
                Alle TV News &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {tvNews.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.entry.title}
                  excerpt={article.entry.excerpt}
                  href={`/tv-news/${article.entry.seriesId}/${article.slug}`}
                  image={article.entry.featuredImage || undefined}
                  imageAlt={article.entry.featuredImageAlt || undefined}
                  category={article.entry.seriesId === 'tatort-zuerich' ? '«Tatort» Zürich' : 'Der Bergdoktor'}
                  date={article.entry.publishedAt || undefined}
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
          <HeartButton href="https://blaulichtsingles.ch/registration/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

    </>
  );
}
