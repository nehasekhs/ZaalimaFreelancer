
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function BrowseProjects() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [skills, setSkills] = useState("");


  async function load() {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (category) params.append("category", category);
    if (minBudget) params.append("minBudget", minBudget);
    if (maxBudget) params.append("maxBudget", maxBudget);
    if (duration) params.append("duration", duration);
    if (skills) params.append("skills", skills);
    const res = await fetch(`${API}/api/projects?${params.toString()}`);
    const data = await res.json();
    setItems(data);
  }

  async function loadDemo() {
    const res = await fetch(`${API}/api/projects/demo`);
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-white">
      <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Find Work</h1>
  <div className="mt-6 p-4 rounded-xl bg-gray-900 border border-gray-800 grid grid-cols-1 md:grid-cols-6 gap-3">
        <input placeholder="Search" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={q} onChange={(e)=>setQ(e.target.value)} />
        <input placeholder="Category" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={category} onChange={(e)=>setCategory(e.target.value)} />
        <input placeholder="Min Budget" type="number" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={minBudget} onChange={(e)=>setMinBudget(e.target.value)} />
        <input placeholder="Max Budget" type="number" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={maxBudget} onChange={(e)=>setMaxBudget(e.target.value)} />
        <input placeholder="Duration" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={duration} onChange={(e)=>setDuration(e.target.value)} />
        <input placeholder="Skills (comma)" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={skills} onChange={(e)=>setSkills(e.target.value)} />
        <div className="md:col-span-6 flex gap-3">
          <button onClick={load} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600">Apply Filters</button>
          <button onClick={loadDemo} className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500">Show Demo Projects</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <motion.div key={p._id} className="p-5 rounded-xl bg-gray-900 border border-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
          >
            <div className="font-semibold text-lg">{p.title}</div>
            <div className="text-sm text-gray-400">{p.company} • {p.category} • {p.duration}</div>
            <div className="mt-2 text-sm text-gray-300">Budget: ₹{p.budgetMin} - ₹{p.budgetMax}</div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-300">
              {p.tags?.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-gray-700">{t}</span>
              ))}
            </div>
            {p.videoUrl && (
              <video controls className="mt-4 rounded-lg w-full border border-pink-500 shadow-lg">
                <source src={p.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {p.description && (
              <div className="mt-3 text-gray-400 text-sm">{p.description}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}


