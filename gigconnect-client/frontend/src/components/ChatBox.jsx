import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import freelancersData from "../data/freelancersData";
const user = JSON.parse(localStorage.getItem("user"));

export default function ChatBox() {
  const { id } = useParams(); // freelancer id
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();
  const freelancer = freelancersData.find(f => f._id === id);

  const storageKey = `chats_${user.id}`;
  
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem(storageKey)) || {};
    setMessages(storedChats[id] || []);
  }, [id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = e => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { from: "user", text: input, time: new Date().toLocaleString() };
    const storedChats = JSON.parse(localStorage.getItem(storageKey)) || {};
    const updatedMessages = [...(storedChats[id] || []), newMsg];
    storedChats[id] = updatedMessages;
    localStorage.setItem(storageKey, JSON.stringify(storedChats));
    setMessages(updatedMessages);
    setInput("");

    // Simulate freelancer response
    setTyping(true);
    setTimeout(() => {
      const reply = { from: "freelancer", text: "Got it!", time: new Date().toLocaleString() };
      const updated = [...updatedMessages, reply];
      storedChats[id] = updated;
      localStorage.setItem(storageKey, JSON.stringify(storedChats));
      setMessages(updated);
      setTyping(false);
    }, 1000);
  };

  const handleDeleteMessage = index => {
    const storedChats = JSON.parse(localStorage.getItem(storageKey)) || {};
    const updated = messages.filter((_, i) => i !== index);
    storedChats[id] = updated;
    localStorage.setItem(storageKey, JSON.stringify(storedChats));
    setMessages(updated);
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col">
      <header className="bg-gray-900 p-4 text-center text-xl font-bold text-indigo-400 flex justify-between items-center">
        <button onClick={() => navigate("/chats")} className="text-sm px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
          ← Back
        </button>
        <span>{freelancer?.name || "Freelancer"}</span>
        <div className="w-16"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} ref={idx === messages.length - 1 ? scrollRef : null}>
            <div className={`max-w-xs px-4 py-2 rounded-lg break-words ${msg.from === "user" ? "bg-blue-600 self-end ml-auto" : "bg-green-600 self-start"}`}>
              <div className="flex justify-between items-center">
                <span>{msg.text}</span>
                <button onClick={() => handleDeleteMessage(idx)} className="ml-2 text-xs text-gray-200 hover:text-red-200">✕</button>
              </div>
              <div className="text-gray-200 text-xs mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
        {typing && <div className="text-gray-400 italic text-sm">Typing...</div>}
      </div>

      <footer className="p-4 border-t border-gray-700 bg-gray-900 sticky bottom-0">
        <form className="flex gap-2" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
