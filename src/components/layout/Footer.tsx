import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-white/90 relative overflow-hidden">
      {/* Top accent — gradient bar */}
      <div className="h-1 bg-gradient-to-r from-brand-orange via-secondary to-brand-orange" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand — with tape decoration */}
          <div className="relative">
            <div
              className="absolute -top-2 left-6 w-14 h-5 rounded-sm hidden md:block"
              style={{ background: 'rgba(255,255,255,0.08)', transform: 'rotate(-4deg)', boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
            />
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/jobsingles-logo.png"
                alt="Jobsingles Network"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <h3 className="font-bold text-xl text-white tracking-tight">
                Blaulicht<span className="text-brand-orange"> Magazin</span>
              </h3>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Das Magazin für Singles bei Polizei, Feuerwehr und Sanität.
              Partnersuche, Erfolgsgeschichten und regionale Tipps.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-brand-orange/60 mb-4">
              Magazin
            </h4>
            <nav className="flex flex-col gap-2.5">
              <a href="/singles-partnersuche" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                Singles & Partnersuche
              </a>
              <a href="/tv-news" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                TV News
              </a>
              <a href="/regional" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                Regional
              </a>
              <a href="/erfolgsgeschichten" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                Erfolgsgeschichten
              </a>
            </nav>
          </div>

          {/* Legal — with tape decoration */}
          <div className="relative">
            <div
              className="absolute -top-2 right-8 w-12 h-5 rounded-sm hidden md:block"
              style={{ background: 'rgba(255,255,255,0.08)', transform: 'rotate(5deg)', boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
            />
            <h4 className="text-xs uppercase tracking-widest font-bold text-brand-orange/60 mb-4">
              Rechtliches
            </h4>
            <nav className="flex flex-col gap-2.5">
              <a href="https://blaulichtsingles.ch/impressum" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                Impressum
              </a>
              <a href="https://blaulichtsingles.ch/datenschutz" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                Datenschutz
              </a>
              <a href="https://blaulichtsingles.ch/ueber-uns" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                Über uns
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} Blaulichtsingles.ch — Alle Rechte vorbehalten.
          </p>
          <a
            href="https://blaulichtsingles.ch/?AID=magazin"
            className="inline-flex items-center gap-1.5 text-xs text-brand-orange hover:text-brand-orange/80 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            blaulichtsingles.ch
          </a>
        </div>
      </div>

      {/* Bottom corner tape */}
      <div
        className="absolute bottom-6 right-6 w-16 h-5 rounded-sm hidden md:block"
        style={{ background: 'rgba(255,255,255,0.06)', transform: 'rotate(8deg)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
      />
    </footer>
  );
}
