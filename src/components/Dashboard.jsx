import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Users, TrendingUp, Globe, Zap } from "lucide-react";
import {Link} from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br via-purple-900 to-violet-900">
      
     {/* === Hero Header === */}
      <header className="in-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
                Find Top Talent. Grow Your Business.
              </h1>
              <p className="mt-4 text-zinc-300 text-lg md:text-xl max-w-2xl">
                Hire vetted freelancers for web development, design, writing,
                and more. Post your job and get matched fast.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-transparent border hover:bg-pink-500/10 text-pink-500 rounded-lg font-medium transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/projects"
                  className="px-6 py-3 bg-transparent border border-pink-500 text-pink-600 rounded-lg font-medium hover:bg-pink-500/10 transition"
                >
                  Explore Projects
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex justify-center"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu4RRRYIVg6Omu0CMaor8CGyt8P_k-NgF4lqldRav4eQBK5nwJOTLEUyndfrM6"
                alt="Freelancers working"
                className="w-full max-w-md drop-shadow-lg border border-gray-700 rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* === Dashboard Stats === */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-300">
            Here's what's happening with your{' '}
            {userType === 'client' ? 'projects' : 'freelance work'} today.
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
            
          </div>
        </div>
        <br>
        </br>
        <br></br>
         <section className="mt-16 bg-gradient-to-br  via-purple-950 to-violet-950 border-t border-gray-800 rounded-2xl shadow-inner max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            Clients only pay after hiring
          </h2>
          <p className="text-center mt-2 text-zinc-400">Choose a plan that fits your business</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "MARKETPLACE",
                fee: "5% fee after hiring",
                desc: "For starting out on our global freelancer marketplace",
                features: ["Free to post jobs", "AI-powered features", "Collaboration & tracking tools"],
              },
              {
                title: "BUSINESS PLUS",
                fee: "10% fee after hiring",
                desc: "For growing businesses with premium features and support",
                popular: true,
                features: ["Pre-screened top 1% of talent", "Premium 24/7 support", "60 invites per job post"],
              },
              {
                title: "ENTERPRISE",
                fee: "Contact sales",
                desc: "For scaling comprehensive solutions",
                features: ["Dedicated account management", "SSO & integrations", "Unlimited invites per job"],
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group p-6 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">{p.title}</h3>
                <div className="mt-1 text-pink-400 font-semibold">{p.fee}</div>
                <p className="mt-3 text-gray-400">{p.desc}</p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  {p.features.map((f) => (
                    <li key={f}><span className="text-pink-400">✅</span> {f}</li>
                  ))}
                </ul>
               
              </motion.div>
            ))}
          </div>
        </section>
                
        
        {/* === Why Choose Section === */}
        <section className="mt-16 bg-gradient-to-br  via-purple-950 to-violet-950 border-t border-gray-800 rounded-2xl shadow-inner">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Why Choose Neha's Website?
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Secure Payments", desc: "Protected transactions with escrow system and milestone-based payments." },
                { icon: Search, title: "Smart Matching", desc: "AI-powered matching system connects you with the perfect talent or projects." },
                { icon: Users, title: "Verified Profiles", desc: "All freelancers and clients go through our verification process." },
                { icon: TrendingUp, title: "Growth Tracking", desc: "Detailed analytics and insights to help you grow your business." },
                { icon: Globe, title: "Global Reach", desc: "Connect with talent and opportunities from around the world." },
                { icon: Zap, title: "Fast Hiring", desc: "Streamlined process to get your projects started quickly." },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  className="p-6 rounded-xl border border-gray-800 bg-gray-900/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:border-pink-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-md bg-gradient-to-r from-pink-500 to-violet-600 inline-flex items-center justify-center">
                      {(() => { const Icon = f.icon; return <Icon className="w-5 h-5 text-white" />; })()}
                    </span>
                    <div className="text-xl font-semibold text-white">{f.title}</div>
                  </div>
                  <div className="mt-2 text-zinc-400">{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
