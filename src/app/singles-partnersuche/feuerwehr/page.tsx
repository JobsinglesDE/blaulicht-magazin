import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = {
  title: 'Feuerwehr Dating Schweiz — Singles bei Miliz- & Berufsfeuerwehr',
  description: 'Partnersuche für Feuerwehrleute in der Schweiz. Pikett, Kameradschaft und echte Liebe — finde dein Match bei der Feuerwehr.',
};

const FEUERWEHR_COLORS = [
  { r: 255, g: 100, b: 20 },
  { r: 255, g: 122, b: 0 },
  { r: 233, g: 80, b: 30 },
];

const testimonials = [
  {
    quote: 'Das Schönste war, dass ich nichts erklären musste. Sie kennt den Alltag, den Piepser, die Einsätze. Das verbindet.',
    name: 'Thomas L.',
    role: 'Berufsfeuerwehr Zürich',
  },
  {
    quote: 'Bei der Milizfeuerwehr lernst du Teamgeist. Hier hab ich jemanden gefunden, mit dem ich auch privat ein Team bin.',
    name: 'Patrick S.',
    role: 'Milizfeuerwehr Thun',
  },
  {
    quote: 'Feuerwehrfeste sind lustig — aber für die grosse Liebe brauchst du mehr als ein Bier am Grill. Hier hab ich sie gefunden.',
    name: 'Corinne F.',
    role: 'Betriebsfeuerwehr Basel',
  },
];

const KEY_ARTICLES = [
  {
    title: 'Grillabend & Lagerfeuer — Romantische Date-Ideen',
    excerpt: 'Outdoor-Romantik, Feuerwehrfeste und Abenteuer — kreative Date-Ideen, die zu deinem Feuerwehr-Lifestyle passen.',
    href: '/singles-partnersuche/grillabend-lagerfeuer-date-ideen',
    icon: '🔥',
  },
  {
    title: 'Löschendes Herz — Dein Feuerwehr-Datingprofil',
    excerpt: 'Uniform-Foto oder nicht? So gestaltest du ein authentisches Profil, das wirklich ankommt.',
    href: '/singles-partnersuche/loeschendes-herz-feuerwehr-datingprofil',
    icon: '📱',
  },
  {
    title: 'Partnersuche beim Schweizer Feuerwehrverband',
    excerpt: 'Miliz oder Berufsfeuerwehr? Wie der Verein zur Kontaktbörse wird — und warum Kameradschaft die beste Basis ist.',
    href: '/singles-partnersuche/partnersuche-schweizer-feuerwehrverband',
    icon: '❤️',
  },
];

export default async function FeuerwehrPillar() {
  const articles = await reader.collections.articles.all();
  const feuerwehrArticles = articles.filter(
    (a) => a.entry.type === 'cluster' && a.entry.category === 'feuerwehr',
  );

  return (
    <>
      <PillarHero
        title="Feuerwehr Singles"
        texts={[
          "Feuer Flamme",
          "Löschendes Herz",
          "Held sucht Herz",
          "Feuerwehr Singles",
        ]}
        subtitle="Partnersuche für Feuerwehrleute — Kameradschaft, Pikett und echte Verbindungen."
        colors={FEUERWEHR_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Feuerwehr Dating', href: '/singles-partnersuche/feuerwehr' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8 text-center">
          <p className="text-lg text-foreground/70 leading-relaxed">
            Ob Milizfeuerwehr im Dorf oder Berufsfeuerwehr in der Stadt — der Piepser klingelt,
            wenn er klingelt. Dein Partner muss das verstehen. Bei Blaulichtsingles triffst du
            Menschen, die wissen, was Kameradschaft bedeutet — und die auch in der Liebe
            füreinander einstehen.
          </p>
        </section>
      </ScrollReveal>

      {/* 3 Key Cluster Articles — Asymmetric 2+1 Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-8">Deine Guides für die Partnersuche</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First two: large */}
            {KEY_ARTICLES.slice(0, 2).map((article) => (
              <PillarArticleFeature
                key={article.href}
                title={article.title}
                excerpt={article.excerpt}
                href={article.href}
                icon={<span className="text-2xl">{article.icon}</span>}
                accentColor="#E95014"
              />
            ))}
          </div>
          {/* Third: full width */}
          <div className="mt-6">
            <PillarArticleFeature
              title={KEY_ARTICLES[2].title}
              excerpt={KEY_ARTICLES[2].excerpt}
              href={KEY_ARTICLES[2].href}
              icon={<span className="text-2xl">{KEY_ARTICLES[2].icon}</span>}
              accentColor="#E95014"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <CircularTestimonials items={testimonials} />
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-8 px-6">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-feuerwehr">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* All Feuerwehr Articles */}
      {feuerwehrArticles.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8">Alle Feuerwehr-Artikel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {feuerwehrArticles.map((article) => (
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
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Blaulicht-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Hunderte Feuerwehr-Singles in der Schweiz warten auf dich.
          </p>
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-feuerwehr">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
