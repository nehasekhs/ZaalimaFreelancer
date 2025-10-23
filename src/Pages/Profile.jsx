import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { getProfileApi, updateProfileApi } from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
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
  // Handle Edit Profile
  const handleEdit = () => {
    if (user.role === "freelancer") {
    setFormData({
      title: user.title || "",
      location: user.location || "",
      experienceYears: user.experienceYears || "",
      hourlyRate: user.hourlyRate || "",
      skills: (user.skills || []).join(", "),
      categories: (user.categories || []).join(", "),
      availability: user.availability || "Available",
      portfolioUrl: user.portfolioUrl || "",
      avatarUrl: user.avatarUrl || "",
      bio: user.bio || "",
    });
    } else if (user.role === "client") {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
        phone: user.phone || "",
        company: user.company || "",
        avatarUrl: user.avatarUrl || "",
        bio: user.bio || "",
      });
    }
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updates = { ...formData };

      // format fields for freelancer
      if (user.role === "freelancer") {
        updates = {
          ...formData,
          experienceYears: Number(formData.experienceYears),
          hourlyRate: Number(formData.hourlyRate),
          skills: formData.skills
            ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
          categories: formData.categories
            ? formData.categories.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
        };
      }
       const updatedResponse = await updateProfileApi(updates);
      const updatedUser =
        updatedResponse.user || updatedResponse.updatedUser || updatedResponse;

      setUser((prev) => ({ ...prev, ...updatedUser })); // merge updates
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message || "Failed to update profile");
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
          {/* CLIENT INFO */}
          {user.role === "client" && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-green-400">Client Profile</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p><span className="text-gray-400">Name:</span> {user.name || "—"}</p>
                <p><span className="text-gray-400">Email:</span> {user.email || "—"}</p>
                <p><span className="text-gray-400">Phone:</span> {user.phone || "—"}</p>
                <p><span className="text-gray-400">Location:</span> {user.location || "—"}</p>
                <p><span className="text-gray-400">Company:</span> {user.company || "—"}</p>
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
              onClick={handleEdit}
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

          {/* EDIT FORM MODAL */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-center text-white">
                  Edit {user.role === "client" ? "Client" : "Freelancer"} Profile
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* FREELANCER FIELDS */}
                  {user.role === "freelancer" && (
                    <>
                      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} placeholder="Experience (years)" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="hourlyRate" type="number" value={formData.hourlyRate} onChange={handleChange} placeholder="Hourly Rate ($)" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="categories" value={formData.categories} onChange={handleChange} placeholder="Categories (comma separated)" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="Profile Photo URL" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 rounded bg-gray-700 outline-none"></textarea>
                    </>
                  )}

                  {/* CLIENT FIELDS */}
                  {user.role === "client" && (
                    <>
                      <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <input name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="Profile Photo URL" className="w-full p-2 rounded bg-gray-700 outline-none" />
                      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 rounded bg-gray-700 outline-none"></textarea>
                    </>
                  )}

                  <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-2 bg-gray-600 rounded hover:bg-gray-700">
                      Cancel
                    </button>
                    <button type="submit" className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-700">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </>
      </motion.div>
    </div>

  );
}

export default Profile;