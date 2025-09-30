import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, CreditCard } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
    {id: "Client Dashboard", label: "Client Dashboard", icon: CreditCard },
    { id: "language", label: "Language", icon: Globe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  defaultValue="New York, NY"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                rows={4}
                defaultValue="Experienced client looking for quality freelancers."
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Security Settings</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                <h4 className="font-medium mb-2">Change Password</h4>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  />
                </div>
                <button className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white">
                  Update Password
                </button>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400 mb-3">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Dark", "Light", "Auto"].map((theme) => (
                    <button
                      key={theme}
                      className={`p-3 rounded-lg border ${
                        theme === "Dark" 
                          ? "border-pink-500 bg-pink-500/20 text-pink-400" 
                          : "border-gray-600 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Billing & Payments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                <h4 className="font-medium mb-2">Payment Methods</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-gray-700">
                    <span>**** **** **** 1234</span>
                    <span className="text-sm text-gray-400">Visa</span>
                  </div>
                  <button className="w-full p-2 rounded border border-gray-600 text-gray-300 hover:border-gray-500">
                    Add Payment Method
                  </button>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                <h4 className="font-medium mb-2">Billing History</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>September 2024</span>
                    <span>$150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>August 2024</span>
                    <span>$200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>July 2024</span>
                    <span>$125.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
       case "Client Dashboard":
        return(
          <>
          <Link to ="/client/dashboard">Client Dashboard</Link>
          </>
        );
      case "language":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Language & Region</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>INR (₹)</option>
                  <option>CAD (C$)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+5:30 (IST)</option>
                  <option>UTC+9 (JST)</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-xl bg-gray-900 border border-gray-800"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
