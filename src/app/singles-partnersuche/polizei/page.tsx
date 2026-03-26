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

const KEY_ARTICLES = [
  {
    title: 'Kreative Date-Ideen für Polizisten in der Schweiz',
    excerpt: 'Schichtdienst und Liebe? So planst du unvergessliche Dates rund um deinen Dienstplan — von Outdoor-Abenteuern bis Feierabend-Cafés.',
    href: '/singles-partnersuche/kreative-date-ideen-polizisten-schweiz',
    icon: '💡',
  },
  {
    title: 'Erstes Date nach der Nachtschicht',
    excerpt: 'Müde aber verliebt? Was wirklich funktioniert, wenn du nach der Nachtschicht dein erstes Date hast.',
    href: '/singles-partnersuche/erstes-date-nach-nachtschicht',
    icon: '🌙',
  },
  {
    title: 'Partnersuche Ü50 als Polizist',
    excerpt: 'Die zweite Liebe im Dienst — warum es nach 50 oft einfacher ist und wie du den Neuanfang wagst.',
    href: '/singles-partnersuche/partnersuche-ue50-polizist',
    icon: '❤️',
  },
];

export default async function PolizeiPillar() {
  const articles = await reader.collections.articles.all();
  const polizeiArticles = articles.filter(
    (a) => a.entry.type === 'cluster' && a.entry.category === 'polizei',
  );

  return (
    <>
      <PillarHero
        title="Polizei Singles"
        texts={[
          "Wer schützt Herz?",
          "Liebe nach Dienst",
          "Kapo Romanze",
          "Polizei Singles",
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
        <section className="max-w-3xl mx-auto px-6 py-8 text-center">
          <p className="text-lg text-foreground/70 leading-relaxed">
            Schichtarbeit, Einsätze, Pikett — als Polizistin oder Polizist in der Schweiz weisst du,
            wie schwer es ist, jemanden zu finden, der deinen Alltag versteht. Genau dafür sind wir da.
            Blaulichtsingles bringt Menschen zusammen, die wissen, was es heisst, für andere da zu sein.
          </p>
        </section>
      </ScrollReveal>

      {/* 3 Key Cluster Articles — Big Feature Cards */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-8">Deine Guides für die Partnersuche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KEY_ARTICLES.map((article) => (
              <PillarArticleFeature
                key={article.href}
                title={article.title}
                excerpt={article.excerpt}
                href={article.href}
                icon={<span>{article.icon}</span>}
                accentColor="#1E50B4"
              />
            ))}
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
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-polizei">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* All Polizei Articles */}
      {polizeiArticles.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8">Alle Polizei-Artikel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {polizeiArticles.map((article) => (
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
