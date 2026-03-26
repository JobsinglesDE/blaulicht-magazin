import type { ReactNode } from 'react';

interface HeartButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const Heart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-auto" style={{ fill: '#ff4466' }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function HeartButton({ href, children, className = '' }: HeartButtonProps) {
  return (
    <a
      href={href}
      className={`heart-btn relative inline-flex items-center gap-3 px-9 py-4 text-lg font-bold text-white rounded-full border-[3px] border-[#429A45] bg-[#429A45] shadow-[0_0_0_#429a458c] transition-all duration-300 ease-in-out cursor-pointer hover:bg-transparent hover:text-[#429A45] hover:shadow-[0_0_25px_#429a458c] active:scale-95 ${className}`}
    >
      {/* Main heart icon */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      {children}

      <div className="heart-scatter hs-1" style={{ top: '20%', left: '20%', width: 22 }}><Heart /></div>
      <div className="heart-scatter hs-2" style={{ top: '45%', left: '45%', width: 14 }}><Heart /></div>
      <div className="heart-scatter hs-3" style={{ top: '40%', left: '40%', width: 6 }}><Heart /></div>
      <div className="heart-scatter hs-4" style={{ top: '20%', left: '40%', width: 10 }}><Heart /></div>
      <div className="heart-scatter hs-5" style={{ top: '25%', left: '45%', width: 16 }}><Heart /></div>
      <div className="heart-scatter hs-6" style={{ top: '5%', left: '50%', width: 6 }}><Heart /></div>
    </a>
  );
}
