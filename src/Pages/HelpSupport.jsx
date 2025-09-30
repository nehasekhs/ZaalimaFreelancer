import React, { useState } from "react";

export default function HelpSupport() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submitTicket = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/support/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ subject, message, email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit ticket");
      setSuccess("Your ticket has been submitted. We'll get back to you soon.");
      setSubject("");
      setMessage("");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto text-white">
      <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent mb-6">Help & Support</h1>
      <p className="text-gray-300 mb-6">Submit a support ticket and our team will assist you.</p>
      <form onSubmit={submitTicket} className="space-y-4 bg-gray-900 border border-gray-800 p-6 rounded-xl">
        {success && <div className="text-green-400 text-sm">{success}</div>}
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email (for reply)</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Subject</label>
          <input value={subject} onChange={(e)=>setSubject(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Message</label>
          <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={6} required className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"></textarea>
        </div>
        <button type="submit" disabled={sending} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 disabled:opacity-50">
          {sending ? 'Sending...' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
}


