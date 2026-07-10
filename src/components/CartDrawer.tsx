'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Minus,
  Plus,
  Trash2,
  Tag,
  Clock,
  Zap,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 999;
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
    <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Clock size={14} strokeWidth={2} className="text-emerald-600" />
          <p className="text-[11px] sm:text-[12px] font-semibold text-foreground">
            Buy before products go out of stock
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded px-2 py-1 border border-emerald-200">
          <span className="text-[10px] sm:text-[11px] font-bold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span className="text-muted">:</span>
          <span className="text-[10px] sm:text-[11px] font-bold">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </div>
    </div>
  );
}

function SocialProofBanner() {
  return (
    <div className="bg-brand-accent text-white px-5 py-3">
      <div className="flex items-center justify-center gap-2">
        <Zap size={14} strokeWidth={2} />
        <p className="text-[12px] sm:text-[13px] font-bold">87% of People saw noticeable results</p>
      </div>
    </div>
  );
}

function RecommendedProducts({ onAddToCart }: { onAddToCart: (product: any) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-5 py-4 border-t border-slate-200">
      <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-foreground mb-4">Recommended Products</h3>
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth hide-scrollbar"
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {RECOMMENDED_PRODUCTS.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-32 border border-slate-200 rounded-lg p-3 hover:border-brand-accent transition-colors">
            <div className="relative w-full h-20 rounded-md overflow-hidden bg-slate-100 mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="128px"
              />
              <div className="absolute top-1 right-1 bg-emerald-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                {product.discount}
              </div>
            </div>
            <p className="text-[10px] font-semibold text-foreground line-clamp-2 mb-2">{product.name}</p>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[11px] font-bold text-foreground">₹{product.price}</span>
              <span className="text-[8px] text-muted line-through">₹{product.originalPrice}</span>
            </div>
            <button
              onClick={() => onAddToCart(product)}
              className="w-full text-[9px] font-bold border border-foreground text-foreground py-1 rounded hover:bg-foreground hover:text-white transition-colors"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartItemRow({ id, name, price, quantity, image, alt, onRemove, onQuantityChange }: any) {
  return (
    <div className="flex gap-3 py-4 border-b border-slate-100 last:border-b-0">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
        <Image src={image} alt={alt} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-[13px] font-semibold text-foreground line-clamp-2">{name}</p>
          <p className="text-[12px] font-bold text-brand-accent mt-1">₹{price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-slate-200 rounded-lg">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              className="p-1 hover:bg-slate-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} strokeWidth={2} />
            </button>
            <span className="px-3 text-[12px] font-bold min-w-8 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="p-1 hover:bg-slate-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>
          <button
            onClick={() => onRemove()}
            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
        <ShoppingBag size={24} strokeWidth={1.5} className="text-slate-400" />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-foreground mb-1">Your bag is empty</p>
        <p className="text-[12px] text-muted">Add products to get started</p>
      </div>
      <button
        onClick={onClose}
        className="mt-2 inline-flex items-center gap-2 bg-foreground text-white text-[11px] tracking-[0.1em] uppercase font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
      >
        Continue Shopping
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, addToCart } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon].discount : 0;
  const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (VALID_COUPONS[couponInput.toUpperCase()]) {
      setAppliedCoupon(couponInput.toUpperCase());
      setCouponInput('');
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[60] transition-opacity duration-300"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70]
                    w-full min-w-[300px] sm:w-[400px] md:w-[450px]
                    bg-white flex flex-col
                    shadow-[-8px_0_40px_rgba(0,0,0,0.15)]
                    transition-transform duration-[380ms]
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-[14px] sm:text-[16px] font-bold tracking-tight">
            Your Bag ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-1 text-slate-400 hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Banners - only show if cart has items */}
        {items.length > 0 && (
          <>
            <UrgencyBanner />
            <SocialProofBanner />
          </>
        )}

        {/* Main content */}
        {items.length === 0 ? (
          <EmptyCart onClose={closeCart} />
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  {...item}
                  onRemove={() => removeItem(item.id)}
                  onQuantityChange={(qty: number) => {
                    if (qty > 0) updateQty(item.id, qty);
                    else removeItem(item.id);
                  }}
                />
              ))}
            </div>

            {/* Recommended Products */}
            <RecommendedProducts onAddToCart={addToCart} />

            {/* Coupon & Summary */}
            <div className="px-5 py-4 border-t border-slate-200 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded text-[12px] placeholder-slate-400 focus:outline-none focus:border-brand-accent"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-foreground text-white text-[11px] font-bold rounded hover:opacity-90 transition-opacity"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="bg-emerald-50 border border-emerald-200 rounded p-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700">
                    {VALID_COUPONS[appliedCoupon].label} applied
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {subtotal >= FREE_SHIPPING_THRESHOLD && (
                <div className="bg-emerald-50 border border-emerald-200 rounded p-2">
                  <p className="text-[11px] font-bold text-emerald-700">You qualify for free shipping!</p>
                </div>
              )}

              <div className="space-y-2 bg-slate-50 rounded p-3">
                <div className="flex justify-between text-[12px]">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[12px] text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                {shipping > 0 && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-muted">Shipping</span>
                    <span className="font-semibold">₹{shipping}</span>
                  </div>
                )}
                {shipping === 0 && (
                  <div className="flex justify-between text-[12px] text-emerald-600">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between text-[13px]">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-brand-accent">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Checkout button */}
            <div className="px-5 py-4 border-t border-slate-200">
              <button className="w-full bg-brand-accent text-white py-3 rounded-lg font-bold text-[13px] tracking-[0.05em] hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-3">
                100% Payment Protection
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
