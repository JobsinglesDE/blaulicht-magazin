'use client';

import { useRef, useEffect, useState } from 'react';

interface HandWritingTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export function HandWritingText({ text, className = '', duration = 1.5 }: HandWritingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        animation: visible ? `handwrite ${duration}s ease forwards` : 'none',
        clipPath: visible ? undefined : 'inset(0 100% 0 0)',
      }}
    >
      {text}
    </span>
  );
}
