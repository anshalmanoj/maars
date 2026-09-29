import React from 'react';

interface MarsLogoProps {
  variant?: 'wordmark' | 'badge' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  inverted?: boolean;
}

export const MarsLogo: React.FC<MarsLogoProps> = ({
  variant = 'wordmark',
  size = 'md',
  className = '',
  inverted = false,
}) => {
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center bg-[#0a35e0] text-white rounded-2xl shadow-sm select-none transition-transform ${
          size === 'sm' ? 'p-3 w-16 h-16' : size === 'lg' ? 'p-8 w-44 h-44' : size === 'xl' ? 'p-12 w-64 h-64' : 'p-5 w-24 h-24'
        } ${className}`}
      >
        <span
          className={`font-black tracking-tight leading-none text-white ${
            size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-4xl' : size === 'xl' ? 'text-6xl' : 'text-2xl'
          }`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          MAARS<span className="text-[#93c5fd]">.</span>
        </span>
        <span
          className={`tracking-widest uppercase text-blue-200/90 font-medium ${
            size === 'sm' ? 'text-[8px] mt-1' : size === 'lg' ? 'text-xs mt-3' : size === 'xl' ? 'text-sm mt-4' : 'text-[9px] mt-1.5'
          }`}
        >
          ESTD 2026
        </span>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-[#0a35e0] text-white font-black rounded-xl select-none ${
          size === 'sm' ? 'w-8 h-8 text-sm' : size === 'lg' ? 'w-12 h-12 text-xl' : 'w-10 h-10 text-base'
        } ${className}`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        M.
      </div>
    );
  }

  // Default clean one-line wordmark adhering strictly to Top Bar Contract (single text element)
  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      <span
        className={`font-extrabold tracking-tight leading-none transition-colors ${
          inverted ? 'text-white' : 'text-neutral-900'
        } ${
          size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
        }`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        MAARS<span className="text-[#0a35e0]">.</span>
      </span>
      <span
        className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded ${
          inverted ? 'bg-white/15 text-blue-200' : 'bg-blue-50 text-[#0a35e0]'
        }`}
      >
        2026
      </span>
    </div>
  );
};
