'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function Counter({ value, suffix = '', duration = 2000 }: Omit<AnimatedCounterProps, 'label'>) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  // Format Swiss-style with apostrophe
  const formatted = count.toLocaleString('de-CH');

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
}

interface StatsItem {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedStats({ items }: { items: StatsItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-6 md:gap-12 text-center">
      {items.map((item) => (
        <div key={item.label}>
          <div className="text-3xl md:text-5xl font-bold text-brand-orange mb-2">
            <Counter value={item.value} suffix={item.suffix} />
          </div>
          <div className="text-sm md:text-base text-foreground/60">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
