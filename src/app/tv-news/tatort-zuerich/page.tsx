import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { SendetermineWidget } from '@/components/content/SendetermineWidget';

export const metadata = {
  title: 'Tatort Zürich — News & Hintergründe',
  description: 'Tatort Zürich: Neue Folgen, Drehorte an der Limmat und das Privatleben der Ermittler — Grandjean, Ott und die Zürcher Krimi-Welt.',
  openGraph: {
    title: 'Tatort Zürich — News & Hintergründe | Blaulicht-Singles Magazin',
    description: 'Neue Folgen, Drehorte an der Limmat und das Privatleben der Ermittler.',
    images: [{ url: '/images/hero-tatort-zuerich.webp', width: 2940, height: 1626, alt: 'Kommissar im Trenchcoat steht im Regen vor der Zürcher Altstadt mit Grossmünster und Polizeiauto' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero-tatort-zuerich.webp'],
  },
};

export default async function TatortZuerich() {
  const allSeries = await reader.collections.series.all();
  const articles = allSeries.filter(
    (s) => s.entry.seriesId === 'tatort-zuerich' && s.entry.status !== 'draft'
  );

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-tatort-zuerich.webp"
            alt="Kommissar im Trenchcoat steht im Regen vor der Zürcher Altstadt mit Grossmünster und Polizeiauto"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">Tatort</span> Zürich
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Neue Folgen, Drehorte an der Limmat und das Privatleben der Ermittler.
          </p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'TV News', href: '/tv-news' },
          { label: 'Tatort Zürich', href: '/tv-news/tatort-zuerich' },
        ]} />

        <div className="max-w-3xl mt-8 mb-10">
          <p className="text-foreground/80 leading-relaxed">
            Grandjean und Ott ermitteln an der Limmat — aber was treiben Anna Pieri Zuercher und Carol Schuler neben dem Dreh? Musik-Karrieren, Filmpreise und ein Leben zwischen Biel, Berlin und Winterthur. Hier gibts die persönlichen Geschichten hinter dem Zürcher Tatort-Team.
          </p>
        </div>

        <h2 className="text-xl font-bold mb-6">Alle Artikel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <SeriesCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/tv-news/tatort-zuerich/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              seriesLabel="Tatort Zürich"
            />
          ))}
        </div>
        <div className="mt-12">
          <SendetermineWidget seriesId="tatort-zuerich" />
        </div>
        <div className="mt-8">
          <Link href="/tv-news" className="text-brand-orange font-semibold hover:underline text-sm">
            ← Zurück zu TV News
          </Link>
        </div>
      </section>
    </div>
  );
}
