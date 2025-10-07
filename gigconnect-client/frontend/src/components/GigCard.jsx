import { motion } from "framer-motion";

const Gigs = () => {
 const gigs = [
  {
    id: 1,
    title: "Web Development",
    desc: "I will build responsive modern websites",
    price: "$200",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    title: "Graphic Design",
    desc: "Creative logo & branding design",
    price: "$150",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    id: 3,
    title: "Video Editing",
    desc: "Professional video editing for social media",
    price: "$100",
    image: "https://picsum.photos/600/400?random=3",
  },
];


  return (
    <section className="relative bg-gray-950 py-20 px-6 text-white min-h-screen">
      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-gray-900/30 blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          Explore Creative Gigs
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14">
          Choose from top-quality gigs crafted by professionals. From web
          development to design and editing, find the perfect service for you.
        </p>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {gigs.map((gig, index) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-gray-800 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-indigo-500/30">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition">
                    {gig.title}
                  </h3>
                  <p className="text-gray-400 mt-2">{gig.desc}</p>
                  <div className="flex justify-between items-center mt-5">
                    <span className="text-lg font-semibold text-pink-400">
                      {gig.price}
                    </span>
                    <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gigs;
