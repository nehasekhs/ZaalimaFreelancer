import React from "react";

export default function Features() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-indigo-400 text-center mb-6">Features</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Project Posting</h2>
            <p>Create detailed projects with budgets, deadlines, and categories to attract the best talent.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Freelancer Exploration</h2>
            <p>Search and connect with skilled freelancers across multiple domains and expertise levels.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Secure Payments</h2>
            <p>Handle transactions safely and transparently with our integrated payment system.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Real-time Chat</h2>
            <p>Communicate efficiently with freelancers or clients directly on the platform.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Profile Management</h2>
            <p>Showcase your skills, manage projects, and track your progress effectively.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Client Dashboard</h2>
            <p>Clients can monitor project progress, payments, and freelancer performance in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
