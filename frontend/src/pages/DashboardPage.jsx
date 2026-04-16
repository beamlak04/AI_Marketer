import React from "react";
import AISummaryCard from "../components/dashboard/AISummaryCard";
import ProductInsights from "../components/dashboard/ProductInsights";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)] gap-6">
      <div className="space-y-6">
        <AISummaryCard />
        <div className="soft-surface rounded-[1.75rem] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Weekly Analytics</div>
              <h4 className="mt-2 text-2xl font-bold">Momentum is building across the storefront.</h4>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">+18.4% week over week</div>
          </div>
          <div className="mt-6 space-y-4">
            {[
              { label: "Profile Visits", value: "+18%", width: "72%" },
              { label: "Product Clicks", value: "+11%", width: "58%" },
              { label: "Messages Received", value: "+26%", width: "83%" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">{row.label}</span>
                  <span className="font-semibold text-mm-green">{row.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-mm-bright"
                    style={{ width: row.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="space-y-6">
        <ProductInsights />
        <div className="soft-surface rounded-[1.75rem] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">AI Suggestions</div>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="rounded-2xl bg-white/70 p-3 border border-slate-200">Generate a promo for Product X with a stronger seasonal angle.</li>
            <li className="rounded-2xl bg-white/70 p-3 border border-slate-200">Try a price test for Product Y to improve margin without lowering demand.</li>
            <li className="rounded-2xl bg-white/70 p-3 border border-slate-200">Repurpose your top post into a multilingual ad set.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default DashboardPage;
