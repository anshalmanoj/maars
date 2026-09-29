import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Brand } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBrand?: Brand;
}

interface SizeRow {
  usMen: number;
  usWomen: number;
  uk: number;
  eu: number;
  cm: number;
}

const SIZES_DATA: SizeRow[] = [
  { usMen: 7.0, usWomen: 8.5, uk: 6.0, eu: 40.0, cm: 25.0 },
  { usMen: 7.5, usWomen: 9.0, uk: 6.5, eu: 40.5, cm: 25.5 },
  { usMen: 8.0, usWomen: 9.5, uk: 7.0, eu: 41.0, cm: 26.0 },
  { usMen: 8.5, usWomen: 10.0, uk: 7.5, eu: 42.0, cm: 26.5 },
  { usMen: 9.0, usWomen: 10.5, uk: 8.0, eu: 42.5, cm: 27.0 },
  { usMen: 9.5, usWomen: 11.0, uk: 8.5, eu: 43.0, cm: 27.5 },
  { usMen: 10.0, usWomen: 11.5, uk: 9.0, eu: 44.0, cm: 28.0 },
  { usMen: 10.5, usWomen: 12.0, uk: 9.5, eu: 44.5, cm: 28.5 },
  { usMen: 11.0, usWomen: 12.5, uk: 10.0, eu: 45.0, cm: 29.0 },
  { usMen: 11.5, usWomen: 13.0, uk: 10.5, eu: 45.5, cm: 29.5 },
  { usMen: 12.0, usWomen: 13.5, uk: 11.0, eu: 46.0, cm: 30.0 },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, defaultBrand = 'Nike' }) => {
  if (!isOpen) return null;

  const [activeBrand, setActiveBrand] = useState<Brand>(defaultBrand);
  const [selectedFootCm, setSelectedFootCm] = useState<number>(27.0);

  const matchedSize = SIZES_DATA.find((s) => s.cm === selectedFootCm) || SIZES_DATA[4];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl p-6 sm:p-8 border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
          aria-label="Close size guide"
        >
          <X size={18} />
        </button>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0a35e0]">
              Fit & Sizing Architecture
            </span>
            <h2 className="text-2xl font-black text-neutral-950 mt-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>
              Universal Size Converter
            </h2>
            <p className="text-xs text-neutral-500">
              Cross-reference official conversion charts calibrated specifically for Nike, Adidas, and Puma footwear.
            </p>
          </div>

          {/* Brand Switcher */}
          <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-xl">
            {(['Nike', 'Adidas', 'Puma'] as Brand[]).map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeBrand === brand ? 'bg-white text-[#0a35e0] shadow-xs' : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Brand Fit Advisory Note */}
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 text-xs text-neutral-700 leading-relaxed">
            <span className="font-bold text-[#0a35e0] mr-1">{activeBrand} Fit Profile:</span>
            {activeBrand === 'Nike' && 'Dunks and Air Max models typically fit true to size. For wide feet, consider going a half size (+0.5 US) up for comfort.'}
            {activeBrand === 'Adidas' && 'Samba and Gazelle terrace shoes run true to size with a snug forefoot profile. Ultraboost fits like a sock.'}
            {activeBrand === 'Puma' && 'Palermo and Suede run true to size. High arch support with plush collar padding for natural fit.'}
          </div>

          {/* Quick interactive recommended size finder */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <label className="block text-xs font-bold text-neutral-800 mb-2">
              Select Foot Length (Centimeters): <span className="text-[#0a35e0]">{selectedFootCm} cm</span>
            </label>
            <input
              type="range"
              min="25.0"
              max="30.0"
              step="0.5"
              value={selectedFootCm}
              onChange={(e) => setSelectedFootCm(parseFloat(e.target.value))}
              className="w-full accent-[#0a35e0] cursor-pointer"
            />
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-neutral-200">
              <span className="text-neutral-500">Your Recommended Size:</span>
              <div className="font-extrabold text-neutral-900 flex items-center gap-3">
                <span className="text-[#0a35e0] text-sm">US {matchedSize.usMen} (Men)</span>
                <span className="text-neutral-400">/</span>
                <span>US {matchedSize.usWomen} (Women)</span>
                <span className="text-neutral-400">/</span>
                <span>EU {matchedSize.eu}</span>
              </div>
            </div>
          </div>

          {/* Full Tabular Grid */}
          <div className="max-h-52 overflow-y-auto border border-neutral-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-neutral-100 text-neutral-700 font-bold sticky top-0">
                <tr>
                  <th className="py-2 px-3">US Men</th>
                  <th className="py-2 px-3">US Women</th>
                  <th className="py-2 px-3">UK</th>
                  <th className="py-2 px-3">EU</th>
                  <th className="py-2 px-3">CM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono tabular-nums">
                {SIZES_DATA.map((row) => (
                  <tr
                    key={row.cm}
                    className={`hover:bg-neutral-50 transition-colors ${
                      row.cm === selectedFootCm ? 'bg-blue-50 font-bold text-[#0a35e0]' : 'text-neutral-800'
                    }`}
                  >
                    <td className="py-1.5 px-3">{row.usMen.toFixed(1)}</td>
                    <td className="py-1.5 px-3">{row.usWomen.toFixed(1)}</td>
                    <td className="py-1.5 px-3">{row.uk.toFixed(1)}</td>
                    <td className="py-1.5 px-3">{row.eu.toFixed(1)}</td>
                    <td className="py-1.5 px-3">{row.cm.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer"
          >
            Got It, Back to Shoe
          </button>
        </div>
      </div>
    </div>
  );
};
