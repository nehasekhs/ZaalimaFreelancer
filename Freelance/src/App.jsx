// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

// Optional top nav (you can remove if you prefer your own Navbar component)
function Nav() {
  return (
    <nav className="">
      {/* <Link to="/" className="text-white font-bold">FreelanceHub</Link>
      <div className="flex gap-3">
        <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
        <Link to="/signup" className="text-gray-300 hover:text-white">Signup</Link>
      </div> */}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        {/* If you want your custom Navbar, replace <Nav /> with <Navbar /> */}
        <Nav />
        {/* <Navbar /> */}

        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Auth pages */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
