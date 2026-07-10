'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, FlaskConical, Star } from 'lucide-react';

const TRUST_ITEMS = [
  'Dermatologist-Tested',
  'Clinically Proven Actives',
  'Fragrance-Free',
  'No Parabens',
  'Cruelty-Free',
  'Suitable All Skin Types',
];

export default function HeroSection() {
  return (
    <section className="relative bg-surface overflow-hidden">

      {/* ── Main hero grid ──────────────────────────────────────── */}
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] items-center gap-0 lg:gap-16 py-12 lg:py-0">

          {/* Left — copy */}
          <div className="order-2 lg:order-1 flex flex-col gap-7 lg:gap-8 pb-12 lg:pb-0 lg:pr-8">

            {/* Eyebrow pill */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-brand-accent-light border border-brand-accent/20
                               rounded-full px-3.5 py-1.5 text-[10px] tracking-[0.14em] uppercase font-bold text-brand-accent">
                <FlaskConical size={11} strokeWidth={2.5} />
                New Formula — 2% Ectoin
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[44px] sm:text-[54px] lg:text-[62px] xl:text-[72px] font-black leading-[1.0]
                           tracking-[-0.03em] text-foreground text-balance">
              Skin That
              <br />
              <span style={{ color: '#1a4fd8' }}>Recovers.</span>
              <br />
              Every Single
              <br />
              Night.
            </h1>

            {/* Sub-copy */}
            <p className="text-[15px] lg:text-[16px] text-muted leading-relaxed max-w-[440px] text-pretty">
              2% Ectoin — the stress-shield molecule clinically proven to repair
              pollution-damaged skin, restore the barrier, and replenish overnight.
            </p>

            {/* Rating row */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} fill="#1a4fd8" stroke="none" />
                ))}
              </div>
              <span className="text-[13px] font-semibold text-foreground">4.9</span>
              <span className="text-[13px] text-muted">/ 5.0 · 2,400+ reviews</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/product/ectoin-recovery-serum"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase
                           font-bold px-8 py-4 text-white transition-all duration-200
                           hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#1a4fd8' }}
              >
                Shop Now
                <ArrowRight size={14} />
              </Link>
              <Link
                href="#science"
                className="inline-flex items-center gap-2 border border-foreground/20 text-foreground
                           text-[12px] tracking-[0.12em] uppercase font-semibold px-8 py-4
                           hover:border-brand-accent hover:text-brand-accent transition-colors duration-200"
              >
                Our Science
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {[
                { icon: ShieldCheck, label: 'Dermatologist Tested' },
                { icon: FlaskConical, label: 'Clinically Proven' },
                { icon: ShieldCheck, label: 'Fragrance Free' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-muted">
                  <Icon size={13} style={{ color: '#1a4fd8' }} strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — product image */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center">

            {/* Background blue circle */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #1a4fd8 0%, transparent 70%)' }}
            />

            {/* Lab badge */}
            <div className="absolute top-4 right-4 lg:top-8 lg:right-0 z-10
                            bg-white border border-subtle rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-muted">Active Ingredient</p>
              <p className="text-[15px] font-black tracking-tight mt-0.5" style={{ color: '#1a4fd8' }}>2% ECTOIN</p>
              <p className="text-[9px] uppercase tracking-[0.1em] text-muted mt-0.5">Recovery Complex</p>
            </div>

            {/* Micro-stats badge */}
            <div className="absolute bottom-8 left-4 lg:bottom-20 lg:left-0 z-10
                            bg-white border border-subtle rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[20px] font-black tracking-tight" style={{ color: '#1a4fd8' }}>10K+</p>
                  <p className="text-[9px] uppercase tracking-[0.1em] text-muted">Customers</p>
                </div>
                <div className="w-px h-8 bg-subtle" />
                <div className="text-center">
                  <p className="text-[20px] font-black tracking-tight" style={{ color: '#1a4fd8' }}>4.9★</p>
                  <p className="text-[9px] uppercase tracking-[0.1em] text-muted">Rating</p>
                </div>
              </div>
            </div>

            {/* Product image */}
            <div className="relative w-full max-w-[440px] lg:max-w-none aspect-[3/4] lg:aspect-auto lg:h-[88vh]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-Ll7vbTGZVNIEKtboMhDZmYexkHetw2.jpeg"
                alt="DermFix 2% Ectoin Post Exposure Recovery Serum"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust ticker ─────────────────────────────────────────── */}
      <div className="border-y border-subtle overflow-hidden" style={{ backgroundColor: '#f4f7fc' }}>
        <div className="flex items-center animate-marquee whitespace-nowrap py-3.5">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-[10px] tracking-[0.16em] uppercase font-semibold text-muted px-8">
              <span className="text-base font-black" style={{ color: '#1a4fd8' }}>+</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
