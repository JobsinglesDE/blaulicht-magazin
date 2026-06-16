import Link from 'next/link';
import Image from 'next/image';
import { reader } from '@/lib/keystatic';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';

const HUB_URL = 'https://blaulichtsingles.ch/magazin/promi-aerzte-schweiz';

export const metadata = {
  title: 'Promi-Ärzte Schweiz — die bekanntesten TV-Mediziner der Schweiz',
  description: 'Von Herzchirurg Thierry Carrel über «Doktor Stutz» bis «Mister Corona» Daniel Koch: Die bekanntesten Schweizer TV-Ärzte und Gesundheitsexperten im Portrait.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Promi-Ärzte Schweiz — die bekanntesten TV-Mediziner',
    description: 'Wer ist wer in der Schweizer Gesundheits- und TV-Medizin. Portraits, alle Quellen-verifiziert.',
    url: HUB_URL,
    type: 'website',
    siteName: 'Blaulichtsingles Magazin',
    locale: 'de-CH',
  },
};

// Reihenfolge + Sender-Label je Promi (Suchvolumen-priorisiert). Karten erscheinen nur,
// wenn ein passender Artikel (type: promi-arzt) existiert — keine toten Links.
const PROMIS = [
  { slug: 'promi-thierry-carrel', name: 'Thierry Carrel', role: 'Star-Herzchirurg, Inselspital Bern', sender: 'SRF / Inselspital' },
  { slug: 'promi-beat-richner', name: 'Beat Richner', role: 'Kinderarzt «Beatocello», Kantha Bopha', sender: 'SRF' },
  { slug: 'promi-daniel-koch', name: 'Daniel Koch', role: '«Mister Corona», Ex-BAG-Delegierter', sender: 'BAG / SRF' },
  { slug: 'promi-samuel-stutz', name: 'Samuel Stutz', role: 'TV-Arzt «Doktor Stutz»', sender: 'SRF' },
  { slug: 'promi-gregor-hasler', name: 'Gregor Hasler', role: 'Psychiater, Bestsellerautor', sender: 'Uni Freiburg' },
  { slug: 'promi-juerg-haecki', name: 'Jürg Häcki', role: '«Beauty-Doc», Lucerne Clinic', sender: 'Lucerne Clinic' },
  { slug: 'promi-thomas-kissling', name: 'Thomas Kissling', role: '«Puls»-Hausarzt', sender: 'SRF «Puls»' },
  { slug: 'promi-werner-mang', name: 'Werner Mang', role: '«Schönheitspapst», Bodenseeklinik', sender: 'Bodenseeklinik' },
  { slug: 'promi-natalie-urwyler', name: 'Natalie Urwyler', role: 'Anästhesistin & Notfallmedizinerin', sender: 'Inselspital' },
  { slug: 'promi-nicole-lindenblatt', name: 'Nicole Lindenblatt', role: 'Plastische Chirurgin, USZ', sender: 'USZ / SRF' },
];

export default async function PromiAerzteSchweizHub() {
  const articles = await reader.collections.articles.all();
  const promiCards = PROMIS
    .map((p) => {
      const article = articles.find(
        (a) => a.slug === p.slug && (a.entry as any).type === 'promi-arzt' && a.entry.status !== 'draft'
      );
      if (!article) return null;
      return {
        ...p,
        title: article.entry.title ?? p.name,
        excerpt: article.entry.excerpt ?? '',
        featuredImage: article.entry.featuredImage ?? `/images/articles/${p.slug}/${p.slug}.webp`,
      };
    })
    .filter(Boolean) as Array<typeof PROMIS[number] & { title: string; excerpt: string; featuredImage: string }>;

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Promi-Ärzte Schweiz',
          description: 'Die bekanntesten Schweizer TV-Mediziner und Gesundheitsexperten im Portrait',
          url: HUB_URL,
          items: promiCards.map((p) => ({
            name: p.name,
            url: `https://blaulichtsingles.ch/magazin/promi-aerzte-schweiz/${p.slug}`,
          })),
        })}
      />

      <section className="relative overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-surface-dark to-background" />
        <div className="relative max-w-4xl mx-auto px-6 text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Promi-Ärzte <span className="text-brand-orange-text">Schweiz</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mt-4 leading-relaxed">
            Die bekanntesten Schweizer Mediziner zwischen Klinik, Praxis und Fernsehen. Werdegang, Sendungen, Bücher — und was Singles aus dem Gesundheits- und Einsatzbereich aus ihren Karrieren mitnehmen können.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-6">
        <Breadcrumbs items={[{ label: 'Promi-Ärzte Schweiz', href: '/promi-aerzte-schweiz' }]} />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-10">
        {promiCards.length === 0 ? (
          <p className="text-center text-foreground/60">Die Portraits werden gerade veröffentlicht.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promiCards.map((p, idx) => (
              <Link
                key={p.slug}
                href={`/promi-aerzte-schweiz/${p.slug}`}
                className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-brand-orange transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
              >
                <div className="relative aspect-[3/2] bg-surface-dark overflow-hidden">
                  <Image
                    src={p.featuredImage}
                    alt={`${p.name}, ${p.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx < 3}
                    loading={idx < 3 ? undefined : 'lazy'}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wider text-brand-orange-text font-semibold mb-2">
                    {p.sender}
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-brand-orange-text transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">{p.role}</p>
                  {p.excerpt && <p className="text-sm text-foreground/60 line-clamp-3">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Verwandte Themen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/singles-partnersuche/sanitaet" className="block p-4 rounded-xl border border-border hover:border-brand-orange transition-colors">
            <div className="font-semibold text-foreground">Sanität Dating</div>
            <div className="text-sm text-foreground/60">Bekanntschaften aus Rettungsdienst & Notfall</div>
          </Link>
          <Link href="/tv-news" className="block p-4 rounded-xl border border-border hover:border-brand-orange transition-colors">
            <div className="font-semibold text-foreground">TV News & Promis</div>
            <div className="text-sm text-foreground/60">«Tatort» Zürich &amp; Der Bergdoktor</div>
          </Link>
        </div>
      </section>
    </>
  );
}
