'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Plus } from 'lucide-react';

// ─── Product catalogue data ────────────────────────────────────────
// Replace with a database fetch when backend is ready.
export interface CatalogProduct {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  alt: string;
  badge?: string;
  concern: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const CATALOGUE: CatalogProduct[] = [
  {
    id: 'ectoin-serum',
    name: 'Post Exposure Recovery Serum',
    subtitle: '2% Ectoin · Night',
    tag: 'Barrier Repair',
    price: 1499,
    originalPrice: 1999,
    currency: '₹',
    rating: 4.8,
    reviewCount: 312,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-cE1jNUKGewZbsKQQeMilLjhlCDhwMW.jpeg',
    alt: 'DermFix 2% Ectoin Post Exposure Recovery Serum',
    badge: 'Best Seller',
    concern: 'All',
    isBestSeller: true,
  },
  {
    id: 'niacinamide-serum',
    name: 'Brightening + Pore Refining Serum',
    subtitle: '10% Niacinamide + 1% Zinc',
    tag: 'Brightening',
    price: 1299,
    originalPrice: 1699,
    currency: '₹',
    rating: 4.7,
    reviewCount: 248,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-cE1jNUKGewZbsKQQeMilLjhlCDhwMW.jpeg',
    alt: 'DermFix Niacinamide + Zinc Serum',
    badge: 'New',
    concern: 'Brightening',
    isNew: true,
  },
  {
    id: 'aha-bha-exfoliant',
    name: 'AHA 30% + BHA 2% Peeling Solution',
    subtitle: 'Exfoliant · Weekly',
    tag: 'Exfoliation',
    price: 999,
    originalPrice: 1299,
    currency: '₹',
    rating: 4.6,
    reviewCount: 189,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-cE1jNUKGewZbsKQQeMilLjhlCDhwMW.jpeg',
    alt: 'DermFix AHA BHA Peeling Solution',
    concern: 'Acne',
  },
  {
    id: 'spf-sunscreen',
    name: 'Mineral SPF 50 PA++++ Sunscreen',
    subtitle: '30ml · Daily Defense',
    tag: 'SPF Protection',
    price: 1199,
    currency: '₹',
    rating: 4.9,
    reviewCount: 421,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-cE1jNUKGewZbsKQQeMilLjhlCDhwMW.jpeg',
    alt: 'DermFix SPF 50 Sunscreen',
    badge: 'Best Seller',
    concern: 'All',
    isBestSeller: true,
  },
  {
    id: 'retinol-serum',
    name: 'Granactive Retinoid 2% Emulsion',
    subtitle: '0.2% Retinoid · Night',
    tag: 'Anti-Ageing',
    price: 1599,
    originalPrice: 1999,
    currency: '₹',
    rating: 4.7,
    reviewCount: 156,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-cE1jNUKGewZbsKQQeMilLjhlCDhwMW.jpeg',
    alt: 'DermFix Granactive Retinoid Emulsion',
    concern: 'Anti-Ageing',
  },
  {
    id: 'ha-moisturiser',
    name: 'Natural Moisturising Factors + HA',
    subtitle: 'Barrier Moisturiser · AM/PM',
    tag: 'Hydration',
    price: 899,
    currency: '₹',
    rating: 4.8,
    reviewCount: 534,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-cE1jNUKGewZbsKQQeMilLjhlCDhwMW.jpeg',
    alt: 'DermFix NMF + HA Moisturiser',
    badge: 'Best Seller',
    concern: 'Dry Skin',
    isBestSeller: true,
  },
];

const FILTERS = ['All', 'Best Sellers', 'Brightening', 'Acne', 'Anti-Ageing', 'Dry Skin'];

// ─── Star renderer ─────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={s <= Math.round(rating) ? 'text-foreground fill-foreground' : 'text-subtle fill-subtle'}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

// ─── Single product card ───────────────────────────────────────────
function ProductCard({ product }: { product: CatalogProduct }) {
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="group relative bg-surface flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f2f2f0]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-foreground text-surface text-[9px] tracking-[0.1em] uppercase font-bold px-2 py-1">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-brand-accent text-surface text-[9px] tracking-[0.1em] uppercase font-bold px-2 py-1">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick add — shows on hover desktop */}
        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2
                     bg-foreground/95 text-surface text-[10px] tracking-[0.14em] uppercase font-semibold
                     py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300
                     md:flex hidden"
        >
          {added ? (
            'Added!'
          ) : (
            <>
              <Plus size={12} /> Quick Add
            </>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 pt-3 pb-4 px-0.5">
        {/* Tag */}
        <p className="text-[9px] tracking-[0.16em] uppercase font-semibold text-brand-accent mb-1.5">
          {product.tag}
        </p>

        {/* Name */}
        <h3 className="text-[13px] font-semibold text-foreground leading-snug tracking-tight line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-[11px] text-muted mb-2.5">{product.subtitle}</p>

        {/* Stars */}
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={product.rating} />
          <span className="text-[10px] text-muted">({product.reviewCount})</span>
        </div>

        {/* Price row + mobile add */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-foreground tracking-tight">
              {product.currency}{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[12px] text-muted line-through">
                {product.currency}{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Mobile add button */}
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="md:hidden flex items-center justify-center w-8 h-8 bg-foreground text-surface hover:bg-brand-accent transition-colors"
          >
            <ShoppingBag size={14} />
          </button>
        </div>

        {/* Desktop add to cart */}
        <button
          onClick={handleAdd}
          className="hidden md:flex items-center justify-center gap-2 mt-3 w-full
                     border border-foreground text-foreground text-[10px] tracking-[0.14em]
                     uppercase font-semibold py-2.5 hover:bg-foreground hover:text-surface
                     transition-colors duration-200"
        >
          {added ? 'Added to Bag!' : 'Add to Bag'}
        </button>
      </div>
    </article>
  );
}

// ─── Section ───────────────────────────────────────────────────────
export default function ProductGrid() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? CATALOGUE
    : active === 'Best Sellers'
    ? CATALOGUE.filter((p) => p.isBestSeller)
    : CATALOGUE.filter((p) => p.concern === active);

  return (
    <section id="products" className="bg-background py-16 lg:py-24">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-accent mb-2">
              Our Range
            </p>
            <h2 className="text-[32px] lg:text-[40px] font-black tracking-tight text-foreground leading-tight">
              Formulated for Results.
              <br className="hidden sm:block" /> Not for Marketing.
            </h2>
          </div>
          <a
            href="#"
            className="self-start sm:self-auto text-[11px] tracking-[0.14em] uppercase font-semibold text-foreground
                       border-b border-foreground pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors"
          >
            View All
          </a>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`whitespace-nowrap text-[10px] tracking-[0.14em] uppercase font-semibold px-4 py-2 border transition-colors duration-150 ${
                active === f
                  ? 'bg-foreground text-surface border-foreground'
                  : 'bg-transparent text-muted border-subtle hover:border-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
