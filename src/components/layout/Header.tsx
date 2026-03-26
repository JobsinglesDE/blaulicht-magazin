import { MenuHoverNav } from '@/components/ui/MenuHoverNav';

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="flex justify-between items-center px-6 h-20 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 6v6l4 2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-xl text-on-primary tracking-tight">
            Blaulicht<span className="text-brand-orange"> Magazin</span>
          </span>
        </a>

        {/* Navigation */}
        <MenuHoverNav />
      </div>
    </header>
  );
}
