'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CATALOGUE, type CatalogProduct } from '@/data/products';

const FILTERS = ['All', 'Best Sellers', 'Brightening', 'Dry Skin', 'Sun Care', 'Anti-Aging', 'Hydration'];

function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1,2,3,4,5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? '#1a4fd8' : 'none'}
          stroke={i <= Math.round(rating) ? 'none' : '#cbd5e1'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: CatalogProduct }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id:            product.id,
      name:          product.name,
      subtitle:      product.subtitle,
      price:         product.price,
      originalPrice: product.originalPrice,
      currency:      product.currency,
      image:         product.image,
      alt:           product.alt,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col bg-surface rounded-2xl overflow-hidden
                 border border-subtle hover:border-blue-200 hover:shadow-xl
                 transition-all duration-300"
      style={{ boxShadow: '0 2px 8px rgba(26,79,216,0.04)' }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span
            className="text-[9px] font-bold tracking-[0.1em] uppercase text-white px-2.5 py-1 rounded-full"
            style={{ backgroundColor: product.isNew ? '#059669' : '#1a4fd8' }}
          >
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-white px-2.5 py-1 rounded-full bg-orange-500">
            -{discount}%
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: '#f4f7fc' }}>
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 lg:p-5">
        <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-brand-accent mb-1">
          {product.subtitle}
        </p>
        <h3 className="text-[13px] lg:text-[14px] font-bold text-foreground leading-snug mb-2.5 text-balance">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-4">
          <Stars rating={product.rating} />
          <span className="text-[11px] font-semibold text-foreground">{product.rating}</span>
          <span className="text-[11px] text-muted">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between mt-auto gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[16px] font-black text-foreground">
              {product.currency}{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[12px] text-muted line-through">
                {product.currency}{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.06em] uppercase
                       text-white px-3 py-2 rounded-xl transition-all duration-200 shrink-0
                       hover:opacity-90 active:scale-95"
            style={{ backgroundColor: added ? '#059669' : '#1a4fd8' }}
          >
            <ShoppingBag size={12} strokeWidth={2.5} />
            <span className="hidden sm:inline">{added ? 'Added!' : 'Add'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? CATALOGUE
    : activeFilter === 'Best Sellers'
    ? CATALOGUE.filter((p) => p.isBestSeller)
    : CATALOGUE.filter((p) => p.concern === activeFilter);

  return (
    <section id="products" className="py-16 lg:py-24 bg-background">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2"
               style={{ color: '#1a4fd8' }}>
              Our Range
            </p>
            <h2 className="text-[32px] lg:text-[42px] font-black tracking-tight text-foreground leading-tight">
              Science-Led Formulas
              <br />
              <span className="text-muted font-normal">for Every Skin Need</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase
                       transition-all duration-200 hover:gap-3"
            style={{ color: '#1a4fd8' }}
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="whitespace-nowrap text-[11px] font-semibold tracking-[0.08em] uppercase
                         px-4 py-2 rounded-full border transition-all duration-200"
              style={
                activeFilter === f
                  ? { backgroundColor: '#1a4fd8', color: '#fff', borderColor: '#1a4fd8' }
                  : { backgroundColor: '#fff', color: '#64748b', borderColor: '#dde3ef' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
