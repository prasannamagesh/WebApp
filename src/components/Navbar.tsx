'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// ─── Nav items array — add product categories here ───────────────
const NAV_ITEMS = [
  { label: 'Home',        href: '/' },
  { label: 'Shop All',    href: '/products' },
  { label: 'Skin Test',   href: '/skin-test' },
  { label: 'Our Science', href: '/science' },
  { label: 'Contact',     href: '/contact' },
];

// ─── Inline logo matching DermFix brand identity ──────────────────
// Rendered as styled HTML so font rendering is guaranteed consistent.
function DermFixLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-start leading-none select-none ${className}`}>
      <span
        style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
        className="text-[17px] lg:text-[19px] font-black tracking-[0.18em] text-zinc-900"
      >
        DERMFIX
      </span>
      {/* Magenta plus — brand accent mark */}
      <span className="text-brand-accent font-light text-[13px] lg:text-[15px] leading-none -mt-0.5 ml-[1px]">
        +
      </span>
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems: cartCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Sticky Header ───────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
            : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        {/* Thin magenta accent line at the very top */}
        <div className="h-[2px] w-full bg-brand-accent" />

        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center h-[60px] lg:h-[68px]">

            {/* ── LEFT ZONE ────────────────────────────────────── */}
            <div className="flex items-center flex-1 lg:flex-none lg:w-[220px]">
              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden p-2 -ml-2 text-zinc-800 hover:text-zinc-900 transition-colors"
                aria-label="Open navigation menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>

              {/* Nav links — desktop left is empty; logo is center */}
              <nav
                aria-label="Primary navigation"
                className="hidden lg:flex items-center gap-9"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative whitespace-nowrap text-[11px] font-medium tracking-[0.14em] uppercase text-zinc-500
                               hover:text-zinc-900 transition-colors duration-200
                               after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0
                               after:bg-brand-accent after:transition-all after:duration-300
                               hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── CENTER: Logo (always centered) ───────────────── */}
            <div className="flex-1 flex justify-center">
              <Link
                href="/"
                aria-label="DermFix — home"
                className="flex items-center hover:opacity-70 transition-opacity duration-200"
              >
                <DermFixLogo />
              </Link>
            </div>

            {/* ── RIGHT ZONE ───────────────────────────────────── */}
            <div className="flex items-center justify-end gap-1 flex-1 lg:w-[220px]">
              {/* Search — desktop only */}
              <button
                aria-label="Search"
                className="hidden lg:flex items-center justify-center w-9 h-9 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <Search size={17} strokeWidth={1.5} />
              </button>

              {/* Account — desktop only */}
              <button
                aria-label="Account"
                className="hidden lg:flex items-center justify-center w-9 h-9 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <User size={17} strokeWidth={1.5} />
              </button>

              {/* Bag — always visible */}
              <button
                onClick={openCart}
                aria-label={`Shopping bag, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
                className="relative flex items-center justify-center w-9 h-9 text-zinc-800 hover:text-zinc-900 transition-colors"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1 right-1 flex items-center justify-center
                               min-w-[14px] h-[14px] px-[3px] rounded-full
                               bg-brand-accent text-white text-[9px] font-semibold leading-none"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ─── Mobile Overlay ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ─── Mobile Slide-out Sheet ───────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-white flex flex-col
                    transition-transform duration-300 ease-in-out lg:hidden
                    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sheet top bar */}
        <div className="h-[2px] w-full bg-brand-accent" />
        <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-100">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            aria-label="DermFix — home"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <DermFixLogo />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-1.5 -mr-1.5 text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Sheet nav links */}
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 pt-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-4 text-[12px] font-medium tracking-[0.16em] uppercase
                         text-zinc-700 hover:text-zinc-900 border-b border-zinc-100
                         transition-colors duration-200 group"
            >
              <span>{item.label}</span>
              <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none">
                +
              </span>
            </Link>
          ))}
        </nav>

        {/* Sheet footer */}
        <div className="mt-auto px-6 pb-10 pt-8 flex items-center gap-6 border-t border-zinc-100">
          <button
            aria-label="Search"
            className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <Search size={15} strokeWidth={1.5} />
            Search
          </button>
          <button
            aria-label="Account"
            className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <User size={15} strokeWidth={1.5} />
            Account
          </button>
        </div>
      </div>
    </>
  );
}
