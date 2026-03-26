'use client';

import { useState, type ReactNode } from 'react';

interface RevealLinkProps {
  label: string;
  children: ReactNode;
}

export function RevealLink({ label, children }: RevealLinkProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-brand-orange font-bold text-sm hover:underline transition-colors"
      >
        {open ? '▾' : '▸'} {label}
      </button>
      <div className="reveal-content" data-open={open}>
        <div>
          <div className="pt-3 text-foreground/70 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
