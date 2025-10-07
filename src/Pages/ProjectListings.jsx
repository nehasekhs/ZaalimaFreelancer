import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedSearch from '../Components/AdvancedSearch';
import ProjectCard from '../Components/ProjectCard';

const ProjectListings = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const projectsPerPage = 12;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [projects, filters, sortBy]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects?limit=100`);
      const data = await response.json();
      
      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects);
      } else {
        // Fallback to mock data if API fails
        const mockProjects = [
          {
            _id: '1',
            title: 'E-commerce Website Development',
            description: 'Need a full-stack developer to build a modern e-commerce platform with React and Node.js',
            budgetMin: 5000,
            budgetMax: 8000,
            category: 'Development & IT',
            projectType: 'Fixed Price',
            experienceLevel: 'Intermediate',
            projectDuration: '1-3 months',
            skillsRequired: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            status: 'Open',
            createdAt: new Date().toISOString(),
            company: 'TechCorp Inc',
            location: 'Remote',
            isUrgent: false,
            remoteWork: true
          },
          {
            _id: '2',
            title: 'Logo Design for Startup',
            description: 'Looking for a creative designer to create a modern logo for our tech startup',
            budgetMin: 200,
            budgetMax: 500,
            category: 'Design & Creative',
            projectType: 'Fixed Price',
            experienceLevel: 'Entry',
            projectDuration: 'Less than 1 month',
            skillsRequired: ['Logo Design', 'Adobe Illustrator', 'Branding'],
            status: 'Open',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            company: 'StartupXYZ',
            location: 'Remote',
            isUrgent: true,
            remoteWork: true
          },
          {
            _id: '3',
            title: 'Content Writing for Blog',
            description: 'Need a skilled writer to create engaging blog posts about technology trends',
            budgetMin: 100,
            budgetMax: 300,
            category: 'Writing & Translation',
            projectType: 'Fixed Price',
            experienceLevel: 'Intermediate',
            projectDuration: 'Less than 1 month',
            skillsRequired: ['Content Writing', 'SEO', 'Technology Writing'],
            status: 'Open',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            company: 'TechBlog',
            location: 'Remote',
            isUrgent: false,
            remoteWork: true
          },
          
  {
    _id: '4',
    title: 'UI/UX Redesign for Mobile App',
    description: 'Seeking a UI/UX designer to revamp an existing fitness mobile app for better user experience.',
    budgetMin: 800,
    budgetMax: 1500,
    category: 'Design & Creative',
    projectType: 'Fixed Price',
    experienceLevel: 'Intermediate',
    projectDuration: '1-2 months',
    skillsRequired: ['Figma', 'User Research', 'Prototyping'],
    status: 'Open',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    company: 'FitLife Solutions',
    location: 'Remote',
    isUrgent: false,
    remoteWork: true
  },
  {
    _id: '5',
    title: 'AI Chatbot for Customer Support',
    description: 'Build an AI-powered chatbot using NLP for automating customer support queries.',
    budgetMin: 2000,
    budgetMax: 4000,
    category: 'AI Services',
    projectType: 'Fixed Price',
    experienceLevel: 'Advanced',
    projectDuration: '2-3 months',
    skillsRequired: ['Python', 'TensorFlow', 'NLP', 'Dialogflow'],
    status: 'Open',
    createdAt: new Date(Date.now() - 360000000).toISOString(),
    company: 'HelpDeskPro',
    location: 'Remote',
    isUrgent: true,
    remoteWork: true
  },
  {
    _id: '6',
    title: 'Social Media Marketing Campaign',
    description: 'We need a marketing expert to run Facebook and Instagram campaigns for our e-commerce brand.',
    budgetMin: 500,
    budgetMax: 1200,
    category: 'Sales & Marketing',
    projectType: 'Hourly',
    experienceLevel: 'Intermediate',
    projectDuration: '1 month',
    skillsRequired: ['Facebook Ads', 'Instagram Ads', 'Analytics'],
    status: 'Open',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    company: 'GlowMart',
    location: 'Remote',
    isUrgent: false,
    remoteWork: true
  },
  {
    _id: '7',
    title: 'Legal Contract Drafting for Startup',
    description: 'Require a professional lawyer to draft NDAs and partnership agreements for our tech startup.',
    budgetMin: 300,
    budgetMax: 600,
    category: 'Legal',
    projectType: 'Fixed Price',
    experienceLevel: 'Advanced',
    projectDuration: 'Less than 1 month',
    skillsRequired: ['Contract Law', 'Legal Writing', 'Corporate Law'],
    status: 'Open',
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    company: 'InnovateHub',
    location: 'Remote',
    isUrgent: true,
    remoteWork: true
  },
  {
    _id: '8',
    title: 'Financial Forecasting Dashboard',
    description: 'Looking for a finance expert to build a forecasting dashboard using Excel or Power BI.',
    budgetMin: 800,
    budgetMax: 1500,
    category: 'Finance & Accounting',
    projectType: 'Fixed Price',
    experienceLevel: 'Intermediate',
    projectDuration: '1-2 months',
    skillsRequired: ['Excel', 'Power BI', 'Data Visualization'],
    status: 'Open',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    company: 'FinSmart Analytics',
    location: 'Remote',
    isUrgent: false,
    remoteWork: true
  },
  {
    _id: '9',
    title: 'Virtual Assistant for Daily Tasks',
    description: 'Need a reliable virtual assistant for scheduling, email management, and data entry.',
    budgetMin: 400,
    budgetMax: 700,
    category: 'Admin & Support',
    projectType: 'Hourly',
    experienceLevel: 'Entry',
    projectDuration: '3+ months',
    skillsRequired: ['Data Entry', 'Email Management', 'Scheduling'],
    status: 'Open',
    createdAt: new Date(Date.now() - 691200000).toISOString(),
    company: 'GlobalAssist',
    location: 'Remote',
    isUrgent: false,
    remoteWork: true
  },
  {
    _id: '10',
    title: 'Employee Training Portal',
    description: 'Develop a responsive employee training web portal using MERN stack.',
    budgetMin: 3000,
    budgetMax: 6000,
    category: 'HR & Training',
    projectType: 'Fixed Price',
    experienceLevel: 'Intermediate',
    projectDuration: '2-3 months',
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    status: 'Open',
    createdAt: new Date(Date.now() - 777600000).toISOString(),
    company: 'SkillBridge',
    location: 'Remote',
    isUrgent: false,
    remoteWork: true
  },
  {
    _id: '11',
    title: 'Construction Plan Drafting',
    description: 'Looking for an architect to design a 3D layout for a residential building project.',
    budgetMin: 1500,
    budgetMax: 2500,
    category: 'Engineering & Architecture',
    projectType: 'Fixed Price',
    experienceLevel: 'Advanced',
    projectDuration: '1-2 months',
    skillsRequired: ['AutoCAD', '3D Modeling', 'Structural Design'],
    status: 'Open',
    createdAt: new Date(Date.now() - 864000000).toISOString(),
    company: 'BuildSmart Designs',
    location: 'Remote',
    isUrgent: false,
    remoteWork: true
  },
  {
    _id: '12',
    title: 'Backend API Development for SaaS',
    description: 'Require a backend developer to build REST APIs for a SaaS-based platform.',
    budgetMin: 2500,
    budgetMax: 4000,
    category: 'Development & IT',
    projectType: 'Fixed Price',
    experienceLevel: 'Advanced',
    projectDuration: '2-3 months',
    skillsRequired: ['Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
    status: 'Open',
    createdAt: new Date(Date.now() - 950400000).toISOString(),
    company: 'SaaSify Inc',
    location: 'Remote',
    isUrgent: true,
    remoteWork: true
  },
  {
    _id: '13',
    title: 'Corporate Website UI/UX Audit',
    description: 'Need a UX specialist to audit our corporate website and recommend usability improvements.',
    budgetMin: 600,
    budgetMax: 1000,
    category: 'Design & Creative',
    projectType: 'Fixed Price',
    experienceLevel: 'Intermediate',
    projectDuration: '1 month',
    skillsRequired: ['UX Research', 'Usability Testing', 'Wireframing'],
    status: 'Open',
    createdAt: new Date(Date.now() - 1036800000).toISOString(),
    company: 'NextVision Corp',
    location: 'Remote',
    isUrgent: false,
    remoteWork: true
  }

        ];
        setProjects(mockProjects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...projects];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.company.toLowerCase().includes(searchTerm) ||
        (project.skillsRequired && project.skillsRequired.some(skill =>
          skill.toLowerCase().includes(searchTerm)
        ))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    // Project type filter
    if (filters.projectType) {
      filtered = filtered.filter(project => project.projectType === filters.projectType);
    }

    // Experience level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(project => project.experienceLevel === filters.experienceLevel);
    }

    // Budget filter
    if (filters.budgetMin) {
      filtered = filtered.filter(project => project.budgetMin >= parseFloat(filters.budgetMin));
    }
    if (filters.budgetMax) {
      filtered = filtered.filter(project => project.budgetMax <= parseFloat(filters.budgetMax));
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(project =>
        project.skillsRequired && project.skillsRequired.some(skill =>
          filters.skills.includes(skill)
        )
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(project =>
        project.location && project.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Urgent filter
    if (filters.isUrgent) {
      filtered = filtered.filter(project => project.isUrgent);
    }

    // Remote work filter
    if (filters.remoteWork) {
      filtered = filtered.filter(project => project.remoteWork !== false);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'budget_low':
        filtered.sort((a, b) => a.budgetMin - b.budgetMin);
        break;
      case 'budget_high':
        filtered.sort((a, b) => b.budgetMax - a.budgetMax);
        break;
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline || 0) - new Date(b.deadline || 0));
        break;
      default:
        break;
    }

    setFilteredProjects(filtered);
    setTotalPages(Math.ceil(filtered.length / projectsPerPage));
    setCurrentPage(1);
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleApply = (project) => {
    // Navigate to application page or open application modal
    console.log('Apply to project:', project);
    // You can implement application logic here
  };

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Find Your Perfect Project
          </h1>
          <p className="text-gray-300 text-lg">
            Discover amazing projects from clients around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <AdvancedSearch
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-white">
              {filteredProjects.length} Projects Found
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-gray-300 text-sm">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="budget_low">Budget: Low to High</option>
              <option value="budget_high">Budget: High to Low</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              <AnimatePresence>
                {paginatedProjects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onViewDetails={handleViewDetails}
                      onApply={handleApply}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;
                  const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2;
                  
                  if (!showPage) {
                    if (page === 2 && currentPage > 4) return <span key={page} className="text-gray-400">...</span>;
                    if (page === totalPages - 1 && currentPage < totalPages - 3) return <span key={page} className="text-gray-400">...</span>;
                    return null;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isCurrentPage
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Project Details Modal */}
        <AnimatePresence>
          {showProjectModal && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowProjectModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300">{selectedProject.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Budget</span>
                      <p className="text-white font-semibold">
                        ${selectedProject.budgetMin?.toLocaleString()} - ${selectedProject.budgetMax?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Duration</span>
                      <p className="text-white font-semibold">{selectedProject.projectDuration}</p>
                    </div>
                  </div>
                  
                  {selectedProject.skillsRequired && selectedProject.skillsRequired.length > 0 && (
                    <div>
                      <span className="text-gray-400 text-sm block mb-2">Required Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.skillsRequired.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm bg-violet-500/20 text-violet-300 border border-violet-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleApply(selectedProject);
                      setShowProjectModal(false);
                    }}
                    className="px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectListings;
