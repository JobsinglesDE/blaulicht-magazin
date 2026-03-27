import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

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

const SECTIONS = [
  {
    title: '🔥 Einstieg & Datingprofil',
    intro: 'Feuerwehr-Dating beginnt mit einem authentischen Profil. Ob Miliz oder Beruf, Frau oder Mann — diese Guides zeigen, wie du dich online wirkungsvoll präsentierst und die richtigen Menschen anziehst.',
    slugs: [
      'loeschendes-herz-feuerwehr-datingprofil',
      'feuerwehrfrau-sucht-neue-generation',
      'feuerwehr-partnersuche-schweiz',
    ],
  },
  {
    title: '💬 Kennenlernen',
    intro: 'Feuerwehrfrauen und Feuerwehrmänner auf Partnersuche haben konkrete Fragen: Wo kennenlernen? Wie ansprechen? Was darf ich erwarten? Hier gibt es Antworten aus der Praxis.',
    slugs: [
      'feuerwehrfrau-sucht-mann',
      'feuerwehrmann-sucht-frau',
    ],
  },
  {
    title: '📅 Date-Ideen',
    intro: 'Grillabend nach der Übung, Lagerfeuer am See, spontanes Treffen nach dem Alarm — die besten Feuerwehr-Dates sind unkompliziert und pikett-tauglich.',
    slugs: [
      'grillabend-lagerfeuer-date-ideen',
      'erstes-date-feuerwehrmann-piepser',
    ],
  },
  {
    title: '❤️ Beziehung & Herausforderungen',
    intro: 'Wenn der Piepser das Date unterbricht. Wenn der Einsatz Spuren hinterlässt. Wenn Kameradschaft und Liebe sich mischen — diese Artikel behandeln die echten Herausforderungen in Feuerwehr-Beziehungen.',
    slugs: [
      'nach-dem-brand-einsatz-beziehung-belastet',
      'kameradschaft-liebe-dating-feuerwehrverein',
      'miliz-beruf-feuerwehr-dating-realitaeten',
      'piepser-feuerwehr-date-unterbricht',
    ],
  },
  {
    title: '🌟 Besondere Situationen',
    intro: 'Partnersuche bei der Feuerwehr nach 50 hat seinen eigenen Rhythmus. Erfahrung, Gelassenheit und echte Prioritäten — ein Neuanfang der sich lohnt.',
    slugs: ['partnersuche-ue50-feuerwehr'],
  },
];

export default async function FeuerwehrPillar() {
  const articles = await reader.collections.articles.all();

  const getArticlesBySlug = (slugs: string[]) =>
    slugs
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter(Boolean) as (typeof articles)[number][];

  const midIndex = Math.floor(SECTIONS.length / 2); // after section index 1 (Date-Ideen = index 2)

  return (
    <>
      <PillarHero
        title="Feuerwehr Singles"
        texts={[
          'Feuer Flamme',
          'Löschendes Herz',
          'Held sucht Herz',
          'Feuerwehr Singles',
        ]}
        subtitle="Partnersuche für Feuerwehrleute — Kameradschaft, Pikett und echte Verbindungen."
        colors={FEUERWEHR_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
            { label: 'Feuerwehr Dating', href: '/singles-partnersuche/feuerwehr' },
          ]}
        />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-10">
          <AnimatedGradientBorder
            gradientColors={['#FF7A00', '#E95014', '#FF4500', '#FF7A00']}
            borderRadius={20}
            borderWidth={2}
          >
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed mb-4">
                In der Schweiz leisten rund <strong>80 Prozent der Feuerwehrangehörigen</strong> ihren
                Dienst als Miliz — sie haben einen Zivilberuf, und trotzdem klingelt der Piepser, wenn er
                klingelt. Mitten im Date, mitten in der Nacht, mitten im Urlaub. Das ist die Realität.
                Berufsfeuerwehrleute kennen das auch: Pikett, Schichtdienst, unplanbare Einsätze.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Was auf den ersten Blick wie eine Erschwernis wirkt, ist eigentlich ein Vorteil — wenn
                man den richtigen Partner findet. Denn wer zusammen löscht, kennt den echten Charakter.
                Kameradschaft ist kein Marketingbegriff, sie ist gelebter Alltag. Man sieht, wie jemand
                unter Druck funktioniert, Verantwortung übernimmt, für andere einsteht.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Das Problem: Außerhalb der Wehr verstehen viele nicht, warum ein Feierabendbier plötzlich
                abbricht oder ein Wochenendausflug spontan umgeplant wird. Ein Partner, der den
                Feuerwehr-Alltag kennt — oder zumindest versteht — macht den Unterschied.
              </p>
              <p className="text-base leading-relaxed">
                Genau dafür gibt es Blaulichtsingles. Hier triffst du Menschen, die wissen, was Kameradschaft
                bedeutet, was Pikett heisst — und die auch in der Liebe füreinander einstehen. Miliz oder
                Berufsfeuerwehr, Feuerwehrfrau oder Feuerwehrmann: Hier bist du richtig.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* CTA oben */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-feuerwehr">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Thematische Sektionen — erste Hälfte (bis inkl. Date-Ideen) */}
      {SECTIONS.slice(0, midIndex + 1).map((section) => {
        const sectionArticles = getArticlesBySlug(section.slugs);
        if (sectionArticles.length === 0) return null;
        return (
          <ScrollReveal key={section.title}>
            <section className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-foreground/70 mb-8 leading-relaxed">{section.intro}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionArticles.map((article) => (
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
        );
      })}

      {/* CTA mitte */}
      <ScrollReveal>
        <section className="max-w-xl mx-auto px-6 py-10">
          <AnimatedGradientBorder
            gradientColors={['#FF7A00', '#E95014', '#FF4500', '#FF7A00']}
            borderRadius={20}
            borderWidth={2}
          >
            <div className="bg-surface-dark rounded-xl p-8 text-center">
              <p className="text-white/90 text-lg font-semibold mb-6">
                Feuerwehr-Singles in deiner Region
              </p>
              <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-feuerwehr">
                Jetzt Match finden
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Thematische Sektionen — zweite Hälfte */}
      {SECTIONS.slice(midIndex + 1).map((section) => {
        const sectionArticles = getArticlesBySlug(section.slugs);
        if (sectionArticles.length === 0) return null;
        return (
          <ScrollReveal key={section.title}>
            <section className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-foreground/70 mb-8 leading-relaxed">{section.intro}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionArticles.map((article) => (
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
        );
      })}

      {/* Testimonials */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-10">
          <CircularTestimonials items={testimonials} />
        </section>
      </ScrollReveal>

      {/* CTA unten */}
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
