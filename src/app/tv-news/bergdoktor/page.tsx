import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { SendetermineWidget } from '@/components/content/SendetermineWidget';
import { withBasePath } from '@/lib/url';
import { getPersonHubUrl } from '@/lib/routes';

export const metadata = {
  title: 'Der Bergdoktor — News & Hintergründe',
  description: 'Der Bergdoktor: Hans Sigl, Ronja Forcher und das Privatleben der Stars aus den Tiroler Bergen — Drehorte, neue Staffeln und Dating-Perspektiven.',
  alternates: { canonical: '/tv-news/bergdoktor' },
  openGraph: {
    title: 'Der Bergdoktor — News & Hintergründe | Blaulicht-Singles Magazin',
    description: 'Hans Sigl, Ronja Forcher und das Privatleben der Stars aus den Tiroler Bergen.',
    images: [{ url: '/images/hero-bergdoktor.webp', width: 2940, height: 1626, alt: 'Arzt im weissen Kittel blickt von einer Alp auf ein Schweizer Bergdorf mit schneebedeckten Gipfeln' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero-bergdoktor.webp'],
  },
};

export default async function Bergdoktor() {
  const allSeries = await reader.collections.series.all();
  const articles = allSeries
    .filter((s) => s.entry.seriesId === 'bergdoktor' && s.entry.status !== 'draft')
    .sort((a, b) => String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? '')));

  const allPersons = await reader.collections.persons.all();
  const persons = allPersons.filter(
    (p) => p.entry.show === 'bergdoktor' && p.entry.status !== 'draft'
  );

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bergdoktor.webp"
            alt="Arzt im weissen Kittel blickt von einer Alp auf ein Schweizer Bergdorf mit schneebedeckten Gipfeln"
            width={1600}
            height={885}
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 20%' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            Der <span className="text-brand-orange">Bergdoktor</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Hans Sigl, Ronja Forcher und das Privatleben der Stars aus den Tiroler Bergen.
          </p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'TV News', href: '/tv-news' },
          { label: 'Der Bergdoktor', href: '/tv-news/bergdoktor' },
        ]} />

        <div className="max-w-3xl mt-8 mb-10">
          <p className="text-foreground/80 leading-relaxed">
            Was machen Hans Sigl, Ronja Forcher und die anderen Darsteller, wenn die Kamera aus ist? Zwischen Ammersee und Wilder Kaiser — das echte Leben hinter der beliebtesten Arztserie im deutschsprachigen Fernsehen. Patchwork-Familien, neue Projekte und ehrliche Einblicke abseits der Drehbücher.
          </p>
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <SendetermineWidget seriesId="bergdoktor" />
        </div>

        {persons.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-6">Die Stars</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {persons.map((p) => (
                <Link
                  key={p.slug}
                  href={getPersonHubUrl(p.slug, 'bergdoktor')}
                  className="group flex flex-col items-center text-center gap-3"
                >
                  {p.entry.featuredImage ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-brand-orange/30 group-hover:ring-brand-orange transition-all">
                      <Image
                        src={p.entry.featuredImage}
                        alt={p.entry.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-foreground/10 flex items-center justify-center ring-2 ring-brand-orange/30 group-hover:ring-brand-orange transition-all">
                      <span className="text-3xl font-bold text-foreground/40">
                        {p.entry.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm text-foreground group-hover:text-brand-orange transition-colors leading-tight">
                      {p.entry.name}
                    </p>
                    {p.entry.role && (
                      <p className="text-xs text-foreground/50 mt-0.5">{p.entry.role}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <h2 className="text-xl font-bold mb-6">Alle Artikel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <SeriesCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/tv-news/bergdoktor/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              imageAlt={article.entry.featuredImageAlt || undefined}
              seriesLabel="Der Bergdoktor"
            />
          ))}
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
