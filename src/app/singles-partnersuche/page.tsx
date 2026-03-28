import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ArticleCard } from '@/components/content/ArticleCard';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

export const metadata = {
  title: 'Singles & Partnersuche',
  description: 'Partnersuche für Polizei, Sanität und Rettungskräfte — Tipps, Erfahrungen und Cluster-Artikel.',
};

const PILLARS = [
  {
    title: 'Polizei Dating',
    excerpt: 'Partnersuche für Polizistinnen und Polizisten — Schichtdienst, Kapo-Alltag und echte Verbindungen.',
    href: '/singles-partnersuche/polizei',
    icon: '🛡️',
    color: '#1E50B4',
  },
  {
    title: 'Sanität Dating',
    excerpt: 'Partnersuche für Rettungssanitäter und Notfallmediziner — Pikett-kompatibel und mit Herz.',
    href: '/singles-partnersuche/sanitaet',
    icon: '🚑',
    color: '#DC3232',
  },
  {
    title: 'Feuerwehr Dating',
    excerpt: 'Partnersuche für Feuerwehrleute — Kameradschaft, Pikett und echte Flamme.',
    href: '/singles-partnersuche/feuerwehr',
    icon: '🔥',
    color: '#E95014',
  },
];

const WEITEREBERUFE_SLUGS = [
  'blaulicht-single',
  'einsatzkraefte-dating',
  'pilot-sucht-frau',
  'soldat-sucht-frau',
  'tierarzt-sucht-frau',
];

export default async function SinglesPartnersuche() {
  const articles = await reader.collections.articles.all();

  const weitereBerufe = articles.filter((a) =>
    WEITEREBERUFE_SLUGS.includes(a.slug)
  );

  return (
    <>
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-singles-partnersuche.webp"
            alt="Blaulicht-Singles Partnersuche — Polizei, Feuerwehr, Sanität und Ärzte beim Kaffee in der Schweizer Altstadt"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 5%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">Singles</span> & Partnersuche
          </h1>
        </div>
      </section>

      <PillarHero
        title="Partnersuche"
        texts={[
          "Schicht Liebe",
          "Wer rettet dich?",
          "Dein Match",
          "Herz Zentrale",
          "Liebe Piepser",
          "Partnersuche",
        ]}
        subtitle="Partnersuche für Blaulicht-Berufe — von Polizei bis Sanität. Dein Guide für die Liebe neben dem Dienst."
      />

      {/* Intro — AnimatedGradientBorder */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <AnimatedGradientBorder borderRadius={20} borderWidth={2}>
            <div className="bg-gray-900 rounded-[18px] p-8 text-gray-100">
              <h2 className="text-xl font-bold mb-4 text-white">Dating mit Blaulicht — anders, aber nicht schlechter</h2>
              <p className="leading-relaxed text-gray-300">
                Schichtdienst, Pikettbereitschaft, Nachtschicht am Wochenende — wer in einem Blaulicht-Beruf arbeitet,
                kennt das. Dates, die kurzfristig ausfallen. Abende, die alleine vergehen, weil der Partner oder die
                Partnerin gerade Alarm hat. Für Aussenstehende klingt das nach Stress. Und ja, manchmal ist es das auch.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                Aber es gibt eine andere Seite: Wer in diesem Umfeld aufgewachsen ist oder selbst im Einsatz steht,
                weiss, was Verlässlichkeit bedeutet. Was es heisst, füreinander da zu sein — auch wenn der Alltag
                unberechenbar ist. Genau das verbindet Menschen mit Blaulicht-Hintergrund auf eine Art, die kaum
                ein Dating-App-Algorithmus erklären kann.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                In der Schweiz leben rund 100 000 Menschen, die täglich für Polizei, Feuerwehr oder Sanität
                im Einsatz sind. Viele davon sind Single — nicht weil sie es wollen, sondern weil der Dienst
                kaum Raum lässt, um die richtigen Menschen kennenzulernen. Genau hier setzt Blaulichtsingles.ch an:
                eine Plattform, die versteht, was Pikett-kompatible Partnersuche wirklich bedeutet. Keine
                Kompromisse. Echte Verbindungen — mit Menschen, die denselben Takt leben.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* CTA oben */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* 3 Sub-Pillar Links */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Dein Beruf — deine Community
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Polizei, Feuerwehr oder Sanität — jeder Blaulicht-Beruf hat seine eigene Dating-Welt. Pikett-Realitäten, Schichtmodelle und emotionale Anforderungen unterscheiden sich. Wähle deinen Beruf und entdecke massgeschneiderte Guides für deine Partnersuche.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <PillarArticleFeature
                key={pillar.href}
                title={pillar.title}
                excerpt={pillar.excerpt}
                href={pillar.href}
                icon={<span className="text-2xl">{pillar.icon}</span>}
                accentColor={pillar.color}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Weitere Einsatzberufe */}
      {weitereBerufe.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
              Weitere Einsatzberufe
            </h2>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Piloten, Soldaten, Tierärzte und alle die für andere da sind — Partnersuche in Einsatzberufen hat gemeinsame Herausforderungen, egal welche Uniform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weitereBerufe.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.entry.title}
                  excerpt={article.entry.excerpt}
                  href={`/singles-partnersuche/${article.slug}`}
                  image={article.entry.featuredImage || undefined}
                  category={article.entry.category}
                  date={article.entry.publishedAt || undefined}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* CTA unten */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
