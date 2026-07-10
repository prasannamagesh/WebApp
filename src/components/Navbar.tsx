'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, User, Settings } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { DermFixLogo } from './DermFixLogo';
import { AuthModal } from './AuthModal';

// ─── Nav items array — add product categories here ───────────────
const NAV_ITEMS = [
  { label: 'Home',        href: '/' },
  { label: 'Shop All',    href: '/products' },
  { label: 'Skin Test',   href: '/skin-test' },
  { label: 'Our Science', href: '/science' },
  { label: 'Contact',     href: '/contact' },
];

// ─── Admin items ───────────────────────────────────────────────────
const ADMIN_ITEMS = [
  { label: 'Dashboard',   href: '/admin' },
  { label: 'Orders',      href: '/admin/orders' },
  { label: 'Products',    href: '/admin/products' },
  { label: 'Users',       href: '/admin/users' },
  { label: 'Settings',    href: '/admin/settings' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
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

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[60px] lg:h-[72px]">

            {/* ── MOBILE LEFT: Hamburger */}
            <button
              className="lg:hidden p-2 -ml-2 text-zinc-800 hover:text-zinc-900 transition-colors"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            {/* ── CENTER (Mobile) / LEFT (Desktop): Logo + Nav ──── */}
            <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-0 lg:gap-12">
              {/* Logo — all screens */}
              <Link
                href="/"
                aria-label="DermFix — home"
                className="flex items-center hover:opacity-70 transition-opacity duration-200 shrink-0"
              >
                <DermFixLogo />
              </Link>

              {/* Nav links — desktop only, properly spaced */}
              <nav
                aria-label="Primary navigation"
                className="hidden lg:flex items-center gap-8"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative whitespace-nowrap text-[11px] font-medium tracking-[0.14em] uppercase text-zinc-600
                               hover:text-zinc-900 transition-colors duration-200
                               after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0
                               after:bg-brand-accent after:transition-all after:duration-300
                               hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Admin Dropdown — desktop only */}
                <div className="relative group">
                  <button
                    className="relative whitespace-nowrap text-[11px] font-medium tracking-[0.14em] uppercase text-zinc-600
                               hover:text-zinc-900 transition-colors duration-200 flex items-center gap-1.5
                               after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0
                               after:bg-brand-accent after:transition-all after:duration-300
                               group-hover:after:w-full"
                  >
                    <Settings size={14} strokeWidth={1.5} />
                    Admin
                  </button>
                  <div className="absolute left-0 mt-0 w-48 rounded-lg bg-white shadow-lg border border-zinc-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    {ADMIN_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2.5 text-[11px] font-medium tracking-[0.08em] uppercase text-zinc-700 hover:bg-zinc-50 hover:text-brand-accent transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-zinc-100 last:border-b-0"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            {/* ── RIGHT ZONE: Actions ──────────────────────────── */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 lg:gap-3 lg:flex-none">
              {/* Account — desktop only */}
              <button
                onClick={() => setAuthOpen(true)}
                aria-label="Account"
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
              >
                <User size={18} strokeWidth={1.5} />
              </button>

              {/* Bag — always visible */}
              <button
                onClick={openCart}
                aria-label={`Shopping bag, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
                className="relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 lg:hover:bg-blue-50 transition-all"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 right-0.5 flex items-center justify-center
                               min-w-[18px] h-[18px] px-1 rounded-full
                               bg-brand-accent text-white text-[8px] lg:text-[9px] font-bold leading-none"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ─── Mobile Overlay ───────���──────────────────────────────── */}
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
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 pt-6 flex-1 overflow-y-auto">
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

          {/* Mobile Admin Links */}
          <div className="py-4 border-b border-zinc-100">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex items-center justify-between w-full text-[12px] font-medium tracking-[0.16em] uppercase
                         text-zinc-700 hover:text-brand-accent transition-colors group"
            >
              <span className="flex items-center gap-2">
                <Settings size={14} strokeWidth={1.5} />
                Admin Panel
              </span>
              <span className={`transition-transform duration-300 ${adminOpen ? 'rotate-180' : ''}`}>
                +
              </span>
            </button>
            {adminOpen && (
              <div className="mt-2 pl-6 space-y-2 border-l border-zinc-200">
                {ADMIN_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setAdminOpen(false);
                    }}
                    className="block py-2 text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-600 hover:text-brand-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Sheet footer */}
        <div className="mt-auto px-6 pb-10 pt-8 border-t border-zinc-100">
          <button
            onClick={() => {
              setAuthOpen(true);
              setMenuOpen(false);
            }}
            aria-label="Account"
            className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors w-full"
          >
            <User size={15} strokeWidth={1.5} />
            Account
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
