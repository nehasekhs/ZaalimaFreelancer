import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function PostProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    budget: "",
    category: "",
    description: "",
    duration: "",
  });

  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.budget <= 0) {
        setPopup({
          open: true,
          message: "Budget must be greater than 0",
          type: "error",
        });
        return;
      }

      await api.post("/projects", form);

      setPopup({
        open: true,
        message: "Project posted successfully",
        type: "success",
      });

      setForm({
        title: "",
        budget: "",
        category: "",
        description: "",
        duration: "",
      });
    } catch (error) {
      setPopup({
        open: true,
        message: error.response?.data?.message || "Failed to post project",
        type: "error",
      });
    }
  };

  const categories = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "Video Editing",
    "SEO Optimization",
    "E-commerce Development",
    "AI & Machine Learning",
    "Cloud Computing",
    "Cybersecurity",
    "Photography",
    "Music & Audio Editing",
    "Copywriting",
    "Academic Writing",
    "Desktop App Development",
    "Game Development",
    "Business Strategy",
    "Virtual Assistance",
    "Translation & Languages",
    "Resume & CV Writing",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black p-6 relative">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-800">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Post a New Project
          </h1>
          <p className="text-gray-400 text-sm">
            Share your idea and get matched with skilled freelancers 🚀
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Build a React website"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="">-- Select a Category --</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project requirements in detail..."
              rows="4"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Duration
            </label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 2 months / 45 days"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Budget (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                ₹
              </span>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="e.g. 5000"
                min="1"
                required
                className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-[1.02] shadow-md"
          >
            Post Project
          </button>
        </form>
      </div>

      {/* Popup Modal */}
      {popup.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`bg-gray-900 text-white rounded-xl p-6 shadow-lg max-w-sm w-full border ${
              popup.type === "success" ? "border-green-500" : "border-red-500"
            }`}
          >
            <h2
              className={`text-lg font-semibold mb-3 ${
                popup.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {popup.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="text-gray-300 mb-4">{popup.message}</p>
            <button
              onClick={() => {
                setPopup({ ...popup, open: false });
                if (popup.type === "success") {
                  navigate("/projects");
                }
              }}
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
