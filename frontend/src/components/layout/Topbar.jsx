import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, SearchIcon, Sparkles } from "lucide-react";

const Topbar = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "MarketMeda";

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="px-4 pt-4 md:px-6 md:pt-6">
      <div className="soft-surface rounded-[1.75rem] px-4 py-3 md:px-5 md:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            AI-powered growth
          </div>
          <div className="relative flex-1 max-w-xl">
            <input
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 pl-11 pr-4 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Search products, campaigns, or insights"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-2xl bg-white/70 hover:bg-white border border-slate-200">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#102033] to-[#1f8d6d] text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-900/15">
              MA
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold text-slate-900">{userEmail}</div>
              <div className="text-xs text-slate-500">Workspace owner</div>
            </div>
            <button
              onClick={signOut}
              className="ml-2 text-xs px-3 py-2 rounded-xl bg-[#102033] text-white hover:bg-[#0a1520]"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
