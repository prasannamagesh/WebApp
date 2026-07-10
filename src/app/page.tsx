export default function Home() {
  return (
    <main>
      {/* Hero — tall section so sticky nav is visible on scroll */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center bg-[#f9f8f6]">
        <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
          New arrivals — Summer 2025
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-foreground leading-tight text-balance">
          Skin that speaks
          <br />
          for itself.
        </h1>
        <p className="mt-6 max-w-md text-base text-muted leading-relaxed text-pretty">
          Science-backed formulas rooted in nature. Find your ritual with our
          personalised skin test.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#"
            className="px-8 py-3 bg-foreground text-surface text-xs tracking-[0.12em] uppercase hover:opacity-80 transition-opacity"
          >
            Shop Now
          </a>
          <a
            href="#"
            className="px-8 py-3 border border-foreground text-foreground text-xs tracking-[0.12em] uppercase hover:bg-foreground hover:text-surface transition-colors"
          >
            Skin Test
          </a>
        </div>
      </section>

      {/* Filler section to allow scrolling */}
      <section className="py-32 px-6 bg-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Our philosophy
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-snug text-balance">
            Fewer ingredients. Greater impact.
          </h2>
          <p className="mt-6 max-w-lg mx-auto text-base text-muted leading-relaxed">
            Every formula is distilled to its essential truth — no fillers, no
            compromise. Just the active ingredients your skin has been waiting for.
          </p>
        </div>
      </section>
    </main>
  );
}
