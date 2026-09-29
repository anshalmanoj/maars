import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, X, Menu } from 'lucide-react';
import { MarsLogo } from './MarsLogo';
import { Brand } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectBrand: (brand: Brand | 'All') => void;
  selectedBrand: Brand | 'All';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectBrand,
  selectedBrand,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Slim Promotional Bar (<= 40px, dismissible) */}
      {showPromoBanner && (
        <div className="bg-[#0a35e0] text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2 tracking-wide">
            <span>Free Express Worldwide Dispatch On Orders Over $150</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span className="hidden sm:inline opacity-90">100% Deadstock Authentic Guarantee</span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectBrand('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="shrink-0 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-1"
        >
          <MarsLogo variant="wordmark" size="md" />
        </a>

        {/* Zone 2: 4-6 Clean text navigation links (single line) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-tight text-neutral-600">
          <button
            onClick={() => {
              onSelectBrand('All');
              onNavigateSection('catalog');
            }}
            className={`transition-colors hover:text-neutral-950 pb-0.5 whitespace-nowrap cursor-pointer ${
              selectedBrand === 'All' ? 'text-neutral-950 font-bold border-b-2 border-[#0a35e0]' : ''
            }`}
          >
            All Footwear
          </button>
          <button
            onClick={() => {
              onSelectBrand('Nike');
              onNavigateSection('catalog');
            }}
            className={`transition-colors hover:text-neutral-950 pb-0.5 whitespace-nowrap cursor-pointer ${
              selectedBrand === 'Nike' ? 'text-neutral-950 font-bold border-b-2 border-[#0a35e0]' : ''
            }`}
          >
            Nike
          </button>
          <button
            onClick={() => {
              onSelectBrand('Adidas');
              onNavigateSection('catalog');
            }}
            className={`transition-colors hover:text-neutral-950 pb-0.5 whitespace-nowrap cursor-pointer ${
              selectedBrand === 'Adidas' ? 'text-neutral-950 font-bold border-b-2 border-[#0a35e0]' : ''
            }`}
          >
            Adidas
          </button>
          <button
            onClick={() => {
              onSelectBrand('Puma');
              onNavigateSection('catalog');
            }}
            className={`transition-colors hover:text-neutral-950 pb-0.5 whitespace-nowrap cursor-pointer ${
              selectedBrand === 'Puma' ? 'text-neutral-950 font-bold border-b-2 border-[#0a35e0]' : ''
            }`}
          >
            Puma
          </button>
          <button
            onClick={() => onNavigateSection('authenticity')}
            className="transition-colors hover:text-neutral-950 whitespace-nowrap cursor-pointer text-neutral-500 hover:text-neutral-800"
          >
            Authenticity
          </button>
          <button
            onClick={() => onNavigateSection('lookbook')}
            className="transition-colors hover:text-neutral-950 whitespace-nowrap cursor-pointer text-neutral-500 hover:text-neutral-800"
          >
            Lookbook
          </button>
        </nav>

        {/* Zone 3: 1-2 primary functional actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Expandable or interactive search button */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1.5 border border-neutral-300 transition-all w-48 sm:w-64">
                <Search size={16} className="text-neutral-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search Nike, Samba, Palermo..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none text-xs sm:text-sm text-neutral-900 focus:outline-none w-full"
                />
                <button
                  onClick={() => {
                    onSearchChange('');
                    setShowSearchInput(false);
                  }}
                  className="text-neutral-400 hover:text-neutral-700 ml-1 p-0.5 cursor-pointer"
                  aria-label="Clear and close search"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Search sneakers"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-neutral-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Primary Action */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-neutral-950 text-white hover:bg-neutral-800 px-4 py-2.5 rounded-full transition-all text-xs font-semibold tracking-tight shadow-sm cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#0a35e0] text-white text-[11px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-neutral-800 hover:bg-neutral-100 rounded-lg cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => {
                onSelectBrand('All');
                setMobileMenuOpen(false);
                onNavigateSection('catalog');
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                selectedBrand === 'All' ? 'bg-blue-50 text-[#0a35e0] font-bold' : 'text-neutral-700'
              }`}
            >
              All Footwear
            </button>
            <button
              onClick={() => {
                onSelectBrand('Nike');
                setMobileMenuOpen(false);
                onNavigateSection('catalog');
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                selectedBrand === 'Nike' ? 'bg-blue-50 text-[#0a35e0] font-bold' : 'text-neutral-700'
              }`}
            >
              Nike
            </button>
            <button
              onClick={() => {
                onSelectBrand('Adidas');
                setMobileMenuOpen(false);
                onNavigateSection('catalog');
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                selectedBrand === 'Adidas' ? 'bg-blue-50 text-[#0a35e0] font-bold' : 'text-neutral-700'
              }`}
            >
              Adidas
            </button>
            <button
              onClick={() => {
                onSelectBrand('Puma');
                setMobileMenuOpen(false);
                onNavigateSection('catalog');
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                selectedBrand === 'Puma' ? 'bg-blue-50 text-[#0a35e0] font-bold' : 'text-neutral-700'
              }`}
            >
              Puma
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('authenticity');
              }}
              className="text-left px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-50"
            >
              Authenticity Standards
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('lookbook');
              }}
              className="text-left px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-50"
            >
              Lookbook & Styling
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
