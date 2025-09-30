import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onViewDetails, onApply }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatBudget = (min, max, type) => {
    if (type === 'Hourly Rate') {
      return `$${min}-${max}/hour`;
    }
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getExperienceColor = (level) => {
    switch (level) {
      case 'Entry': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Expert': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            by {project.company || 'Anonymous'} • {getTimeAgo(project.createdAt)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          {project.isUrgent && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
              Urgent
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Project Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Budget</span>
          <p className="text-white font-semibold">
            {formatBudget(project.budgetMin, project.budgetMax, project.projectType)}
          </p>
        </div>
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Duration</span>
          <p className="text-white font-semibold">{project.projectDuration || project.duration}</p>
        </div>
      </div>

      {/* Skills */}
      {project.skillsRequired && project.skillsRequired.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.skillsRequired.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30"
              >
                {skill}
              </span>
            ))}
            {project.skillsRequired.length > 4 && (
              <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400 border border-gray-500/30">
                +{project.skillsRequired.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Experience Level and Type */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(project.experienceLevel)}`}>
            {project.experienceLevel || 'Intermediate'}
          </span>
          <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {project.projectType || 'Fixed Price'}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{project.location || 'Remote'}</span>
        </div>
      </div>

      {/* Proposals Info */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-4">
          <span>
            {project.proposals?.length || 0} proposals
          </span>
          <span>
            Max: {project.maxProposals || 50}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{project.deadline ? `Due ${new Date(project.deadline).toLocaleDateString()}` : 'No deadline'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(project);
          }}
          className="text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors"
        >
          View Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply(project);
          }}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Apply Now
        </button>
      </div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent rounded-xl pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default ProjectCard;
