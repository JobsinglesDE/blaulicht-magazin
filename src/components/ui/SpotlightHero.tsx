'use client';

import { useCallback, useRef } from 'react';

interface SpotlightHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightHero({ children, className = '' }: SpotlightHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--spotlight-x', `${x}%`);
    el.style.setProperty('--spotlight-y', `${y}%`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-gradient ${className}`}
    >
      {children}
    </div>
  );
}
