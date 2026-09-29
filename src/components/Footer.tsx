import React, { useState } from 'react';
import { MarsLogo } from './MarsLogo';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Brand } from '../types';

interface FooterProps {
  onSelectBrand: (brand: Brand | 'All') => void;
  onOpenSizeGuide: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectBrand,
  onOpenSizeGuide,
  onNavigateSection,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Tier: Brand Statement & Drop Alert Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-900 items-start">
          <div className="lg:col-span-6 space-y-4">
            <MarsLogo variant="wordmark" size="lg" inverted />
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed font-normal">
              MAARS is an authorized destination for curated footwear. Connecting discerning sneaker enthusiasts with authenticated Nike, Adidas, and Puma releases worldwide.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#0a35e0]" /> 100% Genuine
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#0a35e0]" /> Global Express
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw size={14} className="text-[#0a35e0]" /> 30-Day Returns
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              VIP Release Notifications
            </span>
            <p className="text-xs text-neutral-400">
              Receive instant alerts for limited Nike Dunks, Adidas terrace restocks, and Puma archive collaborations.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-blue-950/60 border border-blue-800/80 rounded-xl text-xs text-blue-200 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#93c5fd]" />
                <span>You are on the priority release roster. Watch your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#0a35e0] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#0a35e0] hover:bg-[#082cb8] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Footwear Brands</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectBrand('Nike')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nike Footwear & Dunk Retro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectBrand('Adidas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Adidas Originals & Samba OG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectBrand('Puma')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Puma Palermo & Suede Classic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectBrand('All')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Curated Silhouettes
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Universal Size Guide (US/UK/EU)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('authenticity')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Physical Authentication Protocol
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Express Shipping & Tracking
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Cash on Delivery Terms
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Editorial & Store</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('lookbook')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lookbook 2026 Volume 1
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Flagship Showroom / Soho NYC
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Deadstock Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Sustainability & Recycled Packs
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Flagship Showroom</h4>
            <div className="space-y-1 text-neutral-400">
              <p className="font-semibold text-neutral-200">MAARS. Gallery</p>
              <p>482 Broome Street, Soho</p>
              <p>New York, NY 10013</p>
              <p className="pt-2 text-[11px] text-neutral-500">Mon - Sat: 11:00 AM – 7:30 PM EST</p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Quiet Copyright & Payment Methods */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © 2026 MAARS. All rights reserved. Authorized retailer for Nike, Adidas, and Puma.
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-neutral-900 text-neutral-400 px-2 py-1 rounded text-[10px] font-semibold border border-neutral-800">
              VISA
            </span>
            <span className="bg-neutral-900 text-neutral-400 px-2 py-1 rounded text-[10px] font-semibold border border-neutral-800">
              MASTERCARD
            </span>
            <span className="bg-neutral-900 text-neutral-400 px-2 py-1 rounded text-[10px] font-semibold border border-neutral-800">
              APPLE PAY
            </span>
            <span className="bg-neutral-900 text-neutral-400 px-2 py-1 rounded text-[10px] font-semibold border border-neutral-800">
              CASH ON DELIVERY (COD)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
