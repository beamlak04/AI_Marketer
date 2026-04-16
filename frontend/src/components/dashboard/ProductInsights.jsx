import React from "react";

const ProductInsights = () => {
  return (
    <div className="soft-surface rounded-[1.75rem] p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg">Top Product</h4>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Trending</span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-emerald-100 border border-white shadow-inner" />
        <div>
          <div className="font-semibold text-lg">Handmade Shemma Scarf</div>
          <div className="text-sm text-slate-600 mt-1">Views: 3,241 • Score: 87</div>
        </div>
      </div>
      <div className="mt-4 rounded-2xl bg-white/80 p-4 text-sm text-slate-700 border border-slate-200">
        Suggested improvements: tighten the product story, add seasonal hashtags, and test a bundle offer.
      </div>
    </div>
  );
};

export default ProductInsights;
