import type { ReactNode } from 'react';

interface ParticleTextProps {
  children: ReactNode;
  className?: string;
}

export function ParticleText({ children, className = '' }: ParticleTextProps) {
  return (
    <span className={`particle-text ${className}`}>
      {children}
    </span>
  );
}
