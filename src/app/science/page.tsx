import Image from 'next/image';
import { Beaker, Shield, Leaf } from 'lucide-react';

const SCIENCE_SECTIONS = [
  {
    title: 'Our Philosophy',
    description: 'We believe skincare should work like medicine — with transparent ingredients, proven concentrations, and zero compromise. Every formula is built on years of dermatological research.',
    points: [
      'Clinically validated ingredients',
      'Proven concentrations, not trace amounts',
      'Zero questionable chemicals',
      'Preventive, not reactive skincare',
    ],
  },
  {
    title: 'Our Formulation Process',
    description: 'Each product goes through rigorous testing to ensure safety, efficacy, and stability.',
    points: [
      'Dermatologist consultation',
      'Lab testing and validation',
      'Stability testing (3+ months)',
      'User trial with real skin types',
    ],
  },
  {
    title: 'Key Active Ingredients',
    description: 'We use ingredients that have strong clinical data behind them.',
    points: [
      'Ectoin — stress-shield molecule',
      'Niacinamide — multi-benefit powerhouse',
      'Retinol — gold standard anti-aging',
      'Hyaluronic Acid — deep hydration',
    ],
  },
];

export default function SciencePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="bg-zinc-900 text-white py-20 sm:py-28 pt-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-brand-accent uppercase text-xs tracking-wider font-bold mb-4">OUR PHILOSOPHY</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
                We Skipped the Fancy Packaging.
                <span className="text-brand-accent"> The Formula Is the Product.</span>
              </h1>
              <p className="text-lg text-zinc-300 max-w-lg">
                DermFix was built on a single belief: that skincare should work the way medicine does — with transparent ingredients, proven concentrations, and zero compromise.
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative h-96 lg:h-full">
              <Image
                src="/images/science-hero.png"
                alt="Scientific skincare research"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key sections */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {SCIENCE_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-6">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl">
                  {idx === 0 && <Shield size={24} className="text-brand-accent" />}
                  {idx === 1 && <Beaker size={24} className="text-brand-accent" />}
                  {idx === 2 && <Leaf size={24} className="text-brand-accent" />}
                </div>

                {/* Title and description */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{section.title}</h2>
                  <p className="text-muted leading-relaxed">{section.description}</p>
                </div>

                {/* Points */}
                <ul className="space-y-3">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent/10 flex-shrink-0 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      </span>
                      <span className="text-[15px] text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient spotlight */}
      <section className="py-20 sm:py-28 bg-blue-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-4xl sm:text-5xl font-black text-foreground text-center mb-16">
            Why Our Ingredients Matter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-3">2% Ectoin</h3>
              <p className="text-muted mb-4">
                A naturally occurring stress-shield molecule that strengthens skin's barrier function and reduces inflammation. Used in medical-grade skincare for sensitive and reactive skin.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-accent font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                Clinically proven effective
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-3">5% Niacinamide</h3>
              <p className="text-muted mb-4">
                A potent form of Vitamin B3 that regulates sebum, minimizes pores, and strengthens skin barrier. The gold standard for brightening and pore refinement.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-accent font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                Dermatologist favorite
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-3">0.3% Retinol</h3>
              <p className="text-muted mb-4">
                Microencapsulated retinol for gentle yet effective anti-aging results. Reduces fine lines, improves texture, and boosts collagen production without harsh irritation.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-accent font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                Stabilized formula
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-3">3% Hyaluronic Acid Complex</h3>
              <p className="text-muted mb-4">
                Multi-weight HA molecules that hydrate at different skin depths. Plumps skin, reduces fine lines, and maintains moisture for 24+ hours.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-accent font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                Triple hydration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Testing */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Safety & Testing</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Every DermFix product meets rigorous safety and efficacy standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: 'Dermatologist Tested', desc: 'Approved by certified dermatologists' },
              { label: 'Cruelty Free', desc: 'Never tested on animals' },
              { label: 'Fragrance Free', desc: 'No synthetic fragrances or essential oils' },
              { label: 'Paraben Free', desc: 'Clean preservative system only' },
              { label: 'Hypoallergenic', desc: 'Safe for sensitive skin types' },
              { label: 'Stability Tested', desc: '6+ month testing protocol' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-blue-50 rounded-xl">
                <p className="font-bold text-foreground mb-2">{item.label}</p>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-accent text-white text-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to Experience Science-Led Skincare?</h2>
          <p className="text-lg opacity-90 mb-8">
            Explore our complete range of clinically proven formulas.
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-4 bg-white text-brand-accent font-bold rounded-lg
                       hover:opacity-90 transition-opacity"
          >
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
}
