import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import freelancersData from "../data/freelancersData"; // import freelancer info
const user = JSON.parse(localStorage.getItem("user"));

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem(`chats_${user.id}`)) || {};
    setChats(Object.keys(storedChats).map((freelancerId) => {
      const freelancer = freelancersData.find(f => f._id === freelancerId);
      return {
        freelancerId,
        name: freelancer?.name || "Unknown",
        messages: storedChats[freelancerId],
      };
    }));
  }, []);

  const handleDeleteChat = (freelancerId) => {
    const storedChats = JSON.parse(localStorage.getItem(`chats_${user.id}`)) || {};
    delete storedChats[freelancerId];
    localStorage.setItem(`chats_${user.id}`, JSON.stringify(storedChats));
    setChats(chats.filter(c => c.freelancerId !== freelancerId));
  };

  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 bg-gray-950 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-indigo-400 text-center">Your Chats</h2>
      <input
        type="text"
        placeholder="Search freelancers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md mx-auto mb-6 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {filteredChats.length === 0 ? (
        <p className="text-gray-400 text-center">No chats found.</p>
      ) : (
        <ul className="space-y-4 max-w-xl mx-auto">
          {filteredChats.map(chat => (
            <li key={chat.freelancerId} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
              <Link
                to={`/chat/${chat.freelancerId}`}
                className="text-white font-medium hover:text-indigo-400"
              >
                {chat.name}
              </Link>
              <button
                onClick={() => handleDeleteChat(chat.freelancerId)}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
