import Link from 'next/link';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

type Beruf = 'polizei' | 'sanitaet' | 'feuerwehr';
type SeriesId = 'tatort-zuerich' | 'bergdoktor';
type Variant = 'regional' | 'partnersuche' | 'tv-news' | 'bekanntschaften';

interface Props {
  beruf?: Beruf;
  seriesId?: SeriesId;
  variant?: Variant;
}

const REGIONAL = {
  polizei: { label: 'Polizei', href: '/regional/polizei' },
  sanitaet: { label: 'Sanität', href: '/regional/sanitaet' },
  feuerwehr: { label: 'Feuerwehr', href: '/regional/feuerwehr' },
};

const PARTNERSUCHE = {
  polizei: {
    label: 'Polizei',
    href: '/singles-partnersuche/polizei',
    heading: 'Polizei Singles & Partnersuche',
    text: 'Alle Artikel rund um Partnersuche, Dating und Beziehung für Polizistinnen und Polizisten.',
    cta: 'Zur Polizei Partnersuche →',
  },
  sanitaet: {
    label: 'Sanität',
    href: '/singles-partnersuche/sanitaet',
    heading: 'Sanität Singles & Partnersuche',
    text: 'Alle Artikel rund um Partnersuche, Dating und Beziehung für Rettungskräfte und Sanitäter.',
    cta: 'Zur Sanität Partnersuche →',
  },
  feuerwehr: {
    label: 'Feuerwehr',
    href: '/singles-partnersuche/feuerwehr',
    heading: 'Feuerwehr Singles & Partnersuche',
    text: 'Alle Artikel rund um Partnersuche, Dating und Beziehung für Feuerwehrleute.',
    cta: 'Zur Feuerwehr Partnersuche →',
  },
};

const TV_NEWS: Record<SeriesId, { heading: string; text: string; seriesHref: string; seriesCta: string; pillarHref: string; pillarCta: string }> = {
  'tatort-zuerich': {
    heading: 'Tatort Zürich — alle Artikel',
    text: 'Neue Folgen, Drehorte an der Limmat und das Privatleben der Ermittler Grandjean und Ott.',
    seriesHref: '/tv-news/tatort-zuerich',
    seriesCta: 'Alle Tatort-Artikel →',
    pillarHref: '/tv-news',
    pillarCta: 'Zurück zu TV News →',
  },
  'bergdoktor': {
    heading: 'Der Bergdoktor — alle Artikel',
    text: 'Hans Sigl, Ronja Forcher und das Privatleben der Stars aus den Tiroler Bergen.',
    seriesHref: '/tv-news/bergdoktor',
    seriesCta: 'Alle Bergdoktor-Artikel →',
    pillarHref: '/tv-news',
    pillarCta: 'Zurück zu TV News →',
  },
};

export function PillarBacklinkCard({ beruf, seriesId, variant = 'regional' }: Props) {
  if (variant === 'bekanntschaften') {
    return (
      <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="mt-12 mb-8">
        <div className="p-6">
          <p className="font-bold text-foreground mb-1">
            Bekanntschaften in der Schweiz — alle Städte
          </p>
          <p className="text-sm text-foreground/70 mb-3">
            Entdecke Blaulicht-Singles in weiteren Schweizer Grossstädten — von Zürich bis Genf.
          </p>
          <Link href="/regional/bekanntschaften" className="text-brand-orange font-semibold hover:underline text-sm">
            Alle Bekanntschaften-Städte →
          </Link>
        </div>
      </AnimatedGradientBorder>
    );
  }

  if (variant === 'tv-news' && seriesId) {
    const c = TV_NEWS[seriesId];
    return (
      <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="mt-12 mb-8">
        <div className="p-6">
          <p className="font-bold text-foreground mb-1">{c.heading}</p>
          <p className="text-sm text-foreground/70 mb-3">{c.text}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={c.seriesHref} className="text-brand-orange font-semibold hover:underline text-sm">
              {c.seriesCta}
            </Link>
            <Link href={c.pillarHref} className="text-foreground/60 font-semibold hover:underline text-sm">
              {c.pillarCta}
            </Link>
          </div>
        </div>
      </AnimatedGradientBorder>
    );
  }

  if (variant === 'partnersuche') {
    const c = PARTNERSUCHE[beruf as keyof typeof PARTNERSUCHE] ?? PARTNERSUCHE.polizei;
    return (
      <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="mt-12 mb-8">
        <div className="p-6">
          <p className="font-bold text-foreground mb-1">{c.heading}</p>
          <p className="text-sm text-foreground/70 mb-3">{c.text}</p>
          <Link href={c.href} className="text-brand-orange font-semibold hover:underline text-sm">
            {c.cta}
          </Link>
        </div>
      </AnimatedGradientBorder>
    );
  }

  const c = REGIONAL[beruf as keyof typeof REGIONAL] ?? REGIONAL.polizei;
  return (
    <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="mt-12 mb-8">
      <div className="p-6">
        <p className="font-bold text-foreground mb-1">
          {c.label} Singles — alle Kantone & Regionen
        </p>
        <p className="text-sm text-foreground/70 mb-3">
          Du suchst {c.label}-Singles in der ganzen Schweiz? Unsere Übersicht zeigt alle Kantone, Städte und Regionen.
        </p>
        <Link href={c.href} className="text-brand-orange font-semibold hover:underline text-sm">
          Zur {c.label} Übersicht →
        </Link>
      </div>
    </AnimatedGradientBorder>
  );
}
