import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function WriteReview() {
  const { projectId, revieweeId, type } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ rating: 5, title: "", comment: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to write a review.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          projectId,
          revieweeId,
          rating: form.rating,
          title: form.title,
          comment: form.comment,
          type,
        }),
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to submit review");
      }
      
      navigate(`/reviews/${revieweeId}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setForm({ ...form, rating: i + 1 })}
        className={i < rating ? "text-yellow-400 text-2xl" : "text-gray-400 text-2xl"}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto text-white">
      <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent mb-6">
        Write a Review
      </h1>
      
      <motion.form onSubmit={submit} className="p-6 rounded-xl bg-gray-900 border border-gray-800 space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <label className="block text-sm text-gray-300 mb-2">Rating</label>
          <div className="flex gap-1">
            {renderStars(form.rating)}
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-2">Review Title</label>
          <input
            className="w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Summarize your experience"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-2">Your Review</label>
          <textarea
            rows={6}
            className="w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            placeholder="Share your detailed experience working with this person..."
            required
          />
        </div>
        
        <div className="flex gap-3">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </motion.button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
}
