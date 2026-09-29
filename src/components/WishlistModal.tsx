import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { ShoeProduct } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: ShoeProduct[];
  onRemoveFromWishlist: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl p-6 sm:p-8 border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
          aria-label="Close wishlist"
        >
          <X size={18} />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-rose-600" fill="currentColor" />
            <h2 className="text-xl font-bold text-neutral-900" style={{ fontFamily: "'Syne', sans-serif" }}>
              Saved Footwear ({wishlist.length})
            </h2>
          </div>

          {wishlist.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-neutral-800">Your wishlist is currently empty</p>
              <p className="text-xs text-neutral-500">
                Click the heart icon on any Nike, Adidas, or Puma sneaker to save it to your wishlist.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto divide-y divide-neutral-100 pr-1">
              {wishlist.map((product) => (
                <div key={product.id} className="pt-3 flex items-center justify-between gap-3">
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="flex items-center gap-3 cursor-pointer group flex-1"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-contain bg-[#f5f6f8] rounded-xl p-1 border border-neutral-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0a35e0] transition-colors line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {product.brand} · ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="bg-neutral-900 hover:bg-[#0a35e0] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
