import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIMatching = ({ project, onMatch }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchScore, setMatchScore] = useState(null);

  useEffect(() => {
    if (project) {
      findMatches();
    }
  }, [project]);

  const findMatches = async () => {
    setLoading(true);
    try {
      // AI-powered matching algorithm
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/ai/matching`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          project: project,
          algorithm: 'enhanced_matching',
          factors: ['skills', 'experience', 'rating', 'availability', 'location', 'pricing']
        })
      });
      
      const data = await response.json();
      setMatches(data.matches || []);
      setMatchScore(data.overallScore || 0);
    } catch (error) {
      console.error('Error finding matches:', error);
      // Fallback to mock AI matching
      setMatches([
        {
          _id: '1',
          name: 'Sarah Johnson',
          title: 'Senior Full Stack Developer',
          avatarUrl: null,
          rating: 4.9,
          matchScore: 95,
          skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
          experience: '5+ years',
          hourlyRate: 75,
          availability: 'Available',
          location: 'Remote',
          aiInsights: {
            skillMatch: 98,
            experienceMatch: 92,
            pricingMatch: 85,
            availabilityMatch: 100,
            communicationScore: 94
          }
        },
        {
          _id: '2',
          name: 'Mike Chen',
          title: 'Full Stack Developer',
          avatarUrl: null,
          rating: 4.7,
          matchScore: 88,
          skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
          experience: '3+ years',
          hourlyRate: 65,
          availability: 'Available',
          location: 'Remote',
          aiInsights: {
            skillMatch: 90,
            experienceMatch: 85,
            pricingMatch: 92,
            availabilityMatch: 100,
            communicationScore: 89
          }
        },
        {
          _id: '3',
          name: 'Emily Rodriguez',
          title: 'Frontend Specialist',
          avatarUrl: null,
          rating: 4.8,
          matchScore: 82,
          skills: ['React', 'Vue.js', 'TypeScript', 'UI/UX'],
          experience: '4+ years',
          hourlyRate: 70,
          availability: 'Available',
          location: 'Remote',
          aiInsights: {
            skillMatch: 85,
            experienceMatch: 88,
            pricingMatch: 88,
            availabilityMatch: 100,
            communicationScore: 91
          }
        }
      ]);
      setMatchScore(88);
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-yellow-400 bg-yellow-500/20';
    if (score >= 70) return 'text-orange-400 bg-orange-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getMatchLabel = (score) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Great Match';
    if (score >= 70) return 'Good Match';
    return 'Fair Match';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">AI-Powered Matches</h3>
          <p className="text-gray-400 text-sm">Smart matching based on skills, experience, and compatibility</p>
        </div>
        {matchScore && (
          <div className={`px-4 py-2 rounded-lg ${getMatchColor(matchScore)}`}>
            <span className="font-semibold">{matchScore}% Match</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">AI is analyzing the best matches...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match, index) => (
            <motion.div
              key={match._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={match.avatarUrl || '/default-avatar.png'}
                    alt={match.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-semibold">{match.name}</h4>
                      <span className="text-gray-400 text-sm">{match.title}</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white font-medium">{match.rating}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{match.experience}</span>
                      <span className="text-gray-400 text-sm">${match.hourlyRate}/hr</span>
                      <span className="text-green-400 text-sm">{match.availability}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {match.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchColor(match.matchScore)}`}>
                    {match.matchScore}%
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{getMatchLabel(match.matchScore)}</p>
                </div>
              </div>

              {/* AI Insights */}
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                <h5 className="text-sm font-semibold text-white mb-2">AI Analysis</h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Skills Match:</span>
                    <span className="text-white">{match.aiInsights.skillMatch}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-white">{match.aiInsights.experienceMatch}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pricing:</span>
                    <span className="text-white">{match.aiInsights.pricingMatch}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Communication:</span>
                    <span className="text-white">{match.aiInsights.communicationScore}%</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => onMatch(match)}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Contact Freelancer
                </button>
                <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIMatching;
