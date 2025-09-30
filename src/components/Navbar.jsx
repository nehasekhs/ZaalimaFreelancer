import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 

 function Navbar({ onMenuClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
    <div className="">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-md">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-400 hover:text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 inline-block"></span>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Neha's Website</span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">

          <li className="hover:text-green-400 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer">
            <Link to="/hire-freelancer">Hire Freelancer</Link>
          </li>

          <li className="hover:text-green-400 cursor-pointer">
            <Link to="/projects">Find Work</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer">
            <Link to="/reviews/demo">Reviews</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer">
            <Link to="/payments">Payments</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer">
            <Link to="/project-room/demo">Chat 💬</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer">
           <Link to="/settings">Setting</Link>
           </li>
        </ul>

        {/* Right Side: Login & Signup */}
        <div className="hidden md:flex space-x-4">
         <Link
            to="/login"
            className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
          >
            Login
          </Link>
         {/* Signup button */}
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Sign up
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-green-500">
            <FaUserCircle size={28} />
          </Link>
        </div>
      </nav>
     
    </div>
    </>
  );
}
export default Navbar;