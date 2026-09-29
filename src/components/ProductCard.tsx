import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { ShoeProduct } from '../types';

interface ProductCardProps {
  product: ShoeProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
  onQuickAdd: (product: ShoeProduct, size: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<number>(product.sizes[2] || product.sizes[0]);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedQuickSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Visual Product Canvas */}
      <div className="relative w-full aspect-4/3 bg-[#f5f6f8] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle Brand Watermark inside card for aesthetic depth */}
        <div className="absolute top-3 left-3 text-[11px] font-bold tracking-wider uppercase text-neutral-400">
          {product.brand}
        </div>

        {/* Wishlist button affordance */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 text-neutral-500 hover:text-neutral-900 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Product Image with Fallback */}
        <img
          src={product.image}
          alt={`${product.brand} ${product.name} - ${product.colorway}`}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain object-center transform transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Fallback skeleton if loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center">
            <span className="text-xs font-semibold text-neutral-400">{product.name}</span>
          </div>
        )}

        {/* Quick Add Overlay on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-between bg-white/95 backdrop-blur-md rounded-xl p-1.5 shadow-sm border border-neutral-200/60">
          <div className="flex items-center gap-1 overflow-x-auto px-1 max-w-[170px] no-scrollbar">
            <span className="text-[10px] text-neutral-500 font-medium uppercase mr-1">US:</span>
            {product.sizes.slice(0, 4).map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQuickSize(sz);
                }}
                className={`text-[11px] font-semibold px-1.5 py-0.5 rounded cursor-pointer ${
                  selectedQuickSize === sz
                    ? 'bg-[#0a35e0] text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <button
            onClick={handleQuickAddClick}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={13} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={13} />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.gender}</span>
            {product.badge && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#0a35e0] font-semibold">{product.badge}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-neutral-900 mt-1.5 group-hover:text-[#0a35e0] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Colorway Subtitle */}
          <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
            {product.colorway}
          </p>
        </div>

        {/* Pricing & Stock Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-950 tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Clean stock status note */}
          <span className="text-[11px] text-neutral-500 font-medium">
            {product.stockCount <= 5 ? (
              <span className="text-amber-700 font-semibold">{product.stockCount} left</span>
            ) : (
              <span>In Stock</span>
            )}
          </span>
        </div>
      </div>
    </article>
  );
};
