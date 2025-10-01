import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RealtimeNotifications from './RealtimeNotifications';
import { isClient, isFreelancer } from '../utils/role';

const Navigation = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.notifications?.filter(n => !n.isRead).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Build items by role per spec (fallback to localStorage if missing on user)
  const userType = user?.userType || localStorage.getItem('userType');
  const baseItems = [
    { name: 'Demos', href: '/demo', icon: '🎬' },
    { name: 'Verification Center', href: '/verification', icon: '✅' },
    { name: 'Messages', href: '/messages', icon: '💬',
      submenu: [
        { label: 'Inbox', href: '/messages' },
        { label: 'Notifications', href: '/notifications' },
        { label: 'Demo Sessions', href: '/demo' },
        { label: 'Shared Demo Files', href: '/demo/files' },
      ]
    }
  ];

  const clientOnly = [
    { name: 'Post a Project', href: '/hire', icon: '➕' },
    { name: 'Find Freelancers', href: '/freelancers', icon: '👥' },
  ];

  const freelancerOnly = [
    { name: 'Find Work', href: '/projects', icon: '🔍' },
    { name: 'My Jobs', href: '/my-jobs', icon: '💼' },
    { name: 'My Projects', href: '/my-projects', icon: '📋' },
    { name: 'AI Matches', href: '/ai-matching', icon: '🤖' },
    { name: 'Gamification', href: '/gamification', icon: '🏆' },
    { name: 'Analytics', href: '/analytics', icon: '📊' },
  ];

  let currentNavItems = baseItems;
  if (userType === 'client') {
    currentNavItems = [...clientOnly, ...baseItems];
  } else if (userType === 'freelancer') {
    currentNavItems = [...freelancerOnly, ...baseItems];
  }

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-white font-bold text-xl">FreelanceHub</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {currentNavItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                      {item.submenu.map((s) => (
                        <a key={s.href} href={s.href} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Notifications, Profile, Mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Real-time Notifications */}
            {user && (
              <RealtimeNotifications 
                userId={user._id} 
                onNotificationClick={(notification) => {
                  console.log('Notification clicked:', notification);
                  // Handle notification click
                }}
              />
            )}

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-md"
                >
                  <img
                    src={user.avatarUrl || '/default-avatar.png'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50"
                    >
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Profile
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Settings
                      </a>
                      <a
                        href="/help"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Help & Support
                      </a>
                      <hr className="my-1 border-gray-700" />
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </a>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {currentNavItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
                
                {!user && (
                  <div className="pt-4 border-t border-gray-700">
                    <a
                      href="/login"
                      className="block px-3 py-2 text-gray-300 hover:text-white rounded-md text-base font-medium"
                    >
                      Sign In
                    </a>
                    <a
                      href="/signup"
                      className="block px-3 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md text-base font-medium mt-2"
                    >
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
