import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Search, Users, TrendingUp, Globe, Zap } from "lucide-react";
import { categories } from "../data/categories";

export default function FreelancerLanding() {
  const navigate = useNavigate();
  const categoriesRef = useRef(null);
  const onExplore = (e) => {
    e.preventDefault();
    categoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Logo SVG (simple example, you can replace with your own)
  const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="url(#paint0_linear)" strokeWidth="4" fill="white" />
      <path d="M13 25L20 15L27 25" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899"/>
          <stop offset="1" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
    </svg>
  );

  // Testimonial profile images (replace with real images if available)
  const testimonialImages = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/men/45.jpg',
    'https://randomuser.me/api/portraits/men/65.jpg',
    'https://randomuser.me/api/portraits/men/77.jpg',
    'https://randomuser.me/api/portraits/men/88.jpg',
    'https://randomuser.me/api/portraits/men/99.jpg',
  ];

  return (
    <div className="bg-black text-white">
      {/* Logo top left */}
      <div className="absolute left-6 top-6 z-50 flex items-center">
       
       
      </div>
      {/* Header */}
      <header className="bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Find Top Talent. Grow Your Business.
              </h1>
              <p className="mt-4 text-zinc-300 text-lg md:text-xl max-w-2xl">
                Hire vetted freelancers for web development, design, writing, and more. Post your job and get matched fast.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
                >
                  Get Started
                </Link>
                <a
                  href="#categories"
                  onClick={onExplore}
                  className="px-6 py-3 border border-zinc-700 hover:border-green-500 hover:text-green-400 rounded-lg font-medium transition"
                >
                  Explore Categories
                </a>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video w-full rounded-xl bg-zinc-800/70 border border-zinc-700 grid place-items-center text-zinc-300">
                <div className="text-center p-6">
                  <div className="text-7xl mb-4">💼</div>
                  <p className="text-zinc-300">Thousands of projects completed by top-rated freelancers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section id="categories" ref={categoriesRef} className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Explore Categories</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div key={c.slug} className="group cursor-pointer" onClick={() => navigate(`/portfolio/${encodeURIComponent(c.slug)}`)}>
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-green-600 transition">
                <img src={c.img} alt={c.title} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <div className="text-xl font-semibold group-hover:text-green-400">{c.title}</div>
                  <div className="mt-1 text-zinc-400">Browse top {c.title}.</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Clients only pay after hiring</h2>
          <p className="text-center mt-2 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Choose a plan that fits your business</p>


          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "MARKETPLACE",
                fee: "5% fee after hiring",
                desc: "For starting out on our global freelancer marketplace",
                features: [
                  "Free to post jobs",
                  "AI-powered features",
                  "Collaboration & tracking tools",
                ],
              },
              {
                title: "BUSINESS PLUS",
                fee: "10% fee after hiring",
                desc: "For growing businesses with premium features and support",
                popular: true,
                features: [
                  "Pre-screened top 1% of talent",
                  "Premium 24/7 support",
                  "60 invites per job post",
                ],
              },
              {
                title: "ENTERPRISE",
                fee: "Contact sales",
                desc: "For scaling comprehensive solutions",
                features: [
                  "Dedicated account management",
                  "SSO & integrations",
                  "Unlimited invites per job",
                ],
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div
                  className="p-6 rounded-xl bg-zinc-900/40 border-2 border-transparent group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(#18181b,#18181b) padding-box, linear-gradient(135deg, #ec4899, #8b5cf6) border-box',
                    border: '2px solid transparent',
                  }}
                >
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">{p.title}</h3>
                  <div className="mt-1 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent font-semibold">{p.fee}</div>
                  <p className="mt-3 text-zinc-400">{p.desc}</p>
                  <ul className="mt-4 space-y-2 text-zinc-300">
                    {p.features.map((f) => (
                      <li key={f}><span className="text-pink-400">✅</span> {f}</li>
                    ))}
                  </ul>
                  <button
                    className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 hover:from-violet-600 hover:to-pink-500 text-white font-medium transition border-none shadow-md shadow-pink-500/20"
                  >
                    {p.fee === "Contact sales" ? "Contact Sales" : "Get Started"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center">Real results from clients</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Haris S.",
              role: "Full-Stack Developer",
              date: "Apr 7, 2025",
              review: "Haris came in and helped us transfer knowledge from our departing developer, meeting a serious deadline, without fail. His knowledge and experience are exceptional.",
            },
            {
              name: "Ezzan S.",
              role: "Video Editor",
              date: "Mar 14, 2025",
              review: "Ezzan did an amazing job editing my videos—fast turnaround, great attention to detail, and very easy to work with.",
            },
            {
              name: "Richard C.",
              role: "AI/ML Engineer",
              date: "Mar 28, 2025",
              review: "Rick is a fantastic AI/ML engineer, delivering end-to-end LLM solutions. We started with a concept and ended with a working system.",
            },
            {
              name: "Jibran Z.",
              role: "Marketing Expert",
              date: "Mar 10, 2025",
              review: "We loved working with Jibran. Very professional, responsive, and creative. We'll definitely work with him again.",
            },
            {
              name: "Michael L.",
              role: "Copywriter",
              date: "Jan 31, 2025",
              review: "Michael is highly professional and creative. He delivers on-brand content with a unique twist. Would hire again!",
            },
            {
              name: "Ahmed A.",
              role: "Project Manager",
              date: "Feb 5, 2025",
              review: "Ahmed configured ClickUp expertly and improved workflows. His structured approach made a lasting impact.",
            },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:shadow-[0_0_0_2px] hover:shadow-pink-500/30 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.06 }}
            >
              <div className="flex flex-col items-center">
                <img src={testimonialImages[i]} alt={t.name} className="w-16 h-16 rounded-full border-2 border-pink-500 mb-3 object-cover" />
                <p className="text-zinc-300 italic text-center">"{t.review}"</p>
                <div className="mt-4 text-center">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-zinc-400">{t.role} • {t.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Section (existing) */}
      <section className="bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Why Choose Neha's Website?</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Secure Payments", desc: "Protected transactions with escrow system and milestone-based payments." },
              { icon: Search, title: "Smart Matching", desc: "AI-powered matching system connects you with the perfect talent or projects." },
              { icon: Users, title: "Verified Profiles", desc: "All freelancers and clients go through our verification process." },
              { icon: TrendingUp, title: "Growth Tracking", desc: "Detailed analytics and insights to help you grow your business." },
              { icon: Globe, title: "Global Reach", desc: "Connect with talent and opportunities from around the world." },
              { icon: Zap, title: "Fast Hiring", desc: "Streamlined process to get your projects started quickly." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:shadow-[0_0_0_1px] hover:shadow-pink-500/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-md bg-gradient-to-r from-pink-500 to-violet-600 inline-flex items-center justify-center">
                    {(() => { const Icon = f.icon; return <Icon className="w-5 h-5 text-white" />; })()}
                  </span>
                  <div className="text-xl font-semibold">{f.title}</div>
                </div>
                <div className="mt-2 text-zinc-400">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8 text-zinc-400 text-sm">
          © {new Date().getFullYear()} Neha's Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
