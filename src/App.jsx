import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';
import NotificationsPage from './Pages/Notifications';
import HelpSupport from './Pages/HelpSupport';
import DemoHub from './Pages/DemoHub';
import HireFreelancer from './Pages/HireFreelancer';
import ProjectListings from './Pages/ProjectListings';
import FreelancerProfile from './Pages/FreelancerProfile';
import Messaging from './components/Messaging';
import VerificationCenter from './components/VerificationCenter';
import PaymentModal from './components/PaymentModal';
import AIMatching from './components/AIMatching';
import AISearch from './components/AISearch';
import Gamification from './components/Gamification';
import CollaborationTools from './components/CollaborationTools';
import AnalyticsDashboard from './components/AnalyticsDashboard';

// Pages
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ExploreCategories from './Pages/ExploreCategories';
import Reviews from './Pages/Reviews';
import WriteReview from './Pages/WriteReview';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const handlePaymentSuccess = (payment) => {
    console.log('Payment created successfully:', payment);
    setShowPaymentModal(false);
    // You can add success notification here
  };

  const handleStartPayment = (project, freelancer) => {
    setSelectedProject(project);
    setSelectedFreelancer(freelancer);
    setShowPaymentModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Navigation user={user} onLogout={handleLogout} />
        
        <main className="relative">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/login" 
                element={
                  user ? <Navigate to="/dashboard" replace /> : 
                  <Login onLogin={handleLogin} />
                } 
              />
              <Route 
                path="/signup" 
                element={
                  user ? <Navigate to="/dashboard" replace /> : 
                  <Signup onSignup={handleLogin} />
                } 
              />
              
              {/* Protected Routes - Temporarily bypassed for testing */}
              <Route 
                path="/dashboard" 
                element={<Dashboard userType={user?.userType || 'client'} />} 
              />
              
              <Route 
                path="/hire" 
                element={<HireFreelancer />} 
              />
              
              <Route 
                path="/projects" 
                element={<ProjectListings />} 
              />
              
              <Route 
                path="/freelancer/:id" 
                element={<FreelancerProfile />} 
              />
              
              <Route 
                path="/categories" 
                element={<ExploreCategories />} 
              />
              
              <Route 
                path="/reviews" 
                element={<Reviews />} 
              />
              
              <Route 
                path="/write-review" 
                element={<WriteReview />} 
              />
              
              <Route 
                path="/verification" 
                element={<VerificationCenter user={user} />} 
              />
              
              {/* Additional Routes */}
              <Route 
                path="/freelancers" 
                element={<ProjectListings />} 
              />
              
              <Route 
                path="/my-projects" 
                element={<ProjectListings />} 
              />
              
              <Route 
                path="/my-jobs" 
                element={<ProjectListings />} 
              />
              
              <Route 
                path="/messages" 
                element={<Messaging userId={user?._id} />} 
              />
              
              <Route 
                path="/reports" 
                element={<Dashboard userType={user?.userType || 'client'} />} 
              />
              
              <Route 
                path="/profile" 
                element={<Profile />} 
              />
              
              <Route 
                path="/settings" 
                element={<Settings />} 
              />
              
              <Route 
                path="/help" 
                element={<HelpSupport />} 
              />
              <Route 
                path="/notifications" 
                element={<NotificationsPage />} 
              />
              <Route 
                path="/demo" 
                element={<DemoHub />} 
              />
              <Route 
                path="/demo/files" 
                element={<DemoHub />} 
              />
              
              {/* AI & Innovation Routes */}
              <Route 
                path="/ai-matching" 
                element={<AIMatching />} 
              />
              
              <Route 
                path="/ai-search" 
                element={<AISearch />} 
              />
              
              <Route 
                path="/gamification" 
                element={<Gamification userId={user?._id} userType={user?.userType} />} 
              />
              
              <Route 
                path="/collaboration" 
                element={<CollaborationTools projectId="demo-project" userId={user?._id} />} 
              />
              
              <Route 
                path="/analytics" 
                element={<AnalyticsDashboard userType={user?.userType || 'client'} />} 
              />
              
              {/* Default Route */}
              <Route 
                path="/" 
                element={<Navigate to="/dashboard" replace />} 
              />
              
              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                      <p className="text-gray-300 text-xl mb-8">Page not found</p>
                      <a 
                        href="/dashboard" 
                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Global Modals */}
        <AnimatePresence>
          {showMessaging && user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowMessaging(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Messaging 
                  userId={user._id} 
                  onClose={() => setShowMessaging(false)} 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPaymentModal && selectedProject && selectedFreelancer && (
            <PaymentModal
              isOpen={showPaymentModal}
              onClose={() => {
                setShowPaymentModal(false);
                setSelectedProject(null);
                setSelectedFreelancer(null);
              }}
              project={selectedProject}
              freelancer={selectedFreelancer}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </AnimatePresence>

        {/* Floating Action Buttons */}
        {user && (
          <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-40">
            {/* Messages Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMessaging(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.button>

            {/* Quick Post Project Button */}
            {user.userType === 'client' && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.location.href = '/hire'}
                className="bg-violet-500 hover:bg-violet-600 text-white p-4 rounded-full shadow-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </motion.button>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-700 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">FreelanceHub</h3>
                <p className="text-gray-400 text-sm">
                  Connecting talented freelancers with amazing clients worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">For Freelancers</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Find Work</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Build Portfolio</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Get Paid</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Learn Skills</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">For Clients</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Post Projects</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Find Talent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Manage Projects</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Get Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 FreelanceHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;