import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { AnimatedStats } from '@/components/ui/AnimatedCounter';
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

const KEY_ARTICLES = [
  {
    title: 'Date-Ideen für gestresste Notfallmediziner',
    excerpt: 'Adrenalin runter, Romantik rauf — entspannte Date-Ideen die perfekt zum Sanitäter-Alltag passen.',
    href: '/singles-partnersuche/date-ideen-notfallmediziner-schweiz',
    icon: '💊',
  },
  {
    title: 'Vom Einsatzort zum ersten Date',
    excerpt: 'Der emotionale Übergang vom Rettungseinsatz zur Romantik — Timing, Empathie und echte Verbindung.',
    href: '/singles-partnersuche/vom-einsatzort-zum-ersten-date',
    icon: '🚑',
  },
  {
    title: 'Partnersuche für Rettungssanitäter HF',
    excerpt: 'Berufsstolz, Pikett-Leben und Online-Profil — so findest du als Rettungssanitäter die grosse Liebe.',
    href: '/singles-partnersuche/partnersuche-rettungssanitaeter-hf',
    icon: '❤️',
  },
];

export default async function SanitaetPillar() {
  const articles = await reader.collections.articles.all();
  const sanitaetArticles = articles.filter(
    (a) => a.entry.type === 'cluster' && a.entry.category === 'sanitaet',
  );

  return (
    <>
      <PillarHero
        title="Sanität Singles"
        texts={[
          "Notruf Liebe",
          "Puls der Liebe",
          "Rettung Herz",
          "Sanität Singles",
        ]}
        subtitle="Partnersuche für Rettungssanitäter, Notärzte und Pflegefachkräfte — weil Helfer auch Liebe verdienen."
        colors={SANITAET_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Sanität Dating', href: '/singles-partnersuche/sanitaet' },
        ]} />
      </div>

      {/* Stats — Rettungs-Metaphern */}
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

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8 text-center">
          <p className="text-lg text-foreground/70 leading-relaxed">
            Einsatz um 3 Uhr nachts, emotional fordernde Situationen, Pikett am Wochenende —
            im Rettungsdienst ist der Alltag alles andere als planbar. Genau deshalb brauchst du
            jemanden, der das versteht. Blaulichtsingles verbindet Menschen, die wissen,
            was es heisst, Leben zu retten — und trotzdem die Liebe nicht aufzugeben.
          </p>
        </section>
      </ScrollReveal>

      {/* 3 Key Cluster Articles — Vertical Timeline Style */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-8">Deine Guides für die Partnersuche</h2>
          <div className="space-y-6 relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#DC3232] via-[#4A90D9] to-[#FF7A00] hidden md:block" />
            {KEY_ARTICLES.map((article, i) => (
              <div key={article.href} className={`md:flex items-start gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:flex w-12 h-12 rounded-full bg-surface border-2 border-[#DC3232] items-center justify-center text-xl shrink-0 z-10">
                  {article.icon}
                </div>
                <div className="flex-1">
                  <PillarArticleFeature
                    title={article.title}
                    excerpt={article.excerpt}
                    href={article.href}
                    icon={<span>{article.icon}</span>}
                    accentColor="#DC3232"
                  />
                </div>
              </div>
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
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin-sanitaet">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* All Sanität Articles */}
      {sanitaetArticles.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8">Alle Sanität-Artikel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sanitaetArticles.map((article) => (
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
