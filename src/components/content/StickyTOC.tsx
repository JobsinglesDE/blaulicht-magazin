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

  useEffect(() => {
    if (items.length === 0) return;

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

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed left-[max(1rem,calc((100vw-48rem)/2-14rem))] top-28 w-48 text-xs">
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
