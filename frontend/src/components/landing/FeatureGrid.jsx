import React from "react";
import Card from "../ui/Card";

const features = [
  {
    title: "AI social media post generation",
    description: "Create launch posts, promos, and ad copy tailored to your product and audience.",
  },
  {
    title: "Multilingual captions",
    description: "Publish local-first content in Amharic, Afaan Oromo, and Tigrinya with one click.",
  },
  {
    title: "AI image generation and enhancement",
    description: "Generate clean product visuals and improve low-light or noisy images instantly.",
  },
  {
    title: "Market-trend insights",
    description: "Track what is rising in your category and act before competitors do.",
  },
  {
    title: "Product analytics",
    description: "Monitor views, conversions, and engagement metrics across your catalog.",
  },
  {
    title: "Demand prediction",
    description: "Estimate future demand to plan inventory and pricing more confidently.",
  },
];

const FeatureGrid = () => {
  return (
    <section className="mt-14">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-5">
        <div>
          <div className="section-kicker">Features</div>
          <h3 className="mt-3 text-3xl font-bold">Everything you need to market faster.</h3>
        </div>
        <p className="max-w-xl text-sm text-slate-600">A practical set of tools for content generation, local-language outreach, and product performance tracking.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <Card key={f.title} className="p-5 flex items-start gap-4 animated-in">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center text-[#0f6b57] font-bold shrink-0">
              ✦
            </div>
            <div>
              <div className="font-semibold text-lg">{f.title}</div>
              <div className="text-sm leading-6 text-slate-600 mt-1">{f.description}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
