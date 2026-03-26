import type { ReactNode } from 'react';

interface AnimatedGradientBorderProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientBorder({ children, className = '' }: AnimatedGradientBorderProps) {
  return (
    <div className={`gradient-border ${className}`}>
      <div className="rounded-[13px] bg-background overflow-hidden">
        {children}
      </div>
    </div>
  );
}
