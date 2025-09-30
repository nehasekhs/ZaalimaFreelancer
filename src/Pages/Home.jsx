import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Search, Shield, Star, Zap } from "lucide-react"; 
import { categories } from "../data/categories";


 function Home() {
  const navigate = useNavigate();
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
      {/* why we choose  */}
      <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Why choose <span className="text-purple-500">Freelance?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We provide everything you need to build successful working relationships
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-8 h-8 text-white" />,
              title: "Secure Payments",
              desc: "Your payments are protected with our secure escrow system. Pay only when you're satisfied with the work.",
              gradient: "from-blue-600 to-purple-600",
            },
            {
              icon: <Star className="w-8 h-8 text-white" />,
              title: "Quality Talent",
              desc: "Access to vetted freelancers with proven track records and stellar reviews from previous clients.",
              gradient: "from-green-500 to-teal-600",
            },
            {
              icon: <Zap className="w-8 h-8 text-white" />,
              title: "Fast Matching",
              desc: "Our advanced algorithm connects you with the perfect freelancer for your project in minutes, not days.",
              gradient: "from-pink-500 to-purple-600",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-gray-900 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center mx-auto mb-6`}
              >
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {card.title}
              </h3>
              <p className="text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
     
     {/* props */}
      <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
            Explore Millions of Props
          </h2>
          <p className="text-gray-400 mt-2">
            Choose from a wide range of categories to find the right talent
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((cat, index) => (
             <motion.div
                key={index}
                onClick={() => navigate(`/portfolio/${encodeURIComponent(cat.slug)}`)}
                className="rounded-xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.15 }}
                whileHover={{ scale: 1.07 }}
              >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Text */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
export default Home;