import React from "react";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

export default function Home() {
  const categories = [
    "Web Development", "Graphic Design", "Digital Marketing", "Content Writing",
    "SEO", "Video Editing", "App Development", "UI/UX Design", "Photography",
    "Translation", "Animation", "Social Media Management", "Voice Over",
    "Music Production", "Illustration", "E-commerce", "Branding", "Data Entry",
    "Virtual Assistant", "Game Development", "3D Modeling", "Cybersecurity"
  ];

  const colors = [
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-red-500",
    "from-green-400 to-teal-500",
    "from-yellow-400 to-orange-500",
    "from-blue-400 to-indigo-500",
    "from-red-400 to-pink-500",
  ];

  // Duplicate categories for continuous scroll
  const duplicatedCategories = [...categories, ...categories];

  return (
    <div className="space-y-12">
      <Hero />

      {/* Categories Section */}
      <section className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-indigo-400 mb-4 text-center tracking-wide">
            Explore Categories
          </h2>
          <p className="text-gray-400 text-center mb-10 text-lg">
            Discover talented freelancers across multiple domains
          </p>

          <div className="overflow-hidden relative">
            <div className="flex animate-marquee whitespace-nowrap gap-8">
              {duplicatedCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 px-10 py-6 bg-gradient-to-r ${colors[idx % colors.length]} rounded-3xl shadow-2xl text-white font-semibold cursor-pointer hover:scale-110 hover:shadow-indigo-500 transition-transform duration-300`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <Testimonials />
      </section>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            min-width: max-content;
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}
