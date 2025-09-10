import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react"; 

 function Home() {
  return (
    <>
    <div className="bg-black text-white min-h-screen">
      
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[80vh]">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" // you can replace with your own
          alt="freelancer work"
          className="w-full h-full object-cover opacity-80"
        />
<div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
         <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-8">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold text-green-500 mb-8">
        Our Freelancer
      </h1>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Search Icon */}
        <span className="pl-4 text-gray-500">
          <Search size={22} />
        </span>

        {/* Input */}
        <input
          type="text"
          placeholder="Search for services..."
          className="flex-1 px-3 py-3 text-black outline-none"
        />

        {/* Button with border only */}
        <button className="px-5 py-2 m-1 border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-500 hover:text-black transition">
          Go
        </button>
      </div>

      {/* Category Buttons with Motion Animation */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-wrap justify-start gap-4 mt-10"
      >
        <button className="px-6 py-3 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-black transition">
          Website Development
        </button>
        <button className="px-6 py-3 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-black transition">
          Architecture and Interior Design
        </button>
        <button className="px-6 py-3 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-black transition">
         UI/UX design
        </button>
        <button className="px-6 py-3 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-black transition">
         Vedio editing
        </button>
      </motion.div>
    </div>
      </div>
    </div>
    </>
  );
}
export default Home;