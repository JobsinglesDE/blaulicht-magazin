import Link from 'next/link';

interface Props {
  beruf: 'polizei' | 'sanitaet' | 'feuerwehr';
}

const CONFIG = {
  polizei: { label: 'Polizei', href: '/regional/polizei' },
  sanitaet: { label: 'Sanität', href: '/regional/sanitaet' },
  feuerwehr: { label: 'Feuerwehr', href: '/regional/feuerwehr' },
};

export function PillarBacklinkCard({ beruf }: Props) {
  const c = CONFIG[beruf] ?? CONFIG.polizei;

  return (
    <div className="mt-12 mb-8 rounded-xl border border-border bg-muted/60 p-6">
      <p className="font-bold text-foreground mb-1">
        {c.label} Singles — alle Kantone & Regionen
      </p>
      <p className="text-sm text-foreground/70 mb-3">
        Du suchst {c.label}-Singles in der ganzen Schweiz? Unsere Übersicht zeigt alle Kantone, Städte und Regionen.
      </p>
      <Link
        href={c.href}
        className="text-brand-orange font-semibold hover:underline text-sm"
      >
        Zur {c.label} Übersicht →
      </Link>
    </div>
  );
}
