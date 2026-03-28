import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  title: 'Regional',
  description: 'Blaulicht-Dating in deinem Kanton — regionale Tipps und lokale Singles für Polizei, Sanität und Feuerwehr.',
};

const BERUFE = [
  {
    id: 'polizei',
    label: 'Polizei',
    description: 'Kantonspolizei, Stadtpolizei, Gemeindepolizei — Singles in deinem Kanton.',
    href: '/regional/polizei',
    icon: '🚔',
  },
  {
    id: 'sanitaet',
    label: 'Sanität',
    description: 'Rettungsdienst, Sanitäter, Notfallsanitäter — Singles in deinem Kanton.',
    href: '/regional/sanitaet',
    icon: '🚑',
  },
  {
    id: 'feuerwehr',
    label: 'Feuerwehr',
    description: 'Berufsfeuerwehr und Milizfeuerwehr — Singles in deinem Kanton.',
    href: '/regional/feuerwehr',
    icon: '🚒',
  },
] as const;

export default async function Regional() {
  const all = await reader.collections.regional.all();

  const counts = {
    polizei: all.filter((r) => r.entry.beruf === 'polizei').length,
    sanitaet: all.filter((r) => r.entry.beruf === 'sanitaet').length,
    feuerwehr: all.filter((r) => r.entry.beruf === 'feuerwehr').length,
  };

  return (
    <>
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-regional.webp"
            alt="Blaulicht-Singles Regional — Polizei, Feuerwehr, Sanität und Ärzte vor Schweizer Alpenpanorama"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 15%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">Singles</span> Regional finden
          </h1>
        </div>
      </section>

      <PillarHero
        title="Regional"
        texts={['Liebe Dialekt', 'Singles vor Ort', 'Dein Kanton', 'Nähe verbindet', 'Regional']}
        subtitle="Blaulicht-Singles in deinem Kanton — regionale Tipps, lokale Orte, echte Verbindungen."
      />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BERUFE.map((beruf) => (
            <ScrollReveal key={beruf.id}>
              <a
                href={beruf.href}
                className="block bg-surface-dark text-white rounded-xl p-8 hover:ring-2 hover:ring-brand-orange transition-all group"
              >
                <div className="text-4xl mb-4">{beruf.icon}</div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-brand-orange transition-colors">
                  {beruf.label}
                </h2>
                <p className="text-white/60 text-sm mb-4">{beruf.description}</p>
                <span className="text-xs font-semibold text-brand-orange">
                  {counts[beruf.id]} {counts[beruf.id] === 1 ? 'Kanton' : 'Kantone'} →
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
