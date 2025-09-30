import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getFreelancersByCategory, getCategoryTitle } from "../data/freelancers";

function PortfolioPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const title = getCategoryTitle(category);
  const people = getFreelancersByCategory(title);

  if (people.length === 0) {
    return <p className="text-center mt-10 text-red-500">No freelancers found in this category.</p>;
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        {title} - Top Freelancers
      </h1>

      <AnimatePresence>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {people.map((person, index) => (
            <motion.div
              key={person.id}
              className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-green-500/20 cursor-pointer"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/Freelancers/${encodeURIComponent(title)}/${person.id}`)}
            >
              <motion.img
                src={person.img}
                alt={person.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-500"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              />
              <h3 className="text-xl font-semibold text-center">{person.name}</h3>
              <p className="text-gray-400 text-center">{person.role}</p>
              <div className="flex justify-between mt-3 text-sm text-gray-300">
                <span>⭐ {person.rating}</span>
                <span>${person.price}/hr</span>
              </div>
              <p className="text-green-400 text-center mt-2">{person.skill}</p>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default PortfolioPage;
