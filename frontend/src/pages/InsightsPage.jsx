import React from "react";

const InsightsPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <div className="section-kicker">Insights</div>
        <h3 className="mt-3 text-3xl font-bold text-slate-900">Trend signals and forecast snapshots.</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="soft-surface rounded-[1.75rem] p-5">
          <h4 className="font-semibold text-lg">Trending product categories</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between rounded-2xl bg-white/70 p-3 border border-slate-200"><span>Handmade Fashion</span><strong className="text-emerald-700">+19%</strong></li>
            <li className="flex items-center justify-between rounded-2xl bg-white/70 p-3 border border-slate-200"><span>Local Coffee Products</span><strong className="text-emerald-700">+13%</strong></li>
            <li className="flex items-center justify-between rounded-2xl bg-white/70 p-3 border border-slate-200"><span>Organic Skincare</span><strong className="text-emerald-700">+9%</strong></li>
            <li className="flex items-center justify-between rounded-2xl bg-white/70 p-3 border border-slate-200"><span>Home Decor</span><strong className="text-emerald-700">+7%</strong></li>
          </ul>
        </div>
        <div className="soft-surface rounded-[1.75rem] p-5">
          <h4 className="font-semibold text-lg">Predicted sales</h4>
          <div className="mt-4 space-y-3">
            {[
              { label: "This Week", value: "1,240 ETB", width: "55%" },
              { label: "Next Week", value: "1,520 ETB", width: "68%" },
              { label: "In Two Weeks", value: "1,710 ETB", width: "76%" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">{row.label}</span>
                  <span className="font-semibold">{row.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#0f6b57]" style={{ width: row.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
