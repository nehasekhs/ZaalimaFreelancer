import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  User, 
  MessageSquare, 
  Search, 
  Briefcase, 
  Settings, 
  BarChart3,
  CreditCard,
  FileText,
  Users
} from "lucide-react";

const sidebarItems = [
  { path: "/", icon: Home, label: "Dashboard", description: "Overview and analytics" },
  { path: "/profile", icon: User, label: "Profile", description: "Manage your profile" },
  { path: "/project-room/demo", icon: MessageSquare, label: "Messages", description: "Chat and communication" },
  { path: "/projects", icon: Search, label: "Find Freelancer", description: "Browse available talent" },
  { path: "/client/jobs/new", icon: Briefcase, label: "Hire Freelancer", description: "Post new job" },
  { path: "/client/jobs", icon: FileText, label: "My Jobs", description: "Manage job postings" },
  { path: "/payments", icon: CreditCard, label: "Payments", description: "Payment history and wallet" },
  { path: "/reviews/demo", icon: Users, label: "Reviews", description: "View ratings and feedback" },
  { path: "/settings", icon: Settings, label: "Settings", description: "Account preferences" },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile and desktop when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar - overlay on all sizes */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50 shadow-2xl`}
      >
        <div className="p-6">
          {/* Header with logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 shadow-md"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                Neha's Website
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`block p-4 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white" 
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className={`text-xs ${
                        isActive ? "text-pink-100" : "text-gray-500"
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="mt-8 p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold">
                U
              </div>
              <div>
                <div className="font-medium text-white">User Name</div>
                <div className="text-sm text-gray-400">Client</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
