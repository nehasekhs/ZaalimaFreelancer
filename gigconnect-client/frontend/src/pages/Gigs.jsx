import { motion } from "framer-motion";

const Gigs = () => {
  const gigs = [
    {
      id: 1,
      title: "Web Development",
      desc: "I will build responsive modern websites",
      price: "$200",
      image: "https://source.unsplash.com/400x300/?website",
    },
    {
      id: 2,
      title: "Graphic Design",
      desc: "Creative logo & branding design",
      price: "$150",
      image: "https://source.unsplash.com/400x300/?design",
    },
    {
      id: 3,
      title: "Video Editing",
      desc: "Professional video editing for social media",
      price: "$100",
      image: "https://source.unsplash.com/400x300/?video",
    },
  ];

  return (
    <section className="relative bg-gray-950 py-20 px-6 text-white min-h-screen overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-[120px]"></div>
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-700/20 blur-[100px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          Explore Creative Gigs
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14 text-lg">
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
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:border-indigo-500/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-indigo-500/30">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6 flex flex-col justify-between h-44">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition relative inline-block">
                      {gig.title}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                    </h3>
                    <p className="text-gray-400 mt-2 text-sm">{gig.desc}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-semibold text-pink-400">
                      {gig.price}
                    </span>
                    <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition font-medium shadow-md hover:shadow-indigo-500/30">
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
