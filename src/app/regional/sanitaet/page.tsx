import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Metadata } from 'next';

const BASE_URL = 'https://blaulichtsingles.ch/magazin';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await reader.singletons.regionalSanitaet.read();
  const title = cms?.seoTitle || 'Singles Sanität Schweiz — Alle Kantone';
  const description = cms?.seoDescription || 'Sanität Singles & Bekanntschaften in allen Schweizer Kantonen.';
  return {
    title, description,
    alternates: { canonical: `${BASE_URL}/regional/sanitaet` },
    openGraph: { title, description, url: `${BASE_URL}/regional/sanitaet`, type: 'website', siteName: 'Blaulicht Magazin', locale: 'de_CH', images: [{ url: `${BASE_URL}/logos/jobsingles-logo.png`, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE_URL}/logos/jobsingles-logo.png`] },
  };
}

function toAnchor(kanton: string) {
  return kanton.toLowerCase().replace(/[\s-]+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
}

export default async function SanitaetRegional() {
  const [cms, all] = await Promise.all([
    reader.singletons.regionalSanitaet.read(),
    reader.collections.regional.all(),
  ]);

  const entries = all
    .filter((r) => r.entry.beruf === 'sanitaet')
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
        title="Singles Sanität"
        texts={['Rettungsdienst', 'Sanitäter', 'Blaulicht', 'Sanität Singles', 'Dein Kanton']}
        subtitle="Sanität Singles & Partnersuche in allen Schweizer Kantonen — finde jemanden, der deinen Alltag kennt."
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: 'Sanität', href: '/regional/sanitaet' },
        ]} />

        {/* SEO Intro */}
        <div className="mb-12 mt-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Singles Sanität Schweiz</h1>
          <p className="text-foreground/70 leading-relaxed mb-3">
            {cms?.intro1 || 'Rettungssanitäter und Sanitäter wissen: der Schichtdienst macht klassisches Dating schwierig.'}
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
                  className="px-3 py-1.5 text-sm rounded-full bg-surface-dark text-white border border-brand-orange/20 hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  {kanton}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Kompaktes Kanton-Grid mit Mini-Bild */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {entries.map((entry) => (
            <ScrollReveal key={entry.slug}>
              <a
                href={`/regional/${toAnchor(entry.entry.kanton)}/${entry.slug}`}
                className="flex gap-3 items-center rounded-xl bg-surface hover-lift p-3 border border-foreground/5 hover:ring-2 hover:ring-brand-orange transition-all group"
                id={toAnchor(entry.entry.kanton)}
              >
                {entry.entry.featuredImage ? (
                  <img
                    src={entry.entry.featuredImage}
                    alt={entry.entry.title}
                    className="w-16 h-16 rounded-lg object-cover flex-none"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-surface-dark flex-none flex items-center justify-center text-2xl">🚑</div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground group-hover:text-brand-orange transition-colors truncate">
                    {entry.entry.city || entry.entry.kanton}
                  </p>
                  <p className="text-xs text-foreground/50 truncate">{entry.entry.kanton}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {entries.length === 0 && (
          <p className="text-foreground/50 text-center py-12">Noch keine Artikel. Bald verfügbar.</p>
        )}
      </div>
    </>
  );
}
