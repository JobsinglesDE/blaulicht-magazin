import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { AnimatedStats } from '@/components/ui/AnimatedCounter';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = {
  title: 'Sanität Dating Schweiz — Singles bei SRK, Rettungsdienst & Spital',
  description: 'Partnersuche für Rettungssanitäter, Notfallmediziner und Pflegefachkräfte. Wer versteht Pikett-Leben besser als jemand vom Fach?',
};

const SANITAET_COLORS = [
  { r: 220, g: 50, b: 50 },
  { r: 74, g: 144, b: 217 },
  { r: 255, g: 122, b: 0 },
];

const testimonials = [
  {
    quote: 'Im Rettungsdienst lernst du, für andere da zu sein. Hier hab ich jemanden gefunden, der für mich da ist.',
    name: 'Marco R.',
    role: 'Rettungssanitäter, SRK',
  },
  {
    quote: 'Pikett, Nachtdienst, emotionale Einsätze — mein Partner versteht das alles, weil er selbst im Spital arbeitet.',
    name: 'Lisa W.',
    role: 'Notfallpflegerin, Inselspital Bern',
  },
  {
    quote: 'Nach einem harten Einsatz brauchst du jemanden, der nicht fragt, sondern einfach da ist. Das hab ich hier gefunden.',
    name: 'Jonas H.',
    role: 'Notarzt, Schutz & Rettung Zürich',
  },
];

const SECTIONS = [
  {
    title: '🚑 Einstieg & Profil',
    intro: 'Rettungssanitäter HF, Notfallmediziner, Pflegefachpersonen — der erste Schritt zur Partnersuche ist ein Profil, das ehrlich zeigt wer du bist. Diese Guides helfen dir beim Einstieg ins Dating trotz anspruchsvollem Berufsalltag.',
    slugs: [
      'partnersuche-rettungssanitaeter-hf',
      'retterinnen-partnersuche-frauenanteil',
      'partnersuche-fuer-aerzte',
      'partnersuche-mediziner',
    ],
  },
  {
    title: '📅 Date-Ideen & Alltag',
    intro: 'Pikett, Nachtschicht, emotionale Erschöpfung nach dem Einsatz — trotzdem ein erstes Date hinbekommen? Diese Artikel zeigen konkret wie es funktioniert, mit realistischen Erwartungen und praktischen Tipps.',
    slugs: [
      'date-ideen-notfallmediziner-schweiz',
      'pikett-nachtschicht-dating-rettungsdienst',
      'vom-einsatzort-zum-ersten-date',
    ],
  },
  {
    title: '🩺 Ärzte & Medizin',
    intro: 'Ärztinnen und Ärzte auf Partnersuche stehen vor eigenen Herausforderungen: lange Ausbildung, Hierarchie im Spital, wenig Zeit. Diese Guides sind speziell für den medizinischen Berufsalltag in der Schweiz geschrieben.',
    slugs: [
      'aerztin-single',
      'aerztin-sucht-mann',
      'arzt-dating',
      'arzt-sucht-frau',
    ],
  },
];

const SECTIONS_AFTER_CTA = [
  {
    title: '💊 Pflege & Rettung',
    intro: 'Krankenpflegerinnen, Rettungssanitäter, Sanitäterinnen — Menschen in Pflegeberufen suchen Partner die Schichtarbeit, Überstunden und emotionale Belastung wirklich verstehen. Hier findest du Gleichgesinnte.',
    slugs: [
      'krankenpfleger-sucht-frau',
      'krankenschwester-single',
      'krankenschwester-sucht-mann',
      'rettungssanitaeter-sucht-frau',
      'sanitaeter-sucht-partnerin',
    ],
  },
  {
    title: '❤️ Beziehung & Belastung',
    intro: 'PTBS, emotionaler Rückzug nach belastenden Einsätzen, Alleinerziehen im Schichtdienst — diese Artikel sprechen über das was andere verschweigen. Ehrlich, fundiert, mit echten Handlungsoptionen.',
    slugs: [
      'ptbs-rettungsdienst-beziehung',
      'alleinerziehend-schichtdienst-sanitaeterin',
    ],
  },
  {
    title: '🌟 Besondere Situationen',
    intro: 'Berufswechsel nach 7,5 Jahren, Neuanfang nach 50, Leben nach dem Rettungsdienst — manche Kapitel im Leben brauchen eine neue Perspektive auf Partnerschaft.',
    slugs: [
      'partnersuche-ue50-rettungsdienst',
      'rettungssanitaeter-berufsausstieg-liebe',
    ],
  },
];

