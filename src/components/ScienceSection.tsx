import { FlaskConical, Shield, Droplets, Microscope, Sun, Leaf } from 'lucide-react';

const ACTIVES = [
  {
    icon: FlaskConical,
    name: 'Ectoin 2%',
    action: 'Barrier Repair',
    detail: 'Natural extremolyte that protects cells from UV and pollution stress. Clinically proven to reduce transepidermal water loss.',
  },
  {
    icon: Droplets,
    name: 'Niacinamide 10%',
    action: 'Brightening',
    detail: 'Reduces hyperpigmentation, minimises pores, regulates sebum, and strengthens the skin barrier in 8 weeks.',
  },
  {
    icon: Shield,
    name: 'Ceramide Complex',
    action: 'Barrier Support',
    detail: 'Ceramides 1, 3 and 6-II restore lipid matrix integrity, locking in moisture and keeping irritants out.',
  },
  {
    icon: Microscope,
    name: 'Tranexamic Acid 1%',
    action: 'Dark Spot Correction',
    detail: 'Inhibits plasmin-triggered melanin production — gentler than hydroquinone with equivalent brightening effect.',
  },
  {
    icon: Leaf,
    name: 'Centella Extract 0.5%',
    action: 'Calming + Healing',
    detail: 'Madecassoside and asiaticoside reduce redness, stimulate collagen synthesis and accelerate wound healing.',
  },
  {
    icon: Sun,
    name: 'Squalane',
    action: 'Hydration + Emolliency',
    detail: 'Plant-derived lipid identical to skin\'s own sebum. Softens without clogging pores. Suitable for all skin types.',
  },
];

export default function ScienceSection() {
  return (
    <section id="our-science" className="bg-background py-16 lg:py-24 border-t border-subtle">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Header */}
        <div className="max-w-[640px] mb-12 lg:mb-16">
          <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-accent mb-3">
            The Science
          </p>
          <h2 className="text-[32px] lg:text-[42px] font-black tracking-tight text-foreground leading-tight mb-5">
            Every Active Has a
            <br />
            Reason to Be Here.
          </h2>
          <p className="text-[15px] text-muted leading-relaxed text-pretty">
            We publish full ingredient percentages. No proprietary blends, no hidden concentrations.
            If it is in the formula, this is exactly what it does — and why.
          </p>
        </div>

        {/* Actives grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-subtle">
          {ACTIVES.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.name} className="bg-background p-7 lg:p-9 hover:bg-surface transition-colors duration-200 group">
                <Icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-foreground mb-5 group-hover:text-brand-accent transition-colors"
                />
                <p className="text-[9px] tracking-[0.18em] uppercase font-bold text-brand-accent mb-2">
                  {a.action}
                </p>
                <h3 className="text-[17px] font-bold tracking-tight text-foreground mb-3">
                  {a.name}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">{a.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-10 border-t border-subtle">
          <p className="text-[14px] text-muted max-w-[440px] leading-relaxed">
            All formulas are manufactured in ISO-certified facilities and independently tested for safety, stability and efficacy before launch.
          </p>
          <a
            href="#"
            className="whitespace-nowrap inline-flex items-center gap-2 bg-foreground text-surface text-[11px]
                       tracking-[0.14em] uppercase font-semibold px-6 py-3 hover:bg-brand-accent transition-colors duration-200"
          >
            Read Our Research
          </a>
        </div>
      </div>
    </section>
  );
}
