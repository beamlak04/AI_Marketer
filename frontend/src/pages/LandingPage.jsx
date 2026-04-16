import React from "react";
import Hero from "../components/landing/Hero";
import ValueCards from "../components/landing/ValueCards";
import FeatureGrid from "../components/landing/FeatureGrid";

const LandingPage = () => {
  return (
    <div className="text-slate-900">
      <Hero />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <ValueCards />
        <FeatureGrid />
        <section className="mt-12 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="soft-surface rounded-[2rem] p-6 md:p-8">
            <div className="section-kicker">How it works</div>
            <h2 className="mt-4 text-3xl font-bold">Three steps from idea to campaign.</h2>
            <div className="mt-6 grid gap-4">
              {[
                ["1. Add your product", "Drop in the product name, price, and one-line description."],
                ["2. Generate assets", "Get captions, campaign angles, and performance suggestions."],
                ["3. Launch and refine", "Track results and use AI to improve the next post."],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-4 rounded-2xl bg-white/70 p-4 border border-slate-200">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-[#102033] text-white flex items-center justify-center font-semibold">{title.split(".")[0]}</div>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-slate-600 mt-1">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="soft-surface rounded-[2rem] p-6 md:p-8">
            <div className="section-kicker">MarketMeda snapshot</div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-[#102033] text-white p-5">
                <div className="text-sm text-white/60">Today's priority</div>
                <div className="mt-2 text-2xl font-bold">Launch 2 captions and 1 product offer</div>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-slate-200">
                <div className="text-sm text-slate-500">Projected lift</div>
                <div className="mt-1 text-3xl font-bold text-emerald-700">+24%</div>
                <div className="mt-2 text-sm text-slate-600">Based on your recent engagement and catalog performance.</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-10 text-center text-sm text-slate-600">
        © MarketMeda • About • Contact • Privacy • Terms
      </footer>
    </div>
  );
};

export default LandingPage;
