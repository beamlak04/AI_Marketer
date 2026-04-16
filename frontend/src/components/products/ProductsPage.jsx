import React, { useEffect, useState } from "react";
import { apiUrl, getAuthHeaders } from "../../lib/api";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/products/list"), {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load products");
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/products/add"), {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          ...form,
          price: Number(form.price || 0),
          stock: Number(form.stock || 0),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");
      setForm({ name: "", category: "", description: "", price: "", stock: "" });
      setOpen(false);
      await loadProducts();
    } catch (err) {
      setError(err.message || "Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    setError("");
    try {
      const res = await fetch(apiUrl(`/products/${id}`), {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete product");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  };

  const generateDescription = async () => {
    if (!form.name || !form.category) {
      setError("Product name and category are required for AI description.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/products/generate-description"), {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ name: form.name, category: form.category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate description");
      updateForm("description", data.description || "");
    } catch (err) {
      setError(err.message || "Failed to generate description");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="section-kicker">Products</div>
          <h3 className="mt-3 text-3xl font-bold text-slate-900">Manage your catalog and generate better listings.</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#0f6b57] text-white shadow-lg shadow-emerald-900/15 hover:bg-[#125f4f]"
          >
            Add Product
          </button>
        </div>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="soft-surface rounded-[1.75rem] overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full table-auto text-sm">
            <thead className="text-left bg-white/60">
              <tr className="text-slate-500 uppercase tracking-[0.16em] text-[11px]">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Views</th>
                <th className="p-4 font-semibold">Score</th>
                <th className="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-6 text-slate-500" colSpan={6}>Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td className="p-6 text-slate-500" colSpan={6}>No products yet. Add your first product to start generating campaigns.</td>
                </tr>
              ) : products.map((p) => (
                <tr key={p.id} className="border-t border-slate-200/80 bg-white/40">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-emerald-100 rounded-2xl border border-white shadow-inner" />
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-slate-500">Updated today</div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{Number(p.price || 0)} ETB</td>
                  <td className="p-4">{Number(p.stock || 0)}</td>
                  <td className="p-4">{Number(p.views || 0)}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
                      {Number(p.aiScore || p.score || 0)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="px-3 py-2 rounded-2xl bg-[#102033] text-white hover:bg-[#0a1520] transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-[#0f172a]/55 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl soft-surface rounded-[2rem] p-6 md:p-8">
            <h4 className="font-semibold text-2xl">Add product</h4>
            <p className="mt-2 text-sm text-slate-600">Enter product details once, then use AI to generate descriptions and campaign content.</p>
            <form className="grid grid-cols-1 gap-3 mt-5" onSubmit={addProduct}>
              <input
                className="p-3.5 border border-slate-200 rounded-2xl bg-white/80"
                placeholder="Name"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                required
              />
              <input
                className="p-3.5 border border-slate-200 rounded-2xl bg-white/80"
                placeholder="Category"
                value={form.category}
                onChange={(e) => updateForm("category", e.target.value)}
                required
              />
              <textarea
                className="p-3.5 border border-slate-200 rounded-2xl bg-white/80"
                placeholder="Description"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  className="p-3.5 border border-slate-200 rounded-2xl bg-white/80 flex-1"
                  placeholder="Price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => updateForm("price", e.target.value)}
                />
                <input
                  className="p-3.5 border border-slate-200 rounded-2xl bg-white/80 flex-1"
                  placeholder="Stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => updateForm("stock", e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={generateDescription}
                  className="px-4 py-2.5 bg-[#0f6b57] text-white rounded-2xl shadow-lg shadow-emerald-900/15"
                  disabled={saving}
                >
                  Generate Description with AI
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#102033] text-white rounded-2xl shadow-lg shadow-slate-900/10"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
