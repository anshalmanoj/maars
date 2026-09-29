import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: number, newQty: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  discountAmount,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const shippingCost = subtotal >= freeShippingThreshold || appliedPromo === 'FREESHIP' ? 0 : (subtotal > 0 ? 15 : 0);
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim());
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Slide-over panel */}
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#0a35e0]" />
            <h2 className="text-lg font-bold text-neutral-900" style={{ fontFamily: "'Syne', sans-serif" }}>
              Your Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Gauge */}
        <div className="bg-blue-50/60 px-5 py-3 border-b border-blue-100">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-1.5">
            {remainingForFreeShipping === 0 || appliedPromo === 'FREESHIP' ? (
              <span className="text-[#0a35e0] flex items-center gap-1">
                <Sparkles size={14} /> You have unlocked FREE Express Shipping!
              </span>
            ) : (
              <span>Add ${remainingForFreeShipping.toFixed(2)} more for Free Express Shipping</span>
            )}
            <span className="tabular-nums text-neutral-500">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-blue-200/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#0a35e0] h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingBag size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-900">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Explore our curated inventory of Nike, Adidas, and Puma authentic footwear releases.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 bg-[#0a35e0] hover:bg-[#082cb8] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/70"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-neutral-200/80 p-1 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1 cursor-pointer shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
                      <span>{item.product.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-neutral-800">US {item.selectedSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-200 rounded-lg bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-neutral-950 tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-white space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. MARS10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    className="w-full bg-neutral-100 rounded-xl pl-8 pr-3 py-2 text-xs border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#0a35e0] uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {promoMessage && (
                <div className={`text-[11px] font-medium ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {promoMessage.text}
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({appliedPromo})</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Estimated Shipping</span>
                <span className="tabular-nums font-medium text-neutral-900">
                  {shippingCost === 0 ? <span className="text-[#0a35e0] font-bold">FREE</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span className="tabular-nums text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 py-1">
              <ShieldCheck size={14} className="text-[#0a35e0]" />
              <span>Double-boxed & 100% Guaranteed Authentic</span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#0a35e0] hover:bg-[#082cb8] text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
