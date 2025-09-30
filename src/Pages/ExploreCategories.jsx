import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ExploreCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoriesData = [
    {
      id: 'development-it',
      name: 'Development & IT',
      description: 'Web development, mobile apps, software engineering, and IT services',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      projects: 1250,
      freelancers: 340,
      avgRate: '$45/hour',
      skills: ['React', 'Node.js', 'Python', 'JavaScript', 'AWS', 'MongoDB']
    },
    {
      id: 'design-creative',
      name: 'Design & Creative',
      description: 'Graphic design, UI/UX, branding, and creative services',
      icon: '🎨',
      color: 'from-pink-500 to-purple-500',
      projects: 890,
      freelancers: 280,
      avgRate: '$35/hour',
      skills: ['Photoshop', 'Figma', 'Illustrator', 'UI/UX', 'Branding', 'Logo Design']
    },
    {
      id: 'writing-translation',
      name: 'Writing & Translation',
      description: 'Content writing, copywriting, translation, and editing services',
      icon: '✍️',
      color: 'from-green-500 to-teal-500',
      projects: 650,
      freelancers: 420,
      avgRate: '$25/hour',
      skills: ['Content Writing', 'Copywriting', 'Translation', 'Editing', 'SEO', 'Blog Writing']
    },
    {
      id: 'sales-marketing',
      name: 'Sales & Marketing',
      description: 'Digital marketing, social media, SEO, and sales services',
      icon: '📈',
      color: 'from-orange-500 to-red-500',
      projects: 720,
      freelancers: 190,
      avgRate: '$40/hour',
      skills: ['SEO', 'Social Media', 'PPC', 'Email Marketing', 'Analytics', 'Content Strategy']
    },
    {
      id: 'data-science',
      name: 'Data Science & Analytics',
      description: 'Data analysis, machine learning, AI, and business intelligence',
      icon: '📊',
      color: 'from-indigo-500 to-blue-500',
      projects: 380,
      freelancers: 120,
      avgRate: '$65/hour',
      skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau', 'Statistics']
    },
    {
      id: 'business',
      name: 'Business & Consulting',
      description: 'Business consulting, project management, and strategy services',
      icon: '💼',
      color: 'from-gray-500 to-slate-500',
      projects: 450,
      freelancers: 150,
      avgRate: '$55/hour',
      skills: ['Project Management', 'Strategy', 'Consulting', 'Business Analysis', 'Agile', 'Scrum']
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      description: 'Customer support, virtual assistance, and administrative services',
      icon: '🎧',
      color: 'from-emerald-500 to-green-500',
      projects: 320,
      freelancers: 200,
      avgRate: '$20/hour',
      skills: ['Customer Support', 'Virtual Assistant', 'Administrative', 'Phone Support', 'Email Support', 'Live Chat']
    },
    {
      id: 'photography',
      name: 'Photography & Video',
      description: 'Photography, videography, editing, and multimedia services',
      icon: '📸',
      color: 'from-violet-500 to-purple-500',
      projects: 280,
      freelancers: 180,
      avgRate: '$30/hour',
      skills: ['Photography', 'Videography', 'Photo Editing', 'Video Editing', 'Adobe Premiere', 'Lightroom']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(categoriesData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Categories
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover amazing projects and talented freelancers across various categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCategory(category)}
            >
              {/* Category Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>

              {/* Category Info */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Projects</span>
                  <span className="text-white font-medium">{category.projects.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Freelancers</span>
                  <span className="text-white font-medium">{category.freelancers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Avg Rate</span>
                  <span className="text-pink-400 font-medium">{category.avgRate}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Popular Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {category.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {category.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                      +{category.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex space-x-2">
                <Link
                  to={`/projects?category=${encodeURIComponent(category.name)}`}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                >
                  View Projects
                </Link>
                <Link
                  to={`/freelancers?category=${encodeURIComponent(category.name)}`}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                >
                  Find Talent
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category Detail Modal */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedCategory.color} flex items-center justify-center text-2xl`}>
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
                    <p className="text-gray-400">{selectedCategory.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">{selectedCategory.projects.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Active Projects</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">{selectedCategory.freelancers}</p>
                  <p className="text-gray-400 text-sm">Available Freelancers</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-pink-400">{selectedCategory.avgRate}</p>
                  <p className="text-gray-400 text-sm">Average Rate</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Popular Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Link
                  to={`/projects?category=${encodeURIComponent(selectedCategory.name)}`}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Browse Projects
                </Link>
                <Link
                  to={`/freelancers?category=${encodeURIComponent(selectedCategory.name)}`}
                  className="flex-1 bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Find Freelancers
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you're looking to hire talented freelancers or find amazing projects to work on, 
              we have everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/hire"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Post a Project
              </Link>
              <Link
                to="/projects"
                className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Find Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;
