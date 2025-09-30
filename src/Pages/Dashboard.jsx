import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats] = useState({
    earnings: "$24,350",
    earningsDelta: "+18% this month",
    activeProjects: 5,
    activeDelta: "+2 this week",
    successRate: "96%",
    successDelta: "+3% vs last month",
    profileViews: 847,
    viewsDelta: "+12% this week",
  });

  const applications = [
    {
      title: "Full-Stack Developer for SaaS Platform",
      company: "TechCorp Inc.",
      budget: "$8,000-$12,000",
      skills: ["React", "Node.js", "TypeScript"],
      status: "Under Review",
      date: "Applied on Dec 1, 2024",
    },
    {
      title: "React Native Mobile App",
      company: "StartupXYZ",
      budget: "$5,000-$7,000",
      skills: ["React Native", "JavaScript", "API Integration"],
      status: "Shortlisted",
      date: "Applied on Nov 28, 2024",
    },
    {
      title: "E-commerce Website Redesign",
      company: "Fashion Boutique",
      budget: "$3,000-$4,500",
      skills: ["UI/UX", "Frontend", "Shopify"],
      status: "Accepted",
      date: "Applied on Nov 25, 2024",
    },
  ];

  const recommended = [
    {
      title: "Senior React Developer Needed",
      company: "FinTech Solutions",
      rate: "$75/hr",
      duration: "3-6 months",
      time: "2 hours ago",
      skills: ["React", "TypeScript", "GraphQL"],
    },
    {
      title: "Mobile App Development",
      company: "Health Startup",
      budget: "$6,000-$10,000",
      duration: "2-3 months",
      time: "5 hours ago",
      skills: ["React Native", "Healthcare", "API"],
    },
  ];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Freelancer Dashboard</h1>
        <Link to="/payments" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600">Go to Payments</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{
          label: "Total Earnings",
          value: stats.earnings,
          delta: stats.earningsDelta,
        },{
          label: "Active Projects",
          value: stats.activeProjects,
          delta: stats.activeDelta,
        },{
          label: "Success Rate",
          value: stats.successRate,
          delta: stats.successDelta,
        },{
          label: "Profile Views",
          value: stats.profileViews,
          delta: stats.viewsDelta,
        }].map((c, i) => (
          <motion.div key={c.label} className="p-5 rounded-xl bg-gray-900 border border-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-gray-400 text-sm">{c.label}</div>
            <div className="text-2xl font-bold mt-1">{c.value}</div>
            <div className="text-xs mt-1 text-green-400">{c.delta}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 p-6 rounded-xl bg-gray-900 border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">My Applications</h2>
          <div className="space-y-4">
            {applications.map((a) => (
              <div key={a.title} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-sm text-gray-400">{a.company} • Budget: {a.budget}</div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-600">{a.status}</div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-300">
                  {a.skills.map(s => <span key={s} className="px-2 py-0.5 rounded bg-gray-700">{s}</span>)}
                </div>
                <div className="mt-2 text-xs text-gray-500">{a.date}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="p-6 rounded-xl bg-gray-900 border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="space-y-4">
            {recommended.map((r) => (
              <div key={r.title} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-gray-400">{r.company} • {r.rate || r.budget} • {r.duration} • {r.time}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-300">
                  {r.skills.map(s => <span key={s} className="px-2 py-0.5 rounded bg-gray-700">{s}</span>)}
                </div>
                <div className="mt-3">
                  <button className="px-3 py-1.5 text-sm rounded bg-gradient-to-r from-pink-500 to-violet-600">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


