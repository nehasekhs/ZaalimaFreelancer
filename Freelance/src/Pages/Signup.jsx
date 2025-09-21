// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { signupApi } from "../api";

 function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!form.name || !form.email || !form.password) return "Please fill all fields";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);
    try {
      setLoading(true);
      await signupApi(form); // server sets httpOnly cookie
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl p-8 bg-card shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
          Create your account
        </h2>
        <p className="text-sm text-gray-300 mb-6">Start hiring or selling your services.</p>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Full name</span>
            <input
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium mt-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            {loading ? "Creating account..." : "Sign up"}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-pink-400">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
export default Signup;