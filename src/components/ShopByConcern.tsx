import { ArrowRight } from 'lucide-react';

const CONCERNS = [
  {
    id: 'acne',
    label: 'Acne + Breakouts',
    desc: 'Salicylic acid, niacinamide and zinc to clear congestion without stripping.',
    count: 4,
    bgColor: 'bg-[#f0f0ee]',
  },
  {
    id: 'pigmentation',
    label: 'Pigmentation + Dark Spots',
    desc: 'Tranexamic acid, alpha-arbutin and vitamin C at clinically effective levels.',
    count: 5,
    bgColor: 'bg-[#ebebea]',
  },
  {
    id: 'barrier',
    label: 'Dry + Damaged Barrier',
    desc: 'Ceramide complex, squalane and hyaluronic acid to rebuild and seal.',
    count: 6,
    bgColor: 'bg-[#f0f0ee]',
  },
  {
    id: 'ageing',
    label: 'Fine Lines + Ageing',
    desc: 'Retinoids, peptides and antioxidants to slow visible signs of ageing.',
    count: 4,
    bgColor: 'bg-[#ebebea]',
  },
  {
    id: 'sensitivity',
    label: 'Sensitivity + Redness',
    desc: 'Centella, ectoin and azelaic acid to calm reactive and sensitised skin.',
    count: 3,
    bgColor: 'bg-[#f0f0ee]',
  },
  {
    id: 'sun',
    label: 'Sun Damage + SPF',
    desc: 'Mineral and hybrid sunscreens with PA++++ rating and antioxidant boosters.',
    count: 2,
    bgColor: 'bg-[#ebebea]',
  },
];

export default function ShopByConcern() {
  return (
    <section className="bg-surface py-16 lg:py-24 border-t border-subtle">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-accent mb-2">
              Shop by Concern
            </p>
            <h2 className="text-[30px] lg:text-[38px] font-black tracking-tight text-foreground leading-tight">
              Find Your Fix.
            </h2>
          </div>
        </div>

        {/* Concern grid — 2 columns mobile, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-subtle">
          {CONCERNS.map((c) => (
            <a
              key={c.id}
              href="#"
              className={`${c.bgColor} group p-7 lg:p-9 flex flex-col justify-between min-h-[180px]
                         hover:bg-foreground transition-colors duration-300`}
            >
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-foreground mb-3
                               group-hover:text-surface transition-colors duration-300">
                  {c.label}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed group-hover:text-surface/60 transition-colors duration-300">
                  {c.desc}
                </p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-[10px] tracking-[0.14em] uppercase font-semibold text-muted
                                 group-hover:text-surface/50 transition-colors">
                  {c.count} Products
                </span>
                <ArrowRight
                  size={16}
                  className="text-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
