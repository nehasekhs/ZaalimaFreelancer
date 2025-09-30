import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'freelancer',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSignup(data.user);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join FreelanceHub</h1>
          <p className="text-gray-300">Create your account and start your journey</p>
        </div>

        {/* Signup Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">
                User Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.userType === 'freelancer' 
                    ? 'border-pink-500 bg-pink-500/10' 
                    : 'border-gray-600 bg-gray-700/50'
                }`}>
                  <input
                    type="radio"
                    name="userType"
                    value="freelancer"
                    checked={formData.userType === 'freelancer'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <div className="text-2xl mb-2">👨‍💻</div>
                    <div className="text-white font-medium">Freelancer</div>
                    <div className="text-gray-400 text-xs">Find work</div>
                  </div>
                </label>
                
                <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.userType === 'client' 
                    ? 'border-pink-500 bg-pink-500/10' 
                    : 'border-gray-600 bg-gray-700/50'
                }`}>
                  <input
                    type="radio"
                    name="userType"
                    value="client"
                    checked={formData.userType === 'client'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <div className="text-2xl mb-2">👔</div>
                    <div className="text-white font-medium">Client</div>
                    <div className="text-gray-400 text-xs">Hire talent</div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500 mt-1"
                required
              />
              <label className="ml-2 text-gray-300 text-sm">
                I agree to the{' '}
                <a href="#" className="text-pink-400 hover:text-pink-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-pink-400 hover:text-pink-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="text-white font-medium text-sm">Secure</h3>
            <p className="text-gray-400 text-xs">Your data is protected</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-white font-medium text-sm">Fast</h3>
            <p className="text-gray-400 text-xs">Quick project matching</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-2xl mb-2">💼</div>
            <h3 className="text-white font-medium text-sm">Reliable</h3>
            <p className="text-gray-400 text-xs">Trusted by thousands</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;