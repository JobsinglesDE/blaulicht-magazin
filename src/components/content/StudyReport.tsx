'use client';

/**
 * StudyReport — wiederverwendbarer Studien-Block (Methodik-Box + Daten-Viz + Quellen).
 *
 * Rendert NUR, was in den Keystatic-Studien-Feldern steht. Alle Teile sind einzeln
 * optional — solange keine Zahlen eingetragen sind, erscheint keine leere Box.
 * Dadurch laesst sich die Studie erst als Geruest bauen und die Zahlen (amtliche ODER
 * eigene Umfrage) spaeter in dieselben Felder fuellen, ohne Code-Aenderung.
 *
 * Client-Komponente: Balken wachsen und Zahlen zaehlen hoch, sobald sie in den
 * Viewport scrollen (framer-motion). Enthaelt ausserdem den Hub-Backlink zu /studien,
 * damit jede Studie automatisch mit dem "Wissenschaft & Liebe"-Hub gegenverlinkt ist.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Link from 'next/link';

export type StudieDatenpunkt = {
  label: string;
  wert?: string;
  einheit?: string;
  vergleich?: string;
  quelle?: string;
};
export type StudieQuelle = { titel: string; autorJahr?: string; url?: string };

/** Deutsche Zahl ("1.720.000", "1,72", "61") → number | null. */
function toNum(s?: string): number | null {
  if (!s) return null;
  const n = Number(
    String(s).trim().replace(/\s/g, '').replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')
  );
  return Number.isFinite(n) ? n : null;
}

/** Nachkommastellen aus dem deutschen Ausgangsstring ("1,72" → 2, "61" → 0). */
function decimalsOf(s?: string): number {
  const frac = String(s ?? '').split(',')[1];
  return frac ? frac.length : 0;
}

function formatDE(v: number, decimals: number): string {
  return v.toFixed(decimals).replace('.', ',');
}

/** Zahl, die beim Scrollen in den Viewport von 0 auf den Zielwert hochzaehlt. */
function CountUp({ raw }: { raw: string }) {
  const target = toNum(raw);
  const decimals = decimalsOf(raw);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [text, setText] = useState(target === null ? raw : formatDE(0, decimals));

  useEffect(() => {
    if (target === null || !inView) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => setText(formatDE(v, decimals)),
    });
    return () => controls.stop();
  }, [inView, target, decimals]);

  // Nicht-numerische Werte (selten) unveraendert zeigen.
  return <span ref={ref}>{target === null ? raw : text}</span>;
}

/** Balken, der beim Scrollen von 0 auf seinen Prozentwert waechst. */
function Bar({ pct, strong }: { pct: number; strong: boolean }) {
  return (
    <div
      className={`h-2 rounded-full overflow-hidden ${strong ? 'bg-brand-orange/15' : 'bg-foreground/5'}`}
    >
      <motion.div
        className={`h-full rounded-full ${strong ? 'bg-brand-orange' : 'bg-foreground/30'}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}

export function StudyReport({
  methodik,
  datengrundlage,
  stichprobe,
  institut,
  datenpunkte = [],
  quellen = [],
}: {
  methodik?: string;
  datengrundlage?: string;
  stichprobe?: string;
  institut?: string;
  datenpunkte?: readonly StudieDatenpunkt[];
  quellen?: readonly StudieQuelle[];
}) {
  const hasMethodik = Boolean(methodik || datengrundlage || stichprobe || institut);
  const points = datenpunkte.filter((d) => d.label && (d.wert || d.vergleich));
  const sources = quellen.filter((q) => q.titel);

  if (!hasMethodik && points.length === 0 && sources.length === 0) return null;

  return (
    <section className="my-10 not-prose" aria-label="Studien-Kennzahlen und Methodik">
      {/* Daten-Viz — Zahlen auf einen Blick */}
      {points.length > 0 && (
        <div className="mb-8">
          <h2 id="zahlen-auf-einen-blick" className="text-2xl font-bold mb-5 scroll-mt-24">
            Zahlen auf einen Blick
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((d, i) => {
              const main = toNum(d.wert);
              const comp = toNum(d.vergleich);
              const max = Math.max(main ?? 0, comp ?? 0) || 1;
              return (
                <motion.div
                  key={i}
                  className="rounded-xl border border-foreground/10 bg-surface p-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-brand-orange-text tabular-nums">
                      {d.wert ? <CountUp raw={d.wert} /> : d.vergleich}
                    </span>
                    {d.einheit && (
                      <span className="text-lg font-bold text-brand-orange-text">{d.einheit}</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/80 mt-1 leading-snug">{d.label}</p>

                  {comp !== null && main !== null && (
                    <div className="mt-3 space-y-1.5">
                      <Bar pct={Math.round((main / max) * 100)} strong />
                      <Bar pct={Math.round((comp / max) * 100)} strong={false} />
                      <p className="text-[11px] text-foreground/40">
                        Balken oben: dieser Wert · unten: Vergleichswert {d.vergleich}
                        {d.einheit}
                      </p>
                    </div>
                  )}

                  {d.quelle && (
                    <p className="text-[11px] text-foreground/40 mt-2">Quelle: {d.quelle}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Methodik-Box */}
      {hasMethodik && (
        <div className="rounded-xl border border-brand-orange/20 bg-brand-orange/5 p-5">
          <p className="text-xs uppercase tracking-widest font-bold text-brand-orange-text mb-3">
            Methodik
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {methodik && (
              <div className="sm:col-span-2">
                <dt className="text-foreground/50">Vorgehen</dt>
                <dd className="text-foreground/85">{methodik}</dd>
              </div>
            )}
            {datengrundlage && (
              <div>
                <dt className="text-foreground/50">Datengrundlage / Zeitraum</dt>
                <dd className="text-foreground/85">{datengrundlage}</dd>
              </div>
            )}
            {stichprobe && (
              <div>
                <dt className="text-foreground/50">Stichprobe</dt>
                <dd className="text-foreground/85">{stichprobe}</dd>
              </div>
            )}
            {institut && (
              <div>
                <dt className="text-foreground/50">Institut / Herausgeber</dt>
                <dd className="text-foreground/85">{institut}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Quellen */}
      {sources.length > 0 && (
        <div className="mt-6">
          <h2 id="quellen" className="text-xl font-bold mb-3 scroll-mt-24">Quellen</h2>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-foreground/70">
            {sources.map((q, i) => (
              <li key={i}>
                {q.url ? (
                  <a
                    href={q.url}
                    target="_blank"
                    rel="nofollow noopener"
                    className="text-brand-orange-text hover:underline"
                  >
                    {q.titel}
                  </a>
                ) : (
                  <span>{q.titel}</span>
                )}
                {q.autorJahr && <span className="text-foreground/45"> — {q.autorJahr}</span>}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Hub-Backlink — jede Studie gegenverlinkt mit dem Studien-Hub */}
      <div className="mt-8 pt-5 border-t border-foreground/10">
        <Link
          href="/studien"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange-text hover:underline"
        >
          Alle Studien: Wissenschaft &amp; Liebe →
        </Link>
      </div>
    </section>
  );
}
