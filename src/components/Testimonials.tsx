'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Priya S.',
    location: 'Mumbai',
    product: '2% Ectoin Recovery Serum',
    rating: 5,
    title: 'First skincare product that actually works.',
    body: 'I\'ve tried every serum on the market. The Ectoin serum reduced my post-sun redness overnight. By week two my barrier felt noticeably stronger. The fact that they list exact percentages gave me confidence — no greenwashing.',
    date: 'June 2026',
    verified: true,
  },
  {
    id: 2,
    name: 'Ananya R.',
    location: 'Bangalore',
    product: '10% Niacinamide + 1% Zinc Serum',
    rating: 5,
    title: 'My pores are actually smaller.',
    body: 'I was sceptical because of the price point but this is genuinely the most effective niacinamide I\'ve used. Within 4 weeks my open pores visibly reduced and my skin tone is more even. The lightweight texture is perfect for humid weather.',
    date: 'May 2026',
    verified: true,
  },
  {
    id: 3,
    name: 'Karan M.',
    location: 'Delhi',
    product: 'Mineral SPF 50 Sunscreen',
    rating: 5,
    title: 'Finally a sunscreen that doesn\'t leave white cast.',
    body: 'As someone with tan skin, every mineral SPF I\'ve tried looks terrible. DermFix\'s formula applies sheer and feels weightless. PA++++ rating and no fragrance — this is now a permanent part of my morning routine.',
    date: 'June 2026',
    verified: true,
  },
  {
    id: 4,
    name: 'Meera T.',
    location: 'Chennai',
    product: 'NMF + HA Moisturiser',
    rating: 5,
    title: 'My dry skin is finally calm.',
    body: 'I have severely dry skin and have spent thousands on luxury moisturisers. The DermFix NMF formula with ceramides genuinely rebuilt my barrier in 2 weeks. It is the most effective and by far the best value moisturiser I have owned.',
    date: 'April 2026',
    verified: true,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          strokeWidth={0}
          className="fill-foreground text-foreground"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIdx((i) => (i + 1) % REVIEWS.length);

  const review = REVIEWS[idx];

  return (
    <section className="bg-background py-16 lg:py-24 border-t border-subtle">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-accent mb-2">
              Real Results
            </p>
            <h2 className="text-[30px] lg:text-[38px] font-black tracking-tight text-foreground leading-tight">
              What Our Customers Say.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-black">4.9</span>
              <span className="text-[12px] text-muted font-medium">/ 5 · 1,200+ reviews</span>
            </div>
          </div>
        </div>

        {/* Large featured review */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start mb-10">
          <div className="bg-surface p-8 lg:p-10 border border-subtle">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <Stars rating={review.rating} />
                <h3 className="text-[18px] lg:text-[22px] font-black tracking-tight text-foreground mt-3 mb-1">
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-[11px] tracking-[0.12em] uppercase text-muted font-medium">
                  {review.product}
                </p>
              </div>
              {review.verified && (
                <span className="self-start text-[9px] tracking-[0.12em] uppercase font-bold text-brand-accent
                                 border border-brand-accent px-2.5 py-1 whitespace-nowrap">
                  Verified Purchase
                </span>
              )}
            </div>
            <p className="text-[15px] text-muted leading-relaxed text-pretty mb-6">
              {review.body}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold text-foreground">{review.name}</p>
                <p className="text-[11px] text-muted">{review.location} · {review.date}</p>
              </div>
              {/* Nav */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous review"
                  className="w-9 h-9 border border-subtle flex items-center justify-center hover:border-foreground hover:bg-foreground hover:text-surface transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next review"
                  className="w-9 h-9 border border-subtle flex items-center justify-center hover:border-foreground hover:bg-foreground hover:text-surface transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="lg:flex flex-col items-center justify-center gap-2 hidden">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Review ${i + 1}`}
                className={`w-1.5 rounded-full transition-all duration-200 ${
                  i === idx ? 'h-8 bg-foreground' : 'h-1.5 bg-subtle hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mini review strip — shows other 3 reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {REVIEWS.filter((_, i) => i !== idx).slice(0, 3).map((r) => (
            <button
              key={r.id}
              onClick={() => setIdx(REVIEWS.indexOf(r))}
              className="text-left bg-surface border border-subtle p-5 hover:border-foreground transition-colors group"
            >
              <Stars rating={r.rating} />
              <p className="text-[13px] font-semibold text-foreground mt-2.5 mb-1.5 line-clamp-2 group-hover:text-brand-accent transition-colors">
                &ldquo;{r.title}&rdquo;
              </p>
              <p className="text-[11px] text-muted">{r.name} · {r.location}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
