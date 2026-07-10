'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const MESSAGES = [
  'Free shipping on orders above ₹999 — No code needed',
  'New: 2% Ectoin Post Exposure Recovery Serum — Shop Now',
  'Dermatologist-tested. Clinically proven. Fragrance-free.',
];

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-foreground text-surface text-[11px] tracking-[0.12em] uppercase font-medium">
      <div className="flex items-center justify-center h-9 px-10">
        <button
          onClick={() => setIdx((i) => (i - 1 + MESSAGES.length) % MESSAGES.length)}
          aria-label="Previous message"
          className="absolute left-4 text-surface/50 hover:text-surface transition-colors"
        >
          ‹
        </button>
        <p className="text-center leading-none">{MESSAGES[idx]}</p>
        <button
          onClick={() => setIdx((i) => (i + 1) % MESSAGES.length)}
          aria-label="Next message"
          className="absolute right-10 text-surface/50 hover:text-surface transition-colors"
        >
          ›
        </button>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 text-surface/50 hover:text-surface transition-colors"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
