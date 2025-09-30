import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Payments() {
  const [amount, setAmount] = useState(1000);

  const createOrder = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/payments/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error("Order creation failed");
    return res.json();
  };

  const pay = async () => {
    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay script not loaded. Please refresh the page.");
      }

      const order = await createOrder();
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxx",
        amount: order.amount,
        currency: order.currency,
        name: "Neha's Website",
        description: "Wallet Top-up",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment successful:", response);
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: { color: "#ec4899" },
        modal: {
          ondismiss: function() {
            console.log("Payment modal closed");
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error("Payment error:", e);
      alert("Payment failed: " + e.message);
    }
  };

  const history = [
    { id: 1, amount: 2500, status: "Paid", date: "2025-09-01" },
    { id: 2, amount: 1200, status: "Paid", date: "2025-08-24" },
    { id: 3, amount: 5000, status: "Paid", date: "2025-08-10" },
  ];

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Payments</h1>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Payment Form */}
        <motion.div className="lg:col-span-2 p-6 rounded-xl bg-gray-900 border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Add Funds / Pay Invoice</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300">Amount (INR)</label>
              <input type="number" className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} />
              <p className="text-xs text-gray-500 mt-1">Use Razorpay Test Key for sandbox payments.</p>
            </div>
            <div className="flex items-end">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600" onClick={pay}>
                Pay with Razorpay
              </motion.button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-400">₹12,900</div>
              <div className="text-sm text-gray-400">Total Added</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-yellow-400">₹8,400</div>
              <div className="text-sm text-gray-400">Total Spent</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-blue-400">₹4,500</div>
              <div className="text-sm text-gray-400">Wallet Balance</div>
            </div>
          </div>
        </motion.div>

        {/* Right: History */}
        <motion.div className="p-6 rounded-xl bg-gray-900 border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="divide-y divide-gray-800">
            {history.map((h) => (
              <div key={h.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">₹{h.amount}</div>
                  <div className="text-sm text-gray-500">{new Date(h.date).toLocaleDateString()}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-400 border border-green-700">{h.status}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">Note: History is sample data in test mode.</p>
        </motion.div>
      </div>
    </div>
  );
}


