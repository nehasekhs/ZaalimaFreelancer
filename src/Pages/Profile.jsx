import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { getProfileApi, updateProfileApi } from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
   const [err, setErr] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  // Simulating an API call to a logout endpoint
  const logoutApi = () => {
    return new Promise((resolve) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      resolve();
    });
  };

  // fetch user + projects from backend
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfileApi();
        setUser(data.user || data); // backend may return { user: {...} } or just {...}
      } catch (error) {
        setErr(error.message);
        // Redirect to login if unauthorized
        setTimeout(() => navigate("/login"), 1500);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (!user) return <div className="p-12 text-center">Please log in to view this page.</div>; // Redirect to login page if no user data

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg text-white"
      >
        <>
          {/* User Info */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-pink-500" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-xl">{(user.name||"?").charAt(0)}</div>
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-pink-400">{user.name || "Unnamed User"}</span>
                </h2>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-400 mt-1">Role: {user.role || "guest"}</p>
              </div>
            </div>
          </div>

          {/* Freelancer Details */}
          {user.role === "freelancer" && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-green-400">Freelancer Profile</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p><span className="text-gray-400">Title:</span> {user.title || "—"}</p>
                <p><span className="text-gray-400">Location:</span> {user.location || "—"}</p>
                <p><span className="text-gray-400">Experience:</span> {user.experienceYears ?? "—"} yrs</p>
                <p><span className="text-gray-400">Hourly Rate:</span> {user.hourlyRate ? `$${user.hourlyRate}/hr` : "—"}</p>
                <p className="md:col-span-2"><span className="text-gray-400">Skills:</span> {user.skills?.join(", ") || "—"}</p>
                <p className="md:col-span-2"><span className="text-gray-400">Categories:</span> {user.categories?.join(", ") || "—"}</p>
                <p className="md:col-span-2"><span className="text-gray-400">Availability:</span> {user.availability || "—"}</p>
                <p className="md:col-span-2"><span className="text-gray-400">Portfolio:</span> {user.portfolioUrl ? <a className="text-pink-400" href={user.portfolioUrl} target="_blank" rel="noreferrer">{user.portfolioUrl}</a> : "—"}</p>
                <p className="md:col-span-2"><span className="text-gray-400">Bio:</span> {user.bio || "—"}</p>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {user.role === "client" && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Projects You Posted
              </h3>
              {user.projects?.length ? (
                <ul className="space-y-3">
                  {user.projects.map((proj) => (
                    <li
                      key={proj.id}
                      className="p-4 bg-gray-800 rounded-lg shadow"
                    >
                      <h4 className="font-medium text-lg">{proj.title}</h4>
                      <p className="text-sm text-gray-400">{proj.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Budget: ${proj.budget}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">
                  You haven’t posted any projects yet.
                </p>
              )}
            </div>
          )}

          {user.role === "freelancer" && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                Projects You Applied To
              </h3>
              {user.appliedProjects?.length ? (
                <ul className="space-y-3">
                  {user.appliedProjects.map((proj) => (
                    <li
                      key={proj.id}
                      className="p-4 bg-gray-800 rounded-lg shadow"
                    >
                      <h4 className="font-medium text-lg">{proj.title}</h4>
                      <p className="text-sm text-gray-400">{proj.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Status: {proj.status}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">
                  You haven’t applied to any projects yet.
                </p>
              )}
            </div>
          )}

          {/* Edit & Logout */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={async () => {
                const updates = {};
                const title = prompt("Title", user.title || ""); if (title !== null) updates.title = title;
                const location = prompt("Location", user.location || ""); if (location !== null) updates.location = location;
                const experienceYears = prompt("Experience (years)", user.experienceYears ?? ""); if (experienceYears !== null && experienceYears !== "") updates.experienceYears = Number(experienceYears);
                const hourlyRate = prompt("Hourly Rate ($)", user.hourlyRate ?? ""); if (hourlyRate !== null && hourlyRate !== "") updates.hourlyRate = Number(hourlyRate);
                const skills = prompt("Skills (comma separated)", (user.skills || []).join(", ")); if (skills !== null) updates.skills = skills.split(",").map(s=>s.trim()).filter(Boolean);
                const categories = prompt("Categories (comma separated)", (user.categories || []).join(", ")); if (categories !== null) updates.categories = categories.split(",").map(s=>s.trim()).filter(Boolean);
                const availability = prompt("Availability", user.availability || "Available"); if (availability !== null) updates.availability = availability;
                const portfolioUrl = prompt("Portfolio URL", user.portfolioUrl || ""); if (portfolioUrl !== null) updates.portfolioUrl = portfolioUrl;
                const avatarUrl = prompt("Profile Photo URL", user.avatarUrl || ""); if (avatarUrl !== null) updates.avatarUrl = avatarUrl;
                try {
                  const updated = await updateProfileApi(updates);
                  setUser(updated);
                } catch (e) {
                  alert(e.message);
                }
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </>
      </motion.div>
    </div>
  );
}

export default Profile;