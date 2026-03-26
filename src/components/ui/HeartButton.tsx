'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HeartButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function HeartButton({ href, children, className = '' }: HeartButtonProps) {
  const [burst, setBurst] = useState(false);

  function handleClick() {
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`heart-button relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-lg font-bold tracking-tight transition-all ${className}`}
      style={{
        background: 'linear-gradient(to right, #3a8c3d, #429A45, #55ad58)',
      }}
    >
      <span className="relative">
        <motion.svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          style={{ fill: '#ff4466' }}
          animate={burst ? { scale: [1, 1.5, 1] } : { scale: [1, 1.2, 1] }}
          transition={burst
            ? { duration: 0.4, ease: 'easeOut' }
            : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
        {burst && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: '#ff4466',
                  animation: 'heart-burst 700ms ease-out forwards',
                  animationDelay: `${i * 40}ms`,
                  transform: `rotate(${i * 45}deg) translateY(-10px)`,
                }}
              />
            ))}
          </span>
        )}
      </span>
      {children}
    </motion.a>
  );
}
