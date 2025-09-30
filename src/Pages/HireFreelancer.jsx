import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTopFreelancersApi, postProjectApi, getFreelancersByCategoryApi } from "../api";
import { getFreelancersByCategory } from "../data/freelancers";

export default function HireFreelancer() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFreelancers, setCategoryFreelancers] = useState([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "Development & IT",
    company: "",
    selectedFreelancerId: "",
    projectType: "Fixed Price",
    experienceLevel: "Intermediate",
    projectDuration: "1-3 months",
    skillsRequired: [],
    visibility: "Public",
    timezone: "UTC",
    paymentTerms: "Escrow",
    isUrgent: false,
    remoteWork: true,
    location: "",
    languages: ["English"],
    maxProposals: 50,
    autoAccept: false,
    autoAcceptAmount: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  useEffect(() => {
    fetchTopFreelancers();
    fetchCategoryFreelancers(formData.category);
    fetchSkills();
    fetchSkillCategories();
  }, []);

  useEffect(() => {
    fetchCategoryFreelancers(formData.category);
    setSelectedFreelancer(null);
    setFormData(prev => ({ ...prev, selectedFreelancerId: "" }));
  }, [formData.category]);

  const fetchTopFreelancers = async () => {
    try {
      setLoading(true);
      const response = await getTopFreelancersApi(6);
      setFreelancers(response.freelancers || []);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      setFreelancers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryFreelancers = async (category) => {
    try {
      // First try to get from backend API
      try {
        const response = await getFreelancersByCategoryApi(category, 3);
        setCategoryFreelancers(response.freelancers || []);
      } catch (apiError) {
        // Fallback to local data
        const localFreelancers = getFreelancersByCategory(category);
        setCategoryFreelancers(localFreelancers.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching category freelancers:", error);
      setCategoryFreelancers([]);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/skills?limit=100`);
      const data = await response.json();
      setAvailableSkills(data.skills || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
      // Fallback to hardcoded skills if API fails
      setAvailableSkills([
        { _id: '1', name: 'React', category: 'Frontend', isPopular: true },
        { _id: '2', name: 'Node.js', category: 'Backend', isPopular: true },
        { _id: '3', name: 'JavaScript', category: 'Programming', isPopular: true },
        { _id: '4', name: 'Python', category: 'Programming', isPopular: true },
        { _id: '5', name: 'UI/UX Design', category: 'Design', isPopular: true },
        { _id: '6', name: 'Graphic Design', category: 'Design', isPopular: true },
        { _id: '7', name: 'Content Writing', category: 'Writing', isPopular: true },
        { _id: '8', name: 'SEO', category: 'Marketing', isPopular: true },
        { _id: '9', name: 'Data Analysis', category: 'Analytics', isPopular: true },
        { _id: '10', name: 'Project Management', category: 'Business', isPopular: true }
      ]);
    }
  };

  const fetchSkillCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/skills/categories`);
      const data = await response.json();
      setSkillCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching skill categories:", error);
      setSkillCategories([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFreelancerSelect = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setFormData(prev => ({
      ...prev,
      selectedFreelancerId: freelancer.id || freelancer._id
    }));
  };

  const handleSkillAdd = (skill) => {
    if (!formData.skillsRequired.includes(skill.name)) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill.name]
      }));
    }
  };

  const handleSkillRemove = (skillName) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== skillName)
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSkillSearch = (term) => {
    setSkillSearchTerm(term);
    if (term.length > 0) {
      const filtered = availableSkills.filter(skill =>
        skill.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSkills(filtered);
      setShowSkillDropdown(true);
    } else {
      setShowSkillDropdown(false);
    }
  };

  const handleSkillSelect = (skill) => {
    if (!formData.skillsRequired.includes(skill.name)) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill.name]
      }));
    }
    setSkillSearchTerm('');
    setShowSkillDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        company: formData.company || "Anonymous",
        budgetMin: parseFloat(formData.budget),
        budgetMax: parseFloat(formData.budget) * 1.2, // Add 20% buffer
        duration: formData.deadline ? `Due ${new Date(formData.deadline).toLocaleDateString()}` : "Flexible",
        category: formData.category,
        tags: [formData.category.split(' ')[0]], // Use first word of category as tag
        selectedFreelancerId: formData.selectedFreelancerId || null,
        
        // Enhanced fields
        projectType: formData.projectType,
        experienceLevel: formData.experienceLevel,
        projectDuration: formData.projectDuration,
        skillsRequired: formData.skillsRequired,
        visibility: formData.visibility,
        timezone: formData.timezone,
        paymentTerms: formData.paymentTerms,
        isUrgent: formData.isUrgent,
        remoteWork: formData.remoteWork,
        location: formData.location,
        languages: formData.languages,
        maxProposals: parseInt(formData.maxProposals),
        autoAccept: formData.autoAccept,
        autoAcceptAmount: formData.autoAcceptAmount ? parseFloat(formData.autoAcceptAmount) : null,
        totalBudget: parseFloat(formData.budget),
        currency: "USD"
      };
      
      await postProjectApi(projectData);
      setMessage("Project posted successfully! Freelancers will start submitting proposals soon.");
      setFormData({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        category: "Development & IT",
        company: "",
        selectedFreelancerId: "",
        projectType: "Fixed Price",
        experienceLevel: "Intermediate",
        projectDuration: "1-3 months",
        skillsRequired: [],
        visibility: "Public",
        timezone: "UTC",
        paymentTerms: "Escrow",
        isUrgent: false,
        remoteWork: true,
        location: "",
        languages: ["English"],
        maxProposals: 50,
        autoAccept: false,
        autoAcceptAmount: ""
      });
      setSelectedFreelancer(null);
    } catch (error) {
      console.error("Error posting project:", error);
      setMessage("Error posting project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-black to-pink-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent mb-6">
            Hire a Top Freelancer
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Post your project and get matched with the best freelance talent for your needs. 
            Describe your requirements, set your budget, and start receiving proposals within minutes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Project Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gray-900/90 rounded-2xl shadow-2xl p-8 border border-pink-500/30 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Post Your Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Build a React Website"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Company/Organization (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Your Company Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Project Description</label>
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project, deliverables, and expectations..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="Development & IT">Development & IT</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Writing & Translation">Writing & Translation</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                </select>
              </div>

              {/* Project Type and Experience Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-pink-400 mb-2">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="Fixed Price">Fixed Price</option>
                    <option value="Hourly Rate">Hourly Rate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-400 mb-2">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="Entry">Entry Level</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert Level</option>
                  </select>
                </div>
              </div>

              {/* Project Duration and Payment Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-pink-400 mb-2">Project Duration</label>
                  <select
                    name="projectDuration"
                    value={formData.projectDuration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="Less than 1 month">Less than 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-400 mb-2">Payment Terms</label>
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="Escrow">Escrow Protection</option>
                    <option value="Milestone-based">Milestone-based</option>
                    <option value="Completion-based">Completion-based</option>
                  </select>
                </div>
              </div>

              {/* Skills Required */}
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Skills Required</label>
                <div className="space-y-3">
                  {/* Selected Skills */}
                  {formData.skillsRequired.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.skillsRequired.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300 border border-pink-500/30"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 text-pink-400 hover:text-pink-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Enhanced Skill Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search and add skills..."
                      value={skillSearchTerm}
                      onChange={(e) => handleSkillSearch(e.target.value)}
                      onFocus={() => setShowSkillDropdown(skillSearchTerm.length > 0)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const skillName = e.target.value.trim();
                          if (skillName && !formData.skillsRequired.includes(skillName)) {
                            handleSkillAdd({ name: skillName });
                            setSkillSearchTerm('');
                          }
                        }
                      }}
                    />
                    
                    {/* Skill Dropdown */}
                    {showSkillDropdown && filteredSkills.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredSkills.slice(0, 8).map((skill) => (
                          <button
                            key={skill._id}
                            type="button"
                            onClick={() => handleSkillSelect(skill)}
                            disabled={formData.skillsRequired.includes(skill.name)}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                              formData.skillsRequired.includes(skill.name)
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{skill.name}</span>
                              {skill.category && (
                                <span className="text-xs text-gray-400">{skill.category}</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Popular Skills */}
                  {availableSkills.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm">Popular Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {availableSkills.slice(0, 10).map((skill) => (
                          <button
                            key={skill._id}
                            type="button"
                            onClick={() => handleSkillAdd(skill)}
                            disabled={formData.skillsRequired.includes(skill.name)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                              formData.skillsRequired.includes(skill.name)
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
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

              {/* Advanced Options Toggle */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Advanced Options</h3>
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="text-pink-400 hover:text-pink-300 text-sm font-medium"
                >
                  {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
                </button>
              </div>

              {/* Advanced Options */}
              {showAdvancedOptions && (
                <div className="space-y-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  {/* Visibility and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">Project Visibility</label>
                      <select
                        name="visibility"
                        value={formData.visibility}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">Location (Optional)</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. New York, NY"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Timezone and Max Proposals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">Timezone</label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Asia/Shanghai">Shanghai</option>
                        <option value="Australia/Sydney">Sydney</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">Max Proposals</label>
                      <input
                        type="number"
                        name="maxProposals"
                        value={formData.maxProposals}
                        onChange={handleInputChange}
                        min="1"
                        max="100"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="isUrgent"
                        checked={formData.isUrgent}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                      />
                      <label className="text-gray-300">This is an urgent project</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="remoteWork"
                        checked={formData.remoteWork}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                      />
                      <label className="text-gray-300">Remote work allowed</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="autoAccept"
                        checked={formData.autoAccept}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                      />
                      <label className="text-gray-300">Auto-accept proposals under specific amount</label>
                    </div>
                  </div>

                  {/* Auto-accept amount */}
                  {formData.autoAccept && (
                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">Auto-accept Amount ($)</label>
                      <input
                        type="number"
                        name="autoAcceptAmount"
                        value={formData.autoAcceptAmount}
                        onChange={handleInputChange}
                        placeholder="Enter maximum amount for auto-accept"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Choose Top Freelancer - Inside Project Form */}
              {formData.category && (
                <div>
                  <label className="block text-sm font-medium text-pink-400 mb-3">Choose Top Freelancer</label>
                  <div className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                    selectedFreelancer 
                      ? 'bg-gray-800/30 border-pink-500' 
                      : 'bg-gray-800/30 border-violet-600'
                  }`}>
                    {categoryFreelancers.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-gray-300 text-sm mb-4">Choose from top freelancers in this category:</p>
                        <div className="grid gap-3">
                          {categoryFreelancers.map((freelancer, index) => (
                            <motion.div
                              key={freelancer.id || freelancer._id || index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                selectedFreelancer?.id === freelancer.id || selectedFreelancer?._id === freelancer._id
                                  ? 'border-pink-500 bg-gradient-to-r from-pink-500/10 to-violet-500/10 shadow-lg shadow-pink-500/20'
                                  : 'border-gray-600 bg-gray-800/50 hover:border-violet-500 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-violet-500/10'
                              }`}
                              onClick={() => handleFreelancerSelect(freelancer)}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <img
                                    src={freelancer.img || freelancer.avatarUrl || "https://randomuser.me/api/portraits/men/1.jpg"}
                                    alt={freelancer.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-600 group-hover:border-violet-400 transition-colors"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-white font-semibold text-lg">{freelancer.name}</h3>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-yellow-400 text-sm font-medium">★ {freelancer.rating || 4.5}</span>
                                      <span className="text-pink-400 text-sm font-bold">${freelancer.hourlyRate || freelancer.price || 50}/hr</span>
                                    </div>
                                  </div>
                                  <p className="text-gray-400 text-sm mt-1">{freelancer.title || freelancer.role}</p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    {freelancer.location && (
                                      <span className="text-gray-500 text-xs flex items-center">
                                        📍 {freelancer.location}
                                      </span>
                                    )}
                                    {freelancer.experienceYears && (
                                      <span className="text-gray-500 text-xs flex items-center">
                                        💼 {freelancer.experienceYears}+ years
                                      </span>
                                    )}
                                    {freelancer.skills && freelancer.skills.length > 0 && (
                                      <span className="text-gray-500 text-xs flex items-center">
                                        🛠️ {freelancer.skills[0]}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400 text-lg mb-2">🔍</div>
                        <p className="text-gray-400">No freelancers available for this category</p>
                        <p className="text-gray-500 text-sm mt-1">Try selecting a different category</p>
                      </div>
                    )}
                    
                    {selectedFreelancer && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <div>
                            <p className="text-green-400 font-semibold">Freelancer Selected</p>
                            <p className="text-green-300 text-sm">
                              {selectedFreelancer.name} - {selectedFreelancer.title || selectedFreelancer.role}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-pink-400 mb-2">Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="e.g. 500"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-400 mb-2">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    required
                  />
                </div>
              </div>
              {message && (
                <div className={`p-3 rounded-lg ${message.includes('Error') ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
                  {message}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold text-lg shadow-lg transition-all disabled:opacity-50"
              >
                {submitting ? "Posting..." : "Post Project"}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
