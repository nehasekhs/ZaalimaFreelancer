import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const savedToken = localStorage.getItem("token"); // Correctly get the token
    const savedUser = localStorage.getItem("user"); // Correctly get the user string

    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
      }
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

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
            <h2 className="text-2xl font-bold">
              Welcome,{" "}
              <span className="text-pink-400">
                {user.name || "Unnamed User"}
              </span>
            </h2>
            <p className="text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">
              Role: {user.role || "guest"}
            </p>
          </div>

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

          {/* Logout Button */}
          <div className="mt-6">
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