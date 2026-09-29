import React from 'react';
import { ShieldCheck, CheckCircle2, Box, Award, Sparkles } from 'lucide-react';
import { MarsLogo } from './MarsLogo';

export const AuthenticityGuarantee: React.FC = () => {
  return (
    <section id="authenticity" className="py-16 md:py-24 bg-white border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Brand Badge & Guarantee Lockup */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-4 mb-6">
              <MarsLogo variant="badge" size="md" />
              <div>
                <span className="text-xs font-bold tracking-widest text-[#0a35e0] uppercase block">
                  The MAARS Standard
                </span>
                <h3 className="text-2xl font-black text-neutral-950" style={{ fontFamily: "'Syne', sans-serif" }}>
                  100% Deadstock Genuine.
                </h3>
              </div>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
              In an era flooded with grey-market replicas and second-rate unauthorized batches, MAARS stands as a sanctuary of absolute authenticity. Every pair in our vaults is sourced through authorized tier-1 wholesale allocations from Nike, Adidas, and Puma.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 w-full text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <Award size={16} className="text-[#0a35e0]" />
                <span>Verified Provenance Certificate</span>
              </div>
              <p className="text-neutral-500">
                Each shipment arrives with an individualized MAARS security seal, inspection certificate, and serial verification card.
              </p>
            </div>
          </div>

          {/* Right Column: 4-Point Multi-Stage Inspection Protocol */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#fafafc] border border-neutral-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0a35e0] flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Box & Barcode Radiance</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Packaging fonts, SKU label fonts, QR identifiers, and factory manufacturing stamps are digitally matched with official brand registries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fafafc] border border-neutral-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0a35e0] flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Material & Stitch Precision</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Suede nap consistency, full-grain leather density, double-stitched perimeter seams, and glue tolerances are audited under 10x magnification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fafafc] border border-neutral-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0a35e0] flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Sole Durometry & Weight</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Midsole cushioning compounds (Nike Air, Adidas Boost, Puma Nitro) are verified for authentic rebound compression and gram-accurate weight.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fafafc] border border-neutral-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0a35e0] flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Double-Boxed Delivery</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Original shoeboxes are shielded with 200lb-test corrugated outer shipping cartons with impact buffer corners to ensure collectors mint condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
