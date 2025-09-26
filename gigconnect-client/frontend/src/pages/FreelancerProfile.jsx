import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import freelancersData from "../data/FreelancersData";

export default function FreelancerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [freelancer, setFreelancer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);

  useEffect(() => {
    const found = freelancersData.find((f) => f._id === id);
    if (!found) {
      navigate("/freelancer");
    } else {
      setFreelancer(found);
      setReviews(found.reviews || []);
    }
  }, [id, navigate]);

  if (!freelancer) return null;

  const suggested = freelancersData.filter(
    (f) => f.category === freelancer.category && f._id !== freelancer._id
  );

  const handleAddReview = () => {
    if (!newReviewText.trim() || newReviewRating === 0) return;
    const updatedReviews = [
      ...reviews,
      { id: Date.now(), text: newReviewText, rating: newReviewRating },
    ];
    setReviews(updatedReviews);
    setNewReviewText("");
    setNewReviewRating(0);
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-yellow-400 ${i <= count ? "" : "text-gray-500"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold border-4 border-indigo-500">
          {freelancer.name[0]}
        </div>

        <div className="flex-1 space-y-2">
          <h1 className="text-4xl font-bold text-indigo-400">{freelancer.name}</h1>
          <p className="text-gray-300 text-lg">{freelancer.category}</p>
          <p className="text-gray-400">{freelancer.location}</p>
          <p className="text-gray-400 mt-2"><strong>Rate:</strong> {freelancer.rate}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {freelancer.skills?.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Career Summary */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Career Summary</h2>
        <p className="text-gray-300">{freelancer.summary}</p>
      </div>

      {/* Projects */}
      {freelancer.projects?.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Projects</h2>
          <ul className="space-y-2">
            {freelancer.projects.map((proj, idx) => (
              <li key={idx} className="p-3 bg-gray-800 rounded-lg">
                <p className="text-gray-300 font-medium">{proj.title}</p>
                <p className="text-gray-400 text-sm">{proj.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons (after Projects) */}
      <div className="flex gap-4 mb-6">
        <button 
        onClick={() => navigate(`/chat/${freelancer._id}`)}
        className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
          Chat
        </button>
        <button className="flex-1 px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition">
          Hire Now
        </button>
      </div>

      {/* Reviews */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Reviews</h2>
        <div className="space-y-3">
          {reviews.length === 0 && <p className="text-gray-400">No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="bg-gray-800 p-3 rounded-lg text-gray-300">
              <div className="mb-1">{renderStars(r.rating)}</div>
              {r.text}
            </div>
          ))}
        </div>

        {/* Add Review */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Write a review..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
          />
          <select
            value={newReviewRating}
            onChange={(e) => setNewReviewRating(Number(e.target.value))}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          >
            <option value={0}>Rating</option>
            <option value={1}>★ 1</option>
            <option value={2}>★★ 2</option>
            <option value={3}>★★★ 3</option>
            <option value={4}>★★★★ 4</option>
            <option value={5}>★★★★★ 5</option>
          </select>
          <button
            onClick={handleAddReview}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Suggested Freelancers */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Suggested Freelancers</h2>
        {suggested.length === 0 && (
          <p className="text-gray-400">No suggestions available.</p>
        )}
        {suggested.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggested.map((f) => (
              <div
                key={f._id}
                className="bg-gray-900 p-4 rounded-2xl shadow-lg cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-transform"
                onClick={() => navigate(`/freelancer/${f._id}`)}
              >
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold mb-2">
                  {f.name[0]}
                </div>
                <h3 className="text-indigo-400 font-semibold">{f.name}</h3>
                <p className="text-gray-300 text-sm">{f.category}</p>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md text-sm">
                    Chat
                  </button>
                  <button className="flex-1 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md text-sm">
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
