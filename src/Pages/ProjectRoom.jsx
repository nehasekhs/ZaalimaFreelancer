import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("http", "ws") || "http://localhost:5000";

export default function ProjectRoom() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [doc, setDoc] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", { withCredentials: true, reconnection: true });
    socketRef.current = socket;
    socket.emit("join-room", roomId);

    socket.on("chat-message", (m) => setMessages((prev) => [...prev, m]));
    socket.on("receive-change", (delta) => {
      // naive merge: append text
      if (typeof delta === "string") setDoc((d) => d + delta);
    });

    return () => socket.disconnect();
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { text: input, at: new Date().toLocaleTimeString() };
    socketRef.current.emit("chat-message", { roomId, message: msg });
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const onDocChange = (e) => {
    const val = e.target.value;
    setDoc(val);
    socketRef.current.emit("document-change", { roomId, delta: val.slice(-1) });
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-white grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h1 className="text-xl font-semibold mb-3">Collaborative Document</h1>
        <textarea value={doc} onChange={onDocChange} rows={16} className="w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700" placeholder="Start collaborating..." />
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-semibold mb-3">Room Chat</h2>
        <div className="h-72 overflow-auto space-y-2 border border-gray-800 rounded p-3 bg-gray-950">
          {messages.map((m, i) => (
            <div key={i} className="text-sm"><span className="text-gray-400">[{m.at}]</span> {m.text}</div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={input} onChange={(e)=>setInput(e.target.value)} className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Type a message" />
          <button onClick={sendMessage} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600">Send</button>
        </div>
      </div>
    </div>
  );
}


