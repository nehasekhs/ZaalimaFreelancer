import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function JobForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ title: "", company: "", description: "", budgetMin: "", budgetMax: "", duration: "", category: "", tags: "" });
  const isEdit = Boolean(id);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const res = await fetch(`${API}/api/projects/${id}`);
      const data = await res.json();
      setForm({
        title: data.title || "",
        company: data.company || "",
        description: data.description || "",
        budgetMin: data.budgetMin || "",
        budgetMax: data.budgetMax || "",
        duration: data.duration || "",
        category: data.category || "",
        tags: (data.tags || []).join(", "),
      });
    })();
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to create or edit a job.");
      return;
    }
    const payload = {
      ...form,
      budgetMin: Number(form.budgetMin),
      budgetMax: Number(form.budgetMax),
      tags: form.tags.split(",").map(s=>s.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(`${API}/api/projects${isEdit ? `/${id}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      navigate("/client/jobs");
    } catch (err) {
      alert(err.message || "Network error. Check backend and CORS.");
    }
  };

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto text-white">
      <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">{isEdit ? "Edit Job" : "Create Job"}</h1>
      <motion.form onSubmit={submit} className="mt-6 p-6 rounded-xl bg-gray-900 border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <label className="block">
          <span className="text-sm text-gray-300">Title</span>
          <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-gray-300">Company</span>
          <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.company} onChange={(e)=>setForm({ ...form, company: e.target.value })} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm text-gray-300">Description</span>
          <textarea rows="4" className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.description} onChange={(e)=>setForm({ ...form, description: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-gray-300">Budget Min (₹)</span>
          <input type="number" className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.budgetMin} onChange={(e)=>setForm({ ...form, budgetMin: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-gray-300">Budget Max (₹)</span>
          <input type="number" className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.budgetMax} onChange={(e)=>setForm({ ...form, budgetMax: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-gray-300">Duration</span>
          <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.duration} onChange={(e)=>setForm({ ...form, duration: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-gray-300">Category</span>
          <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.category} onChange={(e)=>setForm({ ...form, category: e.target.value })} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm text-gray-300">Tags (comma separated)</span>
          <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={form.tags} onChange={(e)=>setForm({ ...form, tags: e.target.value })} />
        </label>
        <div className="md:col-span-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600">
            {isEdit ? "Save Changes" : "Create Job"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}


