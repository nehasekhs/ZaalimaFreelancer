import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AISearch = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    skills: [],
    experience: '',
    rating: 0,
    hourlyRate: { min: 0, max: 200 },
    location: '',
    availability: '',
    projectType: '',
    budget: { min: 0, max: 100000 },
    languages: [],
    verified: false,
    online: false
  });
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);

  useEffect(() => {
    fetchTrendingSearches();
    loadSearchHistory();
  }, []);

  const fetchTrendingSearches = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/search/trending`);
      const data = await response.json();
      setTrendingSearches(data.trending || [
        'React Developer',
        'UI/UX Designer',
        'Content Writer',
        'Data Analyst',
        'Mobile App Developer'
      ]);
    } catch (error) {
      console.error('Error fetching trending searches:', error);
    }
  };

  const loadSearchHistory = () => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  };

  const saveSearchHistory = (term) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) return;
    
    saveSearchHistory(term);
    
    try {
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/search/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          query: term,
          filters: filters,
          aiEnhancement: true,
          semanticSearch: true
        })
      });
      
      const data = await response.json();
      onSearch(data.results || []);
    } catch (error) {
      console.error('Error performing AI search:', error);
      
      onSearch([]);
    }
  };

  const handleAISuggestions = async (term) => {
    if (term.length < 2) {
      setAiSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/search/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: term })
      });
      
      const data = await response.json();
      setAiSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      // Fallback suggestions
      setAiSuggestions([
        { text: `${term} Developer`, type: 'skill' },
        { text: `${term} Designer`, type: 'skill' },
        { text: `${term} Expert`, type: 'experience' },
        { text: `Senior ${term}`, type: 'experience' }
      ]);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSkillAdd = (skill) => {
    if (!filters.skills.includes(skill)) {
      handleFilterChange('skills', [...filters.skills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    handleFilterChange('skills', filters.skills.filter(s => s !== skill));
  };

  const clearFilters = () => {
    const defaultFilters = {
      skills: [],
      experience: '',
      rating: 0,
      hourlyRate: { min: 0, max: 200 },
      location: '',
      availability: '',
      projectType: '',
      budget: { min: 0, max: 100000 },
      languages: [],
      verified: false,
      online: false
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="space-y-6">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleAISuggestions(e.target.value);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for freelancers, skills, or projects..."
                className="w-full px-4 py-3 pl-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
              >
                Search
              </button>
            </div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
          </div>

          {/* AI Suggestions */}
          <AnimatePresence>
            {aiSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50"
              >
                <div className="p-2">
                  <div className="text-xs text-gray-400 mb-2 px-2">AI Suggestions</div>
                  {aiSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion.text);
                        setAiSuggestions([]);
                        handleSearch(suggestion.text);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-700 text-white rounded-md transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-pink-400">✨</span>
                        <span>{suggestion.text}</span>
                        <span className="text-xs text-gray-400 ml-auto">{suggestion.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search History & Trending */}
        <div className="flex flex-wrap gap-2">
          {searchHistory.slice(0, 5).map((term, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchTerm(term);
                handleSearch(term);
              }}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors"
            >
              {term}
            </button>
          ))}
          {trendingSearches.slice(0, 3).map((term, index) => (
            <button
              key={`trending-${index}`}
              onClick={() => {
                setSearchTerm(term);
                handleSearch(term);
              }}
              className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-sm rounded-full transition-colors"
            >
              🔥 {term}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Skills Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {filters.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="text-blue-300 hover:text-blue-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add skill..."
                      className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-full text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSkillAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="">Any Experience</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Rating: {filters.rating}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Hourly Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hourly Rate: ${filters.hourlyRate.min} - ${filters.hourlyRate.max}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.hourlyRate.min}
                      onChange={(e) => handleFilterChange('hourlyRate', { ...filters.hourlyRate, min: parseInt(e.target.value) || 0 })}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.hourlyRate.max}
                      onChange={(e) => handleFilterChange('hourlyRate', { ...filters.hourlyRate, max: parseInt(e.target.value) || 200 })}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="">Any Location</option>
                    <option value="remote">Remote Only</option>
                    <option value="onsite">On-site Only</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="usa">United States</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Availability</label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="">Any Availability</option>
                    <option value="available">Available Now</option>
                    <option value="part-time">Part-time</option>
                    <option value="full-time">Full-time</option>
                    <option value="project-based">Project-based</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                    className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-gray-300">Verified Only</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.online}
                    onChange={(e) => handleFilterChange('online', e.target.checked)}
                    className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-gray-300">Online Now</span>
                </label>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Clear All Filters
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowAdvanced(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleSearch()}
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AISearch;
