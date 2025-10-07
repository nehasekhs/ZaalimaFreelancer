import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import countriesData from "../data/countries.json";
import freelancersData from "../data/FreelancersData";

export default function Freelancers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

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

  // Dynamic country & cities
  const countries = Object.keys(countriesData);
  const cities = countryFilter ? countriesData[countryFilter] : [];

  // Filter freelancers
  const filteredFreelancers = freelancersData.filter((f) => {
    const matchesQuery = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? f.category === categoryFilter : true;
    const matchesCountry = countryFilter ? f.location.split(",")[0].trim() === countryFilter : true;
    const matchesCity = cityFilter ? f.location.split(",")[1]?.trim() === cityFilter : true;
    return matchesQuery && matchesCategory && matchesCountry && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-8 gap-4">
        <input
          type="text"
          placeholder="Search freelancers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={countryFilter}
          onChange={(e) => { setCountryFilter(e.target.value); setCityFilter(""); }}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Countries</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country}>{country}</option>
          ))}
        </select>
        {countryFilter && (
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Cities</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </select>
        )}
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">No freelancers found.</p>
        ) : (
          filteredFreelancers.map((f) => (
            <div
              key={f._id}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-transform"
              onClick={() => navigate(`/freelancer/${f._id}`)}
            >
              <h2 className="text-xl font-semibold text-indigo-400">{f.name}</h2>
              <p className="text-gray-300 mt-1">{f.category}</p>
              <p className="text-gray-400 mt-1 text-sm">{f.location}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {f.skills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
