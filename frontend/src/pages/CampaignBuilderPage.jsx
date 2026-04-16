import React, { useEffect, useMemo, useState } from "react";
import { apiUrl, getAuthHeaders } from "../lib/api";

const CampaignBuilderPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [language, setLanguage] = useState("Amharic");
  const [tone, setTone] = useState("Fun");
  const [caption, setCaption] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(apiUrl("/products/list"), {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load products");
        const list = Array.isArray(data) ? data : [];
        setProducts(list);
        if (list.length) setSelectedProductId(list[0].id);
      } catch (err) {
        setError(err.message || "Failed to load products");
      }
    };

    loadProducts();
  }, []);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId]
  );

  const generatePost = async () => {
    if (!selectedProduct) {
      setError("Add a product first before generating campaign copy.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const prompt = [
        `Create one high-converting social media caption in ${language}.`,
        `Use a ${tone.toLowerCase()} tone.`,
        `Product: ${selectedProduct.name}`,
        `Category: ${selectedProduct.category || "General"}`,
        `Description: ${selectedProduct.description || "No description provided"}`,
        "Include one strong CTA and 2-3 relevant hashtags.",
      ].join("\n");

      const res = await fetch(apiUrl("/chat/message"), {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          message: prompt,
          conversationId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate campaign");
      setConversationId(data.conversationId || null);
      setCaption(data.reply || "");
    } catch (err) {
      setError(err.message || "Failed to generate campaign");
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = () => {
    if (!caption.trim()) return;
    localStorage.setItem("campaignDraft", caption);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="section-kicker">Campaign Builder</div>
        <h3 className="mt-3 text-3xl font-bold text-slate-900">Draft high-converting posts in one place.</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5">
        <div className="soft-surface rounded-[1.75rem] p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Product</label>
            <select
              className="w-full mt-2 p-3.5 border border-slate-200 rounded-2xl bg-white/80"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              {products.length === 0 ? <option value="">No products available</option> : null}
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Language</label>
            <select
              className="w-full mt-2 p-3.5 border border-slate-200 rounded-2xl bg-white/80"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>Amharic</option>
              <option>Afaan Oromo</option>
              <option>Tigrinya</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Tone</label>
            <select
              className="w-full mt-2 p-3.5 border border-slate-200 rounded-2xl bg-white/80"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Fun</option>
              <option>Formal</option>
              <option>Persuasive</option>
            </select>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="rounded-2xl bg-[#102033] text-white p-4">
            <div className="text-xs uppercase tracking-[0.22em] text-white/55">Recommendation</div>
            <div className="mt-2 text-sm text-white/80">Best results so far come from short persuasive captions with a clear CTA.</div>
          </div>
        </div>
        <div className="soft-surface rounded-[1.75rem] p-5">
          <label className="text-sm font-medium text-slate-700">Caption</label>
          <textarea
            className="w-full mt-2 p-4 border border-slate-200 rounded-2xl bg-white/80 h-44"
            placeholder="Your generated campaign caption will appear here..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={generatePost}
              className="px-4 py-2.5 bg-[#0f6b57] text-white rounded-2xl shadow-lg shadow-emerald-900/15"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Post"}
            </button>
            <button
              onClick={saveDraft}
              className="px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 hover:bg-slate-50"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilderPage;
