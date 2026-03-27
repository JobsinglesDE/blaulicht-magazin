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
  title: 'Polizei Dating Schweiz — Singles bei Kapo, Stadtpolizei & Fedpol',
  description: 'Partnersuche für Polizistinnen und Polizisten in der Schweiz. Date-Ideen, Schichtdienst-Tipps und echte Erfolgsgeschichten.',
};

const POLIZEI_COLORS = [
  { r: 30, g: 80, b: 180 },
  { r: 74, g: 144, b: 217 },
  { r: 66, g: 154, b: 69 },
];

const testimonials = [
  {
    quote: 'Nach drei Jahren Schichtdienst dachte ich, das wird nie was mit der Liebe. Dann hab ich mich hier angemeldet — und nach zwei Wochen sass er neben mir im Café.',
    name: 'Nadine K.',
    role: 'Polizistin, Kapo Bern',
  },
  {
    quote: 'Endlich eine Plattform, wo ich nicht erklären muss, warum ich am Freitagabend Dienst habe. Hier versteht das jeder.',
    name: 'Daniel M.',
    role: 'Stadtpolizei Zürich',
  },
  {
    quote: 'Mein Partner ist auch bei der Kapo. Wir haben uns hier gefunden — und verstehen den Alltag des anderen ohne Worte.',
    name: 'Sarah B.',
    role: 'Kapo Aargau',
  },
];

const SECTIONS = [
  {
    title: '🛡️ Einstieg & Datingprofil',
    intro: 'Der erste Schritt zur Partnersuche als Polizistin oder Polizist beginnt mit einem ehrlichen Profil. Uniform zeigen oder nicht? Wieviel vom Berufsalltag preisgeben? Diese Guides helfen dir, die richtigen Entscheidungen zu treffen.',
    slugs: [
      'polizei-datingprofil-uniform-oder-nicht',
      'polizistin-sucht-dating-maennerberuf',
      'partnersuche-polizei',
      'polizei-dating-schweiz',
    ],
  },
  {
    title: '💬 Kennenlernen & Partnersuche',
    intro: 'Wo und wie lernen Polizistinnen und Polizisten in der Schweiz jemanden kennen? Online-Dating, Korps-Events, Sportkurse — die Möglichkeiten sind vielfältiger als gedacht. Hier findest du konkrete Strategien für deinen Alltag.',
    slugs: [
      'polizist-kennenlernen',
      'wo-polizisten-kennenlernen',
      'polizist-sucht-frau',
      'polizistin-sucht-mann',
    ],
  },
  {
    title: '📅 Date-Ideen',
    intro: 'Schichtdienst macht spontane Dates schwierig — aber nicht unmöglich. Die besten Date-Ideen für Polizei-Singles sind flexibel, pikett-kompatibel und brauchen keinen wochenlangen Vorlauf.',
    slugs: [
      'erstes-date-nach-nachtschicht',
      'kreative-date-ideen-polizisten-schweiz',
    ],
  },
];

const SECTIONS_AFTER_CTA = [
  {
    title: '❤️ Beziehung & Alltag',
    intro: '148\'000 Überstunden, Angriffe, Scheidungsgerüchte — der Polizei-Beziehungsalltag hat seine eigenen Herausforderungen. Diese Artikel zeigen, wie Paare damit umgehen und was Studien wirklich sagen.',
    slugs: [
      'angriffe-polizei-partner-angst',
      'ueberstunden-polizei-paare-zeit-finden',
      'scheidungsrate-polizei-mythos-oder-realitaet',
      'liebe-ueber-kantonsgrenzen-polizei',
    ],
  },
  {
    title: '🌟 Besondere Situationen',
    intro: 'Partnersuche nach 50, Neuanfang nach der Scheidung, Beziehung über Kantonshauptorte hinweg — manche Situationen brauchen eigene Strategien.',
    slugs: ['partnersuche-ue50-polizist'],
  },
];

export default async function PolizeiPillar() {
  const articles = await reader.collections.articles.all();

  function getSectionArticles(slugs: string[]) {
    return slugs
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter(Boolean) as typeof articles;
  }

  return (
    <>
      <PillarHero
        title="Polizei Singles"
        texts={[
          'Wer schützt Herz?',
          'Liebe nach Dienst',
          'Kapo Romanze',
          'Polizei Singles',
        ]}
        subtitle="Partnersuche für Polizistinnen und Polizisten — Schichtdienst, Verständnis und echte Verbindungen."
        colors={POLIZEI_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Polizei Dating', href: '/singles-partnersuche/polizei' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Die Schweiz hat rund 18&apos;000 Polizistinnen und Polizisten — verteilt auf Kantonspolizeien,
                Stadtpolizeien und das Fedpol. Was sie verbindet: Schichtdienst, Pikettdienst, ungeplante
                Überstunden und ein Berufsalltag, der sich kaum erklären lässt — erst recht nicht beim
                ersten Date.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Klassische Dating-Apps kennen keine Früh- und Spätschichten. Sie kennen kein «Ich hab
                gerade einen Einsatz, können wir verschieben?» und kein Verständnis dafür, wenn du nach
                einem harten Dienst einfach Stille brauchst. Das Ergebnis: unzählige Erklärungsmarathons,
                halbherzig abgesagte Dates und Partner, die den Job nie wirklich verstehen werden.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Blaulichtsingles ist anders. Hier triffst du Menschen, die deinen Alltag aus eigener
                Erfahrung kennen — oder zumindest respektieren und schätzen, was du täglich leistest.
                Keine Ausreden nötig, kein Grundkurs in Polizeiarbeit. Echte Verbindungen, die halten,
                weil sie auf gegenseitigem Verständnis aufgebaut sind. Meld dich an — dein Match wartet.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-polizei">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Thematic Sections — before middle CTA */}
      {SECTIONS.map((section) => {
        const sectionArticles = getSectionArticles(section.slugs);
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

      {/* Middle CTA */}
      <ScrollReveal>
        <section className="max-w-xl mx-auto px-6 py-10 text-center">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-background rounded-xl p-8 flex flex-col items-center gap-4">
              <p className="text-lg font-semibold">
                Jetzt Polizei-Singles in deiner Region finden
              </p>
              <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-polizei">
                Jetzt kostenlos registrieren
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Thematic Sections — after middle CTA */}
      {SECTIONS_AFTER_CTA.map((section) => {
        const sectionArticles = getSectionArticles(section.slugs);
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
        <section className="max-w-6xl mx-auto px-6 py-8">
          <CircularTestimonials items={testimonials} />
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Blaulicht-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Tausende Polizei-Singles in der Schweiz warten auf dich.
          </p>
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-polizei">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
