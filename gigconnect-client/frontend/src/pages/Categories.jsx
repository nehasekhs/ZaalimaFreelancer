import React, { useState } from "react";

export default function Categories() {
  const allCategories = [
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

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = allCategories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-6 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Explore Categories
        </h1>
        <p className="text-gray-400 text-center mb-8 text-lg">
          Discover skilled professionals across various domains
        </p>

        {/* Search Input */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-800 rounded-xl shadow hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105 flex items-center justify-center text-gray-100 font-medium text-lg text-center"
              >
                {cat}
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center mt-4">
              No categories found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
