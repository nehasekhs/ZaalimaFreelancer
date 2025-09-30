import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFreelancerProfile, getCategoryTitle } from "../data/freelancers";
import { getFreelancerReviewsApi, submitReviewApi } from "../api";

function FreelancerProfile() {
  const { category, id } = useParams();
  const title = getCategoryTitle(category);
  const person = getFreelancerProfile(title, id);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getFreelancerReviewsApi(id, 1, 10);
      setReviews(response.reviews || []);
      setAverageRating(response.averageRating || 0);
      setTotalReviews(response.totalReviews || 0);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      await submitReviewApi({
        freelancerId: id,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment
      });
      
      setMessage("Review submitted successfully!");
      setReviewForm({ rating: 5, title: "", comment: "" });
      setShowReviewForm(false);
      fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Error submitting review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!person) {
    return <p className="text-center text-red-500 mt-10">Freelancer not found.</p>;
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        <motion.img
          src={person.img}
          alt={person.name}
          className="w-40 h-40 rounded-full border-4 border-green-500"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{person.name}</h1>
          <p className="text-gray-400 text-lg">{person.title}</p>
          <p className="text-gray-400 mt-1">{person.location}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="bg-green-600 px-2 py-1 rounded text-sm">{person.topRated}</span>
            {person.verified && <span className="bg-blue-600 px-2 py-1 rounded text-sm">Verified</span>}
          </div>
          <div className="flex gap-6 mt-3 text-gray-300">
            <p>⭐ {person.rating}</p>
            <p>${person.price}/hr</p>
            <p>{person.successRate}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">About</h2>
        <p className="text-gray-300 leading-relaxed">{person.bio}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {person.skills?.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-green-600 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Work History</h2>
        <div className="space-y-4">
          {person.history?.map((job, i) => (
            <motion.div key={i} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-gray-400 text-sm">{job.status}</p>
              </div>
              <div className="text-yellow-400 font-semibold">⭐ {job.rating}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {person.portfolio && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Portfolio</h2>
          <a href={person.portfolio} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Visit Portfolio</a>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Reviews & Ratings</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {showReviewForm ? "Cancel" : "Write Review"}
            </button>
            <Link
              to={`/reviews/${id}`}
              className="px-4 py-2 border border-gray-600 hover:border-pink-400 text-pink-400 hover:text-pink-300 rounded-lg text-sm font-medium transition-colors"
            >
              View All Reviews
            </Link>
          </div>
        </div>
        
        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-yellow-400">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-400">Average Rating</div>
            <div className="flex justify-center mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-400"}>★</span>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-green-400">{totalReviews}</div>
            <div className="text-sm text-gray-400">Total Reviews</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-blue-400">98%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                      className={`text-2xl transition-colors ${
                        star <= reviewForm.rating ? "text-yellow-400" : "text-gray-400"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-1">{reviewForm.rating} out of 5 stars</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Review Title</label>
                <input
                  type="text"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleReviewInputChange}
                  placeholder="Summarize your experience"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
                <textarea
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleReviewInputChange}
                  rows={4}
                  placeholder="Share your experience working with this freelancer..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>
              
              {message && (
                <div className={`p-3 rounded-lg ${
                  message.includes('successfully') 
                    ? 'bg-green-900/50 text-green-300' 
                    : 'bg-red-900/50 text-red-300'
                }`}>
                  {message}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={review._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-gray-800 border border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {review.reviewer?.name?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.reviewer?.name || "Anonymous"}</span>
                      {review.isVerified && (
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-400"}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="font-medium mb-2 text-lg">{review.title}</h3>
                <p className="text-gray-300">{review.comment}</p>
                {review.project && (
                  <p className="text-sm text-gray-500 mt-2">Project: {review.project.title}</p>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">📝</div>
              <p className="text-gray-400">No reviews yet</p>
              <p className="text-gray-500 text-sm mt-1">Be the first to review this freelancer!</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
        <div>
          <h3 className="font-semibold mb-1">Languages</h3>
          <p>{person.languages?.join(", ")}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Education</h3>
          <p>{person.education}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Total Jobs</h3>
          <p>{person.jobs}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Total Hours</h3>
          <p>{person.hours}</p>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfile;
