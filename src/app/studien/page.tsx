import { reader } from '@/lib/keystatic';
import { ArticleCard } from '@/components/content/ArticleCard';
import { HeartButton } from '@/components/ui/HeartButton';
import { JsonLd, collectionPageJsonLd, SITE_BASE } from '@/components/seo/JsonLd';
import { getArticleUrl } from '@/lib/routes';

export const metadata = {
  alternates: { canonical: '/studien' },
  title: 'Wissenschaft & Liebe — Blaulicht-Studien',
  description:
    'Eigene Reports und Datenauswertungen zu Dating, Partnerschaft und Schichtdienst bei Polizei, Feuerwehr und Rettung in der Schweiz. Belegte Zahlen, transparente Methodik.',
};

export default async function StudienHub() {
  const all = await reader.collections.articles.all();
  const studies = all
    .filter((a) => a.entry.type === 'studie' && a.entry.status === 'published')
    .sort((a, b) => (b.entry.publishedAt || '').localeCompare(a.entry.publishedAt || ''));

  const items = studies.map((s) => ({
    title: s.entry.title,
    excerpt: s.entry.excerpt,
    href: getArticleUrl(s.slug, s.entry.type, s.entry.series),
    image: s.entry.featuredImage || undefined,
    imageAlt: s.entry.featuredImageAlt || undefined,
    category: s.entry.category,
    date: s.entry.publishedAt || undefined,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Wissenschaft & Liebe — Blaulicht-Studien',
          description: 'Reports und Datenauswertungen zu Liebe, Partnerschaft und Schichtdienst bei den Blaulicht-Berufen.',
          url: `${SITE_BASE}/studien`,
          items: items.map((it) => ({ name: it.title, url: `${SITE_BASE}${it.href}` })),
        })}
      />

      <section className="max-w-4xl mx-auto px-6 pt-28 pb-8 text-center">
        <p className="text-xs uppercase tracking-widest font-bold text-brand-orange-text mb-3">
          Wissenschaft &amp; Liebe
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Blaulicht-Studien</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Eigene Reports und Datenauswertungen zu Dating, Partnerschaft und Schichtdienst bei
          Polizei, Feuerwehr und Rettung in der Schweiz — mit belegten Zahlen und transparenter
          Methodik.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((it, i) => (
              <ArticleCard key={it.href} {...it} priority={i === 0} />
            ))}
          </div>
        ) : (
          <p className="text-foreground/50 text-center py-16">
            Bald verfügbar — die ersten Reports sind in Arbeit.
          </p>
        )}
      </section>

      <section className="text-center py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Selbst Teil der Daten werden?</h2>
        <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
          Singles bei Polizei, Feuerwehr und Rettung finden hier zueinander.
        </p>
        <HeartButton href="https://blaulichtsingles.ch/registration/?AID=magazin">
          Jetzt kostenfrei mitmachen
        </HeartButton>
      </section>
    </>
  );
}
