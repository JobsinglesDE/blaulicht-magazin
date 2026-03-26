import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ArticleCard } from '@/components/content/ArticleCard';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

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

export default async function SinglesPartnersuche() {
  const articles = await reader.collections.articles.all();
  const clusterArticles = articles.filter((a) => a.entry.type === 'cluster');

  return (
    <>
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

      {/* 3 Sub-Pillar Links */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8">Wähle deinen Beruf</h2>
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

      {/* All Cluster Articles */}
      {clusterArticles.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8">Alle Artikel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {clusterArticles.map((article) => (
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
