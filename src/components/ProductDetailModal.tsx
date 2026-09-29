import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, RotateCcw, Check, Ruler, Sparkles } from 'lucide-react';
import { ShoeProduct } from '../types';

interface ProductDetailModalProps {
  product: ShoeProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ShoeProduct, size: number, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: ShoeProduct) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      {/* Modal Container */}
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-950 transition-colors shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          {/* Left Column: Image Canvas */}
          <div className="md:col-span-6 bg-[#f4f5f7] p-6 sm:p-8 flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-neutral-400">
                {product.brand} Official Allocation
              </span>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/80 text-neutral-600 hover:bg-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="my-auto py-6 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[300px] w-full object-contain filter drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Authenticity Provenance Badge */}
            <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3 border border-neutral-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0a35e0] flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-neutral-900">Verified Authentic Pair</div>
                <div className="text-neutral-500">Inspected by MAARS Footwear lab · Style: {product.styleCode}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div className="space-y-5">
              {/* Category & Badge */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                <span className="font-bold text-[#0a35e0]">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.gender}</span>
              </div>

              {/* Title & Price */}
              <div>
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {product.name}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">{product.colorway}</p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-neutral-950 tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through tabular-nums">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-bold text-neutral-900">Select US Size</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-[#0a35e0] hover:underline font-semibold cursor-pointer"
                  >
                    <Ruler size={13} />
                    <span>Size Guide (US / UK / EU)</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#0a35e0] bg-blue-50 text-[#0a35e0] ring-1 ring-[#0a35e0]'
                          : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      US {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials & Tech specs */}
              <div className="pt-2 space-y-2 text-xs text-neutral-600 border-t border-neutral-100">
                <div className="font-bold text-neutral-900">Specifications:</div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Cushioning:</span>
                  <span className="font-medium text-neutral-800">{product.technology}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.materials.map((mat, i) => (
                    <span key={i} className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Buy & Action Controls */}
            <div className="pt-6 mt-6 border-t border-neutral-200/80 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    disabled={quantity >= 5}
                    className="px-3 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 hover:bg-[#0a35e0] text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={18} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-[#0a35e0]" />
                  <span>Ships in double-box</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw size={14} className="text-[#0a35e0]" />
                  <span>30-Day Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
