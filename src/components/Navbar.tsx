'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Leaf,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Shop', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Skin Test', href: '#' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = 3;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Header ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-white/80 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
            : 'backdrop-blur-md bg-white/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── LEFT: Hamburger (mobile) / Logo (desktop) ─────── */}
            <div className="flex items-center flex-1 lg:flex-none">
              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden p-1.5 -ml-1.5 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                aria-label="Open navigation menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={22} strokeWidth={1.6} />
              </button>

              {/* Logo — desktop only (left-aligned) */}
              <a
                href="#"
                className="hidden lg:flex items-center gap-2 text-stone-900 hover:opacity-75 transition-opacity"
                aria-label="LUMÉ — home"
              >
                <Leaf size={20} strokeWidth={1.5} className="text-stone-500" />
                <span className="font-serif text-xl tracking-[0.12em] uppercase text-stone-900">
                  Lumé
                </span>
              </a>
            </div>

            {/* ── CENTER: Logo (mobile) / Nav links (desktop) ────── */}
            <div className="flex-1 flex justify-center">
              {/* Logo — mobile only (perfectly centered) */}
              <a
                href="#"
                className="lg:hidden flex items-center gap-1.5 text-stone-900"
                aria-label="LUMÉ — home"
              >
                <Leaf size={16} strokeWidth={1.5} className="text-stone-500" />
                <span className="font-serif text-lg tracking-[0.14em] uppercase">
                  Lumé
                </span>
              </a>

              {/* Nav links — desktop only */}
              <nav
                aria-label="Primary navigation"
                className="hidden lg:flex items-center gap-10"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-[13px] tracking-[0.08em] uppercase text-stone-600 hover:text-stone-900 transition-colors
                               after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-stone-900
                               after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* ── RIGHT: Icons ─────────────────────────────────── */}
            <div className="flex items-center gap-1 flex-1 justify-end">
              {/* Search — desktop only */}
              <button
                aria-label="Search"
                className="hidden lg:flex p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <Search size={19} strokeWidth={1.6} />
              </button>

              {/* User — desktop only */}
              <button
                aria-label="Account"
                className="hidden lg:flex p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <User size={19} strokeWidth={1.6} />
              </button>

              {/* Cart — always visible */}
              <button
                aria-label={`Cart, ${cartCount} items`}
                className="relative p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <ShoppingBag size={19} strokeWidth={1.6} />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 right-0.5 flex items-center justify-center
                               min-w-[16px] h-[16px] px-[3px] rounded-full
                               bg-stone-900 text-white text-[9px] font-semibold leading-none tracking-wide"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Overlay ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ─── Mobile Slide-out Sheet ──────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 bottom-0 z-50 w-[300px] bg-white flex flex-col
                    transition-transform duration-300 ease-in-out lg:hidden
                    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-stone-100">
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1.5 text-stone-900"
            aria-label="LUMÉ — home"
          >
            <Leaf size={16} strokeWidth={1.5} className="text-stone-500" />
            <span className="font-serif text-lg tracking-[0.14em] uppercase">
              Lumé
            </span>
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>

        {/* Sheet nav links */}
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 pt-8 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-[15px] tracking-[0.06em] uppercase text-stone-700 hover:text-stone-900
                         border-b border-stone-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Sheet footer icons */}
        <div className="mt-auto px-6 pb-10 flex items-center gap-5 border-t border-stone-100 pt-6">
          <button
            aria-label="Search"
            className="flex items-center gap-2 text-[13px] tracking-[0.06em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Search size={17} strokeWidth={1.5} />
            Search
          </button>
          <button
            aria-label="Account"
            className="flex items-center gap-2 text-[13px] tracking-[0.06em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
          >
            <User size={17} strokeWidth={1.5} />
            Account
          </button>
        </div>
      </div>
    </>
  );
}
