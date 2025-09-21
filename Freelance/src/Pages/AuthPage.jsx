// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import AuthPage from "./Pages/AuthPage"; // 🔥 combined Login + Signup
import Profile from "./Pages/Profile";

// Simple top navigation (can be replaced by your own Navbar)
function Nav() {
  return (
    <nav className="px-6 py-4 flex justify-between items-center bg-black/60">
      <Link to="/" className="text-white font-bold">FreelanceHub</Link>
      <div className="flex gap-3">
        <Link to="/auth" className="text-gray-300 hover:text-white">Login / Signup</Link>
        <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        {/* Navbar */}
        <Nav />
        {/* <Navbar /> if you want your custom nav instead */}

        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Combined Auth Page (Login + Signup) */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Profile page */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
