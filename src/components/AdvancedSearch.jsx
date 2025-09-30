import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedSearch = ({ onSearch, onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    budgetMin: '',
    budgetMax: '',
    projectType: '',
    experienceLevel: '',
    projectDuration: '',
    skills: [],
    location: '',
    isUrgent: false,
    remoteWork: true,
    sortBy: 'newest',
    ...initialFilters
  });

  const [showFilters, setShowFilters] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);

  useEffect(() => {
    fetchSkills();
    fetchSkillCategories();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/skills?limit=100`);
      const data = await response.json();
      setAvailableSkills(data.skills || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchSkillCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/skills/categories`);
      const data = await response.json();
      setSkillCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching skill categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSkillToggle = (skill) => {
    const newSkills = filters.skills.includes(skill.name)
      ? filters.skills.filter(s => s !== skill.name)
      : [...filters.skills, skill.name];
    
    const newFilters = { ...filters, skills: newSkills };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      budgetMin: '',
      budgetMax: '',
      projectType: '',
      experienceLevel: '',
      projectDuration: '',
      skills: [],
      location: '',
      isUrgent: false,
      remoteWork: true,
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const categories = [
    "Development & IT",
    "Design & Creative", 
    "Writing & Translation",
    "Sales & Marketing",
    "Data Science & Analytics"
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Search projects, skills, or keywords..."
            className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-pink-400 hover:text-pink-300 text-sm font-medium"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <button
            onClick={clearFilters}
            className="text-gray-400 hover:text-gray-300 text-sm font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-6"
          >
            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Project Type</label>
                <select
                  name="projectType"
                  value={filters.projectType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="">All Types</option>
                  <option value="Fixed Price">Fixed Price</option>
                  <option value="Hourly Rate">Hourly Rate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Experience Level</label>
                <select
                  name="experienceLevel"
                  value={filters.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="">All Levels</option>
                  <option value="Entry">Entry Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert Level</option>
                </select>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Budget Range ($)</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="budgetMin"
                  value={filters.budgetMin}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <input
                  type="number"
                  name="budgetMax"
                  value={filters.budgetMax}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Skills</label>
              <div className="space-y-3">
                {/* Selected Skills */}
                {filters.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {filters.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300 border border-pink-500/30"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillToggle({ name: skill })}
                          className="ml-2 text-pink-400 hover:text-pink-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Popular Skills */}
                {availableSkills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Popular Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.slice(0, 15).map((skill) => (
                        <button
                          key={skill._id}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            filters.skills.includes(skill.name)
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-violet-600 hover:text-white'
                          }`}
                        >
                          {skill.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Project Duration</label>
                <select
                  name="projectDuration"
                  value={filters.projectDuration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="">Any Duration</option>
                  <option value="Less than 1 month">Less than 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isUrgent"
                  checked={filters.isUrgent}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                />
                <label className="text-gray-300">Urgent projects only</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="remoteWork"
                  checked={filters.remoteWork}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                />
                <label className="text-gray-300">Remote work allowed</label>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget_low">Budget: Low to High</option>
                <option value="budget_high">Budget: High to Low</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
