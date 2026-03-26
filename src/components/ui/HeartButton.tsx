'use client';

import type { ReactNode } from 'react';

interface HeartButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const Heart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-full h-auto fill-[#ff4466]"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function HeartButton({ href, children, className = '' }: HeartButtonProps) {
  return (
    <a
      href={href}
      className={`
        group relative inline-flex items-center gap-3 px-9 py-4
        text-lg font-bold text-white
        rounded-full
        border-[3px] border-[#429A45]
        transition-all duration-300 ease-in-out
        cursor-pointer
        bg-[#429A45] shadow-[0_0_0_#429a458c]
        hover:bg-transparent hover:text-[#429A45] hover:shadow-[0_0_25px_#429a458c]
        active:scale-95
        ${className}
      `}
    >
      {/* Main heart icon */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      {children}

      {/* Heart 1 — top left large */}
      <div
        className="
          absolute top-[20%] left-[20%] w-[22px] -z-10
          transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)]
          drop-shadow-[0_0_0_#ff446600]
          group-hover:top-[-80%] group-hover:left-[-25%]
          group-hover:drop-shadow-[0_0_10px_#ff446688] group-hover:z-[2]
        "
      >
        <Heart />
      </div>

      {/* Heart 2 — top center-left */}
      <div
        className="
          absolute top-[45%] left-[45%] w-[14px] -z-10
          transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)]
          drop-shadow-[0_0_0_#ff446600]
          group-hover:top-[-30%] group-hover:left-[10%]
          group-hover:drop-shadow-[0_0_10px_#ff446688] group-hover:z-[2]
        "
      >
        <Heart />
      </div>

      {/* Heart 3 — bottom left small */}
      <div
        className="
          absolute top-[40%] left-[40%] w-[6px] -z-10
          transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)]
          drop-shadow-[0_0_0_#ff446600]
          group-hover:top-[60%] group-hover:left-[25%]
          group-hover:drop-shadow-[0_0_10px_#ff446688] group-hover:z-[2]
        "
      >
        <Heart />
      </div>

      {/* Heart 4 — right medium */}
      <div
        className="
          absolute top-[20%] left-[40%] w-[10px] -z-10
          transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)]
          drop-shadow-[0_0_0_#ff446600]
          group-hover:top-[30%] group-hover:left-[85%]
          group-hover:drop-shadow-[0_0_10px_#ff446688] group-hover:z-[2]
        "
      >
        <Heart />
      </div>

      {/* Heart 5 — far right */}
      <div
        className="
          absolute top-[25%] left-[45%] w-[16px] -z-10
          transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)]
          drop-shadow-[0_0_0_#ff446600]
          group-hover:top-[-20%] group-hover:left-[110%]
          group-hover:drop-shadow-[0_0_10px_#ff446688] group-hover:z-[2]
        "
      >
        <Heart />
      </div>

      {/* Heart 6 — top right small */}
      <div
        className="
          absolute top-[5%] left-[50%] w-[6px] -z-10
          transition-all duration-[800ms] ease-in-out
          drop-shadow-[0_0_0_#ff446600]
          group-hover:top-[-50%] group-hover:left-[70%]
          group-hover:drop-shadow-[0_0_10px_#ff446688] group-hover:z-[2]
        "
      >
        <Heart />
      </div>
    </a>
  );
}
