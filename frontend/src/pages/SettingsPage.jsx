import React, { useEffect, useState } from "react";
import { apiUrl, getAuthHeaders } from "../lib/api";

const SettingsPage = () => {
  const [form, setForm] = useState({
    name: "",
    businessType: "",
    phone: "",
    languagePreference: "Amharic",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(apiUrl("/auth/get"), {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load settings");

        setForm((prev) => ({
          ...prev,
          name: data.profile?.name || "",
          businessType: data.profile?.businessType || "",
          phone: data.profile?.phone || "",
          languagePreference: data.profile?.languagePreference || "Amharic",
          email: data.email || data.profile?.email || "",
        }));
      } catch (err) {
        setError(err.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(apiUrl("/auth/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          businessType: form.businessType,
          languagePreference: form.languagePreference,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save settings");
      if (form.email) {
        localStorage.setItem("userEmail", form.email);
      }
      setMessage("Settings saved successfully.");
    } catch (err) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-semibold">Settings</h3>
      <div className="mt-4 bg-white card-plain p-4 rounded-2xl">
        {loading ? <p className="text-sm text-slate-500">Loading settings...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

        <label className="block text-sm mt-3">Full name</label>
        <input
          className="w-full p-2 border rounded-md mt-1"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <label className="block text-sm mt-3">Business type</label>
        <input
          className="w-full p-2 border rounded-md mt-1"
          value={form.businessType}
          onChange={(e) => updateField("businessType", e.target.value)}
        />

        <label className="block text-sm mt-3">Phone</label>
        <input
          className="w-full p-2 border rounded-md mt-1"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />

        <label className="block text-sm mt-3">Email</label>
        <input className="w-full p-2 border rounded-md mt-1 bg-slate-100" value={form.email} readOnly />

        <label className="block text-sm mt-3">Language preference</label>
        <select
          className="w-full p-2 border rounded-md mt-1"
          value={form.languagePreference}
          onChange={(e) => updateField("languagePreference", e.target.value)}
        >
          <option>Amharic</option>
          <option>Afaan Oromo</option>
          <option>Tigrinya</option>
          <option>English</option>
        </select>

        <div className="mt-4">
          <button
            onClick={saveSettings}
            disabled={saving || loading}
            className="px-4 py-2 rounded-xl bg-[#102033] text-white hover:bg-[#0a1520] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
