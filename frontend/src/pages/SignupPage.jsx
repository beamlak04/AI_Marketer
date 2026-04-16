import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { apiUrl } from "../lib/api";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    businessType: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (String(form.password).length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(apiUrl("/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setSuccess("Account created. Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch {
      setError("Unable to create account right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] soft-surface md:grid-cols-[1.05fr_0.95fr]">
        <div className="p-8 md:p-10 bg-white/80">
          <div className="text-2xl font-bold mb-2">Create an account</div>
          <p className="text-sm text-slate-600 mb-6">Set up your workspace and start generating marketing assets immediately.</p>
          <form className="grid grid-cols-1 gap-3" onSubmit={onSubmit}>
            <input
              className="p-3.5 border border-slate-200 rounded-2xl bg-white/80 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
            <input
              className="p-3.5 border border-slate-200 rounded-2xl bg-white/80 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Business type"
              value={form.businessType}
              onChange={(e) => updateField("businessType", e.target.value)}
            />
            <input
              className="p-3.5 border border-slate-200 rounded-2xl bg-white/80 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              type="tel"
            />
            <input
              className="p-3.5 border border-slate-200 rounded-2xl bg-white/80 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
            <input
              className="p-3.5 border border-slate-200 rounded-2xl bg-white/80 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              minLength={6}
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {success ? <p className="text-sm text-emerald-700">{success}</p> : null}
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up"}</Button>
              <Button variant="secondary" type="button" onClick={() => setError("Google sign-up is not configured yet.")}>
                Continue with Google
              </Button>
            </div>
            <p className="text-sm text-slate-600 pt-1">
              Already have an account? <Link className="text-[#0f6b57] font-semibold" to="/login">Sign in</Link>
            </p>
          </form>
        </div>
        <div className="bg-[#102033] p-8 md:p-10 text-white">
          <div className="section-kicker border-white/10 bg-white/10 text-white">Get set up</div>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-balance">Launch with product data, campaign ideas, and multilingual content from day one.</h1>
          <div className="mt-8 grid gap-3 text-sm text-white/78">
            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">Fast onboarding</div>
            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">Smart suggestions</div>
            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">Growth tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
