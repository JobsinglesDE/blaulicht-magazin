'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Startseite', href: '/' },
  {
    label: 'Singles & Partnersuche',
    href: '/singles-partnersuche',
    dropdown: [
      { label: 'Polizei Dating', href: '/singles-partnersuche/polizei' },
      { label: 'Sanität Dating', href: '/singles-partnersuche/sanitaet' },
      { label: 'Feuerwehr Dating', href: '/singles-partnersuche/feuerwehr' },
    ],
  },
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

  // Hover pill state
  const [hoverPos, setHoverPos] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  function handleMouseEnterItem(label: string) {
    const el = itemRefs.current.get(label);
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setHoverPos({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }

  function handleMouseLeaveNav() {
    setHoverPos((prev) => ({ ...prev, opacity: 0 }));
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  function handleDropdownEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
    handleMouseEnterItem(label);
  }

  function handleDropdownLeave() {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setHoverPos((prev) => ({ ...prev, opacity: 0 }));
    }, 150);
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul
          ref={navRef}
          className="relative flex items-center"
          onMouseLeave={handleMouseLeaveNav}
        >
          {/* Animated hover pill */}
          <motion.li
            animate={hoverPos}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute h-8 rounded-full bg-brand-orange/10 z-0"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          />

          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              ref={(el) => { if (el) itemRefs.current.set(item.label, el); }}
              className="relative z-10"
              onMouseEnter={() => {
                handleMouseEnterItem(item.label);
                if (item.dropdown) handleDropdownEnter(item.label);
              }}
              onMouseLeave={() => {
                if (item.dropdown) handleDropdownLeave();
              }}
            >
              <a
                href={item.href}
                className={`
                  px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors duration-200 relative block
                  ${isActive(item.href)
                    ? 'text-brand-orange'
                    : 'text-foreground/70 hover:text-brand-orange'
                  }
                `}
              >
                {item.label}
                {item.dropdown && (
                  <svg
                    className={`inline-block ml-1 w-3 h-3 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {/* Active underline */}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-orange"
                  />
                )}
              </a>

              {/* Dropdown */}
              {item.dropdown && openDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-1 min-w-[220px] py-2 rounded-lg bg-surface shadow-lg border border-foreground/10 z-50"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  }}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.dropdown.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      className={`
                        block px-5 py-2.5 text-sm transition-colors duration-150
                        ${isActive(sub.href)
                          ? 'text-brand-orange bg-brand-orange/5'
                          : 'text-foreground/70 hover:text-brand-orange hover:bg-brand-orange/5'
                        }
                      `}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
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
        <div className="fixed inset-0 top-20 z-40 bg-background md:hidden">
          <nav className="flex flex-col p-6 gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className={`
                    block py-3 px-4 text-lg font-bold transition-colors rounded-lg
                    ${isActive(item.href)
                      ? 'text-brand-orange bg-brand-orange/5'
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
