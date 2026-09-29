import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import adidasTerraceImg from '../assets/images/adidas_samba_terrace_1790693024380.jpg';
import nikeDunkHighImg from '../assets/images/nike_dunk_high_sneaker_1790691748960.jpg';
import pumaLifestyleImg from '../assets/images/puma_lifestyle_sneaker_1790691713926.jpg';

interface LookbookSectionProps {
  onSelectProductById: (productId: string) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onSelectProductById }) => {
  const looks = [
    {
      id: 'adidas-samba-og-cloud',
      title: 'Terrace Elegance',
      subtitle: 'Adidas Samba OG with Pleated Chinos & Wool Overshirt',
      photographer: 'MAARS Studio / Berlin',
      image: adidasTerraceImg,
      tags: ['Terrace Culture', 'Minimalist Neutral'],
    },
    {
      id: 'nike-dunk-high-retro',
      title: 'Court Monolith',
      subtitle: 'Nike Air High Court with Heavyweight Denim & Shell Parka',
      photographer: 'MAARS Studio / Tokyo',
      image: nikeDunkHighImg,
      tags: ['Basketball Heritage', 'High-Top Form'],
    },
    {
      id: 'puma-palermo-pristine',
      title: 'Archive Leisure',
      subtitle: 'Puma Palermo Suede with Raw Canvas Shorts & Knit Polo',
      photographer: 'MAARS Studio / Milan',
      image: pumaLifestyleImg,
      tags: ['Continental Chic', 'Low Profile'],
    },
  ];

  return (
    <section id="lookbook" className="py-16 md:py-20 bg-[#f9fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              <span className="text-[#0a35e0] font-bold">Editorial Series</span>
              <span aria-hidden="true">·</span>
              <span>2026 Volume 1</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black text-neutral-950 mt-1.5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Streetwear &amp; Silhouette Styling
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md">
            Footwear curated through architectural proportions. Discover how iconic drops from Nike, Adidas, and Puma pair with modern tailoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {looks.map((look) => (
            <div
              key={look.id}
              onClick={() => onSelectProductById(look.id)}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden p-6 flex items-center justify-center">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-900 group-hover:bg-[#0a35e0] group-hover:text-white transition-colors shadow-xs">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                  <span>{look.photographer}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-950 group-hover:text-[#0a35e0] transition-colors">
                  {look.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {look.subtitle}
                </p>
                <div className="pt-2 text-xs font-bold text-[#0a35e0] flex items-center gap-1">
                  <span>Shop This Footwear</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
