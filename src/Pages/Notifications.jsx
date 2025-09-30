import React, { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load notifications");
      setItems(data.notifications || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const markAllRead = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications/read-all`, {
        method: 'PATCH',
        headers: { "Authorization": `Bearer ${localStorage.getItem('token') || ''}` }
      });
      if (res.ok) fetchItems();
    } catch {}
  };

  const toggleRead = async (id, isRead) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { "Authorization": `Bearer ${localStorage.getItem('token') || ''}`, "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !isRead })
      });
      if (res.ok) fetchItems();
    } catch {}
  };

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Notifications</h1>
        <button onClick={markAllRead} className="px-3 py-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700">Mark all as read</button>
      </div>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-gray-400">No notifications</div>
          ) : items.map(n => (
            <div key={n._id} className={`p-4 rounded border ${n.isRead ? 'border-gray-800 bg-gray-900' : 'border-pink-500/30 bg-pink-500/10'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{n.title || n.type}</p>
                  <p className="text-gray-300 text-sm">{n.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => toggleRead(n._id, n.isRead)} className="text-sm px-2 py-1 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700">
                  {n.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


