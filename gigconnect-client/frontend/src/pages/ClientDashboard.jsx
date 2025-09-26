import React, { useState, useEffect } from "react";
import api from "../utils/api"; // apna axios instance

export default function ClientDashboard() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // ✅ Updated: backend ke existing /projects endpoint ka use
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-400">
        Client Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-gray-700">
        <button
          className={`py-2 px-4 font-medium transition ${
            activeTab === "projects"
              ? "border-b-2 border-indigo-400 text-indigo-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          My Projects
        </button>
      </div>

      {/* Projects Tab Content */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">
              No projects found.
            </p>
          ) : (
            projects.map((p) => (
              <div
                key={p._id}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-[1.02] hover:shadow-2xl transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-indigo-400">
                  {p.title}
                </h2>
                <p className="text-gray-300 mt-1">{p.description}</p>
                <p className="text-gray-400 mt-2">
                  <strong>Category:</strong> {p.category}
                </p>
                <p className="text-gray-400 mt-1">
                  <strong>Budget:</strong> ₹{p.budget}
                </p>
                <p className="text-gray-400 mt-1">
                  <strong>Duration:</strong> {p.duration}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
