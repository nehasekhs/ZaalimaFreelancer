import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-indigo-400 text-center mb-6">Contact Us</h1>

        <p className="text-lg text-center">
          Have questions or need support? Fill out the form below and our team will get back to you promptly.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-400"
            rows="6"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition py-4 rounded-md font-medium"
          >
            Send Message
          </button>
        </form>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Our Office</h2>
          <p>123 GigConnect Street, Business City, Country</p>
          <p>Email: support@gigconnect.com | Phone: +123 456 7890</p>
        </div>
      </div>
    </div>
  );
}