export default async function SanitaetPillar() {
  const articles = await reader.collections.articles.all();

  const bySlug = Object.fromEntries(
    articles.map((a) => [a.slug, a]),
  );

  function renderSection(section: { title: string; intro?: string; slugs: string[] }) {
    const sectionArticles = section.slugs
      .map((slug) => bySlug[slug])
      .filter(Boolean);

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
  }

  return (
    <>
      {/* 1. PillarHero */}
      <PillarHero
        title="Sanität Singles"
        texts={[
          'Notruf Liebe',
          'Puls der Liebe',
          'Rettung Herz',
          'Sanität Singles',
        ]}
        subtitle="Partnersuche für Rettungssanitäter, Notärzte und Pflegefachkräfte — weil Helfer auch Liebe verdienen."
        colors={SANITAET_COLORS}
      />

      {/* 2. Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Sanität Dating', href: '/singles-partnersuche/sanitaet' },
        ]} />
      </div>

      {/* 3. Intro in AnimatedGradientBorder */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <AnimatedGradientBorder
            gradientColors={['#DC3232', '#4A90D9', '#FF7A00', '#DC3232']}
            borderRadius={20}
            borderWidth={2}
          >
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Rettungssanitäter HF, Ärzte, Pflegefachpersonen — der Sanitätsdienst ist weiblich geprägt
                wie kaum ein anderer Blaulicht-Beruf: 59,5 % der Beschäftigten im Rettungsdienst sind Frauen.
                Doch egal ob Mann oder Frau — Pikett, 12-Stunden-Schichten und die emotionale Last nach
                schwierigen Einsätzen prägen jeden Tag. Wer nach Feierabend erzählt, was er wirklich erlebt
                hat, braucht jemanden, der nicht wegschaut.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Genau das verändert alles: ein Partner, der Schichtarbeit nicht nur toleriert, sondern
                wirklich versteht. Der weiss, warum du um 3 Uhr nachts schweigend auf dem Sofa sitzt.
                Der Pikett kennt — weil er selbst pikett hat. Auf Blaulichtsingles brauchst du nichts
                erklären. Kein Rechtfertigen, kein Entschuldigen für verpasste Abende. Hier ist Pikett
                kein Fremdwort, sondern gemeinsame Sprache. Der Rettungsdienst rettet Leben — und
                manchmal auch das eigene Liebesglück.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* 4. CTA oben */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-sanitaet">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* 5. Thematische Sektionen (oben) */}
      {SECTIONS.map(renderSection)}

      {/* 6. CTA Mitte */}
      <ScrollReveal>
        <section className="max-w-2xl mx-auto px-6 py-10">
          <AnimatedGradientBorder
            gradientColors={['#DC3232', '#4A90D9', '#FF7A00', '#DC3232']}
            borderRadius={20}
            borderWidth={2}
          >
            <div className="bg-surface-dark rounded-xl p-8 text-center">
              <p className="text-white/80 mb-6 text-base">
                Hunderte Sanitäts-Singles in der Schweiz sind bereits dabei — mach jetzt mit.
              </p>
              <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-sanitaet">
                Jetzt Sanitäts-Singles kennenlernen
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Thematische Sektionen (unten) */}
      {SECTIONS_AFTER_CTA.map(renderSection)}

      {/* 7. AnimatedStats */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <AnimatedStats
            items={[
              { value: 890, suffix: '+', label: 'Sanitäter-Singles' },
              { value: 24, suffix: '/7', label: 'Pikett-kompatibel' },
              { value: 47, suffix: '', label: 'Erfolgspaare' },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* 8. CircularTestimonials */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <CircularTestimonials items={testimonials} />
        </section>
      </ScrollReveal>

      {/* 9. CTA unten */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Blaulicht-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Hunderte Sanitäter-Singles in der Schweiz warten auf dich.
          </p>
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-sanitaet">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
