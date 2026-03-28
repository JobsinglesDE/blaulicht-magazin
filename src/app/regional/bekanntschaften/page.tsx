import { reader } from '@/lib/keystatic';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  title: 'Bekanntschaften in der Schweiz — Blaulicht-Singles finden',
  description: 'Bekanntschaften für Polizei, Feuerwehr & Sanität in Schweizer Grossstädten. Finde Blaulicht-Singles in Zürich, Bern, Basel, Luzern und mehr.',
};

export default async function BekanntschaftenPillar() {
  const allBekanntschaften = await reader.collections.bekanntschaften.all();
  const articles = allBekanntschaften.sort((a, b) =>
    (a.entry.city || '').localeCompare(b.entry.city || '')
  );

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bekanntschaften.webp"
            alt="Blaulicht-Singles treffen sich in einer Schweizer Stadt"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            Bekanntschaften in der <span className="text-brand-orange">Schweiz</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Blaulicht-Singles kennenlernen — in deiner Stadt, mit Menschen die deinen Alltag verstehen.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: 'Bekanntschaften', href: '/regional/bekanntschaften' },
        ]} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/regional/bekanntschaften/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              category={article.entry.city || 'Schweiz'}
              date={article.entry.publishedAt || undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
