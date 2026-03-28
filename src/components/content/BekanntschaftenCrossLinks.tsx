import Link from 'next/link';

interface CrossLink {
  label: string;
  href: string;
  icon: string;
}

interface Props {
  city: string;
}

const CITY_LINKS: Record<string, CrossLink[]> = {
  'Zürich': [
    { label: 'Polizei-Singles Zürich', href: '/regional/zuerich/polizei-singles-zuerich', icon: '🚔' },
    { label: 'Sanitäts-Singles Zürich', href: '/regional/zuerich/sanitaet-singles-zuerich', icon: '🚑' },
    { label: 'Feuerwehr-Singles Zürich', href: '/regional/zuerich/feuerwehr-singles-zuerich', icon: '🚒' },
  ],
  'Bern': [
    { label: 'Polizei-Singles Bern', href: '/regional/bern/polizei-singles-bern', icon: '🚔' },
    { label: 'Sanitäts-Singles Bern', href: '/regional/bern/sanitaet-singles-bern', icon: '🚑' },
    { label: 'Feuerwehr-Singles Bern', href: '/regional/bern/feuerwehr-singles-bern', icon: '🚒' },
  ],
  'Basel': [
    { label: 'Polizei-Singles Basel', href: '/regional/basel-stadt/polizei-singles-basel-stadt', icon: '🚔' },
    { label: 'Sanitäts-Singles Basel', href: '/regional/basel-stadt/sanitaet-singles-basel-stadt', icon: '🚑' },
    { label: 'Feuerwehr-Singles Basel', href: '/regional/basel-stadt/feuerwehr-singles-basel-stadt', icon: '🚒' },
  ],
  'Luzern': [
    { label: 'Polizei-Singles Luzern', href: '/regional/luzern/polizei-singles-luzern', icon: '🚔' },
    { label: 'Sanitäts-Singles Luzern', href: '/regional/luzern/sanitaet-singles-luzern', icon: '🚑' },
    { label: 'Feuerwehr-Singles Luzern', href: '/regional/luzern/feuerwehr-singles-luzern', icon: '🚒' },
  ],
  'St. Gallen': [
    { label: 'Polizei-Singles St. Gallen', href: '/regional/st-gallen/polizei-singles-st-gallen', icon: '🚔' },
    { label: 'Sanitäts-Singles St. Gallen', href: '/regional/st-gallen/sanitaet-singles-st-gallen', icon: '🚑' },
    { label: 'Feuerwehr-Singles St. Gallen', href: '/regional/st-gallen/feuerwehr-singles-st-gallen', icon: '🚒' },
  ],
  'Winterthur': [
    { label: 'Polizei-Singles Winterthur', href: '/regional/zuerich/polizei-singles-winterthur', icon: '🚔' },
    { label: 'Sanitäts-Singles Winterthur', href: '/regional/zuerich/sanitaet-singles-winterthur', icon: '🚑' },
    { label: 'Feuerwehr-Singles Winterthur', href: '/regional/zuerich/feuerwehr-singles-winterthur', icon: '🚒' },
  ],
};

const FALLBACK_LINKS: CrossLink[] = [
  { label: 'Alle Bekanntschaften', href: '/regional/bekanntschaften', icon: '💙' },
  { label: 'Singles & Partnersuche', href: '/singles-partnersuche', icon: '💕' },
  { label: 'Blaulichtsingles.ch', href: 'https://blaulichtsingles.ch/?AID=magazin', icon: '🔵' },
];

export function BekanntschaftenCrossLinks({ city }: Props) {
  const links = CITY_LINKS[city] ?? FALLBACK_LINKS;
  const hasBerufe = !!CITY_LINKS[city];

  return (
    <div className="my-10">
      <p className="text-sm font-semibold text-foreground/60 uppercase tracking-wide mb-4">
        {hasBerufe ? `${city} nach Beruf entdecken` : 'Weiterlesen'}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 transition-all hover:border-brand-orange/40 hover:bg-brand-orange/5"
          >
            <span className="text-2xl" aria-hidden>{link.icon}</span>
            <span className="text-sm font-medium text-foreground group-hover:text-brand-orange transition-colors">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
