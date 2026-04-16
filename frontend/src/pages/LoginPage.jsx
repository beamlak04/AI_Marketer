import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { apiUrl, isLoggedIn } from "../lib/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/app", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("refreshToken", data.refreshToken || "");
      localStorage.setItem("userEmail", data.email || data?.profile?.email || email);
      navigate("/app");
    } catch {
      setError("Unable to login right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] soft-surface md:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-[#102033] p-8 md:p-10 text-white">
          <div className="section-kicker border-white/10 bg-white/10 text-white">Welcome back</div>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-balance">Sign in to keep your products, campaigns, and AI suggestions in sync.</h1>
          <p className="mt-4 text-white/72 max-w-md">Resume from where you left off and keep building content faster than your competition.</p>
          <div className="mt-10 grid gap-3 text-sm text-white/78">
            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">Campaign drafts</div>
            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">Product analytics</div>
            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">Assistant chat</div>
          </div>
        </div>
        <div className="p-8 md:p-10 bg-white/80">
          <div className="text-2xl font-bold mb-2">Sign in to MarketMeda</div>
          <p className="text-sm text-slate-600 mb-6">Use your account to access the dashboard and AI assistant.</p>
          <form className="space-y-3" onSubmit={onSubmit}>
            <input
              className="w-full p-3.5 border border-slate-200 rounded-2xl bg-white/80 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <input
              className="w-full p-3.5 border border-slate-200 rounded-2xl bg-white/80 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Continue"}</Button>
              <Button variant="secondary" type="button" onClick={() => setError("Google sign-in is not configured yet.")}>
                Continue with Google
              </Button>
            </div>
            <p className="text-sm text-slate-600 pt-1">
              New here? <Link className="text-[#0f6b57] font-semibold" to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
