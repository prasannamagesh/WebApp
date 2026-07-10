export default function Home() {
  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center bg-background">
        {/* Clinical eyebrow label */}
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-muted mb-6">
          Preventive Skin Science
        </p>

        {/* Headline */}
        <h1 className="text-[40px] sm:text-[60px] lg:text-[72px] font-bold tracking-[-0.03em] text-foreground leading-[1.05] text-balance max-w-3xl">
          Skin engineered
          <br />
          to last.
        </h1>

        {/* Accent rule */}
        <div className="mt-8 w-8 h-[2px] bg-brand-accent" />

        {/* Sub-copy */}
        <p className="mt-6 max-w-sm text-[14px] text-muted leading-relaxed text-pretty">
          Clinically formulated for prevention — not just correction. Built for
          how your skin ages, not how you want it to.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="#"
            className="px-8 py-3 bg-foreground text-surface text-[11px] font-medium tracking-[0.16em] uppercase
                       hover:bg-zinc-800 transition-colors duration-200"
          >
            Shop All
          </a>
          <a
            href="#"
            className="px-8 py-3 border border-zinc-300 text-foreground text-[11px] font-medium tracking-[0.16em] uppercase
                       hover:border-foreground transition-colors duration-200"
          >
            Take the Skin Test
          </a>
        </div>
      </section>

      {/* ─── Filler section (scroll demo) ────────────────────── */}
      <section className="py-32 px-6 bg-surface border-t border-subtle">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                num: '01',
                title: 'Diagnose',
                body: 'Our dermatologist-designed skin test identifies your exact profile in under 3 minutes.',
              },
              {
                num: '02',
                title: 'Formulate',
                body: 'Every product contains only the actives your skin needs — nothing superfluous.',
              },
              {
                num: '03',
                title: 'Prevent',
                body: 'Address the causes of skin ageing before they become visible — at the cellular level.',
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-brand-accent">
                  {step.num}
                </span>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] text-foreground">
                  {step.title}
                </h2>
                <p className="text-[14px] text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
