import React from "react";
import Card from "../ui/Card";

const cards = [
  {
    title: "AI-powered marketing",
    desc: "Generate copy, images, and campaign ideas that sound native to your market.",
  },
  {
    title: "Smart customer insights",
    desc: "See what shoppers click, buy, and ignore before you spend more on ads.",
  },
  {
    title: "Business data dashboard",
    desc: "Track sales, views, and ad performance from one clean command center.",
  },
];

const ValueCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {cards.map((c) => (
        <Card className="p-6 animated-in" key={c.title}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">01</div>
              <div className="mt-2 font-semibold text-xl">{c.title}</div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              ↗
            </div>
          </div>
          <div className="mt-4 text-sm leading-6 text-slate-600">{c.desc}</div>
        </Card>
      ))}
    </section>
  );
};

export default ValueCards;
