import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Metadata } from 'next';

const BASE_URL = 'https://blaulichtsingles.ch/magazin';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await reader.singletons.regionalFeuerwehr.read();
  const title = cms?.seoTitle || 'Singles Feuerwehr Schweiz — Alle Kantone';
  const description = cms?.seoDescription || 'Feuerwehr Singles & Bekanntschaften in allen Schweizer Kantonen.';
  return {
    title, description,
    alternates: { canonical: `${BASE_URL}/regional/feuerwehr` },
    openGraph: { title, description, url: `${BASE_URL}/regional/feuerwehr`, type: 'website', siteName: 'Blaulicht Magazin', locale: 'de_CH', images: [{ url: `${BASE_URL}/logos/jobsingles-logo.png`, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE_URL}/logos/jobsingles-logo.png`] },
  };
}

function toAnchor(kanton: string) {
  return kanton.toLowerCase().replace(/[\s-]+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
}

export default async function FeuerwehrRegional() {
  const [cms, all] = await Promise.all([
    reader.singletons.regionalFeuerwehr.read(),
    reader.collections.regional.all(),
  ]);

  const entries = all
    .filter((r) => r.entry.beruf === 'feuerwehr')
    .sort((a, b) => a.entry.kanton.localeCompare(b.entry.kanton, 'de-CH'));

  const byKanton = new Map<string, typeof entries>();
  for (const entry of entries) {
    const k = entry.entry.kanton;
    if (!byKanton.has(k)) byKanton.set(k, []);
    byKanton.get(k)!.push(entry);
  }

  const kantone = Array.from(byKanton.keys());

  return (
    <>
      <PillarHero
        title="Singles Feuerwehr"
        texts={['Berufsfeuerwehr', 'Milizfeuerwehr', 'Blaulicht', 'Feuerwehr Singles', 'Dein Kanton']}
        subtitle="Feuerwehr Singles & Partnersuche in allen Schweizer Kantonen — finde jemanden, der deinen Alltag kennt."
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: 'Feuerwehr', href: '/regional/feuerwehr' },
        ]} />

        {/* SEO Intro */}
        <div className="mb-12 mt-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Singles Feuerwehr Schweiz</h1>
          <p className="text-foreground/70 leading-relaxed mb-3">
            {cms?.intro1 || 'Ob Berufsfeuerwehr oder Milizfeuerwehr — der Korpsgeist verbindet.'}
          </p>
          <p className="text-foreground/70 leading-relaxed">
            {cms?.intro2 || `${kantone.length} Kantone abgedeckt. Spring direkt zu deiner Region oder scrolle durch alle Kantone.`}
          </p>
        </div>

        {/* Kanton Quick-Nav */}
        {kantone.length > 0 && (
          <nav className="mb-12" aria-label="Kantone Navigation">
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3 font-semibold">Direkt zum Kanton</p>
            <div className="flex flex-wrap gap-2">
              {kantone.map((kanton) => (
                <a
                  key={kanton}
                  href={`#${toAnchor(kanton)}`}
                  className="px-3 py-1.5 text-sm rounded-full bg-surface-dark border border-brand-orange/20 hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  {kanton}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Kanton Sections */}
        {Array.from(byKanton.entries()).map(([kanton, kantonsEntries]) => (
          <ScrollReveal key={kanton}>
            <div className="mb-14" id={toAnchor(kanton)}>
              <h2 className="text-xl font-bold mb-4 border-b border-brand-orange/30 pb-2 scroll-mt-24">
                Feuerwehr Singles {kanton}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kantonsEntries.map((entry) => (
                  <ArticleCard
                    key={entry.slug}
                    title={entry.entry.title}
                    excerpt={entry.entry.excerpt}
                    href={`/regional/${toAnchor(entry.entry.kanton)}/${entry.slug}`}
                    image={entry.entry.featuredImage || undefined}
                    category={entry.entry.city || kanton}
                    date={entry.entry.publishedAt || undefined}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}

        {entries.length === 0 && (
          <p className="text-foreground/50 text-center py-12">Noch keine Artikel. Bald verfügbar.</p>
        )}
      </div>
    </>
  );
}
