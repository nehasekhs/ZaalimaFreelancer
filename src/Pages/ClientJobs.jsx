import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ClientJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API}/api/projects/mine`, { headers: { "Authorization": `Bearer ${token}` }});
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">My Job Posts</h1>
        <Link to="/client/jobs/new" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600">Create Job</Link>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">Loading...</div>
      ) : jobs.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-gray-900 border border-gray-800">
          <p className="text-gray-300">No job posts yet.</p>
          <div className="mt-3">
            <Link to="/client/jobs/new" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600">Post your first job</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Floating chat button */}
          <Link to="/project-room/demo" className="fixed right-6 bottom-6 z-40">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 grid place-items-center shadow-lg">
              💬
            </div>
          </Link>

          {jobs.map((job, i) => (
            <motion.div key={job._id} className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div>
                <div className="font-semibold text-lg">{job.title}</div>
                <div className="text-sm text-gray-400 mt-0.5">{job.company} • {job.category} • {job.duration}</div>
                <div className="mt-2 text-sm text-gray-300">Budget: ₹{job.budgetMin} - ₹{job.budgetMax}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-300">
                  {job.tags?.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-gray-700">{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "—"}</span>
                <div className="flex gap-2">
                  <Link to={`/client/jobs/${job._id}/edit`} className="px-3 py-1.5 rounded bg-blue-600 text-white">Edit</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}


