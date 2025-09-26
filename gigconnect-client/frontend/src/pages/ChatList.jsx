import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import freelancersData from "../data/freelancersData";

export default function ChatList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = user?.name || "guest";

  const [allChats, setAllChats] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Load chats from localStorage
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem(`chats_${currentUser}`)) || {};
    setAllChats(storedChats);
  }, [currentUser]);

  const handleDeleteChat = (freelancerId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      const updated = { ...allChats };
      delete updated[freelancerId];
      setAllChats(updated);
      localStorage.setItem(`chats_${currentUser}`, JSON.stringify(updated));
    }
  };

  const getFreelancerName = (id) => {
    const freelancer = freelancersData.find((f) => f._id === id);
    return freelancer ? freelancer.name : `Freelancer ${id}`;
  };

  const filteredFreelancers = Object.keys(allChats).filter((id) =>
    getFreelancerName(id).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-400 text-center">
        Freelancer Chats
      </h2>

      <input
        type="text"
        placeholder="Search freelancers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <ul className="space-y-4 max-w-xl mx-auto">
        {filteredFreelancers.length === 0 && (
          <p className="text-gray-400 text-center">No chats found.</p>
        )}

        {filteredFreelancers.map((id) => (
          <li
            key={id}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="font-bold text-white">{getFreelancerName(id)[0]}</span>
              </div>
              <span>{getFreelancerName(id)}</span>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/chat/${id}`}
                className="px-3 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm"
              >
                Chat
              </Link>
              <button
                onClick={() => handleDeleteChat(id)}
                className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
