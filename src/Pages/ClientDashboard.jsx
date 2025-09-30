import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ClientDashboard() {
  const cards = [
    { label: "Open Jobs", value: 3 },
    { label: "Active Hires", value: 2 },
    { label: "Total Spend", value: "₹1,80,000" },
    { label: "Interviews", value: 4 },
  ];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Client Dashboard</h1>
        <Link to="/client/jobs/new" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600">Post a Job</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <motion.div key={c.label} className="p-5 rounded-xl bg-gray-900 border border-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
          >
            <div className="text-gray-400 text-sm">{c.label}</div>
            <div className="text-2xl font-bold mt-1">{c.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-semibold mb-3">Manage Jobs</h2>
        <p className="text-gray-400">Go to <Link to="/client/jobs" className="text-pink-400">My Job Posts</Link> to edit or manage your postings.</p>
      </div>
    </div>
  );
}


