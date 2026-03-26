import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  title: 'Singles & Partnersuche',
  description: 'Partnersuche für Polizei, Sanität und Rettungskräfte — Tipps, Erfahrungen und Cluster-Artikel.',
};

export default async function SinglesPartnersuche() {
  const articles = await reader.collections.articles.all();
  const clusterArticles = articles.filter((a) => a.entry.type === 'cluster');

  return (
    <>
      <PillarHero
        title="Partnersuche"
        texts={[
          "Schicht. Schluss. Liebe.",
          "Wer rettet dich?",
          "Dein Blaulicht-Match",
          "Herz an Zentrale",
          "Liebe trotz Piepser",
          "Partnersuche",
        ]}
        subtitle="Partnersuche für Blaulicht-Berufe — von Polizei bis Sanität. Dein Guide für die Liebe neben dem Dienst."
      />

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-16">
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
