import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Home, Megaphone, MessageSquareText, Package, Settings } from "lucide-react";

const items = [
  { to: "/app", label: "Home", icon: Home },
  { to: "/app/assistant", label: "AI Assistant", icon: MessageSquareText },
  { to: "/app/products", label: "Products", icon: Package },
  { to: "/app/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/app/insights", label: "Insights", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const loc = useLocation();
  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:justify-between md:p-5 md:sticky md:top-0 md:h-screen">
      <div className="soft-surface rounded-[2rem] p-5 h-full flex flex-col">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0f6b57] to-[#1f8d6d] flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/20">
            M
          </div>
          <div>
            <div className="font-bold text-lg">MarketMeda</div>
            <div className="text-xs text-slate-500">AI marketer for local commerce</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((item) => {
            const active = loc.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  active
                    ? "bg-[#0f6b57] text-white shadow-lg shadow-emerald-900/15"
                    : "text-slate-700 hover:bg-white/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-3xl bg-[#102033] text-white p-4">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">Status</div>
          <div className="mt-2 font-semibold">Ready to generate campaigns</div>
          <div className="mt-1 text-sm text-white/70">Connect your products, launch content, and review results in one workspace.</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
