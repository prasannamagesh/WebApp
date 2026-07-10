import { ArrowRight, Sparkles } from 'lucide-react';

const STEPS = [
  { step: '01', label: 'Answer 3-minute skin quiz' },
  { step: '02', label: 'Get your skin profile' },
  { step: '03', label: 'Receive your personalised routine' },
];

export default function SkinTestBanner() {
  return (
    <section id="skin-test" className="py-14 lg:py-20" style={{ backgroundColor: '#e8005a' }}>
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 mb-5 bg-surface/15 px-3 py-1.5 rounded-full">
              <Sparkles size={12} strokeWidth={2} className="text-surface" />
              <span className="text-[10px] tracking-[0.14em] uppercase font-semibold text-surface">
                AI-Powered
              </span>
            </div>
            <h2 className="text-[34px] lg:text-[46px] font-black leading-[1.05] tracking-tight text-balance mb-5" style={{ color: '#ffffff' }}>
              Not Sure Where to Start?
              <br />
              Take the Skin Test.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8 max-w-[440px] text-pretty" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Our dermatologist-designed quiz analyses your skin type, concerns and lifestyle to build
              a personalised DermFix routine — in under 3 minutes.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 bg-surface text-foreground text-[12px]
                         tracking-[0.12em] uppercase font-bold px-8 py-4 hover:bg-foreground
                         hover:text-surface transition-colors duration-200"
            >
              Take the Free Skin Test
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right — steps */}
          <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            {STEPS.map((s) => (
              <div key={s.step} className="flex items-center gap-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <span className="text-[11px] font-bold tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.step}</span>
                <p className="text-[15px] font-semibold tracking-tight" style={{ color: '#ffffff' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
