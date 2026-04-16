import React from "react";

const AISummaryCard = () => {
  return (
    <div className="soft-surface rounded-[1.75rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">AI Summary</div>
          <div className="font-semibold text-2xl mt-3 text-balance">
            Your products performed better this week, with views up 18% and messages up 26%.
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#102033] text-white flex items-center justify-center font-bold shadow-lg shadow-slate-900/15">
          ✦
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800 font-medium">Generate social posts</span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-900 font-medium">A/B test ad copy</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 font-medium">Refresh product descriptions</span>
      </div>
    </div>
  );
};

export default AISummaryCard;
