'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, ArrowRight, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CATALOGUE, type CatalogProduct } from '@/data/products';

function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
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
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      originalPrice: product.originalPrice,
      currency: product.currency,
      image: product.image,
      alt: product.alt,
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

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const FILTERS = ['All', 'Best Sellers', 'Brightening', 'Dry Skin', 'Sun Care', 'Anti-Aging', 'Hydration'];

  let filtered = activeFilter === 'All'
    ? CATALOGUE
    : activeFilter === 'Best Sellers'
    ? CATALOGUE.filter((p) => p.isBestSeller)
    : CATALOGUE.filter((p) => p.concern === activeFilter);

  // Sorting
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50 to-background">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="mb-2">
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-accent">
              Complete Collection
            </p>
          </div>
          <h1 className="text-[36px] lg:text-[48px] font-black tracking-tight text-foreground leading-tight mb-4">
            All Products
          </h1>
          <p className="text-[16px] text-muted max-w-2xl leading-relaxed">
            Explore our complete collection of science-led skincare formulations designed to address every skin concern with clinical efficacy.
          </p>
        </div>
      </section>

      {/* Filters & Sorting */}
      <section className="py-8 border-b border-subtle bg-white sticky top-[84px] z-30">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
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

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 border border-subtle rounded-lg bg-white
                           text-[12px] font-medium text-foreground cursor-pointer pr-10
                           focus:outline-none focus:border-blue-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
            </div>
          </div>

          {/* Results count */}
          <p className="text-[12px] text-muted mt-4">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-[16px] font-semibold text-foreground mb-2">No products found</p>
              <p className="text-[14px] text-muted">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-subtle">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16 text-center">
          <h2 className="text-[24px] lg:text-[32px] font-bold text-foreground mb-4">
            Still exploring?
          </h2>
          <p className="text-[14px] text-muted mb-6 max-w-lg mx-auto">
            Take our skin concern quiz to get personalized product recommendations.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-surface
                       text-[12px] font-bold tracking-[0.1em] uppercase rounded-lg
                       hover:bg-blue-700 transition-colors duration-200"
          >
            Take Quiz <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
