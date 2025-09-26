// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginApi } from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Show/Hide password
  const [rememberMe, setRememberMe] = useState(false); // ✅ Remember me checkbox
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password)
      return setErr("Please enter email & password");
    try {
      setLoading(true);
      const res = await loginApi(form);

      // ✅ Save token if rememberMe is checked
      if (rememberMe && res?.token) {
        localStorage.setItem("token", res.token);
      }

      navigate("/profile"); // ✅ Redirect to home
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl p-8 bg-card shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
          Welcome back
        </h2>
        <p className="text-sm text-gray-300 mb-6">
          Log in to manage your projects
        </p>

        {err && <div className="mb-4 text-red-400">{err}</div>}

        <form onSubmit={submit} className="space-y-4">
          {/* Email */}
          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          {/* Password + Show/Hide */}
          <label className="block relative">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-pink-500"
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-pink-400">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium mt-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          New here?{" "}
          <Link to="/signup" className="text-pink-400">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
export default Login;
