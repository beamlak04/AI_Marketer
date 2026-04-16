import React from "react";
import clsx from "clsx";

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-[0.985]";
  const styles = {
    primary: "bg-[#0f6b57] text-white shadow-lg shadow-emerald-900/15 hover:-translate-y-0.5 hover:bg-[#125f4f]",
    secondary: "bg-white/80 border border-slate-200 text-[#102033] hover:border-slate-300 hover:bg-white",
    ghost: "bg-transparent text-[#0f6b57] hover:bg-emerald-50",
  };
  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
