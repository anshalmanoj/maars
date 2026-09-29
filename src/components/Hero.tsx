import React from 'react';
import { ArrowRight, ShieldCheck, Zap, RotateCcw } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { Brand } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onBrandClick: (brand: Brand) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBrandClick }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & Direct Entry */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Quiet unboxed text metadata separator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 tracking-wider uppercase">
              <span className="text-[#0a35e0] font-bold">Authorized Retailer</span>
              <span aria-hidden="true">·</span>
              <span>Nike</span>
              <span aria-hidden="true">·</span>
              <span>Adidas</span>
              <span aria-hidden="true">·</span>
              <span>Puma</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 leading-[1.08] text-balance"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Curated Footwear Architecture.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
              MAARS is an authorized destination for iconic silhouettes and limited drops. 
              From terrace classics to performance track dynamos, every pair is certified authentic, 
              double-boxed, and dispatched worldwide.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 bg-[#0a35e0] hover:bg-[#082cb8] text-white px-6 py-3.5 rounded-full text-sm font-bold tracking-tight shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>Shop Catalog</span>
                <ArrowRight size={17} />
              </button>

              <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-full border border-neutral-200/80">
                <button
                  onClick={() => onBrandClick('Nike')}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-full text-neutral-800 hover:bg-white hover:shadow-xs transition-all cursor-pointer"
                >
                  Nike
                </button>
                <button
                  onClick={() => onBrandClick('Adidas')}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-full text-neutral-800 hover:bg-white hover:shadow-xs transition-all cursor-pointer"
                >
                  Adidas
                </button>
                <button
                  onClick={() => onBrandClick('Puma')}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-full text-neutral-800 hover:bg-white hover:shadow-xs transition-all cursor-pointer"
                >
                  Puma
                </button>
              </div>
            </div>

            {/* Trust points - clean unboxed metadata */}
            <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-neutral-900 font-bold text-sm">
                  <ShieldCheck size={16} className="text-[#0a35e0]" />
                  <span>100% Genuine</span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">Physical authentication</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-neutral-900 font-bold text-sm">
                  <Zap size={16} className="text-[#0a35e0]" />
                  <span>Express Dispatch</span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">Same-day packaging</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-neutral-900 font-bold text-sm">
                  <RotateCcw size={16} className="text-[#0a35e0]" />
                  <span>30-Day Returns</span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">Simple size exchange</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor with Zero-Broken-Image fallback */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden bg-neutral-950 aspect-16/10 shadow-xl border border-neutral-900">
              <img
                src={HERO_IMAGE}
                alt="MAARS Footwear Campaign - Next Gen Athletic Silhouettes"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              {/* Subtle editorial scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating editorial caption */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-blue-300">
                    Series 2026 Drops
                  </div>
                  <div className="text-lg sm:text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Street & Performance Footwear
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs text-neutral-300 font-medium bg-neutral-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  Global Release
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
