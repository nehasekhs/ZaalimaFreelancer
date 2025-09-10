import React, { useState } from "react";

 function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
    <div className="">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-500">GigConnect</div>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li className="hover:text-green-400 cursor-pointer">Home</li>

          {/* Hire Freelancer with Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-green-400 cursor-pointer"
            >
              Hire Freelancer ▾
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <li className="px-4 py-2 hover:bg-green-200 cursor-pointer">
                  Web Developers
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Designers
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Writers
                </li>
              </ul>
            )}
          </li>

          <li className="hover:text-green-400 cursor-pointer">Find Work</li>
          <li className="hover:text-green-400 cursor-pointer">Pricing</li>
        </ul>

        {/* Right Side: Login & Signup */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 rounded-lg hover:text-green-400">
            Login
          </button>
          <button className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400">
            Sign Up
          </button>
        </div>
      </nav>

     
    </div>
    </>
  );
}
export default Navbar;