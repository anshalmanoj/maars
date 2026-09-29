import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, Sparkles, Printer } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  appliedPromo: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  appliedPromo,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'apple_pay'>('card');
  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 382-9901',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    postalCode: '10012',
    country: 'United States',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '•••',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shipping = subtotal >= freeShippingThreshold || appliedPromo === 'FREESHIP' ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = `MARS-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId: randomId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: cartItems.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          size: item.selectedSize,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        subtotal,
        discount: discountAmount,
        shipping,
        total,
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod,
        estimatedDelivery: '3 - 5 Business Days via Express Air Courier',
        status: 'Confirmed',
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X size={18} />
        </button>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0a35e0] tracking-widest uppercase">
                Order Confirmed
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-neutral-950"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {completedOrder.orderId}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                Thank you for your order at MAARS. A confirmation email with live tracking details has been sent to{' '}
                <span className="font-semibold text-neutral-900">{completedOrder.shippingAddress.email}</span>.
              </p>
            </div>

            {/* Tracking Progress */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900">Shipment Status:</span>
                <span className="bg-blue-100 text-[#0a35e0] font-bold px-2.5 py-0.5 rounded-full">
                  Preparing Physical Inspection
                </span>
              </div>
              <div className="text-xs text-neutral-600 flex items-center gap-1.5">
                <Truck size={14} className="text-[#0a35e0]" />
                <span>Estimated Delivery: {completedOrder.estimatedDelivery}</span>
              </div>
              <div className="text-xs text-neutral-500">
                Deliver to: {completedOrder.shippingAddress.fullName}, {completedOrder.shippingAddress.address},{' '}
                {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.country}
              </div>
            </div>

            {/* Itemized Recap */}
            <div className="border border-neutral-200 rounded-2xl p-4 text-left divide-y divide-neutral-100 max-h-48 overflow-y-auto">
              {completedOrder.items.map((it, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={it.image} alt={it.name} className="w-10 h-10 object-contain rounded bg-neutral-100 p-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900">{it.name}</div>
                      <div className="text-neutral-500">
                        {it.brand} · US {it.size} · Qty {it.quantity}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold tabular-nums text-neutral-950">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="flex justify-between items-center bg-blue-50/70 p-4 rounded-xl text-sm">
              <span className="font-bold text-neutral-900">Total Paid</span>
              <span className="font-extrabold text-[#0a35e0] text-lg tabular-nums">
                ${completedOrder.total.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="bg-[#0a35e0] hover:bg-[#082cb8] text-white px-6 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0a35e0]">
                Express Secure Checkout
              </span>
              <h2
                className="text-2xl font-black text-neutral-950 mt-0.5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Delivery & Payment
              </h2>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                1. Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0a35e0]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0a35e0]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0a35e0]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">City & Postal Code</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0a35e0]"
                    />
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0a35e0]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                2. Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#0a35e0] bg-blue-50/50 text-[#0a35e0] ring-1 ring-[#0a35e0]'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <CreditCard size={18} />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#0a35e0] bg-blue-50/50 text-[#0a35e0] ring-1 ring-[#0a35e0]'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <Banknote size={18} />
                  <span>Cash On Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#0a35e0] bg-blue-50/50 text-[#0a35e0] ring-1 ring-[#0a35e0]'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <Sparkles size={18} />
                  <span>Digital Wallet (Apple/Google)</span>
                </button>
              </div>

              {/* Card input if credit card selected */}
              {paymentMethod === 'card' && (
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
                  <div>
                    <label className="block text-neutral-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue={formData.cardNumber}
                      className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-500 mb-1">Expiration</label>
                      <input
                        type="text"
                        defaultValue={formData.cardExp}
                        className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        defaultValue={formData.cardCvc}
                        className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                  Pay with cash upon package receipt. Please prepare exact currency for the courier at delivery time.
                </div>
              )}
            </div>

            {/* Total recap and submit button */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center justify-between text-sm font-bold text-neutral-900">
                <span>Final Order Total</span>
                <span className="text-lg text-[#0a35e0] tabular-nums">${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0a35e0] hover:bg-[#082cb8] disabled:opacity-50 text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Verification...</span>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Confirm & Place Order (${total.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-neutral-500">
                256-Bit Encrypted Checkout · 30-Day Money Back Guarantee
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
