import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ userType = 'client' }) => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalEarnings: 0,
    totalSpent: 0,
    pendingProposals: 0,
    acceptedProposals: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [userType]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API first
      try {
        const statsResponse = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (error) {
        // Fallback to mock data
        setStats({
          totalProjects: 12,
          activeProjects: 3,
          completedProjects: 8,
          totalSpent: 25000,
          totalEarnings: 15000,
          pendingProposals: 5,
          acceptedProposals: 7
        });
      }

      // Fetch recent projects
      try {
        const projectsResponse = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/recent`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        const projectsData = await projectsResponse.json();
        setRecentProjects(projectsData.projects || []);
      } catch (error) {
        // Fallback to mock data
        setRecentProjects([
          {
            _id: '1',
            title: 'E-commerce Website',
            category: 'Development & IT',
            budgetMin: 5000,
            budgetMax: 8000,
            status: 'In Progress',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Logo Design',
            category: 'Design & Creative',
            budgetMin: 200,
            budgetMax: 500,
            status: 'Completed',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ]);
      }

      // Fetch recent messages
      try {
        const messagesResponse = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/messages/recent`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        const messagesData = await messagesResponse.json();
        setRecentMessages(messagesData.messages || []);
      } catch (error) {
        // Fallback to mock data
        setRecentMessages([
          {
            _id: '1',
            content: 'Thanks for the great work on the project!',
            sender: { name: 'John Doe', avatarUrl: null },
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            content: 'When can we schedule the next meeting?',
            sender: { name: 'Jane Smith', avatarUrl: null },
            createdAt: new Date(Date.now() - 3600000).toISOString()
          }
        ]);
      }

      // Fetch notifications
      try {
        const notificationsResponse = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData.notifications || []);
      } catch (error) {
        // Fallback to mock data
        setNotifications([
          {
            _id: '1',
            title: 'New Proposal Received',
            message: 'You have received a new proposal for your project',
            type: 'new_proposal',
            isRead: false,
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Project Completed',
            message: 'Your project has been marked as completed',
            type: 'project_completed',
            isRead: true,
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ]);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, change }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-300">
            Here's what's happening with your {userType === 'client' ? 'projects' : 'freelance work'} today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={userType === 'client' ? 'Total Projects' : 'Projects Worked On'}
            value={stats.totalProjects}
            icon={
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            color="bg-blue-500/20"
            change={12}
          />
          
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            icon={
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="bg-green-500/20"
            change={8}
          />
          
          <StatCard
            title="Completed"
            value={stats.completedProjects}
            icon={
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
            color="bg-purple-500/20"
            change={15}
          />
          
          <StatCard
            title={userType === 'client' ? 'Total Spent' : 'Total Earned'}
            value={`$${stats.totalEarnings || stats.totalSpent}`}
            icon={
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            color="bg-pink-500/20"
            change={23}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                <button className="text-pink-400 hover:text-pink-300 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentProjects.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No recent projects
                  </div>
                ) : (
                  recentProjects.map((project, index) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{project.title}</h3>
                        <p className="text-gray-400 text-sm">{project.category}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-gray-400 text-xs">
                            ${project.budgetMin} - ${project.budgetMax}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            project.status === 'Open' ? 'bg-green-500/20 text-green-400' :
                            project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No new notifications
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification, index) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg ${
                        !notification.isRead ? 'bg-pink-500/10 border border-pink-500/20' : 'bg-gray-700/50'
                      }`}
                    >
                      <p className="text-white text-sm font-medium">{notification.title}</p>
                      <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Messages</h3>
              <div className="space-y-3">
                {recentMessages.length === 0 ? (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No recent messages
                  </div>
                ) : (
                  recentMessages.slice(0, 3).map((message, index) => (
                    <motion.div
                      key={message._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <img
                        src={message.sender?.avatarUrl || '/default-avatar.png'}
                        alt={message.sender?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{message.sender?.name}</p>
                        <p className="text-gray-400 text-xs truncate">{message.content}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = userType === 'client' ? '/hire' : '/projects'}
                  className="w-full text-left p-3 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-medium">
                      {userType === 'client' ? 'Post New Project' : 'Find Projects'}
                    </span>
                  </div>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/messages'}
                  className="w-full text-left p-3 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-medium">View Messages</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/reports'}
                  className="w-full text-left p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">View Analytics</span>
                  </div>
                </button>
                
                {userType === 'client' && (
                  <button 
                    onClick={() => window.location.href = '/freelancers'}
                    className="w-full text-left p-3 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium">Find Freelancers</span>
                    </div>
                  </button>
                )}
                
                <button 
                  onClick={() => window.location.href = userType === 'client' ? '/my-projects' : '/my-jobs'}
                  className="w-full text-left p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="font-medium">
                      {userType === 'client' ? 'My Projects' : 'My Jobs'}
                    </span>
                  </div>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/verification'}
                  className="w-full text-left p-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Verification Center</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/ai-matching'}
                  className="w-full text-left p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="font-medium">AI Matching</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/gamification'}
                  className="w-full text-left p-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="font-medium">Gamification</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/collaboration'}
                  className="w-full text-left p-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Collaboration</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
