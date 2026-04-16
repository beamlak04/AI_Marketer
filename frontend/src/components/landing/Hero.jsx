import React from "react";
import Button from "../ui/Button";
const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pt-4 md:px-6 md:pt-6">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(31,141,109,0.22),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,183,77,0.22),transparent_26%)]"></div>
      <div className="absolute -left-28 top-8 w-80 h-80 shape-blob"></div>
      <div className="max-w-7xl mx-auto hero-panel rounded-[2.5rem] px-6 py-10 md:px-10 md:py-14 relative overflow-hidden animated-in">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-10">
          <div className="lg:pr-8">
            <div className="section-kicker">Built for local brands</div>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[0.95] text-white text-balance">
              Your AI marketer for fast-moving Ethiopian businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-white/78 text-balance">
              Generate campaign copy, local-language captions, product insights, and pricing ideas from one focused dashboard.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button>Get Started</Button>
              <Button variant="secondary">Try Demo</Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/70">
              <div className="rounded-full border border-white/15 bg-white/6 px-4 py-2">Amharic support</div>
              <div className="rounded-full border border-white/15 bg-white/6 px-4 py-2">Product analytics</div>
              <div className="rounded-full border border-white/15 bg-white/6 px-4 py-2">Campaign builder</div>
            </div>
            </div>
          <div className="lg:pl-6">
            <div className="soft-surface rounded-[2rem] p-5 md:p-6 text-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Live preview</div>
                  <div className="mt-1 text-xl font-bold">Ready-to-post campaign copy</div>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">+24% CTR</div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-[#102033] p-4 text-white shadow-xl shadow-slate-900/20">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/55">Amharic</div>
                  <p className="mt-2 text-lg font-medium leading-relaxed">
                    የእጅ ስራ ምርቶችን ዛሬ ይዘው ይቀድሙ. አዲሱ የጥራት ስብስብ በግብይትዎ ላይ ቀልጣፋ ትርፍ ያመጣል.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Afaan Oromo</div>
                  <p className="mt-2 text-base text-slate-700">
                    Uummata keessaniif ergaa sirrii qopheessi. Oduu, ibsa oomishaa fi promo tokkotti walitti qabnee siif qopheessina.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
