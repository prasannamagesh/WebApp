'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Tag,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

// ─── Free shipping threshold ────────────────────────────────────────
const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;

// ─── Coupon definitions ─────────────────────────────────────────────
const VALID_COUPONS: Record<string, { discount: number; label: string }> = {
  DERM10:  { discount: 0.10, label: '10% off' },
  DERM20:  { discount: 0.20, label: '20% off' },
  FIRST15: { discount: 0.15, label: '15% off — First Order' },
};

// ─── Empty state ────────────────────────────────────────────────────
function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[#f2f2f0] flex items-center justify-center">
        <ShoppingBag size={24} strokeWidth={1.5} className="text-muted" />
      </div>
      <div>
        <p className="text-[15px] font-semibold text-foreground tracking-tight mb-1">
          Your bag is empty
        </p>
        <p className="text-[13px] text-muted leading-relaxed">
          Add a product to get started with your skin routine.
        </p>
      </div>
      <button
        onClick={onClose}
        className="mt-2 inline-flex items-center gap-2 bg-foreground text-surface
                   text-[11px] tracking-[0.14em] uppercase font-semibold px-7 py-3
                   hover:bg-brand-accent transition-colors duration-200"
      >
        Continue Shopping
        <ChevronRight size={13} />
      </button>
    </div>
  );
}

