import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose, project, freelancer, onPaymentSuccess }) => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: 'Credit Card',
    milestone: {
      title: '',
      description: '',
      dueDate: ''
    },
    autoRelease: false,
    autoReleaseDays: 7,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment Method, 3: Confirmation
  const [fees, setFees] = useState({
    platformFee: 0,
    processingFee: 0,
    freelancerAmount: 0
  });

  useEffect(() => {
    if (paymentData.amount) {
      calculateFees();
    }
  }, [paymentData.amount, paymentData.paymentMethod]);

  const calculateFees = () => {
    const amount = parseFloat(paymentData.amount) || 0;
    const platformFee = amount * 0.05; // 5% platform fee
    const processingFee = (amount * 0.029) + 0.30; // 2.9% + $0.30
    const freelancerAmount = amount - platformFee - processingFee;
    
    setFees({
      platformFee,
      processingFee,
      freelancerAmount
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('milestone.')) {
      const milestoneField = name.split('.')[1];
      setPaymentData(prev => ({
        ...prev,
        milestone: {
          ...prev.milestone,
          [milestoneField]: value
        }
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/payments/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: project._id,
          freelancerId: freelancer._id,
          amount: parseFloat(paymentData.amount),
          paymentMethod: paymentData.paymentMethod,
          milestone: paymentData.milestone.title ? paymentData.milestone : null,
          autoRelease: paymentData.autoRelease,
          autoReleaseDays: parseInt(paymentData.autoReleaseDays)
        })
      });
      
      if (response.ok) {
        const payment = await response.json();
        onPaymentSuccess(payment);
        onClose();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create payment');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Create Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step > stepNumber ? 'bg-pink-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Amount */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Amount</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        Amount ($)
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={paymentData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter payment amount"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                        required
                        min="1"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        Milestone Title (Optional)
                      </label>
                      <input
                        type="text"
                        name="milestone.title"
                        value={paymentData.milestone.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Initial Design, First Draft, Final Delivery"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        Milestone Description (Optional)
                      </label>
                      <textarea
                        name="milestone.description"
                        value={paymentData.milestone.description}
                        onChange={handleInputChange}
                        placeholder="Describe what this payment is for..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        Due Date (Optional)
                      </label>
                      <input
                        type="date"
                        name="milestone.dueDate"
                        value={paymentData.milestone.dueDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment Method & Settings */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Method & Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={paymentData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      >
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="autoRelease"
                          checked={paymentData.autoRelease}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500"
                        />
                        <label className="text-gray-300">
                          Enable auto-release after project completion
                        </label>
                      </div>

                      {paymentData.autoRelease && (
                        <div>
                          <label className="block text-sm font-medium text-pink-400 mb-2">
                            Auto-release after (days)
                          </label>
                          <input
                            type="number"
                            name="autoReleaseDays"
                            value={paymentData.autoReleaseDays}
                            onChange={handleInputChange}
                            min="1"
                            max="30"
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={paymentData.notes}
                        onChange={handleInputChange}
                        placeholder="Add any additional notes for the freelancer..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Summary</h3>
                  
                  <div className="bg-gray-700/50 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Project:</span>
                      <span className="text-white font-medium">{project.title}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Freelancer:</span>
                      <span className="text-white font-medium">{freelancer.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Payment Amount:</span>
                      <span className="text-white font-medium">${parseFloat(paymentData.amount).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Platform Fee (5%):</span>
                      <span className="text-gray-400">-${fees.platformFee.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Processing Fee:</span>
                      <span className="text-gray-400">-${fees.processingFee.toFixed(2)}</span>
                    </div>
                    
                    <hr className="border-gray-600" />
                    
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-pink-400">Freelancer Receives:</span>
                      <span className="text-pink-400">${fees.freelancerAmount.toFixed(2)}</span>
                    </div>

                    {paymentData.milestone.title && (
                      <div className="mt-4 p-4 bg-gray-600/50 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Milestone Details:</h4>
                        <p className="text-gray-300 text-sm">{paymentData.milestone.title}</p>
                        {paymentData.milestone.description && (
                          <p className="text-gray-400 text-sm mt-1">{paymentData.milestone.description}</p>
                        )}
                        {paymentData.milestone.dueDate && (
                          <p className="text-gray-400 text-sm mt-1">
                            Due: {new Date(paymentData.milestone.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Previous
              </button>
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!paymentData.amount}
                  className="px-6 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {loading ? 'Creating Payment...' : 'Create Payment'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
