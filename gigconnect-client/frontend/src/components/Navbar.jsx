import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Calculate unread chats count from localStorage
  useEffect(() => {
    const allChats = JSON.parse(localStorage.getItem("allChats")) || {};
    let count = 0;
    Object.values(allChats).forEach((messages) => {
      messages.forEach((msg) => {
        if (msg.from === "freelancer" && !msg.read) count++;
      });
    });
    setUnreadCount(count);
  }, [location]);

  // Function to apply active link style
  const getLinkClasses = (path) =>
    location.pathname === path
      ? "hover:text-indigo-400 transition text-indigo-400 font-semibold"
      : "hover:text-indigo-400 transition";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link
        to={user ? "/home" : "/login"}
        className="text-2xl font-bold hover:text-indigo-400 transition"
      >
        GigConnect
      </Link>

      <div className="flex items-center space-x-4 relative">
        {/* Always show Login/Signup if user not logged in */}
        {!user && (
          <>
            <Link to="/login" className={getLinkClasses("/login")}>
              Login
            </Link>
            <Link to="/signup" className={getLinkClasses("/signup")}>
              Signup
            </Link>
          </>
        )}

        {/* User logged in */}
        {user && (
          <>
            <Link
              to="/freelancer"
              className={getLinkClasses("/freelancer") + " font-medium"}
            >
              Explore Freelancers
            </Link>

            <Link
              to="/chats"
              className={getLinkClasses("/chats") + " font-medium relative"}
            >
              Chats
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              to="/categories"
              className={getLinkClasses("/categories") + " font-medium"}
            >
              Categories
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full hover:bg-gray-700 transition duration-200"
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
                    {user?.name ? user.name[0] : "U"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50 overflow-hidden animate-fadeIn">
                  <Link
                    to="/update-profile"
                    className="block px-4 py-3 hover:bg-gray-700 transition font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/projects"
                    className="block px-4 py-3 hover:bg-gray-700 transition font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/post-project"
                    className="block px-4 py-3 hover:bg-gray-700 transition font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Post Project
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 hover:bg-gray-700 transition font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Client Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-600 hover:text-white transition font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
