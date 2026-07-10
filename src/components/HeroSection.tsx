'use client';

import Image from 'next/image';
import { ArrowRight, FlaskConical } from 'lucide-react';

const TRUST_ITEMS = [
  'Dermatologist-Tested',
  'Clinically Proven Actives',
  'Fragrance-Free',
  'Suitable All Skin Types',
  'No Parabens',
  'Cruelty-Free',
];

export default function HeroSection() {
  return (
    <section className="relative bg-surface overflow-hidden">
      {/* ── Main hero grid ─────────────────────────────────────────── */}
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] lg:min-h-[92vh] items-center gap-8 py-16 lg:py-0">

          {/* Left — copy */}
          <div className="order-2 lg:order-1 flex flex-col gap-6 lg:gap-8 lg:pr-12">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 border border-subtle rounded-full px-3 py-1 text-[10px] tracking-[0.14em] uppercase font-semibold text-muted">
                <FlaskConical size={11} strokeWidth={2.5} />
                Preventive Skin Science
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-[42px] sm:text-[52px] lg:text-[60px] xl:text-[68px] font-black leading-[1.0] tracking-[-0.03em] text-foreground text-balance">
                Science That
                <br />
                <span className="text-brand-accent">Repairs.</span>
                <br />
                Not Just
                <br />
                Covers.
              </h1>
            </div>

            {/* Sub-copy */}
            <p className="text-[15px] lg:text-[16px] text-muted leading-relaxed max-w-[420px] text-pretty">
              Formulated with clinically-proven actives at therapeutic concentrations.
              Every ingredient earns its place. Nothing more. Nothing less.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-foreground text-surface text-[12px] tracking-[0.12em] uppercase font-semibold px-7 py-3.5 hover:bg-brand-accent transition-colors duration-200"
              >
                Shop All Products
                <ArrowRight size={14} />
              </a>
              <a
                href="#skin-test"
                className="inline-flex items-center gap-2 border border-foreground text-foreground text-[12px] tracking-[0.12em] uppercase font-semibold px-7 py-3.5 hover:bg-foreground hover:text-surface transition-colors duration-200"
              >
                Take Skin Test
              </a>
            </div>

            {/* Micro-stats */}
            <div className="flex items-center gap-6 pt-2">
              <div>
                <p className="text-[22px] font-black tracking-tight text-foreground">10K+</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted font-medium">Happy Customers</p>
              </div>
              <div className="w-px h-8 bg-subtle" />
              <div>
                <p className="text-[22px] font-black tracking-tight text-foreground">4.9★</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted font-medium">Average Rating</p>
              </div>
              <div className="w-px h-8 bg-subtle" />
              <div>
                <p className="text-[22px] font-black tracking-tight text-foreground">12+</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted font-medium">Actives Formulated</p>
              </div>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center">
            {/* Background label block */}
            <div className="absolute top-6 right-0 lg:right-4 bg-foreground text-surface px-4 py-3 z-10">
              <p className="text-[9px] uppercase tracking-[0.18em] font-semibold text-surface/60">New Launch</p>
              <p className="text-[12px] font-bold tracking-wide mt-0.5">2% Ectoin</p>
              <p className="text-[9px] uppercase tracking-[0.1em] text-surface/60 mt-0.5">Recovery Serum</p>
            </div>

            {/* Product image */}
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[3/4] lg:aspect-auto lg:h-[82vh]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.37.21%20PM-mW7btvRX8ict7F9JUKRuXb9Pg3iz0N.jpeg"
                alt="DermFix 2% Ectoin Post Exposure Recovery Serum — lifestyle"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust ticker ──────────────────────────────────────────── */}
      <div className="border-y border-subtle bg-background overflow-hidden">
        <div className="flex items-center animate-marquee whitespace-nowrap py-3">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-[10px] tracking-[0.16em] uppercase font-semibold text-muted px-8">
              <span className="text-brand-accent text-base font-black">+</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
