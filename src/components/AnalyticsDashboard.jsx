import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnalyticsDashboard = ({ userType = 'client' }) => {
  const [analytics, setAnalytics] = useState({
    overview: {
      totalProjects: 0,
      completedProjects: 0,
      activeProjects: 0,
      totalEarnings: 0,
      averageRating: 0,
      responseTime: 0
    },
    trends: {
      projectGrowth: [],
      earningsGrowth: [],
      ratingTrends: [],
      skillDemand: []
    },
    insights: {
      topSkills: [],
      peakHours: [],
      seasonalTrends: [],
      recommendations: []
    }
  });
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [userType, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/analytics/dashboard?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setAnalytics(data.analytics || analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback to mock data
      setAnalytics({
        overview: {
          totalProjects: 25,
          completedProjects: 18,
          activeProjects: 4,
          totalEarnings: 45000,
          averageRating: 4.8,
          responseTime: 2.3
        },
        trends: {
          projectGrowth: [
            { month: 'Jan', projects: 3, earnings: 5000 },
            { month: 'Feb', projects: 5, earnings: 8000 },
            { month: 'Mar', projects: 7, earnings: 12000 },
            { month: 'Apr', projects: 4, earnings: 9000 },
            { month: 'May', projects: 6, earnings: 10000 }
          ],
          earningsGrowth: [
            { month: 'Jan', earnings: 5000 },
            { month: 'Feb', earnings: 8000 },
            { month: 'Mar', earnings: 12000 },
            { month: 'Apr', earnings: 9000 },
            { month: 'May', earnings: 10000 }
          ],
          ratingTrends: [
            { month: 'Jan', rating: 4.5 },
            { month: 'Feb', rating: 4.6 },
            { month: 'Mar', rating: 4.7 },
            { month: 'Apr', rating: 4.8 },
            { month: 'May', rating: 4.8 }
          ],
          skillDemand: [
            { skill: 'React', demand: 85, growth: 12 },
            { skill: 'Node.js', demand: 78, growth: 8 },
            { skill: 'Python', demand: 72, growth: 15 },
            { skill: 'UI/UX', demand: 68, growth: 20 },
            { skill: 'Mobile', demand: 65, growth: 25 }
          ]
        },
        insights: {
          topSkills: [
            { skill: 'React', count: 15, percentage: 35 },
            { skill: 'Node.js', count: 12, percentage: 28 },
            { skill: 'Python', count: 8, percentage: 19 },
            { skill: 'UI/UX', count: 5, percentage: 12 },
            { skill: 'Mobile', count: 3, percentage: 6 }
          ],
          peakHours: [
            { hour: '9 AM', activity: 45 },
            { hour: '10 AM', activity: 78 },
            { hour: '11 AM', activity: 92 },
            { hour: '12 PM', activity: 65 },
            { hour: '1 PM', activity: 38 },
            { hour: '2 PM', activity: 85 },
            { hour: '3 PM', activity: 95 },
            { hour: '4 PM', activity: 88 },
            { hour: '5 PM', activity: 72 }
          ],
          seasonalTrends: [
            { month: 'Jan', trend: 'Low', reason: 'Post-holiday slowdown' },
            { month: 'Feb', trend: 'Medium', reason: 'Gradual recovery' },
            { month: 'Mar', trend: 'High', reason: 'Q1 budget allocation' },
            { month: 'Apr', trend: 'Medium', reason: 'Tax season impact' },
            { month: 'May', trend: 'High', reason: 'Summer project planning' }
          ],
          recommendations: [
            'Consider increasing your rates by 15% based on market analysis',
            'Focus on React and Node.js skills - highest demand',
            'Optimize your profile for mobile development opportunities',
            'Consider offering package deals for long-term projects',
            'Update your portfolio with recent work to attract more clients'
          ]
        }
      });
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-400">Comprehensive insights into your freelance performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Projects</p>
              <p className="text-2xl font-bold text-white">{analytics.overview.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">{analytics.overview.completedProjects}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-white">${analytics.overview.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Rating</p>
              <p className="text-2xl font-bold text-white">{analytics.overview.averageRating}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Project Growth</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.trends.projectGrowth.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="bg-gradient-to-t from-pink-500 to-violet-500 rounded-t-lg w-8"
                  style={{ height: `${(item.projects / 10) * 200}px` }}
                />
                <span className="text-xs text-gray-400">{item.month}</span>
                <span className="text-xs text-white font-medium">{item.projects}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Skill Demand</h3>
          <div className="space-y-3">
            {analytics.trends.skillDemand.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white font-medium">{skill.skill}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full"
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{skill.demand}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Peak Hours Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Peak Activity Hours</h3>
          <div className="h-64 flex items-end justify-between space-x-1">
            {analytics.insights.peakHours.map((hour, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg w-6"
                  style={{ height: `${(hour.activity / 100) * 200}px` }}
                />
                <span className="text-xs text-gray-400">{hour.hour}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Skills</h3>
          <div className="space-y-3">
            {analytics.insights.topSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}</span>
                  <span className="text-white font-medium">{skill.skill}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{skill.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Insights and Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-lg font-semibold text-white mb-4">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analytics.insights.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-700/50 rounded-lg">
              <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-pink-400 text-sm">💡</span>
              </div>
              <p className="text-gray-300 text-sm">{recommendation}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
