import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white/90 relative overflow-visible">
      {/* Animated gradient accent line */}
      <div className="animated-gradient-line h-[3px]" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        {/* Inner content area — slightly lighter surface */}
        <div className="relative rounded-2xl p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {/* Tape left — fast senkrecht, zerrissene Ränder, dunkelgrau */}
          <div
            className="absolute -top-10 left-24 w-9 h-20 hidden md:block z-10"
            style={{
              background: 'rgba(255,255,255,0.38)',
              transform: 'rotate(-5deg)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              clipPath: 'polygon(4% 0%, 98% 2%, 100% 18%, 96% 35%, 100% 52%, 97% 70%, 100% 88%, 95% 100%, 3% 98%, 0% 82%, 3% 65%, 0% 48%, 4% 30%, 0% 14%)',
            }}
          />
          {/* Tape right — leicht schräg, zerrissene Ränder */}
          <div
            className="absolute -top-3 right-14 w-9 h-20 hidden md:block z-10"
            style={{
              background: 'rgba(255,255,255,0.35)',
              transform: 'rotate(6deg)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
              clipPath: 'polygon(3% 0%, 97% 1%, 100% 15%, 96% 32%, 100% 50%, 97% 68%, 100% 85%, 96% 100%, 2% 98%, 0% 80%, 4% 62%, 0% 45%, 3% 28%, 0% 12%)',
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logos/jobsingles-logo.png"
                  alt="Jobsingles Network"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <h3 className="font-bold text-lg text-white tracking-tight">
                  Blaulicht<span className="text-brand-orange"> Magazin</span>
                </h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Das Magazin für Singles bei Polizei, Feuerwehr und Sanität.
                Partnersuche, Erfolgsgeschichten und regionale Tipps.
              </p>
            </div>

            {/* Magazin */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-4">
                Magazin
              </h4>
              <nav className="flex flex-col gap-2">
                <a href="/singles-partnersuche" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Singles & Partnersuche
                </a>
                <a href="/tv-news" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  TV News
                </a>
                <a href="/regional" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Regional
                </a>
                <a href="/erfolgsgeschichten" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Erfolgsgeschichten
                </a>
              </nav>
            </div>

            {/* Netzwerk */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-4">
                Netzwerk
              </h4>
              <nav className="flex flex-col gap-2">
                <a href="https://blaulichtsingles.ch" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Blaulichtsingles.ch
                </a>
                <a href="https://farmersingles.de" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Farmersingles.de
                </a>
                <a href="https://singlebuure.ch" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Singlebuure.ch
                </a>
                <a href="https://jobsingles.de" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Jobsingles.de
                </a>
              </nav>
            </div>

            {/* Rechtliches */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-4">
                Rechtliches
              </h4>
              <nav className="flex flex-col gap-2">
                <a href="https://blaulichtsingles.ch/impressum" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Impressum
                </a>
                <a href="https://blaulichtsingles.ch/datenschutz" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Datenschutz
                </a>
                <a href="https://blaulichtsingles.ch/ueber-uns" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Über uns
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
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

    </footer>
  );
}
