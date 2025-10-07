import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-950 to-black text-white p-6">
      <div className="max-w-4xl text-center space-y-8">
        
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Find{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            top freelancers
          </span>{" "}
          or{" "}
          <span className="bg-gradient-to-r from-pink-400 to-yellow-500 bg-clip-text text-transparent">
            hire instantly
          </span>
        </h1>

        {/* Sub-text */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Post your projects, explore skilled professionals, and collaborate 
          seamlessly — all in one platform designed for speed and trust.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex items-center justify-center gap-6">
          <Link
            to="/post-project"
            className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/50"
          >
            🚀 Post a Project
          </Link>

          {!user ? (
            <Link
              to="/signup"
              className="px-8 py-3 rounded-2xl border border-gray-700 hover:border-indigo-500 hover:text-indigo-400 transition-all"
            >
              Join for Free
            </Link>
          ) : (
            <Link
              to="/projects"
              className="px-8 py-3 rounded-2xl border border-gray-700 hover:border-green-500 hover:text-green-400 transition-all"
            >
              📂 Explore Projects
            </Link>
          )}
        </div>

        {/* Trust / Social proof */}
        <p className="text-sm text-gray-500 mt-4">
          Trusted by <span className="text-indigo-400">1,000+ clients</span> worldwide 🌍
        </p>
      </div>
    </div>
  );
}
