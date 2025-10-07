import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    duration: ""
  });

  // ✅ new states for popup
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const categories = [
    "🌐 Web Development", "📱 Mobile App Development", "🎨 UI/UX Design",
    "✍️ Content Writing", "📢 Digital Marketing", "📊 Data Analysis",
    "🎬 Video Editing", "⚡ SEO Optimization", "🛒 E-commerce Development",
    "🤖 AI & Machine Learning", "☁️ Cloud Computing", "🔒 Cybersecurity",
    "📷 Photography", "🎵 Music & Audio Editing", "📰 Copywriting",
    "📚 Academic Writing", "🖥️ Desktop App Development", "🎮 Game Development",
    "📈 Business Strategy", "💼 Virtual Assistance", "🗣️ Translation & Languages",
    "📑 Resume & CV Writing"
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "number" ? Number(value) : value
    });
  };

  const startEditing = (project) => {
    setSelectedProject(project);
    setEditForm({
      title: project.title ?? "",
      description: project.description ?? "",
      category: project.category ?? "",
      budget: project.budget ?? 0,
      duration: project.duration ?? ""
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/projects/${selectedProject._id}`, editForm);
      setPopup({ show: true, message: "✅ Project updated successfully", type: "success" });
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      setPopup({ show: true, message: error.response?.data?.message || "Update failed", type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${selectedProject._id}`);
      setPopup({ show: true, message: "✅ Project deleted successfully", type: "success" });
      setConfirmDelete(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      setPopup({ show: true, message: error.response?.data?.message || "Delete failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black p-8 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
        Your Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300 cursor-pointer"
              onClick={() => startEditing(p)}
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-indigo-400">{p.title}</h2>
                <p className="text-gray-300 text-sm line-clamp-3">{p.description || "No description"}</p>
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium mt-2">
                  {p.category || "No category"}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Duration: {p.duration || "N/A"}</span>
                <span className="text-xl font-bold text-green-400">₹{p.budget}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {selectedProject && !confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-lg shadow-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold"
              onClick={() => setSelectedProject(null)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Edit Project</h2>

            <div className="space-y-3">
              <input name="title" value={editForm.title} onChange={handleEditChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                placeholder="Project Title"
              />
              <textarea name="description" value={editForm.description} onChange={handleEditChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 resize-none"
                rows="3" placeholder="Project Description"
              />
              <select name="category" value={editForm.category} onChange={handleEditChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select a Category --</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>

              <input name="budget" type="number" value={editForm.budget} onChange={handleEditChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                placeholder="Budget (₹)"
              />
              <input name="duration" value={editForm.duration} onChange={handleEditChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                placeholder="Duration"
              />
            </div>

            <div className="mt-4 flex justify-between">
              <button onClick={handleUpdate} className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Update
              </button>
              <button onClick={() => setConfirmDelete(true)} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm">
            <h2 className="text-xl font-bold text-red-500 mb-4">⚠️ Confirm Delete</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete <span className="text-indigo-400">{selectedProject?.title}</span>?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setConfirmDelete(false)} className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition">Cancel</button>
              <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Popup */}
      {popup.show && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg border 
          border-gray-700 animate-bounce-in z-50">
          <p className={popup.type === "success" ? "text-green-400" : "text-red-400"}>
            {popup.message}
          </p>
          <button onClick={() => setPopup({ show: false, message: "", type: "" })}
            className="ml-4 text-gray-400 hover:text-white text-sm"></button>
        </div>
      )}
    </div>
  );
}
