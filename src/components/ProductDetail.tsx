'use client';

import { useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, ShieldCheck, Beaker, Leaf, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────

export interface ProductBenefit {
  icon: 'shield' | 'beaker' | 'leaf';
  title: string;
  description: string;
}

export interface ProductProps {
  title: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  volume: string;
  rating: number;
  reviewCount: number;
  images: { src: string; alt: string }[];
  benefits: ProductBenefit[];
  ingredients: string[];
  badges: string[];
  description: string;
}

// ─── Benefit icon resolver ─────────────────────────────────────────

const BenefitIcon = ({ icon, size = 16 }: { icon: ProductBenefit['icon']; size?: number }) => {
  if (icon === 'shield')  return <ShieldCheck size={size} strokeWidth={1.5} />;
  if (icon === 'beaker')  return <Beaker      size={size} strokeWidth={1.5} />;
  return                         <Leaf        size={size} strokeWidth={1.5} />;
};

// ─── Star Rating ──────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            strokeWidth={0}
            className={i < Math.floor(rating) ? 'fill-amber-400' : 'fill-zinc-200'}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted tracking-wide">
        {rating.toFixed(1)} ({count.toLocaleString()} reviews)
      </span>
    </div>
  );
}

// ─── Image Carousel ───────────────────────────────────────────────

function ImageCarousel({ images }: { images: ProductProps['images'] }) {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((p) => (p - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((p) => (p + 1) % images.length), [images.length]);

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative w-full aspect-[4/5] bg-[#f2f2f0] overflow-hidden">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                         flex items-center justify-center text-zinc-700 hover:bg-white transition-colors shadow-sm"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                         flex items-center justify-center text-zinc-700 hover:bg-white transition-colors shadow-sm"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 h-1.5 bg-foreground' : 'w-1.5 h-1.5 bg-zinc-400/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip — visible on desktop only */}
      {images.length > 1 && (
        <div className="hidden lg:flex gap-2.5 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Select image ${i + 1}`}
              className={`relative flex-1 aspect-square bg-[#f2f2f0] overflow-hidden transition-all duration-200 ${
                i === active ? 'ring-1 ring-foreground' : 'ring-1 ring-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Quantity Selector ────────────────────────────────────────────

function QuantitySelector({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center border border-subtle">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-foreground
                   hover:bg-zinc-50 transition-colors"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span
        className="w-10 h-10 flex items-center justify-center text-[13px] font-medium text-foreground
                   border-x border-subtle select-none"
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-foreground
                   hover:bg-zinc-50 transition-colors"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

// ─── Clinical badges ──────────────────────────────────────────────

function BadgePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 border border-subtle text-[10px] font-medium
                     tracking-[0.12em] uppercase text-muted whitespace-nowrap">
      {label}
    </span>
  );
}

// ─── Add to Cart Button ───────────────────────────────────────────

function AddToCartButton({
  price,
  currency,
  quantity,
  onClick,
  compact = false,
}: {
  price: number;
  currency: string;
  quantity: number;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 bg-foreground text-surface
                  font-medium tracking-[0.14em] uppercase transition-colors duration-200
                  hover:bg-zinc-800 active:bg-zinc-700 ${compact ? 'h-12 text-[11px]' : 'h-14 text-[12px]'}`}
    >
      <ShoppingBag size={compact ? 16 : 18} strokeWidth={1.5} />
      <span>Add to Bag</span>
      <span className="opacity-50 font-normal text-[10px]">—</span>
      <span>{currency}{(price * quantity).toFixed(2)}</span>
    </button>
  );
}

// ─── Main ProductDetail component ────────────────────────────────

export default function ProductDetail({
  title,
  subtitle,
  tagline,
  price,
  originalPrice,
  currency = '₹',
  volume,
  rating,
  reviewCount,
  images,
  benefits,
  ingredients,
  badges,
  description,
}: ProductProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Cart integration hook point
    console.log('[v0] Add to cart:', { title, quantity, price });
  };

  return (
    <>
      {/* ── Main layout ───────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-0 lg:px-12 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">

          {/* ── LEFT: Media gallery — sticky on desktop ────────── */}
          <div className="w-full lg:w-[52%] xl:w-[55%] lg:sticky lg:top-[84px] lg:self-start">
            <ImageCarousel images={images} />
          </div>

          {/* ── RIGHT: Product info ────────────────────────────── */}
          <div className="w-full lg:w-[48%] xl:w-[45%] px-5 pt-6 pb-32 lg:px-0 lg:pb-12 lg:pt-0">

            {/* Eyebrow */}
            <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-brand-accent mb-3">
              {tagline}
            </p>

            {/* Title */}
            <h1 className="text-[24px] lg:text-[28px] font-bold tracking-[-0.02em] text-foreground leading-tight text-balance mb-1">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-muted mb-4">
              {subtitle}
            </p>

            {/* Stars */}
            <div className="mb-5">
              <StarRating rating={rating} count={reviewCount} />
            </div>

            {/* Divider */}
            <div className="border-t border-subtle mb-5" />

            {/* Price row */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-[22px] font-bold text-foreground tracking-tight">
                {currency}{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-[15px] text-muted line-through">
                  {currency}{originalPrice.toFixed(2)}
                </span>
              )}
              {originalPrice && (
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-brand-accent">
                  {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
                </span>
              )}
            </div>

            {/* Volume */}
            <p className="text-[12px] text-muted mb-5 tracking-wide">{volume}</p>

            {/* Clinical badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {badges.map((b) => <BadgePill key={b} label={b} />)}
            </div>

            {/* Description */}
            <p className="text-[14px] text-muted leading-relaxed text-pretty mb-6">
              {description}
            </p>

            {/* Divider */}
            <div className="border-t border-subtle mb-6" />

            {/* Benefits */}
            <div className="flex flex-col gap-4 mb-6">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <span className="mt-0.5 text-brand-accent shrink-0">
                    <BenefitIcon icon={b.icon} />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold tracking-[0.06em] uppercase text-foreground mb-0.5">
                      {b.title}
                    </p>
                    <p className="text-[13px] text-muted leading-snug">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-subtle mb-6" />

            {/* Key ingredients */}
            <div className="mb-6">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground mb-3">
                Key Actives
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3 py-1.5 bg-surface border border-subtle text-[11px] text-zinc-600 tracking-wide"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-subtle mb-6" />

            {/* Quantity + Add to Cart — desktop only (mobile uses sticky bar) */}
            <div className="hidden lg:flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted">
                  Qty
                </span>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
              <AddToCartButton
                price={price}
                currency={currency}
                quantity={quantity}
                onClick={handleAddToCart}
              />
              <p className="text-center text-[11px] text-muted">
                Free delivery on orders over {currency}499 &nbsp;·&nbsp; Easy 30-day returns
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile sticky Add to Cart bar ─────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-subtle
                      px-4 py-3 flex items-center gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <div className="flex-1">
          <AddToCartButton
            price={price}
            currency={currency}
            quantity={quantity}
            onClick={handleAddToCart}
            compact
          />
        </div>
      </div>
    </>
  );
}
