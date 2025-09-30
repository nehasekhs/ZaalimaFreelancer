import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Reviews() {
  const { userId } = useParams();
  const [data, setData] = useState({ reviews: [], stats: { averageRating: 0, totalReviews: 0, ratingDistribution: [] } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const demoPayload = {
    stats: { averageRating: 4.8, totalReviews: 3, ratingDistribution: [5,5,4] },
    reviews: [
      { _id: "d1", reviewer: { name: "Sarah Johnson" }, rating: 5, title: "Excellent work quality!", comment: "Delivered beyond expectations and great communication.", createdAt: new Date().toISOString(), project: { title: "E‑commerce Redesign" } },
      { _id: "d2", reviewer: { name: "Mike Chen" }, rating: 5, title: "Professional and reliable", comment: "On time delivery and superb support.", createdAt: new Date(Date.now()-86400000).toISOString(), project: { title: "Mobile App MVP" } },
      { _id: "d3", reviewer: { name: "Aisha Patel" }, rating: 4, title: "Solid work", comment: "Good quality, minor revisions handled quickly.", createdAt: new Date(Date.now()-3*86400000).toISOString(), project: { title: "Brand Website" } },
    ],
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Demo route: show local data without API
        if (userId === "demo") {
          if (!cancelled) setData(demoPayload);
          return;
        }

        const res = await fetch(`${API}/api/reviews/user/${userId}`);
        if (!res.ok) {
          throw new Error(`Failed to load reviews (${res.status})`);
        }
        const payload = await res.json();
        if (!cancelled) setData(payload || { reviews: [], stats: { averageRating: 0, totalReviews: 0, ratingDistribution: [] } });
      } catch (e) {
        if (userId === "demo") {
          if (!cancelled) setData(demoPayload);
        } else {
          setError(e.message || "Failed to load reviews.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [userId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-400"}>★</span>
    ));
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Loading reviews...</div>;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Reviews & Ratings</h1>
        {error && (
          <div className="mt-4 p-3 rounded bg-red-900/60 border border-red-700 text-sm">{error}</div>
        )}
        {/* Stats Card */}
        <motion.div className="mt-6 p-6 rounded-xl bg-gray-900 border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{(data.stats.averageRating ?? 0).toFixed(1)}</div>
              <div className="text-sm text-gray-400">Average Rating</div>
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(data.stats.averageRating || 0))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{data.stats.totalReviews || 0}</div>
              <div className="text-sm text-gray-400">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {data.stats.ratingDistribution?.filter(r => r >= 4).length || 0}
              </div>
              <div className="text-sm text-gray-400">Positive Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {data.reviews.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-gray-900 border border-gray-800">
            <p className="text-gray-400">No reviews yet.</p>
          </div>
        ) : (
          data.reviews.map((review, i) => (
            <motion.div key={review._id || i} className="p-6 rounded-xl bg-gray-900 border border-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-lg">
                  {review.reviewer?.name?.charAt(0) || "?"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.reviewer?.name || "Anonymous"}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{review.title}</h3>
                  <p className="text-gray-300">{review.comment}</p>
                  {review.project && (
                    <div className="mt-2 text-sm text-gray-500">
                      Project: {review.project.title}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
