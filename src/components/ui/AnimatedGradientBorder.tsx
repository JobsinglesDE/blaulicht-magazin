'use client';

import { useRef, useEffect, type ReactNode } from 'react';

interface AnimatedGradientBorderProps {
  children: ReactNode;
  className?: string;
  gradientColors?: string[];
  animationSpeed?: number;
  borderRadius?: number;
  borderWidth?: number;
}

export function AnimatedGradientBorder({
  children,
  className = '',
  gradientColors = ['#FF7A00', '#4A90D9', '#e9c349', '#FF7A00'],
  animationSpeed = 3,
  borderRadius = 16,
  borderWidth = 2,
}: AnimatedGradientBorderProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    let angle = 0;
    let animId: number;
    const step = 360 / (animationSpeed * 60);

    function rotate() {
      angle = (angle + step) % 360;
      const gradient = `conic-gradient(from ${angle}deg, ${gradientColors.join(', ')})`;
      el!.style.background = gradient;
      animId = requestAnimationFrame(rotate);
    }

    rotate();
    return () => cancelAnimationFrame(animId);
  }, [gradientColors, animationSpeed]);

  return (
    <div
      ref={boxRef}
      className={`p-[${borderWidth}px] ${className}`}
      style={{ borderRadius, padding: borderWidth }}
    >
      <div
        className="bg-background overflow-hidden h-full"
        style={{ borderRadius: borderRadius - borderWidth }}
      >
        {children}
      </div>
    </div>
  );
}
