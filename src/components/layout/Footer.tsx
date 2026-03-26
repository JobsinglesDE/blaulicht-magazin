export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-white/90 relative overflow-hidden">
      {/* Orange top accent line */}
      <div className="h-1 bg-brand-orange" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-xl text-white tracking-tight mb-4">
              Blaulicht<span className="text-brand-orange"> Magazin</span>
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Das Magazin für Singles bei Polizei, Feuerwehr und Sanität.
              Partnersuche, Erfolgsgeschichten und regionale Tipps.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white/50 mb-4">
              Magazin
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="/singles-partnersuche" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                Singles & Partnersuche
              </a>
              <a href="/tv-news" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                TV News
              </a>
              <a href="/regional" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                Regional
              </a>
              <a href="/erfolgsgeschichten" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                Erfolgsgeschichten
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white/50 mb-4">
              Rechtliches
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="https://blaulichtsingles.ch/impressum" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                Impressum
              </a>
              <a href="https://blaulichtsingles.ch/datenschutz" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                Datenschutz
              </a>
              <a href="https://blaulichtsingles.ch/ueber-uns" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                Über uns
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {currentYear} Blaulichtsingles.ch — Alle Rechte vorbehalten.
          </p>
          <a
            href="https://blaulichtsingles.ch"
            className="text-xs text-brand-orange hover:underline"
          >
            blaulichtsingles.ch →
          </a>
        </div>
      </div>

      {/* Tape corner decoration */}
      <div className="absolute bottom-4 right-4 w-16 h-6 tape tape-right opacity-30 hidden md:block" />
    </footer>
  );
}
