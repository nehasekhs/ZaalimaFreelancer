import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VerificationCenter = ({ user, onVerificationUpdate }) => {
  const [verifications, setVerifications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const verificationTypes = [
    {
      id: 'Identity',
      title: 'Identity Verification',
      description: 'Verify your identity with government-issued ID',
      icon: '🆔',
      required: true,
      benefits: ['Build trust with clients', 'Access to premium features', 'Higher project visibility']
    },
    {
      id: 'Phone',
      title: 'Phone Verification',
      description: 'Verify your phone number for security',
      icon: '📱',
      required: true,
      benefits: ['Enhanced account security', 'SMS notifications', 'Two-factor authentication']
    },
    {
      id: 'Email',
      title: 'Email Verification',
      description: 'Verify your email address',
      icon: '📧',
      required: true,
      benefits: ['Account recovery', 'Important notifications', 'Project updates']
    },
    {
      id: 'Payment',
      title: 'Payment Verification',
      description: 'Verify your payment method for secure transactions',
      icon: '💳',
      required: true,
      benefits: ['Secure payments', 'Faster payouts', 'Payment protection']
    },
    {
      id: 'Portfolio',
      title: 'Portfolio Verification',
      description: 'Verify your work samples and portfolio',
      icon: '🎨',
      required: false,
      benefits: ['Showcase verified work', 'Higher credibility', 'Better project matching']
    },
    {
      id: 'Skills',
      title: 'Skills Verification',
      description: 'Take skill tests to verify your expertise',
      icon: '🎯',
      required: false,
      benefits: ['Prove your skills', 'Stand out to clients', 'Skill badges']
    }
  ];

  useEffect(() => {
    fetchVerifications();
    fetchStats();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/verification`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setVerifications(data.verifications || []);
    } catch (error) {
      console.error('Error fetching verifications:', error);
      // Fallback to mock data
      setVerifications([
        {
          _id: '1',
          type: 'Identity',
          status: 'Approved',
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
          verifiedAt: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
          _id: '2',
          type: 'Phone',
          status: 'Approved',
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          verifiedAt: new Date(Date.now() - 86400000 * 4).toISOString()
        },
        {
          _id: '3',
          type: 'Email',
          status: 'Approved',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          verifiedAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          _id: '4',
          type: 'Payment',
          status: 'Pending',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          _id: '5',
          type: 'Portfolio',
          status: 'Under Review',
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/verification/stats/summary`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching verification stats:', error);
    }
  };

  const getVerificationStatus = (type) => {
    const verification = verifications.find(v => v.type === type);
    return verification ? verification.status : 'Not Started';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Under Review': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'Not Started': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return '✅';
      case 'Pending': return '⏳';
      case 'Under Review': return '👀';
      case 'Rejected': return '❌';
      case 'Not Started': return '⭕';
      default: return '⭕';
    }
  };

  const handleStartVerification = (type) => {
    setSelectedType(type);
    setShowVerificationForm(true);
  };

  const handleVerificationSubmit = async (verificationData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/verification/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: selectedType.id,
          verificationData: verificationData.verificationData,
          documents: verificationData.documents
        })
      });

      if (response.ok) {
        await fetchVerifications();
        await fetchStats();
        setShowVerificationForm(false);
        setSelectedType(null);
        if (onVerificationUpdate) onVerificationUpdate();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit verification');
      }
    } catch (error) {
      console.error('Error submitting verification:', error);
      alert('Failed to submit verification');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white">Loading verification center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Verification Center
          </h1>
          <p className="text-gray-300 text-lg">
            Build trust and credibility by verifying your identity and skills
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Verifications</p>
                <p className="text-2xl font-bold text-white">{stats.total || 0}</p>
              </div>
              <div className="text-3xl">📋</div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-400">{stats.approved || 0}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending || 0}</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Under Review</p>
                <p className="text-2xl font-bold text-blue-400">{stats.underReview || 0}</p>
              </div>
              <div className="text-3xl">👀</div>
            </div>
          </div>
        </div>

        {/* Verification Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verificationTypes.map((type) => {
            const status = getVerificationStatus(type.id);
            const verification = verifications.find(v => v.type === type.id);
            
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{type.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{type.title}</h3>
                      {type.required && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                    {getStatusIcon(status)} {status}
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{type.description}</p>

                <div className="space-y-2 mb-6">
                  <p className="text-gray-400 text-xs font-medium">Benefits:</p>
                  {type.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                      <span className="text-gray-300 text-xs">{benefit}</span>
                    </div>
                  ))}
                </div>

                {verification && verification.status === 'Rejected' && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm font-medium">Rejection Reason:</p>
                    <p className="text-red-300 text-xs mt-1">{verification.rejectionReason}</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  {status === 'Not Started' || status === 'Rejected' ? (
                    <button
                      onClick={() => handleStartVerification(type)}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {status === 'Rejected' ? 'Resubmit' : 'Start Verification'}
                    </button>
                  ) : status === 'Approved' ? (
                    <button
                      disabled
                      className="flex-1 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                    >
                      Verified ✅
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-gray-600 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                    >
                      {status === 'Pending' ? 'Submitted' : 'Under Review'}
                    </button>
                  )}
                  
                  {verification && (
                    <button
                      onClick={() => {
                        // Show verification details
                        console.log('View verification details:', verification);
                      }}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
                    >
                      Details
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Form Modal */}
        <AnimatePresence>
          {showVerificationForm && selectedType && (
            <VerificationForm
              type={selectedType}
              onClose={() => {
                setShowVerificationForm(false);
                setSelectedType(null);
              }}
              onSubmit={handleVerificationSubmit}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Verification Form Component
const VerificationForm = ({ type, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    verificationData: {},
    documents: []
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      verificationData: {
        ...prev.verificationData,
        [name]: value
      }
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      filename: file.name,
      type: file.type,
      file: file // In a real app, you'd upload this to a file storage service
    }));
    
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting verification:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (type.id) {
      case 'Identity':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.verificationData.firstName || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-400 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.verificationData.lastName || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.verificationData.dateOfBirth || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">ID Type</label>
              <select
                name="idType"
                value={formData.verificationData.idType || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              >
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="national_id">National ID</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.verificationData.idNumber || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={formData.verificationData.country || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Upload ID Documents</label>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
              <p className="text-gray-400 text-xs mt-1">
                Upload front and back of your ID document
              </p>
            </div>
          </div>
        );
      
      case 'Phone':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.verificationData.phoneNumber || ''}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            <p className="text-gray-400 text-sm">
              We'll send you a verification code via SMS
            </p>
          </div>
        );
      
      case 'Email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.verificationData.email || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            <p className="text-gray-400 text-sm">
              We'll send you a verification link via email
            </p>
          </div>
        );
      
      case 'Payment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.verificationData.bankName || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Account Number</label>
              <input
                type="text"
                name="bankAccount"
                value={formData.verificationData.bankAccount || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Routing Number</label>
              <input
                type="text"
                name="routingNumber"
                value={formData.verificationData.routingNumber || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Account Type</label>
              <select
                name="accountType"
                value={formData.verificationData.accountType || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              >
                <option value="">Select Account Type</option>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">Verification form for {type.title} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{type.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          
          <div className="flex items-center justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Verification'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default VerificationCenter;
