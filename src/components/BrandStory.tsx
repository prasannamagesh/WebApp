import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const PILLARS = [
  {
    number: '01',
    title: 'Therapeutic Concentrations',
    copy: 'We dose every active at the level proven to work in peer-reviewed clinical studies — not at the threshold needed to appear on a label.',
  },
  {
    number: '02',
    title: 'No Filler Philosophy',
    copy: 'Every ingredient in a DermFix formula has a functional role backed by evidence. If it doesn\'t do something measurable, it doesn\'t make the cut.',
  },
  {
    number: '03',
    title: 'Total Transparency',
    copy: 'Full INCI lists, exact percentages, and clinical references are published for every SKU. We believe you deserve to know what you\'re putting on your skin.',
  },
];

export default function BrandStory() {
  return (
    <section className="bg-foreground text-surface py-16 lg:py-28 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Grid: image left, copy right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image block */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.37.21%20PM-mW7btvRX8ict7F9JUKRuXb9Pg3iz0N.jpeg"
                alt="DermFix — preventive skin science in practice"
                fill
                className="object-cover object-center grayscale contrast-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating callout box */}
            <div className="absolute -bottom-5 -right-2 lg:-right-10 bg-brand-accent p-5 max-w-[200px]">
              <p className="text-[11px] tracking-[0.12em] uppercase font-semibold text-surface/80">Founded on</p>
              <p className="text-[28px] font-black leading-none mt-1">Science</p>
              <p className="text-[11px] tracking-[0.12em] uppercase font-semibold text-surface/80 mt-1">Not Trends</p>
            </div>
          </div>

          {/* Copy block */}
          <div className="lg:pl-4">
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-surface/50 mb-4">
              Our Philosophy
            </p>
            <h2 className="text-[36px] lg:text-[48px] font-black leading-[1.0] tracking-tight text-balance mb-8">
              We Skipped the
              <br />
              Fancy Packaging.
              <br />
              <span className="text-brand-accent">The Formula Is</span>
              <br />
              the Product.
            </h2>
            <p className="text-[15px] text-surface/70 leading-relaxed mb-10 max-w-[460px] text-pretty">
              DermFix was built on a single belief: that skincare should work the way medicine does —
              with transparent ingredients, proven concentrations, and zero compromise. We are preventive
              skin science for people who want results, not rituals.
            </p>

            {/* Pillars */}
            <div className="flex flex-col divide-y divide-surface/10">
              {PILLARS.map((p) => (
                <div key={p.number} className="flex gap-5 py-5">
                  <span className="text-[11px] font-bold text-brand-accent tracking-widest pt-0.5 shrink-0">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="text-[13px] font-bold tracking-wide mb-1.5">{p.title}</h3>
                    <p className="text-[13px] text-surface/60 leading-relaxed">{p.copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 text-[11px] tracking-[0.14em] uppercase font-semibold
                         text-surface border-b border-surface/30 pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors"
            >
              Our Science
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
