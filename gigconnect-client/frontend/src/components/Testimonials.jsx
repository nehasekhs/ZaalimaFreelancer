import React from "react";

const testimonials = [
  {
    category: "Web Development",
    review:
      "Working with GigConnect freelancers was a game-changer! They delivered a sleek, modern website ahead of schedule and exceeded expectations.",
    rating: 5,
    author: "Arjun M.",
    role: "Startup Founder",
    date: "Aug 12, 2025",
    image: "https://i.pravatar.cc/100?img=52",
  },
  {
    category: "UI/UX Design",
    review:
      "Absolutely loved the design process. The freelancer really understood our brand and created a user-friendly interface that our clients adore.",
    rating: 5,
    author: "Sophia L.",
    role: "Product Manager",
    date: "Jul 25, 2025",
    image: "https://i.pravatar.cc/100?img=36",
  },
  {
    category: "AI Solutions",
    review:
      "The AI model built for our project works flawlessly! The freelancer explained everything clearly and delivered top-notch quality.",
    rating: 5,
    author: "Karan S.",
    role: "Tech Lead",
    date: "Sep 2, 2025",
    image: "https://i.pravatar.cc/100?img=64",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            Real Stories. Real Impact.
          </h2>
          <p className="text-gray-400 text-lg">
            What our clients say about GigConnect freelancers
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-lg hover:shadow-green-500/20 hover:-translate-y-2 transition transform duration-300"
            >
              {/* Quote */}
              <span className="text-6xl text-green-500/30 absolute top-3 left-4">
                ❝
              </span>

              <p className="text-sm font-semibold text-purple-400 mb-2">
                {t.category}
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">“{t.review}”</p>

              {/* Rating */}
              <div className="flex text-yellow-400 mb-6">
                {"★".repeat(t.rating)}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-12 h-12 rounded-full border-2 border-green-400/60"
                />
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-xs text-gray-400">
                    {t.role} • {t.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
