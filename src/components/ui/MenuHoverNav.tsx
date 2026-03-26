'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Startseite', href: '/' },
  { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
  {
    label: 'TV News',
    href: '/tv-news',
    dropdown: [
      { label: 'Die Assistenzärzte (SRF)', href: '/tv-news/assistenzaerzte' },
      { label: 'Tatort Zürich (SRF)', href: '/tv-news/tatort-zuerich' },
    ],
  },
  {
    label: 'Regional',
    href: '/regional',
    dropdown: [
      { label: 'Kanton Zürich', href: '/regional/zuerich' },
      { label: 'Kanton Bern', href: '/regional/bern' },
      { label: 'Kanton Luzern', href: '/regional/luzern' },
      { label: 'Kanton Basel', href: '/regional/basel' },
      { label: 'Kanton St. Gallen', href: '/regional/st-gallen' },
      { label: 'Kanton Aargau', href: '/regional/aargau' },
    ],
  },
  { label: 'Erfolgsgeschichten', href: '/erfolgsgeschichten' },
];

export function MenuHoverNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  function handleMouseEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
            onMouseLeave={() => item.dropdown && handleMouseLeave()}
          >
            <a
              href={item.href}
              className={`
                px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors duration-200 relative
                ${isActive(item.href)
                  ? 'text-brand-orange'
                  : 'text-foreground/70 hover:text-brand-orange'
                }
              `}
            >
              {item.label}
              {item.dropdown && (
                <svg className="inline-block ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {/* Hover underline */}
              <span
                className={`
                  absolute bottom-0 left-4 right-4 h-0.5 bg-brand-orange transition-transform duration-300 origin-left
                  ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}
              />
            </a>

            {/* Dropdown */}
            {item.dropdown && openDropdown === item.label && (
              <div className="absolute top-full left-0 mt-1 min-w-[220px] py-2 rounded-lg glass-nav ambient-shadow z-50">
                {item.dropdown.map((sub) => (
                  <a
                    key={sub.href}
                    href={sub.href}
                    className={`
                      block px-5 py-2.5 text-sm transition-colors duration-150
                      ${isActive(sub.href)
                        ? 'text-brand-orange bg-white/5'
                        : 'text-foreground/70 hover:text-brand-orange hover:bg-black/5'
                      }
                    `}
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Menü schliessen' : 'Menü öffnen'}
      >
        <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-40 glass-nav md:hidden">
          <nav className="flex flex-col p-6 gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className={`
                    block py-3 px-4 text-lg font-bold transition-colors rounded-lg
                    ${isActive(item.href)
                      ? 'text-brand-orange bg-black/5'
                      : 'text-foreground/70 hover:text-brand-orange'
                    }
                  `}
                >
                  {item.label}
                </a>
                {item.dropdown && (
                  <div className="ml-4 border-l-2 border-brand-orange/20 pl-4">
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className={`
                          block py-2 text-sm transition-colors
                          ${isActive(sub.href)
                            ? 'text-brand-orange'
                            : 'text-foreground/60 hover:text-brand-orange'
                          }
                        `}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
