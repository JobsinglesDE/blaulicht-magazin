'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  label: string;
  id: string;
}

interface Props {
  items: TocItem[];
}

export function StickyTOC({ items }: Props) {
  const [activeId, setActiveId] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    // Show TOC only when first H2 is near viewport
    const firstH2 = document.getElementById(items[0]?.id);
    if (!firstH2) return;

    const visObserver = new IntersectionObserver(
      ([entry]) => {
        // Show when article content is in view, hide when scrolled back to hero
        if (entry.boundingClientRect.top < window.innerHeight) {
          setVisible(true);
        }
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0 }
    );
    visObserver.observe(firstH2);

    // Track scroll to hide when back at top
    function onScroll() {
      if (!firstH2) return;
      const rect = firstH2.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight + 200);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      visObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [items]);

  if (items.length === 0 || !visible) return null;

  return (
    <nav className="hidden xl:block fixed left-[max(1rem,calc((100vw-48rem)/2-14rem))] top-28 w-48 text-xs transition-opacity duration-300">
      <p className="font-semibold text-foreground/40 uppercase tracking-widest mb-3">Inhalt</p>
      <ol className="space-y-2 border-l border-foreground/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block pl-3 -ml-px transition-colors duration-200 ${
                activeId === item.id
                  ? 'border-l-2 border-brand-orange text-brand-orange font-semibold'
                  : 'text-foreground/50 hover:text-foreground/80'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
