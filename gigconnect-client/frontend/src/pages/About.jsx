import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-indigo-400 text-center mb-6">
          About Us
        </h1>

        <p className="text-lg leading-relaxed">
          GigConnect is a professional platform designed to bridge the gap between clients and freelancers.
          Our mission is to provide a seamless, secure, and efficient environment where talent meets opportunity.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Our Vision</h2>
            <p>
              To empower businesses and freelancers worldwide by providing tools that simplify project management,
              enhance communication, and foster professional growth.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Our Mission</h2>
            <p>
              To create a trusted, user-friendly platform where clients can find talented freelancers and freelancers
              can showcase their skills, ensuring transparency, reliability, and success for all users.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Why Choose Us?</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Secure payments and transparent transactions</li>
            <li>Real-time communication between clients and freelancers</li>
            <li>Curated talent for every project need</li>
            <li>Easy project management and tracking tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