// ─── Cart item row ──────────────────────────────────────────────────
function CartItemRow({
  id,
  name,
  subtitle,
  price,
  originalPrice,
  currency,
  image,
  alt,
  quantity,
}: {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  alt: string;
  quantity: number;
}) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-5 border-b border-subtle last:border-b-0">
      {/* Thumbnail */}
      <div className="relative w-20 h-24 shrink-0 bg-[#f2f2f0] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="80px"
          className="object-cover object-center"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Name + remove */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-foreground leading-snug tracking-tight line-clamp-2">
              {name}
            </p>
            <p className="text-[11px] text-muted mt-0.5 truncate">{subtitle}</p>
          </div>
          <button
            onClick={() => removeItem(id)}
            aria-label={`Remove ${name} from cart`}
            className="shrink-0 p-1 -mr-1 -mt-0.5 text-zinc-400 hover:text-brand-accent transition-colors"
          >
            <Trash2 size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-[14px] font-bold text-foreground">
            {currency}{(price * quantity).toLocaleString('en-IN')}
          </span>
          {originalPrice && (
            <span className="text-[11px] text-muted line-through">
              {currency}{(originalPrice * quantity).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Quantity adjuster */}
        <div className="flex items-center gap-0 border border-subtle w-fit mt-2">
          <button
            onClick={() => quantity === 1 ? removeItem(id) : updateQty(id, quantity - 1)}
            aria-label="Decrease quantity"
            className="w-8 h-8 flex items-center justify-center text-zinc-500
                       hover:text-foreground hover:bg-[#f2f2f0] transition-colors"
          >
            <Minus size={11} strokeWidth={2} />
          </button>
          <span className="w-8 h-8 flex items-center justify-center text-[12px] font-semibold
                           text-foreground border-x border-subtle select-none">
            {quantity}
          </span>
          <button
            onClick={() => updateQty(id, quantity + 1)}
            aria-label="Increase quantity"
            className="w-8 h-8 flex items-center justify-center text-zinc-500
                       hover:text-foreground hover:bg-[#f2f2f0] transition-colors"
          >
            <Plus size={11} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shipping progress bar ──────────────────────────────────────────
function ShippingProgress({ subtotal }: { subtotal: number }) {
  const progress   = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining  = FREE_SHIPPING_THRESHOLD - subtotal;
  const qualifies  = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="px-5 py-3 bg-[#f2f2f0] border-b border-subtle">
      <p className="text-[11px] font-medium text-foreground mb-2 leading-snug">
        {qualifies ? (
          <span className="text-emerald-600 font-semibold">
            You qualify for free shipping!
          </span>
        ) : (
          <>
            Add{' '}
            <span className="font-bold text-foreground">
              ₹{remaining.toLocaleString('en-IN')}
            </span>{' '}
            more for free delivery
          </>
        )}
      </p>
      <div className="w-full h-1 bg-subtle rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: qualifies ? '#10b981' : '#e8005a',
          }}
        />
      </div>
    </div>
  );
}

// ─── Main CartDrawer ────────────────────────────────────────────────
export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    totalItems,
    clearCart,
  } = useCart();

  // Coupon state
  const [couponInput, setCouponInput]     = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError]     = useState('');

  // Trap focus & close on Escape
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeCart]);

  // Focus first focusable element when opened
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusable = drawerRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [isOpen]);

  // Discount calculation
  const couponData    = appliedCoupon ? VALID_COUPONS[appliedCoupon] : null;
  const discountAmt   = couponData ? subtotal * couponData.discount : 0;
  const discountedSub = subtotal - discountAmt;
  const shipping      = discountedSub >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal    = discountedSub + shipping;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try DERM10 or DERM20.');
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* ── Drawer panel ───────────────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 bottom-0 z-[70]
                    w-full sm:w-[420px]
                    bg-surface flex flex-col
                    shadow-[-8px_0_40px_rgba(0,0,0,0.10)]
                    transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* ── Header ───────────────────────────────────────────── */}
        <div className="shrink-0">
          {/* Magenta accent top bar */}
          <div className="h-[3px] w-full bg-brand-accent" />

          <div className="flex items-center justify-between px-5 h-[60px] border-b border-subtle">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={18} strokeWidth={1.5} className="text-foreground" />
              <h2 className="text-[14px] font-bold tracking-[0.08em] uppercase text-foreground">
                Your Bag
              </h2>
              {totalItems > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5
                                 rounded-full bg-brand-accent text-surface text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[10px] tracking-[0.1em] uppercase font-medium text-muted
                             hover:text-brand-accent transition-colors px-1"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 flex items-center justify-center text-zinc-400
                           hover:text-foreground hover:bg-[#f2f2f0] rounded-sm transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Shipping progress — only when items exist */}
          {items.length > 0 && <ShippingProgress subtotal={subtotal} />}
        </div>

        {/* ── Scrollable item list ──────────────────────────────── */}
        {items.length === 0 ? (
          <EmptyCart onClose={closeCart} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5">
              {items.map((item) => (
                <CartItemRow key={item.id} {...item} />
              ))}
            </div>

            {/* ── Footer: coupon + summary + CTA ─────────────── */}
            <div className="shrink-0 border-t border-subtle">

              {/* Coupon input */}
              <div className="px-5 pt-4 pb-3 border-b border-subtle">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200
                                   rounded-sm px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag size={13} strokeWidth={2} className="text-emerald-600" />
                      <span className="text-[12px] font-semibold text-emerald-700">
                        {appliedCoupon} — {couponData?.label}
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-emerald-600 hover:text-emerald-800 transition-colors"
                      aria-label="Remove coupon"
                    >
                      <X size={14} strokeWidth={2} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <Tag
                        size={13}
                        strokeWidth={1.5}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                      />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                            handleApplyCoupon();
                          }
                        }}
                        placeholder="Enter coupon code"
                        className="w-full pl-9 pr-3 py-2.5 border border-subtle bg-background
                                   text-[12px] text-foreground placeholder:text-muted
                                   focus:outline-none focus:border-foreground transition-colors"
                        aria-label="Coupon code input"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="shrink-0 px-4 py-2.5 bg-foreground text-surface
                                 text-[11px] tracking-[0.1em] uppercase font-semibold
                                 hover:bg-brand-accent transition-colors duration-200"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[11px] text-brand-accent mt-1.5">{couponError}</p>
                )}
              </div>

              {/* Order summary */}
              <div className="px-5 pt-4 pb-3 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponData && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-emerald-600 font-medium">
                      Discount ({couponData.label})
                    </span>
                    <span className="text-emerald-600 font-semibold">
                      −₹{discountAmt.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-emerald-600' : 'text-foreground'}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>

                <div className="border-t border-subtle mt-1 pt-3 flex items-center justify-between">
                  <span className="text-[14px] font-bold text-foreground uppercase tracking-tight">
                    Total
                  </span>
                  <span className="text-[17px] font-black text-foreground">
                    ₹{orderTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 pb-6 pt-1 flex flex-col gap-2.5">
                <button
                  className="w-full flex items-center justify-center gap-2.5
                             bg-foreground text-surface h-14
                             text-[12px] tracking-[0.16em] uppercase font-bold
                             hover:bg-brand-accent transition-colors duration-200
                             focus-visible:outline-2 focus-visible:outline-brand-accent focus-visible:outline-offset-2"
                >
                  <ShieldCheck size={16} strokeWidth={1.5} />
                  Proceed to Secure Checkout
                </button>

                <button
                  onClick={closeCart}
                  className="w-full flex items-center justify-center h-10
                             border border-subtle text-[11px] tracking-[0.12em] uppercase
                             font-medium text-muted hover:text-foreground hover:border-foreground
                             transition-colors duration-200"
                >
                  Continue Shopping
                </button>

                {/* Trust line */}
                <p className="text-center text-[10px] text-muted tracking-wide mt-0.5">
                  Secured by SSL &nbsp;·&nbsp; 30-day easy returns &nbsp;·&nbsp; Free exchanges
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
