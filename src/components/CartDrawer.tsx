'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, Tag, Clock, Zap, ChevronRight, ShoppingBag, Loader } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_COST = 99;

const VALID_COUPONS: Record<string, { discount: number; label: string }> = {
  DERM10: { discount: 0.10, label: '10% off' },
  DERM20: { discount: 0.20, label: '20% off' },
  FIRST15: { discount: 0.15, label: '15% off — First Order' },
};

const RECOMMENDED_PRODUCTS = [
  {
    id: 'rec-1',
    name: 'Glow & Protect Combo',
    price: 699,
    originalPrice: 898,
    discount: '22% off',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.37.21%20PM-fBBWX6rROuYBckCDBcU6LKhKurrMwM.jpeg',
  },
  {
    id: 'rec-2',
    name: 'Moisture Seal',
    price: 499,
    originalPrice: 699,
    discount: '28% off',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-kUIHppKWQEU9GwBDcUpbA7mojFfjUH.jpeg',
  },
];

function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 4, seconds: 21 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-accent/10 border-b border-brand-accent/20 px-4 py-2.5 flex items-center justify-between gap-2 text-[12px]">
      <div className="flex items-center gap-2">
        <Clock size={13} strokeWidth={2} className="text-brand-accent shrink-0" />
        <p className="font-semibold text-foreground">Buy before stock ends</p>
      </div>
      <div className="flex items-center gap-1 bg-white rounded px-1.5 py-0.5">
        <span className="font-bold text-foreground">{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span className="text-muted">:</span>
        <span className="font-bold text-foreground">{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    </div>
  );
}

function CartItem({ item, onRemove, onUpdateQty }: any) {
  return (
    <div className="flex gap-3 p-4 border-b border-slate-100">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-[12px] font-bold text-foreground line-clamp-2">{item.name}</p>
          <p className="text-[11px] text-muted">₹{item.price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 border border-slate-200 rounded">
            <button onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))} className="p-1 hover:bg-slate-50">
              <Minus size={12} />
            </button>
            <span className="w-5 text-center text-[11px] font-bold">{item.quantity}</span>
            <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="p-1 hover:bg-slate-50">
              <Plus size={12} />
            </button>
          </div>
          <button onClick={() => onRemove(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function RecommendedProducts({ addToCart }: any) {
  return (
    <div className="px-4 py-3 border-b border-slate-100">
      <p className="text-[11px] font-bold tracking-wider uppercase text-foreground mb-3">Recommended</p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {RECOMMENDED_PRODUCTS.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-32 border border-slate-200 rounded-lg p-2 hover:border-brand-accent transition-colors">
            <div className="relative w-full aspect-square rounded mb-2 overflow-hidden bg-slate-100">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              <div className="absolute top-1 right-1 bg-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                {product.discount}
              </div>
            </div>
            <p className="text-[10px] font-bold text-foreground line-clamp-2 mb-1">{product.name}</p>
            <p className="text-[10px] font-bold text-brand-accent">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full mt-2 text-[10px] font-bold border border-brand-accent text-brand-accent px-2 py-1.5 rounded hover:bg-brand-accent hover:text-white transition-colors"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, addToCart } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon].discount : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (VALID_COUPONS[couponCode.toUpperCase()]) {
      setAppliedCoupon(couponCode.toUpperCase());
      setCouponCode('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-[75]" onClick={closeCart} />

      {/* Cart Drawer - Fixed Layout */}
      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 z-[80] bg-white flex flex-col shadow-xl overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
          <p className="text-[13px] font-bold tracking-wider uppercase">Your Bag ({items.length})</p>
          <button onClick={closeCart} className="p-1 hover:bg-slate-100 rounded">
            <X size={18} />
          </button>
        </div>

        {/* Urgency Banner - Fixed */}
        {items.length > 0 && <UrgencyBanner />}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center">
              <ShoppingBag size={32} className="text-slate-300 mb-3" />
              <p className="text-[13px] font-semibold text-foreground mb-1">Your bag is empty</p>
              <p className="text-[12px] text-muted">Add products to get started</p>
              <button
                onClick={closeCart}
                className="mt-4 px-6 py-2 bg-brand-accent text-white rounded-lg text-[11px] font-bold hover:opacity-90"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQty={updateQty}
                />
              ))}

              {/* Social Proof Banner */}
              <div className="bg-brand-accent text-white px-4 py-3 my-2 mx-4 rounded-lg flex items-center justify-center gap-2">
                <Zap size={14} strokeWidth={2} />
                <p className="text-[12px] font-bold">87% of People saw noticeable results</p>
              </div>

              {/* Recommended Products */}
              <RecommendedProducts addToCart={addToCart} />
            </>
          )}
        </div>

        {/* Footer - Fixed */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 bg-white p-4 space-y-3">
            {/* Coupon Section */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 rounded text-[12px] focus:outline-none focus:border-brand-accent"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-foreground text-white rounded text-[11px] font-bold hover:opacity-90"
              >
                Apply
              </button>
            </div>

            {/* Free Shipping Message */}
            {subtotal >= FREE_SHIPPING_THRESHOLD && (
              <p className="text-[11px] text-emerald-600 font-bold">You qualify for free shipping!</p>
            )}

            {/* Pricing Breakdown */}
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600">
                  <span>{VALID_COUPONS[appliedCoupon].label}</span>
                  <span>-₹{Math.round(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-600 font-bold' : 'font-bold'}>
                  {shipping === 0 ? 'Free' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-[13px]">
                <span>Total</span>
                <span className="text-brand-accent">₹{Math.round(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full py-3 bg-brand-accent text-white rounded-lg font-bold text-[13px] hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </button>

            {/* Trust Badge */}
            <p className="text-[10px] text-center text-muted">100% Secure Payment Protected</p>
          </div>
        )}
      </div>
    </>
  );
}
