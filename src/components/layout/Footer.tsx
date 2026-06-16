import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white/90 relative overflow-visible">
      {/* Animated gradient accent line */}
      <div className="animated-gradient-line h-[3px]" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        {/* Inner content area — slightly lighter surface */}
        <div className="relative rounded-2xl p-8 md:p-10" style={{ background: '#2B4669' }}>
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
          {/* Tape right — horizontal schräg, zerrissene Ränder */}
          <div
            className="absolute -top-3 right-14 w-24 h-8 hidden md:block z-10"
            style={{
              background: 'rgba(255,255,255,0.35)',
              transform: 'rotate(6deg)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
              clipPath: 'polygon(0% 3%, 15% 0%, 35% 4%, 52% 0%, 70% 3%, 88% 0%, 100% 4%, 98% 97%, 85% 100%, 65% 96%, 48% 100%, 30% 97%, 12% 100%, 2% 96%)',
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logos/jobsingles-icon-512.webp"
                  alt="Jobsingles Network"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <h3 className="font-bold text-lg text-white tracking-tight">
                  Blaulicht<span className="text-brand-orange"> Magazin</span>
                </h3>
              </div>
              <p className="text-sm text-white/75 leading-relaxed">
                Das Magazin für Singles bei Polizei, Feuerwehr und Sanität.
                Partnersuche, Erfolgsgeschichten und regionale Tipps.
              </p>
            </div>

            {/* Magazin */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/70 mb-4">
                Magazin
              </h4>
              <nav className="flex flex-col gap-2">
                <Link href="/singles-partnersuche" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Singles & Partnersuche
                </Link>
                <Link href="/tv-news" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  TV News
                </Link>
                <Link href="/regional" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Regional
                </Link>
                <Link href="/erfolgsgeschichten" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Erfolgsgeschichten
                </Link>
              </nav>
            </div>

            {/* Netzwerk */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/70 mb-4">
                Netzwerk
              </h4>
              <nav className="flex flex-col gap-2">
                <a href="https://blaulichtsingles.ch" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Blaulichtsingles.ch
                </a>
                <a href="https://jobsingles.de" rel="nofollow" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Jobsingles.de — Das Netzwerk
                </a>
              </nav>
              <p className="text-[10px] text-white/65 mt-3">
                Teil des Jobsingles-Netzwerks mit 15+ Berufs-Dating-Portalen
              </p>
            </div>

            {/* Service */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/70 mb-4">
                Service
              </h4>
              <nav className="flex flex-col gap-2">
                <a href="https://blaulichtsingles.ch/hilfe/" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Hilfe & Support
                </a>
                <a href="https://blaulichtsingles.ch/kontakt/k%C3%BCndigen/" rel="nofollow" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Premium-Mitgliedschaft kündigen
                </a>
                <a href="https://blaulichtsingles.ch/datenschutz.html" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Datenschutz
                </a>
                <a href="https://blaulichtsingles.ch/impressum.html" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Impressum / AGB
                </a>
                <Link href="/ueber-uns" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Über uns
                </Link>
                <Link href="/kontakt" className="text-sm text-white/75 hover:text-brand-orange transition-colors">
                  Kontakt
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/70">
            © {currentYear} Blaulichtsingles.ch — Alle Rechte vorbehalten.
          </p>
          {/* YouTube Channel Link */}
          <a
            href="https://www.youtube.com/@Blaulichtsingles_CH"
            target="_blank"
            rel="noopener"
            aria-label="@Blaulichtsingles_CH auf YouTube"
            className="flex items-center gap-2 text-white/60 hover:text-brand-orange transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 180" className="w-6 h-6 group-hover:scale-110 transition-transform">
              <path fill="currentColor" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"/>
              <path fill="#fff" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/>
            </svg>
            <span className="text-xs">@Blaulichtsingles_CH</span>
          </a>
          <p className="text-xs text-white/70">
            Made with <span className="text-brand-orange">❤</span> by{' '}
            <a
              href="https://seeside.ai"
              target="_blank"
              rel="noopener"
              className="text-white/60 underline hover:text-brand-orange transition-colors"
            >
              seeside.ai
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
